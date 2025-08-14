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
} from "lucide-react";
import Link from "next/link";
import Header from "@/components/header";

export default function HomePage() {
  const [currentStat, setCurrentStat] = useState(0);
  const [liveTransactionIndex, setLiveTransactionIndex] = useState(0);
  const [animatedStats, setAnimatedStats] = useState({
    escrow: 2400000,
    agreements: 1247,
    successRate: 99.8,
  });

  const liveTransactions = [
    {
      product: "MacBook Pro M3",
      amount: "$416.50",
      type: "installment",
      user: "Alex J.",
    },
    {
      product: "Tesla Model 3",
      amount: "$7,500",
      type: "installment",
      user: "Sarah M.",
    },
    {
      product: "Canon EOS R5",
      amount: "$3,200",
      type: "escrow",
      user: "Mike R.",
    },
    {
      product: "Rolex Submariner",
      amount: "$8,500",
      type: "escrow",
      user: "Emma L.",
    },
  ];

  // Animate stats on mount
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedStats((prev) => ({
        escrow: prev.escrow + Math.floor(Math.random() * 1000),
        agreements: prev.agreements + Math.floor(Math.random() * 3),
        successRate: Math.min(99.9, prev.successRate + Math.random() * 0.01),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Rotate live transactions
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTransactionIndex((prev) => (prev + 1) % liveTransactions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header />
      <section className="relative overflow-hidden py-24 lg:py-32">
        {/* Enhanced animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full opacity-30 animate-premium-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full opacity-30 animate-premium-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full opacity-20 animate-spin-slow"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-6">
                <Badge
                  variant="secondary"
                  className="glass-card text-primary hover:bg-primary/10 animate-bounce-subtle px-4 py-2 text-sm font-medium"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Powered by Stellar Blockchain
                </Badge>
                <h1 className="text-5xl lg:text-7xl font-bold font-serif text-foreground leading-tight">
                  Decentralized{" "}
                  <span className="animate-gradient-text">Commerce</span> with
                  PayStar
                </h1>
                <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed font-light">
                  Connect your Stellar wallet for secure, trustless transactions
                  powered by smart contracts.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 transform hover:scale-105 transition-all duration-300 hover:shadow-premium font-semibold"
                  asChild
                >
                  <Link href="/wallet">
                    Connect Wallet
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 glass-card hover:bg-muted/50 transform hover:scale-105 transition-all duration-300 font-semibold bg-transparent"
                  asChild
                >
                  <Link href="/marketplace">Browse Marketplace</Link>
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
                <div className="text-center transform hover:scale-105 transition-all duration-300 group">
                  <div className="text-3xl font-bold font-serif text-foreground animate-counter group-hover:text-primary transition-colors">
                    ${(animatedStats.escrow / 1000000).toFixed(1)}M+
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    Secured in Escrow
                  </div>
                </div>
                <div className="text-center transform hover:scale-105 transition-all duration-300 group">
                  <div className="text-3xl font-bold font-serif text-foreground animate-counter group-hover:text-primary transition-colors">
                    {animatedStats.agreements.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    Active Agreements
                  </div>
                </div>
                <div className="text-center transform hover:scale-105 transition-all duration-300 group">
                  <div className="text-3xl font-bold font-serif text-foreground animate-counter group-hover:text-primary transition-colors">
                    {animatedStats.successRate.toFixed(1)}%
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    Success Rate
                  </div>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in-right">
              <div className="glass-card rounded-3xl shadow-2xl p-8 space-y-6 transform hover:scale-105 transition-all duration-500 hover:shadow-premium animate-glass-glow">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold font-serif text-xl text-foreground">
                    Live Transaction
                  </h3>
                  <Badge className="bg-green-500/20 text-green-400 animate-pulse border-green-500/30">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-ping"></div>
                    Active
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4 animate-slide-in">
                    <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-lg">
                        {liveTransactions[liveTransactionIndex].product}
                      </div>
                      <div className="text-muted-foreground">
                        {liveTransactions[liveTransactionIndex].amount} •{" "}
                        {liveTransactions[liveTransactionIndex].type}
                      </div>
                    </div>
                  </div>

                  <div className="glass-card rounded-2xl p-6 premium-gradient">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-muted-foreground font-medium">
                        Payment Progress
                      </span>
                      <span className="text-foreground font-bold">
                        3/6 paid
                      </span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-3">
                      <div className="bg-gradient-to-r from-primary to-accent h-3 rounded-full w-1/2 animate-progress-fill"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between animate-fade-in">
                    <span className="text-muted-foreground">
                      User: {liveTransactions[liveTransactionIndex].user}
                    </span>
                    <span className="text-primary font-semibold animate-pulse">
                      Processing...
                    </span>
                  </div>
                </div>
              </div>

              {/* Enhanced floating elements */}
              <div className="absolute -top-6 -right-6 bg-primary text-primary-foreground p-4 rounded-2xl shadow-lg animate-float hover:glow">
                <TrendingUp className="w-7 h-7" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-green-500 text-white p-4 rounded-2xl shadow-lg animate-float-delayed hover:glow">
                <CheckCircle className="w-7 h-7" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 premium-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-20 animate-fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold font-serif text-foreground">
              Why Choose PayStar?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light">
              Revolutionary blockchain technology meets practical commerce
              solutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-card shadow-lg hover:shadow-premium transition-all duration-500 transform hover:scale-105 hover:-translate-y-4 animate-fade-in-up delay-100 group">
              <CardContent className="p-10 text-center space-y-6">
                <div className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center mx-auto transform group-hover:rotate-12 transition-transform duration-500 group-hover:bg-primary/30">
                  <Shield className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold font-serif text-foreground">
                  Secure Transactions
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Trust in blockchain technology. Your funds are protected by
                  smart contracts until delivery is confirmed.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card shadow-lg hover:shadow-premium transition-all duration-500 transform hover:scale-105 hover:-translate-y-4 animate-fade-in-up delay-200 group">
              <CardContent className="p-10 text-center space-y-6">
                <div className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center mx-auto transform group-hover:rotate-12 transition-transform duration-500 group-hover:bg-primary/30">
                  <CreditCard className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold font-serif text-foreground">
                  Flexible Payments
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Choose your own installment plan. Split large purchases into
                  manageable payments with minimal fees.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card shadow-lg hover:shadow-premium transition-all duration-500 transform hover:scale-105 hover:-translate-y-4 animate-fade-in-up delay-300 group">
              <CardContent className="p-10 text-center space-y-6">
                <div className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center mx-auto transform group-hover:rotate-12 transition-transform duration-500 group-hover:bg-primary/30">
                  <Zap className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold font-serif text-foreground">
                  Smart Escrow
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your funds are safe until you're satisfied. Automatic release
                  after delivery confirmation or dispute resolution.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-primary via-primary/90 to-accent relative overflow-hidden">
        {/* Enhanced animated background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold font-serif text-primary-foreground mb-8">
            Ready to Transform Your Commerce?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-10 font-light">
            Join thousands of users already using PayStar for secure, flexible
            transactions
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 text-lg px-10 py-6 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl font-bold"
              asChild
            >
              <Link href="/wallet">
                Connect Wallet
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary text-lg px-10 py-6 bg-transparent transform hover:scale-105 transition-all duration-300 font-bold"
              asChild
            >
              <Link href="/marketplace">Browse Marketplace</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-card text-card-foreground py-16 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                  <Sparkles className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold font-serif">PayStar</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Revolutionizing commerce with blockchain-powered escrow and
                installment payments.
              </p>
            </div>

            <div>
              <h4 className="font-bold font-serif text-lg mb-6">Product</h4>
              <div className="space-y-3 text-muted-foreground">
                <div>
                  <Link
                    href="/marketplace"
                    className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    Marketplace
                  </Link>
                </div>
                <div>
                  <Link
                    href="/how-it-works"
                    className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    How It Works
                  </Link>
                </div>
                <div>
                  <Link
                    href="/pricing"
                    className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    Pricing
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold font-serif text-lg mb-6">Company</h4>
              <div className="space-y-3 text-muted-foreground">
                <div>
                  <Link
                    href="/about"
                    className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    About
                  </Link>
                </div>
                <div>
                  <Link
                    href="/contact"
                    className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    Contact
                  </Link>
                </div>
                <div>
                  <Link
                    href="/careers"
                    className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    Careers
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold font-serif text-lg mb-6">Support</h4>
              <div className="space-y-3 text-muted-foreground">
                <div>
                  <Link
                    href="/help"
                    className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    Help Center
                  </Link>
                </div>
                <div>
                  <Link
                    href="/docs"
                    className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    Documentation
                  </Link>
                </div>
                <div>
                  <Link
                    href="/status"
                    className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    Status
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border/50 mt-16 pt-8 text-center text-muted-foreground">
            <p>
              &copy; 2024 PayStar. Built for Stellar Hackathon. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
