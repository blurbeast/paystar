"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Wallet,
  Shield,
  Star,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import { WalletStatus } from "@/components/wallet-status";
import { useWalletContext } from "@/contexts/WalletContext";

export default function WalletAuthPage() {
  const router = useRouter();
  const { isConnected } = useWalletContext();

  // Redirect to marketplace if already connected
  if (isConnected) {
    setTimeout(() => {
      router.push("/marketplace");
    }, 1000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      {/* Header */}
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-full px-6 py-2 mb-6 border border-blue-200 dark:border-blue-800">
            <Wallet className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-blue-700 dark:text-blue-300 font-medium">
              Stellar Wallet Authentication
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent mb-6">
            Connect Your Stellar Wallet
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            PayStar uses your Stellar wallet for secure, decentralized
            authentication. No passwords, no email required - just your crypto
            wallet for complete control.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Wallet Connection */}
          <div className="order-2 lg:order-1">
            <div className="sticky top-8">
              <WalletStatus
                showDetails={true}
                showBalances={true}
                className="shadow-xl border-0"
              />

              {isConnected && (
                <Card className="mt-6 border-green-200 dark:border-green-800 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-3 text-green-700 dark:text-green-300 mb-3">
                      <CheckCircle className="w-6 h-6" />
                      <span className="font-semibold text-lg">
                        Wallet Connected Successfully!
                      </span>
                    </div>
                    <p className="text-green-600 dark:text-green-400 mb-4">
                      You're all set! Redirecting to marketplace...
                    </p>
                    <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-2">
                      <div
                        className="bg-green-600 dark:bg-green-400 h-2 rounded-full animate-pulse"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Benefits */}
          <div className="order-1 lg:order-2 space-y-6">
            <Card className="shadow-xl border-0 bg-white dark:bg-slate-800">
              <CardHeader className="pb-4">
                <CardTitle className="text-slate-900 dark:text-white flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <span>Why Wallet Authentication?</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
                        Truly Decentralized
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                        No central authority controls your account. You maintain
                        complete ownership and control.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
                        Maximum Security
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                        Your private keys never leave your wallet.
                        Industry-leading security standards.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
                        Instant Access
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                        No registration, verification, or waiting. Connect and
                        start trading immediately.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
                        Smart Contract Ready
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                        Direct integration with Soroban smart contracts for
                        automated escrow and payments.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
              <CardHeader>
                <CardTitle className="text-slate-900 dark:text-white">
                  Need a Stellar Wallet?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  We recommend Freighter - a secure, easy-to-use browser
                  extension wallet for the Stellar network.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() =>
                      window.open("https://freighter.app/", "_blank")
                    }
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Get Freighter
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      window.open(
                        "https://stellar.org/ecosystem/wallets",
                        "_blank"
                      )
                    }
                  >
                    Other Wallets
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center shadow-lg border-0 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                Secure Transactions
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                All payments secured by Stellar smart contracts with automated
                escrow protection
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-lg border-0 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Wallet className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                Your Keys, Your Assets
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Maintain full control of your funds with non-custodial wallet
                integration
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-lg border-0 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                Instant Access
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Connect once and access all features across the entire PayStar
                ecosystem
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white shadow-2xl border-0">
          <CardContent className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">15,000+</div>
                <div className="text-blue-100 text-sm">Connected Wallets</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">$2.4M+</div>
                <div className="text-blue-100 text-sm">Secured in Escrow</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">99.8%</div>
                <div className="text-blue-100 text-sm">Success Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-blue-100 text-sm">Network Uptime</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
