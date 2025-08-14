import { 
  isConnected, 
  getPublicKey, 
  getNetwork, 
  signTransaction 
} from "@stellar/freighter-api"

export interface WalletConnection {
  address: string
  publicKey: string
  network?: string
  isConnected: boolean
}

export const isFreighterAvailable = (): boolean => {
  return typeof window !== "undefined" && "freighter" in window
}

export const waitForFreighter = async (timeout = 5000): Promise<boolean> => {
  if (typeof window === "undefined") return false
  
  return new Promise((resolve) => {
    let attempts = 0
    const maxAttempts = timeout / 100
    
    const checkFreighter = () => {
      if ("freighter" in window) {
        resolve(true)
        return
      }
      
      attempts++
      if (attempts >= maxAttempts) {
        resolve(false)
        return
      }
      
      setTimeout(checkFreighter, 100)
    }
    
    checkFreighter()
  })
}

export const connectWallet = async (): Promise<WalletConnection | null> => {
  try {
    if (!isFreighterAvailable()) {
      throw new Error("Freighter wallet not available")
    }

    const publicKeyResult = await getPublicKey()
    const networkResult = await getNetwork()
    const connectedResult = await isConnected()

    if (!publicKeyResult || typeof publicKeyResult === 'object') {
      throw new Error("Failed to get public key")
    }

    const publicKey = typeof publicKeyResult === 'string' ? publicKeyResult : publicKeyResult.toString()
    const network = typeof networkResult === 'object' ? networkResult.network : networkResult
    const connected = typeof connectedResult === 'object' ? connectedResult.isConnected : connectedResult

    return {
      address: publicKey,
      publicKey,
      network,
      isConnected: Boolean(connected),
    }
  } catch (error) {
    console.error("Error connecting wallet:", error)
    return null
  }
}

export const getCurrentWallet = async (): Promise<WalletConnection | null> => {
  try {
    if (!isFreighterAvailable()) {
      return null
    }

    const connectedResult = await isConnected()
    const connected = typeof connectedResult === 'object' ? connectedResult.isConnected : connectedResult
    
    if (!connected) {
      return null
    }

    const publicKeyResult = await getPublicKey()
    const networkResult = await getNetwork()

    if (!publicKeyResult) {
      return null
    }

    const publicKey = typeof publicKeyResult === 'string' ? publicKeyResult : publicKeyResult.toString()
    const network = typeof networkResult === 'object' ? networkResult.network : networkResult

    return {
      address: publicKey,
      publicKey,
      network,
      isConnected: Boolean(connected),
    }
  } catch (error) {
    console.error("Error getting current wallet:", error)
    return null
  }
}

export const getAccountBalance = async (publicKey: string): Promise<string> => {
  try {
    // This would typically fetch from Stellar Horizon API
    // For now, return a placeholder
    return "0"
  } catch (error) {
    console.error("Error getting account balance:", error)
    return "0"
  }
}

export const signAndSubmitTransaction = async (
  transaction: string,
  publicKey: string
): Promise<string> => {
  try {
    if (!isFreighterAvailable()) {
      throw new Error("Freighter wallet not available")
    }

    const signedTransactionResult = await signTransaction(transaction, {
      networkPassphrase: "Test SDF Network ; September 2015",
    })

    // Handle the response properly
    if (typeof signedTransactionResult === 'object' && 'signedTxXdr' in signedTransactionResult) {
      return signedTransactionResult.signedTxXdr
    }

    return signedTransactionResult as string
  } catch (error) {
    console.error("Error signing transaction:", error)
    throw error
  }
}
