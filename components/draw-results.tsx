"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Trophy, Sparkles, PartyPopper } from "lucide-react"
import type { User, Screen } from "@/app/page"

interface DrawResultsProps {
  user: User
  onNavigate: (screen: Screen) => void
}

export function DrawResults({ user, onNavigate }: DrawResultsProps) {
  const [isRevealing, setIsRevealing] = useState(true)
  const [revealedNumbers, setRevealedNumbers] = useState<number[]>([])

  const winningNumbers = [7, 14, 23, 31, 42, 49]
  const jackpotAmount = 1250000
  const drawDate = "January 12, 2024"

  // Check user's tickets against winning numbers
  const checkTicketResults = () => {
    return user.tickets.map((ticket) => {
      const matches = ticket.numbers.filter((num) => winningNumbers.includes(num)).length
      let prize = 0
      let status = "lost" as const

      if (matches >= 3) {
        status = "won"
        switch (matches) {
          case 3:
            prize = 10
            break
          case 4:
            prize = 100
            break
          case 5:
            prize = 5000
            break
          case 6:
            prize = jackpotAmount
            break
        }
      }

      return {
        ...ticket,
        matches,
        prize,
        status,
        closeCall: matches === 5, // One number away from jackpot
      }
    })
  }

  const ticketResults = checkTicketResults()
  const hasWinningTicket = ticketResults.some((t) => t.status === "won")
  const hasCloseCall = ticketResults.some((t) => t.closeCall)

  useEffect(() => {
    if (isRevealing) {
      const timer = setInterval(() => {
        setRevealedNumbers((prev) => {
          if (prev.length < winningNumbers.length) {
            return [...prev, winningNumbers[prev.length]]
          } else {
            setIsRevealing(false)
            clearInterval(timer)
            return prev
          }
        })
      }, 800)

      return () => clearInterval(timer)
    }
  }, [isRevealing])

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
            <h1 className="text-xl font-bold">Draw Results</h1>
            <p className="text-purple-100">{drawDate}</p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-lg font-semibold mb-2">Jackpot Winner!</p>
          <p className="text-3xl font-bold">${jackpotAmount.toLocaleString()}</p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Winning Numbers Reveal */}
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center space-x-2">
              <Trophy className="w-6 h-6 text-yellow-600" />
              <span>Winning Numbers</span>
            </CardTitle>
            <CardDescription>
              Draw #{Math.floor(Math.random() * 1000) + 1000} - {drawDate}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center space-x-3 mb-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className={`w-14 h-14 rounded-full border-4 border-dashed border-yellow-400 flex items-center justify-center text-xl font-bold transition-all duration-500 ${
                    revealedNumbers[index]
                      ? "bg-gradient-to-br from-yellow-400 to-orange-500 text-white border-solid border-yellow-500 animate-bounce"
                      : "text-yellow-400"
                  }`}
                >
                  {revealedNumbers[index] || "?"}
                </div>
              ))}
            </div>

            {!isRevealing && (
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Sparkles className="w-5 h-5 text-yellow-600" />
                  <span className="font-semibold text-yellow-800">Numbers Revealed!</span>
                  <Sparkles className="w-5 h-5 text-yellow-600" />
                </div>
                {hasWinningTicket && (
                  <div className="flex items-center justify-center space-x-2 text-green-600">
                    <PartyPopper className="w-5 h-5" />
                    <span className="font-bold">Congratulations! You have winning tickets!</span>
                    <PartyPopper className="w-5 h-5" />
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Your Tickets Results */}
        {!isRevealing && (
          <Card>
            <CardHeader>
              <CardTitle>Your Tickets</CardTitle>
              <CardDescription>See how your numbers matched up</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {ticketResults.map((ticket) => (
                <div
                  key={ticket.id}
                  className={`p-4 rounded-lg border ${
                    ticket.status === "won"
                      ? "bg-green-50 border-green-200"
                      : ticket.closeCall
                        ? "bg-orange-50 border-orange-200"
                        : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <Badge
                      variant={ticket.status === "won" ? "default" : "secondary"}
                      className={ticket.status === "won" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                    >
                      {ticket.matches} matches
                    </Badge>
                    {ticket.prize > 0 && (
                      <div className="flex items-center space-x-1 text-green-600 font-bold">
                        <Trophy className="w-4 h-4" />
                        <span>+${ticket.prize.toLocaleString()}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center space-x-2 mb-3">
                    {ticket.numbers.map((number, index) => {
                      const isWinning = winningNumbers.includes(number)
                      return (
                        <div
                          key={index}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            isWinning ? "bg-green-500 text-white ring-2 ring-green-300" : "bg-gray-300 text-gray-600"
                          }`}
                        >
                          {number}
                        </div>
                      )
                    })}
                  </div>

                  {ticket.closeCall && (
                    <div className="text-center p-2 bg-orange-100 rounded text-orange-800 text-sm font-medium">
                      🎯 So close! You were just 1 number away from the jackpot!
                    </div>
                  )}

                  {ticket.status === "won" && (
                    <div className="text-center p-2 bg-green-100 rounded text-green-800 text-sm font-medium">
                      🎉 Winner! You matched {ticket.matches} numbers!
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Prize Breakdown */}
        {!isRevealing && (
          <Card>
            <CardHeader>
              <CardTitle>Prize Breakdown</CardTitle>
              <CardDescription>How much you can win with different matches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { matches: 6, prize: jackpotAmount, label: "Jackpot!" },
                  { matches: 5, prize: 5000, label: "Second Prize" },
                  { matches: 4, prize: 100, label: "Third Prize" },
                  { matches: 3, prize: 10, label: "Fourth Prize" },
                ].map((tier) => (
                  <div key={tier.matches} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-800 font-bold text-sm">
                        {tier.matches}
                      </div>
                      <span className="font-medium">
                        {tier.matches} matches - {tier.label}
                      </span>
                    </div>
                    <span className="font-bold text-purple-600">${tier.prize.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Next Draw Info */}
        {!isRevealing && (
          <Card className="bg-gradient-to-r from-blue-100 to-purple-100 border-blue-200">
            <CardContent className="p-4 text-center">
              <h3 className="font-semibold text-blue-800 mb-2">Next Draw</h3>
              <p className="text-blue-600 mb-3">January 15, 2024 at 8:00 PM</p>
              <p className="text-2xl font-bold text-purple-600 mb-4">Jackpot: $2,500,000</p>
              <Button
                onClick={() => onNavigate("buy-ticket")}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                Buy Ticket for Next Draw
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
