import { Articles } from "@/components/articles"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { AppShell } from "@/components/AppShell"

export default function ArticlesPage() {
  return (
    <AppShell>
      <ProtectedRoute>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">Artigos</h1>
          <Articles />
        </div>
      </ProtectedRoute>
    </AppShell>
  )
}

