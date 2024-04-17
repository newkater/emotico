import { FC } from "react";
import { Title } from "./title";
import {} from "@/actions/question";
import { getPositionInterviews } from "@/actions/position";
import { Button } from "./ui/button";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { getScore } from "@/lib/utils";
import { PositionDetailApplicant } from "./position-detail-applicant";

interface IProps {
  position: Position;
}

export const PositionDetailsApplicants: FC<IProps> = async ({ position }) => {
  const interviews = (await getPositionInterviews(position.public_id)) ?? [];

  return (
    <div className="p-6">
      <Title className="text-xl mb-2">Inteview Applicants</Title>
      <div>
        {interviews.length === 0 ? (
          <span>No interviews have been conducted yet</span>
        ) : (
          interviews.map((interview, index) => (
            <div key={interview.public_id}>
              <Button variant="link">
                <Link href={`/interviews/${interview.public_id}/analysis`}>
                  {interview.candidate_public_id ? (
                    <PositionDetailApplicant
                      candidateId={interview.candidate_public_id}
                    />
                  ) : (
                    <span className="text-lg">Interview {index + 1}</span>
                  )}
                </Link>
              </Button>
              <Badge>{getScore(interview.result)}</Badge>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
