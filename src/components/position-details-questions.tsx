import { FC } from "react";
import { Title } from "./title";
import { QuestionList } from "./question-list";
import { QuestionAddForm } from "./question-add-form";
import { getQuestions } from "@/actions/question";

interface IProps {
  position: Position;
}

export const PositionDetailsQuestions: FC<IProps> = async ({position}) => {
  const questions = await getQuestions(position.public_id) ?? []
  
  return (
    <div className="p-6">
      <Title className="text-xl mb-2">Inteview Questions</Title>
      <QuestionList positionId={position.public_id} questions={questions}/>
      <QuestionAddForm positionId={position.public_id} />
    </div>
  );
};
