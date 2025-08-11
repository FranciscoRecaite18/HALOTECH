"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function SiteHeader({
  className = "",
}: {
  className?: string
}) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Acceso oculto al admin: Ctrl + Shift + A
      if (e.ctrlKey && e.shiftKey && (e.key === "A" || e.key === "a")) {
        router.push("/admin")
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [router])

  return (
    <header className={cn("relative z-50 w-full", className)}>
      <div className="container mx-auto flex items-center justify-between px-4 py-6">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/halo-text-logo.png" alt="HALO Logo" width={120} height={40} className="h-10 w-auto" />
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/about"
            className={cn(
              "text-sm font-medium transition-colors hover:text-white/90",
              pathname === "/about" ? "text-white" : "text-white/70",
            )}
          >
            About
          </Link>
          {/* Login button removed from public view */}
        </nav>
      </div>
    </header>
  )
}
