import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combina clases CSS condicionales y elimina duplicados usando clsx y tailwind-merge.
 * Útil para componer props className en componentes React.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
