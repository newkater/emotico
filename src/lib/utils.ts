import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuid } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Success<TResponse>(value: TResponse): Result<TResponse> {
  return {
    value: value as TResponse,
    success: true,
  };
}

export function Failure<TResponse>(error: ApplicationError): Result<TResponse> {
  return {
    error,
    success: false,
  };
}

export function FetchFailure<TResponse>(error: string): ApiResponse<TResponse> {
  return {
    error,
    status: -1,
  };
}

export const bufferFromFile = async (file: File) => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  return buffer;
};

export const generateFileName = (file: File) =>
  uuid() + "." + file.name.split(".").pop();

export const generateVideoFileName = () => uuid() + ".mp4";

export const newId = () => uuid();

export const secondsToTime = (e: number) => {
  const m = Math.floor((e % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(e % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
};

export const getScore = (result: InterviewResult) => {
  const answers = result.questions ?? []
  const score = answers.length === 0 ? 0 :
    answers.reduce((sum, item) => sum + item.score, 0) / answers.length
  return Math.round(score)
}

export const getFullName = (user: User) => `${user.first_name} ${user.last_name}`
