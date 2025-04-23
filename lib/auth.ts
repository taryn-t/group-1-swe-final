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
  
    session: {
  
      strategy: "jwt",
  
    },
    callbacks: {
        async jwt({ token, user, trigger,session }) {
            if (user) {
              token._id = user.id;
              token.name = user.name;
              token.email = user.email;
              token.role = user.role;

              
            }

            if (trigger === 'update' && session?.user.verified) {
              token.verified = session.user.verified;
            }

            return token;
          },
          async session({ session, token }) {
            if (token) {
              session.signedIn = true;
              session.user.name = token.name;
              session.user._id = token._id;
              session.user.email = token.email;
              session.user.role = token.role;
              session.user.verified = token.verified
            }
            return session;
          },
    },
    secret: process.env.NEXTAUTH_SECRET,
  
  };
