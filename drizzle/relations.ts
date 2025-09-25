import { relations } from "drizzle-orm/relations";
import { users, referrals, referralRewards, contacts, meetings, tasks } from "./schema";

export const referralsRelations = relations(referrals, ({one, many}) => ({
	user: one(users, {
		fields: [referrals.referrerId],
		references: [users.id]
	}),
	referralRewards: many(referralRewards),
	tasks: many(tasks),
}));

export const usersRelations = relations(users, ({many}) => ({
	referrals: many(referrals),
	contacts: many(contacts),
	meetings: many(meetings),
	tasks: many(tasks),
}));

export const referralRewardsRelations = relations(referralRewards, ({one}) => ({
	referral: one(referrals, {
		fields: [referralRewards.referralId],
		references: [referrals.id]
	}),
}));

export const contactsRelations = relations(contacts, ({one, many}) => ({
	user: one(users, {
		fields: [contacts.userId],
		references: [users.id]
	}),
	meetings: many(meetings),
	tasks: many(tasks),
}));

export const meetingsRelations = relations(meetings, ({one, many}) => ({
	user: one(users, {
		fields: [meetings.userId],
		references: [users.id]
	}),
	contact: one(contacts, {
		fields: [meetings.contactId],
		references: [contacts.id]
	}),
	tasks: many(tasks),
}));

export const tasksRelations = relations(tasks, ({one}) => ({
	user: one(users, {
		fields: [tasks.userId],
		references: [users.id]
	}),
	contact: one(contacts, {
		fields: [tasks.contactId],
		references: [contacts.id]
	}),
	referral: one(referrals, {
		fields: [tasks.referralId],
		references: [referrals.id]
	}),
	meeting: one(meetings, {
		fields: [tasks.meetingId],
		references: [meetings.id]
	}),
}));