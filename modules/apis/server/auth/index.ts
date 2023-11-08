/**
 *
 * Declare & obtain environment variables
 * That will be used for next-auth config here.
 *
 */

import dotenv from "dotenv";
dotenv.config();
const env_authSecret = process.env.NEXTAUTH_SECRET || "";

/**
 *
 * Here is the next-auth config object
 *
 */

import type { NextAuthOptions } from "next-auth";

const nextAuthOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 30 * 60,
  },
  adapter: undefined,
  providers: [],
  callbacks: {},
  secret: env_authSecret,
};

export { nextAuthOptions };
