import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  Zap, 
  Award, 
  Headphones, 
  Clock, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Users,
  Shield,
  Target,
  Lightbulb
} from "lucide-react";

const WhyChooseUs = () => {
  const advantages = [
    {
      icon: Star,
      title: "Affordable + Premium Quality",
      description: "High-end results at competitive prices, making premium services accessible to all businesses.",
      details: [
        "Professional-grade deliverables",
        "Competitive pricing structure",
        "No hidden fees or extra costs",
        "Value-driven packages"
      ]
    },
    {
      icon: Zap,
      title: "AI-Powered Services",
      description: "Cutting-edge AI technology integrated into our workflows for faster, smarter results.",
      details: [
        "Advanced automation tools",
        "Enhanced content optimization",
        "Predictive analytics",
        "Efficiency-driven processes"
      ]
    },
    {
      icon: Award,
      title: "Full-Service Agency",
      description: "Complete digital solutions under one roof - from strategy to execution and optimization.",
      details: [
        "End-to-end project management",
        "Integrated service offerings",
        "Seamless workflow coordination",
        "Holistic brand development"
      ]
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock assistance to ensure your projects stay on track and exceed expectations.",
      details: [
        "Dedicated account managers",
        "Multiple support channels",
        "Quick response times",
        "Proactive communication"
      ]
    },
    {
      icon: Clock,
      title: "Fast Delivery",
      description: "Quick turnaround times without compromising quality, keeping your campaigns on schedule.",
      details: [
        "Streamlined workflows",
        "Priority rush options",
        "Milestone-based delivery",
        "Real-time progress updates"
      ]
    },
    {
      icon: TrendingUp,
      title: "Proven Results",
      description: "Data-driven strategies that deliver measurable growth and exceptional ROI for our clients.",
      details: [
        "Performance tracking",
        "ROI optimization",
        "Success metrics reporting",
        "Continuous improvement"
      ]
    }
  ];

  const differentiators = [
    {
      icon: Users,
      title: "Client-Centric Approach",
      description: "Every strategy is tailored to your unique business goals and challenges."
    },
    {
      icon: Shield,
      title: "Transparent Process",
      description: "Clear communication, honest reporting, and no surprises along the way."
    },
    {
      icon: Target,
      title: "Results-Focused",
      description: "We measure success by your success - every campaign is optimized for maximum impact."
    },
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "Always staying ahead of trends with cutting-edge strategies and technologies."
    }
  ];

  return (
    <div className="min-h-screen pt-16" data-testid="why-choose-us-page">
      {/* Hero Section */}
      <section className="py-20 bg-secondary" data-testid="why-choose-us-hero">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6">
              Why Choose <span className="text-primary">XPR Media</span>?
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the competitive advantages that set us apart in the digital marketing landscape 
              and why hundreds of businesses trust us with their growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Premium office space showcasing professionalism"
                className="rounded-xl shadow-2xl hover-glow transition-all duration-300"
                data-testid="why-choose-us-hero-image"
              />
            </div>
            <div>
              <h2 className="text-3xl font-playfair font-bold mb-6">
                The XPR Difference
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                In a crowded marketplace of digital agencies, we stand out by combining 
                premium quality with accessible pricing, cutting-edge technology with 
                human expertise, and proven strategies with innovative approaches.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">98%</div>
                  <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">250%</div>
                  <div className="text-sm text-muted-foreground">Average ROI Increase</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-sm text-muted-foreground">Support Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Advantages */}
      <section className="py-20" data-testid="core-advantages-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold mb-4">
              Our Core <span className="text-primary">Advantages</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Six key differentiators that make XPR Media the smart choice for your digital growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <Card 
                key={index} 
                className="glass-card p-6 hover-glow hover:scale-105 transition-all duration-300"
                data-testid={`advantage-card-${index}`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 gradient-gold rounded-full flex items-center justify-center mr-4">
                      <advantage.icon className="h-6 w-6 text-background" />
                    </div>
                    <h3 className="text-xl font-playfair font-semibold">
                      {advantage.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {advantage.description}
                  </p>
                  <div className="space-y-2">
                    {advantage.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-20 bg-secondary" data-testid="differentiators-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold mb-4">
              What Sets Us <span className="text-primary">Apart</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Beyond our core services, these principles guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {differentiators.map((item, index) => (
              <div 
                key={index} 
                className="flex items-start space-x-4 p-6 glass-card rounded-xl hover-glow transition-all duration-300"
                data-testid={`differentiator-${index}`}
              >
                <div className="w-12 h-12 gradient-gold rounded-full flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-6 w-6 text-background" />
                </div>
                <div>
                  <h3 className="text-xl font-playfair font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20" data-testid="process-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold mb-4">
              Our Proven <span className="text-primary">Process</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              A systematic approach that ensures consistent, high-quality results
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 gradient-gold rounded-full flex items-center justify-center mx-auto mb-4 relative">
                <span className="text-2xl font-bold text-background">1</span>
                <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-0.5 bg-primary hidden md:block"></div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Discovery</h3>
              <p className="text-muted-foreground text-sm">
                Deep dive into your business, goals, and target audience to create a custom strategy.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 gradient-gold rounded-full flex items-center justify-center mx-auto mb-4 relative">
                <span className="text-2xl font-bold text-background">2</span>
                <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-0.5 bg-primary hidden md:block"></div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Strategy</h3>
              <p className="text-muted-foreground text-sm">
                Develop a comprehensive plan with clear objectives, timelines, and success metrics.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 gradient-gold rounded-full flex items-center justify-center mx-auto mb-4 relative">
                <span className="text-2xl font-bold text-background">3</span>
                <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-0.5 bg-primary hidden md:block"></div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Execution</h3>
              <p className="text-muted-foreground text-sm">
                Implement the strategy with precision, using our AI-powered tools and expert team.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-background">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Optimization</h3>
              <p className="text-muted-foreground text-sm">
                Continuously monitor, analyze, and optimize for maximum performance and ROI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-secondary" data-testid="social-proof-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold mb-4">
              Trusted by <span className="text-primary">Industry Leaders</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Join the growing list of successful businesses that have chosen XPR Media
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-lg font-semibold mb-2">Projects Completed</div>
              <p className="text-muted-foreground text-sm">
                Successfully delivered across various industries and business sizes
              </p>
            </div>
            
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-lg font-semibold mb-2">Client Retention Rate</div>
              <p className="text-muted-foreground text-sm">
                Our clients stay with us because we deliver consistent, exceptional results
              </p>
            </div>
            
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">250%</div>
              <div className="text-lg font-semibold mb-2">Average ROI Increase</div>
              <p className="text-muted-foreground text-sm">
                Measurable growth that directly impacts your bottom line
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" data-testid="why-choose-us-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-playfair font-bold mb-6">
            Ready to Experience the <span className="text-primary">XPR Advantage</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join hundreds of successful businesses who have transformed their digital presence with our help. 
            Let's discuss how we can accelerate your growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button 
                className="gradient-gold text-background font-semibold py-4 px-8 rounded-lg hover:scale-105 transition-transform duration-300"
                data-testid="why-choose-us-get-started"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/services">
              <Button 
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-background py-4 px-8 rounded-lg transition-colors duration-300"
                data-testid="why-choose-us-view-services"
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

export default WhyChooseUs;
