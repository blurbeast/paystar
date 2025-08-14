import { useState, useCallback } from "react"
import { createPayStarContract, type PaymentAgreement } from "@/lib/soroban/contracts/paystar"
import { useToast } from "./use-toast"

// You'll need to set this to your deployed contract ID
const PAYSTAR_CONTRACT_ID = process.env.NEXT_PUBLIC_PAYSTAR_CONTRACT_ID || ""

export interface UsePayStarContractReturn {
  contract: ReturnType<typeof createPayStarContract> | null
  createAgreement: (
    userPublicKey: string,
    seller: string,
    amount: string,
    installments: number,
    itemDescription: string
  ) => Promise<string | null>
  makePayment: (
    userPublicKey: string,
    agreementId: string,
    amount: string
  ) => Promise<string | null>
  getAgreement: (agreementId: string) => Promise<PaymentAgreement | null>
  releaseFunds: (
    userPublicKey: string,
    agreementId: string
  ) => Promise<string | null>
  isLoading: boolean
  error: string | null
}

export const usePayStarContract = (): UsePayStarContractReturn => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const contract = PAYSTAR_CONTRACT_ID ? createPayStarContract(PAYSTAR_CONTRACT_ID) : null

  const handleContractCall = useCallback(async <T>(
    operation: () => Promise<T>,
    successMessage: string,
    errorMessage: string
  ): Promise<T | null> => {
    if (!contract) {
      const msg = "Contract not configured. Please set NEXT_PUBLIC_PAYSTAR_CONTRACT_ID"
      setError(msg)
      toast({
        title: "Configuration Error",
        description: msg,
        variant: "destructive",
      })
      return null
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await operation()
      
      toast({
        title: "Success",
        description: successMessage,
      })
      
      return result
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : errorMessage
      setError(errorMsg)
      
      toast({
        title: "Error",
        description: errorMsg,
        variant: "destructive",
      })
      
      return null
    } finally {
      setIsLoading(false)
    }
  }, [contract, toast])

  const createAgreement = useCallback(async (
    userPublicKey: string,
    seller: string,
    amount: string,
    installments: number,
    itemDescription: string
  ): Promise<string | null> => {
    return handleContractCall(
      () => contract!.createAgreement(userPublicKey, seller, amount, installments, itemDescription),
      "Payment agreement created successfully!",
      "Failed to create payment agreement"
    )
  }, [contract, handleContractCall])

  const makePayment = useCallback(async (
    userPublicKey: string,
    agreementId: string,
    amount: string
  ): Promise<string | null> => {
    return handleContractCall(
      () => contract!.makePayment(userPublicKey, agreementId, amount),
      "Payment submitted successfully!",
      "Failed to submit payment"
    )
  }, [contract, handleContractCall])

  const getAgreement = useCallback(async (
    agreementId: string
  ): Promise<PaymentAgreement | null> => {
    return handleContractCall(
      () => contract!.getAgreement(agreementId),
      "Agreement details retrieved",
      "Failed to get agreement details"
    )
  }, [contract, handleContractCall])

  const releaseFunds = useCallback(async (
    userPublicKey: string,
    agreementId: string
  ): Promise<string | null> => {
    return handleContractCall(
      () => contract!.releaseFunds(userPublicKey, agreementId),
      "Funds released successfully!",
      "Failed to release funds"
    )
  }, [contract, handleContractCall])

  return {
    contract,
    createAgreement,
    makePayment,
    getAgreement,
    releaseFunds,
    isLoading,
    error
  }
}
