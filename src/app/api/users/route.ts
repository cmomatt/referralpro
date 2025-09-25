import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const allUsers = await db.select().from(users);

    const formattedUsers = allUsers.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email
    }));

    return NextResponse.json({
      success: true,
      data: formattedUsers,
      count: formattedUsers.length
    });
  } catch (error) {
    console.error('Error fetching users:', error);
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
    const { first_name, last_name, email, industry, specialty, goals } = body;

    if (!first_name || !last_name || !email) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: first_name, last_name, email'
        },
        { status: 400 }
      );
    }

    const newUser = await db.insert(users).values({
      id: crypto.randomUUID(),
      email,
      name: `${first_name} ${last_name}`,
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning();

    return NextResponse.json({
      success: true,
      data: newUser[0],
      message: 'User created successfully'
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
