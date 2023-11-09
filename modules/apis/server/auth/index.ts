/**
 *
 * Declare & obtain environment variables
 * That will be used for next-auth config here.
 *
 */

import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";

/**
 *
 * Here is the next-auth config object
 *
 */

import type { NextAuthOptions } from "next-auth";
import clientPromise from "../database";
import { AuthProvider, User, UserData } from "@/types/schema";
import { ObjectId } from "mongodb";
import { getEnv } from "../utils";

function getAuthOptions() {
  const __env__authSecret = getEnv("NEXTAUTH_SECRET");
  const __env__databaseName = getEnv("DATABASE_NAME");
  const __env__googleClientId = getEnv("NEXT_PUBLIC_GOOGLE_CLIENT_ID");
  const __env__googleClientSecret = getEnv("NEXT_PUBLIC_GOOGLE_CLIENT_SECRET");

  const nextAuthOptions: NextAuthOptions = {
    session: {
      strategy: "jwt",
      maxAge: 30 * 24 * 60 * 60,
      updateAge: 30 * 60,
    },
    adapter: MongoDBAdapter(clientPromise, {
      databaseName: __env__databaseName,
      collections: {
        Users: "auth-users",
        Sessions: "auth-sessions",
      },
    }),
    providers: [
      GoogleProvider({
        clientId: __env__googleClientId,
        clientSecret: __env__googleClientSecret,
      }),
    ],
    callbacks: {
      /** Redirect Callback */
      async redirect(params) {
        return params.url;
      },
      /** JWT Callback */
      async jwt(params) {
        if (params.account) {
          params.token.accessToken = params.account.access_token;
          params.token._id = params.user.id;
          params.token.provider = params.account.provider;
        }
        return params.token;
      },
      /** Session Callback */
      async session(params) {
        const user = await retrieveAuthUser(
          params.token._id as string,
          params.token.provider as AuthProvider,
          params.session.user?.name as string,
          params.session.user?.email as string,
          params.session.user?.image || "public/static/user_profile.png"
        );

        return Promise.resolve({
          ...user,
          expires: params.session.expires,
        });
      },
    },
    secret: __env__authSecret,
  };

  return nextAuthOptions;
}

async function retrieveAuthUser(
  token: string,
  provider: AuthProvider,
  name: string,
  email: string,
  image: string
) {
  const __env__databaseName = getEnv("DATABASE_NAME");
  const client = await clientPromise;
  const db = client.db(__env__databaseName);
  const collection = db.collection<User>("users");

  let user = await collection.findOne({ _id: new ObjectId(token) });

  if (!user) {
    const newUser: User = {
      _id: new ObjectId(token),
      provider,
      data: {
        name,
        email,
        image,
        bio: `Hi, I am ${name}.`,
      },
    };

    const { insertedId } = await collection.insertOne(newUser);

    user = await collection.findOne({ _id: insertedId });

    if (!user) {
      throw new Error(
        "Database Error caused > could not retrieve the inserted user."
      );
    }
  }

  return user;
}

export { getAuthOptions };
