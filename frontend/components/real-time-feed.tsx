"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, CreditCard, TrendingUp, Users, DollarSign } from "lucide-react"

interface Transaction {
  id: string
  type: "escrow" | "installment" | "release"
  amount: number
  product: string
  user: string
  timestamp: Date
}

export function RealTimeFeed() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [stats, setStats] = useState({
    activeUsers: 1247,
    totalVolume: 2400000,
    transactionsToday: 89,
  })

  // Simulate real-time transactions
  useEffect(() => {
    const mockTransactions: Omit<Transaction, "id" | "timestamp">[] = [
      { type: "installment", amount: 416.5, product: "MacBook Pro M3", user: "Alex J." },
      { type: "escrow", amount: 8500, product: "Rolex Submariner", user: "Sarah M." },
      { type: "installment", amount: 7500, product: "Tesla Model 3", user: "Mike R." },
      { type: "release", amount: 3200, product: "Canon EOS R5", user: "Emma L." },
      { type: "escrow", amount: 125000, product: "Steinway Piano", user: "David K." },
    ]

    const interval = setInterval(() => {
      const randomTx = mockTransactions[Math.floor(Math.random() * mockTransactions.length)]
      const newTransaction: Transaction = {
        ...randomTx,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
      }

      setTransactions((prev) => [newTransaction, ...prev.slice(0, 4)])

      // Update stats
      setStats((prev) => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 3),
        totalVolume: prev.totalVolume + newTransaction.amount,
        transactionsToday: prev.transactionsToday + 1,
      }))
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "escrow":
        return <Shield className="w-4 h-4 text-blue-600" />
      case "installment":
        return <CreditCard className="w-4 h-4 text-green-600" />
      case "release":
        return <TrendingUp className="w-4 h-4 text-purple-600" />
      default:
        return <DollarSign className="w-4 h-4 text-gray-600" />
    }
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "escrow":
        return "bg-blue-100 text-blue-700"
      case "installment":
        return "bg-green-100 text-green-700"
      case "release":
        return "bg-purple-100 text-purple-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="space-y-6">
      {/* Live Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="transform hover:scale-105 transition-all duration-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="text-2xl font-bold animate-counter">{stats.activeUsers.toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-600">Active Users</p>
          </CardContent>
        </Card>

        <Card className="transform hover:scale-105 transition-all duration-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span className="text-2xl font-bold animate-counter">${(stats.totalVolume / 1000000).toFixed(1)}M</span>
            </div>
            <p className="text-sm text-gray-600">Total Volume</p>
          </CardContent>
        </Card>

        <Card className="transform hover:scale-105 transition-all duration-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <span className="text-2xl font-bold animate-counter">{stats.transactionsToday}</span>
            </div>
            <p className="text-sm text-gray-600">Today</p>
          </CardContent>
        </Card>
      </div>

      {/* Live Transaction Feed */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <h3 className="font-semibold text-gray-900">Live Transactions</h3>
          </div>

          <div className="space-y-3">
            {transactions.map((tx, index) => (
              <div
                key={tx.id}
                className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-500 ${
                  index === 0 ? "animate-slide-in bg-green-50 border-green-200" : "bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                    {getTransactionIcon(tx.type)}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">${tx.amount.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">{tx.product}</div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getTransactionColor(tx.type)}>{tx.type}</Badge>
                  <div className="text-xs text-gray-500 mt-1">{tx.user}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
