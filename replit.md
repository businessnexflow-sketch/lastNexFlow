# Overview

This is a premium conversion-focused website for selling custom n8n automation services in Georgia. The application combines a modern React frontend with an Express.js backend to provide a complete business solution for automation service offerings. The site features Georgian language content, a multi-step order wizard, and an admin dashboard for managing customer requests.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and Georgian fonts (FiraGO)
- **Animations**: Framer Motion for complex transitions and micro-interactions
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation

The frontend follows a component-based architecture with clear separation between pages, components, and utilities. Key design decisions include:
- Georgian language support as primary requirement with custom fonts
- Premium glass-card design aesthetic with gradients and micro-animations
- Responsive design with mobile-first approach
- Accessibility-focused component library usage

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Development**: Hot reload with Vite integration for full-stack development
- **API Design**: RESTful endpoints with proper error handling and logging
- **File Handling**: Multer for multi-part form uploads with file type validation
- **Storage**: Modular storage interface currently using in-memory implementation

The backend uses a clean separation of concerns:
- Route handlers for API endpoints
- Service layer for business logic
- Storage abstraction for data persistence
- Middleware for request logging and error handling

## Data Storage Solutions
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Database**: PostgreSQL with Neon serverless integration
- **Schema**: Type-safe database schema with enums for order status and automation types
- **Current Implementation**: In-memory storage for development, with database schema ready for production

The data layer includes:
- Order management with file attachments
- User authentication system (prepared)
- Structured order workflow with status tracking

## Authentication and Authorization
- **Prepared Infrastructure**: User schema and storage methods defined
- **Session Management**: Configured for future implementation
- **Admin Access**: Basic admin dashboard for order management

## External Service Integrations
- **Email Service**: SendGrid for transactional emails (order confirmations and notifications)
- **Communication**: Slack Web API for real-time order notifications to admin team
- **File Storage**: Local file system with multer (prepared for cloud storage migration)

The integration pattern uses environment variable configuration with graceful degradation when services are unavailable, ensuring the core application remains functional during development or when external services are down.