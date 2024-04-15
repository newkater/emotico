"use server";

import { httpDelete, httpGet, httpPost, httpPut, httpPutForm } from "@/lib/http";
import { revalidatePath } from "next/cache";

const baseurl = process.env.NEXT_PUBLIC_BACKEND_URL;
const path = "/profile";

export const updateCandidateForm = async (id: string, formData: FormData) => {
  const result = await httpPutForm<Candidate>(
    baseurl + `/candidate/${id}`,
    formData
  );
  if (result.data) {
    revalidatePath(path);
  }
  return result;
};

export const updateCandidate = async (id: string, candidate: Candidate) => {
  const result = await httpPut<Candidate, Candidate>(
    baseurl + `/candidate/${id}`,
    candidate
  );
  revalidatePath(path);
  return result;
};

export const addCandidateSkills = async (skills: string[]) => {
  const result = await httpPost<SkillUpdateRequest, unknown>(
    `${baseurl}/candidate/skills`,
    { skills }
  );
  revalidatePath(path);
  return result;
};

export const removeCandidateSkills = async (skills: string[]) => {
  const result = await httpDelete<SkillUpdateRequest, unknown>(
    `${baseurl}/candidate/skills`,
    { skills }
  );
  revalidatePath(path);
  return result;
};

export const getCandidate = async (candidateId: string) => {
  const response = await httpGet<Candidate>(`${baseurl}/candidate/${candidateId}`);
  return response?.data
}

