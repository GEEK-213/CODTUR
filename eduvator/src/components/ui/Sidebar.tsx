"use client"
import { Home, BarChart, Users, Settings } from "lucide-react"
import Link from "next/link"

const links = [
  { name: "Dashboard", icon: Home, href: "/dashboard" },
  { name: "Analytics", icon: BarChart, href: "/analytics" },
  { name: "Users", icon: Users, href: "/users" },
  { name: "Settings", icon: Settings, href: "/settings" },
]

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-zinc-900 shadow-md hidden md:flex flex-col">
      <div className="p-6 font-bold text-xl text-zinc-800 dark:text-zinc-100">MyDashboard</div>
      <nav className="flex-1 space-y-1 p-4">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="flex items-center p-3 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <link.icon className="w-5 h-5 mr-3" />
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
