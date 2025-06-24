"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Star, Gift, Ticket, Edit, Zap, Crown, Trophy } from "lucide-react"
import type { User, Screen } from "@/app/page"

interface PointsRewardsProps {
  user: User
  onNavigate: (screen: Screen) => void
  onUpdateUser: (user: Partial<User>) => void
}

export function PointsRewards({ user, onNavigate, onUpdateUser }: PointsRewardsProps) {
  const [claimedRewards, setClaimedRewards] = useState<string[]>([])

  const rewards = [
    {
      id: "free-ticket",
      title: "Free Ticket",
      description: "Get a free lottery ticket",
      cost: 500,
      icon: Ticket,
      color: "bg-green-500",
      available: true,
    },
    {
      id: "modify-number",
      title: "Modify Number",
      description: "Change one number on any ticket",
      cost: 100,
      icon: Edit,
      color: "bg-blue-500",
      available: true,
    },
    {
      id: "daily-spin",
      title: "Extra Daily Spin",
      description: "Get an additional spin today",
      cost: 200,
      icon: Zap,
      color: "bg-purple-500",
      available: true,
    },
    {
      id: "vip-status",
      title: "VIP Status (7 days)",
      description: "Unlock exclusive features and bonuses",
      cost: 2000,
      icon: Crown,
      color: "bg-yellow-500",
      available: user.points >= 2000,
    },
    {
      id: "jackpot-boost",
      title: "Jackpot Boost",
      description: "2x points on your next ticket",
      cost: 300,
      icon: Trophy,
      color: "bg-orange-500",
      available: true,
    },
  ]

  const nextRewardThreshold = 2000
  const progressToNext = Math.min((user.points / nextRewardThreshold) * 100, 100)

  const handleClaimReward = (reward: (typeof rewards)[0]) => {
    if (user.points >= reward.cost && !claimedRewards.includes(reward.id)) {
      onUpdateUser({
        points: user.points - reward.cost,
      })
      setClaimedRewards([...claimedRewards, reward.id])
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
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
            <h1 className="text-xl font-bold">Points & Rewards</h1>
            <p className="text-purple-100">Redeem your points for amazing rewards</p>
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-semibold">Your Points</span>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-2xl font-bold">{user.points.toLocaleString()}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to VIP Status</span>
              <span>
                {user.points}/{nextRewardThreshold}
              </span>
            </div>
            <Progress value={progressToNext} className="h-2" />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Points Summary */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{user.points}</p>
              <p className="text-sm text-gray-600">Available Points</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Gift className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{claimedRewards.length}</p>
              <p className="text-sm text-gray-600">Rewards Claimed</p>
            </CardContent>
          </Card>
        </div>

        {/* How to Earn Points */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span>How to Earn Points</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Ticket className="w-5 h-5 text-green-600" />
                <span className="font-medium">Buy a ticket</span>
              </div>
              <Badge className="bg-green-100 text-green-800">+50 points</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Zap className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Daily spin</span>
              </div>
              <Badge className="bg-blue-100 text-blue-800">+10-100 points</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Trophy className="w-5 h-5 text-purple-600" />
                <span className="font-medium">Win a prize</span>
              </div>
              <Badge className="bg-purple-100 text-purple-800">+25-500 points</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Available Rewards */}
        <Card>
          <CardHeader>
            <CardTitle>Available Rewards</CardTitle>
            <CardDescription>Redeem your points for these amazing rewards</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {rewards.map((reward) => {
              const Icon = reward.icon
              const canAfford = user.points >= reward.cost
              const alreadyClaimed = claimedRewards.includes(reward.id)

              return (
                <div
                  key={reward.id}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    alreadyClaimed
                      ? "bg-gray-50 border-gray-200"
                      : canAfford
                        ? "bg-white border-gray-200 shadow-sm"
                        : "bg-gray-50 border-gray-200 opacity-60"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${reward.color} rounded-full flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{reward.title}</h3>
                      <p className="text-sm text-gray-600">{reward.description}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="w-3 h-3 text-yellow-500" />
                        <span className="text-sm font-medium">{reward.cost} points</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleClaimReward(reward)}
                    disabled={!canAfford || alreadyClaimed || !reward.available}
                    variant={alreadyClaimed ? "secondary" : "default"}
                    size="sm"
                  >
                    {alreadyClaimed ? "Claimed" : canAfford ? "Claim" : "Not enough points"}
                  </Button>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Daily Spin Reminder */}
        <Card className="bg-gradient-to-r from-orange-100 to-red-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-orange-800">Daily Spin Available!</h3>
                <p className="text-sm text-orange-600">Spin the wheel to earn more points</p>
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
