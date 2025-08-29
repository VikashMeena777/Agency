import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      data-testid="hero-section"
    >
      {/* Premium office space background with overlay */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      <div
        className="absolute inset-0 parallax-bg"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
        }}
      ></div>

      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 animate-fade-in" data-testid="hero-headline">
          Your Complete Path to{" "}
          <span className="text-primary">Online Success</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-slide-up max-w-2xl mx-auto" data-testid="hero-subheadline">
          Premium digital services & products to grow your brand with
          cutting-edge AI-powered solutions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
          <Link href="/contact">
            <Button
              className="gradient-gold text-background font-semibold py-4 px-8 rounded-lg hover:scale-105 transition-transform duration-300"
              data-testid="cta-start-growing"
            >
              Start Growing Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/services">
            <Button
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-background py-4 px-8 rounded-lg transition-colors duration-300"
              data-testid="cta-explore-services"
            >
              Explore Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
