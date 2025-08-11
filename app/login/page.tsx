"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

export default function LoginPage() {
  const [email, setEmail] = useState("admin@halo.dev")
  const [password, setPassword] = useState("halo1234")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) {
      setError(data?.error ?? "Error de autenticación")
      return
    }
    router.push("/admin")
  }

  return (
    <main className="min-h-screen bg-[#0b0f16] text-white">
      <SiteHeader />
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl">
          <h1 className="text-2xl font-bold">Login administrador</h1>
          <p className="mt-1 text-sm text-white/70">Usa las credenciales de demo: admin@halo.dev / halo1234</p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-sm text-white/80">Email</label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-white/20 bg-white/5 text-white"
                type="email"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-white/80">Contraseña</label>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-white/20 bg-white/5 text-white"
                type="password"
                required
              />
            </div>
            {error ? <p className="text-sm text-red-400">{error}</p> : null}
            <Button type="submit" disabled={loading} className="w-full bg-purple-600 text-white hover:bg-purple-700">
              {loading ? "Ingresando..." : "Ingresar"}
            </Button>
          </form>
        </div>
      </div>
      <SiteFooter />
    </main>
  )
}
