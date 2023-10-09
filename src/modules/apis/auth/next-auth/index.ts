/**
 * NEXT AUTH
 * api configuration goes in this file
 */

import { Next } from "@/types";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { NextAuthOptions } from "next-auth";
import { getSession } from "next-auth/react";
import clientPromise from "@/modules/apis/mongo-db";
import { createNewUser } from "./utils";
import GoogleProvider from "next-auth/providers/google";
import dotenv from "dotenv";

dotenv.config();

export const nextAuthOptions: NextAuthOptions = {
  // Using session strategy with JWT
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60, updateAge: 30 * 60 },
  // Integrating Mongo DB Adapter
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: process.env.NEXT_PUBLIC_MONGODB_DB_NAME || ("" as string),
    collections: {
      Accounts: "next-auth-accounts",
      Users: "next-auth-users",
    },
  }),
  // Integrating Third-party OAuth Services
  // Such as Google, Github, ...
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ("" as string),
      clientSecret:
        process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || ("" as string),
    }),
  ],
  // Callbacks
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user.id;
        token.provider = account.provider;
      }

      return token;
    },

    async session({ session, token, user }) {
      /**
       * Insert arguments
       * needed for creating new document
       */
      const doc = await createNewUser();
      /**
       * Resolve session data
       * properties needed to be accessed in the client
       * Generally, _id, data, ...
       */
      return Promise.resolve({
        // _id: doc._id,
        // data: doc.data,
        // provider: doc.provider,
        expires: session.expires,
      });
    },
    async redirect({ url, baseUrl }) {
      return url;
    },
  },
  jwt: {},
  secret: process.env.NEXTAUTH_SECRET || ("" as string),

  pages: {},
};

export async function getAuthUser(ctx: Next.SSRContext) {
  const session = await getSession(ctx);

  if (!session) {
    console.log(`getAuthUser - session not found.`);
    return false;
  }

  return session;
}
