import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProductCard from "@/components/cards/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Filter, Download, Star, Users } from "lucide-react";
import type { Product } from "@shared/schema";

const Products = () => {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const handleProductBuy = (productId: string) => {
    setLocation(`/checkout/${productId}`);
  };

  // Filter products based on search and category
  const filteredProducts = products?.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = products ? Array.from(new Set(products.map(product => product.category))) : [];

  const ProductsSkeleton = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array(6).fill(0).map((_, i) => (
        <div key={i} className="glass-card rounded-xl p-6">
          <Skeleton className="w-full h-48 rounded-lg mb-4" />
          <Skeleton className="h-6 w-3/4 mb-3" />
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen pt-16" data-testid="products-page">
      {/* Hero Section */}
      <section className="py-20 bg-secondary" data-testid="products-hero-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6">
              Explore Our Digital <span className="text-primary">Products</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transform your digital skills with our comprehensive courses and resources. 
              Designed by experts, proven by results, accessible to everyone.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input border-border"
                data-testid="products-search-input"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[200px] bg-input border-border" data-testid="products-category-filter">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20" data-testid="products-grid-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading && <ProductsSkeleton />}
          
          {error && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Failed to load products. Please try again later.
              </p>
              <Button 
                onClick={() => window.location.reload()} 
                className="mt-4"
                data-testid="products-retry-button"
              >
                Retry
              </Button>
            </div>
          )}

          {filteredProducts && filteredProducts.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No products found matching your criteria.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="mt-4"
                data-testid="products-clear-filters"
              >
                Clear Filters
              </Button>
            </div>
          )}

          {filteredProducts && filteredProducts.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onBuyNow={handleProductBuy}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Product Benefits */}
      <section className="py-20 bg-secondary" data-testid="products-benefits-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold mb-4">
              Why Choose Our <span className="text-primary">Digital Products</span>?
            </h2>
            <p className="text-xl text-muted-foreground">
              Premium learning experiences designed for real-world success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-background" />
              </div>
              <h3 className="text-2xl font-playfair font-bold mb-4">
                Instant Access
              </h3>
              <p className="text-muted-foreground">
                Download immediately after purchase. Start learning right away with 
                lifetime access to all content and future updates.
              </p>
            </div>
            
            <div>
              <div className="w-16 h-16 gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-background" />
              </div>
              <h3 className="text-2xl font-playfair font-bold mb-4">
                Expert Created
              </h3>
              <p className="text-muted-foreground">
                Developed by industry professionals with years of real-world experience. 
                Learn proven strategies that actually work.
              </p>
            </div>
            
            <div>
              <div className="w-16 h-16 gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-background" />
              </div>
              <h3 className="text-2xl font-playfair font-bold mb-4">
                Community Support
              </h3>
              <p className="text-muted-foreground">
                Join our exclusive community of learners. Get support, share insights, 
                and network with like-minded professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" data-testid="products-cta-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-playfair font-bold mb-6">
            Start Your Learning <span className="text-primary">Journey Today</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of successful entrepreneurs and marketers who have transformed 
            their businesses with our comprehensive digital products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => setLocation("/contact")}
              className="gradient-gold text-background font-semibold py-4 px-8 rounded-lg hover:scale-105 transition-transform duration-300"
              data-testid="products-get-consultation"
            >
              Get Personal Consultation
            </Button>
            <Button 
              onClick={() => setLocation("/services")}
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-background py-4 px-8 rounded-lg transition-colors duration-300"
              data-testid="products-view-services"
            >
              View Our Services
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
