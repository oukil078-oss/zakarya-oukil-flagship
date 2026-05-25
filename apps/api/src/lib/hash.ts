import { createHash } from "node:crypto";

export function hashIp(value?: string) {
  if (!value) return undefined;
  return createHash("sha256").update(value).digest("hex").slice(0, 32);
}
