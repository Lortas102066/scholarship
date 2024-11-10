import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import dbConnect from '@/utils/database';
import emailList from '@/models/emailList';

export async function POST(request: Request) {
  await dbConnect();
  const { email } = await request.json();

  try {
    const existingSubscription = await emailList.findOne({ email });
    if (existingSubscription) {
      console.log('Email already exists, skipping...');
      return NextResponse.json({ message: 'Email already exists, skipping email send.' });
    }
  } catch (error) {
    console.error('Error querying database:', error);
    return NextResponse.json({ error: 'Database query error.' }, { status: 500 });
  }

  try {
    const newSubscription = new emailList({ email });
    await newSubscription.save();
  } catch (error) {
    console.error('Error saving to database:', error);
    return NextResponse.json({ error: 'Database error during saving.' }, { status: 500 });
  }

  try {
    await sendEmail({ to: email });
    return NextResponse.json({ message: 'メールを送信しました。' });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.error();
  }
}

const sendEmail = async ({ to }: { to: string }) => {
  const { SMTP_PASSWORD, SMTP_EMAIL } = process.env;
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  try {
    const testResult = await transport.verify();
    console.log("Test result: ", testResult);
    await transport.sendMail({
      from: SMTP_EMAIL,
      to: to,
      subject: "ご登録ありがとうございます",
      text: "Scholarにようこそ!",
    });
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Failed to send email');
  }
}
