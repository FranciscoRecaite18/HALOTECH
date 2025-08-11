import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import EditorForm from "./editor-form"

export default function NewPostPage() {
  return (
    <main className="min-h-screen bg-[#0b0f16] text-white">
      <SiteHeader />
      <section className="container mx-auto max-w-4xl px-4 py-10">
        <h1 className="mb-6 text-2xl font-bold">Crear nuevo artículo</h1>
        <EditorForm />
      </section>
      <SiteFooter />
    </main>
  )
}
