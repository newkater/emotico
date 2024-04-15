import { InterviewCandidate } from "@/components/interview-candidate";
import { InterviewRecruiter } from "@/components/interview-recruiter";
import { Title } from "@/components/title";
import { getUserRole } from "@/lib/auth";
import { LOGIN_PATH } from "@/routes";
import { redirect } from "next/navigation";

type Props = {
  params: {
    interviewId: string;
  };
};

const InterviewPage: React.FC<Props> = async ({ params: { interviewId } }) => {
  const role = await getUserRole()
  
  if (role === "GUEST") {
    redirect(LOGIN_PATH)
  }

  return (
    <div>
      { role === "CANDIDATE" && <InterviewCandidate interviewId={interviewId} />}
      { role === "RECRUITER" && <InterviewRecruiter interviewId={interviewId}/>}      
    </div>
  );
};

export default InterviewPage;
