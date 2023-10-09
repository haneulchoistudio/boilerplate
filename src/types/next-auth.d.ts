import type { Session } from "next-auth";
import { Db } from "@/types";

declare module "next-auth" {
  type Session<Type extends Db.DocumentType> = Type extends "client"
    ? Db.Client.User
    : Db.Server.User;
}
