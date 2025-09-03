export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  businessName: string;
  creditScore?: number;
  fundingNeeded?: number;
  monthlyRevenue?: number;
  timeInBusiness?: number;
  status: 'new' | 'contacted' | 'qualified' | 'unqualified' | 'converted';
  source: 'voice_call' | 'manual' | 'import';
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
  callRecordings?: CallRecording[];
}

export interface CallRecording {
  id: string;
  leadId: string;
  callId: string;
  duration: number;
  recordingUrl: string;
  transcript?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  createdAt: Date;
}

export interface CallAnalytics {
  totalCalls: number;
  successfulCalls: number;
  qualifiedLeads: number;
  conversionRate: number;
  averageCallDuration: number;
  costPerCall: number;
  totalCost: number;
  dateRange: {
    start: Date;
    end: Date;
  };
}

export interface VoiceAgent {
  id: string;
  name: string;
  description: string;
  script: string;
  voiceSettings: {
    voice: string;
    speed: number;
    pitch: number;
  };
  isActive: boolean;
  createdAt: Date;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  voiceAgentId: string;
  leadList: string[];
  status: 'draft' | 'active' | 'paused' | 'completed';
  scheduledStart?: Date;
  scheduledEnd?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface WebhookPayload {
  event: string;
  data: Record<string, unknown>;
  timestamp: Date;
}
