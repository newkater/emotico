import { FC, useRef } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Badge } from "./ui/badge";
import { QuestionDetailsEmotions } from "./interview-analysis-details-question-emotions";

interface IProps {
  answer: QuestionResult;
  index: number;
}

export const InterviewAnalysisDetailsQuestion: FC<IProps> = ({
  answer,
  index,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <AccordionItem value={"item-" + index} key={answer.video_link}>
      <AccordionTrigger className="text-xl">
        {index}. {answer.question}
      </AccordionTrigger>
      <AccordionContent className="text-lg">
        <div className="py-1">
          <span className="font-medium">Question Type: </span>
          {answer.question_type}
        </div>
        <div className="py-1">
          <span className="font-medium">Question Score: </span>
          <Badge variant="default">{answer.score}</Badge>
        </div>
        <div className="py-1">
          <span className="font-medium">Question Evaluation: </span>
          {answer.evaluation}
        </div>
        <div className="py-1">
          <span className="font-medium">Video: </span>
          <video src={answer.video_link} width={512} controls ref={videoRef}/>
        </div>
        <QuestionDetailsEmotions
          emotions={answer.emotion_results}
          videoRef={videoRef}
          className="py-1"
        />
      </AccordionContent>
    </AccordionItem>
  );
};
