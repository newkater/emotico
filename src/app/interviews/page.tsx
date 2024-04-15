import { getUserRole } from "@/lib/auth";
import { Title } from "@/components/title";
import { redirect } from "next/navigation";
import { LOGIN_PATH } from "@/routes";
import { InterviewsCandidate } from "@/components/interviews-candidate";
import { InterviewsRecruiter } from "@/components/interviews-recruiter";

const Interviews = async () => {
  const role = await getUserRole()
  
  if (role === "GUEST") {
    redirect(LOGIN_PATH)
  }

  return (
    <div>
      <Title className="text-2xl mt-10 mb-5"><h2>Interviews</h2></Title>
      { role === "CANDIDATE" && <InterviewsCandidate />}
      { role === "RECRUITER" && <InterviewsRecruiter />}
    </div>
  );
};

export default Interviews;
