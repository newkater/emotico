import { FC } from "react";
import { CompanyImage } from "./company-image";
import { Badge } from "./ui/badge";
import { getUserRole } from "@/lib/auth";
import { Button } from "./ui/button";
import { createInterviewResult } from "@/actions/interview";
import { getScore } from "@/lib/utils";

interface IProps {
  interview: PositionInterview;
  position: Position;
}

const sampleFeedback =
  "The candidate possesses a strong grasp of fundamental concepts relevant  to the position.";

export const InterviewAnalysisInfo: FC<IProps> = async ({
  interview,
  position,
}) => {
  const role = await getUserRole();

  return (
    <div className="flex flex-col p-6">
      <div className="flex">
        <CompanyImage
          size={28}
          company={position.company}
          className="size-28 m-3"
        />
        <div>
          <div className="p-1 text-lg w-full">
            <h3 className="font-semibold">Position: </h3>
            <span className="text-primary-dark">{position.name}</span>
          </div>
          <div className="p-1 text-lg w-full">
            <h3 className="font-semibold">Company: </h3>
            <span className="text-primary-dark">{position.company.name}</span>
          </div>
          <div className="p-1 text-lg w-full">
            <h3 className="font-semibold">Candidate: </h3>
            {/* <span className="text-primary-dark">{candidate?.first_name} {candidate?.last_name}</span> */}
          </div>
        </div>
      </div>
      <div className="p-2 text-lg w-full">
        <h3 className="font-semibold">Interview Score: </h3>
        <Badge variant="primary" className="text-sm">
          {getScore(interview.result)}
        </Badge>
      </div>
      {role === "RECRUITER" && (
        <div className="mt-3">
          <form
            action={async () => {
              "use server";
              await createInterviewResult(interview.public_id);
            }}
          >
            <Button variant="outline" size="lg">
              Evaluate interview
            </Button>
          </form>
        </div>
      )}
      <div></div>
    </div>
  );
};
