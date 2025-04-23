"use client";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import TwoFactorModal from "@/components/ADmin/twofa";


export default function SignIn() {

  const [error, setError] = useState("");
  const [signedIn, setSignedIn] = useState(false)
  const [email, setEmail] = useState<any>()

  const router = useRouter();


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    const formData = new FormData(event.currentTarget);


    const res = await signIn("credentials", {

      email: formData.get("email"),

      password: formData.get("password"),

      redirect: false,

    });

    if (res?.error) {

      setError(res.error as string);

    }

    if (res?.ok) {
      let em = formData.get("email")
      console.log(em)
      setEmail(em)
      setSignedIn(true)

    }

};

    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form  className="space-y-6" onSubmit={handleSubmit}>
            {error && <div className="text-red-700">{error}</div>}
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
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-marshall-600 hover:text-marshall-500">
                      Forgot password?
                    </a>
                  </div>
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
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-marshall-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-marshall-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marshall-600"
                >
                  Sign in
                </button>
              </div>
            </form>
            
            <p className="mt-4 text-center text-sm/6 text-gray-500">
              <a href="/create-account" className="font-semibold text-marshall-600 hover:text-marshall-500">
                Create an account
              </a>
            </p>
          </div>
        </div>

        {
          signedIn ? <TwoFactorModal email={email} /> : <></>
        }
      </>
    )
  }