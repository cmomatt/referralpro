import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

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

async function getContact(id: string): Promise<Contact | null> {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3001';
    const response = await fetch(`${baseUrl}/api/contacts/${id}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch contact:', response.statusText);
      return null;
    }

    const data = await response.json();
    return data.data || null;
  } catch (error) {
    console.error('Error fetching contact:', error);
    return null;
  }
}

export default async function ContactDetailPage({
  params
}: {
  params: { id: string }
}) {
  const session = await auth();

  if (!session) {
    redirect('/auth/signin');
  }

  const contact = await getContact(params.id);

  if (!contact) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Contact Not Found</h1>
              <p className="text-gray-600 mb-6">
                The contact you're looking for doesn't exist or may have been deleted.
              </p>
              <a
                href="/contacts"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Back to Contacts
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <a
            href="/contacts"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            ← Back to Contacts
          </a>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">
              {contact.firstName} {contact.lastName}
            </h1>
            {contact.title && contact.company && (
              <p className="text-lg text-gray-600 mt-1">
                {contact.title} at {contact.company}
              </p>
            )}
          </div>

          <div className="px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="text-sm text-gray-900">
                      {contact.email || 'Not provided'}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                    <dd className="text-sm text-gray-900">
                      {contact.phone || 'Not provided'}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Company</dt>
                    <dd className="text-sm text-gray-900">
                      {contact.company || 'Not provided'}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Title</dt>
                    <dd className="text-sm text-gray-900">
                      {contact.title || 'Not provided'}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Website</dt>
                    <dd className="text-sm text-gray-900">
                      {contact.website ? (
                        <a
                          href={contact.website.startsWith('http') ? contact.website : `https://${contact.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          {contact.website}
                        </a>
                      ) : (
                        'Not provided'
                      )}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">LinkedIn</dt>
                    <dd className="text-sm text-gray-900">
                      {contact.linkedinUrl ? (
                        <a
                          href={contact.linkedinUrl.startsWith('http') ? contact.linkedinUrl : `https://${contact.linkedinUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          View Profile
                        </a>
                      ) : (
                        'Not provided'
                      )}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Professional Information */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h2>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Industry</dt>
                    <dd className="text-sm text-gray-900">
                      {contact.industry || 'Not specified'}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Specialty</dt>
                    <dd className="text-sm text-gray-900">
                      {contact.specialty || 'Not specified'}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Expertise</dt>
                    <dd className="text-sm text-gray-900">
                      {contact.expertise || 'Not specified'}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Ideal Customer</dt>
                    <dd className="text-sm text-gray-900">
                      {contact.idealCustomer || 'Not specified'}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Reputation Score</dt>
                    <dd className="text-sm text-gray-900">
                      {contact.reputationScore ? (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          contact.reputationScore >= 90
                            ? 'bg-green-100 text-green-800'
                            : contact.reputationScore >= 70
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {contact.reputationScore}/100
                        </span>
                      ) : (
                        'Not rated'
                      )}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Notes */}
            {contact.notes && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Notes</h2>
                <div className="bg-gray-50 rounded-md p-4">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {contact.notes}
                  </p>
                </div>
              </div>
            )}

            {/* Timestamps */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
                <div>
                  <span className="font-medium">Created:</span>{' '}
                  {new Date(contact.createdAt).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-medium">Last Updated:</span>{' '}
                  {new Date(contact.updatedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
