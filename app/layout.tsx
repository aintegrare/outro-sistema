import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { AuthProvider } from "@/contexts/AuthContext"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Go Business",
  description: "Sistema de Gerenciamento Avançado",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className={cn(inter.className, "h-full bg-background antialiased")}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

