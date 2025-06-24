"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star, Edit, AlertCircle } from "lucide-react"
import type { User, Screen, Ticket } from "@/app/page"

interface ModifyTicketProps {
  ticket: Ticket
  user: User
  onNavigate: (screen: Screen) => void
  onUpdateUser: (user: Partial<User>) => void
}

export function ModifyTicket({ ticket, user, onNavigate, onUpdateUser }: ModifyTicketProps) {
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null)
  const [newNumber, setNewNumber] = useState<number | null>(null)
  const [isConfirming, setIsConfirming] = useState(false)

  const modificationCost = 100

  const handlePositionSelect = (position: number) => {
    setSelectedPosition(position)
    setNewNumber(null)
  }

  const handleNumberSelect = (number: number) => {
    if (!ticket.numbers.includes(number)) {
      setNewNumber(number)
    }
  }

  const handleConfirmModification = () => {
    if (selectedPosition !== null && newNumber !== null && user.points >= modificationCost) {
      const updatedNumbers = [...ticket.numbers]
      updatedNumbers[selectedPosition] = newNumber
      updatedNumbers.sort((a, b) => a - b)

      const updatedTickets = user.tickets.map((t) =>
        t.id === ticket.id ? { ...t, numbers: updatedNumbers, canModify: false } : t,
      )

      onUpdateUser({
        points: user.points - modificationCost,
        tickets: updatedTickets,
      })

      setIsConfirming(true)
      setTimeout(() => {
        onNavigate("my-tickets")
      }, 2000)
    }
  }

  if (isConfirming) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Edit className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">Numbers Modified!</h2>
            <p className="text-gray-600 mb-4">Your ticket has been updated successfully</p>
            <div className="flex justify-center space-x-2 mb-4">
              {ticket.numbers.map((number, index) => (
                <div
                  key={index}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    index === selectedPosition
                      ? "bg-gradient-to-br from-green-500 to-emerald-600"
                      : "bg-gradient-to-br from-purple-500 to-blue-600"
                  }`}
                >
                  {index === selectedPosition ? newNumber : number}
                </div>
              ))}
            </div>
            <Badge className="bg-blue-100 text-blue-800">-{modificationCost} Points Used</Badge>
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
            onClick={() => onNavigate("my-tickets")}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Modify Ticket</h1>
            <p className="text-purple-100">Change one number on your ticket</p>
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span>Modification Cost</span>
            <Badge className="bg-yellow-500 text-yellow-900">
              <Star className="w-3 h-3 mr-1" />
              {modificationCost} Points
            </Badge>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span>Your Points</span>
            <span className="font-semibold">{user.points.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Current Numbers */}
        <Card>
          <CardHeader>
            <CardTitle>Current Numbers</CardTitle>
            <CardDescription>Tap a number to modify it</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center space-x-2">
              {ticket.numbers.map((number, index) => (
                <Button
                  key={index}
                  variant={selectedPosition === index ? "default" : "outline"}
                  onClick={() => handlePositionSelect(index)}
                  className={`w-12 h-12 rounded-full p-0 ${
                    selectedPosition === index
                      ? "bg-gradient-to-br from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                      : ""
                  }`}
                >
                  {number}
                </Button>
              ))}
            </div>
            {selectedPosition !== null && (
              <div className="mt-4 p-3 bg-orange-50 rounded-lg text-center">
                <p className="text-sm text-orange-800">
                  Position {selectedPosition + 1} selected: <strong>{ticket.numbers[selectedPosition]}</strong>
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Number Selection */}
        {selectedPosition !== null && (
          <Card>
            <CardHeader>
              <CardTitle>Choose New Number</CardTitle>
              <CardDescription>Select a number that's not already in your ticket</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 49 }, (_, i) => i + 1).map((number) => {
                  const isUsed = ticket.numbers.includes(number)
                  const isSelected = newNumber === number

                  return (
                    <Button
                      key={number}
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleNumberSelect(number)}
                      disabled={isUsed}
                      className={`aspect-square p-0 ${
                        isSelected
                          ? "bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                          : isUsed
                            ? "opacity-30"
                            : ""
                      }`}
                    >
                      {number}
                    </Button>
                  )
                })}
              </div>
              {newNumber && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg text-center">
                  <p className="text-sm text-green-800">
                    New number selected: <strong>{newNumber}</strong>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Modification Summary */}
        {selectedPosition !== null && newNumber !== null && (
          <Card>
            <CardHeader>
              <CardTitle>Modification Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Position {selectedPosition + 1}</span>
                <span>
                  {ticket.numbers[selectedPosition]} → {newNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Cost</span>
                <span className="font-semibold">{modificationCost} points</span>
              </div>
              <div className="flex justify-between">
                <span>Points After</span>
                <span className="font-semibold">{(user.points - modificationCost).toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Warning */}
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800">Important</h3>
                <p className="text-sm text-yellow-700">
                  You can only modify each ticket once. This action cannot be undone.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Confirm Button */}
        <Button
          onClick={handleConfirmModification}
          disabled={selectedPosition === null || newNumber === null || user.points < modificationCost}
          className="w-full h-14 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-lg font-bold"
        >
          {selectedPosition === null
            ? "Select a position to modify"
            : newNumber === null
              ? "Choose a new number"
              : user.points < modificationCost
                ? "Insufficient Points"
                : "Confirm Changes"}
        </Button>
      </div>
    </div>
  )
}
