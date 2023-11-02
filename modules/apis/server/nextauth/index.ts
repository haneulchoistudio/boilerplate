/**
 *
 * Declare & obtain environment variables
 * That will be used for next-auth config here.
 *
 */

import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import dotenv from "dotenv";

dotenv.config();

const $nextauthSecret = process.env.NEXTAUTH_SECRET || "";
// const $nextauthUrl = process.env.NEXTAUTH_SECRET || "";
// const $databaseUri = process.env.DATABASE_URL || "";
// const $databaseName = process.env.DATABASE_NAME || "";

/**
 *
 * Here is the next-auth config object
 *
 */

import type { NextAuthOptions } from "next-auth";
import prisma from "../prisma";

const nextAuthOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 30 * 60,
  },
  adapter: PrismaAdapter(prisma),
  providers: [],
  callbacks: {},
  secret: $nextauthSecret,
};

export { nextAuthOptions };
