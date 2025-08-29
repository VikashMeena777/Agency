import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import WhatsAppWidget from "@/components/ui/whatsapp-widget";
import Home from "@/pages/home";
import About from "@/pages/about";
import Services from "@/pages/services";
import Products from "@/pages/products";
import WhyChooseUs from "@/pages/why-choose-us";
import Blog from "@/pages/blog";
import Contact from "@/pages/contact";
import Checkout from "@/pages/checkout";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/services" component={Services} />
        <Route path="/products" component={Products} />
        <Route path="/why-choose-us" component={WhyChooseUs} />
        <Route path="/blog" component={Blog} />
        <Route path="/contact" component={Contact} />
        <Route path="/checkout/:productId?" component={Checkout} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
