import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  ShoppingCart, 
  Download, 
  Shield, 
  CreditCard, 
  CheckCircle,
  ArrowLeft,
  Lock
} from "lucide-react";
import type { Product } from "@shared/schema";

// Razorpay types
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: any) => void;
  prefill: {
    name: string;
    email: string;
  };
  theme: {
    color: string;
  };
}

const CheckoutForm = ({ product }: { product: Product }) => {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => {
      toast({
        title: "Payment Error",
        description: "Failed to load payment system. Please refresh and try again.",
        variant: "destructive",
      });
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [toast]);

  const handlePayment = async () => {
    if (!razorpayLoaded) {
      toast({
        title: "Payment Error",
        description: "Payment system is still loading. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Create order
      const orderResponse = await apiRequest("POST", "/api/create-order", {
        amount: product.price,
        productId: product.id
      });
      const orderData = await orderResponse.json();

      if (!orderData.orderId) {
        throw new Error("Failed to create payment order");
      }

      const options: RazorpayOptions = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "XPR Media",
        description: product.title,
        order_id: orderData.orderId,
        handler: async (response: any) => {
          try {
            // Verify payment
            const verifyResponse = await apiRequest("POST", "/api/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });
            
            const verifyData = await verifyResponse.json();
            
            if (verifyData.success) {
              toast({
                title: "Payment Successful!",
                description: "Thank you for your purchase! You'll receive download instructions via email.",
              });
              setLocation("/products?success=true");
            } else {
              throw new Error("Payment verification failed");
            }
          } catch (error) {
            toast({
              title: "Payment Verification Failed",
              description: "Please contact support if the amount was deducted.",
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: "Customer",
          email: "customer@example.com"
        },
        theme: {
          color: "#D4AF37"
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      toast({
        title: "Payment Error",
        description: error.message || "Failed to initialize payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price / 100);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      {/* Product Summary */}
      <div className="space-y-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-2xl font-playfair">Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-4">
              <img
                src={product.image}
                alt={product.title}
                className="w-20 h-20 object-cover rounded-lg"
                data-testid="checkout-product-image"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg" data-testid="checkout-product-title">
                  {product.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-2">
                  {product.description}
                </p>
                <Badge variant="secondary" className="bg-primary/20 text-primary">
                  <Download className="h-3 w-3 mr-1" />
                  Digital Product
                </Badge>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary" data-testid="checkout-product-price">
                  {formatPrice(product.price)}
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(product.price)}</span>
              </div>
              <div className="flex justify-between">
                <span>Processing Fee</span>
                <span>₹0.00</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="text-primary">{formatPrice(product.price)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What You Get */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-xl font-playfair flex items-center">
              <CheckCircle className="h-5 w-5 text-primary mr-2" />
              What You Get
            </CardTitle>
          </CardHeader>
          <CardContent>
            {product.features && product.features.length > 0 && (
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4 p-4 bg-primary/10 rounded-lg">
              <div className="flex items-center text-sm text-primary">
                <Download className="h-4 w-4 mr-2" />
                <span className="font-medium">Instant Download</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Access your purchase immediately after payment confirmation
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Shield className="h-4 w-4" />
          <span>Secure payment powered by Razorpay</span>
        </div>
      </div>

      {/* Payment Form */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-2xl font-playfair flex items-center">
            <CreditCard className="h-6 w-6 mr-2" />
            Payment Details
          </CardTitle>
          <p className="text-muted-foreground">
            Secure payment processing with industry-standard encryption
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="p-6 border border-border rounded-lg text-center space-y-4">
              <div className="w-16 h-16 gradient-gold rounded-full flex items-center justify-center mx-auto">
                <CreditCard className="h-8 w-8 text-background" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Ready to Purchase?</h3>
                <p className="text-muted-foreground text-sm">
                  Click the button below to proceed with secure payment via Razorpay. 
                  You can pay using UPI, Net Banking, Cards, or Wallets.
                </p>
              </div>
            </div>
            
            <Button 
              onClick={handlePayment}
              className="w-full gradient-gold text-background font-semibold py-4 hover:scale-105 transition-transform duration-300"
              disabled={!razorpayLoaded || isProcessing}
              data-testid="checkout-submit-button"
            >
              {isProcessing ? (
                "Processing..."
              ) : !razorpayLoaded ? (
                "Loading Payment System..."
              ) : (
                <>
                  <Lock className="mr-2 h-5 w-5" />
                  Pay {formatPrice(product.price)}
                </>
              )}
            </Button>

            <div className="text-center space-y-2">
              <p className="text-xs text-muted-foreground">
                By completing this purchase, you agree to our Terms of Service and Privacy Policy.
              </p>
              <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Shield className="h-3 w-3 mr-1" />
                  <span>SSL Secured</span>
                </div>
                <div className="flex items-center">
                  <Lock className="h-3 w-3 mr-1" />
                  <span>256-bit Encryption</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Checkout = () => {
  const params = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const productId = params.productId;

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ["/api/products", productId],
    enabled: !!productId,
  });

  if (!productId) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Product</h1>
          <p className="text-muted-foreground mb-6">No product specified for checkout.</p>
          <Button onClick={() => setLocation("/products")}>
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16" data-testid="checkout-page">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <Skeleton className="h-8 w-48" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-4">
                    <Skeleton className="w-20 h-20 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                    <Skeleton className="h-8 w-16" />
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card className="glass-card">
              <CardHeader>
                <Skeleton className="h-8 w-48" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-48 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The product you're trying to purchase could not be found.
          </p>
          <Button onClick={() => setLocation("/products")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16" data-testid="checkout-page">
      {/* Header */}
      <section className="py-12 bg-secondary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-6">
            <Button 
              variant="ghost" 
              onClick={() => setLocation("/products")}
              className="text-muted-foreground hover:text-primary"
              data-testid="checkout-back-button"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-playfair font-bold mb-4">
              Secure <span className="text-primary">Checkout</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Complete your purchase securely with our encrypted payment system
            </p>
          </div>
        </div>
      </section>

      {/* Checkout Content */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <CheckoutForm product={product} />
        </div>
      </section>
    </div>
  );
};

export default Checkout;