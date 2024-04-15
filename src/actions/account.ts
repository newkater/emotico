"use server";

import { signIn, signOut } from "@/lib/auth";
import { httpGet, httpPost, httpPostForm } from "@/lib/http";
import { updatePhoto } from "@/lib/users";
import { revalidatePath } from "next/cache";
const baseurl = process.env.NEXT_PUBLIC_BACKEND_URL;
const loginCandidateUrl = baseurl + "/candidate/sign-in";
const loginRecruiterUrl = baseurl + "/recruiter/sign-in";
const registerCandidateUrl = baseurl + "/candidate/sign-up";
const registerRecruiterUrl = baseurl + "/recruiter/sign-up";

export const registerRecruiter = async (formData: FormData) => {
  const { status } = await httpPostForm(registerRecruiterUrl, formData);
  return status >= 0;
};

export const registerCandidate = async (formData: FormData) => {
  const { status } = await httpPostForm(registerCandidateUrl, formData);
  return status >= 0;
};

export const getAccount = async () => {
  const response = await httpGet<User>(baseurl + "/account");
  return response?.data;
};

export const getCandidateAccount = async () => {
  const response = await httpGet<Candidate>(baseurl + "/account");
  return response?.data;
};

export const getRecruiterAccount = async () => {
  const response = await httpGet<Recruiter>(baseurl + "/account");
  return response?.data;
};

export const postVerify = async () => {
  return await httpPost<string, string>(baseurl + "/verify", "");
};

export const logOff = () => signOut();

export const loginCandidate = (credentials: SignInRequest) =>
  signIn(credentials, loginCandidateUrl);

export const loginRecruiter = (credentials: SignInRequest) =>
  signIn(credentials, loginRecruiterUrl);

export const updateAvatar = async (userId: string, path: string) => {
  const result = await updatePhoto(userId, path);
  revalidatePath("/profile");
  return result;
};
