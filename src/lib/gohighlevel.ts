// GoHighLevel CRM integration
export class GoHighLevelService {
  private apiKey: string;
  private locationId: string;
  private baseUrl = 'https://rest.gohighlevel.com/v1';

  constructor(apiKey: string, locationId: string) {
    this.apiKey = apiKey;
    this.locationId = locationId;
  }

  async createContact(contactData: {
    firstName: string;
    lastName: string;
    phone: string;
    email?: string;
    companyName?: string;
    tags?: string[];
    customFields?: Record<string, unknown>;
  }) {
    const response = await fetch(`${this.baseUrl}/contacts/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        locationId: this.locationId,
        ...contactData,
      }),
    });

    if (!response.ok) {
      throw new Error(`GoHighLevel API error: ${response.statusText}`);
    }

    return response.json();
  }

  async updateContact(contactId: string, updates: Record<string, unknown>) {
    const response = await fetch(`${this.baseUrl}/contacts/${contactId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error(`GoHighLevel API error: ${response.statusText}`);
    }

    return response.json();
  }

  async createOpportunity(opportunityData: {
    contactId: string;
    name: string;
    pipelineId: string;
    stageId: string;
    monetaryValue?: number;
    customFields?: Record<string, unknown>;
  }) {
    const response = await fetch(`${this.baseUrl}/opportunities/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        locationId: this.locationId,
        ...opportunityData,
      }),
    });

    if (!response.ok) {
      throw new Error(`GoHighLevel API error: ${response.statusText}`);
    }

    return response.json();
  }

  async addNote(contactId: string, note: string, userId?: string) {
    const response = await fetch(`${this.baseUrl}/contacts/${contactId}/notes`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        body: note,
        userId,
      }),
    });

    if (!response.ok) {
      throw new Error(`GoHighLevel API error: ${response.statusText}`);
    }

    return response.json();
  }

  async createTask(taskData: {
    contactId: string;
    title: string;
    body?: string;
    dueDate?: string;
    assignedTo?: string;
  }) {
    const response = await fetch(`${this.baseUrl}/contacts/${taskData.contactId}/tasks`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      throw new Error(`GoHighLevel API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getContactByPhone(phone: string) {
    const response = await fetch(`${this.baseUrl}/contacts/search`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        locationId: this.locationId,
        query: phone,
      }),
    });

    if (!response.ok) {
      throw new Error(`GoHighLevel API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.contacts?.find((contact: Record<string, unknown>) => contact.phone === phone);
  }

  async sendWebhook(webhookUrl: string, payload: Record<string, unknown>) {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error('Webhook failed:', response.statusText);
      }

      return response.ok;
    } catch (error) {
      console.error('Webhook error:', error);
      return false;
    }
  }
}
