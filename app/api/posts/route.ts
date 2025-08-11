import { NextResponse } from "next/server"
import { db, type Post } from "@/lib/data"
import { verifyJWT } from "@/lib/auth"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const slug = url.searchParams.get("slug")
  const q = url.searchParams.get("q")?.toLowerCase()
  const cat = url.searchParams.getAll("cat")
  let posts = db.posts.filter((p) => p.published)

  if (slug) {
    const post = posts.find((p) => p.slug === slug)
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(post)
  }

  if (q) {
    posts = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)),
    )
  }

  if (cat.length) {
    posts = posts.filter((p) => cat.includes(p.category))
  }

  posts = posts.sort((a, b) => b.createdAt - a.createdAt)
  return NextResponse.json(posts)
}

export async function POST(req: Request) {
  // simple protección: requiere JWT
  const token = (await import("next/headers")).cookies().get("halo_token")?.value
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    await verifyJWT(token)
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = (await req.json()) as Partial<Post>
  if (!data.title || !data.slug) {
    return NextResponse.json({ error: "Datos incompletos" }, { status: 400 })
  }
  const now = Date.now()
  const newPost: Post = {
    id: crypto.randomUUID(),
    slug: data.slug!,
    title: data.title!,
    excerpt: data.excerpt ?? "",
    content: data.content ?? "",
    category: (data.category as Post["category"]) ?? "Tech",
    tags: data.tags ?? [],
    imageUrl: data.imageUrl ?? "/placeholder-1cfym.png",
    createdAt: now,
    updatedAt: now,
    published: data.published ?? true,
  }
  db.posts.unshift(newPost)
  return NextResponse.json(newPost, { status: 201 })
}
