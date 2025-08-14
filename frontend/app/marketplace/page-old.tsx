"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Star,
  Shield,
  CreditCard,
  Clock,
  TrendingUp,
  Eye,
  Heart,
  ArrowRight,
  Sparkles,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { RealTimeFeed } from "@/components/real-time-feed";
import Header from "@/components/header";
import { WalletStatus } from "@/components/wallet-status";
import ContractInteraction from "@/components/contract-interaction";
import { useWalletContext } from "@/contexts/WalletContext";

// Mock data for products
const mockProducts = [
  {
    id: "1",
    title: 'MacBook Pro M3 16"',
    description: "Brand new MacBook Pro with M3 chip, 16GB RAM, 512GB SSD",
    price: 2499.0,
    category: "Electronics",
    image: "/macbook-pro-laptop.png",
    seller: "TechStore Pro",
    rating: 4.9,
    reviews: 127,
    escrowAvailable: true,
    installmentAvailable: true,
    minInstallment: 416.5,
    maxInstallments: 6,
    views: 1247,
    likes: 89,
  },
  {
    id: "2",
    title: "Vintage Gibson Les Paul",
    description: "Classic 1970s Gibson Les Paul in excellent condition",
    price: 3500.0,
    category: "Musical Instruments",
    image: "/classic-les-paul.png",
    seller: "VintageGuitars",
    rating: 4.8,
    reviews: 43,
    escrowAvailable: true,
    installmentAvailable: true,
    minInstallment: 583.33,
    maxInstallments: 6,
    views: 892,
    likes: 156,
  },
  {
    id: "3",
    title: "Tesla Model 3 Performance",
    description: "2023 Tesla Model 3 Performance with autopilot, low mileage",
    price: 45000.0,
    category: "Vehicles",
    image: "/tesla-model-3.png",
    seller: "ElectricAutos",
    rating: 4.7,
    reviews: 28,
    escrowAvailable: true,
    installmentAvailable: true,
    minInstallment: 7500.0,
    maxInstallments: 6,
    views: 2341,
    likes: 234,
  },
  {
    id: "4",
    title: "Rolex Submariner",
    description: "Authentic Rolex Submariner Date, stainless steel",
    price: 8500.0,
    category: "Luxury Goods",
    image: "/placeholder-lgzf8.png",
    seller: "LuxuryTimepieces",
    rating: 4.9,
    reviews: 67,
    escrowAvailable: true,
    installmentAvailable: true,
    minInstallment: 1416.67,
    maxInstallments: 6,
    views: 1876,
    likes: 298,
  },
  {
    id: "5",
    title: "Canon EOS R5 Camera",
    description: "Professional mirrorless camera with 45MP sensor, 8K video",
    price: 3200.0,
    category: "Electronics",
    image: "/canon-eos-r5.png",
    seller: "PhotoPro",
    rating: 4.8,
    reviews: 91,
    escrowAvailable: true,
    installmentAvailable: true,
    minInstallment: 533.33,
    maxInstallments: 6,
    views: 1543,
    likes: 187,
  },
  {
    id: "6",
    title: "Steinway Grand Piano",
    description: "Concert grand piano in pristine condition, recently tuned",
    price: 125000.0,
    category: "Musical Instruments",
    image: "/steinway-grand-piano.png",
    seller: "ClassicalInstruments",
    rating: 5.0,
    reviews: 12,
    escrowAvailable: true,
    installmentAvailable: true,
    minInstallment: 20833.33,
    maxInstallments: 6,
    views: 567,
    likes: 89,
  },
];

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [showContractInterface, setShowContractInterface] = useState(false);

  // Get wallet context
  const { isConnected, address } = useWalletContext();

  // Filter products based on search and category
  useEffect(() => {
    const filtered = mockProducts.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        filtered.sort((a, b) => b.views - a.views);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, sortBy]);

  // Simulate loading when filters change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory, sortBy]);

  const categories = [
    "all",
    "Electronics",
    "Musical Instruments",
    "Vehicles",
    "Luxury Goods",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Navigation */}
      <div>
        <Header />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar with Real-time Feed */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <RealTimeFeed />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Wallet Status Component */}
            <div className="mb-8 animate-fade-in-up">
              <WalletStatus />
            </div>

            {/* Smart Contract Interface Toggle */}
            {isConnected && (
              <div className="mb-8 animate-fade-in-up delay-75">
                <Button
                  onClick={() =>
                    setShowContractInterface(!showContractInterface)
                  }
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-105"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  {showContractInterface ? "Hide" : "Show"} Smart Contract
                  Interface
                </Button>
              </div>
            )}

            {/* Smart Contract Interaction Panel */}
            {isConnected && showContractInterface && (
              <div className="mb-8 animate-fade-in-up delay-100">
                <ContractInteraction wallet={{ address, isConnected }} />
              </div>
            )}

            {/* Header */}
            <div className="mb-8 animate-fade-in-up">
              <h1 className="text-4xl font-serif font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-3">
                Premium Marketplace
              </h1>
              <p className="text-gray-300 text-lg">
                Secure transactions with smart escrow and flexible payments
              </p>
            </div>

            {/* Search and Filters */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 mb-8 animate-fade-in-up delay-100 shadow-2xl">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search premium products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-indigo-400 focus:ring-indigo-400/20 transition-all duration-300 hover:bg-white/10"
                  />
                </div>

                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-full lg:w-48 bg-white/5 border-white/20 text-white hover:bg-white/10 transition-all duration-300">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-white/20">
                    {categories.map((category) => (
                      <SelectItem
                        key={category}
                        value={category}
                        className="text-white hover:bg-white/10"
                      >
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full lg:w-48 bg-white/5 border-white/20 text-white hover:bg-white/10 transition-all duration-300">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-white/20">
                    <SelectItem
                      value="featured"
                      className="text-white hover:bg-white/10"
                    >
                      Featured
                    </SelectItem>
                    <SelectItem
                      value="price-low"
                      className="text-white hover:bg-white/10"
                    >
                      Price: Low to High
                    </SelectItem>
                    <SelectItem
                      value="price-high"
                      className="text-white hover:bg-white/10"
                    >
                      Price: High to Low
                    </SelectItem>
                    <SelectItem
                      value="rating"
                      className="text-white hover:bg-white/10"
                    >
                      Highest Rated
                    </SelectItem>
                    <SelectItem
                      value="popular"
                      className="text-white hover:bg-white/10"
                    >
                      Most Popular
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results Summary */}
            <div className="flex items-center justify-between mb-8 animate-fade-in-up delay-200">
              <p className="text-gray-300">
                Showing{" "}
                <span className="text-white font-semibold">
                  {filteredProducts.length}
                </span>{" "}
                of{" "}
                <span className="text-white font-semibold">
                  {mockProducts.length}
                </span>{" "}
                premium products
              </p>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center space-x-2 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span>Escrow Protected</span>
                </div>
                <div className="flex items-center space-x-2 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                  <CreditCard className="w-4 h-4 text-green-400" />
                  <span>Installments Available</span>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card
                    key={i}
                    className="bg-white/5 border-white/10 animate-pulse"
                  >
                    <div className="h-48 bg-white/10 rounded-t-xl"></div>
                    <CardContent className="p-6 space-y-3">
                      <div className="h-4 bg-white/10 rounded w-3/4"></div>
                      <div className="h-4 bg-white/10 rounded w-1/2"></div>
                      <div className="h-8 bg-white/10 rounded w-1/3"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <Card
                    key={product.id}
                    className={`group bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-fade-in-up shadow-2xl hover:shadow-indigo-500/10`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative overflow-hidden rounded-t-xl">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 right-4 flex space-x-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="w-9 h-9 p-0 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="absolute bottom-4 left-4 flex space-x-2">
                        {product.escrowAvailable && (
                          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 backdrop-blur-sm hover:bg-blue-500/30 transition-all duration-300">
                            <Shield className="w-3 h-3 mr-1" />
                            Escrow
                          </Badge>
                        )}
                        {product.installmentAvailable && (
                          <Badge className="bg-green-500/20 text-green-300 border-green-500/30 backdrop-blur-sm hover:bg-green-500/30 transition-all duration-300">
                            <CreditCard className="w-3 h-3 mr-1" />
                            Installments
                          </Badge>
                        )}
                      </div>
                    </div>

                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-white group-hover:text-indigo-300 transition-colors duration-300 text-lg">
                            {product.title}
                          </h3>
                          <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                            {product.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 mt-3">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium text-white">
                            {product.rating}
                          </span>
                          <span className="text-sm text-gray-400">
                            ({product.reviews})
                          </span>
                        </div>
                        <span className="text-gray-600">•</span>
                        <span className="text-sm text-gray-300">
                          {product.seller}
                        </span>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            ${product.price.toLocaleString()}
                          </div>
                          <div className="flex items-center space-x-3 text-sm text-gray-400">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{product.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="w-4 h-4" />
                              <span>{product.likes}</span>
                            </div>
                          </div>
                        </div>

                        {product.installmentAvailable && (
                          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-500/20 backdrop-blur-sm">
                            <div className="text-sm text-green-300">
                              <div className="font-semibold">
                                Flexible Payments
                              </div>
                              <div className="text-green-400">
                                From ${product.minInstallment}/month for{" "}
                                {product.maxInstallments} months
                              </div>
                            </div>
                          </div>
                        )}

                        <Button
                          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/40 group"
                          asChild
                        >
                          <Link href={`/product/${product.id}`}>
                            View Details
                            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </Button>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>Listed 2 days ago</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="w-3 h-3" />
                            <span>Trending</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Load More */}
            <div className="text-center mt-12 animate-fade-in-up">
              <Button
                variant="outline"
                size="lg"
                className="px-8 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                Load More Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
