"use server"

import { httpPost } from "@/lib/http";
import { revalidatePath } from "next/cache";

const baseurl = process.env.NEXT_PUBLIC_BACKEND_URL;
const interviewsPath = "/interviews"

export const addVideo = async (interviewId: string, questionId: string, video: string) => {
  const result = await httpPost<VideoCreateRequest, unknown>(`${baseurl}/question/${questionId}/video`, {interview_public_id: interviewId, video});
  revalidatePath(interviewsPath);
  revalidatePath(interviewsPath + "/" + interviewId);
  revalidatePath(interviewsPath + "/" + interviewId + "/" + "analysis");
  return result;
};
