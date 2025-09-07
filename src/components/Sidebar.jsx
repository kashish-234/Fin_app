import { Link, useLocation } from "react-router-dom"
import { cn } from "../lib/utils"
import { LayoutDashboard, TrendingUp, Brain, User } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Market Trends", href: "/market-trends", icon: TrendingUp },
  { name: "Predictions", href: "/predictions", icon: Brain },
  { name: "Profile", href: "/profile-form", icon: User },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <div className="flex flex-col w-64 bg-gray-50 border-r">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                )}
              >
                <item.icon
                  className={cn(
                    isActive ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500",
                    "mr-3 flex-shrink-0 h-6 w-6",
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
