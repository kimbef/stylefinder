import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json()

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
    }

    // In a production app, you would use the AI SDK to generate tailored responses
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Generate 3 UI style suggestions for: "${query}". 
      For each suggestion, provide:
      1. A title
      2. A short description
      3. A code snippet using Tailwind CSS
      4. 3-5  
      1. A title
      2. A short description
      3. A code snippet using Tailwind CSS
      4. 3-5 relevant tags
      
      Format the response as a JSON array with objects containing these fields.`,
    })

    // Parse the AI response and format it for the frontend
    // In a real app, you would have more robust parsing and validation
    const styleResults = parseAIResponse(text, query)

    return NextResponse.json({ results: styleResults })
  } catch (error) {
    console.error("Style search error:", error)
    return NextResponse.json({ error: "Failed to process style search" }, { status: 500 })
  }
}

// Helper function to parse AI response
function parseAIResponse(text: string, query: string) {
  // In a real app, you would implement proper parsing logic
  // This is a simplified mock implementation

  // For demo purposes, return mock data based on the query
  const queryLower = query.toLowerCase()

  if (queryLower.includes("button")) {
    return [
      {
        id: 1,
        title: "Gradient Button",
        description: "A modern button with a gradient background that changes on hover",
        code: `<button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
  Click me
</button>`,
        tags: ["button", "gradient", "hover", "animation"],
      },
      {
        id: 2,
        title: "Outline Button",
        description: "A clean outline button with hover effect",
        code: `<button className="px-4 py-2 border-2 border-blue-500 text-blue-500 font-medium rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-300">
  Click me
</button>`,
        tags: ["button", "outline", "hover"],
      },
      {
        id: 3,
        title: "Icon Button",
        description: "A button with an icon and text",
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

  // Default response
  return [
    {
      id: 1,
      title: "Custom Style for " + query,
      description: "AI-generated style based on your search",
      code: `<div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
  <div className="shrink-0">
    <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
      AI
    </div>
  </div>
  <div>
    <div className="text-xl font-medium text-black">Style Suggestion</div>
    <p className="text-slate-500">Based on: ${query}</p>
  </div>
</div>`,
      tags: ["custom", "ai-generated", "responsive"],
    },
  ]
}

