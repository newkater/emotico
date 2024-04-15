"use server";

import { SessionData, sessionOptions } from "@/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";


export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions)
  if(!session?.isAuthenticated){
    session.isAuthenticated = false
  }
  return session;
}
