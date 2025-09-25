import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

interface Referral {
  id: string;
  referrerId: string;
  refereeEmail: string;
  refereeName?: string;
  status: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

async function getReferrals(): Promise<Referral[]> {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/referrals`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      console.error('Failed to fetch referrals:', response.statusText);
      return [];
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching referrals:', error);
    return [];
  }
}

export default async function ReferralsPage() {
  const session = await auth();

  if (!session) {
    redirect('/auth/signin');
  }

  const referrals = await getReferrals();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'contacted': return 'bg-blue-100 text-blue-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Referrals</h1>
            <p className="mt-2 text-sm text-gray-700">
              Track and manage your referral pipeline
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              href="/referrals/new"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Referral
            </Link>
          </div>
        </div>

        {referrals.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No referrals</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating your first referral.</p>
            <div className="mt-6">
              <Link
                href="/referrals/new"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                New Referral
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {referrals.map((referral) => (
                <li key={referral.id}>
                  <Link
                    href={`/referrals/${referral.id}`}
                    className="block hover:bg-gray-50"
                  >
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="flex items-center">
                              <p className="text-sm font-medium text-gray-900">
                                {referral.refereeName || referral.refereeEmail}
                              </p>
                              <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(referral.status)}`}>
                                {referral.status}
                              </span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <span>{referral.refereeEmail}</span>
                              <span className="mx-2">•</span>
                              <span>{new Date(referral.createdAt).toLocaleDateString()}</span>
                            </div>
                            {referral.notes && (
                              <p className="text-sm text-gray-500 mt-1 truncate max-w-md">
                                {referral.notes}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="text-right mr-4">
                            <div className="text-sm text-gray-900">
                              ID: {referral.id.slice(0, 8)}...
                            </div>
                          </div>
                          <div className="ml-4">
                            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
