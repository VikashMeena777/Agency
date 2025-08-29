import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSchema } from "@shared/schema";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  Calendar,
  MessageCircle,
  Instagram,
  Linkedin,
  Youtube,
  Facebook
} from "lucide-react";
import { z } from "zod";

const contactFormSchema = insertContactSchema.extend({
  serviceInterest: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      serviceInterest: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
      setIsSubmitting(false);
    },
    onError: (error: any) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    contactMutation.mutate(data);
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "1234567890";
    const message = "Hi! I'm interested in your digital services. Can you help me?";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleCalendlyClick = () => {
    // In a real implementation, this would open Calendly booking widget
    toast({
      title: "Booking System",
      description: "Calendly integration would open here for scheduling.",
    });
  };

  return (
    <div className="min-h-screen pt-16" data-testid="contact-page">
      {/* Hero Section */}
      <section className="py-20 bg-secondary" data-testid="contact-hero-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6">
              Let's Start Your <span className="text-primary">Success Story</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to transform your digital presence? Get in touch with our experts and 
              discover how we can accelerate your business growth.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20" data-testid="contact-form-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-2xl font-playfair">Get a Free Consultation</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your first name" 
                                {...field}
                                className="bg-input border-border"
                                data-testid="contact-first-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your last name" 
                                {...field}
                                className="bg-input border-border"
                                data-testid="contact-last-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              type="email"
                              placeholder="your@email.com" 
                              {...field}
                              className="bg-input border-border"
                              data-testid="contact-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="serviceInterest"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Interest</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-input border-border" data-testid="contact-service-interest">
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="video-editing">Video Editing</SelectItem>
                              <SelectItem value="content-creation">Content Creation</SelectItem>
                              <SelectItem value="influencer-marketing">Influencer Marketing</SelectItem>
                              <SelectItem value="ugc-creation">UGC Creation</SelectItem>
                              <SelectItem value="thumbnail-design">Thumbnail Design</SelectItem>
                              <SelectItem value="digital-courses">Digital Courses</SelectItem>
                              <SelectItem value="full-agency-package">Full Agency Package</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Details</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your project, goals, and how we can help..."
                              className="bg-input border-border min-h-[120px]"
                              {...field}
                              data-testid="contact-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full gradient-gold text-background font-semibold py-4 hover:scale-105 transition-transform duration-300"
                      disabled={isSubmitting}
                      data-testid="contact-submit-button"
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Get Free Consultation
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Info Card */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-2xl font-playfair">Contact Information</CardTitle>
                  <p className="text-muted-foreground">
                    Get in touch through any of these channels
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 gradient-gold rounded-full flex items-center justify-center">
                      <Mail className="h-6 w-6 text-background" />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-muted-foreground">hello@xprmedia.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 gradient-gold rounded-full flex items-center justify-center">
                      <Phone className="h-6 w-6 text-background" />
                    </div>
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 gradient-gold rounded-full flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-background" />
                    </div>
                    <div>
                      <p className="font-semibold">Location</p>
                      <p className="text-muted-foreground">New York, NY 10001</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 gradient-gold rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-background" />
                    </div>
                    <div>
                      <p className="font-semibold">Business Hours</p>
                      <p className="text-muted-foreground">24/7 Support Available</p>
                    </div>
                  </div>

                  {/* Social Media Links */}
                  <div className="pt-4 border-t border-border">
                    <p className="font-semibold mb-4">Follow Us</p>
                    <div className="flex space-x-4">
                      <a 
                        href="#" 
                        className="w-10 h-10 gradient-gold rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                        data-testid="contact-social-instagram"
                      >
                        <Instagram className="h-5 w-5 text-background" />
                      </a>
                      <a 
                        href="#" 
                        className="w-10 h-10 gradient-gold rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                        data-testid="contact-social-linkedin"
                      >
                        <Linkedin className="h-5 w-5 text-background" />
                      </a>
                      <a 
                        href="#" 
                        className="w-10 h-10 gradient-gold rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                        data-testid="contact-social-youtube"
                      >
                        <Youtube className="h-5 w-5 text-background" />
                      </a>
                      <a 
                        href="#" 
                        className="w-10 h-10 gradient-gold rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                        data-testid="contact-social-facebook"
                      >
                        <Facebook className="h-5 w-5 text-background" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-2xl font-playfair">Quick Actions</CardTitle>
                  <p className="text-muted-foreground">
                    Choose the fastest way to connect with us
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    onClick={handleCalendlyClick}
                    className="w-full gradient-gold text-background font-semibold py-3 hover:scale-105 transition-transform duration-300"
                    data-testid="contact-schedule-call"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Schedule Free Strategy Call
                  </Button>
                  
                  <Button 
                    onClick={handleWhatsAppClick}
                    variant="outline"
                    className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-background py-3 transition-colors duration-300"
                    data-testid="contact-whatsapp"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Chat on WhatsApp
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-secondary" data-testid="contact-faq-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold mb-4">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Quick answers to common questions about our services
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">How quickly can you start my project?</h3>
                <p className="text-muted-foreground">
                  Most projects can begin within 24-48 hours after initial consultation and agreement on scope.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Do you offer custom packages?</h3>
                <p className="text-muted-foreground">
                  Yes! We create tailored solutions based on your specific needs, budget, and goals.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">What's included in the free consultation?</h3>
                <p className="text-muted-foreground">
                  A comprehensive review of your current digital presence, goal setting, and strategic recommendations.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Do you work with small businesses?</h3>
                <p className="text-muted-foreground">
                  Absolutely! We provide premium services at affordable prices for businesses of all sizes.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">What if I'm not satisfied with the results?</h3>
                <p className="text-muted-foreground">
                  We offer unlimited revisions and work with you until you're completely satisfied with the outcome.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">How do you measure success?</h3>
                <p className="text-muted-foreground">
                  We use specific KPIs relevant to your goals, providing detailed reports and analytics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
