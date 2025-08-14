"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Wallet, Copy, ExternalLink, RefreshCw } from "lucide-react";
import { useWalletContext } from "@/contexts/WalletContext";
import { useState } from "react";

interface WalletStatusProps {
  showDetails?: boolean;
  showBalances?: boolean;
  className?: string;
}

export function WalletStatus({
  showDetails = true,
  showBalances = true,
  className = "",
}: WalletStatusProps) {
  const {
    address,
    name,
    isConnected,
    isConnecting,
    error,
    network,
    balances,
    totalXlmUsdValue,
    isLoadingWalletData,
    fetchBalances,
    connectWallet,
    clearError,
  } = useWalletContext();

  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatBalance = (balance: string) => {
    const num = parseFloat(balance);
    return num.toFixed(4);
  };

  if (!isConnected) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Wallet Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <p className="text-muted-foreground text-center">
              Connect your wallet to access all features
            </p>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>
                  {error}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearError}
                    className="ml-2"
                  >
                    Dismiss
                  </Button>
                </AlertDescription>
              </Alert>
            )}
            <Button
              onClick={connectWallet}
              disabled={isConnecting}
              className="w-full"
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Wallet Connected
          </div>
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            {network}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {showDetails && (
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Wallet
              </p>
              <p className="text-sm">{name}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Address
              </p>
              <div className="flex items-center space-x-2">
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  {address?.slice(0, 8)}...{address?.slice(-8)}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyAddress}
                  className="h-8 w-8 p-0"
                >
                  <Copy className="w-3 h-3" />
                </Button>
                {copied && (
                  <span className="text-xs text-green-600">Copied!</span>
                )}
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  window.open(
                    `https://stellar.expert/explorer/${network.toLowerCase()}/account/${address}`,
                    "_blank"
                  )
                }
                className="flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                Explorer
              </Button>
              {showBalances && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchBalances}
                  disabled={isLoadingWalletData}
                  className="flex items-center gap-1"
                >
                  <RefreshCw
                    className={`w-3 h-3 ${isLoadingWalletData ? "animate-spin" : ""}`}
                  />
                  Refresh
                </Button>
              )}
            </div>
          </div>
        )}

        {showBalances && (
          <div className="space-y-3">
            <div className="border-t pt-3">
              <p className="text-sm font-medium text-muted-foreground mb-2">
                Balances
              </p>
              {isLoadingWalletData ? (
                <p className="text-sm text-muted-foreground">
                  Loading balances...
                </p>
              ) : balances.length > 0 ? (
                <div className="space-y-2">
                  {balances.map((balance, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm">
                        {balance.asset_type === "native"
                          ? "XLM"
                          : balance.asset_code}
                      </span>
                      <span className="text-sm font-medium">
                        {formatBalance(balance.balance)}
                      </span>
                    </div>
                  ))}
                  {totalXlmUsdValue !== "0.00" && (
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          USD Value
                        </span>
                        <span className="text-sm font-medium">
                          ${totalXlmUsdValue}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No balances found
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
