"use client"

import { useState, useEffect } from "react"
import { CodeEditor } from "@/components/code-editor"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Template definitions
const templates = {
  empty: {
    html: `<div class="container">
  <h1>Hello, World!</h1>
  <p>Start editing to see some magic happen!</p>
</div>`,
    css: `.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: system-ui, -apple-system, sans-serif;
  text-align: center;
}

h1 {
  color: #3b82f6;
}

p {
  color: #666;
}`,
    js: `console.log('Hello from JavaScript!');`,
  },
  button: {
    html: `<button class="fancy-button">Click Me</button>`,
    css: `.fancy-button {
  padding: 10px 20px;
  font-size: 16px;
  background: linear-gradient(to right, #3b82f6, #9333ea);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.fancy-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}`,
    js: `document.querySelector('.fancy-button').addEventListener('click', function() {
  alert('Button clicked!');
});`,
  },
  card: {
    html: `<div class="card">
  <img src="/placeholder.svg?height=150&width=300" alt="Card image">
  <div class="card-content">
    <h3>Card Title</h3>
    <p>This is a description for the card. You can edit this text in the HTML panel.</p>
    <button class="card-button">Learn More</button>
  </div>
</div>`,
    css: `.card {
  width: 300px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.card-content {
  padding: 16px;
}

.card-content h3 {
  margin-top: 0;
  margin-bottom: 8px;
  font-size: 18px;
}

.card-content p {
  color: #666;
  margin-bottom: 16px;
}

.card-button {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.card-button:hover {
  background-color: #2563eb;
}`,
    js: `document.querySelector('.card-button').addEventListener('click', function() {
  console.log('Card button clicked!');
});`,
  },
  navbar: {
    html: `<nav class="navbar">
  <div class="navbar-logo">
    <a href="#">Logo</a>
  </div>
  <ul class="navbar-menu">
    <li><a href="#" class="active">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Services</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
  <button class="navbar-toggle">☰</button>
</nav>`,
    css: `.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-logo a {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
}

.navbar-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar-menu li {
  margin-left: 1.5rem;
}

.navbar-menu a {
  color: #666;
  text-decoration: none;
  transition: color 0.3s ease;
}

.navbar-menu a:hover, .navbar-menu a.active {
  color: #3b82f6;
}

.navbar-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

@media (max-width: 768px) {
  .navbar-menu {
    display: none;
  }
  
  .navbar-toggle {
    display: block;
  }
}`,
    js: `document.querySelector('.navbar-toggle').addEventListener('click', function() {
  const menu = document.querySelector('.navbar-menu');
  menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
});`,
  },
}

export default function PlaygroundPage() {
  const [templateName, setTemplateName] = useState("empty")
  const [html, setHtml] = useState("")
  const [css, setCss] = useState("")
  const [js, setJs] = useState("")
  const [editorKey, setEditorKey] = useState(Date.now())

  // Load template when templateName changes
  useEffect(() => {
    if (templates[templateName as keyof typeof templates]) {
      const template = templates[templateName as keyof typeof templates]
      setHtml(template.html)
      setCss(template.css)
      setJs(template.js)
      setEditorKey(Date.now()) // Force re-render of editor
    }
  }, [templateName])

  const handleTemplateChange = (template: string) => {
    setTemplateName(template)
  }

  return (
    <div className="container py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Code Playground</h1>
          <p className="text-muted-foreground mt-2">Test and experiment with HTML, CSS, and JavaScript in real-time</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Templates</CardTitle>
            <CardDescription>Start with a template or create your own design from scratch</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                variant={templateName === "empty" ? "default" : "outline"}
                className="h-auto py-4 flex flex-col gap-2"
                onClick={() => handleTemplateChange("empty")}
              >
                <div className="w-full h-12 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center text-2xl">
                  +
                </div>
                <span>Empty</span>
              </Button>

              <Button
                variant={templateName === "button" ? "default" : "outline"}
                className="h-auto py-4 flex flex-col gap-2"
                onClick={() => handleTemplateChange("button")}
              >
                <div className="w-full h-12 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center">
                  <div className="px-3 py-1 bg-blue-500 text-white text-sm rounded">Button</div>
                </div>
                <span>Button</span>
              </Button>

              <Button
                variant={templateName === "card" ? "default" : "outline"}
                className="h-auto py-4 flex flex-col gap-2"
                onClick={() => handleTemplateChange("card")}
              >
                <div className="w-full h-12 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center">
                  <div className="w-10 h-8 bg-white border rounded shadow-sm"></div>
                </div>
                <span>Card</span>
              </Button>

              <Button
                variant={templateName === "navbar" ? "default" : "outline"}
                className="h-auto py-4 flex flex-col gap-2"
                onClick={() => handleTemplateChange("navbar")}
              >
                <div className="w-full h-12 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center">
                  <div className="w-full h-4 bg-white border-b flex items-center px-2">
                    <div className="w-1/3 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
                <span>Navbar</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Only render the editor client-side after initial values are set */}
        {html && css && js && <CodeEditor key={editorKey} initialHtml={html} initialCss={css} initialJs={js} />}
      </div>
    </div>
  )
}

