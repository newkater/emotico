import { FC } from "react";
import { Card } from "./ui/card";

interface IProps {
  question: Question;
}

export const ApplicationQuestionCard: FC<IProps> = ({ question }) => {
  return (
    <Card className="p-16 my-3">
      <span className="text-lg font-medium">{question.name}</span>
    </Card>
  );
};
