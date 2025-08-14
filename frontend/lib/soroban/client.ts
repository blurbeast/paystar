export interface WalletConnection {
  address: string
  publicKey: string
  network?: string
  isConnected: boolean
}

// Re-export from wallet-client-kit for backward compatibility
export * from "./wallet-client-kit"
