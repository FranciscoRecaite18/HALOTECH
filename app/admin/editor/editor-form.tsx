"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Post } from "@/lib/data"
import type { Category } from "@/components/category-bar"
import {
  Bold,
  Italic,
  UnderlineIcon,
  List,
  ListOrdered,
  Quote,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react"

// TipTap
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import TextAlign from "@tiptap/extension-text-align"

export default function EditorForm({
  initial,
}: {
  initial?: Partial<Post>
}) {
  const [title, setTitle] = useState(initial?.title ?? "")
  const [slug, setSlug] = useState(initial?.slug ?? "")
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "")
  const [category, setCategory] = useState<Category>((initial?.category as Category) ?? "Tech")
  const [tags, setTags] = useState((initial?.tags ?? []).join(", "))
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? "")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!slug && title) {
      setSlug(
        title
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^\w\s-]/g, "")
          .trim()
          .replace(/\s+/g, "-"),
      )
    }
  }, [title, slug])

  const isEdit = !!initial?.id

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Link.configure({
        openOnClick: true,
        autolink: true,
        protocols: ["http", "https", "mailto"],
      }),
      Placeholder.configure({
        placeholder: "Escribe el contenido...",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: initial?.content ?? "",
    editorProps: {
      attributes: {
        class:
          "min-h-[220px] p-4 rounded-b-lg focus:outline-none text-white/90 leading-relaxed " +
          "prose prose-invert max-w-none [&_a]:text-purple-300 [&_code]:bg-white/10 [&_blockquote]:border-l-4",
      },
    },
  })

  const onFile = async (file?: File) => {
    if (!file) return
    const b64 = await fileToBase64(file)
    setImageUrl(b64 as string)
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const html = editor?.getHTML() ?? ""
    const payload = {
      title,
      slug,
      excerpt,
      category,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      content: html,
      imageUrl: imageUrl || undefined,
      published: true,
    }
    const res = await fetch(isEdit ? `/api/posts/${initial!.id}` : "/api/posts", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    setSaving(false)
    if (res.ok) {
      window.location.href = "/admin"
    } else {
      alert("Error al guardar")
    }
  }

  const toolbarBtn = (active: boolean) =>
    `h-9 w-9 inline-flex items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/80
     hover:bg-white/10 hover:text-white transition ${active ? "ring-1 ring-purple-500 text-white" : ""}`

  const setLink = () => {
    const url = prompt("URL")
    if (url === null) return
    if (url === "") {
      editor?.chain().focus().unsetLink().run()
      return
    }
    editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label className="mb-1 block">Título</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-white/20 bg-white/5 text-white"
            required
          />
        </div>
        <div>
          <Label className="mb-1 block">Slug</Label>
          <Input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="border-white/20 bg-white/5 text-white"
            required
          />
        </div>
      </div>
      <div>
        <Label className="mb-1 block">Extracto</Label>
        <Input
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="border-white/20 bg-white/5 text-white"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label className="mb-1 block">Categoría</Label>
          <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
            <SelectTrigger className="border-white/20 bg-white/5 text-white">
              <SelectValue placeholder="Selecciona categoría" />
            </SelectTrigger>
            <SelectContent>
              {["Criptomonedas", "Blockchain", "WEB3", "IA", "Tech", "Cultura Digital", "Opinión"].map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="mb-1 block">Tags (separados por coma)</Label>
          <Input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="border-white/20 bg-white/5 text-white"
          />
        </div>
      </div>
      <div>
        <Label className="mb-1 block">Imagen de portada</Label>
        <div className="flex items-center gap-3">
          <input type="file" accept="image/*" onChange={(e) => onFile(e.target.files?.[0])} className="text-sm" />
          {imageUrl ? (
            <span className="text-xs text-white/70">Imagen cargada</span>
          ) : (
            <span className="text-xs text-white/50">Opcional</span>
          )}
        </div>
      </div>

      <div>
        <Label className="mb-2 block">Contenido</Label>
        <div className="rounded-lg border border-white/20 bg-white/5">
          {/* Toolbar */}
          <div className="flex flex-wrap gap-2 border-b border-white/10 p-2">
            <button
              type="button"
              className={toolbarBtn(!!editor?.isActive("bold"))}
              onClick={() => editor?.chain().focus().toggleBold().run()}
              aria-label="Negrita"
              title="Negrita"
            >
              <Bold className="h-4 w-4" />
            </button>
            <button
              type="button"
              className={toolbarBtn(!!editor?.isActive("italic"))}
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              aria-label="Cursiva"
              title="Cursiva"
            >
              <Italic className="h-4 w-4" />
            </button>
            <button
              type="button"
              className={toolbarBtn(!!editor?.isActive("underline"))}
              onClick={() => editor?.chain().focus().toggleUnderline().run()}
              aria-label="Subrayado"
              title="Subrayado"
            >
              <UnderlineIcon className="h-4 w-4" />
            </button>

            <span className="mx-1 h-6 w-px bg-white/10" />

            <button
              type="button"
              className={toolbarBtn(!!editor?.isActive("heading", { level: 1 }))}
              onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
              aria-label="H1"
              title="H1"
            >
              <Heading1 className="h-4 w-4" />
            </button>
            <button
              type="button"
              className={toolbarBtn(!!editor?.isActive("heading", { level: 2 }))}
              onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
              aria-label="H2"
              title="H2"
            >
              <Heading2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              className={toolbarBtn(!!editor?.isActive("heading", { level: 3 }))}
              onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
              aria-label="H3"
              title="H3"
            >
              <Heading3 className="h-4 w-4" />
            </button>

            <span className="mx-1 h-6 w-px bg-white/10" />

            <button
              type="button"
              className={toolbarBtn(!!editor?.isActive("bulletList"))}
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
              aria-label="Lista"
              title="Lista"
            >
              <List className="h-4 w-4" />
            </button>
            <button
              type="button"
              className={toolbarBtn(!!editor?.isActive("orderedList"))}
              onClick={() => editor?.chain().focus().toggleOrderedList().run()}
              aria-label="Lista ordenada"
              title="Lista ordenada"
            >
              <ListOrdered className="h-4 w-4" />
            </button>
            <button
              type="button"
              className={toolbarBtn(!!editor?.isActive("blockquote"))}
              onClick={() => editor?.chain().focus().toggleBlockquote().run()}
              aria-label="Cita"
              title="Cita"
            >
              <Quote className="h-4 w-4" />
            </button>
            <button
              type="button"
              className={toolbarBtn(!!editor?.isActive("codeBlock"))}
              onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
              aria-label="Código"
              title="Código"
            >
              <Code2 className="h-4 w-4" />
            </button>

            <span className="mx-1 h-6 w-px bg-white/10" />

            <button
              type="button"
              className={toolbarBtn(!!editor?.isActive({ textAlign: "left" }))}
              onClick={() => editor?.chain().focus().setTextAlign("left").run()}
              aria-label="Alinear izquierda"
              title="Alinear izquierda"
            >
              <AlignLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              className={toolbarBtn(!!editor?.isActive({ textAlign: "center" }))}
              onClick={() => editor?.chain().focus().setTextAlign("center").run()}
              aria-label="Centrar"
              title="Centrar"
            >
              <AlignCenter className="h-4 w-4" />
            </button>
            <button
              type="button"
              className={toolbarBtn(!!editor?.isActive({ textAlign: "right" }))}
              onClick={() => editor?.chain().focus().setTextAlign("right").run()}
              aria-label="Alinear derecha"
              title="Alinear derecha"
            >
              <AlignRight className="h-4 w-4" />
            </button>

            <span className="mx-1 h-6 w-px bg-white/10" />

            <button type="button" className={toolbarBtn(!!editor?.isActive("link"))} onClick={setLink} title="Enlace">
              <LinkIcon className="h-4 w-4" />
            </button>
          </div>
          {/* Editor area */}
          <EditorContent editor={editor} className="rounded-b-lg bg-transparent" />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="bg-purple-600 text-white hover:bg-purple-700" disabled={saving}>
          {saving ? "Guardando..." : "Guardar"}
        </Button>
      </div>
    </form>
  )
}

function fileToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
