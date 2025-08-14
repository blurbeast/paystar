"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { ISupportedWallet } from "@creit.tech/stellar-wallets-kit";
import { kit } from "@/wallet/walletKit";
import { useStellarWallet } from "@/hooks/useStellarWallet";

interface WalletState {
  address: string | null;
  name: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  publicKey: string | null;
  network: "PUBLIC" | "TESTNET";
}

interface WalletContextType extends WalletState {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  switchNetwork: (network: "PUBLIC" | "TESTNET") => Promise<void>;
  clearError: () => void;
  // Stellar wallet data
  balances: any[];
  transactions: any[];
  isLoadingWalletData: boolean;
  walletError: string | null;
  totalXlmUsdValue: string;
  exchangeRates: Record<string, number>;
  // Stellar wallet functions
  fetchBalances: () => Promise<void>;
  fetchTransactions: () => Promise<void>;
  preparePaymentTransaction: (
    destination: string,
    amount: string,
    assetCode?: string,
    assetIssuer?: string,
    memo?: string
  ) => Promise<any>;
  sendPayment: (xdr: string) => Promise<string>;
  createTrustline: (
    assetCode: string,
    assetIssuer: string,
    limit?: string
  ) => Promise<string>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    name: null,
    isConnected: false,
    isConnecting: false,
    error: null,
    publicKey: null,
    network: "TESTNET",
  });

  // Use the stellar wallet hook
  const stellarWallet = useStellarWallet(walletState.address);

  // Load wallet state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("paystar-wallet-state");
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        setWalletState((prev) => ({
          ...prev,
          ...parsed,
          isConnecting: false, // Always set to false on load
        }));
      } catch (error) {
        console.error("Failed to parse saved wallet state:", error);
        localStorage.removeItem("paystar-wallet-state");
      }
    }
  }, []);

  // Save wallet state to localStorage whenever it changes
  useEffect(() => {
    if (walletState.address) {
      const stateToSave = {
        address: walletState.address,
        name: walletState.name,
        isConnected: walletState.isConnected,
        publicKey: walletState.publicKey,
        network: walletState.network,
      };
      localStorage.setItem("paystar-wallet-state", JSON.stringify(stateToSave));
    } else {
      localStorage.removeItem("paystar-wallet-state");
    }
  }, [walletState]);

  const connectWallet = async () => {
    setWalletState((prev) => ({
      ...prev,
      isConnecting: true,
      error: null,
    }));

    try {
      await kit.openModal({
        modalTitle: "Connect to your favorite wallet",
        onWalletSelected: async (option: ISupportedWallet) => {
          try {
            kit.setWallet(option.id);
            const { address } = await kit.getAddress();
            // In Stellar, the address is the public key
            const publicKey = address;

            setWalletState((prev) => ({
              ...prev,
              address,
              name: option.name,
              isConnected: true,
              isConnecting: false,
              publicKey,
              error: null,
            }));
          } catch (error) {
            console.error("Error getting wallet details:", error);
            setWalletState((prev) => ({
              ...prev,
              isConnecting: false,
              error:
                error instanceof Error
                  ? error.message
                  : "Failed to get wallet details",
            }));
          }
        },
      });
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setWalletState((prev) => ({
        ...prev,
        isConnecting: false,
        error:
          error instanceof Error ? error.message : "Failed to connect wallet",
      }));
    }
  };

  const disconnectWallet = async () => {
    try {
      await kit.disconnect();
      setWalletState({
        address: null,
        name: null,
        isConnected: false,
        isConnecting: false,
        error: null,
        publicKey: null,
        network: walletState.network, // Keep the network preference
      });
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
      setWalletState((prev) => ({
        ...prev,
        error:
          error instanceof Error
            ? error.message
            : "Failed to disconnect wallet",
      }));
    }
  };

  const switchNetwork = async (network: "PUBLIC" | "TESTNET") => {
    setWalletState((prev) => ({
      ...prev,
      network,
    }));

    // If stellar wallet is available, switch its network too
    if (stellarWallet.switchNetwork) {
      await stellarWallet.switchNetwork(network);
    }
  };

  const clearError = () => {
    setWalletState((prev) => ({
      ...prev,
      error: null,
    }));
  };

  // Check if wallet is still connected on app start
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (walletState.address && walletState.isConnected) {
        try {
          // Try to get the address to verify connection is still valid
          const { address } = await kit.getAddress();
          if (!address || address !== walletState.address) {
            // Connection is invalid, disconnect
            await disconnectWallet();
          }
        } catch (error) {
          console.error("Wallet connection check failed:", error);
          // Connection is invalid, disconnect
          await disconnectWallet();
        }
      }
    };

    // Only check after a short delay to avoid issues on page load
    const timer = setTimeout(checkWalletConnection, 1000);
    return () => clearTimeout(timer);
  }, []); // Only run once on mount

  const contextValue: WalletContextType = {
    // Wallet state
    ...walletState,

    // Wallet functions
    connectWallet,
    disconnectWallet,
    switchNetwork,
    clearError,

    // Stellar wallet data
    balances: stellarWallet.balances,
    transactions: stellarWallet.transactions,
    isLoadingWalletData: stellarWallet.isLoading,
    walletError: stellarWallet.error,
    totalXlmUsdValue: stellarWallet.totalXlmUsdValue,
    exchangeRates: stellarWallet.exchangeRates,

    // Stellar wallet functions
    fetchBalances: stellarWallet.fetchBalances,
    fetchTransactions: stellarWallet.fetchTransactions,
    preparePaymentTransaction: stellarWallet.preparePaymentTransaction,
    sendPayment: stellarWallet.sendPayment,
    createTrustline: stellarWallet.createTrustline,
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWalletContext() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWalletContext must be used within a WalletProvider");
  }
  return context;
}

// Export the context for advanced use cases
export { WalletContext };
