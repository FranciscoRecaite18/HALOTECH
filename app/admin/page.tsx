"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { Trash2, Pencil, Plus } from "lucide-react"
import type { Post } from "@/lib/data"

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([])

  const load = async () => {
    const res = await fetch("/api/posts", { cache: "no-store" })
    const data = await res.json()
    setPosts(data)
  }

  useEffect(() => {
    load()
  }, [])

  const remove = async (id: string) => {
    if (!confirm("Eliminar artículo?")) return
    await fetch(`/api/posts/${id}`, { method: "DELETE" })
    await load()
  }

  return (
    <main className="min-h-screen bg-[#0b0f16] text-white">
      <SiteHeader />
      <section className="container mx-auto px-4 py-10">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Panel de administración</h1>
          <div className="flex gap-2">
            <Link href="/admin/editor">
              <Button className="bg-purple-600 text-white hover:bg-purple-700">
                <Plus className="mr-2 h-4 w-4" /> Nuevo artículo
              </Button>
            </Link>
            <form
              action="/api/auth/logout"
              method="POST"
              onSubmit={async (e) => {
                e.preventDefault()
                await fetch("/api/auth/logout", { method: "POST" })
                window.location.href = "/"
              }}
            >
              <Button variant="outline" className="border-white/20 text-white bg-transparent">
                Cerrar sesión
              </Button>
            </form>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-white/10">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-white/[0.04]">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">Título</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Categoría</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Publicado</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {posts.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.03]">
                  <td className="px-4 py-3">{p.title}</td>
                  <td className="px-4 py-3 text-white/80">{p.category}</td>
                  <td className="px-4 py-3 text-white/80">{p.published ? "Sí" : "No"}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/editor/${p.id}`}>
                        <Button variant="outline" size="sm" className="border-white/20 bg-transparent">
                          <Pencil className="mr-2 h-4 w-4" /> Editar
                        </Button>
                      </Link>
                      <Button variant="destructive" size="sm" onClick={() => remove(p.id)}>
                        <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {!posts.length && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-white/70">
                    No hay artículos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
