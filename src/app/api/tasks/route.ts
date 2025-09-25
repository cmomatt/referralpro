import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { tasks } from '@/lib/schema';

export async function GET() {
  try {
    const allTasks = await db.select().from(tasks);

    const formattedTasks = allTasks.map(task => ({
      id: task.id,
      userId: task.userId,
      contactId: task.contactId,
      referralId: task.referralId,
      meetingId: task.meetingId,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      status: task.status,
      priority: task.priority
    }));

    return NextResponse.json({
      success: true,
      data: formattedTasks,
      count: formattedTasks.length
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
