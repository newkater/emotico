import { getPosition } from "@/actions/position";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getScore } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";

interface IProps {
  interview: PositionInterview;
}

export const InterviewCard: React.FC<IProps> = async ({ interview }) => {
  const position = await getPosition(interview.position_public_id);
  if (position === undefined) {
    notFound();
  }
  const questions = interview?.result?.questions;
  return (
    <div key={interview.public_id} className="my-5">
      <Button disabled={!questions} variant="link" size="xl">
        <Link href={`interviews/${interview.public_id}/analysis`}>
          {position.name}, {position.company.name}
        </Link>
      </Button>
      {questions ? (
        <Badge variant="outline" className="text-lg">
          {getScore(interview.result)}
        </Badge>
      ) : (
        <Link href={`interviews/${interview.public_id}`}>
          <Button variant="outline">Start Interview</Button>
        </Link>
      )}
    </div>
  );
};
