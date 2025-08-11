import { NextResponse } from "next/server"
import { db, type Post } from "@/lib/data"
import { verifyJWT } from "@/lib/auth"

async function requireAuth() {
  const token = (await import("next/headers")).cookies().get("halo_token")?.value
  if (!token) return null
  try {
    return await verifyJWT(token)
  } catch {
    return null
  }
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const post = db.posts.find((p) => p.id === params.id)
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(post)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const user = await requireAuth()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const idx = db.posts.findIndex((p) => p.id === params.id)
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 })
  const body = (await req.json()) as Partial<Post>
  db.posts[idx] = { ...db.posts[idx], ...body, updatedAt: Date.now() }
  return NextResponse.json(db.posts[idx])
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const user = await requireAuth()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const idx = db.posts.findIndex((p) => p.id === params.id)
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 })
  const [deleted] = db.posts.splice(idx, 1)
  return NextResponse.json(deleted)
}
