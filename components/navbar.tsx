"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-emerald-600">ResumeAI</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" className="text-gray-700">
              Home
            </Button>
          </Link>
          <Link href="/builder">
            <Button className="bg-emerald-600 hover:bg-emerald-700">Build my resume</Button>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-white border-b shadow-lg">
          <div className="container py-4 flex flex-col gap-4">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-emerald-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link href="/builder" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Build my resume</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
