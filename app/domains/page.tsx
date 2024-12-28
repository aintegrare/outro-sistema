import { Domains } from "@/components/domains"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { AppShell } from "@/components/AppShell"

export default function DomainsPage() {
  return (
    <AppShell>
      <ProtectedRoute>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">Domínios</h1>
          <Domains />
        </div>
      </ProtectedRoute>
    </AppShell>
  )
}

