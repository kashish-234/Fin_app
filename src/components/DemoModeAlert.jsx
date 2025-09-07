import { Alert, AlertDescription } from "./ui/alert"
import { Info } from "lucide-react"

export default function DemoModeAlert({ isDemo }) {
  if (!isDemo) return null

  return (
    <Alert className="mb-6 border-blue-200 bg-blue-50">
      <Info className="h-4 w-4 text-blue-600" />
      <AlertDescription className="text-blue-800">
        <strong>Demo Mode:</strong> You're using the app in demo mode with mock data. Add Firebase environment variables
        to enable full functionality.
      </AlertDescription>
    </Alert>
  )
}
