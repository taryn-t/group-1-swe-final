
'use client'
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyEmail() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get('token');
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) return;
      const res = await fetch(`/api/2fa/verify-email?token=${token}`);
      const data = await res.json();
      if (data.success) {
        setMessage("Email verified! You can now log in.");
        setTimeout(redirectSignIn, 1500);
      } else {
        setMessage("Invalid or expired token.");
        setTimeout(redirectRegister, 1500);
      }
    };
    verifyEmail();
  }, [token]);



  function redirectSignIn(){
    router.push('/sign-in')
  }
  
  function redirectRegister(){
    router.push('/create-account')
  }

  if(token){
      return (
        <div className="w-full h-full min-h-screen min-w-screen grid place-items-center">
        <h1 className="text-center w-fit">{message}</h1>
        </div>
    );
  }
  else{
    return(
        <div className="w-full h-full min-h-screen min-w-screen grid place-items-center">
            <h1 className="text-center">Check your email for a verification link</h1>
        </div>
    )
  }

}

function redirectTimer(): void {
    throw new Error("Function not implemented.");
}
