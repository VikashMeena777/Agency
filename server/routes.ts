import type { Express } from "express";
import { createServer, type Server } from "http";
import Razorpay from "razorpay";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.warn('Razorpay keys not configured. Payment functionality will be disabled.');
}

const razorpay = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET 
  ? new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })
  : null;

export async function registerRoutes(app: Express): Promise<Server> {
  // Services routes
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching services: " + error.message });
    }
  });

  app.get("/api/services/:id", async (req, res) => {
    try {
      const service = await storage.getServiceById(req.params.id);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(service);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching service: " + error.message });
    }
  });

  // Products routes
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching products: " + error.message });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching product: " + error.message });
    }
  });

  // Blog routes
  app.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getPublishedBlogPosts();
      res.json(posts);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching blog posts: " + error.message });
    }
  });

  app.get("/api/blog/:id", async (req, res) => {
    try {
      const post = await storage.getBlogPostById(req.params.id);
      if (!post || !post.published) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching blog post: " + error.message });
    }
  });

  // Testimonials route
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getActiveTestimonials();
      res.json(testimonials);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching testimonials: " + error.message });
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json({ message: "Contact form submitted successfully", id: contact.id });
    } catch (error: any) {
      res.status(400).json({ message: "Error submitting contact form: " + error.message });
    }
  });

  // Razorpay order creation for payments
  app.post("/api/create-order", async (req, res) => {
    try {
      if (!razorpay) {
        return res.status(500).json({ message: "Payment service not configured" });
      }

      const { amount, productId } = req.body;
      
      // Verify product exists
      if (productId) {
        const product = await storage.getProductById(productId);
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }
        // Use product price if not specified
        const finalAmount = amount || product.price;
        
        const order = await razorpay.orders.create({
          amount: Math.round(finalAmount), // Amount in paisa (smallest currency unit)
          currency: "INR",
          notes: {
            productId: productId,
            productTitle: product.title
          },
        });
        
        res.json({ 
          orderId: order.id, 
          amount: order.amount,
          currency: order.currency,
          key: process.env.RAZORPAY_KEY_ID
        });
      } else {
        // Generic order
        const order = await razorpay.orders.create({
          amount: Math.round(amount), // Convert to paisa if needed
          currency: "INR",
        });
        
        res.json({ 
          orderId: order.id, 
          amount: order.amount,
          currency: order.currency,
          key: process.env.RAZORPAY_KEY_ID
        });
      }
    } catch (error: any) {
      res.status(500).json({ message: "Error creating order: " + error.message });
    }
  });

  // Verify Razorpay payment
  app.post("/api/verify-payment", async (req, res) => {
    try {
      if (!razorpay) {
        return res.status(500).json({ message: "Payment service not configured" });
      }

      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
      
      const crypto = require('crypto');
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');
      
      if (expectedSignature === razorpay_signature) {
        res.json({ success: true, message: "Payment verified successfully" });
      } else {
        res.status(400).json({ success: false, message: "Payment verification failed" });
      }
    } catch (error: any) {
      res.status(500).json({ message: "Error verifying payment: " + error.message });
    }
  });

  // Book service endpoint
  app.post("/api/book-service", async (req, res) => {
    try {
      const { serviceId, ...contactData } = req.body;
      
      // Verify service exists
      const service = await storage.getServiceById(serviceId);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }

      // Create contact with service information
      const validatedData = insertContactSchema.parse({
        ...contactData,
        serviceInterest: service.title,
        message: `Service booking request for: ${service.title}. ${contactData.message || ''}`
      });
      
      const contact = await storage.createContact(validatedData);
      res.json({ message: "Service booking request submitted successfully", id: contact.id });
    } catch (error: any) {
      res.status(400).json({ message: "Error submitting booking request: " + error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
