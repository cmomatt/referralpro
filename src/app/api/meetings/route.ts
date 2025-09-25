import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { meetings } from '@/lib/schema';

export async function GET() {
  try {
    const allMeetings = await db.select().from(meetings);

    const formattedMeetings = allMeetings.map(meeting => ({
      id: meeting.id,
      userId: meeting.userId,
      contactId: meeting.contactId,
      title: meeting.title,
      description: meeting.description,
      datetime: meeting.datetime,
      duration: meeting.duration,
      status: meeting.status
    }));

    return NextResponse.json({
      success: true,
      data: formattedMeetings,
      count: formattedMeetings.length
    });
  } catch (error) {
    console.error('Error fetching meetings:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
