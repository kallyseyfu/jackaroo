"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Shuffle, Star, Ticket } from "lucide-react"
import type { User, Screen } from "@/app/page"

interface BuyTicketProps {
  user: User
  onNavigate: (screen: Screen) => void
  onUpdateUser: (user: Partial<User>) => void
}

export function BuyTicket({ user, onNavigate, onUpdateUser }: BuyTicketProps) {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])
  const [isConfirming, setIsConfirming] = useState(false)

  const ticketCost = 5.0
  const pointsPerTicket = 50

  const handleNumberSelect = (number: number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== number))
    } else if (selectedNumbers.length < 6) {
      setSelectedNumbers([...selectedNumbers, number])
    }
  }

  const generateRandomNumbers = () => {
    const numbers = []
    while (numbers.length < 6) {
      const num = Math.floor(Math.random() * 49) + 1
      if (!numbers.includes(num)) {
        numbers.push(num)
      }
    }
    setSelectedNumbers(numbers.sort((a, b) => a - b))
  }

  const handlePurchase = () => {
    if (selectedNumbers.length === 6 && user.balance >= ticketCost) {
      const newTicket = {
        id: Date.now().toString(),
        numbers: selectedNumbers,
        drawDate: "2024-01-15",
        cost: ticketCost,
        pointsEarned: pointsPerTicket,
        status: "active" as const,
        canModify: true,
      }

      onUpdateUser({
        balance: user.balance - ticketCost,
        points: user.points + pointsPerTicket,
        tickets: [...user.tickets, newTicket],
      })

      setIsConfirming(true)
      setTimeout(() => {
        onNavigate("dashboard")
      }, 2000)
    }
  }

  if (isConfirming) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Ticket className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">Ticket Purchased!</h2>
            <p className="text-gray-600 mb-4">Your numbers have been entered for the next draw</p>
            <div className="flex justify-center space-x-2 mb-4">
              {selectedNumbers.map((number, index) => (
                <div
                  key={index}
                  className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold"
                >
                  {number}
                </div>
              ))}
            </div>
            <Badge className="bg-green-100 text-green-800">+{pointsPerTicket} Points Earned!</Badge>
          </CardContent>
        </Card>
      </div>
    )
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
            <h1 className="text-xl font-bold">Buy Ticket</h1>
            <p className="text-purple-100">Pick your lucky numbers</p>
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>Next Draw: Jan 15, 8:00 PM</span>
            <span>Jackpot: $2.5M</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Ticket Cost: $5.00</span>
            <Badge className="bg-yellow-500 text-yellow-900">
              <Star className="w-3 h-3 mr-1" />
              +50 Points
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Selected Numbers */}
        <Card>
          <CardHeader>
            <CardTitle>Your Numbers</CardTitle>
            <CardDescription>Select 6 numbers from 1 to 49</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center space-x-2 mb-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className={`w-12 h-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center ${
                    selectedNumbers[index]
                      ? "bg-gradient-to-br from-purple-500 to-blue-600 text-white font-bold border-solid border-purple-500"
                      : "text-gray-400"
                  }`}
                >
                  {selectedNumbers[index] || "?"}
                </div>
              ))}
            </div>
            <Button onClick={generateRandomNumbers} variant="outline" className="w-full">
              <Shuffle className="w-4 h-4 mr-2" />
              Quick Pick (Random)
            </Button>
          </CardContent>
        </Card>

        {/* Number Grid */}
        <Card>
          <CardHeader>
            <CardTitle>Pick Numbers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 49 }, (_, i) => i + 1).map((number) => (
                <Button
                  key={number}
                  variant={selectedNumbers.includes(number) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleNumberSelect(number)}
                  disabled={!selectedNumbers.includes(number) && selectedNumbers.length >= 6}
                  className={`aspect-square p-0 ${
                    selectedNumbers.includes(number)
                      ? "bg-gradient-to-br from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
                      : ""
                  }`}
                >
                  {number}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Purchase Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Purchase Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>Ticket Cost</span>
              <span className="font-semibold">${ticketCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Points Earned</span>
              <span className="font-semibold text-yellow-600">+{pointsPerTicket}</span>
            </div>
            <div className="flex justify-between">
              <span>Your Balance</span>
              <span className="font-semibold">${user.balance.toFixed(2)}</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between text-lg font-bold">
                <span>Balance After</span>
                <span>${(user.balance - ticketCost).toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Purchase Button */}
        <Button
          onClick={handlePurchase}
          disabled={selectedNumbers.length !== 6 || user.balance < ticketCost}
          className="w-full h-14 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-lg font-bold"
        >
          {selectedNumbers.length !== 6
            ? `Select ${6 - selectedNumbers.length} more numbers`
            : user.balance < ticketCost
              ? "Insufficient Balance"
              : "Confirm Purchase"}
        </Button>
      </div>
    </div>
  )
}
