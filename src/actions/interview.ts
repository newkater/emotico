"use server";

import { httpGet, httpPost } from "@/lib/http";
import { revalidatePath } from "next/cache";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const path = "/interviews";

export const createInterview = async (positionId: string) => {
  const result = await httpPost<string, CreateInterviewResponse>(
    `${baseUrl}/position/${positionId}/interview`,
    ""
  );
  
  revalidatePath(path);
  return result.data?.public_id;
};

export const getCandidateInterviews = async () => {
  const response = await httpGet<PositionInterviewsResponse>(
    `${baseUrl}/candidate/interviews`
  );
  return response.data;
};

export const getCandidateInterviewsById = async (candidateId: string) => {
  const response = await httpGet<PositionInterviewsResponse>(
    `${baseUrl}/candidate/${candidateId}/interviews`
  );
  return response.data;
};

export const getCandidateInterviewForPosition = async (positionId: string) => {
  const response = await httpGet<PositionInterviewsResponse>(
    `${baseUrl}/candidate/interviews`
  );
  return response.data?.interviews.find(
    (interview) => interview.position_public_id === positionId
  );
};

export const getCandidateInterviewForPositionById = async (
  candidateId: string,
  positionId: string
) => {
  const response = await httpGet<PositionInterviewsResponse>(
    `${baseUrl}/candidate/${candidateId}/interviews`
  );
  return response.data?.interviews.find(
    (interview) => interview.position_public_id === positionId
  );
};

export const getCandidateInterview = async (interviewId: string) => {
  const response = await httpGet<PositionInterviewsResponse>(
    `${baseUrl}/candidate/interviews`
  );

  return response.data?.interviews.find(
    (interview) => interview.public_id === interviewId
  );
};

export const getCandidateInterviewById = async (
  candidateId: string,
  interviewId: string
) => {
  const response = await httpGet<PositionInterviewsResponse>(
    `${baseUrl}/candidate/${candidateId}/interviews`
  );
  return response.data?.interviews.find(
    (interview) => interview.public_id === interviewId
  );
};

export const getRecruiterInterviews = async () => {
  const response = await httpGet<PositionInterviewsResponse>(
    `${baseUrl}/recruiter/interviews`
  );
  return response.data;
};

export const getRecruiterInterview = async (interviewId: string) => {
  const response = await httpGet<PositionInterviewsResponse>(
    `${baseUrl}/recruiter/interviews`
  );

  return response.data?.interviews.find(
    (interview) => interview.public_id === interviewId
  );
};

export const getInterview = async (interviewId: string, role: Role) => {
  if (role === "CANDIDATE") {
    return getCandidateInterview(interviewId)
  }

  if (role === "RECRUITER") {
    return getRecruiterInterview(interviewId)
  }
  
  return undefined
};


export const createInterviewResult = async (interviewId: string) => {
  const result = await httpPost<string, Interview>(
    `${baseUrl}/interview/${interviewId}/result`,
    ""
  );
  
  revalidatePath(path);
  revalidatePath(`${path}/${interviewId}`);
  revalidatePath(`${path}/${interviewId}/analysis`);  
  return result.data
}