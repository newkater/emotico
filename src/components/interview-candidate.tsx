import {
  getCandidateInterview,
  getCandidateInterviewById,
} from "@/actions/interview";
import { notFound, redirect } from "next/navigation";
import { FC } from "react";
import { Title } from "./title";
import { Button } from "./ui/button";
import Link from "next/link";
import { getPosition } from "@/actions/position";
import { getCandidateAccount } from "@/actions/account";

interface IProps {
  interviewId: string;
}

export const InterviewCandidate: FC<IProps> = async ({ interviewId }) => {
  const account = await getCandidateAccount();
  if (account === undefined) {
    notFound();
  }
  const interview = await getCandidateInterviewById(
    account.public_id,
    interviewId
  );

  if (interview === undefined) {
    notFound();
  }

  const position = await getPosition(interview.position_public_id);
  if (position === undefined) {
    notFound();
  }

  const questions = interview.result?.questions

  if (!!questions && questions.length > 0 ) {
    redirect(`/interviews/${interviewId}/analysis`)
  }

  return (
    <div>
      <Title className="text-2xl flex justify-center pt-8 pb-6">
        <h2>
          Interview for {position.name} in {position.company.name}
        </h2>
      </Title>
      <Title className="text-xl">{position.name}</Title>
      <div>{position.description}</div>
      <Title className="text-lg">{position.company.name}</Title>
      <div>{position.company.description}</div>
      <div className="flex justify-center pt-8 pb-6">
        <Button size="xl">
          <Link href={`/interviews/${interviewId}/application`}>
            Start Interview
          </Link>
        </Button>
      </div>
    </div>
  );
};
