"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

export type PostCardProps = {
  id?: string
  slug?: string
  title?: string
  excerpt?: string
  category?: string
  imageUrl?: string
}

export default function PostCard({
  id = "",
  slug = "",
  title = "Título del artículo",
  excerpt = "Breve introducción del contenido...",
  category = "Blockchain",
  imageUrl = "/neon-blockchain-cubes-futuristic-grid.png",
}: PostCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-3 shadow-lg"
    >
      <Link href={`/posts/${slug}`} className="block">
        <div className="relative overflow-hidden rounded-2xl">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            width={1200}
            height={630}
            className="aspect-[16/9] rounded-2xl object-cover transition group-hover:scale-[1.02]"
          />
          <div className="absolute left-3 top-3">
            <Badge className="rounded-full bg-purple-600 text-white hover:bg-purple-600">{category}</Badge>
          </div>
        </div>
        <div className="space-y-2 p-3">
          <h3 className="line-clamp-2 text-lg font-semibold text-white">{title}</h3>
          <p className="line-clamp-3 text-sm text-white/70">{excerpt}</p>
        </div>
      </Link>
    </motion.article>
  )
}
