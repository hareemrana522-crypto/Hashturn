import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST(request) {
  try {
    const data = await request.formData();

    // Honeypot check — bots fill this field, humans leave it blank
    const honey = data.get('_honey')?.toString() ?? '';
    if (honey) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Cloudflare Turnstile verification
    const turnstileToken = data.get('cf-turnstile-response')?.toString() ?? '';
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY ?? '1x0000000000000000000000000000000AA';

    // Only verify turnstile in production or if a real secret is provided and not in development
    const source = data.get('source')?.toString() ?? 'contact';
    if (source !== 'quote' && turnstileSecret && !turnstileSecret.startsWith('1x0000') && process.env.NODE_ENV !== 'development') {
      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: turnstileSecret,
          response: turnstileToken,
          remoteip: request.headers.get('x-forwarded-for') ?? '',
        }),
      });
      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        return NextResponse.json({ error: 'Captcha verification failed. Please try again.' }, { status: 400 });
      }
    }

    const name = data.get('name')?.toString().trim() ?? '';
    const email = data.get('email')?.toString().trim() ?? '';
    const message = data.get('message')?.toString().trim() ?? '';

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 });
    }

    const id = crypto.randomUUID();
    await sql`
      INSERT INTO submissions (id, name, email, company, budget, service, message, how, tools, timeline, source, status)
      VALUES (
        ${id}, ${name}, ${email},
        ${data.get('company')?.toString().trim() ?? ''},
        ${data.get('budget')?.toString() ?? ''},
        ${data.get('service')?.toString() ?? ''},
        ${message},
        ${data.get('how')?.toString() ?? ''},
        ${data.get('tools')?.toString().trim() ?? ''},
        ${data.get('timeline')?.toString() ?? ''},
        ${data.get('source')?.toString() ?? 'contact'},
        'new'
      )
    `;

    // Send email notification
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const source = data.get('source')?.toString() ?? 'contact';
      const company = data.get('company')?.toString().trim() ?? '';
      const budget = data.get('budget')?.toString() ?? '';
      const service = data.get('service')?.toString() ?? '';
      const timeline = data.get('timeline')?.toString() ?? '';

      const subject = source === 'quote'
        ? `New Quote Request from ${name}`
        : `New Contact Message from ${name}`;

      const html = `
        <h2 style="color:#15803D;">New ${source === 'quote' ? 'Quote Request' : 'Contact Message'}</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:15px;">
          <tr><td style="padding:8px;font-weight:bold;width:140px;">Name</td><td style="padding:8px;">${name}</td></tr>
          <tr style="background:#f9fafb;"><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;"><a href="mailto:${email}">${email}</a></td></tr>
          ${company ? `<tr><td style="padding:8px;font-weight:bold;">Company</td><td style="padding:8px;">${company}</td></tr>` : ''}
          ${service ? `<tr style="background:#f9fafb;"><td style="padding:8px;font-weight:bold;">Service</td><td style="padding:8px;">${service}</td></tr>` : ''}
          ${budget ? `<tr><td style="padding:8px;font-weight:bold;">Budget</td><td style="padding:8px;">${budget}</td></tr>` : ''}
          ${timeline ? `<tr style="background:#f9fafb;"><td style="padding:8px;font-weight:bold;">Timeline</td><td style="padding:8px;">${timeline}</td></tr>` : ''}
          <tr><td style="padding:8px;font-weight:bold;vertical-align:top;">Message</td><td style="padding:8px;">${message.replace(/\n/g, '<br>')}</td></tr>
        </table>
        <p style="margin-top:24px;font-size:13px;color:#6b7280;">Submitted via HashTurn website</p>
      `;

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'HashTurn <notifications@notify.hashturn.com>',
          to: 'hello@hashturn.com',
          reply_to: email,
          subject,
          html,
        }),
      }).catch(() => {}); // never block submission if email fails
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('Form submission error:', err);
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
