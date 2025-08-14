"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { CheckCircle, AlertCircle, Wallet, Globe } from "lucide-react";
import { kit } from "@/wallet/walletKit";
import { useWalletStore } from "@/store";
import { ISupportedWallet } from "@creit.tech/stellar-wallets-kit";

export default function WalletDebug() {
  const [availableWallets, setAvailableWallets] = useState<ISupportedWallet[]>(
    []
  );
  const [isFreighterInstalled, setIsFreighterInstalled] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>("");
  const { address, name } = useWalletStore();

  useEffect(() => {
    checkWalletAvailability();
  }, []);

  const checkWalletAvailability = async () => {
    try {
      // Check if Freighter is installed
      const freighterInstalled = !!(window as any).freighter;
      setIsFreighterInstalled(freighterInstalled);

      // Get available wallets from the kit
      const wallets = await kit.getSupportedWallets();
      setAvailableWallets(wallets);

      setDebugInfo(
        `Freighter installed: ${freighterInstalled}, Available wallets: ${wallets.length}`
      );
    } catch (error) {
      console.error("Error checking wallet availability:", error);
      setDebugInfo(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  };

  const testWalletConnection = async () => {
    try {
      await kit.openModal({
        modalTitle: "Connect to your wallet (Debug Mode)",
        onWalletSelected: async (option: ISupportedWallet) => {
          console.log("Selected wallet:", option);
          kit.setWallet(option.id);

          try {
            const { address: walletAddress } = await kit.getAddress();
            console.log("Wallet address:", walletAddress);
            setDebugInfo(`Connected to ${option.name}: ${walletAddress}`);
          } catch (addressError) {
            console.error("Error getting address:", addressError);
            setDebugInfo(
              `Error getting address: ${addressError instanceof Error ? addressError.message : "Unknown error"}`
            );
          }
        },
      });
    } catch (error) {
      console.error("Error opening wallet modal:", error);
      setDebugInfo(
        `Modal error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Wallet className="w-5 h-5" />
          Wallet Debug Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Connection Status */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-300">
            Current Connection
          </h3>
          {address ? (
            <Alert className="border-green-500 bg-green-500/10">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertDescription className="text-green-400">
                Connected to {name}: {address.slice(0, 8)}...{address.slice(-8)}
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="border-yellow-500 bg-yellow-500/10">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              <AlertDescription className="text-yellow-400">
                No wallet connected
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Freighter Status */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-300">
            Freighter Wallet
          </h3>
          <div className="flex items-center gap-2">
            <Badge variant={isFreighterInstalled ? "default" : "destructive"}>
              {isFreighterInstalled ? (
                <>
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Installed
                </>
              ) : (
                <>
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Not Installed
                </>
              )}
            </Badge>
            {!isFreighterInstalled && (
              <a
                href="https://freighter.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm underline"
              >
                Install Freighter
              </a>
            )}
          </div>
        </div>

        {/* Available Wallets */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-300">
            Available Wallets ({availableWallets.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {availableWallets.map((wallet) => (
              <div
                key={wallet.id}
                className="flex items-center gap-2 p-2 bg-gray-700 rounded"
              >
                <img src={wallet.icon} alt={wallet.name} className="w-6 h-6" />
                <span className="text-sm text-white">{wallet.name}</span>
                <Badge variant="outline" className="text-xs">
                  {wallet.id}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Debug Actions */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-300">Debug Actions</h3>
          <div className="flex gap-2">
            <Button
              onClick={checkWalletAvailability}
              variant="outline"
              size="sm"
            >
              Refresh Status
            </Button>
            <Button onClick={testWalletConnection} size="sm">
              Test Connection
            </Button>
          </div>
        </div>

        {/* Debug Info */}
        {debugInfo && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-300">Debug Info</h3>
            <div className="p-2 bg-gray-900 rounded text-xs text-gray-400 font-mono">
              {debugInfo}
            </div>
          </div>
        )}

        {/* Network Info */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-300">
            Network Configuration
          </h3>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-400" />
            <Badge variant="outline">TESTNET</Badge>
            <span className="text-xs text-gray-400">
              Using Stellar Testnet for development
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
