# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ReferralPro is a referral management system built with Next.js, TypeScript, React, and Neon database. It allows users to create, track, and manage referrals with a modern web interface.

## Development Commands

### Build Commands
```bash
npm run build          # Build the application for production
npm run dev            # Start development server
npm run start          # Start production server
npm run type-check     # Run TypeScript type checking
```

### Testing
```bash
npm test               # Run tests (to be implemented)
```

### Linting and Code Quality
```bash
npm run lint           # Run ESLint
npm run type-check     # Run TypeScript type checking
```

### Development Server
```bash
npm run dev            # Start Next.js development server on http://localhost:3000
```

### Database
```bash
npx drizzle-kit push   # Push database schema to Neon
npx drizzle-kit studio # Open Drizzle Studio for database management
```

## Architecture

### High-level system architecture
- **Frontend**: Next.js 15 with App Router, React 18, TypeScript
- **Styling**: Tailwind CSS for utility-first styling
- **Database**: Neon PostgreSQL with Drizzle ORM
- **Deployment**: Vercel for hosting and deployment

### Key modules and their responsibilities
- `/src/app` - Next.js App Router pages and layouts
- `/src/components` - Reusable React components
- `/src/lib` - Utility functions and database configuration
- `/src/types` - TypeScript type definitions

### Database schema overview
- **users** - User accounts and authentication
- **referrals** - Referral records with status tracking
- **referral_rewards** - Reward system for successful referrals

### API structure and endpoints
- `/api/referrals` - CRUD operations for referrals
- `/api/users` - User management endpoints
- `/api/rewards` - Reward management endpoints

### Authentication and authorization patterns
- NextAuth.js for authentication (to be implemented)
- JWT tokens for API authentication
- Role-based access control for different user types

### Key design patterns used throughout the codebase
- Component composition with TypeScript
- Custom hooks for data fetching
- Server actions for form handling
- Utility-first CSS with Tailwind

## Project Structure

```
ReferralPro/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── [other pages]/     # Feature pages
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components
│   │   └── navigation.tsx    # Navigation component
│   ├── lib/                  # Utilities and configurations
│   │   ├── db.ts            # Database connection
│   │   ├── schema.ts        # Database schema
│   │   └── utils.ts         # Utility functions
│   └── types/               # TypeScript definitions
├── public/                  # Static assets
├── drizzle.config.ts       # Drizzle configuration
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies and scripts
└── .env.local              # Environment variables
```

## Notes for Future Development

- Update this file as the project grows and new features are added
- Add specific commands for testing when testing framework is chosen
- Document any special setup requirements or environment variables
- Add information about deployment processes when established
- Consider adding authentication with NextAuth.js
- Implement comprehensive error handling and logging
- Add unit and integration tests