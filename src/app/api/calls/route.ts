import { NextRequest, NextResponse } from 'next/server';
import { VapiService } from '@/lib/vapi';
import { GoHighLevelService } from '@/lib/gohighlevel';

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, leadData, campaignId } = await request.json();

    if (!phoneNumber) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    // Initialize services
    const vapiService = new VapiService(process.env.VAPI_API_KEY!);
    const ghlService = new GoHighLevelService(
      process.env.GOHIGHLEVEL_API_KEY!,
      process.env.GOHIGHLEVEL_LOCATION_ID!
    );

    // Create or get contact in GoHighLevel
    let contact = await ghlService.getContactByPhone(phoneNumber);
    
    if (!contact) {
      contact = await ghlService.createContact({
        firstName: leadData?.firstName || 'Unknown',
        lastName: leadData?.lastName || 'Lead',
        phone: phoneNumber,
        email: leadData?.email,
        companyName: leadData?.businessName,
        tags: ['voice-campaign', 'mca-lead'],
        customFields: {
          creditScore: leadData?.creditScore,
          fundingNeeded: leadData?.fundingNeeded,
          monthlyRevenue: leadData?.monthlyRevenue,
          timeInBusiness: leadData?.timeInBusiness,
        },
      });
    }

    // Create Vapi call
    const call = await vapiService.createCall(
      phoneNumber,
      process.env.VAPI_ASSISTANT_ID!,
      {
        contactId: contact.id,
        leadData,
        campaignId,
      }
    );

    // Add note to contact
    await ghlService.addNote(
      contact.id,
      `Voice call initiated via AI automation. Call ID: ${call.id}`,
    );

    return NextResponse.json({
      success: true,
      callId: call.id,
      contactId: contact.id,
      status: 'initiated',
    });

  } catch (error) {
    console.error('Call initiation error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate call' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const callId = searchParams.get('callId');

    if (!callId) {
      return NextResponse.json(
        { error: 'Call ID is required' },
        { status: 400 }
      );
    }

    const vapiService = new VapiService(process.env.VAPI_API_KEY!);
    const callStatus = await vapiService.getCallStatus(callId);

    return NextResponse.json({
      success: true,
      call: callStatus,
    });

  } catch (error) {
    console.error('Call status error:', error);
    return NextResponse.json(
      { error: 'Failed to get call status' },
      { status: 500 }
    );
  }
}
