"use client";

import {  useRef, useState } from "react";

import { useRouter } from "next/navigation";

import Link from "next/link";

import { register } from "@/actions/register";
import TwoFactorModal from "@/components/ADmin/twofa";
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'


type SelectInputType ={
  label: string,
  items: Array<{id:number, name: string}>
}

const data = {
  label: "",
  items:[
    {
      id: 1,
      name: 'Student'
    },
    {
      id: 2,
      name: 'Instructor'
    },
    {
      id: 3,
      name: 'Marshall Fan'
    },
  ]
}
export default function CreateAccount() {

  const [error, setError] = useState<string>();
  const [signedIn, setCreated] = useState(false)
      const [selected, setSelected] = useState(data.items[0])
  
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
        role: selected.name

      });

      ref.current?.reset();

      if(r?.error){

        setError(r.error);

        return;

      } else {
        router.push("/verify-email")

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
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  I am a
                </label>
                <div className="mt-2">
                <div className="w-full">
        <Listbox value={selected} onChange={setSelected}>
            <div className="relative mt-2">
                <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-marshall-600 sm:text-sm/6">
                <span className="col-start-1 row-start-1 truncate pr-6">{selected.name}</span>
                <ChevronUpDownIcon
                    aria-hidden="true"
                    className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
                </ListboxButton>

                <ListboxOptions
                transition
                className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                >
                {data.items.map((item) => (
                    <ListboxOption
                    key={item.id}
                    value={item}
                    className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-marshall-600 data-focus:text-white data-focus:outline-hidden"
                    >
                    <span className="block truncate font-normal group-data-selected:font-semibold">{item.name}</span>

                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-marshall-600 group-not-data-selected:hidden group-data-focus:text-white">
                        <CheckIcon aria-hidden="true" className="size-5" />
                    </span>
                    </ListboxOption>
                ))}
                </ListboxOptions>
            </div>
            </Listbox>
        </div>
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