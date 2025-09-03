// Vapi.ai integration for voice automation
export class VapiService {
  private apiKey: string;
  private baseUrl = 'https://api.vapi.ai';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async createCall(phoneNumber: string, assistantId: string, customerData?: Record<string, unknown>) {
    const response = await fetch(`${this.baseUrl}/call`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumberId: assistantId,
        customer: {
          number: phoneNumber,
          ...customerData,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Vapi API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getCallStatus(callId: string) {
    const response = await fetch(`${this.baseUrl}/call/${callId}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Vapi API error: ${response.statusText}`);
    }

    return response.json();
  }

  async createAssistant(config: {
    name: string;
    model: string;
    voice: string;
    firstMessage: string;
    systemMessage: string;
    endCallMessage?: string;
    endCallPhrases?: string[];
  }) {
    const response = await fetch(`${this.baseUrl}/assistant`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    });

    if (!response.ok) {
      throw new Error(`Vapi API error: ${response.statusText}`);
    }

    return response.json();
  }

  async updateAssistant(assistantId: string, updates: Record<string, unknown>) {
    const response = await fetch(`${this.baseUrl}/assistant/${assistantId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error(`Vapi API error: ${response.statusText}`);
    }

    return response.json();
  }
}

// MCA-specific voice agent configuration
export const mcaVoiceAgentConfig = {
  name: 'MCA Lead Qualification Agent',
  model: 'gpt-4',
  voice: 'sarah',
  firstMessage: 'Hello! This is Sarah from Business Funding Solutions. I\'m calling to discuss a quick funding opportunity for your business. Do you have a moment to talk?',
  systemMessage: `You are a professional business funding specialist calling to qualify leads for merchant cash advances.

Your goal is to:
1. Qualify the business owner
2. Understand their funding needs
3. Assess their creditworthiness
4. Schedule a follow-up if qualified

Key qualification questions:
- What type of business do you own?
- How long have you been in business?
- What's your monthly revenue?
- Do you have any existing business loans?
- What's your credit score range?
- How much funding are you looking for?
- What would you use the funds for?

Be professional, friendly, and efficient. If they're not interested, politely end the call.
If they're qualified, get their email and schedule a follow-up call.`,
  endCallMessage: 'Thank you for your time today. Have a great day!',
  endCallPhrases: [
    'not interested',
    'not a good time',
    'call back later',
    'remove me from your list',
    'stop calling',
  ],
};
