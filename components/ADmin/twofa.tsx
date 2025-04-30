'use client';

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, ChangeEvent } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || ''; // Ensure you use NEXT_PUBLIC_ for frontend env vars

interface TwoFABody {
  data: string;
  secret: string;
  status: number;
}

interface VerifyResponse {
  verified: boolean;
}

interface Props{
  email: string | undefined;
}

function TwoFactorModal({email}:Props){
  const [otp, setOtp] = useState('');
  const [invalidOtp, setInvalidOtp] = useState(false);
  const [qrImage, setQrImage] = useState('');
  const [secret, setSecret] = useState('');
  const [tries, setTries] = useState(0)
  const router = useRouter()
      // const { update } = useSession();



  /* Generate a QR */
  const get2faQrCode = async () => {
    const response = await fetch(`${BASE_URL}/api/2fa/qrcode`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data: TwoFABody = await response.json();

    if (response.status === 200) {
      setQrImage(data.data);
      setSecret(data.secret);
    }
  };

  useEffect(() => {
    get2faQrCode();
  }, []);
  /* Validate Code */
  const handleOtpChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOtp(value);

    if (value.length === 6) {
      const token = value;
      

      const response = await fetch(`/api/2fa/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ secret, email, token }),
      });

      const result: VerifyResponse = await response.json();
      console.log(result)
      if (result.verified) {
        setInvalidOtp(false);
        // await update({ verified: true });
        router.push('/')
      } 
      else if(tries <5)
        {
        setTries(tries+1)
        setInvalidOtp(true);
      }
    }
  };

  return (
    <div className='flex absolute w-screen h-screen items-center bg-white  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
      <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg z-[60] ">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex flex-1 justify-center items-center p-4 text-white rounded-md">
            {qrImage && (
              <img src={qrImage} alt="2FA QR Code" className='rounded-lg border-2' />
            )}
          </div>

          <div className="flex-1 p-4 text-white rounded-md">
            <p className="text-2xl text-gray-700 font-bold mb-4">
              Use an Authenticator App to enable 2FA
            </p>
            <ul className="list-none list-inside mb-4 text-gray-700">
              <li className="mb-2">
                <span className="font-bold">Step 1:</span> Scan the QR Code with your Authenticator app.
              </li>
              <li className="mb-2">
                <span className="font-bold">Step 2:</span> Enter the code below from your app.
              </li>
            </ul>

            <input
              type="text"
              value={otp}
              onChange={handleOtpChange}
              className="border rounded px-3 py-2 text-black"
              maxLength={6}
            />

            {invalidOtp && (
              <p className="mt-3 text-red-500 text-sm text-center">*Invalid Code</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorModal;