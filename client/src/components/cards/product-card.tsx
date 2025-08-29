import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Download, Check } from "lucide-react";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  onBuyNow?: (productId: string) => void;
}

const ProductCard = ({ product, onBuyNow }: ProductCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price / 100);
  };

  return (
    <Card 
      className="glass-card rounded-xl hover-glow hover:scale-105 transition-all duration-300 overflow-hidden group"
      data-testid={`product-card-${product.id}`}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          data-testid={`product-image-${product.id}`}
        />
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
            {product.category}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <div className="bg-accent/90 text-accent-foreground px-2 py-1 rounded-lg text-sm font-semibold">
            <Download className="h-4 w-4 inline mr-1" />
            Digital
          </div>
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 
          className="text-xl font-playfair font-semibold mb-3"
          data-testid={`product-title-${product.id}`}
        >
          {product.title}
        </h3>
        <p 
          className="text-muted-foreground mb-4 text-sm"
          data-testid={`product-description-${product.id}`}
        >
          {product.description}
        </p>
        
        {product.features && product.features.length > 0 && (
          <div className="space-y-2 mb-4">
            {product.features.slice(0, 4).map((feature, index) => (
              <div key={index} className="flex items-center text-sm">
                <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-6 pt-0 flex justify-between items-center">
        <div>
          <span 
            className="text-primary font-bold text-2xl"
            data-testid={`product-price-${product.id}`}
          >
            {formatPrice(product.price)}
          </span>
        </div>
        <Button
          onClick={() => onBuyNow?.(product.id)}
          className="gradient-gold text-background hover:scale-105 transition-transform duration-300"
          data-testid={`product-buy-button-${product.id}`}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Buy Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
