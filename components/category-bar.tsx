"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type Category = "Criptomonedas" | "Blockchain" | "WEB3" | "IA" | "Tech" | "Cultura Digital" | "Opinión"

export const ALL_CATEGORIES: Category[] = [
  "Criptomonedas",
  "Blockchain",
  "WEB3",
  "IA",
  "Tech",
  "Cultura Digital",
  "Opinión",
]

export default function CategoryBar({
  selected = [],
  onToggle = () => {},
}: {
  selected?: Category[]
  onToggle?: (cat: Category) => void
}) {
  return (
    <div className="flex w-full flex-wrap gap-3">
      {ALL_CATEGORIES.map((cat) => {
        const active = selected.includes(cat)
        return (
          <Button
            key={cat}
            type="button"
            variant="outline"
            onClick={() => onToggle(cat)}
            className={cn(
              "rounded-full border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur transition",
              "hover:translate-y-[-1px] hover:bg-white/10 hover:text-white",
              active && "border-purple-500/50 bg-purple-600/20 text-white",
            )}
          >
            {cat}
          </Button>
        )
      })}
    </div>
  )
}
