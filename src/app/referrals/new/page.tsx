'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewReferralPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    referrer_id: 'user-1', // TODO: Get from session
    referee_email: '',
    referee_name: '',
    status: 'pending',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/referrals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          referrer_id: formData.referrer_id,
          referee_email: formData.referee_email,
          referee_name: formData.referee_name || null,
          status: formData.status,
          notes: formData.notes || null,
        }),
      });

      if (response.ok) {
        router.push('/referrals');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      alert('Error creating referral');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold text-gray-900">Create New Referral</h1>
            <p className="mt-2 text-sm text-gray-700">
              Add a new referral to track in your pipeline
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <Link
              href="/referrals"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </Link>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-8 p-6">
            {/* Referral Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Referral Information</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="referee_name" className="block text-sm font-medium text-gray-700">
                    Person's Name
                  </label>
                  <input
                    type="text"
                    name="referee_name"
                    id="referee_name"
                    value={formData.referee_name}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Full name of the person being referred"
                  />
                </div>

                <div>
                  <label htmlFor="referee_email" className="block text-sm font-medium text-gray-700">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="referee_email"
                    id="referee_email"
                    required
                    value={formData.referee_email}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="email@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Status and Notes */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Status & Details</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    Initial Status
                  </label>
                  <select
                    name="status"
                    id="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="contacted">Contacted</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  Notes
                </label>
                <textarea
                  name="notes"
                  id="notes"
                  rows={4}
                  value={formData.notes}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Any additional notes about this referral..."
                />
              </div>
            </div>

            {/* Submit Actions */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <Link
                href="/referrals"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? 'Creating...' : 'Create Referral'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
