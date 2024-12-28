import { AppShell } from "@/components/AppShell"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckSquare, Users, BookText, Globe } from 'lucide-react'
import { HomeBanner } from "@/components/home-banner"
import { theme } from '@/lib/theme'

export default function Home() {
  return (
    <AppShell>
      <ProtectedRoute>
        <div className="space-y-6">
          <HomeBanner />
          
          <div className="py-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-t-4" style={{ borderColor: theme.colors.primary }}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Clientes</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">25</div>
                  <p className="text-xs text-muted-foreground">
                    +2 desde o último mês
                  </p>
                </CardContent>
              </Card>
              <Card className="border-t-4" style={{ borderColor: theme.colors.secondary }}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tarefas</CardTitle>
                  <CheckSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    3 concluídas hoje
                  </p>
                </CardContent>
              </Card>
              <Card className="border-t-4" style={{ borderColor: theme.colors.primary }}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Artigos</CardTitle>
                  <BookText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">
                    2 publicados esta semana
                  </p>
                </CardContent>
              </Card>
              <Card className="border-t-4" style={{ borderColor: theme.colors.secondary }}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Domínios</CardTitle>
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15</div>
                  <p className="text-xs text-muted-foreground">
                    1 expirando em breve
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </AppShell>
  )
}

