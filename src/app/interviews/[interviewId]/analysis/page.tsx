import { getInterview } from "@/actions/interview";
import { getPosition } from "@/actions/position";
import { InterviewAnalysis } from "@/components/interview-analysis";
import { Title } from "@/components/title";
import { getUserRole } from "@/lib/auth";
import { LOGIN_PATH } from "@/routes";
import { notFound, redirect } from "next/navigation";
import { FC } from "react";

type Props = {
  params: {
    interviewId: string;
  };
};

const AnalysisPage: FC<Props> = async ({ params: { interviewId } }) => {
  const role = await getUserRole();

  if (role === "GUEST") {
    redirect(LOGIN_PATH);
  }

  const interview = await getInterview(interviewId, role);

  if (interview === undefined) {
    notFound();
  }

  const position = await getPosition(interview.position_public_id);

  if (position === undefined) {
    notFound();
  }

  return (
    <div>
      <Title className="text-3xl flex justify-center pt-8 pb-6">
        <h2>Analysis:</h2>
      </Title>
      <InterviewAnalysis interview={interview} position={position}/>
    </div>
  );
};

export default AnalysisPage;
