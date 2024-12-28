"use client"

import { Header } from "@/components/header"

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 p-6">
        <div className="container mx-auto max-w-7xl">
          {children}
        </div>
      </main>
      <footer className="bg-white border-t py-4">
        <div className="container mx-auto text-center text-sm text-gray-500">
          © 2023 Go Business. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  )
}

