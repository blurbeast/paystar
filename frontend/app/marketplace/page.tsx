"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Filter,
  Grid3X3,
  List,
  SortAsc,
  MapPin,
  Calendar,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { RealTimeFeed } from "@/components/real-time-feed";
import ContractInteraction from "@/components/contract-interaction";
import Header from "@/components/header";
import { WalletStatus } from "@/components/wallet-status";
import { useWalletContext } from "@/contexts/WalletContext";

// Mock data for products
const mockProducts = [
  {
    id: "1",
    title: 'MacBook Pro M3 16"',
    description: "Brand new MacBook Pro with M3 chip, 16GB RAM, 512GB SSD. Perfect for professionals and creators.",
    price: 2499.0,
    category: "Electronics",
    image: "/macbook-pro-laptop.png",
    seller: "TechStore Pro",
    sellerRating: 4.9,
    sellerVerified: true,
    rating: 4.9,
    reviews: 127,
    escrowAvailable: true,
    installmentAvailable: true,
    minInstallment: 416.5,
    maxInstallments: 6,
    views: 1247,
    likes: 89,
    condition: "New",
    location: "San Francisco, CA",
    listedDate: "2024-01-15",
    featured: true,
  },
  {
    id: "2",
    title: "Vintage Gibson Les Paul",
    description: "Classic 1970s Gibson Les Paul in excellent condition. Professional setup included.",
    price: 3500.0,
    category: "Musical Instruments",
    image: "/classic-les-paul.png",
    seller: "VintageGuitars",
    sellerRating: 4.8,
    sellerVerified: true,
    rating: 4.8,
    reviews: 43,
    escrowAvailable: true,
    installmentAvailable: true,
    minInstallment: 583.33,
    maxInstallments: 6,
    views: 892,
    likes: 134,
    condition: "Excellent",
    location: "Nashville, TN",
    listedDate: "2024-01-12",
    featured: false,
  },
  // Add more mock products...
];

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [showContractInterface, setShowContractInterface] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  
  // Get wallet context
  const { isConnected, address } = useWalletContext();

  // Filter products based on search and category
  useEffect(() => {
    const filtered = mockProducts.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.seller.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    switch (sortBy) {
      case "price_low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price_high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        filtered.sort((a, b) => b.views - a.views);
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime());
        break;
      default:
        // Featured first, then by rating
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        });
        break;
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, sortBy, priceRange]);

  // Simulate loading when filters change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory, sortBy]);

  const categories = [
    "all",
    "Electronics",
    "Musical Instruments",
    "Vehicles",
    "Luxury Goods",
    "Art & Collectibles",
    "Real Estate",
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-6 py-2 mb-6 border border-white/20">
              <Sparkles className="w-5 h-5" />
              <span className="font-medium">Premium Marketplace</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Discover Amazing Products
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Shop with confidence using our secure, blockchain-powered marketplace. 
              Every transaction is protected by smart contracts and escrow services.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
                <Shield className="w-4 h-4" />
                <span>Secure Escrow</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
                <CheckCircle className="w-4 h-4" />
                <span>Verified Sellers</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
                <CreditCard className="w-4 h-4" />
                <span>Flexible Payments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Wallet Status */}
            <WalletStatus showDetails={false} showBalances={false} />
            
            {/* Real-time Feed */}
            <div className="sticky top-24">
              <RealTimeFeed />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Smart Contract Interface Toggle */}
            {isConnected && (
              <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950">
                <CardContent className="p-4">
                  <Button
                    onClick={() => setShowContractInterface(!showContractInterface)}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold"
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    {showContractInterface ? "Hide" : "Show"} Smart Contract Interface
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Smart Contract Interaction Panel */}
            {isConnected && showContractInterface && (
              <Card className="border-purple-200 dark:border-purple-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    Smart Contract Interface
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ContractInteraction wallet={{ address, isConnected }} />
                </CardContent>
              </Card>
            )}

            {/* Header Section */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                    Marketplace
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    Discover premium products with secure escrow and flexible payments
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Search and Filters */}
              <Card>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-4 gap-4">
                    {/* Search */}
                    <div className="relative md:col-span-2">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        placeholder="Search products, sellers, or categories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    {/* Category Filter */}
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category === "all" ? "All Categories" : category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Sort */}
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="price_low">Price: Low to High</SelectItem>
                        <SelectItem value="price_high">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="popular">Most Popular</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Results Info */}
              <div className="flex items-center justify-between">
                <p className="text-slate-600 dark:text-slate-400">
                  {isLoading ? "Loading..." : `${filteredProducts.length} products found`}
                </p>
                {filteredProducts.length > 0 && (
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <SortAsc className="w-4 h-4" />
                    Sorted by {sortBy.replace("_", " ")}
                  </div>
                )}
              </div>
            </div>

            {/* Products Grid/List */}
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="aspect-square bg-slate-200 dark:bg-slate-700 rounded-t-lg" />
                    <CardContent className="p-4 space-y-3">
                      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded" />
                      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
                      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    No products found
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Try adjusting your search terms or filters
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                      setSortBy("featured");
                    }}
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className={viewMode === "grid" 
                ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" 
                : "space-y-4"
              }>
                {filteredProducts.map((product) => (
                  <Card 
                    key={product.id} 
                    className={`group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg ${viewMode === "list" ? "flex" : ""}`}
                  >
                    {product.featured && (
                      <Badge className="absolute top-3 left-3 z-10 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                        Featured
                      </Badge>
                    )}
                    
                    <div className={viewMode === "list" ? "w-48 flex-shrink-0" : ""}>
                      <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-t-lg overflow-hidden relative">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3 flex gap-2">
                          <Button size="sm" variant="secondary" className="w-8 h-8 p-0 bg-white/90">
                            <Heart className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="absolute bottom-3 left-3 flex gap-2">
                          {product.escrowAvailable && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                              <Shield className="w-3 h-3 mr-1" />
                              Escrow
                            </Badge>
                          )}
                          {product.installmentAvailable && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                              <CreditCard className="w-3 h-3 mr-1" />
                              Installments
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-4 flex-1">
                      <div className="space-y-3">
                        {/* Title and Price */}
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {product.title}
                          </h3>
                          <div className="text-right flex-shrink-0">
                            <div className="text-lg font-bold text-slate-900 dark:text-white">
                              {formatPrice(product.price)}
                            </div>
                            {product.installmentAvailable && (
                              <div className="text-xs text-slate-500">
                                or {formatPrice(product.minInstallment)}/mo
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                          {product.description}
                        </p>

                        {/* Seller Info */}
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                            {product.seller.charAt(0)}
                          </div>
                          <span className="text-sm text-slate-600 dark:text-slate-400">{product.seller}</span>
                          {product.sellerVerified && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                          <div className="flex items-center gap-1 ml-auto">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{product.rating}</span>
                            <span className="text-xs text-slate-500">({product.reviews})</span>
                          </div>
                        </div>

                        {/* Metadata */}
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {product.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(product.listedDate)}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {product.views}
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              {product.likes}
                            </div>
                          </div>
                        </div>

                        {/* Action Button */}
                        <Button 
                          asChild 
                          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold"
                        >
                          <Link href={`/product/${product.id}`}>
                            View Details
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
