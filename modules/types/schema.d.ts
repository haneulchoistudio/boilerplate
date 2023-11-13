import type { ObjectId } from "mongodb";

export type AuthProvider = "google";

export type UserData = {
  name: string;
  email: string;
  image: string;
  bio: string;
};

export type User = {
  _id: string | ObjectId;
  data: UserData;
  provider: AuthProvider;
};
