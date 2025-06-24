"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, Star, Ticket, Clock, Trophy, TrendingUp, Gift, Sparkles, User } from "lucide-react" // Added User import
import type { Screen } from "@/app/page"

interface DashboardProps {
  user: { name: string; balance: number; points: number } // Updated type definition for user
  onNavigate: (screen: Screen) => void
}

export function Dashboard({ user, onNavigate }: DashboardProps) {
  const nextDraw = "2024-01-15 20:00"
  const winningNumbers = [7, 14, 23, 31, 42, 49]
  const recentWinners = [
    { name: "Sarah M.", amount: 50000, numbers: [1, 15, 23, 31, 42, 49] },
    { name: "Mike R.", amount: 25000, numbers: [3, 18, 27, 35, 41, 44] },
    { name: "Lisa K.", amount: 10000, numbers: [12, 19, 28, 33, 39, 47] },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">LuckyDraw</h1>
              <p className="text-purple-100">Welcome back, {user.name.split(" ")[0]}!</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate("profile")}
            className="text-white hover:bg-white/20"
          >
            <User className="w-6 h-6" />
          </Button>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-white/10 border-white/20 text-white">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Wallet className="w-5 h-5" />
                <span className="text-sm opacity-90">Balance</span>
              </div>
              <p className="text-2xl font-bold">${user.balance.toFixed(2)}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20 text-white">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5" />
                <span className="text-sm opacity-90">Points</span>
              </div>
              <p className="text-2xl font-bold">{user.points.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Buy Ticket Button */}
        <Button
          onClick={() => onNavigate("buy-ticket")}
          className="w-full h-16 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-xl font-bold shadow-lg"
        >
          <Ticket className="w-6 h-6 mr-3" />
          Buy Ticket - $5.00
        </Button>

        {/* Next Draw Countdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-purple-600" />
              <span>Next Draw</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600 mb-2">2h 45m</p>
              <p className="text-gray-600">January 15, 2024 at 8:00 PM</p>
              <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                <p className="text-sm font-medium text-purple-800">Jackpot: $2,500,000</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Latest Winning Numbers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-600" />
              <span>Latest Winning Numbers</span>
            </CardTitle>
            <CardDescription>Draw from January 12, 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center space-x-2 mb-4">
              {winningNumbers.map((number, index) => (
                <div
                  key={index}
                  className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold shadow-md"
                >
                  {number}
                </div>
              ))}
            </div>
            <div className="text-center">
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                Jackpot: $1,250,000
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Recent Winners */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span>Recent Winners</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentWinners.map((winner, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-semibold text-green-800">{winner.name}</p>
                  <p className="text-sm text-green-600">Won ${winner.amount.toLocaleString()}</p>
                </div>
                <div className="flex space-x-1">
                  {winner.numbers.slice(0, 3).map((num, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    >
                      {num}
                    </div>
                  ))}
                  <span className="text-green-600 text-sm">...</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" onClick={() => onNavigate("my-tickets")} className="h-16 flex-col space-y-1">
            <Ticket className="w-6 h-6" />
            <span>My Tickets</span>
          </Button>
          <Button variant="outline" onClick={() => onNavigate("points-rewards")} className="h-16 flex-col space-y-1">
            <Gift className="w-6 h-6" />
            <span>Rewards</span>
          </Button>
        </div>

        {/* Daily Spin Reminder */}
        <Card className="bg-gradient-to-r from-orange-100 to-red-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-orange-800">Daily Spin Available!</h3>
                <p className="text-sm text-orange-600">Spin the wheel for free rewards</p>
              </div>
              <Button onClick={() => onNavigate("daily-spin")} className="bg-orange-500 hover:bg-orange-600">
                Spin Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
