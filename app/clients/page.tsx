import { Clients } from "@/components/clients"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { AppShell } from "@/components/AppShell"

export default function ClientsPage() {
  return (
    <AppShell>
      <ProtectedRoute>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
          <Clients />
        </div>
      </ProtectedRoute>
    </AppShell>
  )
}

