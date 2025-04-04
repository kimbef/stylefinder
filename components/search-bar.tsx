"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import { StyleResults } from "@/components/style-results"
import { useToast } from "@/hooks/use-toast"

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<any[] | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!query.trim()) {
      toast({
        title: "Search query is empty",
        description: "Please enter what style you're looking for",
        variant: "destructive",
      })
      return
    }

    setIsSearching(true)

    try {
      // In a real app, this would be an API call to your backend
      // For demo purposes, we'll simulate a response after a delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock results based on the query
      const mockResults = generateMockResults(query)
      setResults(mockResults)

      // Save to recent searches (would use localStorage in a real app)
      // This would be handled by a server action in a real app
    } catch (error) {
      toast({
        title: "Search failed",
        description: "There was an error processing your search",
        variant: "destructive",
      })
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="mx-auto max-w-2xl">
        <form onSubmit={handleSearch} className="relative">
          <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Describe the style you're looking for..."
            className="pl-10 py-6 text-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2" disabled={isSearching}>
            {isSearching ? "Searching..." : "Search"}
          </Button>
        </form>
        <p className="mt-2 text-sm text-muted-foreground">
          Try: "modern card with hover effect", "gradient button", "responsive navbar"
        </p>
      </div>

      {results && <StyleResults results={results} query={query} />}
    </div>
  )
}

// Helper function to generate mock results
function generateMockResults(query: string) {
  const queryLower = query.toLowerCase()

  if (queryLower.includes("button")) {
    return [
      {
        id: 1,
        title: "Gradient Button",
        description: "A modern button with a gradient background that changes on hover",
        preview: "/placeholder.svg?height=100&width=200",
        code: `<button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
  Click me
</button>`,
        tags: ["button", "gradient", "hover", "animation"],
      },
      {
        id: 2,
        title: "Outline Button",
        description: "A clean outline button with hover effect",
        preview: "/placeholder.svg?height=100&width=200",
        code: `<button className="px-4 py-2 border-2 border-blue-500 text-blue-500 font-medium rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-300">
  Click me
</button>`,
        tags: ["button", "outline", "hover"],
      },
      {
        id: 3,
        title: "Icon Button",
        description: "A button with an icon and text",
        preview: "/placeholder.svg?height=100&width=200",
        code: `<button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
  </svg>
  Add Item
</button>`,
        tags: ["button", "icon", "flex"],
      },
    ]
  }

  if (queryLower.includes("card")) {
    return [
      {
        id: 1,
        title: "Hover Effect Card",
        description: "A card with a smooth hover effect and shadow",
        preview: "/placeholder.svg?height=200&width=300",
        code: `<div className="max-w-sm rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white">
  <img className="w-full h-48 object-cover" src="/placeholder.svg?height=200&width=300" alt="Card image" />
  <div className="p-6">
    <h3 className="font-bold text-xl mb-2">Card Title</h3>
    <p className="text-gray-700 text-base">
      This is a card with a hover effect that increases the shadow.
    </p>
  </div>
</div>`,
        tags: ["card", "hover", "shadow"],
      },
      {
        id: 2,
        title: "Border Gradient Card",
        description: "A card with a gradient border",
        preview: "/placeholder.svg?height=200&width=300",
        code: `<div className="p-[2px] rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
  <div className="bg-white rounded-lg p-6 h-full">
    <h3 className="font-bold text-xl mb-2">Gradient Border</h3>
    <p className="text-gray-700">
      This card has a beautiful gradient border.
    </p>
  </div>
</div>`,
        tags: ["card", "gradient", "border"],
      },
      {
        id: 3,
        title: "Glass Morphism Card",
        description: "A modern glass effect card with backdrop blur",
        preview: "/placeholder.svg?height=200&width=300",
        code: `<div className="backdrop-blur-lg bg-white/30 rounded-xl border border-white/20 shadow-lg p-6">
  <h3 className="font-bold text-xl mb-2">Glass Card</h3>
  <p className="text-gray-800">
    This card uses glass morphism design with backdrop blur.
  </p>
</div>`,
        tags: ["card", "glass", "blur", "modern"],
      },
    ]
  }

  if (queryLower.includes("navbar") || queryLower.includes("nav")) {
    return [
      {
        id: 1,
        title: "Responsive Navbar",
        description: "A fully responsive navbar with mobile menu",
        preview: "/placeholder.svg?height=100&width=600",
        code: `<nav className="bg-white shadow">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between h-16">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <span className="text-xl font-bold">Logo</span>
        </div>
        <div className="hidden md:ml-6 md:flex md:space-x-8">
          <a href="#" className="border-b-2 border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
            Home
          </a>
          <a href="#" className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 text-sm font-medium">
            Features
          </a>
          <a href="#" className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 text-sm font-medium">
            Pricing
          </a>
        </div>
      </div>
      <div className="flex items-center">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium">
          Sign Up
        </button>
      </div>
    </div>
  </div>
</nav>`,
        tags: ["navbar", "responsive", "header"],
      },
    ]
  }

  // Default results if no specific category is matched
  return [
    {
      id: 1,
      title: "Custom Search Result",
      description: `Suggested style for "${query}"`,
      preview: "/placeholder.svg?height=150&width=300",
      code: `<div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
  <div className="shrink-0">
    <img className="h-12 w-12" src="/placeholder.svg?height=50&width=50" alt="ChitChat Logo" />
  </div>
  <div>
    <div className="text-xl font-medium text-black">Custom Component</div>
    <p className="text-slate-500">You searched for: ${query}</p>
  </div>
</div>`,
      tags: ["custom", "component", "flexible"],
    },
  ]
}

