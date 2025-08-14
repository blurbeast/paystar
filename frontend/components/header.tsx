import { Sparkle } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useWalletContext } from "@/contexts/WalletContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    address,
    name,
    isConnected,
    isConnecting,
    connectWallet,
    disconnectWallet,
    error,
    clearError,
  } = useWalletContext();
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleConnect = async () => {
    try {
      clearError(); // Clear any previous errors
      await connectWallet();
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectWallet();
      setIsMenuOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className="flex items-center space-x-3 group cursor-pointer"
            onClick={handleLogoClick}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg">
              <Sparkle className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent">
              PayStar
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/marketplace"
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950"
            >
              Marketplace
            </Link>
            <Link
              href="/dashboard"
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950"
            >
              Dashboard
            </Link>
            {address ? (
              <div className="flex items-center space-x-4">
                <div className="hidden lg:flex items-center space-x-2 bg-green-50 dark:bg-green-950 px-3 py-2 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-700 dark:text-green-300 font-medium">
                    {name}
                  </span>
                  <code className="text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900 px-2 py-1 rounded">
                    {address.slice(0, 6)}...{address.slice(-4)}
                  </code>
                </div>
                <Button
                  variant="outline"
                  onClick={handleDisconnect}
                  className="bg-red-50 hover:bg-red-100 dark:bg-red-950 dark:hover:bg-red-900 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700"
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleConnect}
                disabled={isConnecting}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-lg transition-all duration-300 hover:scale-105"
              >
                {isConnecting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Connecting...</span>
                  </div>
                ) : (
                  "Connect Wallet"
                )}
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
