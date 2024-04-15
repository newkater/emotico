import { SkillList } from "@/components/skill-list";
import { Title } from "@/components/title";
import { LOGIN_PATH } from "@/routes";
import { notFound, redirect } from "next/navigation";
import { FC } from "react";
import { CreateInterviewForm } from "./create-interview-form";
import { getUserRole } from "@/lib/auth";
import { getPosition } from "@/actions/position";
import { getCandidateAccount } from "@/actions/account";
import { getCandidateInterviewForPosition } from "@/actions/interview";

interface IProps {
  params: {
    positionId: string;
  };
}

const ApplyPage: FC<IProps> = async ({ params: { positionId } }) => {
  const role = await getUserRole()
  
  if(role === 'GUEST') {
    return redirect(LOGIN_PATH);
  }

  const position = await getPosition(positionId);

  if (position === undefined) {
    notFound();
  }

  if (role !== 'CANDIDATE') {
    return (
      <div>
        <Title>You must be registered as a candidate to apply</Title>
      </div>
    );
  }

  const interview = await getCandidateInterviewForPosition(positionId)

  if(interview) {
    redirect(`/interviews/${interview.public_id}`)
  }

  return (
    <div>
      <Title className="text-2xl mt-10 mb-5">
        You are about to enter the interview.
      </Title>
      <div className="my-2">
        <strong>Company: </strong>
        <span>{position.company.name}</span>
      </div>
      <div className="my-2">
        <strong>Position: </strong>
        <span>{position.name}</span>
      </div>
      <div className="my-2">
        <strong>Description: </strong>
        <span>{position.description}</span>
      </div>
      <div className="my-2">
        <strong>Required skills: </strong>
        <SkillList skills={position.skills ?? []} />
      </div>
      <div className="mt-10">
        <CreateInterviewForm position={position}/>
      </div>
    </div>
  );
};

export default ApplyPage;
