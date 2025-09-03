# AI Voice Automation System for MCA Lead Generation

A comprehensive Next.js application for automating merchant cash advance (MCA) lead generation through AI-powered voice calls.

## Features

### Core Functionality (MVP)
- ✅ AI voice agent for outbound calls using Vapi.ai integration
- ✅ Lead qualification flows (credit score, funding needs, business info)
- ✅ GoHighLevel CRM integration via webhooks
- ✅ Call recording and basic analytics
- ✅ Conversation scripting based on proven sales scripts

### Enhanced Features
- 🔄 Handle 100,000+ calls/month capacity
- 🔄 Multi-channel follow-up (SMS, email integration)
- 🔄 A/B testing capabilities for scripts
- 🔄 Real-time lead scoring
- 🔄 Twilio integration for telephony
- 🔄 Kosovo/offshore infrastructure deployment support

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Voice AI**: Vapi.ai integration
- **Telephony**: Twilio
- **CRM**: GoHighLevel API
- **Analytics**: Recharts
- **Forms**: React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Vapi.ai account and API key
- Twilio account and credentials
- GoHighLevel account and API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-voice-automation
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
# Vapi.ai Configuration
VAPI_API_KEY=your_vapi_api_key_here
VAPI_ASSISTANT_ID=your_assistant_id_here

# Twilio Configuration
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# GoHighLevel Configuration
GOHIGHLEVEL_API_KEY=your_gohighlevel_api_key
GOHIGHLEVEL_LOCATION_ID=your_location_id

# Database Configuration
DATABASE_URL=your_database_url

# Next.js Configuration
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── calls/           # Call management endpoints
│   │   ├── leads/           # Lead management endpoints
│   │   └── webhooks/        # Webhook handlers
│   └── page.tsx             # Main dashboard
├── components/
│   ├── CallAnalytics.tsx    # Analytics dashboard
│   ├── LeadList.tsx         # Lead management interface
│   ├── CampaignManager.tsx  # Campaign management
│   └── VoiceAgentSettings.tsx # Voice agent configuration
├── lib/
│   ├── vapi.ts             # Vapi.ai integration
│   ├── twilio.ts           # Twilio integration
│   └── gohighlevel.ts      # GoHighLevel CRM integration
└── types/
    └── index.ts            # TypeScript type definitions
```

## API Endpoints

### Calls
- `POST /api/calls` - Initiate a new call
- `GET /api/calls?callId=<id>` - Get call status

### Leads
- `GET /api/leads` - Fetch leads with filtering
- `POST /api/leads` - Create a new lead

### Webhooks
- `POST /api/webhooks/vapi` - Handle Vapi.ai webhooks

## Voice Agent Configuration

The system includes a pre-configured MCA lead qualification agent with:

- Professional greeting and introduction
- Qualification questions for business type, revenue, credit score
- Funding needs assessment
- Follow-up scheduling
- Polite call termination

## CRM Integration

### GoHighLevel Integration
- Automatic contact creation
- Lead qualification data sync
- Opportunity creation for qualified leads
- Task creation for follow-ups
- Call notes and transcripts

## Analytics & Reporting

The dashboard provides:
- Total calls and qualified leads
- Conversion rates and cost analysis
- Call volume trends
- Lead source tracking
- Real-time campaign performance

## Deployment

### Environment Setup
1. Set up your production environment variables
2. Configure your domain and SSL certificates
3. Set up your database (PostgreSQL recommended)

### Vercel Deployment
```bash
npm run build
vercel --prod
```

### Docker Deployment
```bash
docker build -t ai-voice-automation .
docker run -p 3000:3000 ai-voice-automation
```

## Compliance & Best Practices

- TCPA compliance considerations
- Call recording consent
- Data privacy protection
- Rate limiting for API calls
- Error handling and logging

## Performance Optimization

- Database indexing for lead queries
- API response caching
- Call queue management
- Resource monitoring
- Auto-scaling configuration

## Support & Maintenance

For ongoing support and maintenance:
- Monthly retainer available
- System optimization
- Feature enhancements
- Performance monitoring
- Compliance updates

## License

This project is proprietary software. All rights reserved.

## Contact

For questions or support, please contact the development team.