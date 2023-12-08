// Use this on nodejs runtime.

import { Collection, MongoClient } from "mongodb";
import { __pv__ } from "./pv";
import type { ExampleDatabaseNames, ExampleEvent, ExampleUser } from "~/types";

const uri = __pv__("DATABASE_URI");

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).

  let globalWithMongoClientPromise = global as typeof globalThis & {
    _mongoClientPromise: Promise<MongoClient>;
  };

  if (!globalWithMongoClientPromise._mongoClientPromise) {
    client = new MongoClient(uri);
    globalWithMongoClientPromise._mongoClientPromise = client.connect();
  }

  clientPromise = globalWithMongoClientPromise._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

// DATABASE COLLECTIONS RETRIEVERS

async function __getMongoDB__() {
  const promise = await clientPromise;
  const db = promise.db(__pv__("DATABASE_NAME"));
  return db;
}
async function __getMongoCollection__<Type extends object>(name: string) {
  const _db = await __getMongoDB__();
  const collection = _db.collection<Type>(name);
  return collection;
}
async function collections() {
  return {
    users: await __getMongoCollection__<ExampleUser>("users"),
    events: await __getMongoCollection__<ExampleEvent>("groups"),
  } as const;
}

/** Points to documents corresponding to the name */
async function docs<Name extends ExampleDatabaseNames>(name: Name) {
  const collection = await collections();
  const selected = collection[name] as Name extends "users"
    ? Collection<ExampleUser>
    : Collection<ExampleEvent>;

  return selected;
}

export { docs };
