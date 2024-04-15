

import { FC } from "react";
import { Title } from "./title";
import { Timer } from "./timer";
import { ApplicationQuestionCard } from "./application-question-card";

interface IProps {
  question: Question;
  index: number;
  total: number;
  onTimeLimit?: () => void; 
}

export const ApplicationQuestion: FC<IProps> = ({ question, index, total, onTimeLimit }) => {

  return (
    <div>
      <Title className="text-xl flex items-center">
        <h3>Question {index} of {total}</h3>
      </Title>
      <div>
        <p className="py-2">During this stage you need to read and understand the question. The question will remain visible during the answering period.</p>
      </div>
      <ApplicationQuestionCard question={question}/>
      <div>
        <p className="py-2">Time left to read the question: <Timer initial={question.read_duration} onTimeLimit={onTimeLimit}/></p>
      </div>      
    </div>
  );
};
