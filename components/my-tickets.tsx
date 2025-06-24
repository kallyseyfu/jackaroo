"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, Edit, Trophy, Clock, Star } from "lucide-react"
import type { User, Screen, Ticket } from "@/app/page"

interface MyTicketsProps {
  user: User
  onNavigate: (screen: Screen) => void
  onModifyTicket: (ticket: Ticket) => void
}

export function MyTickets({ user, onNavigate, onModifyTicket }: MyTicketsProps) {
  const activeTickets = user.tickets.filter((t) => t.status === "active")
  const pastTickets = user.tickets.filter((t) => t.status !== "active")

  const TicketCard = ({ ticket }: { ticket: Ticket }) => (
    <Card
      className={`${
        ticket.status === "won"
          ? "bg-green-50 border-green-200"
          : ticket.status === "lost"
            ? "bg-gray-50 border-gray-200"
            : "bg-blue-50 border-blue-200"
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Draw: {ticket.drawDate}</span>
          </div>
          <Badge
            variant={ticket.status === "won" ? "default" : ticket.status === "lost" ? "secondary" : "outline"}
            className={
              ticket.status === "won"
                ? "bg-green-100 text-green-800"
                : ticket.status === "lost"
                  ? "bg-gray-100 text-gray-800"
                  : "bg-blue-100 text-blue-800"
            }
          >
            {ticket.status === "won" ? "Won" : ticket.status === "lost" ? "Lost" : "Active"}
          </Badge>
        </div>

        <div className="flex justify-center space-x-2 mb-4">
          {ticket.numbers.map((number, index) => (
            <div
              key={index}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                ticket.status === "won"
                  ? "bg-green-500 text-white"
                  : ticket.status === "lost"
                    ? "bg-gray-400 text-white"
                    : "bg-blue-500 text-white"
              }`}
            >
              {number}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span>Cost: ${ticket.cost.toFixed(2)}</span>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-yellow-500" />
              <span>+{ticket.pointsEarned}</span>
            </div>
          </div>
          {ticket.winAmount && (
            <div className="flex items-center space-x-1 text-green-600 font-semibold">
              <Trophy className="w-4 h-4" />
              <span>+${ticket.winAmount.toFixed(2)}</span>
            </div>
          )}
        </div>

        {ticket.canModify && ticket.status === "active" && (
          <Button onClick={() => onModifyTicket(ticket)} variant="outline" size="sm" className="w-full mt-3">
            <Edit className="w-4 h-4 mr-2" />
            Modify Numbers (100 points)
          </Button>
        )}
      </CardContent>
    </Card>
  )

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
            <h1 className="text-xl font-bold">My Tickets</h1>
            <p className="text-purple-100">Track your lottery entries</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-2xl font-bold">{user.tickets.length}</p>
            <p className="text-sm opacity-90">Total Tickets</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-2xl font-bold">{activeTickets.length}</p>
            <p className="text-sm opacity-90">Active</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-2xl font-bold">{user.tickets.filter((t) => t.status === "won").length}</p>
            <p className="text-sm opacity-90">Won</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active" className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Active ({activeTickets.length})</span>
            </TabsTrigger>
            <TabsTrigger value="past" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Past ({pastTickets.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4 mt-6">
            {activeTickets.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No Active Tickets</h3>
                  <p className="text-gray-500 mb-4">You don't have any tickets for upcoming draws</p>
                  <Button onClick={() => onNavigate("buy-ticket")}>Buy Your First Ticket</Button>
                </CardContent>
              </Card>
            ) : (
              activeTickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4 mt-6">
            {pastTickets.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No Past Tickets</h3>
                  <p className="text-gray-500">Your ticket history will appear here</p>
                </CardContent>
              </Card>
            ) : (
              pastTickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
