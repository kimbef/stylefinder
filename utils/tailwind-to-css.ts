"use client"

// This is a simplified converter for demo purposes
// A real implementation would be more comprehensive
export function tailwindToCSS(tailwindClasses: string): string {
  // Extract class names from a component string
  const extractClasses = (str: string): string[] => {
    const classRegex = /className="([^"]*)"/g
    const matches = [...str.matchAll(classRegex)]
    return matches.map((match) => match[1])
  }

  // Basic mapping of some common Tailwind classes to CSS
  const classesToCSS = (classes: string): string => {
    const classMap: Record<string, string> = {
      // Colors
      "bg-white": "background-color: white;",
      "bg-black": "background-color: black;",
      "text-white": "color: white;",
      "text-black": "color: black;",

      // Sizing
      "w-full": "width: 100%;",
      "h-full": "height: 100%;",
      "max-w-sm": "max-width: 24rem;",

      // Spacing
      "p-4": "padding: 1rem;",
      "p-6": "padding: 1.5rem;",
      "px-4": "padding-left: 1rem; padding-right: 1rem;",
      "py-2": "padding-top: 0.5rem; padding-bottom: 0.5rem;",
      "m-4": "margin: 1rem;",
      "mx-auto": "margin-left: auto; margin-right: auto;",

      // Flexbox
      flex: "display: flex;",
      "items-center": "align-items: center;",
      "justify-center": "justify-content: center;",
      "gap-2": "gap: 0.5rem;",

      // Typography
      "text-sm": "font-size: 0.875rem; line-height: 1.25rem;",
      "text-lg": "font-size: 1.125rem; line-height: 1.75rem;",
      "font-bold": "font-weight: 700;",
      "text-xl": "font-size: 1.25rem; line-height: 1.75rem;",

      // Borders
      "rounded-lg": "border-radius: 0.5rem;",
      border: "border-width: 1px;",
      "border-2": "border-width: 2px;",

      // Effects
      "shadow-md": "box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);",
      "hover:shadow-lg":
        "&:hover { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }",

      // Transitions
      "transition-all":
        "transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms;",
      "duration-300": "transition-duration: 300ms;",
    }

    // Handle gradient backgrounds
    if (classes.includes("bg-gradient-to-r from-")) {
      const fromMatch = classes.match(/from-([^\s]*)/)
      const toMatch = classes.match(/to-([^\s]*)/)

      if (fromMatch && toMatch) {
        const fromColor = convertTailwindColorToHex(fromMatch[1])
        const toColor = convertTailwindColorToHex(toMatch[1])
        return `background: linear-gradient(to right, ${fromColor}, ${toColor});`
      }
    }

    // Process each class
    const classArray = classes.split(" ")
    return classArray
      .map((cls) => classMap[cls] || "")
      .filter(Boolean)
      .join("\n")
  }

  // Convert Tailwind color names to hex (simplified)
  const convertTailwindColorToHex = (color: string): string => {
    const colorMap: Record<string, string> = {
      "blue-500": "#3b82f6",
      "blue-600": "#2563eb",
      "purple-600": "#9333ea",
      "purple-700": "#7e22ce",
      "slate-800": "#1e293b",
      "slate-700": "#334155",
    }

    return colorMap[color] || color
  }

  // Extract HTML structure
  const extractHTML = (componentString: string): string => {
    // This is a very simplified approach
    return componentString
      .replace(/className="[^"]*"/g, "")
      .replace(/\s+/g, " ")
      .trim()
  }

  // Main conversion logic
  const classes = extractClasses(tailwindClasses).join(" ")
  const css = classesToCSS(classes)
  const html = extractHTML(tailwindClasses).replace(/</g, "&lt;").replace(/>/g, "&gt;")

  // For simplicity, we'll just return a basic structure
  // A real implementation would be more sophisticated
  return `/* Converted from Tailwind */
.component {
  ${css}
}`
}

// Convert a Tailwind component to separate HTML, CSS, and JS
export function convertTailwindComponent(componentString: string): { html: string; css: string; js: string } {
  // Extract HTML structure (simplified)
  let html = componentString
    .replace(/className="[^"]*"/g, 'class="component"')
    .replace(/\{([^{}]*)\}/g, "$1") // Replace simple React expressions
    .trim()

  // Clean up HTML for display
  html = html.replace(/\s+/g, " ").trim()

  // Generate CSS from Tailwind classes
  const css = tailwindToCSS(componentString)

  // Extract any JavaScript (this is very simplified)
  const jsRegex = /onClick=\{([^}]*)\}/g
  const jsMatches = [...componentString.matchAll(jsRegex)]
  let js = ""

  if (jsMatches.length > 0) {
    js = `// Event handlers
document.querySelector('.component').addEventListener('click', function() {
  // Add your click handler logic here
  console.log('Component clicked!');
});`
  }

  return { html, css, js }
}

