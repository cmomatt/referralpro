import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { referrals } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const allReferrals = await db.select().from(referrals);

    const formattedReferrals = allReferrals.map(referral => ({
      id: referral.id,
      referrer_id: referral.referrer_id,
      referee_email: referral.referee_email
    }));

    return NextResponse.json({
      success: true,
      data: formattedReferrals,
      count: formattedReferrals.length
    });
  } catch (error) {
    console.error('Error fetching referrals:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      user_id, 
      contact_id, 
      status, 
      description, 
      value, 
      commission_rate, 
      expected_close_date, 
      actual_close_date, 
      notes 
    } = body;

    if (!user_id || !contact_id || !status) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: user_id, contact_id, status'
        },
        { status: 400 }
      );
    }

    const newReferral = await db.insert(referrals).values({
      id: crypto.randomUUID(),
      referrer_id: user_id,
      referee_email: contact_id + '@example.com'
    }).returning();

    return NextResponse.json({
      success: true,
      data: newReferral[0],
      message: 'Referral created successfully'
    });
  } catch (error) {
    console.error('Error creating referral:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
