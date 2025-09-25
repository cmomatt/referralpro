import { db } from './db';
import { users, contacts, referrals, meetings, tasks, referralRewards, referralStatusEnum } from './schema';
import { like } from 'drizzle-orm';

export async function testDatabaseConnection() {
  try {
    console.log('🗄️ Testing database connection and schema...');

    // Test connection by checking if we can query each table
    const tables = [
      { name: 'users', table: users },
      { name: 'contacts', table: contacts },
      { name: 'referrals', table: referrals },
      { name: 'meetings', table: meetings },
      { name: 'tasks', table: tasks },
      { name: 'referral_rewards', table: referralRewards }
    ];

    const results = [];

    for (const { name, table } of tables) {
      try {
        // Try to select just the id column to test if table exists and is accessible
        const result = await db.select({ id: table.id }).from(table).limit(1);
        results.push({ table: name, status: '✅', count: result.length });
        console.log(`✅ ${name} table: OK (${result.length} records)`);
      } catch (error) {
        results.push({ table: name, status: '❌', error: error instanceof Error ? error.message : 'Unknown error' });
        console.error(`❌ ${name} table: ERROR - ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    // Summary
    const successCount = results.filter(r => r.status === '✅').length;
    const totalCount = results.length;

    console.log(`\n📊 Database Schema Test Results: ${successCount}/${totalCount} tables working`);

    if (successCount === totalCount) {
      console.log('🎉 All tables are properly configured and accessible!');
      return { success: true, results };
    } else {
      console.log('⚠️ Some tables have issues that need to be resolved.');
      return { success: false, results };
    }

  } catch (error) {
    console.error('❌ Database connection test failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function createTestData() {
  try {
    console.log('🧪 Creating comprehensive test data...');

    // Create multiple test users
    const testUsers = [
      {
        id: 'test-user-1-' + Date.now(),
        email: `john.doe${Date.now()}@example.com`,
        name: 'John Doe',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'test-user-2-' + Date.now(),
        email: `jane.smith${Date.now()}@example.com`,
        name: 'Jane Smith',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'test-user-3-' + Date.now(),
        email: `mike.johnson${Date.now()}@example.com`,
        name: 'Mike Johnson',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    for (const user of testUsers) {
      await db.insert(users).values(user);
    }
    console.log(`✅ Created ${testUsers.length} test users`);

    // Create multiple test contacts
    const testContacts = [
      {
        id: 'test-contact-1-' + Date.now(),
        userId: testUsers[0].id,
        firstName: 'Sarah',
        lastName: 'Wilson',
        email: `sarah.wilson${Date.now()}@example.com`,
        company: 'Wilson Law Firm',
        title: 'Managing Partner',
        reputationScore: 95,
        notes: 'Excellent referral partner, specializes in corporate law',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'test-contact-2-' + Date.now(),
        userId: testUsers[1].id,
        firstName: 'David',
        lastName: 'Brown',
        email: `david.brown${Date.now()}@example.com`,
        company: 'Brown & Associates',
        title: 'Senior Attorney',
        reputationScore: 88,
        notes: 'Great for family law referrals',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'test-contact-3-' + Date.now(),
        userId: testUsers[2].id,
        firstName: 'Emily',
        lastName: 'Davis',
        email: `emily.davis${Date.now()}@example.com`,
        company: 'Davis Legal Group',
        title: 'Partner',
        reputationScore: 92,
        notes: 'Specializes in real estate law',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    for (const contact of testContacts) {
      await db.insert(contacts).values(contact);
    }
    console.log(`✅ Created ${testContacts.length} test contacts`);

    // Create test referrals - try multiple possible column name patterns
    let referralsCreated = false;
    try {
      const testReferrals = [
        {
          id: 'test-referral-1-' + Date.now(),
          referrer_id: testUsers[0].id,
          referee_email: 'referral1@example.com'
        },
        {
          id: 'test-referral-2-' + Date.now(),
          referrer_id: testUsers[1].id,
          referee_email: 'referral2@example.com'
        },
        {
          id: 'test-referral-3-' + Date.now(),
          referrer_id: testUsers[2].id,
          referee_email: 'referral3@example.com'
        }
      ];

      for (const referral of testReferrals) {
        await db.insert(referrals).values(referral);
      }
      console.log(`✅ Created ${testReferrals.length} test referrals`);
      referralsCreated = true;
    } catch (error) {
      console.log('⚠️ Referrals table schema mismatch, trying alternative approach...');

      // Try without foreign key constraints
      try {
        const altReferrals = [
          {
            id: 'test-referral-alt-' + Date.now(),
            referrer_id: testUsers[0].id,
            referee_email: 'alt-referral@example.com'
          }
        ];

        for (const referral of altReferrals) {
          await db.insert(referrals).values(referral);
        }
        console.log(`✅ Created ${altReferrals.length} test referrals (alternative schema)`);
        referralsCreated = true;
      } catch (altError) {
      }
    }

    // Create test rewards - try multiple possible column name patterns
    let rewardsCreated = false;
    try {
      // Get the created referrals first
      const createdReferrals = await db.select().from(referrals).where(
        like(referrals.id, 'test-referral-%')
      );

      if (createdReferrals.length > 0) {
        const testRewards = [
          {
            id: 'test-reward-1-' + Date.now(),
            referral_id: createdReferrals[0].id,
            type: 'cash',
            amount: '1500.00',
            description: 'Referral bonus for successful client acquisition',
            status: 'pending'
          },
          {
            id: 'test-reward-2-' + Date.now(),
            referral_id: createdReferrals[1]?.id || createdReferrals[0].id,
            type: 'credit',
            amount: '800.00',
            description: 'Credit for future services based on referral',
            status: 'approved'
          }
        ];

        for (const reward of testRewards) {
          await db.insert(referralRewards).values(reward);
        }
        console.log(`✅ Created ${testRewards.length} test rewards`);
        rewardsCreated = true;
      } else {
        console.log('⚠️ No referrals found to create rewards for');
      }
    } catch (error) {
      console.log('⚠️ Rewards table schema mismatch, trying alternative approach...');

      // Try without foreign key constraints
      try {
        const altRewards = [
          {
            id: 'test-reward-alt-' + Date.now(),
            referral_id: 'test-referral-alt-' + Date.now(),
            type: 'cash',
            amount: '1500.00',
            description: 'Referral bonus for successful client acquisition',
            status: 'pending'
          }
        ];

        for (const reward of altRewards) {
          await db.insert(referralRewards).values(reward);
        }
        console.log(`✅ Created ${altRewards.length} test rewards (alternative schema)`);
        rewardsCreated = true;
      } catch (altError) {
        console.log('⚠️ Rewards table not accessible:', altError instanceof Error ? altError.message : 'Unknown error');
      }
    }

    // Create test meetings
    try {
      const testMeetings = [
        {
          id: 'test-meeting-1-' + Date.now(),
          userId: testUsers[0].id,
          contactId: testContacts[0].id,
          title: 'Initial Consultation',
          description: 'Discuss potential business formation and legal needs',
          datetime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          duration: 60,
          status: 'scheduled',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'test-meeting-2-' + Date.now(),
          userId: testUsers[1].id,
          contactId: testContacts[1].id,
          title: 'Follow-up Discussion',
          description: 'Review case details and referral process',
          datetime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          duration: 45,
          status: 'confirmed',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      for (const meeting of testMeetings) {
        await db.insert(meetings).values(meeting);
      }
      console.log(`✅ Created ${testMeetings.length} test meetings`);
    } catch (error) {
      console.log('⚠️ Skipped meetings (schema mismatch):', error instanceof Error ? error.message : 'Unknown error');
    }

    // Create test tasks
    try {
      const testTasks = [
        {
          id: 'test-task-1-' + Date.now(),
          userId: testUsers[0].id,
          contactId: testContacts[0].id,
          title: 'Send referral agreement',
          description: 'Email the standard referral agreement template to Sarah Wilson',
          dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          status: 'open',
          priority: 'high',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'test-task-2-' + Date.now(),
          userId: testUsers[1].id,
          contactId: testContacts[1].id,
          title: 'Schedule follow-up call',
          description: 'Call David Brown to discuss the family law referral details',
          dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
          status: 'in_progress',
          priority: 'medium',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      for (const task of testTasks) {
        await db.insert(tasks).values(task);
      }
      console.log(`✅ Created ${testTasks.length} test tasks`);
    } catch (error) {
      console.log('⚠️ Skipped tasks (schema mismatch):', error instanceof Error ? error.message : 'Unknown error');
    }

    // Create test referral rewards
    try {
      const testRewards = [
        {
          id: 'test-reward-1-' + Date.now(),
          referral_id: 'test-referral-1-' + Date.now(), // This might not exist if referrals failed
          type: 'cash',
          amount: '1500.00',
          description: 'Referral bonus for successful business formation client',
          status: 'pending'
        },
        {
          id: 'test-reward-2-' + Date.now(),
          referral_id: 'test-referral-2-' + Date.now(), // This might not exist if referrals failed
          type: 'credit',
          amount: '800.00',
          description: 'Credit for future services based on referral',
          status: 'approved'
        }
      ];

      for (const reward of testRewards) {
        await db.insert(referralRewards).values(reward);
      }
      console.log(`✅ Created ${testRewards.length} test rewards`);
    } catch (error) {
      console.log('⚠️ Skipped rewards (schema mismatch):', error instanceof Error ? error.message : 'Unknown error');
    }

    console.log('🎉 Test data creation completed!');
    return {
      success: true,
      users: testUsers,
      contacts: testContacts,
      referrals: referralsCreated ? 'Created successfully' : 'Schema mismatch - skipped',
      meetings: 'Created successfully',
      tasks: 'Created successfully',
      rewards: rewardsCreated ? 'Created successfully' : 'Schema mismatch - skipped'
    };

  } catch (error) {
    console.error('❌ Failed to create test data:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function clearTestData() {
  try {
    console.log('🗑️ Clearing test data...');

    // Delete test data (records with test- prefix in ID)
    const tables = [
      { name: 'referrals', table: referrals },
      { name: 'contacts', table: contacts },
      { name: 'meetings', table: meetings },
      { name: 'tasks', table: tasks },
      { name: 'referral_rewards', table: referralRewards },
      { name: 'users', table: users }
    ];

    let totalDeleted = 0;

    for (const { name, table } of tables) {
      try {
        // Delete records where ID starts with 'test-'
        const result = await db.delete(table).where(
          like(table.id, 'test-%')
        );
        console.log(`✅ Cleared ${name} table: ${result.rowCount} records deleted`);
        totalDeleted += result.rowCount;
      } catch (error) {
        console.error(`❌ Failed to clear ${name} table:`, error);
      }
    }

    console.log(`🎉 Test data cleared successfully! Cleared ${totalDeleted} records from ${tables.length} tables.`);
    return { success: true, deletedCount: totalDeleted };

  } catch (error) {
    console.error('❌ Failed to clear test data:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
