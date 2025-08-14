"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Star,
  Shield,
  CreditCard,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  Eye,
  MessageCircle,
  Download,
  Plus,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import Link from "next/link";
import Header from "@/components/header";
import { WalletStatus } from "@/components/wallet-status";
import ContractInteraction from "@/components/contract-interaction";
import { useWalletContext } from "@/contexts/WalletContext";

// Define WalletConnection type locally
type WalletConnection = {
  address: string;
  publicKey: string;
  network?: string;
  isConnected: boolean;
};

const stats = {
  totalValue: 125000,
  activeAgreements: 8,
  completedDeals: 47,
  escrowBalance: 23500,
};

const mockUserData = {
  profile: {
    name: "Alex Johnson",
    email: "alex@paystar.com",
    stellarAddress: "GCKFBEIYTKP74Q7EYM4QX6MJMHPOCQTEUUX2DOXR7LSMVEQCMX7KPASA",
    rating: 4.8,
    role: "vendor", // Added role for access control
    joinedDate: "2023-06-15",
    totalSales: 47,
    totalRevenue: 125000,
  },
  agreements: [
    {
      id: "AGR-001",
      product: "MacBook Pro M3",
      buyer: "Sarah Chen",
      seller: "Alex Johnson",
      role: "seller",
      type: "escrow",
      amount: 2499,
      status: "pending_delivery",
      createdDate: "2024-01-15",
      deliveryDeadline: "Jan 25, 2024",
    },
    {
      id: "AGR-002",
      product: "Tesla Model 3",
      buyer: "Mike Rodriguez",
      seller: "Alex Johnson",
      role: "seller",
      type: "installment",
      amount: 45000,
      status: "active",
      installmentsPaid: 8,
      installmentsTotal: 24,
      nextPayment: 1875,
      nextDueDate: "Feb 1, 2024",
      progress: 33,
    },
    {
      id: "AGR-003",
      product: "Canon EOS R5",
      buyer: "Lisa Wang",
      seller: "Alex Johnson",
      role: "seller",
      type: "installment",
      amount: 3899,
      status: "active",
      installmentsPaid: 2,
      installmentsTotal: 6,
      nextPayment: 649,
      nextDueDate: "Jan 28, 2024",
      progress: 33,
    },
  ],
  recentTransactions: [
    {
      id: "TX-001",
      type: "installment_payment",
      amount: 1875,
      product: "Tesla Model 3",
      date: "Jan 20, 2024",
      status: "confirmed",
    },
    {
      id: "TX-002",
      type: "escrow_deposit",
      amount: 2499,
      product: "MacBook Pro M3",
      date: "Jan 18, 2024",
      status: "confirmed",
    },
    {
      id: "TX-003",
      type: "installment_payment",
      amount: 649,
      product: "Canon EOS R5",
      date: "Jan 15, 2024",
      status: "confirmed",
    },
  ],
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [animatedStats, setAnimatedStats] = useState(stats);
  const [isLoading, setIsLoading] = useState(false);

  // Get wallet context
  const { isConnected, address } = useWalletContext();

  const { profile, agreements, recentTransactions } = mockUserData;

  // Animate stats on mount
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedStats((prev) => ({
        totalValue: prev.totalValue + Math.floor(Math.random() * 1000),
        activeAgreements: prev.activeAgreements,
        completedDeals: prev.completedDeals + Math.floor(Math.random() * 2),
        escrowBalance: prev.escrowBalance + Math.floor(Math.random() * 500),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const activeAgreements = agreements.filter(
    (a) => a.status === "active" || a.status === "pending_delivery"
  );
  const completedAgreements = agreements.filter(
    (a) => a.status === "completed"
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Wallet Status Section */}
        <div className="mb-8">
          <WalletStatus showDetails={false} />
        </div>

        <div className="mb-8 animate-fade-in-up">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, {profile.name}
              </h1>
              <p className="text-gray-400">
                Manage your PayStar marketplace activities
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge className="bg-green-600 text-white">
                  Vendor Dashboard
                </Badge>
                <Badge
                  variant="outline"
                  className="border-gray-700 text-gray-300"
                >
                  {profile.totalSales} Sales
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-400">Stellar Address</div>
                <div className="font-mono text-sm text-gray-300">
                  {profile.stellarAddress}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="transform hover:scale-105 transition-all duration-200 bg-transparent border-gray-700 text-gray-300 hover:text-white hover:border-gray-600"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 animate-fade-in-up bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Portfolio Value</p>
                  <p className="text-2xl font-bold text-white animate-counter">
                    ${animatedStats.totalValue.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                  <DollarSign className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-green-400">+12.5% this month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 animate-fade-in-up delay-100 bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Active Agreements</p>
                  <p className="text-2xl font-bold text-white">
                    {animatedStats.activeAgreements}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm text-gray-400">
                <Clock className="w-4 h-4 mr-1" />
                <span>3 payments due soon</span>
              </div>
            </CardContent>
          </Card>

          <Card className="transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 animate-fade-in-up delay-200 bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Completed Deals</p>
                  <p className="text-2xl font-bold text-white animate-counter">
                    {animatedStats.completedDeals}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                  <CheckCircle className="w-6 h-6 text-purple-400" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="text-gray-400">
                  {profile.rating} avg rating
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 animate-fade-in-up delay-300 bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Escrow Balance</p>
                  <p className="text-2xl font-bold text-white animate-counter">
                    ${animatedStats.escrowBalance.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-600/20 rounded-full flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                  <CreditCard className="w-6 h-6 text-orange-400" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm text-gray-400">
                <Shield className="w-4 h-4 mr-1" />
                <span>Secured in smart contracts</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 animate-fade-in-up delay-400 bg-gray-800 border-gray-700">
            <TabsTrigger
              value="overview"
              className="transition-all duration-200 hover:scale-105 data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="agreements"
              className="transition-all duration-200 hover:scale-105 data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400"
            >
              Agreements
            </TabsTrigger>
            <TabsTrigger
              value="transactions"
              className="transition-all duration-200 hover:scale-105 data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400"
            >
              Transactions
            </TabsTrigger>
            <TabsTrigger
              value="contracts"
              className="transition-all duration-200 hover:scale-105 data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400"
            >
              Smart Contracts
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="transition-all duration-200 hover:scale-105 data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400"
            >
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="animate-fade-in-up delay-500 bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-white">
                    <span>Active Agreements</span>
                    <Badge
                      variant="secondary"
                      className="animate-pulse bg-gray-700 text-gray-300"
                    >
                      {activeAgreements.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeAgreements.map((agreement, index) => (
                    <div
                      key={agreement.id}
                      className={`border border-gray-700 rounded-lg p-4 space-y-3 transform hover:scale-105 transition-all duration-300 animate-slide-in bg-gray-900/50`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-white">
                            {agreement.product}
                          </h4>
                          <p className="text-sm text-gray-400">
                            {agreement.role === "buyer"
                              ? `Seller: ${agreement.seller}`
                              : `Buyer: ${agreement.buyer}`}
                          </p>
                        </div>
                        <Badge
                          className={`${
                            agreement.type === "escrow"
                              ? "bg-blue-600/20 text-blue-400"
                              : "bg-green-600/20 text-green-400"
                          } animate-bounce-subtle`}
                        >
                          {agreement.type}
                        </Badge>
                      </div>

                      {agreement.type === "installment" && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Progress</span>
                            <span className="text-gray-300">
                              {agreement.installmentsPaid}/
                              {agreement.installmentsTotal} payments
                            </span>
                          </div>
                          <Progress
                            value={agreement.progress}
                            className="h-2 animate-progress-fill bg-gray-700"
                          />
                          <div className="flex justify-between text-sm text-gray-400">
                            <span>Next: ${agreement.nextPayment}</span>
                            <span>Due: {agreement.nextDueDate}</span>
                          </div>
                        </div>
                      )}

                      {agreement.type === "escrow" &&
                        agreement.status === "pending_delivery" && (
                          <div className="bg-yellow-600/20 rounded-lg p-3 animate-pulse">
                            <div className="flex items-center space-x-2 text-yellow-400">
                              <Clock className="w-4 h-4" />
                              <span className="text-sm">
                                Delivery due: {agreement.deliveryDeadline}
                              </span>
                            </div>
                          </div>
                        )}

                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 bg-transparent border-gray-700 text-gray-300 hover:text-white hover:border-gray-600 transform hover:scale-105 transition-all duration-200"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="transform hover:scale-105 transition-all duration-200 bg-transparent border-gray-700 text-gray-300 hover:text-white hover:border-gray-600"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="animate-fade-in-up delay-600 bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-white">
                    <span>Recent Transactions</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="transform hover:scale-105 transition-all duration-200 text-gray-400 hover:text-white"
                    >
                      <Link href="#transactions">View All</Link>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentTransactions.map((tx, index) => (
                    <div
                      key={tx.id}
                      className={`flex items-center justify-between py-3 border-b border-gray-700 transform hover:scale-105 transition-all duration-300 animate-slide-in`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center transform hover:rotate-12 transition-transform duration-300 ${
                            tx.type.includes("payment")
                              ? "bg-green-600/20"
                              : tx.type.includes("deposit")
                                ? "bg-blue-600/20"
                                : "bg-purple-600/20"
                          }`}
                        >
                          {tx.type.includes("payment") ? (
                            <ArrowUpRight className="w-5 h-5 text-green-400" />
                          ) : tx.type.includes("deposit") ? (
                            <ArrowDownRight className="w-5 h-5 text-blue-400" />
                          ) : (
                            <CheckCircle className="w-5 h-5 text-purple-400" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-white">
                            ${tx.amount.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-400">
                            {tx.product}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-300">{tx.date}</div>
                        <Badge className="bg-green-600/20 text-green-400 text-xs animate-pulse">
                          Confirmed
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card className="animate-fade-in-up delay-700 bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Calendar className="w-5 h-5" />
                  <span>Upcoming Payments</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agreements
                    .filter(
                      (a) => a.type === "installment" && a.status === "active"
                    )
                    .map((agreement, index) => (
                      <div
                        key={agreement.id}
                        className={`flex items-center justify-between p-4 bg-gray-900/50 rounded-lg transform hover:scale-105 transition-all duration-300 animate-slide-in`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                            <CreditCard className="w-6 h-6 text-blue-400" />
                          </div>
                          <div>
                            <div className="font-medium text-white">
                              {agreement.product}
                            </div>
                            <div className="text-sm text-gray-400">
                              Payment {(agreement.installmentsPaid || 0) + 1} of{" "}
                              {agreement.installmentsTotal}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-white">
                            ${agreement.nextPayment}
                          </div>
                          <div className="text-sm text-gray-400">
                            Due {agreement.nextDueDate}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="agreements" className="space-y-6 mt-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">All Agreements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Detailed agreement management coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6 mt-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Transaction History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Complete transaction history coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contracts" className="space-y-6 mt-6">
            {isConnected ? (
              <ContractInteraction wallet={{ address, isConnected }} />
            ) : (
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <p className="text-gray-400 text-center">
                    Connect your wallet to interact with smart contracts
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 mt-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Analytics & Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Advanced analytics dashboard coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
