import { cookies } from "next/headers";
import { SessionOptions } from "iron-session";
const key = process.env.NEXT_PUBLIC_SESSION_KEY ?? ""

export interface SessionData {
  userId?: string;
  role?: Role;
  accessToken?: string;
  refreshToken?: string;
  isAuthenticated: boolean
}

export const defaultSession: SessionData = {
  isAuthenticated: false
}

export const sessionOptions: SessionOptions = {
  cookieName: "emotico-session",
  password: key,
  ttl: 80000,
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
  }
}


export const setCookie = (name: string, value: string, age: number) => {
  const expires = new Date(Date.now() + age * 1000);
  cookies().set(name, value, {
    expires,
    httpOnly: true,
    secure: true,
  });
};

export const getCookie = (name: string) => {
  const value = cookies().get(name)?.value;
  return value?.toString();
};
