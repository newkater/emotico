"use server";

import { httpDelete, httpGet, httpPost, httpPut } from "@/lib/http";
import { revalidatePath } from "next/cache";

const baseurl = process.env.NEXT_PUBLIC_BACKEND_URL;
const path = "/positions";

export const getQuestions = async (positionId: string) => {
  const response = await httpGet<QuestionsResponse>(
    `${baseurl}/position/${positionId}/questions`
  );
  return response?.data?.questions;
};

export const addQuestions = async (
  positionId: string,
  questions: QuestionCreate[]
) => {
  const response = await httpPost<QuestionsCreateRequest, QuestionsResponse>(
    `${baseurl}/position/${positionId}/questions`,
    { questions }
  );
  revalidatePath(path);
  revalidatePath(path + "/" + positionId);
  revalidatePath(path + "/" + positionId + "/edit");
  return response;
};

export const updateQuestion = async (
  question: Question, 
  positionId: string,
) => {
  const response = await httpPut<Question, QuestionsResponse>(
    `${baseurl}/question/${question.public_id}`,
    question
  );
  revalidatePath(path);
  revalidatePath(path + "/" + positionId);
  revalidatePath(path + "/" + positionId + "/edit");
  return response;
};

export const removeQuestion = async (positionId: string, id: string) => {
  const response = await httpDelete<string, unknown>(
    `${baseurl}/question/${id}`,
    ""
  );
  revalidatePath(path);
  revalidatePath(path + "/" + positionId);
  revalidatePath(path + "/" + positionId + "/edit");
  return response;
};
