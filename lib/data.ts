import type { Category } from "@/components/category-bar"
import { supabase } from "./supabaseClient"

export type Post = {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string // HTML
  category: Category
  tags: string[]
  imageUrl: string
  createdAt: number
  updatedAt: number
  published: boolean
}

// Posts de demo para fallback (mientras migras completamente a Supabase)
const now = Date.now()
const demoPosts: Post[] = [
  {
    id: "p1",
    slug: "que-es-blockchain",
    title: "Qué es blockchain y para qué puede servir",
    excerpt: "Explicación simple de la cadena de bloques: cómo funciona y por qué está transformando industrias.",
    content:
      "<p>Blockchain es una tecnología de registro distribuido que permite almacenar información de forma segura, transparente e inmutable. Cada bloque contiene un conjunto de transacciones y un hash que lo vincula con el bloque anterior, formando una cadena.</p><p>Sus casos de uso abarcan desde criptomonedas hasta trazabilidad, identidades digitales y más.</p>",
    category: "Blockchain",
    tags: ["blockchain", "cripto", "tecnología"],
    imageUrl: "/neon-blockchain-cubes-futuristic-grid.png",
    createdAt: now - 1000 * 60 * 60 * 24 * 10,
    updatedAt: now - 1000 * 60 * 60 * 24 * 9,
    published: true,
  },
  {
    id: "p2",
    slug: "fiat-vs-defi",
    title: "FIAT vs DeFi: ¿Competencia o convergencia?",
    excerpt:
      "Una mirada directa a las finanzas tradicionales y las descentralizadas: fortalezas, límites y sinergias.",
    content:
      "<p>DeFi propone servicios financieros abiertos y programables. FIAT mantiene estabilidad y regulación. El futuro podría ser híbrido.</p>",
    category: "Criptomonedas",
    tags: ["defi", "fiat", "economía"],
    imageUrl: "/fiat-vs-defi-cubes.png",
    createdAt: now - 1000 * 60 * 60 * 24 * 7,
    updatedAt: now - 1000 * 60 * 60 * 24 * 7,
    published: true,
  },
  {
    id: "p3",
    slug: "introduccion-a-web3",
    title: "Introducción a Web3: la web de los usuarios",
    excerpt: "¿Qué significa Web3 y cómo te afecta? Un repaso práctico por wallets, dApps y tokens.",
    content:
      "<p>Web3 pone la propiedad de datos y activos en manos de los usuarios mediante criptografía y contratos inteligentes.</p>",
    category: "WEB3",
    tags: ["web3", "wallets", "dapps"],
    imageUrl: "/web3-neon-nodes-network-purple.png",
    createdAt: now - 1000 * 60 * 60 * 24 * 4,
    updatedAt: now - 1000 * 60 * 60 * 24 * 4,
    published: true,
  },
  {
    id: "p4",
    slug: "que-es-ia-generativa",
    title: "IA Generativa: conceptos clave en 5 minutos",
    excerpt: "Modelos, datos y riesgos: lo esencial para entender la IA generativa sin tecnicismos.",
    content:
      "<p>La IA generativa crea texto, imágenes o audio a partir de ejemplos. Impulsa la productividad y plantea nuevos desafíos éticos.</p>",
    category: "IA",
    tags: ["ia", "genai", "modelos"],
    imageUrl: "/placeholder-ezyxw.png",
    createdAt: now - 1000 * 60 * 60 * 24 * 2,
    updatedAt: now - 1000 * 60 * 60 * 24 * 2,
    published: true,
  },
]

// Funciones para obtener posts (ahora con Supabase como prioridad)
export async function getAllPosts(): Promise<Post[]> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching posts from Supabase:', error)
      return demoPosts
    }

    // Convertir formato de Supabase a nuestro tipo Post
    return data?.map((post: any) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      tags: post.tags || [],
      imageUrl: post.image_url,
      createdAt: new Date(post.created_at).getTime(),
      updatedAt: new Date(post.updated_at).getTime(),
      published: post.published,
    })) || demoPosts
  } catch {
    return demoPosts
  }
}

export async function findPostBySlug(slug: string): Promise<Post | null> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error) {
      console.error('Error fetching post by slug:', error)
      return demoPosts.find((p) => p.slug === slug) || null
    }

    return {
      id: data.id,
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      category: data.category,
      tags: data.tags || [],
      imageUrl: data.image_url,
      createdAt: new Date(data.created_at).getTime(),
      updatedAt: new Date(data.updated_at).getTime(),
      published: data.published,
    }
  } catch {
    return demoPosts.find((p) => p.slug === slug) || null
  }
}

export function relatedPosts(post: Post, limit = 3): Post[] {
  return demoPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, limit)
}

export function toCard(post: Post) {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    imageUrl: post.imageUrl,
  }
}

// Compatibilidad temporal con la antigua estructura
export const db = {
  posts: demoPosts
}
