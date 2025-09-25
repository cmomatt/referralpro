'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/db';
import { users, contacts, referrals, meetings, tasks, referralRewards } from '@/lib/schema';

interface TestUser {
  id: string;
  name: string;
  email: string;
}

interface TestContact {
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
}

interface TestReferral {
  id: string;
  userId: string;
  contactId: string;
  type: string;
  location?: string;
  status: string;
  details?: string;
  value?: string;
  createdAt?: string;
  updatedAt?: string;
  completedAt?: string;
}

interface TestMeeting {
  id: string;
  userId: string;
  contactId: string;
  title: string;
  description?: string;
  datetime?: string;
  duration?: number;
  status?: string;
}

interface TestTask {
  id: string;
  userId: string;
  contactId: string;
  title: string;
  description?: string;
  dueDate?: string;
  status?: string;
  priority?: string;
}

interface TestReward {
  id: string;
  referralId: string;
  type: string;
  amount?: string;
  description?: string;
  status?: string;
}

export default function TestPage() {
  const [users, setUsers] = useState<TestUser[]>([]);
  const [contacts, setContacts] = useState<TestContact[]>([]);
  const [referrals, setReferrals] = useState<TestReferral[]>([]);
  const [meetings, setMeetings] = useState<TestMeeting[]>([]);
  const [tasks, setTasks] = useState<TestTask[]>([]);
  const [rewards, setRewards] = useState<TestReward[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<string[]>([]);

  const addTestResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`]);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      addTestResult('🔍 Starting database test...');
      
      // Test database connection
      const dbTest = await fetch('/api/test-db');
      const dbResult = await dbTest.json();
      
      if (dbResult.success) {
        addTestResult('✅ Database connection successful');
        const tableNames = dbResult.results.map((r: any) => r.table).join(', ');
        addTestResult(`📊 Tables found: ${tableNames}`);
      } else {
        addTestResult('❌ Database connection failed');
        setError(dbResult.error);
        return;
      }

      // Fetch users - always from database, no fallbacks
      const usersResponse = await fetch('/api/users');
      if (usersResponse.ok) {
        const usersResult = await usersResponse.json();
        if (usersResult.success) {
          setUsers(usersResult.data);
          addTestResult(`👥 Found ${usersResult.data.length} users`);
        } else {
          addTestResult(`❌ Failed to fetch users: ${usersResult.error}`);
        }
      } else {
        addTestResult('❌ Failed to fetch users');
      }

      // Fetch contacts - always from database, no fallbacks
      const contactsResponse = await fetch('/api/contacts');
      if (contactsResponse.ok) {
        const contactsResult = await contactsResponse.json();
        if (contactsResult.success) {
          setContacts(contactsResult.data);
          addTestResult(`📇 Found ${contactsResult.data.length} contacts`);
        } else {
          addTestResult(`❌ Failed to fetch contacts: ${contactsResult.error}`);
        }
      } else {
        addTestResult('❌ Failed to fetch contacts');
      }

      // Fetch referrals - always from database, no fallbacks
      const referralsResponse = await fetch('/api/referrals');
      if (referralsResponse.ok) {
        const referralsResult = await referralsResponse.json();
        if (referralsResult.success) {
          setReferrals(referralsResult.data);
          addTestResult(`🤝 Found ${referralsResult.data.length} referrals`);
        } else {
          addTestResult(`❌ Failed to fetch referrals: ${referralsResult.error}`);
        }
      } else {
        addTestResult('❌ Failed to fetch referrals');
      }

      // Fetch meetings - always from database, no fallbacks
      const meetingsResponse = await fetch('/api/meetings');
      if (meetingsResponse.ok) {
        const meetingsResult = await meetingsResponse.json();
        if (meetingsResult.success) {
          setMeetings(meetingsResult.data);
          addTestResult(`📅 Found ${meetingsResult.data.length} meetings`);
        } else {
          addTestResult(`❌ Failed to fetch meetings: ${meetingsResult.error}`);
        }
      } else {
        addTestResult('❌ Failed to fetch meetings');
      }

      // Fetch tasks - always from database, no fallbacks
      const tasksResponse = await fetch('/api/tasks');
      if (tasksResponse.ok) {
        const tasksResult = await tasksResponse.json();
        if (tasksResult.success) {
          setTasks(tasksResult.data);
          addTestResult(`✅ Found ${tasksResult.data.length} tasks`);
        } else {
          addTestResult(`❌ Failed to fetch tasks: ${tasksResult.error}`);
        }
      } else {
        addTestResult('❌ Failed to fetch tasks');
      }

      // Fetch rewards - always from database, no fallbacks
      const rewardsResponse = await fetch('/api/rewards');
      if (rewardsResponse.ok) {
        const rewardsResult = await rewardsResponse.json();
        if (rewardsResult.success) {
          setRewards(rewardsResult.data);
          addTestResult(`🎁 Found ${rewardsResult.data.length} rewards`);
        } else {
          addTestResult(`❌ Failed to fetch rewards: ${rewardsResult.error}`);
        }
      } else {
        addTestResult('❌ Failed to fetch rewards');
      }

      addTestResult('🎉 Data fetch completed!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      addTestResult(`❌ Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const createTestData = async () => {
    try {
      addTestResult('🔧 Creating test data...');
      
      const response = await fetch('/api/test-db', {
        method: 'POST',
      });
      
      const result = await response.json();
      
      if (result.success) {
        addTestResult('✅ Test data created successfully');
        addTestResult(`👥 Created ${result.data.users?.length || 0} users`);
        addTestResult(`📇 Created ${result.data.contacts?.length || 0} contacts`);
        addTestResult(`🤝 Referrals: ${result.data.referrals || 'Schema mismatch - working on fix'}`);
        addTestResult(`📅 Created ${result.data.meetings === 'Created successfully' ? '✅' : '❌'} meetings`);
        addTestResult(`✅ Created ${result.data.tasks === 'Created successfully' ? '✅' : '❌'} tasks`);
        addTestResult(`🎁 Rewards: ${result.data.rewards || 'Schema mismatch - working on fix'}`);

        // Refresh data after creating test data
        await fetchData();
      } else {
        addTestResult(`❌ Failed to create test data: ${result.error}`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      addTestResult(`❌ Error creating test data: ${errorMessage}`);
    }
  };

  const clearTestData = async () => {
    try {
      addTestResult('🗑️ Clearing test data...');
      
      const response = await fetch('/api/test-db', {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      if (result.success) {
        addTestResult('✅ Test data cleared successfully');
        addTestResult(`🗑️ Deleted ${result.deletedCount} records`);
        
        // Refresh data after clearing
        await fetchData();
      } else {
        addTestResult(`❌ Failed to clear test data: ${result.error}`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      addTestResult(`❌ Error clearing test data: ${errorMessage}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Database Test Page</h1>
          <p className="text-gray-600">
            Test your database connection and interact with your ReferralPro data
          </p>
        </div>

        {/* Test Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Test Controls</h2>
          <div className="flex gap-4 mb-4">
            <button
              onClick={fetchData}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Refresh Data'}
            </button>
            <button
              onClick={createTestData}
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              Create Test Data
            </button>
            <button
              onClick={clearTestData}
              disabled={loading}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            >
              Clear Test Data
            </button>
          </div>

          {/* Test Results */}
          <div className="bg-gray-100 rounded p-4">
            <h3 className="font-semibold mb-2">Test Results:</h3>
            <div className="space-y-1 max-h-40 overflow-y-auto">
              {testResults.map((result, index) => (
                <div key={index} className="text-sm font-mono">
                  {result}
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              <strong>Error:</strong> {error}
            </div>
          )}
        </div>

        {/* Data Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {/* Users */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Users ({users.length})</h2>
            {users.length === 0 ? (
              <p className="text-gray-500">No users found</p>
            ) : (
              <div className="space-y-3">
                {users.map((user) => (
                  <div key={user.id} className="border rounded p-3">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-600">{user.email}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contacts */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Contacts ({contacts.length})</h2>
            {contacts.length === 0 ? (
              <p className="text-gray-500">No contacts found</p>
            ) : (
              <div className="space-y-3">
                {contacts.map((contact) => (
                  <div key={contact.id} className="border rounded p-3">
                    <div className="font-medium">{contact.firstName} {contact.lastName}</div>
                    {contact.email && (
                      <div className="text-sm text-gray-600">{contact.email}</div>
                    )}
                    {contact.company && (
                      <div className="text-sm text-gray-500">Company: {contact.company}</div>
                    )}
                    {contact.title && (
                      <div className="text-sm text-gray-500">Title: {contact.title}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Referrals */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Referrals ({referrals.length})</h2>
            {referrals.length === 0 ? (
              <p className="text-gray-500">No referrals found</p>
            ) : (
              <div className="space-y-3">
                {referrals.map((referral) => (
                  <div key={referral.id} className="border rounded p-3">
                    <div className="font-medium">Referral ID: {referral.id}</div>
                    <div className="text-sm text-gray-600">Type: {referral.type}</div>
                    <div className="text-sm text-gray-600">Status: {referral.status}</div>
                    {referral.details && (
                      <div className="text-sm text-gray-500">{referral.details}</div>
                    )}
                    {referral.value && (
                      <div className="text-sm text-gray-500">Value: ${referral.value}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Meetings */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Meetings ({meetings.length})</h2>
            {meetings.length === 0 ? (
              <p className="text-gray-500">No meetings found</p>
            ) : (
              <div className="space-y-3">
                {meetings.map((meeting) => (
                  <div key={meeting.id} className="border rounded p-3">
                    <div className="font-medium">{meeting.title}</div>
                    <div className="text-sm text-gray-600">Status: {meeting.status}</div>
                    {meeting.datetime && (
                      <div className="text-sm text-gray-500">
                        {new Date(meeting.datetime).toLocaleDateString()}
                      </div>
                    )}
                    {meeting.duration && (
                      <div className="text-sm text-gray-500">{meeting.duration} minutes</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tasks */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Tasks ({tasks.length})</h2>
            {tasks.length === 0 ? (
              <p className="text-gray-500">No tasks found</p>
            ) : (
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="border rounded p-3">
                    <div className="font-medium">{task.title}</div>
                    <div className="text-sm text-gray-600">Status: {task.status}</div>
                    <div className="text-sm text-gray-600">Priority: {task.priority}</div>
                    {task.dueDate && (
                      <div className="text-sm text-gray-500">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Rewards */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Rewards ({rewards.length})</h2>
            {rewards.length === 0 ? (
              <p className="text-gray-500">No rewards found</p>
            ) : (
              <div className="space-y-3">
                {rewards.map((reward) => (
                  <div key={reward.id} className="border rounded p-3">
                    <div className="font-medium">{reward.type} Reward</div>
                    <div className="text-sm text-gray-600">Status: {reward.status}</div>
                    {reward.amount && (
                      <div className="text-sm text-gray-500">Amount: ${reward.amount}</div>
                    )}
                    {reward.description && (
                      <div className="text-sm text-gray-500">{reward.description}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Database Schema Info */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Database Schema</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-blue-50 p-3 rounded">
              <strong>users</strong>
              <div className="text-gray-600">User profiles & auth</div>
            </div>
            <div className="bg-green-50 p-3 rounded">
              <strong>contacts</strong>
              <div className="text-gray-600">Contact management</div>
            </div>
            <div className="bg-purple-50 p-3 rounded">
              <strong>referrals</strong>
              <div className="text-gray-600">Referral tracking</div>
            </div>
            <div className="bg-yellow-50 p-3 rounded">
              <strong>meetings</strong>
              <div className="text-gray-600">Meeting scheduling</div>
            </div>
            <div className="bg-red-50 p-3 rounded">
              <strong>tasks</strong>
              <div className="text-gray-600">Task management</div>
            </div>
            <div className="bg-indigo-50 p-3 rounded">
              <strong>referral_rewards</strong>
              <div className="text-gray-600">Reward tracking</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
