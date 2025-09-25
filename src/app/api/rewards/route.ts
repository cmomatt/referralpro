import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { referralRewards } from '@/lib/schema';

export async function GET() {
  try {
    const allRewards = await db.select().from(referralRewards);

    const formattedRewards = allRewards.map(reward => ({
      id: reward.id,
      referralId: reward.referralId,
      type: reward.type,
      amount: reward.amount,
      description: reward.description,
      status: reward.status
    }));

    return NextResponse.json({
      success: true,
      data: formattedRewards,
      count: formattedRewards.length
    });
  } catch (error) {
    console.error('Error fetching rewards:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
