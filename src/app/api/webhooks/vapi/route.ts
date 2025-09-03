import { NextRequest, NextResponse } from 'next/server';
import { GoHighLevelService } from '@/lib/gohighlevel';

export async function POST(request: NextRequest) {
  try {
    const webhookData = await request.json();
    
    console.log('Vapi webhook received:', webhookData);

    const { type, call } = webhookData;

    if (!call) {
      return NextResponse.json({ error: 'No call data' }, { status: 400 });
    }

    const ghlService = new GoHighLevelService(
      process.env.GOHIGHLEVEL_API_KEY!,
      process.env.GOHIGHLEVEL_LOCATION_ID!
    );

    switch (type) {
      case 'call-started':
        await handleCallStarted(call, ghlService);
        break;
      
      case 'call-ended':
        await handleCallEnded(call, ghlService);
        break;
      
      case 'transcript':
        await handleTranscript(call, ghlService);
        break;
      
      case 'function-call':
        await handleFunctionCall(call, ghlService);
        break;
      
      default:
        console.log('Unhandled webhook type:', type);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handleCallStarted(call: Record<string, unknown>, ghlService: GoHighLevelService) {
  const note = `AI call started at ${new Date().toISOString()}. Call ID: ${call.id}`;
  
  if ((call.customer as Record<string, unknown>)?.contactId) {
    await ghlService.addNote((call.customer as Record<string, unknown>).contactId as string, note);
  }
}

async function handleCallEnded(call: Record<string, unknown>, ghlService: GoHighLevelService) {
  const duration = call.endedAt ? 
    Math.floor((new Date(call.endedAt as string).getTime() - new Date(call.startedAt as string).getTime()) / 1000) : 0;
  
  const note = `AI call ended. Duration: ${duration}s. Status: ${call.status}. Call ID: ${call.id}`;
  
  if ((call.customer as Record<string, unknown>)?.contactId) {
    await ghlService.addNote((call.customer as Record<string, unknown>).contactId as string, note);
    
    // Create follow-up task if call was successful
    if (call.status === 'ended' && duration > 30) {
      await ghlService.createTask({
        contactId: (call.customer as Record<string, unknown>).contactId as string,
        title: 'Follow up on AI call',
        body: 'Follow up on the AI voice call that was made. Review call details and next steps.',
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
      });
    }
  }
}

async function handleTranscript(call: Record<string, unknown>, ghlService: GoHighLevelService) {
  if (call.transcript && (call.customer as Record<string, unknown>)?.contactId) {
    const note = `Call transcript: ${call.transcript}`;
    await ghlService.addNote((call.customer as Record<string, unknown>).contactId as string, note);
  }
}

async function handleFunctionCall(call: Record<string, unknown>, ghlService: GoHighLevelService) {
  // Handle function calls from the AI agent
  // This could include lead qualification data, scheduling, etc.
  
  if (call.functionCall && (call.customer as Record<string, unknown>)?.contactId) {
    const { name, parameters } = call.functionCall as Record<string, unknown>;
    
    switch (name) {
      case 'qualify_lead':
        await handleLeadQualification(parameters as Record<string, unknown>, (call.customer as Record<string, unknown>).contactId as string, ghlService);
        break;
      
      case 'schedule_follow_up':
        await handleFollowUpScheduling(parameters as Record<string, unknown>, (call.customer as Record<string, unknown>).contactId as string, ghlService);
        break;
      
      default:
        console.log('Unhandled function call:', name);
    }
  }
}

async function handleLeadQualification(
  parameters: Record<string, unknown>, 
  contactId: string, 
  ghlService: GoHighLevelService
) {
  const {
    businessType,
    timeInBusiness,
    monthlyRevenue,
    creditScore,
    fundingNeeded,
    qualified
  } = parameters;

  // Update contact with qualification data
  await ghlService.updateContact(contactId, {
    customFields: {
      businessType,
      timeInBusiness,
      monthlyRevenue,
      creditScore,
      fundingNeeded,
      qualified: qualified ? 'Yes' : 'No',
      qualificationDate: new Date().toISOString(),
    },
    tags: qualified ? ['qualified-lead', 'voice-campaign'] : ['unqualified', 'voice-campaign'],
  });

  // Create opportunity if qualified
  if (qualified) {
    await ghlService.createOpportunity({
      contactId,
      name: `MCA Funding - ${businessType}`,
      pipelineId: process.env.GOHIGHLEVEL_PIPELINE_ID || 'default',
      stageId: process.env.GOHIGHLEVEL_STAGE_ID || 'default',
      monetaryValue: fundingNeeded as number,
      customFields: {
        source: 'AI Voice Call',
        qualificationDate: new Date().toISOString(),
      },
    });
  }
}

async function handleFollowUpScheduling(
  parameters: Record<string, unknown>,
  contactId: string,
  ghlService: GoHighLevelService
) {
  const { preferredTime, notes } = parameters;
  
  await ghlService.createTask({
    contactId,
    title: 'Scheduled follow-up call',
    body: `Follow-up call scheduled for ${preferredTime}. Notes: ${notes}`,
    dueDate: new Date(preferredTime as string).toISOString(),
  });
}
