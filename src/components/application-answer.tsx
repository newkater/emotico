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

export const ApplicationAnswer: FC<IProps> = ({ question, index, total, onTimeLimit }) => {
  return (
    <div>
      <Title className="text-xl flex items-center">
        <h3>Question {index} of {total}</h3>
      </Title>
      <div>
        <p className="py-2">Please give an answer to the question in this section.</p>
      </div>      
      <ApplicationQuestionCard question={question}/>
      <div>
        <p className="py-2">Time left to answer the question: <Timer initial={question.answer_duration} onTimeLimit={onTimeLimit}/></p>
      </div>       
    </div>
  );
};
