import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    signedIn: boolean;
    user: {
      name: string | null | undefined;
      _id: string;
      email: string;
      role: string;
      verified: boolean
    };
    verified: boolean
  }

  interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    name: string;
    email: string;
    role: string;
    verified: boolean
  }
}