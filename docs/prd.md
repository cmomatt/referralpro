Product Requirements Document (PRD)

Product Name: Referral Pro (AI Referral Partner Optimizer)
Version: MVP

1. Executive Summary

Referral Pro is an AI-powered SaaS platform designed to optimize professional referrals across industries. It helps users (attorneys, financial advisors, insurance agents, CPAs, etc.) manage, track, and grow referral partnerships with AI-driven recommendations, enriched profiles, automated meeting and follow-up management, and compliance support.

The goal: More high-quality referrals, less friction, measurable ROI.

2. Objectives

Deliver an MVP with core features that validate user value and stickiness.

Provide AI-assisted onboarding, contact enrichment, and partner matching.

Ensure cross-platform accessibility (desktop + mobile responsive).

Build on a scalable foundation for expansion into advanced AI features and integrations.

3. Core Features
3.1 User Onboarding

Profile setup (name, industry, specialty, goals, etc.)

Connect email account for automated correspondence tracking.

Provide AI-guided walkthrough to “ah-ha moment” quickly.

3.2 Contacts Database

Add contacts manually, via business card photo, or from meeting transcripts.

Automatic enrichment from LinkedIn, websites, and public data.

Reputation scores (personal + company) from public reviews and articles.

Store referral history, meeting notes, and communication logs.

3.3 AI Matching Engine

Query example: “Find me a tax attorney in California.”

Ranked recommendations with explanations.

Capture thumbs up/down feedback and reasons for override.

Gap analysis to suggest new partners outside the network.

3.4 Referral Management

Send referrals with structured details (job type, location, notes).

Receive referrals with instant notification and quick summary page.

Track referral performance (given, received, closed %, dollar amounts).

3.5 Meetings & Scheduling

Calendar integration (Google, Outlook).

AI-suggested times + email scheduling.

Automatic pre-call briefing (skills, history, referral stats).

Automatic post-call summaries & task creation from meeting transcripts.

3.6 AI Chatbot Interface

Voice/chat commands available 24/7.

Conversational AI for adding contacts, scheduling, finding partners, generating follow-ups.

Integration with WhatsApp/Slack (future).

3.7 Notifications & To-Dos

Automated reminders for pending referrals, follow-ups, or tasks.

Nudges when reciprocity is unbalanced (“Mandy gave you 3 referrals, you’ve given 0”).

Performance dashboards: monthly/quarterly reports on referral activity.

3.8 Email Templates

AI-assisted templates: introductions, pre-call, post-call, reconnect.

Dynamic personalization based on contact profile.

3.9 Security & Compliance

End-to-end encryption.

GDPR, HIPAA, CCPA compliance built-in.

Role-based access controls.

4. MVP Scope

The MVP should include:

User onboarding (profile + email integration).

Contacts database (manual + AI enrichment).

AI matching engine.

Referral management (send/receive).

Meeting scheduling + summaries.

Core chatbot commands.

Notifications and basic analytics.

Future (Phase 2+):

Gamification & leaderboards.

Community courses & forums.

Cross-industry compliance modules.

Advanced integrations (BNI, Lawmatics, Wealthbox, HubSpot).

5. Technical Requirements

Framework: Next.js 15 + TypeScript.

Database: Neon + Drizzle ORM (relational schema for users, contacts, referrals, meetings, tasks).

Styling: Tailwind CSS + UI component library.

AI Integration: OpenAI/GPT API for NLP, enrichment, and summarization.

Auth: NextAuth.js or similar for secure login (OAuth + email).

API Integrations:

Email (Gmail/Outlook API).

Calendar (Google/Outlook).

LinkedIn (profile scraping).

Zoom/Meet/Teams (meeting transcripts).

Security: Env vars for keys, encrypted DB fields, compliance-ready.

6. KPIs

Number of referrals given/received per user.

Referral-to-close conversion rates.

Reciprocity balance (given vs. received).

Daily/weekly active users (DAU/WAU).

User time-to-first-referral (activation metric).

7. Risks & Considerations

Regulatory restrictions on referral disclosures in some industries (esp. financial advisors).

Data privacy handling when enriching from public sources.

Integration complexity (CRMs, meetings apps).

