import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

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

async function getReferral(id: string): Promise<Referral | null> {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/referrals/${id}`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      console.error('Failed to fetch referral:', response.statusText);
      return null;
    }

    const data = await response.json();
    return data.data || null;
  } catch (error) {
    console.error('Error fetching referral:', error);
    return null;
  }
}

export default async function ReferralDetailPage({
  params
}: {
  params: { id: string }
}) {
  const session = await auth();

  if (!session) {
    redirect('/auth/signin');
  }

  const referral = await getReferral(params.id);

  if (!referral) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Referral Not Found</h1>
              <p className="text-gray-600 mb-6">
                The referral you're looking for doesn't exist or may have been deleted.
              </p>
              <a
                href="/referrals"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Back to Referrals
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'contacted':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <a
            href="/referrals"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            ← Back to Referrals
          </a>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">
                Referral Details
              </h1>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(referral.status)}`}>
                {referral.status}
              </span>
            </div>
          </div>

          <div className="px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Referral Information */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Referral Information</h2>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Referral ID</dt>
                    <dd className="text-sm text-gray-900 font-mono">
                      {referral.id}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Person's Name</dt>
                    <dd className="text-sm text-gray-900">
                      {referral.refereeName || 'Not provided'}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                    <dd className="text-sm text-gray-900">
                      {referral.refereeEmail}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Status</dt>
                    <dd className="text-sm text-gray-900">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(referral.status)}`}>
                        {referral.status}
                      </span>
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Created</dt>
                    <dd className="text-sm text-gray-900">
                      {new Date(referral.createdAt).toLocaleDateString()}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                    <dd className="text-sm text-gray-900">
                      {new Date(referral.updatedAt).toLocaleDateString()}
                    </dd>
                  </div>

                  {referral.completedAt && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Completed</dt>
                      <dd className="text-sm text-gray-900">
                        {new Date(referral.completedAt).toLocaleDateString()}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Notes */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Notes</h2>
                {referral.notes ? (
                  <div className="bg-gray-50 rounded-md p-4">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                      {referral.notes}
                    </p>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-md p-4">
                    <p className="text-sm text-gray-500 italic">
                      No notes provided
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Status Timeline */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Status Timeline</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    ['pending', 'contacted', 'accepted', 'rejected', 'completed'].includes(referral.status)
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Created</p>
                    <p className="text-sm text-gray-500">
                      {new Date(referral.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {referral.status !== 'pending' && (
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      ['contacted', 'accepted', 'rejected', 'completed'].includes(referral.status)
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Status Updated</p>
                      <p className="text-sm text-gray-500">
                        {new Date(referral.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}

                {referral.completedAt && (
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Completed</p>
                      <p className="text-sm text-gray-500">
                        {new Date(referral.completedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
