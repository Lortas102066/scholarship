import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { email } = await request.json();
  try {
    sendEmail({to: email});
    return NextResponse.json({ message: 'メールを送信しました。' });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.error();
  }
}

const sendEmail = async ({to}: {to: string}) => {
  const {SMTP_PASSWORD, SMTP_EMAIL} = process.env;
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD
    }
  });
  try {
    const testResult = await transport.verify();
    console.log("Test result: ", testResult);
  } catch (error) {
    console.error('Failed to send email:', error);
  }

  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to: to,
      subject: "ご登録ありがとうございます",
      text: "Scholarにようこそ!",
    });
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}
