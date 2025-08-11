"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function SearchBar({
  value = "",
  onChange = () => {},
  placeholder = "Buscar artículo...",
}: {
  value?: string
  onChange?: (v: string) => void
  placeholder?: string
}) {
  return (
    <div className="relative w-full">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border-white/20 bg-white/5 pl-10 text-white placeholder:text-white/50"
      />
    </div>
  )
}
