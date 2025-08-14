"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import WalletConnect from "@/components/wallet-connect"
import {
  createEscrowTransaction,
  createInstallmentTransaction,
  signAndSubmitTransaction,
  generateEscrowKeypair,
  type WalletConnection,
} from "@/lib/stellar/wallet"
import { useToast } from "@/hooks/use-toast"
import { Star, Shield, CreditCard, ArrowLeft, CheckCircle, AlertCircle, Calculator, Zap, Wallet } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function CreateAgreementPage() {
  const searchParams = useSearchParams()
  const productId = searchParams.get("product") || "1"
  const walletParam = searchParams.get("wallet")
  const typeParam = searchParams.get("type") as "escrow" | "installment" | null

  const [agreementType, setAgreementType] = useState<"escrow" | "installment">(typeParam || "escrow")
  const [installmentMonths, setInstallmentMonths] = useState([6])
  const [escrowDays, setEscrowDays] = useState([7])
  const [wallet, setWallet] = useState<WalletConnection | null>(null)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [step, setStep] = useState(1)
  const [transactionHash, setTransactionHash] = useState<string>("")
  const [contractId, setContractId] = useState<string>("")
  const { toast } = useToast()

  // Mock product data
  const product = {
    id: productId,
    title: 'MacBook Pro M3 16"',
    price: 2499.0,
    seller: "TechStore Pro",
    sellerAddress: "GCKFBEIYTKP74Q7JYE2JGQLHGJGQJPDSBZC5T6QRDKD7RKQF4DKQJLTX", // Mock seller address
    image: "/macbook-pro-laptop.png",
  }

  const monthlyPayment = product.price / installmentMonths[0]
  const escrowFee = product.price * 0.025
  const installmentFee = product.price * 0.015

  // Set wallet from URL parameter if available
  useEffect(() => {
    if (walletParam) {
      setWallet({
        publicKey: walletParam,
        isConnected: true,
      })
    }
  }, [walletParam])

  const handleWalletConnect = (walletConnection: WalletConnection) => {
    setWallet(walletConnection)
  }

  const handleCreateAgreement = async () => {
    if (!wallet?.publicKey) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to continue.",
        variant: "destructive",
      })
      return
    }

    setIsCreating(true)

    try {
      let transactionXDR: string
      let mockContractId: string

      if (agreementType === "escrow") {
        const escrowKeypair = generateEscrowKeypair()
        mockContractId = `ESCROW_${escrowKeypair.publicKey.slice(0, 8)}`

        transactionXDR = await createEscrowTransaction(
          wallet.publicKey,
          product.sellerAddress,
          (product.price + escrowFee).toFixed(7),
          escrowKeypair.publicKey,
        )
      } else {
        mockContractId = `INSTALL_${Date.now().toString(36).toUpperCase()}`

        transactionXDR = await createInstallmentTransaction(
          wallet.publicKey,
          mockContractId,
          (product.price + installmentFee).toFixed(7),
          installmentMonths[0],
        )
      }

      const result = await signAndSubmitTransaction(transactionXDR)

      setTransactionHash(result.hash)
      setContractId(mockContractId)
      setStep(3)

      toast({
        title: "Agreement Created!",
        description: "Your smart contract has been deployed to the Stellar network.",
      })
    } catch (error) {
      console.error("Agreement creation failed:", error)
      toast({
        title: "Transaction Failed",
        description: error instanceof Error ? error.message : "Failed to create agreement. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsCreating(false)
    }
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Agreement Created!</h2>
              <p className="text-gray-600">
                Your {agreementType} agreement has been successfully created and deployed to the Stellar network.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Contract ID:</span>
                <span className="font-mono text-xs">{contractId}</span>
              </div>
              {transactionHash && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction:</span>
                  <a
                    href={`https://stellar.expert/explorer/testnet/tx/${transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-blue-600 hover:underline"
                  >
                    {transactionHash.slice(0, 8)}...
                  </a>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <Badge className="bg-green-100 text-green-700">Active</Badge>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button className="flex-1" asChild>
                <Link href="/dashboard">View Dashboard</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/marketplace">Continue Shopping</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/product/${productId}`}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Product
                </Link>
              </Button>
            </div>
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">StellarPay</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                1
              </div>
              <span className="text-sm font-medium text-blue-600">Agreement Details</span>
            </div>
            <div className="w-12 h-px bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                2
              </div>
              <span className={`text-sm font-medium ${step >= 2 ? "text-blue-600" : "text-gray-600"}`}>
                Wallet & Payment
              </span>
            </div>
            <div className="w-12 h-px bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 3 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                3
              </div>
              <span className={`text-sm font-medium ${step >= 3 ? "text-green-600" : "text-gray-600"}`}>
                Confirmation
              </span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Product Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{product.title}</h3>
                    <p className="text-sm text-gray-600">Sold by {product.seller}</p>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Product Price</span>
                    <span>${product.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{agreementType === "escrow" ? "Escrow Fee (2.5%)" : "Processing Fee (1.5%)"}</span>
                    <span>${(agreementType === "escrow" ? escrowFee : installmentFee).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span>
                      ${(product.price + (agreementType === "escrow" ? escrowFee : installmentFee)).toFixed(2)}
                    </span>
                  </div>
                </div>

                {agreementType === "installment" && (
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-700">${monthlyPayment.toFixed(2)}</div>
                      <div className="text-sm text-green-600">per month for {installmentMonths[0]} months</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Agreement Form */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Create Smart Agreement</CardTitle>
                  <p className="text-gray-600">Choose your payment method and configure the agreement terms</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Tabs
                    value={agreementType}
                    onValueChange={(value) => setAgreementType(value as "escrow" | "installment")}
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="escrow" className="flex items-center space-x-2">
                        <Shield className="w-4 h-4" />
                        <span>Secure Escrow</span>
                      </TabsTrigger>
                      <TabsTrigger value="installment" className="flex items-center space-x-2">
                        <CreditCard className="w-4 h-4" />
                        <span>Installment Plan</span>
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="escrow" className="space-y-6 mt-6">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div>
                            <h3 className="font-medium text-blue-900">Smart Escrow Protection</h3>
                            <p className="text-sm text-blue-700 mt-1">
                              Your payment is held securely in a Stellar smart contract until delivery is confirmed.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="escrow-days">Delivery Timeline (days)</Label>
                          <div className="mt-2">
                            <Slider
                              id="escrow-days"
                              min={3}
                              max={30}
                              step={1}
                              value={escrowDays}
                              onValueChange={setEscrowDays}
                              className="w-full"
                            />
                            <div className="flex justify-between text-sm text-gray-500 mt-1">
                              <span>3 days</span>
                              <span className="font-medium">{escrowDays[0]} days</span>
                              <span>30 days</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">
                            Funds will be automatically released after {escrowDays[0]} days if no disputes are raised.
                          </p>
                        </div>

                        <div>
                          <Label htmlFor="delivery-address">Delivery Address</Label>
                          <Textarea
                            id="delivery-address"
                            placeholder="Enter your delivery address..."
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="installment" className="space-y-6 mt-6">
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <Calculator className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <h3 className="font-medium text-green-900">Flexible Installment Plan</h3>
                            <p className="text-sm text-green-700 mt-1">
                              Split your payment into manageable monthly installments with automatic processing.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="installment-months">Number of Months</Label>
                          <div className="mt-2">
                            <Slider
                              id="installment-months"
                              min={3}
                              max={12}
                              step={1}
                              value={installmentMonths}
                              onValueChange={setInstallmentMonths}
                              className="w-full"
                            />
                            <div className="flex justify-between text-sm text-gray-500 mt-1">
                              <span>3 months</span>
                              <span className="font-medium">{installmentMonths[0]} months</span>
                              <span>12 months</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg border p-4">
                          <h4 className="font-medium text-gray-900 mb-3">Payment Schedule</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>First payment (today)</span>
                              <span className="font-medium">${monthlyPayment.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Monthly payments ({installmentMonths[0] - 1}x)</span>
                              <span className="font-medium">${monthlyPayment.toFixed(2)}</span>
                            </div>
                            <div className="border-t pt-2 flex justify-between font-medium">
                              <span>Total</span>
                              <span>${(product.price + installmentFee).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <Button onClick={() => setStep(2)} className="w-full bg-blue-600 hover:bg-blue-700">
                    Continue to Wallet Setup
                  </Button>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Wallet className="w-5 h-5" />
                    <span>Wallet & Payment Setup</span>
                  </CardTitle>
                  <p className="text-gray-600">Connect your Stellar wallet and review the agreement terms</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <WalletConnect onWalletConnect={handleWalletConnect} />

                  {wallet?.isConnected && (
                    <>
                      <div className="bg-yellow-50 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                          <div>
                            <h3 className="font-medium text-yellow-900">Transaction Details</h3>
                            <p className="text-sm text-yellow-700 mt-1">
                              {agreementType === "escrow"
                                ? `You will pay ${(product.price + escrowFee).toFixed(2)} XLM to the escrow contract.`
                                : `First installment of ${monthlyPayment.toFixed(2)} XLM will be charged today.`}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4 space-y-3">
                        <h3 className="font-medium text-gray-900">Agreement Terms</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span>Smart contract will be deployed on Stellar Testnet</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span>
                              {agreementType === "escrow"
                                ? `Funds held securely for ${escrowDays[0]} days`
                                : `${installmentMonths[0]} monthly payments of ${monthlyPayment.toFixed(2)} XLM`}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span>Dispute resolution available through platform</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span>Full transaction history recorded on blockchain</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms"
                          checked={agreedToTerms}
                          onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                        />
                        <Label htmlFor="terms" className="text-sm">
                          I agree to the{" "}
                          <Link href="/terms" className="text-blue-600 hover:underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-blue-600 hover:underline">
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>
                    </>
                  )}

                  <div className="flex space-x-3">
                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1 bg-transparent">
                      Back
                    </Button>
                    <Button
                      onClick={handleCreateAgreement}
                      disabled={!wallet?.isConnected || !agreedToTerms || isCreating}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      {isCreating ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Creating Agreement...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Zap className="w-4 h-4" />
                          <span>Create & Sign Transaction</span>
                        </div>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
