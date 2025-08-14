"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import WalletConnect from "@/components/wallet-connect"
import type { WalletConnection } from "@/lib/stellar/wallet"
import {
  Star,
  Shield,
  CreditCard,
  ArrowLeft,
  Heart,
  Share2,
  Calculator,
  CheckCircle,
  TrendingUp,
  User,
  MessageCircle,
  Truck,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock product data - in real app this would come from API
const getProductById = (id: string) => {
  const products = {
    "1": {
      id: "1",
      title: 'MacBook Pro M3 16"',
      description:
        "Brand new MacBook Pro with M3 chip, 16GB RAM, 512GB SSD. Perfect for developers and creators. Includes original packaging, charger, and 1-year Apple warranty.",
      price: 2499.0,
      category: "Electronics",
      images: [
        "/macbook-pro-laptop.png",
        "/placeholder.svg?height=400&width=600&text=MacBook+Side+View",
        "/placeholder.svg?height=400&width=600&text=MacBook+Keyboard",
        "/placeholder.svg?height=400&width=600&text=MacBook+Ports",
      ],
      seller: {
        name: "TechStore Pro",
        rating: 4.9,
        reviews: 127,
        verified: true,
        memberSince: "2022",
        responseTime: "< 1 hour",
      },
      rating: 4.9,
      reviews: 127,
      escrowAvailable: true,
      installmentAvailable: true,
      minInstallment: 416.5,
      maxInstallments: 12,
      views: 1247,
      likes: 89,
      condition: "Brand New",
      warranty: "1 Year Apple Warranty",
      shipping: "Free shipping",
      location: "San Francisco, CA",
      specifications: {
        Processor: "Apple M3 Pro chip",
        Memory: "16GB unified memory",
        Storage: "512GB SSD",
        Display: "16.2-inch Liquid Retina XDR",
        Graphics: "18-core GPU",
        Battery: "Up to 18 hours",
        Weight: "4.7 pounds",
      },
    },
  }
  return products[id as keyof typeof products] || null
}

export default function ProductDetailPage() {
  const params = useParams()
  const product = getProductById(params.id as string)
  const [selectedImage, setSelectedImage] = useState(0)
  const [installmentMonths, setInstallmentMonths] = useState([6])
  const [escrowDays, setEscrowDays] = useState([7])
  const [paymentType, setPaymentType] = useState<"escrow" | "installment">("escrow")
  const [isLiked, setIsLiked] = useState(false)
  const [wallet, setWallet] = useState<WalletConnection | null>(null)

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Button asChild>
            <Link href="/marketplace">Back to Marketplace</Link>
          </Button>
        </div>
      </div>
    )
  }

  const monthlyPayment = product.price / installmentMonths[0]
  const escrowFee = product.price * 0.025 // 2.5% escrow fee
  const installmentFee = product.price * 0.015 // 1.5% installment fee

  const handleWalletConnect = (walletConnection: WalletConnection) => {
    setWallet(walletConnection)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/marketplace">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Marketplace
                </Link>
              </Button>
            </div>
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">PayStar</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-white">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? "border-blue-600" : "border-gray-200"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary">{product.category}</Badge>
                <Badge className="bg-green-100 text-green-700">{product.condition}</Badge>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-gray-500">({product.reviews} reviews)</span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">{product.views} views</span>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
            </div>

            {/* Wallet Connection */}
            <WalletConnect onWalletConnect={handleWalletConnect} />

            {/* Price and Actions */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl font-bold text-gray-900">${product.price.toLocaleString()}</div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsLiked(!isLiked)}
                    className={isLiked ? "text-red-600 border-red-200" : ""}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? "fill-red-600" : ""}`} />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Truck className="w-4 h-4" />
                  <span>{product.shipping}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4" />
                  <span>{product.warranty}</span>
                </div>
              </div>

              {/* Payment Options */}
              <Tabs value={paymentType} onValueChange={(value) => setPaymentType(value as "escrow" | "installment")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="escrow" className="flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>Secure Escrow</span>
                  </TabsTrigger>
                  <TabsTrigger value="installment" className="flex items-center space-x-2">
                    <CreditCard className="w-4 h-4" />
                    <span>Installments</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="escrow" className="space-y-4 mt-6">
                  <Card className="border-blue-200 bg-blue-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <Shield className="w-5 h-5 text-blue-600" />
                        <span>Smart Escrow Protection</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-700">
                        Your payment is held securely in a Stellar smart contract until delivery is confirmed.
                      </p>

                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="escrow-days">Delivery Timeline (days)</Label>
                          <div className="mt-2">
                            <Slider
                              id="escrow-days"
                              min={3}
                              max={30}
                              step={1}
                              value={escrowDays}
                              onValueChange={setEscrowDays}
                              className="w-full"
                            />
                            <div className="flex justify-between text-sm text-gray-500 mt-1">
                              <span>3 days</span>
                              <span className="font-medium">{escrowDays[0]} days</span>
                              <span>30 days</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 space-y-2">
                          <div className="flex justify-between">
                            <span>Product Price</span>
                            <span>${product.price.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Escrow Fee (2.5%)</span>
                            <span>${escrowFee.toFixed(2)}</span>
                          </div>
                          <div className="border-t pt-2 flex justify-between font-bold">
                            <span>Total</span>
                            <span>${(product.price + escrowFee).toFixed(2)}</span>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2 text-green-700">
                            <CheckCircle className="w-4 h-4" />
                            <span>Funds released automatically after {escrowDays[0]} days</span>
                          </div>
                          <div className="flex items-center space-x-2 text-green-700">
                            <CheckCircle className="w-4 h-4" />
                            <span>Dispute resolution available</span>
                          </div>
                          <div className="flex items-center space-x-2 text-green-700">
                            <CheckCircle className="w-4 h-4" />
                            <span>Full refund if not delivered</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="installment" className="space-y-4 mt-6">
                  <Card className="border-green-200 bg-green-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <Calculator className="w-5 h-5 text-green-600" />
                        <span>Flexible Installment Plan</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-700">
                        Split your payment into manageable monthly installments with low fees.
                      </p>

                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="installment-months">Number of Months</Label>
                          <div className="mt-2">
                            <Slider
                              id="installment-months"
                              min={3}
                              max={12}
                              step={1}
                              value={installmentMonths}
                              onValueChange={setInstallmentMonths}
                              className="w-full"
                            />
                            <div className="flex justify-between text-sm text-gray-500 mt-1">
                              <span>3 months</span>
                              <span className="font-medium">{installmentMonths[0]} months</span>
                              <span>12 months</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 space-y-2">
                          <div className="flex justify-between">
                            <span>Product Price</span>
                            <span>${product.price.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Processing Fee (1.5%)</span>
                            <span>${installmentFee.toFixed(2)}</span>
                          </div>
                          <div className="border-t pt-2 flex justify-between font-bold">
                            <span>Total</span>
                            <span>${(product.price + installmentFee).toFixed(2)}</span>
                          </div>
                          <div className="bg-green-100 rounded p-2 mt-2">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-700">${monthlyPayment.toFixed(2)}</div>
                              <div className="text-sm text-green-600">per month</div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2 text-green-700">
                            <CheckCircle className="w-4 h-4" />
                            <span>First payment due at purchase</span>
                          </div>
                          <div className="flex items-center space-x-2 text-green-700">
                            <CheckCircle className="w-4 h-4" />
                            <span>Automatic monthly payments</span>
                          </div>
                          <div className="flex items-center space-x-2 text-green-700">
                            <CheckCircle className="w-4 h-4" />
                            <span>Early payment option available</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6 mt-6"
                disabled={!wallet?.isConnected}
              >
                {wallet?.isConnected ? (
                  <Link href={`/create-agreement?product=${product.id}&type=${paymentType}&wallet=${wallet.publicKey}`}>
                    {paymentType === "escrow" ? "Create Escrow Agreement" : "Start Installment Plan"}
                  </Link>
                ) : (
                  <span>Connect Wallet to Continue</span>
                )}
              </Button>
            </div>

            {/* Seller Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Seller Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold flex items-center space-x-2">
                        <span>{product.seller.name}</span>
                        {product.seller.verified && <CheckCircle className="w-4 h-4 text-blue-600" />}
                      </div>
                      <div className="text-sm text-gray-600">Member since {product.seller.memberSince}</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="flex items-center space-x-1 mb-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{product.seller.rating}</span>
                    </div>
                    <div className="text-gray-600">{product.seller.reviews} reviews</div>
                  </div>
                  <div>
                    <div className="font-medium">Response Time</div>
                    <div className="text-gray-600">{product.seller.responseTime}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">{key}</span>
                        <span className="text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Reviews Coming Soon</h3>
                    <p className="text-gray-600">Review system will be integrated with blockchain verification</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Shipping Information</h3>
                      <p className="text-gray-600">
                        Free shipping within the United States. International shipping available for additional cost.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Return Policy</h3>
                      <p className="text-gray-600">
                        30-day return policy. Items must be in original condition. Return shipping costs may apply.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
