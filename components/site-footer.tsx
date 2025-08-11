import { Twitter, Instagram, Users } from "lucide-react"

export default function SiteFooter() {
  return (
    <footer className="mt-16 w-full">
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-purple-700/40 to-[#0b0712]" />
        <div className="relative container mx-auto flex flex-col items-center justify-center gap-6 px-4 py-16">
          <div className="flex items-center gap-6 text-white/70">
            <a href="#" aria-label="X" className="transition hover:scale-110 hover:text-white">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" aria-label="Instagram" className="transition hover:scale-110 hover:text-white">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" aria-label="Comunidad" className="transition hover:scale-110 hover:text-white">
              <Users className="h-6 w-6" />
            </a>
          </div>
          <p className="text-xs text-white/60">© {new Date().getFullYear()} HALO · Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  )
}
