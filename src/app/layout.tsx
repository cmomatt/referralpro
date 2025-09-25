import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthSessionProvider } from '@/components/auth/session-provider'
import { Navigation } from '@/components/navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ReferralPro - Referral Management System',
  description: 'A comprehensive referral management system built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthSessionProvider>
          <Navigation />
          <main>
            {children}
          </main>
        </AuthSessionProvider>
      </body>
    </html>
  )
}
