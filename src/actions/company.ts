"use server";

import { httpDelete, httpGet, httpPost, httpPostForm, httpPut, httpPutForm } from "@/lib/http";
import { revalidatePath } from "next/cache";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const path = "/companies";
const companyUrl = baseUrl + "/company";
const companiesUrl = baseUrl + "/companies";


export const getCompany = async (id: string) => {
  const response = await httpGet<Company>(companyUrl + "/" + id);
  return response?.data
};

export const getCompanies = async () => {
  const response = await httpGet<CompaniesResponse>(companiesUrl);
  return response?.data
};

export const createCompany = async (request: CompanyCreateRequest) => {
  const response = await httpPost<CompanyCreateRequest, unknown>(companyUrl, request);
  revalidatePath(path);
  return response
};

export const modifyCompany = async (request: CompanyUpdateRequest) => {
  const response = await httpPut<CompanyUpdateRequest, Company>(companyUrl + "/" + request.public_id, request);
  revalidatePath(path);
  return response
};

export const addCompany = async (formData: FormData) => {
  const result = await httpPostForm(companyUrl, formData);
  revalidatePath(path);
  return result;
};

export const updateCompany = async (id: string, formData: FormData) => {
  const result = await httpPutForm(companyUrl + "/" + id, formData);
  revalidatePath(path);
  revalidatePath(path + "/" + id);
  revalidatePath(path + "/" + id + "/edit");
  return result;
};

export const deleteCompany = async (id: string) => {
  const result = await httpDelete(companyUrl + "/" + id, {});
  revalidatePath(path);
  return result;
};