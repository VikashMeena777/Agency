import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black py-12 border-t border-border" data-testid="main-footer">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-playfair font-bold text-primary mb-4">
              XPR Media
            </h3>
            <p className="text-muted-foreground">
              Your complete path to online success through premium digital
              services and AI-powered solutions.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link
                  href="/services"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-video-editing"
                >
                  Video Editing
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-content-creation"
                >
                  Content Creation
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-influencer-marketing"
                >
                  Influencer Marketing
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-ugc-creation"
                >
                  UGC Creation
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-thumbnail-design"
                >
                  Thumbnail Design
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link
                  href="/products"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-digital-marketing-course"
                >
                  Digital Marketing Course
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-content-creation-bundle"
                >
                  Content Creation Bundle
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-influencer-growth-kit"
                >
                  Influencer Growth Kit
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-reels-templates"
                >
                  Reels Templates
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-about-us"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/why-choose-us"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-why-choose-us"
                >
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-blog"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-contact"
                >
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-privacy-policy"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-border pt-8">
          <div className="text-center text-muted-foreground mb-4 md:mb-0">
            <p>&copy; 2024 XPR Media Agency. All rights reserved.</p>
          </div>

          <div className="flex space-x-4">
            <a
              href="#"
              className="w-10 h-10 gradient-gold rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
              aria-label="Instagram"
              data-testid="social-link-instagram"
            >
              <Instagram className="h-5 w-5 text-background" />
            </a>
            <a
              href="#"
              className="w-10 h-10 gradient-gold rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
              aria-label="LinkedIn"
              data-testid="social-link-linkedin"
            >
              <Linkedin className="h-5 w-5 text-background" />
            </a>
            <a
              href="#"
              className="w-10 h-10 gradient-gold rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
              aria-label="YouTube"
              data-testid="social-link-youtube"
            >
              <Youtube className="h-5 w-5 text-background" />
            </a>
            <a
              href="#"
              className="w-10 h-10 gradient-gold rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
              aria-label="Facebook"
              data-testid="social-link-facebook"
            >
              <Facebook className="h-5 w-5 text-background" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
