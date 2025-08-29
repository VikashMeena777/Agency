import { 
  type User, 
  type InsertUser,
  type Service,
  type InsertService,
  type Product,
  type InsertProduct,
  type BlogPost,
  type InsertBlogPost,
  type Contact,
  type InsertContact,
  type Testimonial,
  type InsertTestimonial
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserStripeInfo(id: string, customerId: string, subscriptionId: string): Promise<User>;

  // Services
  getAllServices(): Promise<Service[]>;
  getServiceById(id: string): Promise<Service | undefined>;
  getServicesByCategory(category: string): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;

  // Products
  getAllProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Blog Posts
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPostById(id: string): Promise<BlogPost | undefined>;
  getBlogPostsByCategory(category: string): Promise<BlogPost[]>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;

  // Contacts
  createContact(contact: InsertContact): Promise<Contact>;
  getAllContacts(): Promise<Contact[]>;

  // Testimonials
  getActiveTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private services: Map<string, Service>;
  private products: Map<string, Product>;
  private blogPosts: Map<string, BlogPost>;
  private contacts: Map<string, Contact>;
  private testimonials: Map<string, Testimonial>;

  constructor() {
    this.users = new Map();
    this.services = new Map();
    this.products = new Map();
    this.blogPosts = new Map();
    this.contacts = new Map();
    this.testimonials = new Map();

    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample Services
    const sampleServices: Service[] = [
      {
        id: "service-1",
        title: "Video Editing",
        description: "Professional video editing with AI-enhanced workflows for stunning results.",
        price: 9900, // $99.00
        category: "Video Production",
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        features: ["Professional editing", "AI-enhanced workflows", "Quick turnaround", "Unlimited revisions"],
        active: true,
        createdAt: new Date(),
      },
      {
        id: "service-2",
        title: "Content Creation",
        description: "Engaging content that converts, from social media posts to comprehensive campaigns.",
        price: 14900, // $149.00
        category: "Content Marketing",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        features: ["Social media content", "Campaign strategies", "Brand alignment", "Performance tracking"],
        active: true,
        createdAt: new Date(),
      },
      {
        id: "service-3",
        title: "Influencer Marketing",
        description: "Strategic influencer partnerships that amplify your brand reach and engagement.",
        price: 29900, // $299.00
        category: "Marketing",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        features: ["Influencer matching", "Campaign management", "Performance analytics", "ROI tracking"],
        active: true,
        createdAt: new Date(),
      },
    ];

    // Sample Products
    const sampleProducts: Product[] = [
      {
        id: "product-1",
        title: "Complete Digital Marketing Course",
        description: "Master social media, SEO, and paid advertising with our comprehensive course.",
        price: 19700, // $197.00
        category: "Education",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        features: ["12+ hours of content", "SEO strategies", "Social media mastery", "Paid advertising", "Lifetime access"],
        downloadUrl: "/downloads/digital-marketing-course.zip",
        active: true,
        createdAt: new Date(),
      },
      {
        id: "product-2",
        title: "Content Creation Masterclass",
        description: "Learn to create viral content and build engaged communities across platforms.",
        price: 14700, // $147.00
        category: "Education",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        features: ["Viral content strategies", "Platform optimization", "Engagement techniques", "Community building"],
        downloadUrl: "/downloads/content-creation-masterclass.zip",
        active: true,
        createdAt: new Date(),
      },
      {
        id: "product-3",
        title: "Influencer Growth Bundle",
        description: "Complete toolkit for growing your influence and monetizing your personal brand.",
        price: 9700, // $97.00
        category: "Tools",
        image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        features: ["Growth strategies", "Monetization guide", "Brand partnerships", "Analytics tools"],
        downloadUrl: "/downloads/influencer-growth-bundle.zip",
        active: true,
        createdAt: new Date(),
      },
    ];

    // Sample Blog Posts
    const sampleBlogPosts: BlogPost[] = [
      {
        id: "blog-1",
        title: "10 AI Tools Revolutionizing Content Creation in 2024",
        content: "Discover the latest AI-powered tools that are transforming how businesses create and optimize content...",
        excerpt: "Discover the latest AI-powered tools that are transforming how businesses create and optimize content...",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        category: "Digital Marketing",
        author: "XPR Media Team",
        published: true,
        createdAt: new Date(),
      },
      {
        id: "blog-2",
        title: "Building Authentic Partnerships: A Guide for Brands",
        content: "Learn how to identify and collaborate with influencers who align with your brand values...",
        excerpt: "Learn how to identify and collaborate with influencers who align with your brand values...",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        category: "Influencer Tips",
        author: "Marketing Expert",
        published: true,
        createdAt: new Date(),
      },
      {
        id: "blog-3",
        title: "The Psychology Behind Viral Video Content",
        content: "Understand the psychological triggers that make videos go viral and how to apply them...",
        excerpt: "Understand the psychological triggers that make videos go viral and how to apply them...",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        category: "Content Creation",
        author: "Video Specialist",
        published: true,
        createdAt: new Date(),
      },
    ];

    // Sample Testimonials
    const sampleTestimonials: Testimonial[] = [
      {
        id: "testimonial-1",
        name: "Sarah Johnson",
        company: "CEO, TechStart Solutions",
        content: "XPR Media transformed our social media presence completely. Their AI-powered content strategy increased our engagement by 300% in just 3 months. Absolutely incredible results!",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108755-2616b86e6d52?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
        active: true,
        createdAt: new Date(),
      },
      {
        id: "testimonial-2",
        name: "Marcus Chen",
        company: "Influencer & Content Creator",
        content: "The video editing quality is outstanding. XPR Media's team delivered professional-grade content that helped us secure major brand partnerships. Their attention to detail is unmatched.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
        active: true,
        createdAt: new Date(),
      },
      {
        id: "testimonial-3",
        name: "Amanda Rodriguez",
        company: "Founder, Lifestyle Brands Co.",
        content: "Working with XPR Media was a game-changer for our e-commerce business. Their comprehensive approach and premium quality services increased our sales by 250% in 6 months.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
        active: true,
        createdAt: new Date(),
      },
    ];

    // Store sample data
    sampleServices.forEach(service => this.services.set(service.id, service));
    sampleProducts.forEach(product => this.products.set(product.id, product));
    sampleBlogPosts.forEach(post => this.blogPosts.set(post.id, post));
    sampleTestimonials.forEach(testimonial => this.testimonials.set(testimonial.id, testimonial));
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserStripeInfo(id: string, customerId: string, subscriptionId: string): Promise<User> {
    const user = this.users.get(id);
    if (!user) throw new Error("User not found");
    
    const updatedUser = { 
      ...user, 
      stripeCustomerId: customerId, 
      stripeSubscriptionId: subscriptionId 
    };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Service methods
  async getAllServices(): Promise<Service[]> {
    return Array.from(this.services.values()).filter(service => service.active);
  }

  async getServiceById(id: string): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async getServicesByCategory(category: string): Promise<Service[]> {
    return Array.from(this.services.values()).filter(
      service => service.category === category && service.active
    );
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = randomUUID();
    const service: Service = { 
      ...insertService, 
      id,
      features: insertService.features || null,
      active: insertService.active ?? true,
      createdAt: new Date()
    };
    this.services.set(id, service);
    return service;
  }

  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.active);
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.category === category && product.active
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { 
      ...insertProduct, 
      id,
      features: insertProduct.features || null,
      downloadUrl: insertProduct.downloadUrl || null,
      active: insertProduct.active ?? true,
      createdAt: new Date()
    };
    this.products.set(id, product);
    return product;
  }

  // Blog Post methods
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }

  async getBlogPostById(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).filter(
      post => post.category === category
    );
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).filter(post => post.published);
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const blogPost: BlogPost = { 
      ...insertBlogPost, 
      id,
      published: insertBlogPost.published ?? false,
      createdAt: new Date()
    };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }

  // Contact methods
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id,
      serviceInterest: insertContact.serviceInterest || null,
      createdAt: new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  // Testimonial methods
  async getActiveTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).filter(testimonial => testimonial.active);
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const testimonial: Testimonial = { 
      ...insertTestimonial, 
      id,
      image: insertTestimonial.image || null,
      active: insertTestimonial.active ?? true,
      createdAt: new Date()
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
}

export const storage = new MemStorage();
