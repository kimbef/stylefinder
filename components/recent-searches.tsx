"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ClockIcon, XIcon } from "lucide-react"

export function RecentSearches() {
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  // In a real app, this would load from localStorage or a database
  useEffect(() => {
    const mockSearches = [
      "gradient button with animation",
      "responsive navbar with dropdown",
      "card with hover effect",
      "form input with validation styles",
    ]
    setRecentSearches(mockSearches)
  }, [])

  const handleClearSearch = (search: string) => {
    setRecentSearches(recentSearches.filter((s) => s !== search))
  }

  const handleClearAll = () => {
    setRecentSearches([])
  }

  if (recentSearches.length === 0) {
    return null
  }

  return (
    <Card className="mt-8">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ClockIcon className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Recent Searches</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={handleClearAll}>
            Clear All
          </Button>
        </div>
        <CardDescription>Your recent style searches</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {recentSearches.map((search, index) => (
            <div key={index} className="group flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm">
              <span>{search}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 rounded-full p-0 opacity-50 group-hover:opacity-100"
                onClick={() => handleClearSearch(search)}
              >
                <XIcon className="h-3 w-3" />
                <span className="sr-only">Remove</span>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

