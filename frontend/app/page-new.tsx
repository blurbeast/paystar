"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Shield,
  CreditCard,
  Zap,
  TrendingUp,
  CheckCircle,
  Sparkles,
  Star,
  Users,
  DollarSign,
  Wallet,
  Clock,
  Globe,
  ChevronRight,
  Play,
  Award,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import Header from "@/components/header";
import { useWalletContext } from "@/contexts/WalletContext";

export default function HomePage() {
  const [animatedStats, setAnimatedStats] = useState({
    escrow: 0,
    agreements: 0,
    successRate: 0,
    users: 0,
  });

  const { isConnected } = useWalletContext();

  // Animate stats on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats({
        escrow: 2400000,
        agreements: 1247,
        successRate: 99.8,
        users: 15420,
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: Shield,
      title: "Secure Escrow",
      description:
        "Smart contract-powered escrow ensures safe transactions for both buyers and sellers",
      color: "text-blue-500",
    },
    {
      icon: CreditCard,
      title: "Flexible Payments",
      description:
        "Support for installment plans and multiple payment options on Stellar network",
      color: "text-green-500",
    },
    {
      icon: Zap,
      title: "Instant Settlement",
      description:
        "Fast transaction processing with minimal fees on the Stellar blockchain",
      color: "text-yellow-500",
    },
    {
      icon: TrendingUp,
      title: "Real-time Analytics",
      description:
        "Track your portfolio and transaction history with detailed insights",
      color: "text-purple-500",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Digital Artist",
      avatar: "SC",
      content:
        "PayStar revolutionized how I sell my digital art. The escrow system gives both me and my buyers complete confidence.",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "Tech Entrepreneur",
      avatar: "MR",
      content:
        "The installment feature allowed me to purchase expensive equipment for my startup. Game-changer!",
      rating: 5,
    },
    {
      name: "Emily Thompson",
      role: "Collector",
      avatar: "ET",
      content:
        "I've completed over 50 transactions on PayStar. The security and transparency are unmatched.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10 dark:from-blue-400/5 dark:via-purple-400/5 dark:to-indigo-400/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge
                  variant="secondary"
                  className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Powered by Stellar Blockchain
                </Badge>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                  <span className="text-slate-900 dark:text-white">
                    Decentralized
                  </span>{" "}
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Commerce
                  </span>{" "}
                  <span className="text-slate-900 dark:text-white">
                    Platform
                  </span>
                </h1>

                <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                  Experience the future of secure transactions with smart
                  contract-powered escrow, flexible payment plans, and complete
                  transparency on the Stellar network.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="h-12 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  asChild
                >
                  <Link href={isConnected ? "/marketplace" : "/wallet"}>
                    {isConnected ? "Browse Marketplace" : "Connect Wallet"}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold transition-all duration-300"
                  asChild
                >
                  <Link href="/marketplace">
                    <Play className="mr-2 w-4 h-4" />
                    Watch Demo
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-slate-200 dark:border-slate-700">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    ${(animatedStats.escrow / 1000000).toFixed(1)}M+
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    Secured in Escrow
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    {animatedStats.agreements.toLocaleString()}+
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    Transactions
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    {animatedStats.successRate}%
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    Success Rate
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    {(animatedStats.users / 1000).toFixed(1)}K+
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    Active Users
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image/Visual */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 shadow-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">
                          Escrow Active
                        </div>
                        <div className="text-xs text-muted-foreground">
                          $2,499.00
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 shadow-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <Wallet className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">
                          Payment Plan
                        </div>
                        <div className="text-xs text-muted-foreground">
                          6 months
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 shadow-lg col-span-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                          <Star className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <div className="font-semibold">MacBook Pro M3</div>
                          <div className="text-sm text-muted-foreground">
                            Premium listing
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Verified
                      </Badge>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="secondary" className="px-3 py-1">
              Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Everything you need for secure commerce
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Built on Stellar blockchain with cutting-edge smart contracts for
              maximum security and transparency.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg"
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="secondary" className="px-3 py-1">
              Testimonials
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Trusted by thousands of users
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to experience the future of commerce?
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Join thousands of users who trust PayStar for their most important
            transactions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="h-12 px-8 bg-white text-blue-600 hover:bg-slate-50 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link href={isConnected ? "/marketplace" : "/wallet"}>
                {isConnected ? "Browse Marketplace" : "Get Started"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold transition-all duration-300"
              asChild
            >
              <Link href="/dashboard">View Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">PayStar</span>
              </div>
              <p className="text-slate-400 text-sm">
                Secure, decentralized commerce powered by Stellar blockchain
                technology.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link
                    href="/marketplace"
                    className="hover:text-white transition-colors"
                  >
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="hover:text-white transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/wallet"
                    className="hover:text-white transition-colors"
                  >
                    Wallet
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
            <p>
              &copy; 2025 PayStar. All rights reserved. Built with ❤️ on
              Stellar.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
