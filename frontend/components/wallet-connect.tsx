"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Wallet,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Loader2,
  Download,
} from "lucide-react";
import {
  connectWallet,
  getCurrentWallet,
  isFreighterAvailable,
  waitForFreighter,
  type WalletConnection,
} from "@/lib/soroban/wallet-client-kit";

interface WalletConnectProps {
  onWalletConnect?: (wallet: WalletConnection) => void;
}

interface WalletProvider {
  id: string;
  name: string;
  icon: string;
  description: string;
  downloadUrl?: string;
  isAvailable: () => boolean;
  connect: () => Promise<WalletConnection | null>;
}

export default function WalletConnect({ onWalletConnect }: WalletConnectProps) {
  const [currentWallet, setCurrentWallet] = useState<WalletConnection | null>(
    null
  );
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [freighterAvailable, setFreighterAvailable] = useState(false);

  const walletProviders: WalletProvider[] = [
    {
      id: "freighter",
      name: "Freighter",
      icon: "🚀",
      description: "Stellar wallet browser extension",
      downloadUrl: "https://www.freighter.app/",
      isAvailable: () => freighterAvailable,
      connect: connectWallet,
    },
    // You can add more wallet providers here
    // {
    //   id: "albedo",
    //   name: "Albedo",
    //   icon: "⭐",
    //   description: "Web-based Stellar wallet",
    //   downloadUrl: "https://albedo.link/",
    //   isAvailable: () => true,
    //   connect: async () => {
    //     // Implement Albedo connection logic
    //     return null
    //   }
    // }
  ];

  useEffect(() => {
    const checkWalletAvailability = async () => {
      // Check for Freighter
      setFreighterAvailable(isFreighterAvailable());

      // If not available, wait a bit and check again
      if (!isFreighterAvailable()) {
        const available = await waitForFreighter(3000);
        setFreighterAvailable(available);
      }

      // Check for existing connection
      try {
        const wallet = await getCurrentWallet();
        if (wallet) {
          setCurrentWallet(wallet);
          onWalletConnect?.(wallet);
        }
      } catch (error) {
        console.error("Error checking current wallet:", error);
      }
    };

    checkWalletAvailability();
  }, [onWalletConnect]);

  const handleConnect = async (provider: WalletProvider) => {
    if (!provider.isAvailable()) {
      setError(`${provider.name} is not available. Please install it first.`);
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      const wallet = await provider.connect();
      if (wallet) {
        setCurrentWallet(wallet);
        onWalletConnect?.(wallet);
      } else {
        setError("Failed to connect wallet");
      }
    } catch (error) {
      console.error("Wallet connection error:", error);
      setError(
        error instanceof Error ? error.message : "Failed to connect wallet"
      );
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setCurrentWallet(null);
    setError(null);
    // Note: Freighter doesn't have a programmatic disconnect method
    // Users need to disconnect from the extension itself
  };

  if (currentWallet?.isConnected) {
    return (
      <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <CardTitle className="text-green-800 dark:text-green-200">
              Wallet Connected
            </CardTitle>
          </div>
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
          >
            {currentWallet.network || "Unknown Network"}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Public Key
            </p>
            <p className="text-xs font-mono break-all text-gray-800 dark:text-gray-200">
              {currentWallet.publicKey}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleDisconnect}
            className="w-full"
          >
            Disconnect Wallet
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Wallet className="w-6 h-6 text-blue-600" />
            <CardTitle className="text-blue-800 dark:text-blue-200">
              Connect Wallet
            </CardTitle>
          </div>
          <p className="text-sm text-blue-600 dark:text-blue-300">
            Choose a wallet to connect to PayStar
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          {walletProviders.map((provider) => (
            <div key={provider.id} className="space-y-2">
              <Button
                onClick={() => handleConnect(provider)}
                disabled={isConnecting || !provider.isAvailable()}
                className="w-full justify-start space-x-3 h-auto p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                variant="outline"
              >
                {isConnecting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <span className="text-lg">{provider.icon}</span>
                )}
                <div className="flex-1 text-left">
                  <div className="font-medium">{provider.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {provider.description}
                  </div>
                </div>
                {provider.isAvailable() ? (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                  >
                    Available
                  </Badge>
                ) : (
                  <Badge
                    variant="secondary"
                    className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                  >
                    Not Installed
                  </Badge>
                )}
              </Button>

              {!provider.isAvailable() && provider.downloadUrl && (
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="w-full text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <a
                    href={provider.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Install {provider.name}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have a Stellar wallet?
            </p>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <a
                href="https://www.freighter.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Freighter
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
