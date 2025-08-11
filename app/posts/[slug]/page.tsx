import { notFound } from "next/navigation"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import Image from "next/image"
import Link from "next/link"
import { findPostBySlug, relatedPosts } from "@/lib/data"
import PostGrid from "@/components/post-grid"

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = findPostBySlug(params.slug)
  if (!post) return notFound()
  const related = relatedPosts(post, 3)

  return (
    <main className="min-h-screen bg-[#0b0f16] text-white">
      <SiteHeader />
      <article className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{post.title}</h1>
          <p className="mt-2 text-white/70">{post.excerpt}</p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={
                post.imageUrl ||
                "/placeholder.svg?height=630&width=1200&query=futuristic%20article%20header" ||
                "/placeholder.svg"
              }
              alt={post.title}
              width={1200}
              height={630}
              className="h-auto w-full object-cover"
            />
          </div>
          <div
            className="prose prose-invert mt-6 max-w-none prose-headings:text-white prose-a:text-purple-400"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className="mt-10">
            <Link href="/" className="text-sm text-purple-300 underline-offset-4 hover:underline">
              ← Volver al inicio
            </Link>
          </div>
        </div>
        <section className="mx-auto mt-12 max-w-5xl">
          <h2 className="mb-4 text-xl font-semibold">Artículos relacionados</h2>
          <PostGrid
            posts={related.map((p) => ({
              id: p.id,
              slug: p.slug,
              title: p.title,
              excerpt: p.excerpt,
              category: p.category,
              imageUrl: p.imageUrl,
            }))}
          />
        </section>
      </article>
      <SiteFooter />
    </main>
  )
}
