import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { db } from "@/lib/data"
import { comparePassword, createJWT, hashPassword } from "@/lib/auth"

// Crea un usuario admin de demostración si no existe
async function ensureAdmin() {
  const exists = db.users.find((u) => u.email === "admin@halo.dev")
  if (!exists) {
    db.users.push({
      id: "u1",
      email: "admin@halo.dev",
      name: "Admin",
      role: "admin",
      passwordHash: await hashPassword("halo1234"),
    })
  }
}

export async function POST(req: Request) {
  await ensureAdmin()
  const body = await req.json().catch(() => ({}))
  const { email, password } = body as { email?: string; password?: string }
  if (!email || !password) {
    return NextResponse.json({ error: "Credenciales inválidas" }, { status: 400 })
  }

  const user = db.users.find((u) => u.email === email)
  if (!user) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 401 })
  }

  const ok = await comparePassword(password, user.passwordHash)
  if (!ok) {
    return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 })
  }

  const token = await createJWT({ id: user.id, email: user.email, role: user.role, name: user.name })
  cookies().set("halo_token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })

  return NextResponse.json({ ok: true, user: { id: user.id, email: user.email, name: user.name, role: user.role } })
}
