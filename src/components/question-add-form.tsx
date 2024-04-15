"use client";

import { FC, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { addQuestions } from "@/actions/question";
import { useToast } from "./ui/use-toast";
import { cn } from "@/lib/utils";

interface IProps {
  positionId: string;
  className?: string;
}

export const QuestionAddForm: FC<IProps> = ({ positionId, className = "" }) => {
  const { toast } = useToast();
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className={cn(className, "mt-3")}>
      <form
        action={async (formData) => {
          setLoading(true);
          const name = formData.get("text")?.toString() ?? "";
          const read_duration: number = parseInt(formData.get("read_duration")?.toString() ?? "60")
          const answer_duration: number = parseInt(formData.get("answer_duration")?.toString() ?? "90")
          const question: QuestionCreate = {
            name,
            read_duration,
            answer_duration,
          };
          const result = await addQuestions(positionId, [question]);
          setLoading(false);
          if (result.data) {
            setValue("");
          } else {
            const { error } = result;
            const title = "Failed to create a question";
            const description = error
              ? JSON.stringify(error)
              : "Something went wrong";
            toast({ variant: "destructive", title, description });
          }
        }}
      >
        <div className="flex items-center py-2 px-3">
          <Input
            className="text-lg px-3 py-5"
            type="text"
            name="text"
            placeholder="Add a new question"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          {value !== "" && (
            <div className="flex items-center">
              <Input
                name="read_duration"
                type="number"
                step={30}
                className="text-lg px-3 py-5 w-24 ml-1"
                defaultValue={60}
                disabled={loading}
              />
              <Input
                name="answer_duration"
                type="number"
                step={30}
                className="text-lg px-3 py-5 w-24 ml-1"
                defaultValue={180}
                disabled={loading}
              />
              <div className="flex">
                <Button
                  type="submit"
                  disabled={value === "" || loading}
                  variant="outline"
                  size="icon"
                  className="ml-1"
                >
                  <CheckCircledIcon className="size-6" />
                </Button>
                <Button
                  variant="outline"
                  disabled={value === "" || loading}
                  className="ml-1"
                  size="icon"
                  onClick={() => setValue("")}
                >
                  <CrossCircledIcon className="size-6" />
                </Button>                
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