Avoid duplication of full CRM functionality—position as referral layer on top.

8. Roadmap (High-Level)

Phase 1 (MVP): Onboarding, contacts, matching, referrals, meetings, chatbot basics.
Phase 2: Notifications, analytics, templates, compliance features.
Phase 3: Gamification, community portal, advanced integrations, cross-industry expansion.

Would you like me to break this PRD into developer-facing instructions (with tasks mapped to Next.js + Drizzle ORM modules), or keep it strategic for stakeholders (high-level product features, outcomes, and priorities)?

You said:
developer facing
ChatGPT said:

Got it — let’s turn the PRD into developer-facing build instructions so your team can start coding directly in your Next.js + Neon + Drizzle ORM + Tailwind stack.

Here’s the structured breakdown:

Developer Instructions – Referral Pro (MVP Build)
1. Tech Stack (already in repo ✅)

Frontend: Next.js 15 + TypeScript + Tailwind + UI component library.

Backend/DB: Neon (Postgres) + Drizzle ORM for schema/migrations.

Auth: NextAuth.js (OAuth + email).

AI Layer: OpenAI API (NLP, summarization, enrichment).

Integrations (MVP): Gmail/Outlook API (email), Google Calendar (scheduling), LinkedIn scraping/enrichment.

Docs: Extend existing repo docs to cover schema + API endpoints.

2. Database Schema (Drizzle ORM)
Users
users: {
  id: uuid (pk),
  name: string,
  email: string (unique),
  password_hash: string (nullable if OAuth),
  role: enum('admin','user'),
  industry: string,
  specialty: string,
  goals: text,
  created_at: timestamp,
  updated_at: timestamp
}

Contacts
contacts: {
  id: uuid (pk),
  user_id: fk -> users.id,
  first_name: string,
  last_name: string,
  email: string,
  phone: string,
  company: string,
  url: string,
  linkedin_url: string,
  title: string,
  industry: string,
  specialty: string,
  expertise: text,
  ideal_customer: text,
  reputation_score: int,
  notes: text,
  created_at: timestamp,
  updated_at: timestamp
}

Referrals
referrals: {
  id: uuid (pk),
  from_user: fk -> users.id,
  to_contact: fk -> contacts.id,
  type: string,
  location: string,
  status: enum('pending','accepted','closed'),
  details: text,
  value: numeric,
  created_at: timestamp,
  updated_at: timestamp
}

Meetings
meetings: {
  id: uuid (pk),
  user_id: fk -> users.id,
  contact_id: fk -> contacts.id,
  datetime: timestamp,
  location: string,
  summary: text,
  transcript: text,
  action_items: text[],
  created_at: timestamp,
  updated_at: timestamp
}

Tasks
tasks: {
  id: uuid (pk),
  user_id: fk -> users.id,
  contact_id: fk -> contacts.id,
  description: text,
  due_date: timestamp,
  status: enum('open','done'),
  created_at: timestamp
}

3. Core Features – Development Tasks
3.1 Onboarding

 User profile form (industry, specialty, goals, etc.)

 Connect email (Google OAuth + Outlook OAuth).

 Walkthrough wizard → store completion status in users.

3.2 Contacts Database

 Add contact form + upload business card (OCR → parse data).

 Auto-enrichment (LinkedIn scrape + company site metadata).

 Store notes via voice dictation (AI transcribe → contacts.notes).

 Display enriched profile (UI table w/ Tailwind).

3.3 AI Matching Engine

 Endpoint: /api/match → takes query (“Find me tax attorney in CA”).

 Use embeddings + filters (industry, state, expertise).

 Return ranked list w/ explanations.

 Capture thumbs up/down → store in contacts.feedback.

3.4 Referral Management

 Send referral: /api/referrals/create w/ form for type, location, notes.

 Receive referral: trigger webhook/email → notify user.

 Referral summary page → show referral history + stats from DB.

3.5 Meetings & Scheduling

 Google Calendar integration → /api/calendar/schedule.

 Pre-call briefing page → pull contact + referral stats.

 Post-call → ingest transcript (Zoom/Meet/Teams) → AI summary → save to meetings.

 Auto-generate tasks from transcript (detect “to-do”).

