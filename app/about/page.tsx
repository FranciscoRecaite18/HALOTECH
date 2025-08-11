import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0b0f16] text-white">
      <SiteHeader />
      <section className="container mx-auto max-w-3xl px-4 py-12 space-y-4">
        <h1 className="text-3xl font-extrabold">Sobre HALO</h1>
        <p className="text-white/80">
          HALO es un blog de divulgación tecnológica y cripto. Nuestro objetivo es explicar conceptos complejos de forma
          clara, visual y sin tecnicismos innecesarios.
        </p>
        <p className="text-white/70 text-sm">Diseño de referencia incluido en public/design/macbook-pro-14-1.png</p>
      </section>
      <SiteFooter />
    </main>
  )
}
