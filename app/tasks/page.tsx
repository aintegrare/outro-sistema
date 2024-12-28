import { Tasks } from "@/components/tasks"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { AppShell } from "@/components/AppShell"

export default function TasksPage() {
  return (
    <AppShell>
      <ProtectedRoute>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">Tarefas</h1>
          <Tasks />
        </div>
      </ProtectedRoute>
    </AppShell>
  )
}

