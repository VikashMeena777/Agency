import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { 
  Target, 
  Eye, 
  Award, 
  Users, 
  TrendingUp, 
  ArrowRight,
  CheckCircle 
} from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen pt-16" data-testid="about-page">
      {/* Hero Section */}
      <section className="py-20 bg-secondary" data-testid="about-hero-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6">
              About <span className="text-primary">XPR Media</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're a full-service digital agency passionate about transforming brands 
              through innovative strategies, cutting-edge technology, and exceptional creativity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="XPR Media team working together"
                className="rounded-xl shadow-2xl hover-glow transition-all duration-300"
                data-testid="about-team-main-image"
              />
            </div>
            <div>
              <h2 className="text-3xl font-playfair font-bold mb-6">
                Our Story
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Founded with a vision to democratize premium digital services, XPR Media 
                bridges the gap between high-quality results and affordable pricing. We 
                believe every business, regardless of size, deserves access to top-tier 
                digital marketing solutions.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Our team combines years of industry experience with the latest AI-powered 
                tools to deliver results that exceed expectations while maintaining the 
                personal touch that sets us apart.
              </p>
              <Link href="/contact">
                <Button 
                  className="gradient-gold text-background font-semibold py-3 px-6 rounded-lg hover:scale-105 transition-transform duration-300"
                  data-testid="about-contact-us"
                >
                  Work With Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20" data-testid="mission-vision-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <Card className="glass-card p-8 hover-glow hover:scale-105 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 gradient-gold rounded-full flex items-center justify-center mr-4">
                    <Target className="h-6 w-6 text-background" />
                  </div>
                  <h2 className="text-3xl font-playfair font-bold">Our Mission</h2>
                </div>
                <p className="text-lg text-muted-foreground mb-6">
                  To empower businesses of all sizes with premium digital marketing solutions 
                  that drive real growth, combining cutting-edge AI technology with human 
                  creativity to deliver exceptional results at accessible prices.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span>Democratize premium digital services</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span>Deliver measurable business growth</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span>Foster long-term partnerships</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="glass-card p-8 hover-glow hover:scale-105 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 gradient-gold rounded-full flex items-center justify-center mr-4">
                    <Eye className="h-6 w-6 text-background" />
                  </div>
                  <h2 className="text-3xl font-playfair font-bold">Our Vision</h2>
                </div>
                <p className="text-lg text-muted-foreground mb-6">
                  To become the leading digital agency that seamlessly blends AI innovation 
                  with human expertise, setting new standards for quality, affordability, 
                  and client success in the digital marketing industry.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span>Pioneer AI-human collaboration</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span>Set industry quality standards</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span>Lead digital transformation</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* The XPR Advantage Section */}
      <section className="py-20 bg-secondary" data-testid="xpr-advantage-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold mb-4">
              The <span className="text-primary">XPR Advantage</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              What makes us different in the crowded digital agency landscape
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-card p-6 text-center hover-glow hover:scale-105 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="w-16 h-16 gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-background" />
                </div>
                <h3 className="text-xl font-playfair font-semibold mb-3">
                  Premium Quality at Scale
                </h3>
                <p className="text-muted-foreground">
                  Our AI-enhanced workflows allow us to maintain premium quality standards 
                  while serving clients at competitive prices, making excellence accessible.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card p-6 text-center hover-glow hover:scale-105 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="w-16 h-16 gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-background" />
                </div>
                <h3 className="text-xl font-playfair font-semibold mb-3">
                  Dedicated Partnership
                </h3>
                <p className="text-muted-foreground">
                  We don't just deliver services; we become an extension of your team, 
                  understanding your goals and growing alongside your business.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card p-6 text-center hover-glow hover:scale-105 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="w-16 h-16 gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-background" />
                </div>
                <h3 className="text-xl font-playfair font-semibold mb-3">
                  Results-Driven Approach
                </h3>
                <p className="text-muted-foreground">
                  Every strategy is backed by data, every campaign is optimized for ROI, 
                  and every client relationship is built on measurable success.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20" data-testid="values-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold mb-4">
              Our <span className="text-primary">Core Values</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-playfair font-semibold mb-3 text-primary">
                Innovation
              </h3>
              <p className="text-muted-foreground">
                Continuously exploring new technologies and methodologies to stay ahead 
                of industry trends and deliver cutting-edge solutions.
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-playfair font-semibold mb-3 text-primary">
                Transparency
              </h3>
              <p className="text-muted-foreground">
                Open communication, honest reporting, and clear processes that keep our 
                clients informed and confident in our partnership.
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-playfair font-semibold mb-3 text-primary">
                Excellence
              </h3>
              <p className="text-muted-foreground">
                Unwavering commitment to quality in every project, ensuring that our 
                work exceeds expectations and drives real business impact.
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-playfair font-semibold mb-3 text-primary">
                Growth
              </h3>
              <p className="text-muted-foreground">
                Focused on sustainable growth for our clients, our team, and our industry 
                through continuous learning and improvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary" data-testid="about-cta-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-playfair font-bold mb-6">
            Ready to Experience the <span className="text-primary">XPR Difference</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join hundreds of satisfied clients who have transformed their digital presence with our help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button 
                className="gradient-gold text-background font-semibold py-4 px-8 rounded-lg hover:scale-105 transition-transform duration-300"
                data-testid="about-get-started"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/services">
              <Button 
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-background py-4 px-8 rounded-lg transition-colors duration-300"
                data-testid="about-view-services"
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

export default About;
