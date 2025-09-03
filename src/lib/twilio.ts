import twilio from 'twilio';

export class TwilioService {
  private client: twilio.Twilio;
  private phoneNumber: string;

  constructor(accountSid: string, authToken: string, phoneNumber: string) {
    this.client = twilio(accountSid, authToken);
    this.phoneNumber = phoneNumber;
  }

  async makeCall(to: string, webhookUrl: string, customData?: Record<string, unknown>) {
    try {
      const call = await this.client.calls.create({
        to,
        from: this.phoneNumber,
        url: webhookUrl,
        statusCallback: `${webhookUrl}/status`,
        statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
        record: true,
        recordingChannels: 'dual',
        ...customData,
      });

      return {
        callSid: call.sid,
        status: call.status,
        to: call.to,
        from: call.from,
      };
    } catch (error) {
      console.error('Twilio call error:', error);
      throw error;
    }
  }

  async getCallRecording(callSid: string) {
    try {
      const recordings = await this.client.recordings.list({
        callSid,
        limit: 1,
      });

      if (recordings.length > 0) {
        const recording = recordings[0];
        return {
          recordingSid: recording.sid,
          duration: recording.duration,
          url: `https://api.twilio.com${recording.uri.replace('.json', '.mp3')}`,
        };
      }

      return null;
    } catch (error) {
      console.error('Error fetching recording:', error);
      throw error;
    }
  }

  async sendSMS(to: string, message: string) {
    try {
      const sms = await this.client.messages.create({
        to,
        from: this.phoneNumber,
        body: message,
      });

      return {
        messageSid: sms.sid,
        status: sms.status,
        to: sms.to,
        from: sms.from,
      };
    } catch (error) {
      console.error('Twilio SMS error:', error);
      throw error;
    }
  }

  async getCallStatus(callSid: string) {
    try {
      const call = await this.client.calls(callSid).fetch();
      return {
        callSid: call.sid,
        status: call.status,
        duration: call.duration,
        startTime: call.startTime,
        endTime: call.endTime,
        direction: call.direction,
      };
    } catch (error) {
      console.error('Error fetching call status:', error);
      throw error;
    }
  }
}
