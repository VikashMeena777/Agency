import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Navigation = () => {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/products", label: "Products" },
    { href: "/why-choose-us", label: "Why Choose Us" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  const NavLinks = ({ mobile = false }) => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`${
            location === item.href
              ? "text-primary"
              : "text-foreground hover:text-primary"
          } transition-colors duration-300 ${
            mobile ? "block py-2 text-lg" : ""
          }`}
          onClick={() => mobile && setIsOpen(false)}
          data-testid={`nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
        >
          {item.label}
        </Link>
      ))}
    </>
  );

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-border" data-testid="main-navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" data-testid="logo-link">
              <h1 className="text-2xl font-playfair font-bold text-primary">
                XPR Media
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <NavLinks />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="mobile-menu-trigger">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-card">
                <div className="mt-6">
                  <h2 className="text-lg font-playfair font-bold text-primary mb-4">
                    XPR Media
                  </h2>
                  <nav className="flex flex-col space-y-2">
                    <NavLinks mobile />
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
