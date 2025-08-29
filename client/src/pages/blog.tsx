import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BlogCard from "@/components/cards/blog-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Filter, BookOpen, TrendingUp, Users } from "lucide-react";
import type { BlogPost } from "@shared/schema";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: blogPosts, isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const handleBlogReadMore = (postId: string) => {
    // In a real app, this would navigate to a detailed blog post page
    console.log("Read more for post:", postId);
  };

  // Filter blog posts based on search and category
  const filteredPosts = blogPosts?.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = blogPosts ? Array.from(new Set(blogPosts.map(post => post.category))) : [];

  const BlogSkeleton = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array(6).fill(0).map((_, i) => (
        <div key={i} className="glass-card rounded-xl overflow-hidden">
          <Skeleton className="w-full h-48" />
          <div className="p-6">
            <Skeleton className="h-4 w-20 mb-3" />
            <Skeleton className="h-6 w-full mb-3" />
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen pt-16" data-testid="blog-page">
      {/* Hero Section */}
      <section className="py-20 bg-secondary" data-testid="blog-hero-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6">
              XPR Media <span className="text-primary">Blog</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay ahead of the digital curve with insights, tips, and trends from our team of experts. 
              Your source for actionable marketing strategies and industry knowledge.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input border-border"
                data-testid="blog-search-input"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[200px] bg-input border-border" data-testid="blog-category-filter">
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

      {/* Blog Categories Overview */}
      <section className="py-20" data-testid="blog-categories-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold mb-4">
              Explore Our <span className="text-primary">Categories</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Dive deep into the topics that matter most for your digital growth
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="glass-card p-6 text-center hover-glow hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-background" />
              </div>
              <h3 className="text-xl font-playfair font-semibold mb-3">Digital Marketing</h3>
              <p className="text-muted-foreground">
                Latest trends, strategies, and tools to amplify your digital presence and drive results.
              </p>
            </div>

            <div className="glass-card p-6 text-center hover-glow hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-background" />
              </div>
              <h3 className="text-xl font-playfair font-semibold mb-3">Influencer Tips</h3>
              <p className="text-muted-foreground">
                Insights on building influence, creating partnerships, and monetizing your personal brand.
              </p>
            </div>

            <div className="glass-card p-6 text-center hover-glow hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-background" />
              </div>
              <h3 className="text-xl font-playfair font-semibold mb-3">Content Creation</h3>
              <p className="text-muted-foreground">
                Master the art of creating engaging content that converts and builds lasting connections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-secondary" data-testid="blog-posts-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading && <BlogSkeleton />}
          
          {error && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Failed to load blog posts. Please try again later.
              </p>
              <Button 
                onClick={() => window.location.reload()} 
                className="mt-4"
                data-testid="blog-retry-button"
              >
                Retry
              </Button>
            </div>
          )}

          {filteredPosts && filteredPosts.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No blog posts found matching your criteria.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="mt-4"
                data-testid="blog-clear-filters"
              >
                Clear Filters
              </Button>
            </div>
          )}

          {filteredPosts && filteredPosts.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  onReadMore={handleBlogReadMore}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20" data-testid="blog-newsletter-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-xl p-8 text-center">
            <h2 className="text-3xl font-playfair font-bold mb-4">
              Stay Updated with <span className="text-primary">Latest Insights</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Subscribe to our newsletter and get the latest digital marketing tips, 
              trends, and exclusive content delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-input border-border"
                data-testid="newsletter-email-input"
              />
              <Button 
                className="gradient-gold text-background font-semibold hover:scale-105 transition-transform duration-300"
                data-testid="newsletter-subscribe-button"
              >
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary" data-testid="blog-cta-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-playfair font-bold mb-6">
            Ready to Apply These <span className="text-primary">Strategies</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let our expert team help you implement these proven strategies for your business. 
            Get a free consultation to discuss your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.location.href = "/contact"}
              className="gradient-gold text-background font-semibold py-4 px-8 rounded-lg hover:scale-105 transition-transform duration-300"
              data-testid="blog-get-consultation"
            >
              Get Free Consultation
            </Button>
            <Button 
              onClick={() => window.location.href = "/services"}
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-background py-4 px-8 rounded-lg transition-colors duration-300"
              data-testid="blog-view-services"
            >
              View Our Services
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
