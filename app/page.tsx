import { SearchBar } from "@/components/search-bar"
import { Hero } from "@/components/hero"
import { RecentSearches } from "@/components/recent-searches"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <SearchBar />
        <RecentSearches />
      </div>
    </main>
  )
}

