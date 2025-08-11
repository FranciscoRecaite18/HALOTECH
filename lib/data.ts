import type { Category } from "@/components/category-bar"

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

export type User = {
  id: string
  email: string
  name: string
  passwordHash: string
  role: "admin" | "editor"
}

// Simple "DB" en memoria para demo
const globalForDB = globalThis as unknown as {
  haloDB?: {
    posts: Post[]
    users: User[]
  }
}

if (!globalForDB.haloDB) {
  const now = Date.now()
  globalForDB.haloDB = {
    users: [],
    posts: [
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
    ],
  }
}

export const db = globalForDB.haloDB!

export function findPostBySlug(slug: string) {
  return db.posts.find((p) => p.slug === slug)
}

export function relatedPosts(post: Post, limit = 3): Post[] {
  return db.posts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, limit)
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
