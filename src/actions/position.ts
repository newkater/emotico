"use server";

import { httpDelete, httpGet, httpPost, httpPutForm } from "@/lib/http";
import { revalidatePath } from "next/cache";

const baseurl = process.env.NEXT_PUBLIC_BACKEND_URL;
const path = "/positions";

export const addPosition = async (position: PositionCreate) => {
  const result = await httpPost<PositionCreate, Position>(
    baseurl + "/position",
    position
  );
  revalidatePath(path);
  return result;
};

export const updatePosition = async (id: string, formData: FormData) => {
  const result = await httpPutForm<Position>(baseurl + "/position", formData);

  revalidatePath(path);
  revalidatePath(path + "/" + id);
  revalidatePath(path + "/" + id + "/edit");

  return result;
};

export const addPositionSkills = async (id: string, skills: string[]) => {
  const result = await httpPost<SkillUpdateRequest, unknown>(
    `${baseurl}/position/${id}/skills`,
    { skills }
  );

  revalidatePath(path);
  revalidatePath(path + "/" + id);
  revalidatePath(path + "/" + id + "/edit");

  return result;
};

export const removePositionSkills = async (id: string, skills: string[]) => {
  const result = await httpDelete<SkillUpdateRequest, unknown>(
    `${baseurl}/position/${id}/skills`,
    { skills }
  );

  revalidatePath(path);
  revalidatePath(path + "/" + id);
  revalidatePath(path + "/" + id + "/edit");

  return result;
};

export const deletePosition = async (id: string) => {
  const result = await httpDelete<string, unknown>(
    `${baseurl}/position/${id}`,
    ""
  );

  revalidatePath(path);
  revalidatePath(path + "/" + id);
  revalidatePath(path + "/" + id + "/edit");
  return result;
};

export const getPositionsForCompany = async (id: string) => {
  const response = await httpGet<CompanyPositionsResponse>(`${baseurl}/companies/${id}/positions`);
  return response?.data?.positions ?? []
}

export const getPosition = async (id: string) => {
  const response = await httpGet<Position>(`${baseurl}/position/${id}`);
  return response?.data
}

export const getPositions = async () => {
  const response = await httpGet<PositionsBaseResponse>(`${baseurl}/positions`)
  return response.data?.positions
}

export const getPositionInterviews = async (id: string) => {
  const response = await httpGet<InterviewsResponse>(`${baseurl}/positions/${id}/interviews`);
  return response?.data?.interviews ?? []
}