3.6 Chatbot Interface

 UI: floating chat widget on all pages.

 Backend: /api/chat → OpenAI GPT model.

 Commands supported:

“Add [Contact]” → write to DB.

“Schedule call with [Contact]” → trigger calendar.

“Show referrals from [Contact]” → query DB.

3.7 Notifications & To-Dos

 Cron job/queue to check:

Unacknowledged referrals.

Tasks due today.

Reciprocity alerts (“Mandy gave you 3 referrals, you’ve given 0”).

 Send in-app + email notifications.

3.8 Email Templates

 Store templates in DB (templates table).

 AI dynamic fill (contact data, referral stats).

 UI for “send intro” → picks correct template, allows edit before send.

4. API Endpoints (Next.js API Routes)

/api/auth/* → NextAuth.js.

/api/contacts → CRUD contacts.

/api/referrals → CRUD referrals.

/api/meetings → CRUD meetings.

/api/tasks → CRUD tasks.

/api/chat → AI bot interface.

/api/calendar → scheduling integration.

5. UI Components (Tailwind + UI library)

Dashboard: referral stats, top partners, pending tasks.

Contacts Table: searchable + filters (industry, location, reputation).

Referral Card: status/progress bar + value.

Meeting View: summary + transcript + action items.

Chat Widget: persistent voice/text assistant.

Notification Bell: dropdown w/ reminders.

6. Security & Compliance

Encrypt sensitive fields (contacts.email, referrals.value).

Use dotenv for API keys.

Role-based middleware (admin, user).

GDPR/CCPA delete requests → cascade wipe user data.

7. Testing

Jest + React Testing Library for components.

Integration tests for /api/referrals and /api/match.

Mock external APIs (Google, LinkedIn, Zoom).

Do you want me to map these tasks into GitHub issues/epics (with milestones for MVP, Phase 2, Phase 3), or keep this as one consolidated dev instruction doc?

You said:
this document needs more details. It needs to include both what the stake holders need in terms of use cases and functionality and why and how the the app is going to be used. And the benefits. It also needs all the technical data. Then the AI coding app will have what it needs to design the best app.
ChatGPT said:

Perfect — what you’re describing is a full-spectrum PRD that merges:

Stakeholder-facing content → why this matters, what problems it solves, business benefits, use cases.

Developer-facing content → detailed technical instructions, schemas, API routes, feature breakdowns.

I’ll restructure the document so it reads like a blueprint for both business and engineering, while keeping it precise enough for your AI coding app to execute on.

Product Requirements Document (PRD)

Product Name: Referral Pro – AI Referral Partner Optimizer (RPO)
Version: MVP

1. Executive Summary

Referral Pro is an AI-powered SaaS platform designed to help professionals maximize referrals. It integrates contact management, AI-driven partner matching, automated meeting and follow-up tracking, and compliance-friendly referral workflows.

Why: Referrals are the #1 source of business for attorneys, financial advisors, insurance agents, and CPAs, yet existing tools either track sales leads or promote consumer referrals (BNI, LinkedIn, Referral Rock). None focus on inter-professional referrals with AI-powered matchmaking and accountability.

Vision: Enable professionals to refer people they like, trust, and reciprocate with while using AI to handle enrichment, tracking, and nudges — so the user can focus on relationships and revenue.

Business Benefits:

Higher referral conversion rates (AI finds best-fit partners).

More revenue per user (trackable ROI).

Stronger relationships (reciprocity alerts + nudges).

Compliance built in (GDPR, HIPAA, financial industry).

Stickier user adoption (gamification, network effects).

2. Stakeholder Goals
For End Users (Attorneys, Wealth Managers, CPAs, Insurance Agents)

Save time managing referrals.

Always know who their top referral partners are.

Find high-quality partners outside of their network.

Track referrals given/received with $ value.

Get nudges to maintain reciprocity.

Prepare for meetings with AI-generated briefs.

Automate follow-ups and tasks.

For Networking Groups (BNI, Provisors, Chambers)

Offer members a tool that proves ROI of their network.

See aggregate referral stats (value generated by group).

Keep members engaged and accountable.

For Investors & Acquirers (Salesforce, Clio, Intuit, etc.)

A new vertical SaaS opportunity.

Positioned for acquisition due to unique referral-first focus.

RegTech + AI differentiation.

3. Use Cases

Add Contact: “Add Tom as a new contact.” → User snaps business card. AI enriches with LinkedIn, company data, reputation score, notes via dictation.

Find Referral Partner: “Find me a tax attorney in California.” → AI ranks partners, shows why they fit, and fills gaps in user’s network.

Send Referral: “Let John Smith know I have a referral for him.” → App asks job type, location, comments, sends structured referral.

Receive Referral: App notifies user: “You received a referral from Tom Jones.” → User sees summary + referral stats.

Schedule Meeting: “Schedule a Discovery Call with Tom.” → AI checks calendar, sends invite, sets up Zoom, creates pre-call brief.

Meeting Follow-up: After Zoom, AI ingests transcript, adds notes, assigns tasks, fills profile gaps.

Reciprocity Nudge: “You’ve received 3 referrals from Mandy, but given 0. Time to reciprocate.”

Performance Tracking: “How many referrals have I closed this month?” → Shows revenue, top partners, % closed.

AI Mentor: “What’s the best referral I can give to a family law attorney?” → AI provides industry-specific coaching.

4. Functional Requirements
Core MVP Features

User onboarding + email/calendar integration.

Contacts DB + AI enrichment (LinkedIn, websites).

AI matching engine (ranked partners + gap analysis).

Referral management (send, receive, track).

Meeting scheduling + AI summaries.

Notifications + tasks.

Basic analytics dashboard.

Chatbot interface (voice/text).

Future (Phase 2–3)

Gamification + leaderboards.

Community courses + forums.

Cross-industry compliance modules.

Networking group admin dashboards.

Marketplace for new partner discovery.

5. Benefits Summary

Efficiency: Save hours on admin work.

Accuracy: Better partner matches = higher conversion.

Growth: Expand network intelligently.

Accountability: Reciprocity nudges prevent one-sided relationships.

Compliance: Avoids legal risks in sensitive industries.

Engagement: Stickier platform via gamification + mentor AI.

6. Technical Requirements
Tech Stack

Frontend: Next.js 15, TypeScript, Tailwind, component library.

Backend: Neon (Postgres) + Drizzle ORM.

Auth: NextAuth.js (Google, Outlook, email).

AI Layer: OpenAI GPT (chat, enrichment, summarization, recommendations).

Integrations: Gmail API, Outlook API, Google Calendar, Zoom/Teams/Meet transcripts, LinkedIn profile scraping.

Security: Env vars, field encryption, GDPR/CCPA/HIPAA compliance, role-based access.

Database Schema (Drizzle ORM)

(see developer schema I provided earlier for users, contacts, referrals, meetings, tasks).

API Routes (Next.js)

/api/auth/* – NextAuth.

/api/contacts – CRUD contacts.

/api/referrals – CRUD referrals.

/api/meetings – CRUD meetings.

/api/tasks – CRUD tasks.

/api/chat – AI bot interface.

/api/calendar – scheduling.

UI Components (Tailwind + UI kit)

Dashboard (stats, tasks, referrals).

Contact profiles (enriched).

Referral cards (status/progress bar).

Meeting pages (AI summary + action items).

Chatbot widget.

Notifications dropdown.

Testing

Jest + React Testing Library for UI.

Integration tests for API routes.

Mocked external APIs (Google, LinkedIn, Zoom).

7. KPIs
Referrals given/received per user.

Referral-to-close %.

Reciprocity balance (given vs received).

Time-to-first-referral (activation metric).

DAU/WAU.

8. Risks & Mitigation

Compliance: Some industries (financial advisors) limit referral sharing → provide toggles to disable sensitive features.

Data privacy: Handle enrichment data carefully; let users opt out.

Integration complexity: Build modular API connectors.

Overlapping CRMs: Position as “referral layer” on top of CRM, not replacement.

9. Roadmap

Phase 1 (MVP): Onboarding, contacts, referrals, meetings, chatbot basics.
Phase 2: Notifications, analytics, email templates, compliance.
Phase 3: Gamification, community portal, group dashboards, advanced integrations.