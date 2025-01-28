
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { recipientName, emailPurpose, keyPoints } = await request.json()
    
    
    const getMockEmail = (purpose: string) => {
      const templates = {
        'meeting-request': `
Dear ${recipientName},

I hope this email finds you well. I would like to schedule a meeting to discuss: ${keyPoints}.

Would you be available for a 30-minute meeting next week? Please let me know what times work best for you.

Best regards,
[Your Name]`,
        
        'follow-up': `
Dear ${recipientName},

I hope you're doing well. I'm following up regarding our previous discussion about: ${keyPoints}.

I wanted to ensure we're aligned on the next steps and see if you have any questions.

Best regards,
[Your Name]`,
        
        'thank-you': `
Dear ${recipientName},

I wanted to express my sincere thanks regarding ${keyPoints}.

Your support and contribution have been invaluable.

Best regards,
[Your Name]`
      }
      
      return templates[purpose as keyof typeof templates] || templates['meeting-request']
    }

    const mockEmail = getMockEmail(emailPurpose)

    return NextResponse.json({ email: mockEmail })
  } catch (error) {
    console.error('Error generating email:', error)
    return NextResponse.json(
      { error: 'Failed to generate email' },
      { status: 500 }
    )
  }
}