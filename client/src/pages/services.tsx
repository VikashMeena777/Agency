import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ServiceCard from "@/components/cards/service-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Filter } from "lucide-react";
import type { Service } from "@shared/schema";

const Services = () => {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const handleServiceBook = (serviceId: string) => {
    setLocation(`/contact?service=${serviceId}`);
  };

  // Filter services based on search and category
  const filteredServices = services?.filter((service) => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = services ? Array.from(new Set(services.map(service => service.category))) : [];

  const ServicesSkeleton = () => (
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
    <div className="min-h-screen pt-16" data-testid="services-page">
      {/* Hero Section */}
      <section className="py-20 bg-secondary" data-testid="services-hero-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6">
              Our Premium <span className="text-primary">Services</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive digital solutions designed to elevate your brand and drive 
              measurable growth. From content creation to influencer marketing, we've got you covered.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input border-border"
                data-testid="services-search-input"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[200px] bg-input border-border" data-testid="services-category-filter">
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

      {/* Services Grid */}
      <section className="py-20" data-testid="services-grid-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading && <ServicesSkeleton />}
          
          {error && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Failed to load services. Please try again later.
              </p>
              <Button 
                onClick={() => window.location.reload()} 
                className="mt-4"
                data-testid="services-retry-button"
              >
                Retry
              </Button>
            </div>
          )}

          {filteredServices && filteredServices.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No services found matching your criteria.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="mt-4"
                data-testid="services-clear-filters"
              >
                Clear Filters
              </Button>
            </div>
          )}

          {filteredServices && filteredServices.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onBook={handleServiceBook}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Additional Services Info */}
      <section className="py-20 bg-secondary" data-testid="services-info-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-2xl font-playfair font-bold mb-4 text-primary">
                Custom Solutions
              </h3>
              <p className="text-muted-foreground">
                Don't see exactly what you need? We create custom packages tailored 
                to your specific requirements and budget.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-playfair font-bold mb-4 text-primary">
                Quick Turnaround
              </h3>
              <p className="text-muted-foreground">
                Most services are delivered within 5-7 business days, with rush 
                options available for urgent projects.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-playfair font-bold mb-4 text-primary">
                Unlimited Revisions
              </h3>
              <p className="text-muted-foreground">
                We work with you until you're 100% satisfied. Your success is our 
                priority, and we stand behind our work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" data-testid="services-cta-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-playfair font-bold mb-6">
            Ready to Get <span className="text-primary">Started</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Book a free consultation to discuss your project requirements and get a custom quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => setLocation("/contact")}
              className="gradient-gold text-background font-semibold py-4 px-8 rounded-lg hover:scale-105 transition-transform duration-300"
              data-testid="services-book-consultation"
            >
              Book Free Consultation
            </Button>
            <Button 
              onClick={() => setLocation("/why-choose-us")}
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-background py-4 px-8 rounded-lg transition-colors duration-300"
              data-testid="services-why-choose-us"
            >
              Why Choose Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
