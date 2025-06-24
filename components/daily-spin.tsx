"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Star, Gift, Ticket, Zap, Trophy } from "lucide-react"
import type { User, Screen } from "@/app/page"

interface DailySpinProps {
  user: User
  onNavigate: (screen: Screen) => void
  onUpdateUser: (user: Partial<User>) => void
}

export function DailySpin({ user, onNavigate, onUpdateUser }: DailySpinProps) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [hasSpun, setHasSpun] = useState(false)
  const [reward, setReward] = useState<{
    type: string
    amount: number
    icon: any
    color: string
    title: string
  } | null>(null)

  const rewards = [
    { type: "points", amount: 50, icon: Star, color: "text-yellow-600", title: "50 Points" },
    { type: "points", amount: 100, icon: Star, color: "text-yellow-600", title: "100 Points" },
    { type: "points", amount: 25, icon: Star, color: "text-yellow-600", title: "25 Points" },
    { type: "ticket", amount: 1, icon: Ticket, color: "text-green-600", title: "Free Ticket" },
    { type: "points", amount: 75, icon: Star, color: "text-yellow-600", title: "75 Points" },
    { type: "bonus", amount: 200, icon: Zap, color: "text-purple-600", title: "Bonus Points" },
    { type: "points", amount: 30, icon: Star, color: "text-yellow-600", title: "30 Points" },
    { type: "badge", amount: 1, icon: Trophy, color: "text-orange-600", title: "Lucky Badge" },
  ]

  const handleSpin = () => {
    setIsSpinning(true)

    setTimeout(() => {
      const randomReward = rewards[Math.floor(Math.random() * rewards.length)]
      setReward(randomReward)
      setIsSpinning(false)
      setHasSpun(true)

      // Update user based on reward
      if (randomReward.type === "points" || randomReward.type === "bonus") {
        onUpdateUser({
          points: user.points + randomReward.amount,
        })
      } else if (randomReward.type === "ticket") {
        // Add free ticket logic here
        onUpdateUser({
          points: user.points + 50, // Bonus points for free ticket
        })
      }
    }, 3000)
  }

  const resetSpin = () => {
    setHasSpun(false)
    setReward(null)
    onNavigate("dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-4">
        <div className="flex items-center space-x-3 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate("dashboard")}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Daily Spin</h1>
            <p className="text-orange-100">Spin the wheel for free rewards!</p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-lg font-semibold">Free Spin Available</p>
          <p className="text-orange-100">Come back tomorrow for another spin!</p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Spin Wheel */}
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="flex items-center justify-center space-x-2">
              <Gift className="w-6 h-6 text-orange-600" />
              <span>Spin to Win</span>
            </CardTitle>
            <CardDescription>
              {hasSpun ? "Congratulations on your reward!" : "Tap the wheel to spin for prizes"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Wheel */}
            <div className="relative mx-auto w-64 h-64">
              <div
                className={`w-full h-full rounded-full border-8 border-orange-400 bg-gradient-to-br from-orange-200 via-yellow-200 to-red-200 flex items-center justify-center transition-transform duration-3000 ease-out ${
                  isSpinning ? "animate-spin" : ""
                }`}
                style={{
                  transform: isSpinning ? "rotate(1800deg)" : "rotate(0deg)",
                  background: `conic-gradient(
                    from 0deg,
                    #fbbf24 0deg 45deg,
                    #f59e0b 45deg 90deg,
                    #d97706 90deg 135deg,
                    #b45309 135deg 180deg,
                    #92400e 180deg 225deg,
                    #78350f 225deg 270deg,
                    #451a03 270deg 315deg,
                    #fbbf24 315deg 360deg
                  )`,
                }}
              >
                {!hasSpun && !isSpinning && (
                  <Button
                    onClick={handleSpin}
                    size="lg"
                    className="w-20 h-20 rounded-full bg-white text-orange-600 hover:bg-gray-50 font-bold text-lg shadow-lg"
                  >
                    SPIN
                  </Button>
                )}
                {isSpinning && (
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                    <div className="animate-spin w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full"></div>
                  </div>
                )}
                {hasSpun && reward && (
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                    <reward.icon className={`w-8 h-8 ${reward.color}`} />
                  </div>
                )}
              </div>

              {/* Pointer */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-orange-600"></div>
              </div>
            </div>

            {/* Result */}
            {hasSpun && reward && (
              <div className="space-y-4">
                <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-center space-x-3 mb-3">
                    <reward.icon className={`w-8 h-8 ${reward.color}`} />
                    <h3 className="text-2xl font-bold text-green-800">{reward.title}</h3>
                  </div>
                  <p className="text-green-600 text-lg">You won {reward.title}!</p>
                </div>

                <Button
                  onClick={resetSpin}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                >
                  Collect Reward
                </Button>
              </div>
            )}

            {isSpinning && (
              <div className="text-center">
                <p className="text-lg font-semibold text-orange-600 animate-pulse">Spinning...</p>
                <p className="text-gray-600">Good luck!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Possible Rewards */}
        {!hasSpun && (
          <Card>
            <CardHeader>
              <CardTitle>Possible Rewards</CardTitle>
              <CardDescription>Here's what you could win today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {rewards.slice(0, 6).map((reward, index) => {
                  const Icon = reward.icon
                  return (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Icon className={`w-5 h-5 ${reward.color}`} />
                      <span className="font-medium text-sm">{reward.title}</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Daily Spin Rules */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Spin Rules</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <p>You get one free spin every 24 hours</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <p>Rewards are automatically added to your account</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <p>Come back tomorrow for another chance to win</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <p>VIP members get extra spins and better rewards</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
