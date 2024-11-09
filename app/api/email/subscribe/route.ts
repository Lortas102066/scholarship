import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: Request) {
  const { email } = await request.json();
  console.log('Sending email to:', email);
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: '登録ありがとうございます',
      html: 
      '<p>ご登録ありがとうございます<strong>first email</strong>!</p>'
    });
    return NextResponse.json({ message: 'メールを送信しました。' });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.error();
  }
}
