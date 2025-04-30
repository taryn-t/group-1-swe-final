import { connectDB } from "@/lib/mongoose";

import User from "@/models/User";

import type { NextAuthOptions } from "next-auth";

import credentials from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";


export const authOptions: NextAuthOptions  = {

    providers: [
  
      credentials({
  
        name: "Credentials",
  
        id: "credentials",
  
        credentials: {
  
          email: { label: "Email", type: "text" },
  
          password: { label: "Password", type: "password" },

  
        },
  
        async authorize(credentials) {
            await connectDB();

            const user = await User.findOne({

            email: credentials?.email,

            }).select("+password");

            if (!user) throw new Error("Wrong Email");

            const passwordMatch = await bcrypt.compare(

              credentials!.password,

              user.password

            );

            if (!passwordMatch) throw new Error("Wrong Password");

            return user;
        },
  
      }),
  
    ],
    jwt: {
      maxAge: 30 * 24 * 60 * 60, // Also define it here
    },
    session: {
  
      strategy: "jwt",
      maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
    },
    cookies: {
      sessionToken: {
        name: process.env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token",
        options: {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
          secure: process.env.NODE_ENV === "production",
          maxAge: 30 * 24 * 60 * 60, // <-- add this: 30 days in seconds
        },
      },
    },
    callbacks: {
      async jwt({ token, user, trigger, session }) {
        if (user) {
          token._id = user.id;
          token.name = user.name;
          token.email = user.email;
          token.role = user.role;
        }
    
        if (trigger === "update" && session?.user) {
          token.verified = session.user.verified;
        }
    
        return token;
      },
      async session({ session, token }) {
        if (session.user && token) {
          session.user.name = token.name;
          session.user.email = token.email;
          session.user.role = token.role;
          session.user._id = token._id;
          session.user.verified = token.verified;
        }
        return session;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
  
  };

  
