import { NextRequest, NextResponse } from 'next/server';
import speakeasy from 'speakeasy';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth'; 
import User from '@/models/User'; 
import { decrypt, encrypt } from '@/utils/encryption';
export const runtime = 'edge';
interface Verify2FABody {
  token: string;
  email?: string; // ⬅️ Needed for login path
  secret?: string; // ⬅️ Used when enabling 2FA
}

export async function POST(req: NextRequest): Promise<Response> {
  const { token, email, secret }: Verify2FABody = await req.json();
  const session = await getServerSession(authOptions);

  let verified: boolean;

  // 1. Verifying during LOGIN (no session yet)
  if (email ) {
    const user = await User.findOne({ email });
  
    if (!user) {
      return NextResponse.json({ verified: false, message: 'User not found' }, { status: 404 });
    }
    if(user.twoFactorSecret){
      let decryptedSecret: string;
      try {
        decryptedSecret = await decrypt(user.twoFactorSecret);
      } catch (err) {
        return NextResponse.json({ verified: false, message: 'Secret decryption failed' }, { status: 500 });
      }
    
      verified = speakeasy.totp.verify({
        secret: decryptedSecret,
        encoding: 'base32',
        token,
        window: 1,
      });
    
      return NextResponse.json({ verified });
    }
    // if (!user.twoFactorSecret) {
    //   return NextResponse.json({ verified: false, message: '2FA not set up' }, { status: 400 });
    // }
  
   
  }

  // 2. Enabling 2FA for the first time (user is logged in)
  if (session?.user?.email && secret) {
    verified = speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
      window: 1,
    });

    if (verified) {
      const encrypted = await encrypt(secret);

      await User.findOneAndUpdate(
        { email: session.user.email },
        { twoFactorSecret: encrypted }
      );
    }

    return NextResponse.json({ verified });
  }

  return NextResponse.json({ verified: false, message: 'Invalid request' }, { status: 400 });
}