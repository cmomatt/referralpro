import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { referrals } from '@/lib/schema';
import { eq, sql } from 'drizzle-orm';

export async function GET() {
  try {
    const allReferrals = await db.select().from(referrals);

    const formattedReferrals = allReferrals.map(referral => ({
      id: referral.id,
      referrerId: referral.referrerId,
      refereeEmail: referral.refereeEmail,
      refereeName: referral.refereeName,
      status: referral.status,
      notes: referral.notes,
      createdAt: referral.createdAt,
      updatedAt: referral.updatedAt,
      completedAt: referral.completedAt
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
      referrer_id,
      referee_email,
      referee_name,
      status,
      notes
    } = body;

    if (!referrer_id || !referee_email || !status) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: referrer_id, referee_email, status'
        },
        { status: 400 }
      );
    }

    // Use a simple insert without specifying all fields to avoid type conflicts
    const result = await db.execute(sql`
      INSERT INTO referrals (referrer_id, referee_email, referee_name, status, notes, created_at, updated_at)
      VALUES (${referrer_id}, ${referee_email}, ${referee_name || null}, ${status}, ${notes || null}, NOW(), NOW())
      RETURNING *
    `);

    return NextResponse.json({
      success: true,
      data: result.rows[0],
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
