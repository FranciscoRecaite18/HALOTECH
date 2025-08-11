import type React from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { verifyJWT } from "@/lib/auth"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const token = cookies().get("halo_token")?.value
  if (!token) redirect("/login")
  try {
    await verifyJWT(token)
  } catch {
    redirect("/login")
  }
  return children
}
