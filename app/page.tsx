"use client"

import { useEffect, useMemo, useState } from "react"
import Hero from "@/components/hero"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import CategoryBar, { type Category } from "@/components/category-bar"
import SearchBar from "@/components/search-bar"
import PostGrid from "@/components/post-grid"
import type { Post } from "@/lib/data"

export default function HomePage() {
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<Category[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const params = new URLSearchParams()
      if (query) params.set("q", query)
      selected.forEach((c) => params.append("cat", c))
      const res = await fetch(`/api/posts?${params.toString()}`, { cache: "no-store" })
      const data = await res.json()
      setPosts(data)
      setLoading(false)
    }
    load()
  }, [query, selected])

  const cards = useMemo(
    () =>
      posts.map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        category: p.category,
        imageUrl: p.imageUrl,
      })),
    [posts],
  )

  return (
    <main className="min-h-screen bg-[#0b0f16] text-white">
      <SiteHeader />
      <Hero />
      <section className="container mx-auto space-y-6 px-4 pb-8">
        <CategoryBar
          selected={selected}
          onToggle={(cat) =>
            setSelected((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]))
          }
        />
        <SearchBar value={query} onChange={setQuery} />

        <div className="mt-4">
          {loading ? (
            <p className="text-white/70">Cargando artículos...</p>
          ) : cards.length ? (
            <PostGrid posts={cards} />
          ) : (
            <p className="text-white/70">No se encontraron artículos.</p>
          )}
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
