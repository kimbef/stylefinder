"use client"

import { Button } from "@/components/ui/button"
import { ArrowDownIcon } from "lucide-react"

export function Hero() {
  return (
    <div className="relative bg-gradient-to-b from-primary/10 to-background py-20 md:py-32">
      <div className="container text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Find the <span className="text-primary">perfect styles</span> for your projects
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          StyleFinder uses AI to recommend the best UI styles, provides ready-to-use code snippets, and includes a live
          code playground to test and modify your styles instantly.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Button
            size="lg"
            className="group"
            onClick={() => {
              const searchInput = document.querySelector('input[type="search"]')
              if (searchInput) {
                searchInput.scrollIntoView({ behavior: "smooth" })
                searchInput.focus()
              }
            }}
          >
            Start searching
            <ArrowDownIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => {
              window.location.href = "/playground"
            }}
          >
            Try Playground
          </Button>
        </div>
      </div>
    </div>
  )
}

