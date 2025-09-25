export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Referral {
  id: string;
  referrerId: string;
  refereeEmail: string;
  refereeName?: string;
  status: 'pending' | 'contacted' | 'accepted' | 'rejected' | 'completed';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export interface ReferralReward {
  id: string;
  referralId: string;
  type: 'cash' | 'credit' | 'gift' | 'other';
  amount?: number;
  description: string;
  status: 'pending' | 'paid' | 'cancelled';
  paidAt?: Date;
}
