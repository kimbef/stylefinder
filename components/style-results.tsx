"use client"

import { useState } from "react"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { CopyIcon, CheckIcon, CodeIcon, EyeIcon, EditIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { CodeEditor } from "@/components/code-editor"
import { convertTailwindComponent } from "@/utils/tailwind-to-css"

interface StyleResultsProps {
  results: any[]
  query: string
}

export function StyleResults({ results, query }: StyleResultsProps) {
  const { toast } = useToast()
  const [copiedId, setCopiedId] = useState<number | null>(null)
  // Add a new state for the selected result to edit
  const [selectedResult, setSelectedResult] = useState<any | null>(null)

  const copyToClipboard = (code: string, id: number) => {
    navigator.clipboard.writeText(code)
    setCopiedId(id)

    toast({
      title: "Code copied!",
      description: "The code snippet has been copied to your clipboard",
    })

    setTimeout(() => {
      setCopiedId(null)
    }, 2000)
  }

  // Add a function to handle editing a result
  const handleEditResult = (result: any) => {
    setSelectedResult(result)
  }

  // Add this right before the return statement
  const handleCloseEditor = () => {
    setSelectedResult(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Results for "{query}"</h2>
        <p className="text-sm text-muted-foreground">
          {results.length} style{results.length !== 1 ? "s" : ""} found
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {results.map((result) => (
          <Card key={result.id} className="overflow-hidden">
            <CardHeader className="p-4">
              <CardTitle>{result.title}</CardTitle>
              <CardDescription>{result.description}</CardDescription>
            </CardHeader>
            <Tabs defaultValue="preview" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="preview" className="flex items-center gap-1">
                  <EyeIcon className="h-4 w-4" />
                  Preview
                </TabsTrigger>
                <TabsTrigger value="code" className="flex items-center gap-1">
                  <CodeIcon className="h-4 w-4" />
                  Code
                </TabsTrigger>
              </TabsList>
              <TabsContent value="preview" className="p-0">
                <div className="bg-slate-100 dark:bg-slate-800 p-6 flex items-center justify-center min-h-[200px]">
                  <div dangerouslySetInnerHTML={{ __html: result.code.replace(/className/g, "class") }} />
                </div>
              </TabsContent>
              <TabsContent value="code" className="p-0">
                <div className="relative">
                  <pre className="language-jsx p-4 overflow-x-auto text-sm bg-slate-950 text-slate-50 rounded-b-lg max-h-[300px]">
                    <code>{result.code}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 h-8 w-8 p-0"
                    onClick={() => copyToClipboard(result.code, result.id)}
                  >
                    {copiedId === result.id ? (
                      <CheckIcon className="h-4 w-4 text-green-500" />
                    ) : (
                      <CopyIcon className="h-4 w-4" />
                    )}
                    <span className="sr-only">Copy code</span>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
            <CardFooter className="flex flex-wrap gap-2 p-4 pt-0">
              {result.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                >
                  {tag}
                </span>
              ))}
              <Button size="sm" variant="outline" className="ml-auto" onClick={() => handleEditResult(result)}>
                <EditIcon className="h-4 w-4 mr-2" />
                Edit in CodePen
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {selectedResult && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Edit: {selectedResult.title}</h3>
            <Button variant="outline" onClick={handleCloseEditor}>
              Close Editor
            </Button>
          </div>
          <CodeEditor
            initialHtml={convertTailwindComponent(selectedResult.code).html}
            initialCss={convertTailwindComponent(selectedResult.code).css}
            initialJs={convertTailwindComponent(selectedResult.code).js}
          />
        </div>
      )}
    </div>
  )
}

