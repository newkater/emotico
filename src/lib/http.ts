"use server";

import { getToken } from "./auth";
import { FetchFailure } from "./utils";

const ACCESS_TOKEN = "access_token";

export async function httpGet<TResponse>(
  url: string
): Promise<ApiResponse<TResponse>> {
  try {
    const token = await getToken() ?? "";
    const response = await fetch(url, {
      mode: "cors",
      credentials: "include",
      headers: {
        "Cookie": `${ACCESS_TOKEN}=${token};`,
      },
      referrerPolicy: "no-referrer",
    });

    return await response.json()
  } catch (error) {
    console.error(error)
    return FetchFailure("A fetch error occurred")
  }
}

export async function httpPost<TRequest, TResponse>(
  url: string, request: TRequest 
): Promise<ApiResponse<TResponse>> {
  try {
    const token = await getToken() ?? "";

    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Cookie": `${ACCESS_TOKEN}=${token};`,
      },
      body: JSON.stringify(request),
      referrerPolicy: "no-referrer",
    });

    return await response.json()
  } catch (error) {
    console.error(error)
    return FetchFailure("A fetch error occurred")
  }
}

export async function httpPut<TRequest, TResponse>(
  url: string, request: TRequest 
): Promise<ApiResponse<TResponse>> {
  try {
    const token = await getToken() ?? "";

    const response = await fetch(url, {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Cookie": `${ACCESS_TOKEN}=${token};`,
      },
      body: JSON.stringify(request),
      referrerPolicy: "no-referrer",
    });

    return await response.json()
  } catch (error) {
    console.error(error)
    return FetchFailure("A fetch error occurred")
  }
}

export async function httpDelete<TRequest, TResponse>(
  url: string, request: TRequest
): Promise<ApiResponse<TResponse>> {
  try {
    const token = await getToken() ?? "";

    const response = await fetch(url, {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Cookie": `${ACCESS_TOKEN}=${token};`,
      },
      body: JSON.stringify(request),
      referrerPolicy: "no-referrer",
    });

    return await response.json()
  } catch (error) {
    console.error(error)
    return FetchFailure("A fetch error occurred")
  }
}

export async function httpPostForm<TResponse>(
  url: string, formData: FormData 
): Promise<ApiResponse<TResponse>> {
  try {
    const token = await getToken() ?? "";

    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Cookie": `${ACCESS_TOKEN}=${token};`,
      },
      body: JSON.stringify(Object.fromEntries(formData)),
      referrerPolicy: "no-referrer",
    });

    return await response.json()
  } catch (error) {
    console.error(error)
    return FetchFailure("A fetch error occurred")
  }
}

export async function httpPutForm<TResponse>(
  url: string, formData: FormData 
): Promise<ApiResponse<TResponse>> {
  try {
    const token = await getToken() ?? "";

    const response = await fetch(url, {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Cookie": `${ACCESS_TOKEN}=${token};`,
      },
      body: JSON.stringify(Object.fromEntries(formData)),
      referrerPolicy: "no-referrer",
    });

    return await response.json()
  } catch (error) {
    console.error(error)
    return FetchFailure("A fetch error occurred")
  }
}