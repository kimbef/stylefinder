export default function AboutPage() {
  return (
    <main className="container py-10">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">About StyleFinder</h1>
          <p className="text-muted-foreground">Your AI-powered assistant for finding the perfect UI styles</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p>
            StyleFinder was created to solve a common problem faced by developers and designers: finding the right UI
            styles quickly and efficiently. Our mission is to streamline the process of styling web applications by
            providing AI-powered recommendations and ready-to-use code snippets.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">How It Works</h2>
          <p>
            StyleFinder uses advanced AI to understand your style requirements and suggest the best options based on
            modern design principles and UI/UX best practices. Simply describe what you're looking for, and our platform
            will generate tailored style suggestions complete with code snippets that you can copy and paste directly
            into your project.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Features</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>AI-powered style recommendations based on your specific needs</li>
            <li>Ready-to-use code snippets with Tailwind CSS</li>
            <li>Live previews of all suggested styles</li>
            <li>Curated examples of popular UI components</li>
            <li>Responsive designs that work on all devices</li>
            <li>Dark mode support for all components</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Technology Stack</h2>
          <p>
            StyleFinder is built with modern web technologies including Next.js, React, Tailwind CSS, and the Vercel AI
            SDK. Our platform leverages the power of large language models to provide intelligent style recommendations
            tailored to your specific needs.
          </p>
        </div>
      </div>
    </main>
  )
}

