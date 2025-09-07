import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">FinanceApp</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">Smart Financial Planning</h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Take control of your finances with AI-powered insights, personalized recommendations, and comprehensive
            market analysis.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Start Your Financial Journey
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Personal Dashboard</CardTitle>
                <CardDescription>Track your income, expenses, and assets in one place</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Get a comprehensive view of your financial health with interactive charts and real-time updates.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Market Insights</CardTitle>
                <CardDescription>Stay updated with real-time market trends</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Monitor gold, silver, currency rates, and top stocks to make informed investment decisions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Predictions</CardTitle>
                <CardDescription>Get personalized financial recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Leverage machine learning to predict your financial future and optimize your investment strategy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
