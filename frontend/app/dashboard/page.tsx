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
  Activity,
  Users,
  BarChart3,
  PieChart,
  Wallet,
  Package,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import Header from "@/components/header";
import { WalletStatus } from "@/components/wallet-status";
import ContractInteraction from "@/components/contract-interaction";
import { useWalletContext } from "@/contexts/WalletContext";

const stats = {
  totalValue: 125000,
  activeAgreements: 8,
  completedDeals: 47,
  escrowBalance: 23500,
  monthlyGrowth: 12.5,
  successRate: 98.2,
};

const mockUserData = {
  profile: {
    name: "Alex Johnson",
    email: "alex@paystar.com",
    stellarAddress: "GCKFBEIYTKP74Q7EYM4QX6MJMHPOCQTEUUX2DOXR7LSMVEQCMX7KPASA",
    rating: 4.8,
    role: "vendor",
    joinDate: "2024-01-15",
    totalTransactions: 142,
    verificationStatus: "verified",
  },
};

const agreements = [
  {
    id: "AGR-001",
    title: "MacBook Pro M3 Purchase",
    buyer: "Sarah Chen",
    seller: "TechStore Pro",
    amount: 2499.0,
    currency: "USD",
    status: "active",
    progress: 75,
    installmentsPaid: 3,
    totalInstallments: 4,
    nextPaymentDate: "2024-02-15",
    escrowAmount: 624.75,
    createdAt: "2024-01-15",
    category: "Electronics",
  },
  {
    id: "AGR-002",
    title: "Vintage Guitar Collection",
    buyer: "Mike Rodriguez",
    seller: "VintageGuitars",
    amount: 8500.0,
    currency: "USD",
    status: "pending_delivery",
    progress: 90,
    installmentsPaid: 6,
    totalInstallments: 6,
    nextPaymentDate: null,
    escrowAmount: 8500.0,
    createdAt: "2024-01-10",
    category: "Musical Instruments",
  },
  {
    id: "AGR-003",
    title: "Professional Camera Setup",
    buyer: "Lisa Wong",
    seller: "PhotoGear Pro",
    amount: 4200.0,
    currency: "USD",
    status: "completed",
    progress: 100,
    installmentsPaid: 6,
    totalInstallments: 6,
    nextPaymentDate: null,
    escrowAmount: 0,
    createdAt: "2023-12-20",
    category: "Electronics",
  },
];

