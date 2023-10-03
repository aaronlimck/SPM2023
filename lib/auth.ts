import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig: NextAuthOptions = {
  // @ts-ignore
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Retrieve user data to verify with credentials
        // Docs: https://next-auth.js.org/configuration/providers/credentials
        const users = [
          {
            id: "1",
            email: "hr@example.com",
            name: "Human Resource",
            password: "Password888",
            role: "HR",
          },
          {
            id: "2",
            email: "staff@example.com",
            name: "Staff",
            password: "Password888",
            role: "STAFF",
          },
        ];

        for (const user of users) {
          if (
            credentials?.username === user.email &&
            credentials?.password === user.password
          ) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    // Docs: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    // To use role in client components
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};
