import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { referrals } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const referral = await db
      .select()
      .from(referrals)
      .where(eq(referrals.id, params.id))
      .limit(1);

    if (referral.length === 0) {
      return NextResponse.json(
        { error: 'Referral not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: referral[0]
    });
  } catch (error) {
    console.error('Error fetching referral:', error);
    return NextResponse.json(
      { error: 'Failed to fetch referral' },
      { status: 500 }
    );
  }
}
