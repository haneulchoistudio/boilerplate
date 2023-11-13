import { MongoClient, MongoClientOptions } from "mongodb";
import { getEnv } from "../utils";

const __env__databaseUri = getEnv("DATABASE_URI");
const __env__databaseName = getEnv("DATABASE_NAME");

const isDevelopment = process.env.NODE_ENV === "development";

const options: MongoClientOptions = {};

let client;
let clientPromise: Promise<MongoClient>;

if (isDevelopment) {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(__env__databaseUri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(__env__databaseUri, options);
  clientPromise = client.connect();
}

export default clientPromise;

type Collection = "users" | string;

export async function docs<T extends object = {}>(collectionName: Collection) {
  const client = await clientPromise;
  const db = client.db(__env__databaseName);
  const collection = db.collection<T>(collectionName);
  return collection;
}
