import { getCandidateAccount } from "@/actions/account";
import { getCandidateInterview, getCandidateInterviewById } from "@/actions/interview";
import { getPosition } from "@/actions/position";
import { getQuestions } from "@/actions/question";
import { Application } from "@/components/application";
import { Title } from "@/components/title";
import { Button } from "@/components/ui/button";
import { getUserRole } from "@/lib/auth";
import { LOGIN_PATH } from "@/routes";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { FC } from "react";

interface IProps {
  params: {
    interviewId: string;
  };
}

const connectionString =
  process.env.NEXT_PUBLIC_BLOB_SAS_CONNECTION_STRING || "";

const ApplicationPage: FC<IProps> = async ({ params: { interviewId } }) => {
  const role = await getUserRole();

  if (role === "GUEST") {
    redirect(LOGIN_PATH);
  }

  if (role === "RECRUITER") {
    redirect("/interviews/" + interviewId);
  }

  const account = await getCandidateAccount()

  if (account === undefined) {
    notFound()
  }

  const interview = await getCandidateInterviewById(account.public_id, interviewId);

  if (interview === undefined) {
    notFound();
  }

  const position = await getPosition(interview?.position_public_id);

  if (position === undefined) {
    notFound();
  }

  const questions = (await getQuestions(interview.position_public_id)) ?? [];

  if (questions.length === 0) {
    return (
      <div className="my-20">
        <Title className="text-2xl flex justify-center pt-8 pb-6">
          <h2>
            Interview for {position.name} in {position.company.name}
          </h2>
        </Title>
        <Title className="text-xl">
          Questions are not ready, please try again later
        </Title>
        <div className="py-5">
          <Button variant="link" size="xl">
            <Link href="/positions">Go to Position List</Link>
          </Button>
          <Button variant="link" size="xl">
            <Link href="/interviews">Go to Interviews Page</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Title className="text-2xl flex justify-center pt-8 pb-6">
        <h2>
          Interview for {position.name} in {position.company.name}
        </h2>
      </Title>
      <Application
        interview={interview}
        questions={questions}
        connectionString={connectionString}
      />
    </div>
  );
};

export default ApplicationPage;
