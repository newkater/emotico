"use client";

import { FC, useState } from "react";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  Pencil2Icon,
  ReloadIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { removeQuestion, updateQuestion } from "@/actions/question";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

interface IProps {
  question: Question;
  positionId: string;
  index: number;
}

export const QuestionEditForm: FC<IProps> = ({
  index,
  question,
  positionId,
}) => {
  const { toast } = useToast();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      {editMode ? (
        <div className="text-lg py-2 px-3">
          <form
            action={async (formData: FormData) => {
              setLoading(true);
              const name = formData.get("name")?.toString() ?? ""
              const read_duration: number = parseInt(formData.get("read_duration")?.toString() ?? question.read_duration.toString())
              const answer_duration: number = parseInt(formData.get("answer_duration")?.toString() ?? question.answer_duration.toString())
              const result = await updateQuestion({...question, name, read_duration, answer_duration}, positionId);
              setLoading(false);
              if (result) {
                setEditMode(false);
              } else {
                const title = "Failed to update the question";
                const description = "Something went wrong";
                toast({ variant: "destructive", title, description });
              }
            }}
          >
            <div className="flex items-center">
              <Input
                name="name"
                type="text"
                className="text-lg px-3 py-5"
                defaultValue={question.name}
                disabled={loading}
              />
              <Input
                name="read_duration"
                type="number"
                step={30}
                className="text-lg px-3 py-5 w-24 ml-1"
                defaultValue={question.read_duration}
                disabled={loading}
              />
              <Input
                name="answer_duration"
                type="number"
                step={30}
                className="text-lg px-3 py-5 w-24 ml-1"
                defaultValue={question.answer_duration}
                disabled={loading}
              />                     
              {loading ? (
                <Button variant="outline" size="icon">
                  <ReloadIcon className="animate-spin size-6" />
                </Button>
              ) : (
                <div className="flex">
                  <Button
                    type="submit"
                    variant="outline"
                    size="icon"
                    className="ml-1"
                  >
                    <CheckCircledIcon className="size-6" />
                  </Button>
                  <Button
                    variant="outline"
                    className="ml-1"
                    size="icon"
                    onClick={() => setEditMode(false)}
                  >
                    <CrossCircledIcon className="size-6" />
                  </Button>
                </div>
              )}
            </div>
          </form>
        </div>
      ) : (
        <div className="flex items-center text-lg py-2 px-3 rounded-lg hover:bg-gray-100">
          <span className="text-primary-dark mr-1">{index + 1}. </span>
          <span>{question.name}</span>
          <Badge variant="primary" className="mx-2">{question.read_duration}</Badge>
          <Badge variant="primary">{question.answer_duration}</Badge>
          <div className="flex">
            <Button
              className="ml-2"
              variant="outline"
              size="icon6"
              onClick={() => setEditMode(true)}
            >
              <Pencil2Icon className="size-4" />
            </Button>
            <form
              action={async () => {
                if (confirm("The question will be deleted. Are you sure?")) {
                  const success = await removeQuestion(
                    positionId,
                    question.public_id
                  );
                  if (success) {
                    toast({ description: "The question has been deleted." });
                  } else {
                    const title = "Failed to delete the question";
                    const description = "Something went wrong";
                    toast({ variant: "destructive", title, description });
                  }
                }
              }}
            >
              <Button type="submit" className="ml-1" variant="outline" size="icon6">
                <TrashIcon className="size-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
