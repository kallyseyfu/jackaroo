"use client"

import { useState } from "react"
import { SignUpLogin } from "@/components/sign-up-login"
import { Dashboard } from "@/components/dashboard"
import { BuyTicket } from "@/components/buy-ticket"
import { MyTickets } from "@/components/my-tickets"
import { ModifyTicket } from "@/components/modify-ticket"
import { PointsRewards } from "@/components/points-rewards"
import { DrawResults } from "@/components/draw-results"
import { DailySpin } from "@/components/daily-spin"
import { UserProfile } from "@/components/user-profile"

export type Screen =
  | "login"
  | "dashboard"
  | "buy-ticket"
  | "my-tickets"
  | "modify-ticket"
  | "points-rewards"
  | "draw-results"
  | "daily-spin"
  | "profile"

export type User = {
  id: string
  name: string
  email: string
  balance: number
  points: number
  tickets: Ticket[]
  totalSpent: number
  totalWon: number
}

export type Ticket = {
  id: string
  numbers: number[]
  drawDate: string
  cost: number
  pointsEarned: number
  status: "active" | "won" | "lost"
  winAmount?: number
  canModify: boolean
}

export default function LotteryApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login")
  const [user, setUser] = useState<User | null>(null)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)

  const mockUser: User = {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    balance: 250.0,
    points: 1250,
    tickets: [
      {
        id: "1",
        numbers: [7, 14, 23, 31, 42, 49],
        drawDate: "2024-01-15",
        cost: 5.0,
        pointsEarned: 50,
        status: "active",
        canModify: true,
      },
      {
        id: "2",
        numbers: [3, 18, 27, 35, 41, 44],
        drawDate: "2024-01-12",
        cost: 5.0,
        pointsEarned: 50,
        status: "lost",
        canModify: false,
      },
      {
        id: "3",
        numbers: [12, 19, 28, 33, 39, 47],
        drawDate: "2024-01-10",
        cost: 5.0,
        pointsEarned: 50,
        status: "won",
        winAmount: 25.0,
        canModify: false,
      },
    ],
    totalSpent: 150.0,
    totalWon: 75.0,
  }

  const handleLogin = () => {
    setUser(mockUser)
    setCurrentScreen("dashboard")
  }

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen)
  }

  const handleModifyTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket)
    setCurrentScreen("modify-ticket")
  }

  const updateUser = (updatedUser: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updatedUser })
    }
  }

  if (!user && currentScreen !== "login") {
    return <SignUpLogin onLogin={handleLogin} />
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "login":
        return <SignUpLogin onLogin={handleLogin} />
      case "dashboard":
        return <Dashboard user={user!} onNavigate={navigateToScreen} />
      case "buy-ticket":
        return <BuyTicket user={user!} onNavigate={navigateToScreen} onUpdateUser={updateUser} />
      case "my-tickets":
        return <MyTickets user={user!} onNavigate={navigateToScreen} onModifyTicket={handleModifyTicket} />
      case "modify-ticket":
        return (
          <ModifyTicket ticket={selectedTicket!} user={user!} onNavigate={navigateToScreen} onUpdateUser={updateUser} />
        )
      case "points-rewards":
        return <PointsRewards user={user!} onNavigate={navigateToScreen} onUpdateUser={updateUser} />
      case "draw-results":
        return <DrawResults user={user!} onNavigate={navigateToScreen} />
      case "daily-spin":
        return <DailySpin user={user!} onNavigate={navigateToScreen} onUpdateUser={updateUser} />
      case "profile":
        return <UserProfile user={user!} onNavigate={navigateToScreen} onUpdateUser={updateUser} />
      default:
        return <Dashboard user={user!} onNavigate={navigateToScreen} />
    }
  }

  return <div className="min-h-screen bg-gray-50">{renderScreen()}</div>
}
