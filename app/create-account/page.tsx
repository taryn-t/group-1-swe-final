"use client";

import {  useRef, useState } from "react";

import { useRouter } from "next/navigation";

import Link from "next/link";

import { register } from "@/actions/register";
import TwoFactorModal from "@/components/ADmin/twofa";


export default function CreateAccount() {

  const [error, setError] = useState<string>();
  const [signedIn, setCreated] = useState(false)

  const router = useRouter();

  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {

      if(formData.get("password") !== formData.get('passwordCheck') ){

        setError("Passwords do not match");
        return
        
      }
        

    const r = await register({

        email: formData.get("email"),

        password: formData.get("password"),

        name: formData.get("name"),

      });

      ref.current?.reset();

      if(r?.error){

        setError(r.error);

        return;

      } else {
        router.push("/sign-in")

      //   const res = await signIn("credentials", {
        
      //         email: formData.get("email"),
        
      //         password: formData.get("password"),
        
      //         redirect: false,
        
      //       });
        
      //       if (res?.error) {
        
      //         setError(res.error as string);
        
      //       }
        
      //       if (res?.ok) {
      //         // let em = formData.get('email')
      //         // setEmail(em)
      //         // setCreated(true)
        
      //       }

      }

};

    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Create Account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm md:max-w-md ">
            <form  className="space-y-6" ref = {ref} action={handleSubmit}>
            {error && <div className="text-red-700">{error}</div>}
            <div className="grid grid-cols-1 gap-1">
              <div>
                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                  Full name
                </label>
                <div className="mt-2">
                  <input
                    id="fname"
                    name="name"
                    type="text"
                    required
                    autoComplete="givenName"
                    className="block w-full border border-gray-400 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-marshall-600 sm:text-sm/6"
                  />
                </div>
              </div>
              
            </div>
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full border border-gray-400 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-marshall-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                    Password
                  </label>
                  
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full border border-gray-400 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-marshall-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="passwordCheck" className="block text-sm/6 font-medium text-gray-900">
                    Retype password
                  </label>
                  
                </div>
                <div className="mt-2">
                  <input
                    id="passwordCheck"
                    name="passwordCheck"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full border border-gray-400 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-marshall-600 sm:text-sm/6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-marshall-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-marshall-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marshall-600"
                >
                  Sign Up
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already have an account? 
              <Link href="/sign-in" className="font-semibold text-marshall-600 hover:text-marshall-500 pl-1">
                Sign in
              </Link>
            </p>
          </div>
        </div>
        
        {
          signedIn ? <TwoFactorModal email={undefined} /> : <></>
        }
      </>
    )
  }