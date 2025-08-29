import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Star, Clock, Users, Zap, Award, Headphones, TrendingUp } from "lucide-react";
import Hero from "@/components/sections/hero";
import Testimonials from "@/components/sections/testimonials";
import ServiceCard from "@/components/cards/service-card";
import ProductCard from "@/components/cards/product-card";
import BlogCard from "@/components/cards/blog-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Service, Product, BlogPost } from "@shared/schema";

const Home = () => {
  const [, setLocation] = useLocation();

  const { data: services, isLoading: servicesLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: blogPosts, isLoading: blogLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const handleServiceBook = (serviceId: string) => {
    setLocation(`/contact?service=${serviceId}`);
  };

  const handleProductBuy = (productId: string) => {
    setLocation(`/checkout/${productId}`);
  };

  const handleBlogReadMore = (postId: string) => {
    setLocation(`/blog/${postId}`);
  };

  return (
    <div className="min-h-screen" data-testid="home-page">
      {/* Hero Section */}
      <Hero />

      {/* About Us Section */}
      <section id="about" className="py-20 bg-secondary" data-testid="about-preview-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-playfair font-bold mb-6">
                About <span className="text-primary">XPR Media</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                We are a full-service digital agency specializing in premium content creation,
                influencer marketing, and innovative AI-powered solutions. Our mission is to
                elevate your brand with cutting-edge strategies and exceptional quality.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                From video editing and UGC creation to comprehensive digital courses,
                we provide everything you need to succeed in the digital landscape.
              </p>
              <Link href="/about">
                <Button 
                  className="gradient-gold text-background font-semibold py-3 px-6 rounded-lg hover:scale-105 transition-transform duration-300"
                  data-testid="learn-more-about-us"
                >
                  Learn More About Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="XPR Media team collaborating"
                className="rounded-xl shadow-2xl hover-glow transition-all duration-300"
                data-testid="about-team-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section id="services" className="py-20" data-testid="featured-services-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold mb-4">
              Our Premium <span className="text-primary">Services</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive digital solutions tailored to your success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {servicesLoading
              ? Array(3).fill(0).map((_, i) => (
                  <Card key={i} className="glass-card rounded-xl p-6">
                    <Skeleton className="w-full h-48 rounded-lg mb-4" />
                    <Skeleton className="h-6 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-10 w-full" />
                  </Card>
                ))
              : services?.slice(0, 3).map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onBook={handleServiceBook}
                  />
                ))}
          </div>

          <div className="text-center">
            <Link href="/services">
              <Button
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-background py-3 px-8 rounded-lg transition-colors duration-300"
                data-testid="view-all-services"
              >
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="products" className="py-20 bg-secondary" data-testid="featured-products-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold mb-4">
              Digital <span className="text-primary">Products</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive courses and resources for digital success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {productsLoading
              ? Array(3).fill(0).map((_, i) => (
                  <Card key={i} className="glass-card rounded-xl p-6">
                    <Skeleton className="w-full h-48 rounded-lg mb-4" />
                    <Skeleton className="h-5 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-10 w-full" />
                  </Card>
                ))
              : products?.slice(0, 3).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onBuyNow={handleProductBuy}
                  />
                ))}
          </div>

          <div className="text-center">
            <Link href="/products">
              <Button
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-background py-3 px-8 rounded-lg transition-colors duration-300"
                data-testid="explore-all-products"
              >
                Explore All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20" data-testid="why-choose-us-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold mb-4">
              Why Choose <span className="text-primary">XPR Media</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              The advantages that set us apart from the competition
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center group" data-testid="feature-affordable-premium">
              <div className="w-16 h-16 gradient-gold rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Star className="h-8 w-8 text-background" />
              </div>
              <h3 className="text-xl font-playfair font-semibold mb-3">
                Affordable + Premium Quality
              </h3>
              <p className="text-muted-foreground">
                High-end results at competitive prices, making premium services accessible to all businesses.
              </p>
            </div>

            <div className="text-center group" data-testid="feature-ai-powered">
              <div className="w-16 h-16 gradient-gold rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-8 w-8 text-background" />
              </div>
              <h3 className="text-xl font-playfair font-semibold mb-3">
                AI-Powered Services
              </h3>
              <p className="text-muted-foreground">
                Cutting-edge AI technology integrated into our workflows for faster, smarter results.
              </p>
            </div>

            <div className="text-center group" data-testid="feature-full-service">
              <div className="w-16 h-16 gradient-gold rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Award className="h-8 w-8 text-background" />
              </div>
              <h3 className="text-xl font-playfair font-semibold mb-3">
                Full-Service Agency
              </h3>
              <p className="text-muted-foreground">
                Complete digital solutions under one roof - from strategy to execution and optimization.
              </p>
            </div>

            <div className="text-center group" data-testid="feature-24-7-support">
              <div className="w-16 h-16 gradient-gold rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Headphones className="h-8 w-8 text-background" />
              </div>
              <h3 className="text-xl font-playfair font-semibold mb-3">
                24/7 Support
              </h3>
              <p className="text-muted-foreground">
                Round-the-clock assistance to ensure your projects stay on track and exceed expectations.
              </p>
            </div>

            <div className="text-center group" data-testid="feature-fast-delivery">
              <div className="w-16 h-16 gradient-gold rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-8 w-8 text-background" />
              </div>
              <h3 className="text-xl font-playfair font-semibold mb-3">
                Fast Delivery
              </h3>
              <p className="text-muted-foreground">
                Quick turnaround times without compromising quality, keeping your campaigns on schedule.
              </p>
            </div>

            <div className="text-center group" data-testid="feature-proven-results">
              <div className="w-16 h-16 gradient-gold rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-8 w-8 text-background" />
              </div>
              <h3 className="text-xl font-playfair font-semibold mb-3">
                Proven Results
              </h3>
              <p className="text-muted-foreground">
                Data-driven strategies that deliver measurable growth and exceptional ROI for our clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Blog Preview Section */}
      <section id="blog" className="py-20" data-testid="blog-preview-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold mb-4">
              Latest from Our <span className="text-primary">Blog</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Insights, tips, and trends from digital marketing experts
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogLoading
              ? Array(3).fill(0).map((_, i) => (
                  <Card key={i} className="glass-card rounded-xl overflow-hidden">
                    <Skeleton className="w-full h-48" />
                    <CardContent className="p-6">
                      <Skeleton className="h-4 w-20 mb-3" />
                      <Skeleton className="h-6 w-full mb-3" />
                      <Skeleton className="h-4 w-full mb-4" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                  </Card>
                ))
              : blogPosts?.slice(0, 3).map((post) => (
                  <BlogCard
                    key={post.id}
                    post={post}
                    onReadMore={handleBlogReadMore}
                  />
                ))}
          </div>
        </div>
      </section>

      {/* Contact & Booking Section */}
      <section id="contact" className="py-20 bg-secondary" data-testid="contact-booking-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold mb-4">
              Let's Start Your <span className="text-primary">Success Story</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Ready to transform your digital presence? Get in touch with our experts.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/contact">
              <Button 
                className="gradient-gold text-background font-semibold py-4 px-8 rounded-lg hover:scale-105 transition-transform duration-300"
                data-testid="get-free-consultation"
              >
                Get Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/services">
              <Button 
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-background py-4 px-8 rounded-lg transition-colors duration-300"
                data-testid="view-our-services"
              >
                View Our Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
