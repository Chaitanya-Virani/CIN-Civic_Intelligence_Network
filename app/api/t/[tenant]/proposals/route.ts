import { NextResponse } from "next/server";
import { proposals } from "@/lib/data";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ tenant: string }> },
) {
  const { tenant } = await params;
  const list = await proposals.list(tenant);
  return NextResponse.json(list);
}
