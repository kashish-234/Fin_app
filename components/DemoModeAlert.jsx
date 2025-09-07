import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"

export default function DemoModeAlert({ isDemo }) {
  if (!isDemo) return null

  return (
    <Alert className="mb-4 border-blue-200 bg-blue-50">
      <Info className="h-4 w-4 text-blue-600" />
      <AlertDescription className="text-blue-800">
        <strong>Demo Mode:</strong> Firebase is not configured. The app is running with mock data. To enable full
        functionality, please add your Firebase environment variables in Project Settings.
      </AlertDescription>
    </Alert>
  )
}
