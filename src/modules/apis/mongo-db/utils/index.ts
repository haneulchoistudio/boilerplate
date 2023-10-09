import type { Db } from "@/types";
import clientPromise from "@/modules/apis/mongo-db";
import { ObjectId } from "mongodb";

export async function getDb<T extends ["users", "events"][number]>(option: T) {
  const dbClient = await clientPromise;
  const db = dbClient.db(process.env.NEXT_PUBLIC_MONGODB_DB_NAME);
  const dbCollection =
    db.collection<T extends "users" ? Db.Server.User : Db.Server.Event>(option);
  return dbCollection;
}

export function shapeId<Type extends Db.DocumentType>(
  id: Type extends "server" ? ObjectId : string
): Type extends "server" ? ObjectId : string {
  if (typeof id === "string")
    return new ObjectId(id) as Type extends "server" ? ObjectId : string;
  return id.toString() as Type extends "server" ? ObjectId : string;
}
