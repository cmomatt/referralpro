# ReferralPro

A modern referral management system built with Next.js, TypeScript, React, and Neon database.

## 🚀 Features

- **Referral Tracking**: Create, manage, and track referrals with status updates
- **User Management**: User accounts with authentication and authorization
- **Reward System**: Reward tracking for successful referrals
- **Analytics Dashboard**: Comprehensive analytics and reporting
- **Modern UI**: Clean, responsive interface built with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Neon PostgreSQL
- **ORM**: Drizzle ORM
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Neon database account

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd ReferralPro
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
# Neon Database Configuration
DATABASE_URL="your-neon-database-connection-string-here"

# Next.js Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-here"
```

### 4. Set up the database

Your Neon database is now configured! The schema has been automatically pushed to your database.

**Test the database connection:**
- Visit `http://localhost:3000/api/test-db` to verify the connection
- Or run: `curl http://localhost:3000/api/test-db`

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📜 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── [other pages]/     # Feature pages
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── navigation.tsx    # Navigation component
├── lib/                  # Utilities and configurations
│   ├── db.ts            # Database connection
│   ├── schema.ts        # Database schema
│   └── utils.ts         # Utility functions
└── types/               # TypeScript definitions
```

## 🗄️ Database Schema

The application uses the following main entities:

- **Users**: User accounts and authentication
- **Referrals**: Referral records with status tracking
- **Referral Rewards**: Reward system for successful referrals

## 🚀 Deployment

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Add your environment variables in the Vercel dashboard
3. Deploy automatically on every push to main branch

### Environment Variables for Production

Make sure to set these in your Vercel project settings:

- `DATABASE_URL` - Your Neon database connection string
- `NEXTAUTH_URL` - Your production domain
- `NEXTAUTH_SECRET` - A secure random string for NextAuth

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you have any questions or need help, please open an issue in the repository.

---

Built with ❤️ using Next.js, TypeScript, and Neon
