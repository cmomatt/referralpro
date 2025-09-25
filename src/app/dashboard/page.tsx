import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

interface Contact {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  company?: string;
  title?: string;
  website?: string;
  linkedinUrl?: string;
  industry?: string;
  specialty?: string;
  expertise?: string;
  idealCustomer?: string;
  reputationScore?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

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

async function getContacts(): Promise<Contact[]> {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/contacts`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      console.error('Failed to fetch contacts:', response.statusText);
      return [];
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return [];
  }
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

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect('/auth/signin');
  }

  const contacts = await getContacts();
  const referrals = await getReferrals();

  // Calculate metrics
  const totalContacts = contacts.length;
  const totalReferrals = referrals.length;
  const pendingReferrals = referrals.filter(r => r.status === 'pending').length;
  const completedReferrals = referrals.filter(r => r.status === 'completed').length;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              ReferralPro Dashboard
            </h1>

            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    Authentication Successful!
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>Welcome to your ReferralPro dashboard. You are successfully authenticated with Google OAuth.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Total Referrals</h3>
                <p className="text-3xl font-bold text-blue-600">{totalReferrals}</p>
                <p className="text-sm text-blue-700">
                  {pendingReferrals > 0 ? `${pendingReferrals} pending` : 'Ready to create'}
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-green-900 mb-2">Active Contacts</h3>
                <p className="text-3xl font-bold text-green-600">{totalContacts}</p>
                <p className="text-sm text-green-700">
                  {totalContacts === 0 ? 'Add your first contact' : 'In your network'}
                </p>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-900 mb-2">Pending Referrals</h3>
                <p className="text-3xl font-bold text-yellow-600">{pendingReferrals}</p>
                <p className="text-sm text-yellow-700">
                  {pendingReferrals === 0 ? 'No pending referrals' : 'Need attention'}
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-900 mb-2">Completed</h3>
                <p className="text-3xl font-bold text-purple-600">{completedReferrals}</p>
                <p className="text-sm text-purple-700">
                  {completedReferrals === 0 ? 'No completed referrals' : 'Successful referrals'}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  href="/referrals/new"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-center"
                >
                  Add New Referral
                </Link>
                <Link
                  href="/contacts"
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-center"
                >
                  Manage Contacts
                </Link>
                <Link
                  href="/analytics"
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors text-center"
                >
                  View Analytics
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            {(contacts.length > 0 || referrals.length > 0) && (
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>

                {contacts.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Recent Contacts</h3>
                    <div className="space-y-2">
                      {contacts.slice(0, 3).map((contact) => (
                        <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                              <span className="text-xs font-medium text-gray-700">
                                {contact.firstName[0]}{contact.lastName[0]}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {contact.firstName} {contact.lastName}
                              </p>
                              {contact.company && (
                                <p className="text-xs text-gray-500">{contact.company}</p>
                              )}
                            </div>
                          </div>
                          <Link
                            href={`/contacts/${contact.id}`}
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            View
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {referrals.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Recent Referrals</h3>
                    <div className="space-y-2">
                      {referrals.slice(0, 3).map((referral) => (
                        <div key={referral.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {referral.refereeName || referral.refereeEmail}
                            </p>
                            <p className="text-xs text-gray-500 capitalize">
                              Status: {referral.status}
                            </p>
                          </div>
                          <Link
                            href={`/referrals/${referral.id}`}
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            View
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="mt-8 text-sm text-gray-600">
              <p><strong>User ID:</strong> {session.user?.id || 'N/A'}</p>
              <p><strong>Email:</strong> {session.user?.email || 'N/A'}</p>
              <p><strong>Name:</strong> {session.user?.name || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
