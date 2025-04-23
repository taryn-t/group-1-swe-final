import { NextResponse } from 'next/server';
import QRCode from 'qrcode';
import speakeasy, { GeneratedSecret } from 'speakeasy';

export async function GET(): Promise<Response> {
  const secret: GeneratedSecret = speakeasy.generateSecret({
    name: "SWEGroup1",
  });

  if (!secret.otpauth_url) {
    return NextResponse.json({ error: 'Failed to generate OTP URL' }, { status: 500 });
  }

  const data: string = await QRCode.toDataURL(secret.otpauth_url);

  return NextResponse.json({
    data,
    secret: secret.base32,
    status: 200,
  });
}