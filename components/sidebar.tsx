"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { usePathname } from "next/navigation"
import { CheckSquare, Users, BookText, Globe, PenTool, Briefcase } from 'lucide-react'
import Link from "next/link"

export function Sidebar() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      icon: Briefcase,
      label: "Dashboard"
    },
    {
      href: "/clients",
      icon: Users,
      label: "Clientes"
    },
    {
      href: "/tasks",
      icon: CheckSquare,
      label: "Tarefas"
    },
    {
      href: "/articles",
      icon: BookText,
      label: "Artigos"
    },
    {
      href: "/domains",
      icon: Globe,
      label: "Domínios"
    },
    {
      href: "/writer",
      icon: PenTool,
      label: "Writer AI"
    }
  ]

  return (
    <Card className="flex h-full flex-col border-0 rounded-none shadow-none bg-background">
      <ScrollArea className="flex-1">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold">Menu</h2>
            <div className="space-y-1">
              {routes.map((route) => (
                <Button
                  key={route.href}
                  variant={pathname === route.href ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  asChild
                >
                  <Link href={route.href}>
                    <route.icon className="mr-2 h-4 w-4" />
                    {route.label}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </Card>
  )
}

