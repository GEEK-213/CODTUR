"use client"
import { Bell, Search, User } from "lucide-react"

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-white dark:bg-zinc-900">
      {/* Search */}
      <div className="relative w-1/2">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 rounded-lg border bg-zinc-50 dark:bg-zinc-800 dark:text-white"
        />
        <Search className="absolute right-3 top-2.5 w-5 h-5 text-zinc-500" />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Bell className="w-6 h-6 text-zinc-600 dark:text-zinc-300 cursor-pointer" />
        <div className="w-9 h-9 rounded-full bg-zinc-300 dark:bg-zinc-700 flex items-center justify-center cursor-pointer">
          <User className="w-5 h-5" />
        </div>
      </div>
    </header>
  )
}
