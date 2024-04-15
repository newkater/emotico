import { FC } from "react";
import { Title } from "./title";
import { Badge } from "./ui/badge";
import { getScore } from "@/lib/utils";

interface IProps {
  interview: PositionInterview;
}

export const InterviewAnalysisScore: FC<IProps> = ({
  interview: { result },
}) => {
  const questions = result.questions ?? [];

  return (
    <div className="p-8">
      <Title className="text-lg">Interview Score</Title>
      <div>
        <Badge variant="primary" className="text-md">
          {getScore(result)}
        </Badge>
      </div>
      <Title className="text-lg mt-5">Questions Scoring</Title>
      <ol>
        {questions.length === 0 ? (
          <div>The results are not ready yet</div>
        ) : (
          questions.map((question, index) => (
            <li key={question.video_link}>{QuestionItem(index, question)}</li>
          ))
        )}
      </ol>
    </div>
  );
};

const QuestionItem = (index: number, questionResult: QuestionResult) => (
  <div className="py-1">
    <div>
      <span>{index + 1}.</span> {questionResult.question}
    </div>
    <div>
      <Badge variant="default">{questionResult.score}</Badge>
    </div>
  </div>
);
