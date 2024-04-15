import { createInterviewResult } from "@/actions/interview";
import { redirect } from "next/navigation";
import { FC } from "react";

interface IProps {
  params: {
    interviewId: string;
  };
}

const ResultPage: FC<IProps> = async ({params: {interviewId}}) => {
  await createInterviewResult(interviewId)
  redirect(`/interviews/${interviewId}/analysis`)
}

export default ResultPage