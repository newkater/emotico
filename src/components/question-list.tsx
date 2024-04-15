import { FC } from "react";
import { QuestionEditForm } from "./question-edit-form";

interface IProps {
  questions: Question[];
  positionId: string;
  className?: string;
}

export const QuestionList: FC<IProps> = ({
  questions,
  positionId,
  className = "",
}) => {
  return (
    <div className={className}>
      <ol>
        {questions.map((question, index) => (
          <li key={question.public_id}>
            <QuestionEditForm
              question={question}
              positionId={positionId}
              index={index}
            />
          </li>
        ))}
      </ol>
    </div>
  );
};
