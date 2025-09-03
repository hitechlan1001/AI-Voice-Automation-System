import { NextRequest, NextResponse } from 'next/server';
import { GoHighLevelService } from '@/lib/gohighlevel';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // This would typically fetch from your database
    // For now, we'll return a mock response
    const leads = [
      {
        id: '1',
        name: 'John Smith',
        phone: '+1234567890',
        email: 'john@example.com',
        businessName: 'Smith Auto Repair',
        creditScore: 720,
        fundingNeeded: 50000,
        monthlyRevenue: 15000,
        timeInBusiness: 5,
        status: 'qualified',
        source: 'voice_call',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    return NextResponse.json({
      success: true,
      leads: leads.slice(offset, offset + limit),
      total: leads.length,
      hasMore: offset + limit < leads.length,
    });

  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const leadData = await request.json();

    const ghlService = new GoHighLevelService(
      process.env.GOHIGHLEVEL_API_KEY!,
      process.env.GOHIGHLEVEL_LOCATION_ID!
    );

    // Create contact in GoHighLevel
    const contact = await ghlService.createContact({
      firstName: leadData.firstName,
      lastName: leadData.lastName,
      phone: leadData.phone,
      email: leadData.email,
      companyName: leadData.businessName,
      tags: ['manual-entry', 'mca-lead'],
      customFields: {
        creditScore: leadData.creditScore,
        fundingNeeded: leadData.fundingNeeded,
        monthlyRevenue: leadData.monthlyRevenue,
        timeInBusiness: leadData.timeInBusiness,
      },
    });

    return NextResponse.json({
      success: true,
      lead: {
        id: contact.id,
        ...leadData,
        status: 'new',
        source: 'manual',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    );
  }
}
