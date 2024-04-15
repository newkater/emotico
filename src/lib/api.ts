"use server"

import { getSession } from "@/actions/session";
import axios from "axios";

export async function post<TRequest>(url: string, request: TRequest) {
  const axiosInstance = axios.create({
    withCredentials: true,
  });
  const session = await getSession();
  const accessToken = session.accessToken ?? "";
  if (accessToken) {
    axiosInstance.interceptors.request.use(
      (config) => {
        config.headers[
          "Cookie"
        ] = `access_token=${accessToken}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
  const response = await axiosInstance.post(url, request);
  return response;
}

export async function get(url: string) {
  const axiosInstance = axios.create({
    withCredentials: true,
  });
  const session = await getSession();
  const accessToken = session.accessToken ?? "";
  if (accessToken) {
    axiosInstance.interceptors.request.use(
      (config) => {
        config.headers[
          "Cookie"
        ] = `access_token=${accessToken}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
  const response = await axiosInstance.get(url);
  return response;
}