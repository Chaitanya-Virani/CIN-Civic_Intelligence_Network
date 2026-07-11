import { NextResponse, type NextRequest } from "next/server";
import { getTenantByWebexRoom } from "@/lib/tenant";
import { proposals } from "@/lib/data";
import { castVote } from "@/lib/votes";
import {
  verifyWebexSignature,
  isFromBot,
  getMessage,
  getAttachmentAction,
  postMessage,
  postCard,
  parseProposeCommand,
  buildBallotCard,
  type WebexWebhookEvent,
} from "@/lib/cisco/webex";

/**
 * Handles both Webex webhook subscriptions on one route:
 *   - resource: messages,          event: created  → ingest a proposal
 *   - resource: attachmentActions, event: created  → ingest a ballot vote
 *
 * Always read the raw body before parsing — the signature is computed over
 * the raw bytes, not the parsed object.
 */
export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-spark-signature");

  if (!verifyWebexSignature(rawBody, signature)) {
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }

  let event: WebexWebhookEvent;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  // The bot hears its own messages and its own card posts — drop them,
  // or every reply triggers another webhook delivery within seconds.
  if (isFromBot(event.data?.personId)) {
    return NextResponse.json({ ok: true, ignored: "self" });
  }

  const tenant = await getTenantByWebexRoom(event.data.roomId);
  if (!tenant) {
    // Unrecognized room — not one of ours. Ack without acting, so Webex
    // doesn't keep retrying delivery.
    return NextResponse.json({ ok: true, ignored: "unknown room" });
  }

  try {
    if (event.resource === "messages" && event.event === "created") {
      await handleMessage(tenant.slug, event.data.id, event.data.roomId, event.data.personEmail);
    } else if (event.resource === "attachmentActions" && event.event === "created") {
      await handleAttachmentAction(
        tenant.slug,
        event.data.id,
        event.data.roomId,
        event.data.personId,
        event.data.personEmail,
      );
    }
  } catch (err) {
    console.error("webex webhook handler error:", err);
    // Still 200 — Webex retries on non-2xx, and a partially-handled event
    // (e.g. proposal created, reply failed) shouldn't be replayed.
  }

  return NextResponse.json({ ok: true });
}

async function handleMessage(
  tenantSlug: string,
  messageId: string,
  roomId: string,
  personEmail: string | undefined,
) {
  const message = await getMessage(messageId);
  const text = message.text ?? "";
  const command = parseProposeCommand(text);
  if (!command) return; // not a `propose:` message — nothing to do

  const authorId = `wx-${message.personId}`;
  const authorName = personEmail ?? "Webex member";

  const created = await proposals.create({
    tenantSlug,
    title: command.title,
    body: command.body,
    authorId,
    authorName,
    webexMessageId: messageId,
  });

  if (!created) return; // duplicate delivery of the same message — no-op

  await postCard(
    roomId,
    `New proposal: ${created.title}`,
    buildBallotCard({ id: created.id, title: created.title }),
  );
}

async function handleAttachmentAction(
  tenantSlug: string,
  actionId: string,
  roomId: string,
  personId: string,
  personEmail: string | undefined,
) {
  const action = await getAttachmentAction(actionId);
  const proposalId = action.inputs?.proposalId;
  const choice = action.inputs?.choice;
  if (!proposalId || !choice) return;

  if (choice === "object") {
    await postMessage(roomId, "Noted — your objection was recorded. No endorsement was cast.");
    return;
  }

  const result = await castVote({
    tenantSlug,
    proposalId,
    userId: `wx-${personId}`,
    displayName: personEmail ?? "Webex member",
  });

  if (!result.ok) {
    await postMessage(roomId, "Something went wrong recording that vote — please try again.");
    return;
  }

  await postMessage(
    roomId,
    result.alreadyVoted
      ? "You already voted on this proposal — one vote per member."
      : "✅ Vote recorded. The tally just updated.",
  );
}
