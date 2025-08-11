import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import EditorForm from "../editor-form"
import { db } from "@/lib/data"
import { notFound } from "next/navigation"

export default function EditPostPage({ params }: { params: { id: string } }) {
  const post = db.posts.find((p) => p.id === params.id)
  if (!post) return notFound()

  return (
    <main className="min-h-screen bg-[#0b0f16] text-white">
      <SiteHeader />
      <section className="container mx-auto max-w-4xl px-4 py-10">
        <h1 className="mb-6 text-2xl font-bold">Editar artículo</h1>
        <EditorForm initial={post} />
      </section>
      <SiteFooter />
    </main>
  )
}
