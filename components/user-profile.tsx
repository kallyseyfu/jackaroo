"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, User, Wallet, History, Shield, Bell, CreditCard, TrendingUp, Calendar } from "lucide-react"
import type { User as UserType, Screen } from "@/app/page"

interface UserProfileProps {
  user: UserType
  onNavigate: (screen: Screen) => void
  onUpdateUser: (user: Partial<UserType>) => void
}

export function UserProfile({ user, onNavigate, onUpdateUser }: UserProfileProps) {
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  })
  const [notifications, setNotifications] = useState({
    drawResults: true,
    promotions: true,
    winnings: true,
  })
  const [spendingLimit, setSpendingLimit] = useState(100)

  const handleSave = () => {
    onUpdateUser(formData)
    setEditMode(false)
  }

  const playHistory = [
    { date: "2024-01-12", type: "Ticket Purchase", amount: -5.0, points: +50 },
    { date: "2024-01-10", type: "Prize Won", amount: +25.0, points: +100 },
    { date: "2024-01-08", type: "Ticket Purchase", amount: -5.0, points: +50 },
    { date: "2024-01-05", type: "Daily Spin", amount: 0, points: +75 },
    { date: "2024-01-03", type: "Ticket Purchase", amount: -5.0, points: +50 },
  ]

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
            <h1 className="text-xl font-bold">Profile & Settings</h1>
            <p className="text-purple-100">Manage your account</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-purple-100">{user.email}</p>
            <Badge className="bg-yellow-500 text-yellow-900 mt-1">Regular Member</Badge>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Personal Information</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => (editMode ? handleSave() : setEditMode(true))}>
                    {editMode ? "Save" : "Edit"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!editMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!editMode}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-800">{user.tickets.length}</p>
                    <p className="text-sm text-blue-600">Total Tickets</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Wallet className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-800">${user.totalWon.toFixed(2)}</p>
                    <p className="text-sm text-green-600">Total Won</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wallet" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Wallet className="w-5 h-5" />
                  <span>Wallet Balance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <p className="text-4xl font-bold text-green-600">${user.balance.toFixed(2)}</p>
                  <p className="text-gray-600">Available Balance</p>
                </div>
                <div className="space-y-3">
                  <Button className="w-full" variant="outline">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Add Funds
                  </Button>
                  <Button className="w-full" variant="outline">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Withdraw Winnings
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Points Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <p className="text-3xl font-bold text-purple-600">{user.points.toLocaleString()}</p>
                  <p className="text-gray-600">Reward Points</p>
                </div>
                <Button className="w-full" variant="outline" onClick={() => onNavigate("points-rewards")}>
                  View Rewards
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Spending Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total Spent</span>
                    <span className="font-semibold">${user.totalSpent.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Won</span>
                    <span className="font-semibold text-green-600">${user.totalWon.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span>Net Result</span>
                    <span
                      className={`font-semibold ${
                        (user.totalWon - user.totalSpent) >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      ${(user.totalWon - user.totalSpent).toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <History className="w-5 h-5" />
                  <span>Play History</span>
                </CardTitle>
                <CardDescription>Your recent lottery activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {playHistory.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="font-medium">{item.type}</p>
                          <p className="text-sm text-gray-600">{item.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-semibold ${
                            item.amount > 0 ? "text-green-600" : item.amount < 0 ? "text-red-600" : "text-gray-600"
                          }`}
                        >
                          {item.amount > 0 ? "+" : ""}${item.amount.toFixed(2)}
                        </p>
                        <p className="text-sm text-purple-600">+{item.points} pts</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span>Notifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Draw Results</p>
                    <p className="text-sm text-gray-600">Get notified when draw results are available</p>
                  </div>
                  <Switch
                    checked={notifications.drawResults}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, drawResults: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Promotions</p>
                    <p className="text-sm text-gray-600">Receive special offers and promotions</p>
                  </div>
                  <Switch
                    checked={notifications.promotions}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, promotions: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Winnings</p>
                    <p className="text-sm text-gray-600">Get notified when you win prizes</p>
                  </div>
                  <Switch
                    checked={notifications.winnings}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, winnings: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Responsible Gaming</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="spending-limit">Weekly Spending Limit</Label>
                  <div className="flex items-center space-x-3 mt-2">
                    <Input
                      id="spending-limit"
                      type="number"
                      value={spendingLimit}
                      onChange={(e) => setSpendingLimit(Number(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-600">USD</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Set a weekly limit to control your spending</p>
                </div>
                <Button variant="outline" className="w-full">
                  <Shield className="w-4 h-4 mr-2" />
                  Self-Exclusion Options
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full">
                  Download Account Data
                </Button>
                <Button variant="destructive" className="w-full">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
