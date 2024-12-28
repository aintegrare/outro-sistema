import { Writer } from "@/components/writer"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { AppShell } from "@/components/AppShell"

export default function WriterPage() {
  return (
    <AppShell>
      <ProtectedRoute>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">Writer AI</h1>
          <Writer />
        </div>
      </ProtectedRoute>
    </AppShell>
  )
}

