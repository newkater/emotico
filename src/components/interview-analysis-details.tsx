"use client";

import { FC } from "react";
import { Accordion } from "./ui/accordion";
import { InterviewAnalysisDetailsQuestion } from "./interview-analysis-details-question";

interface IProps {
  interview: PositionInterview;
}

export const InterviewAnalysisDetails: FC<IProps> = ({
  interview: { result },
}) => {
  const questions = result.questions ?? [];

  return (
    <div className="p-10">
      <Accordion type="multiple" className="w-full">
        {questions.length === 0 ? (
          <div>The results are not ready yet</div>
        ) : (
          questions.map((answer, index) => (
            <InterviewAnalysisDetailsQuestion
              answer={answer}
              index={index + 1}
              key={answer.video_link}
            />
          ))
        )}
      </Accordion>
    </div>
  );
};
