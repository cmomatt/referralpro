import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();

  // If user is authenticated, redirect to dashboard
  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-indigo-400 to-purple-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>

        <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Welcome to <span className="text-indigo-600">ReferralPro</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              A comprehensive referral management system to track your professional network,
              manage referrals, and grow your business relationships.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/auth/signin"
                className="rounded-md bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get Started
              </a>
              <a
                href="#features"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-4xl" id="features">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to manage referrals
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Built with modern technology for professionals who value their network.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.253v13.752m0-13.752C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13.752m9-13.752C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13.752m-9-13.752C11.168 5.477 9.582 5 7.836 5c-1.746 0-3.332.477-4.5 1.253v13.752M9 12h6" />
                    </svg>
                  </div>
                  Contact Management
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Organize and manage your professional contacts with detailed profiles, company information, and relationship tracking.</p>
                </dd>
              </div>

              <div className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-8.839 2.51L2.25 21m9.75-12h3m-3 0h.01M12 12h4.5m4.5 0h.01M12 18h4.5m4.5 0h.01" />
                    </svg>
                  </div>
                  Referral Tracking
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Track referrals through their entire lifecycle with status updates, notes, and completion tracking.</p>
                </dd>
              </div>

              <div className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                    </svg>
                  </div>
                  Analytics Dashboard
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Get insights into your referral network with real-time metrics and performance analytics.</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
