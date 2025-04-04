"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { CopyIcon, CheckIcon, RefreshCwIcon, MaximizeIcon, MinimizeIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CodeEditorProps {
  initialHtml?: string
  initialCss?: string
  initialJs?: string
}

export function CodeEditor({ initialHtml = "", initialCss = "", initialJs = "" }: CodeEditorProps) {
  const [html, setHtml] = useState(initialHtml)
  const [css, setCss] = useState(initialCss)
  const [js, setJs] = useState(initialJs)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const previewRef = useRef<HTMLIFrameElement>(null)
  const editorRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Initialize state from props
  useEffect(() => {
    setHtml(initialHtml)
    setCss(initialCss)
    setJs(initialJs)
  }, [initialHtml, initialCss, initialJs])

  // Update preview when code changes
  useEffect(() => {
    updatePreview()
  }, [html, css, js])

  // Handle fullscreen mode
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isFullscreen) {
        setIsFullscreen(false)
      }
    }

    document.addEventListener("keydown", handleEsc)
    return () => {
      document.removeEventListener("keydown", handleEsc)
    }
  }, [isFullscreen])

  const updatePreview = () => {
    if (!previewRef.current) return

    const iframeDocument = previewRef.current.contentDocument
    if (!iframeDocument) return

    const combinedCode = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            ${css}
          </style>
        </head>
        <body>
          ${html}
          <script>
            ${js}
          </script>
        </body>
      </html>
    `

    iframeDocument.open()
    iframeDocument.write(combinedCode)
    iframeDocument.close()
  }

  const resetCode = () => {
    setHtml(initialHtml)
    setCss(initialCss)
    setJs(initialJs)
  }

  const copyCode = (type: "html" | "css" | "js" | "all") => {
    let codeToCopy = ""

    switch (type) {
      case "html":
        codeToCopy = html
        break
      case "css":
        codeToCopy = css
        break
      case "js":
        codeToCopy = js
        break
      case "all":
        codeToCopy = `<!-- HTML -->
${html}

/* CSS */
${css}

// JavaScript
${js}`
        break
    }

    navigator.clipboard.writeText(codeToCopy)
    setCopied(type)

    toast({
      title: "Code copied!",
      description: `The ${type === "all" ? "complete code" : type + " code"} has been copied to your clipboard`,
    })

    setTimeout(() => {
      setCopied(null)
    }, 2000)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div ref={editorRef} className={`${isFullscreen ? "fixed inset-0 z-50 p-4 bg-background" : "relative w-full"}`}>
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium">Code Editor</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={resetCode} title="Reset code">
              <RefreshCwIcon className="h-4 w-4" />
              <span className="sr-only">Reset</span>
            </Button>
            <Button variant="outline" size="sm" onClick={() => copyCode("all")} title="Copy all code">
              {copied === "all" ? <CheckIcon className="h-4 w-4 text-green-500" /> : <CopyIcon className="h-4 w-4" />}
              <span className="sr-only">Copy all</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullscreen}
              title={isFullscreen ? "Exit fullscreen" : "Fullscreen mode"}
            >
              {isFullscreen ? <MinimizeIcon className="h-4 w-4" /> : <MaximizeIcon className="h-4 w-4" />}
              <span className="sr-only">{isFullscreen ? "Exit fullscreen" : "Fullscreen mode"}</span>
            </Button>
          </div>
        </div>

        <div
          className={`grid ${isFullscreen ? "grid-cols-1 md:grid-cols-2 gap-4 h-[calc(100vh-6rem)]" : "grid-cols-1 gap-4"}`}
        >
          <div className={`${isFullscreen ? "h-full overflow-hidden" : "h-[400px]"}`}>
            <Tabs defaultValue="html" className="h-full flex flex-col">
              <TabsList>
                <TabsTrigger value="html">HTML</TabsTrigger>
                <TabsTrigger value="css">CSS</TabsTrigger>
                <TabsTrigger value="js">JavaScript</TabsTrigger>
              </TabsList>

              <TabsContent value="html" className="flex-1 relative">
                <div className="absolute top-2 right-2 z-10">
                  <Button variant="ghost" size="sm" onClick={() => copyCode("html")} className="h-7 w-7 p-0">
                    {copied === "html" ? (
                      <CheckIcon className="h-4 w-4 text-green-500" />
                    ) : (
                      <CopyIcon className="h-4 w-4" />
                    )}
                    <span className="sr-only">Copy HTML</span>
                  </Button>
                </div>
                <textarea
                  className="w-full h-full p-4 font-mono text-sm bg-slate-950 text-slate-50 resize-none focus:outline-none rounded-md"
                  value={html}
                  onChange={(e) => setHtml(e.target.value)}
                  placeholder="Enter HTML here..."
                  spellCheck="false"
                />
              </TabsContent>

              <TabsContent value="css" className="flex-1 relative">
                <div className="absolute top-2 right-2 z-10">
                  <Button variant="ghost" size="sm" onClick={() => copyCode("css")} className="h-7 w-7 p-0">
                    {copied === "css" ? (
                      <CheckIcon className="h-4 w-4 text-green-500" />
                    ) : (
                      <CopyIcon className="h-4 w-4" />
                    )}
                    <span className="sr-only">Copy CSS</span>
                  </Button>
                </div>
                <textarea
                  className="w-full h-full p-4 font-mono text-sm bg-slate-950 text-slate-50 resize-none focus:outline-none rounded-md"
                  value={css}
                  onChange={(e) => setCss(e.target.value)}
                  placeholder="Enter CSS here..."
                  spellCheck="false"
                />
              </TabsContent>

              <TabsContent value="js" className="flex-1 relative">
                <div className="absolute top-2 right-2 z-10">
                  <Button variant="ghost" size="sm" onClick={() => copyCode("js")} className="h-7 w-7 p-0">
                    {copied === "js" ? (
                      <CheckIcon className="h-4 w-4 text-green-500" />
                    ) : (
                      <CopyIcon className="h-4 w-4" />
                    )}
                    <span className="sr-only">Copy JavaScript</span>
                  </Button>
                </div>
                <textarea
                  className="w-full h-full p-4 font-mono text-sm bg-slate-950 text-slate-50 resize-none focus:outline-none rounded-md"
                  value={js}
                  onChange={(e) => setJs(e.target.value)}
                  placeholder="Enter JavaScript here..."
                  spellCheck="false"
                />
              </TabsContent>
            </Tabs>
          </div>

          <div className={`${isFullscreen ? "h-full" : "h-[400px]"}`}>
            <Card className="h-full overflow-hidden">
              <div className="bg-white dark:bg-slate-800 p-1 border-b">
                <p className="text-xs text-center text-muted-foreground">Preview</p>
              </div>
              <div className="h-[calc(100%-2rem)] bg-white dark:bg-slate-800">
                <iframe
                  ref={previewRef}
                  className="w-full h-full border-0"
                  title="Code Preview"
                  sandbox="allow-scripts"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

