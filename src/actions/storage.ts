"use server";

import { getContainerClient, uploadFileFromBuffer } from "@/lib/storage";
import { Failure, bufferFromFile, generateFileName } from "@/lib/utils";

const storageConnectionString =
  process.env.NEXT_PUBLIC_STORAGE_CONNECTION_STRING || "";
const blobSasUrl = process.env.NEXT_PUBLIC_BLOB_SAS_URL || "";
export const sasConnectionString =
  process.env.NEXT_PUBLIC_BLOB_SAS_CONNECTION_STRING || "";
const account = process.env.NEXT_PUBLIC_STORAGE_ACCOUNT_NAME || "";
const sas = process.env.NEXT_PUBLIC_SAS_KEY || "";
const imageContainer =
  process.env.NEXT_PUBLIC_STORAGE_CONTAINER_IMAGE || "image";
const videoContainer =
  process.env.NEXT_PUBLIC_STORAGE_CONTAINER_VIDEO || "video";

export const uploadFile = async (
  formData: FormData,
  container: string
): Promise<Result<string>> => {
  const file: File | null = formData.get("file") as unknown as File;

  if (!file) {
    return Failure({
      type: "VALIDATION",
      message: "No file to upload",
    });
  }

  const buffer = await bufferFromFile(file);

  return await uploadBuffer(buffer, container, generateFileName(file), file.type);
};

export const uploadBuffer = async (
  buffer: Buffer,
  container: string,
  name: string,
  type: string
) => {
  const client = await getContainerClient(sasConnectionString, container);
  return await uploadFileFromBuffer(buffer, client, name, type);
};

export const uploadImage = async (formData: FormData) => await uploadFile(formData, imageContainer)

export const uploadVideo = async (formData: FormData) => await uploadFile(formData, videoContainer)

export const uploadTest = async (formData: FormData) => await uploadFile(formData, "test")
