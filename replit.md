# Replit.md

## Overview

This is a full-stack product catalog web application for GLUTO INTERNATIONAL LIMITED, built with a modern TypeScript stack. The application provides a public-facing catalog interface for browsing agricultural products and an admin interface for managing products and categories. The system is designed as a monorepo with shared types and schemas between frontend and backend.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: Zustand for cart state, TanStack Query for server state
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **Authentication**: Replit Auth with OpenID Connect
- **Session Management**: Express sessions with PostgreSQL storage
- **Email**: Nodemailer for order notifications

### Database Design
The application uses Drizzle ORM with PostgreSQL, featuring:
- **Users**: Stores user authentication data for admin access
- **Categories**: Hierarchical product categories with parent-child relationships
- **Products**: Complete product information including pricing, availability, and images
- **Orders**: Customer order data with JSON fields for flexible order details
- **Sessions**: Server-side session storage for authentication

## Key Components

### Public Interface
- **Home Page**: Marketing landing page with company information and CTAs
- **Catalog**: Product browsing with category filtering, search, and pagination
- **Product Cards**: Display product info, availability meter, and pricing
- **Shopping Cart**: Persistent cart using local storage with Zustand
- **Contact Page**: Company contact information and inquiry forms
- **Information Page**: Detailed company information with tabbed content

### Admin Interface
- **Authentication**: Replit Auth integration for admin access
- **Product Management**: CRUD operations for products with image uploads
- **Category Management**: Hierarchical category creation and management
- **Order Management**: View and process customer orders

### Shared Components
- **UI Components**: Comprehensive component library using Radix UI
- **Theme System**: Light/dark mode with CSS variables
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## Data Flow

1. **Product Catalog Flow**:
   - Categories loaded from `/api/categories`
   - Products fetched with filtering via `/api/products`
   - Shopping cart managed locally with Zustand
   - Orders submitted via `/api/orders` with email notifications

2. **Admin Flow**:
   - Authentication via Replit Auth OAuth flow
   - Protected routes check authentication status
   - CRUD operations for products and categories
   - Real-time updates using TanStack Query invalidation

3. **Authentication Flow**:
   - Public routes accessible without authentication
   - Admin routes protected by authentication middleware
   - Session management with PostgreSQL storage
   - User data synchronized with Replit Auth claims

## External Dependencies

### Core Infrastructure
- **Neon Database**: Serverless PostgreSQL hosting
- **Replit Auth**: OAuth authentication provider
- **Vercel**: Deployment platform (configured for production)

### Key Libraries
- **Drizzle ORM**: Type-safe database operations
- **TanStack Query**: Server state management with caching
- **Radix UI**: Accessible component primitives
- **Zod**: Schema validation for forms and API
- **Date-fns**: Date manipulation utilities
- **Nodemailer**: Email sending functionality

### Development Tools
- **TypeScript**: Type safety across the entire stack
- **ESBuild**: Fast bundling for production server code
- **PostCSS**: CSS processing with Tailwind
- **Replit Plugins**: Development environment integration

## Deployment Strategy

### Development Environment
- Vite dev server with HMR for frontend development
- TSX for running TypeScript server code directly
- Replit-specific plugins for enhanced development experience
- Environment variables for database and auth configuration

### Production Build
- Vite builds optimized frontend bundle to `dist/public`
- ESBuild bundles server code to `dist/index.js`
- Single deployment artifact with both frontend and backend
- Environment variables for production database and auth

### Database Management
- Drizzle migrations stored in `./migrations`
- Schema definitions in `shared/schema.ts`
- Database push command for development: `npm run db:push`
- PostgreSQL connection via Neon serverless

## Changelog

```
Changelog:
- June 30, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```