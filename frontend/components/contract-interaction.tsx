"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { usePayStarContract } from "@/hooks/use-paystar-contract"
import { useToast } from "@/hooks/use-toast"
import { type WalletConnection } from "@/lib/soroban/wallet-client"

interface ContractInteractionProps {
  wallet: WalletConnection | null
}

export default function ContractInteraction({ wallet }: ContractInteractionProps) {
  const [formData, setFormData] = useState({
    seller: "",
    amount: "",
    installments: "1",
    itemDescription: "",
    agreementId: "",
    paymentAmount: ""
  })

  const {
    createAgreement,
    makePayment,
    getAgreement,
    releaseFunds,
    isLoading
  } = usePayStarContract()

  const { toast } = useToast()

  const handleCreateAgreement = async () => {
    if (!wallet?.publicKey) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet first",
        variant: "destructive",
      })
      return
    }

    if (!formData.seller || !formData.amount || !formData.itemDescription) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const result = await createAgreement(
      wallet.publicKey,
      formData.seller,
      formData.amount,
      parseInt(formData.installments),
      formData.itemDescription
    )

    if (result) {
      console.log("Agreement created with transaction hash:", result)
      // Reset form
      setFormData(prev => ({
        ...prev,
        seller: "",
        amount: "",
        itemDescription: ""
      }))
    }
  }

  const handleMakePayment = async () => {
    if (!wallet?.publicKey) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet first",
        variant: "destructive",
      })
      return
    }

    if (!formData.agreementId || !formData.paymentAmount) {
      toast({
        title: "Missing Information",
        description: "Please fill in agreement ID and payment amount",
        variant: "destructive",
      })
      return
    }

    const result = await makePayment(
      wallet.publicKey,
      formData.agreementId,
      formData.paymentAmount
    )

    if (result) {
      console.log("Payment made with transaction hash:", result)
      // Reset payment form
      setFormData(prev => ({
        ...prev,
        agreementId: "",
        paymentAmount: ""
      }))
    }
  }

  const handleGetAgreement = async () => {
    if (!formData.agreementId) {
      toast({
        title: "Missing Information",
        description: "Please enter an agreement ID",
        variant: "destructive",
      })
      return
    }

    const agreement = await getAgreement(formData.agreementId)
    if (agreement) {
      console.log("Agreement details:", agreement)
      toast({
        title: "Agreement Found",
        description: `Status: ${agreement.status}, Amount: ${agreement.amount} XLM`,
      })
    }
  }

  const handleReleaseFunds = async () => {
    if (!wallet?.publicKey) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet first",
        variant: "destructive",
      })
      return
    }

    if (!formData.agreementId) {
      toast({
        title: "Missing Information",
        description: "Please enter an agreement ID",
        variant: "destructive",
      })
      return
    }

    const result = await releaseFunds(wallet.publicKey, formData.agreementId)
    if (result) {
      console.log("Funds released with transaction hash:", result)
    }
  }

  if (!wallet?.isConnected) {
    return (
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="text-yellow-800">Wallet Connection Required</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-yellow-700">
            Please connect your Stellar wallet to interact with PayStar smart contracts.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Create Agreement */}
      <Card>
        <CardHeader>
          <CardTitle>Create Payment Agreement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="seller">Seller Address</Label>
            <Input
              id="seller"
              placeholder="Stellar public key of the seller"
              value={formData.seller}
              onChange={(e) => setFormData(prev => ({ ...prev, seller: e.target.value }))}
            />
          </div>
          
          <div>
            <Label htmlFor="amount">Total Amount (XLM)</Label>
            <Input
              id="amount"
              type="number"
              step="0.0000001"
              placeholder="10.0"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="installments">Number of Installments</Label>
            <Select
              value={formData.installments}
              onValueChange={(value) => setFormData(prev => ({ ...prev, installments: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 (Full Payment)</SelectItem>
                <SelectItem value="2">2 Installments</SelectItem>
                <SelectItem value="3">3 Installments</SelectItem>
                <SelectItem value="4">4 Installments</SelectItem>
                <SelectItem value="6">6 Installments</SelectItem>
                <SelectItem value="12">12 Installments</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Item Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the item being purchased..."
              value={formData.itemDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, itemDescription: e.target.value }))}
            />
          </div>

          <Button onClick={handleCreateAgreement} disabled={isLoading} className="w-full">
            {isLoading ? "Creating Agreement..." : "Create Agreement"}
          </Button>
        </CardContent>
      </Card>

      {/* Make Payment */}
      <Card>
        <CardHeader>
          <CardTitle>Make Installment Payment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="agreementId">Agreement ID</Label>
            <Input
              id="agreementId"
              placeholder="Enter agreement ID"
              value={formData.agreementId}
              onChange={(e) => setFormData(prev => ({ ...prev, agreementId: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="paymentAmount">Payment Amount (XLM)</Label>
            <Input
              id="paymentAmount"
              type="number"
              step="0.0000001"
              placeholder="5.0"
              value={formData.paymentAmount}
              onChange={(e) => setFormData(prev => ({ ...prev, paymentAmount: e.target.value }))}
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleMakePayment} disabled={isLoading} className="flex-1">
              {isLoading ? "Processing Payment..." : "Make Payment"}
            </Button>
            
            <Button onClick={handleGetAgreement} variant="outline" disabled={isLoading}>
              Get Details
            </Button>
            
            <Button onClick={handleReleaseFunds} variant="secondary" disabled={isLoading}>
              Release Funds
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800">Smart Contract Integration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-blue-700 space-y-2">
            <p><strong>Note:</strong> This interface connects to Stellar Soroban smart contracts.</p>
            <p>To fully use this functionality, you need to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Deploy a PayStar smart contract to Stellar testnet</li>
              <li>Set the contract ID in your environment variables</li>
              <li>Ensure your wallet has testnet XLM for transaction fees</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
