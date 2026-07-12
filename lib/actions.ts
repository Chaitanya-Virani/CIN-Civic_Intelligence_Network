"use server";

import { getTenant, type Tenant } from "@/lib/tenant";

/**
 * Server action to verify a tenant exists without
 * exposing DB logic to the client.
 */
export async function verifyTenantAction(slug: string): Promise<Tenant | null> {
  try {
    return await getTenant(slug);
  } catch (error) {
    console.error("verifyTenantAction error:", error);
    return null;
  }
}
