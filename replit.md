# XPR Media Agency Website

## Overview

This is a premium, modern, and fully responsive website for XPR Media Agency, a full-service digital agency that provides promotions, video editing, content creation, influencer marketing, UGC, and reel creation services. The application is built as a full-stack React application with Express backend, featuring a marketplace-style design for services and products, integrated payment processing via Razorpay (for Indian market), and a comprehensive content management system.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React with TypeScript**: Modern React 18 application using functional components and hooks
- **Vite Build System**: Fast development and optimized production builds
- **Wouter Router**: Lightweight client-side routing for single-page application navigation
- **Shadcn/ui Components**: Premium UI component library built on Radix UI primitives with Tailwind CSS styling
- **TanStack Query**: Server state management for API data fetching, caching, and synchronization
- **React Hook Form**: Form management with Zod schema validation for type-safe form handling

### Backend Architecture
- **Express.js Server**: RESTful API server with TypeScript support
- **Storage Layer**: Abstract storage interface supporting multiple database backends
- **Route-based API Design**: Organized endpoints for services, products, blog posts, contacts, and testimonials
- **Middleware Stack**: Request logging, JSON parsing, error handling, and CORS support

### Database Design
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL dialect
- **Schema-driven Development**: Centralized schema definitions in shared folder for type consistency
- **Entity Structure**: Users, Services, Products, Blog Posts, Contacts, and Testimonials with proper relationships
- **Neon Database**: Cloud PostgreSQL hosting solution for scalable data storage

### Authentication & Payment
- **Razorpay Integration**: Full payment processing for digital products and services (Indian market)
- **Razorpay Checkout**: Client-side payment form handling with secure tokenization
- **Payment Verification**: Server-side payment verification using Razorpay webhooks and signatures

### Styling & UI System
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **CSS Custom Properties**: Theme-aware color system supporting dark mode
- **Typography System**: Playfair Display for headings, Montserrat for body text
- **Animation Framework**: CSS transitions and hover effects for premium user experience
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts

### Content Management
- **Blog System**: Full blog functionality with categories, publishing status, and rich content
- **Service Catalog**: Categorized services with pricing, features, and booking capabilities
- **Product Marketplace**: Digital products with secure checkout and delivery
- **Contact Management**: Form submissions with service-specific inquiries

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection for Neon cloud hosting
- **drizzle-orm & drizzle-kit**: Database ORM and migration toolkit
- **@tanstack/react-query**: Server state management and data fetching
- **react-hook-form & @hookform/resolvers**: Form handling with validation
- **zod**: Runtime type validation and schema definition

### UI & Styling
- **@radix-ui/***: Comprehensive set of accessible UI primitives (dialogs, dropdowns, forms, etc.)
- **tailwindcss**: CSS framework with PostCSS integration
- **class-variance-authority**: Component variant management
- **clsx & tailwind-merge**: Conditional CSS class utilities

### Payment Processing
- **razorpay**: Server-side Razorpay SDK for payment processing and order management
- **Razorpay Checkout**: Browser-based payment integration supporting UPI, cards, wallets, and net banking

### Development Tools
- **vite**: Build tool with React plugin and development server
- **typescript**: Type checking and development experience
- **tsx**: TypeScript execution for development server
- **esbuild**: Fast JavaScript bundler for production builds

### Additional Services
- **connect-pg-simple**: PostgreSQL session store for Express sessions
- **wouter**: Lightweight React router alternative
- **date-fns**: Date manipulation and formatting utilities
- **cmdk**: Command palette component for enhanced UX