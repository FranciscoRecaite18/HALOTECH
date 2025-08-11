import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"
import bcrypt from "bcryptjs"
import type { User } from "./data"

const encoder = new TextEncoder()
const DEV_SECRET = "replace-with-env-secret-in-production"

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash)
}

export async function createJWT(user: Pick<User, "id" | "email" | "role" | "name">) {
  const token = await new SignJWT(user as any)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encoder.encode(DEV_SECRET))
  return token
}

export async function verifyJWT(token: string) {
  const { payload } = await jwtVerify(token, encoder.encode(DEV_SECRET))
  return payload as { id: string; email: string; role: string; name: string }
}

export function getUserFromCookie() {
  const token = cookies().get("halo_token")?.value
  if (!token) return null
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload = (globalThis as any).__haloVerify ? (globalThis as any).__haloVerify(token) : null
    return payload
  } catch {
    return null
  }
}
// helper para marcar verificación en el mismo proceso (Next.js)
;(globalThis as unknown as any).__haloVerify = async (token: string) => {
  try {
    const payload = await verifyJWT(token)
    return payload
  } catch {
    return null
  }
}
