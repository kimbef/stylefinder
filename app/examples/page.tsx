import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeIcon, EyeIcon } from "lucide-react"

export default function ExamplesPage() {
  return (
    <main className="container py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Style Examples</h1>
          <p className="text-muted-foreground mt-2">Browse our collection of pre-made styles and components</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {examples.map((example) => (
            <Card key={example.id} className="overflow-hidden">
              <CardHeader className="p-4">
                <CardTitle>{example.title}</CardTitle>
                <CardDescription>{example.description}</CardDescription>
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
                    <div dangerouslySetInnerHTML={{ __html: example.code.replace(/className/g, "class") }} />
                  </div>
                </TabsContent>
                <TabsContent value="code" className="p-0">
                  <pre className="language-jsx p-4 overflow-x-auto text-sm bg-slate-950 text-slate-50 rounded-b-lg max-h-[300px]">
                    <code>{example.code}</code>
                  </pre>
                </TabsContent>
              </Tabs>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}

const examples = [
  {
    id: 1,
    title: "Gradient Button",
    description: "A modern button with a gradient background",
    code: `<button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
  Click me
</button>`,
  },
  {
    id: 2,
    title: "Card with Shadow",
    description: "A clean card with hover shadow effect",
    code: `<div className="max-w-sm rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white">
  <img className="w-full h-48 object-cover" src="/placeholder.svg?height=200&width=300" alt="Card image" />
  <div className="p-6">
    <h3 className="font-bold text-xl mb-2">Card Title</h3>
    <p className="text-gray-700 text-base">
      This is a card with a hover effect that increases the shadow.
    </p>
  </div>
</div>`,
  },
  {
    id: 3,
    title: "Responsive Navbar",
    description: "A fully responsive navigation bar",
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
  },
  {
    id: 4,
    title: "Input with Label",
    description: "A form input with floating label",
    code: `<div className="relative">
  <input
    id="email"
    type="email"
    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    placeholder=" "
  />
  <label
    htmlFor="email"
    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
  >
    Email Address
  </label>
</div>`,
  },
  {
    id: 5,
    title: "Testimonial Card",
    description: "A card for displaying testimonials",
    code: `<div className="bg-white rounded-lg shadow-md p-6 max-w-md">
  <div className="flex items-center mb-4">
    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
      JD
    </div>
    <div className="ml-4">
      <h3 className="font-medium">John Doe</h3>
      <p className="text-sm text-gray-500">CEO, Example Company</p>
    </div>
  </div>
  <p className="text-gray-700 italic">
    "This product has completely transformed our workflow. The interface is intuitive and the features are exactly what we needed."
  </p>
  <div className="mt-4 flex text-yellow-400">
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
  </div>
</div>`,
  },
  {
    id: 6,
    title: "Feature Section",
    description: "A section for highlighting features",
    code: `<div className="py-12 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="lg:text-center">
      <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
      <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        A better way to build
      </p>
      <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa libero labore natus atque, ducimus sed.
      </p>
    </div>

    <div className="mt-10">
      <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
        <div className="relative">
          <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <div className="ml-16">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Global Scale</h3>
            <p className="mt-2 text-base text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="ml-16">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Lightning Fast</h3>
            <p className="mt-2 text-base text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
  },
]

