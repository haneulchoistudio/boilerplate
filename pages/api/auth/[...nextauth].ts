import { getAuthOptions } from "@/apis/server";
import NextAuth from "next-auth/next";
const authOptions = getAuthOptions();
export default NextAuth(authOptions);
