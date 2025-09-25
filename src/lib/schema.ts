import { pgTable, text, timestamp, varchar, pgEnum, integer, jsonb, foreignKey, unique } from 'drizzle-orm/pg-core';

// Enums matching the database
export const referralStatus = pgEnum('referral_status', [
  'pending',
  'contacted',
  'accepted',
  'rejected',
  'completed'
]);

export const rewardType = pgEnum('reward_type', [
  'cash',
  'credit',
  'gift',
  'other'
]);

export const rewardStatus = pgEnum('reward_status', [
  'pending',
  'paid',
  'cancelled'
]);

// Users table
export const users = pgTable('users', {
  id: text('id').primaryKey().notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
}, (table) => {
  return {
    usersEmailUnique: unique('users_email_unique').on(table.email),
  }
});

// Contacts table
export const contacts = pgTable('contacts', {
  id: text('id').primaryKey().notNull(),
  userId: text('user_id').notNull(),
  firstName: varchar('first_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 255 }),
  company: varchar('company', { length: 255 }),
  title: varchar('title', { length: 255 }),
  website: varchar('website', { length: 255 }),
  linkedinUrl: varchar('linkedin_url', { length: 255 }),
  industry: varchar('industry', { length: 255 }),
  specialty: varchar('specialty', { length: 255 }),
  expertise: text('expertise'),
  idealCustomer: text('ideal_customer'),
  reputationScore: integer('reputation_score'),
  notes: text('notes'),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
}, (table) => {
  return {
    contactsUserIdFkey: foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: 'contacts_user_id_fkey'
    }),
  }
});

// Referrals table
export const referrals = pgTable('referrals', {
  id: text('id').primaryKey().notNull(),
  referrerId: text('referrer_id').notNull(),
  refereeEmail: varchar('referee_email', { length: 255 }).notNull(),
  refereeName: varchar('referee_name', { length: 255 }),
  status: referralStatus('status').default('pending').notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
  completedAt: timestamp('completed_at', { mode: 'string' }),
}, (table) => {
  return {
    referralsReferrerIdUsersIdFk: foreignKey({
      columns: [table.referrerId],
      foreignColumns: [users.id],
      name: 'referrals_referrer_id_users_id_fk'
    }),
  }
});

// Meetings table
export const meetings = pgTable('meetings', {
  id: text('id').primaryKey().notNull(),
  userId: text('user_id').notNull(),
  contactId: text('contact_id').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  datetime: timestamp('datetime', { mode: 'string' }).notNull(),
  duration: integer('duration'),
  location: varchar('location', { length: 255 }),
  meetingUrl: varchar('meeting_url', { length: 500 }),
  status: varchar('status', { length: 50 }).default('scheduled'),
  summary: text('summary'),
  transcript: text('transcript'),
  actionItems: jsonb('action_items'),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
}, (table) => {
  return {
    meetingsUserIdFkey: foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: 'meetings_user_id_fkey'
    }),
    meetingsContactIdFkey: foreignKey({
      columns: [table.contactId],
      foreignColumns: [contacts.id],
      name: 'meetings_contact_id_fkey'
    }),
  }
});

// Tasks table
export const tasks = pgTable('tasks', {
  id: text('id').primaryKey().notNull(),
  userId: text('user_id').notNull(),
  contactId: text('contact_id'),
  referralId: text('referral_id'),
  meetingId: text('meeting_id'),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  dueDate: timestamp('due_date', { mode: 'string' }),
  status: varchar('status', { length: 20 }).default('open'),
  priority: varchar('priority', { length: 20 }).default('medium'),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
  completedAt: timestamp('completed_at', { mode: 'string' }),
}, (table) => {
  return {
    tasksUserIdFkey: foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: 'tasks_user_id_fkey'
    }),
    tasksContactIdFkey: foreignKey({
      columns: [table.contactId],
      foreignColumns: [contacts.id],
      name: 'tasks_contact_id_fkey'
    }),
    tasksReferralIdFkey: foreignKey({
      columns: [table.referralId],
      foreignColumns: [referrals.id],
      name: 'tasks_referral_id_fkey'
    }),
    tasksMeetingIdFkey: foreignKey({
      columns: [table.meetingId],
      foreignColumns: [meetings.id],
      name: 'tasks_meeting_id_fkey'
    }),
  }
});

// Referral rewards table
export const referralRewards = pgTable('referral_rewards', {
  id: text('id').primaryKey().notNull(),
  referralId: text('referral_id').notNull(),
  type: rewardType('type').notNull(),
  amount: text('amount'),
  description: text('description').notNull(),
  status: rewardStatus('status').default('pending').notNull(),
  paidAt: timestamp('paid_at', { mode: 'string' }),
}, (table) => {
  return {
    referralRewardsReferralIdReferralsIdFk: foreignKey({
      columns: [table.referralId],
      foreignColumns: [referrals.id],
      name: 'referral_rewards_referral_id_referrals_id_fk'
    }),
  }
});

// NextAuth.js required tables
export const accounts = pgTable('accounts', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('providerAccountId').notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  token_type: text('token_type'),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: text('session_state'),
});

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  sessionToken: text('sessionToken').notNull().unique(),
  userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable('verificationTokens', {
  identifier: text('identifier').notNull(),
  token: text('token').notNull(),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});
