import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { contacts } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const allContacts = await db.select().from(contacts);

    const formattedContacts = allContacts.map(contact => ({
      id: contact.id,
      userId: contact.userId,
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phone: contact.phone,
      company: contact.company,
      title: contact.title,
      website: contact.website,
      linkedinUrl: contact.linkedinUrl,
      industry: contact.industry,
      specialty: contact.specialty,
      expertise: contact.expertise,
      idealCustomer: contact.idealCustomer,
      reputationScore: contact.reputationScore,
      notes: contact.notes
    }));

    return NextResponse.json({
      success: true,
      data: formattedContacts,
      count: formattedContacts.length
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
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
      first_name, 
      last_name, 
      email, 
      phone, 
      company, 
      title, 
      website, 
      linkedin_url, 
      industry, 
      specialty, 
      expertise, 
      ideal_customer, 
      reputation_score, 
      notes 
    } = body;

    if (!user_id || !first_name || !last_name) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: user_id, first_name, last_name'
        },
        { status: 400 }
      );
    }

    const newContact = await db.insert(contacts).values({
      id: crypto.randomUUID(),
      userId: user_id,
      firstName: first_name,
      lastName: last_name,
      email: email || null,
      phone: phone || null,
      company: company || null,
      title: title || null,
      website: website || null,
      linkedinUrl: linkedin_url || null,
      industry: industry || null,
      specialty: specialty || null,
      expertise: expertise || null,
      idealCustomer: ideal_customer || null,
      reputationScore: reputation_score || null,
      notes: notes || null,
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning();

    return NextResponse.json({
      success: true,
      data: newContact[0],
      message: 'Contact created successfully'
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
