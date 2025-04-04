import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { PaintbrushIcon as PaintBrushIcon } from "lucide-react"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <PaintBrushIcon className="h-6 w-6 text-primary" />
          <Link href="/" className="text-xl font-bold">
            StyleFinder
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link href="/playground" className="text-sm font-medium hover:text-primary">
            Playground
          </Link>
          <Link href="/examples" className="text-sm font-medium hover:text-primary">
            Examples
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary">
            About
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button size="sm" className="hidden md:flex">
            Sign In
          </Button>
        </div>
      </div>
    </header>
  )
}

