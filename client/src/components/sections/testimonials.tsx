import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Testimonial } from "@shared/schema";

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="w-full flex-shrink-0" data-testid={`testimonial-${testimonial.id}`}>
      <Card className="glass-card rounded-xl p-8 text-center max-w-4xl mx-auto">
        <CardContent className="pt-6">
          <div className="flex justify-center mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-primary fill-primary" />
            ))}
          </div>
          <blockquote className="text-xl text-muted-foreground mb-6 italic" data-testid={`testimonial-content-${testimonial.id}`}>
            "{testimonial.content}"
          </blockquote>
          <div className="flex items-center justify-center space-x-4">
            {testimonial.image && (
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover"
                data-testid={`testimonial-image-${testimonial.id}`}
              />
            )}
            <div>
              <h4 className="text-lg font-semibold" data-testid={`testimonial-name-${testimonial.id}`}>
                {testimonial.name}
              </h4>
              <p className="text-primary" data-testid={`testimonial-company-${testimonial.id}`}>
                {testimonial.company}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const TestimonialsSkeleton = () => {
  return (
    <div className="w-full">
      <Card className="glass-card rounded-xl p-8 text-center max-w-4xl mx-auto">
        <CardContent className="pt-6">
          <div className="flex justify-center mb-4 space-x-1">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="w-5 h-5 rounded" />
            ))}
          </div>
          <Skeleton className="h-24 w-full mb-6" />
          <div className="flex items-center justify-center space-x-4">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const {
    data: testimonials,
    isLoading,
    error,
  } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const totalSlides = testimonials?.length || 0;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-advance carousel
  useEffect(() => {
    if (totalSlides > 0) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [totalSlides]);

  if (isLoading) {
    return (
      <section className="py-20 bg-secondary" data-testid="testimonials-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold mb-4">
              What Our <span className="text-primary">Clients Say</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Success stories from businesses we've helped grow
            </p>
          </div>
          <TestimonialsSkeleton />
        </div>
      </section>
    );
  }

  if (error || !testimonials || testimonials.length === 0) {
    return (
      <section className="py-20 bg-secondary" data-testid="testimonials-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold mb-4">
              What Our <span className="text-primary">Clients Say</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Success stories from businesses we've helped grow
            </p>
          </div>
          <div className="text-center text-muted-foreground">
            <p>No testimonials available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-secondary" data-testid="testimonials-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-playfair font-bold mb-4">
            What Our <span className="text-primary">Clients Say</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Success stories from businesses we've helped grow
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="overflow-hidden" data-testid="testimonials-carousel">
            <div
              className="flex transition-transform duration-500"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                />
              ))}
            </div>
          </div>

          {/* Carousel Controls */}
          {totalSlides > 1 && (
            <>
              <Button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 gradient-gold text-background w-12 h-12 rounded-full p-0"
                size="icon"
                data-testid="testimonials-prev-button"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 gradient-gold text-background w-12 h-12 rounded-full p-0"
                size="icon"
                data-testid="testimonials-next-button"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              {/* Carousel Indicators */}
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide ? "bg-primary" : "bg-muted"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                    data-testid={`testimonial-indicator-${index}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
