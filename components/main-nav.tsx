import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BookText, CheckSquare, Contact2, Globe, Home, PenTool } from 'lucide-react'

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const routes = [
    {
      href: "/",
      label: "Dashboard",
      icon: Home
    },
    {
      href: "/tasks",
      label: "Tarefas",
      icon: CheckSquare
    },
    {
      href: "/contacts", 
      label: "Contatos",
      icon: Contact2
    },
    {
      href: "/articles",
      label: "Artigos",
      icon: BookText  
    },
    {
      href: "/domains",
      label: "Domínios",
      icon: Globe
    },
    {
      href: "/writer",
      label: "Writer AI",
      icon: PenTool
    }
  ]

  return (
    <nav
      className={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1", className)}
      {...props}
    >
      {routes.map((route) => (
        <Button
          key={route.href}
          variant="ghost"
          className="justify-start"
          asChild
        >
          <Link href={route.href}>
            <route.icon className="mr-2 h-4 w-4" />
            {route.label}
          </Link>
        </Button>
      ))}
    </nav>
  )
}