const recentTransactions = [
  {
    id: "TXN-001",
    type: "payment",
    description: "Installment payment received",
    amount: 624.75,
    date: "2024-01-28",
    status: "completed",
    agreement: "AGR-001",
  },
  {
    id: "TXN-002",
    type: "escrow_release",
    description: "Escrow funds released",
    amount: 8500.0,
    date: "2024-01-25",
    status: "completed",
    agreement: "AGR-002",
  },
  {
    id: "TXN-003",
    type: "fee",
    description: "Platform fee",
    amount: -12.5,
    date: "2024-01-25",
    status: "completed",
    agreement: "AGR-002",
  },
];

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { isConnected, address } = useWalletContext();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Card className="text-center py-16">
            <CardContent>
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wallet className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Connect Your Wallet
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
                To access your dashboard and manage your agreements, please
                connect your Stellar wallet.
              </p>
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <Link href="/wallet">Connect Wallet</Link>
              </Button>
            </CardContent>
          </Card>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 mb-4 border border-white/20">
                <Activity className="w-4 h-4" />
                <span className="text-sm font-medium">Live Dashboard</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Welcome back, {mockUserData.profile.name}
              </h1>
              <p className="text-blue-100 text-lg">
                Manage your agreements and track your performance
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20">
                <Plus className="w-4 h-4 mr-2" />
                List Product
              </Button>
              <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Data
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Value</p>
                  <p className="text-2xl font-bold">
                    ${stats.totalValue.toLocaleString()}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-400" />
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Active Deals</p>
                  <p className="text-2xl font-bold">{stats.activeAgreements}</p>
                </div>
                <Package className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Success Rate</p>
                  <p className="text-2xl font-bold">{stats.successRate}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Escrow Balance</p>
                  <p className="text-2xl font-bold">
                    ${stats.escrowBalance.toLocaleString()}
                  </p>
                </div>
                <Shield className="w-8 h-8 text-purple-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Dashboard
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Welcome back, {mockUserData.profile.name}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center gap-2"
              >
                <RefreshCw
                  className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <Link href="/marketplace">
                  <Plus className="w-4 h-4 mr-2" />
                  New Agreement
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Total Portfolio
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      ${stats.totalValue.toLocaleString()}
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                      <ArrowUpRight className="w-3 h-3 mr-1" />+
                      {stats.monthlyGrowth}% this month
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Active Agreements
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {stats.activeAgreements}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {completedAgreements.length} completed
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Escrow Balance
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      ${stats.escrowBalance.toLocaleString()}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Secured funds
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Success Rate
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {stats.successRate}%
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                      Excellent rating
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Agreements & Transactions */}
            <div className="lg:col-span-2 space-y-6">
              <Tabs defaultValue="agreements" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="agreements">Agreements</TabsTrigger>
                  <TabsTrigger value="transactions">Transactions</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="agreements" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Active Agreements</span>
                        <Badge variant="secondary">
                          {activeAgreements.length}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {activeAgreements.map((agreement) => (
                        <div
                          key={agreement.id}
                          className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-slate-900 dark:text-white">
                                {agreement.title}
                              </h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                {agreement.buyer} ↔ {agreement.seller}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-slate-900 dark:text-white">
                                ${agreement.amount.toLocaleString()}
                              </div>
                              <Badge
                                variant={
                                  agreement.status === "active"
                                    ? "default"
                                    : "secondary"
                                }
                                className="text-xs"
                              >
                                {agreement.status.replace("_", " ")}
                              </Badge>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-600 dark:text-slate-400">
                                Progress
                              </span>
                              <span className="font-medium">
                                {agreement.progress}%
                              </span>
                            </div>
                            <Progress
                              value={agreement.progress}
                              className="h-2"
                            />
                            <div className="flex justify-between text-xs text-slate-500">
                              <span>
                                {agreement.installmentsPaid}/
                                {agreement.totalInstallments} installments paid
                              </span>
                              {agreement.nextPaymentDate && (
                                <span>
                                  Next:{" "}
                                  {new Date(
                                    agreement.nextPaymentDate
                                  ).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="transactions" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentTransactions.map((transaction) => (
                          <div
                            key={transaction.id}
                            className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700 last:border-0"
                          >
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  transaction.type === "payment"
                                    ? "bg-green-100 dark:bg-green-900"
                                    : transaction.type === "escrow_release"
                                      ? "bg-blue-100 dark:bg-blue-900"
                                      : "bg-red-100 dark:bg-red-900"
                                }`}
                              >
                                {transaction.type === "payment" ? (
                                  <ArrowDownRight className="w-4 h-4 text-green-600 dark:text-green-400" />
                                ) : transaction.type === "escrow_release" ? (
                                  <ArrowUpRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                ) : (
                                  <ArrowUpRight className="w-4 h-4 text-red-600 dark:text-red-400" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-slate-900 dark:text-white">
                                  {transaction.description}
                                </p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                  {new Date(
                                    transaction.date
                                  ).toLocaleDateString()}{" "}
                                  • {transaction.agreement}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div
                                className={`font-semibold ${
                                  transaction.amount > 0
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-red-600 dark:text-red-400"
                                }`}
                              >
                                {transaction.amount > 0 ? "+" : ""}$
                                {Math.abs(transaction.amount).toLocaleString()}
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {transaction.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Analytics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                          <BarChart3 className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-slate-900 dark:text-white">
                            {mockUserData.profile.totalTransactions}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            Total Transactions
                          </div>
                        </div>
                        <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                          <PieChart className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-slate-900 dark:text-white">
                            {mockUserData.profile.rating}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            Average Rating
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Column - Wallet & Profile */}
            <div className="space-y-6">
              {/* Wallet Status */}
              <WalletStatus />

              {/* Profile Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Profile</span>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {mockUserData.profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {mockUserData.profile.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">
                            {mockUserData.profile.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-slate-600 dark:text-slate-400">
                        Member since
                      </span>
                      <p className="font-medium">
                        {new Date(
                          mockUserData.profile.joinDate
                        ).toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-600 dark:text-slate-400">
                        Role
                      </span>
                      <p className="font-medium capitalize">
                        {mockUserData.profile.role}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-600 dark:text-slate-400">
                        Total Transactions
                      </span>
                      <p className="font-medium">
                        {mockUserData.profile.totalTransactions}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Link href="/marketplace">
                      <Package className="w-4 h-4 mr-2" />
                      Browse Marketplace
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Link href="/create-agreement">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Agreement
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
