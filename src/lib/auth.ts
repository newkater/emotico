"use server";

import { getSession } from "@/actions/session";
import axios from "axios";
import { IronSession } from "iron-session";
import { jwtDecode } from "jwt-decode";
import { SessionData } from "./session";

const baseurl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getToken = async () => {
  const session = await getSession();
  return session?.accessToken;
};

export const getUser = async () => {
  const token = await getToken();
  return token ? jwtDecode<UserJwtPayload>(token) : undefined;
};

export const getUserRole = async () => {
  const user = await getUser();
  return toRole(user?.role);
};

const toRole = (role: string | undefined) =>
  role?.toUpperCase() === "CANDIDATE"
    ? "CANDIDATE"
    : role?.toUpperCase() === "RECRUITER"
    ? "RECRUITER"
    : "GUEST";

const updateSession = async (
  session: IronSession<SessionData>,
  responseCookies: string[]
) => {
  const accessToken = getCookieFromList(responseCookies, "access_token");
  const refreshToken = getCookieFromList(responseCookies, "refresh_token");
  const payload = accessToken
    ? jwtDecode<UserJwtPayload>(accessToken)
    : undefined;
  session.accessToken = accessToken;
  session.refreshToken = refreshToken;
  session.userId = payload?.user_public_id;
  session.role = toRole(payload?.role);
  session.isAuthenticated = accessToken !== undefined;
  await session.save();
  return session.isAuthenticated;
};

export const signIn = async (credentials: SignInRequest, loginUrl: string) => {
  try {
    const response = await axios.post(loginUrl, credentials);
    const responseCookies = response.headers["set-cookie"] as string[];
    const session = await getSession();
    const isAuthenticated = await updateSession(session, responseCookies);
    return isAuthenticated ? { success: true } : { success: false };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};

export const verify = async () => {
  const axiosInstance = axios.create({
    withCredentials: true,
  });
  const session = await getSession();
  const accessToken = session.accessToken ?? "";

  if (accessToken) {
    axiosInstance.interceptors.request.use(
      (config) => {
        config.headers["Cookie"] = `access_token=${accessToken}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    const response = await axiosInstance.post(baseurl + "/verify");
    return response;
  }
  return null;
};

export const refreshToken = async () => {
  const axiosInstance = axios.create({
    withCredentials: true,
  });
  const session = await getSession();
  const accessToken = session.accessToken;
  const refreshToken = session.refreshToken;
  if (accessToken && refreshToken) {
    axiosInstance.interceptors.request.use(
      (config) => {
        config.headers[
          "Cookie"
        ] = `access_token=${accessToken};refresh_token=${refreshToken}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    try {
      const response = await axiosInstance.post(baseurl + "/refresh-token");
      const responseCookies = response.headers["set-cookie"] as string[];
      const isAuthenticated = await updateSession(session, responseCookies);
      return isAuthenticated ? { success: true } : { success: false };
    } catch (error) {
      // console.error(error);
      return { success: false };
    }
  }
};

export const signOut = async () => {
  const session = await getSession();
  session.destroy();
};

const getCookieFromList = (cookies: string[], cookie: string) =>
  cookies
    .find((c) => c.startsWith(cookie))
    ?.split(";")[0]
    .split("=")[1];
