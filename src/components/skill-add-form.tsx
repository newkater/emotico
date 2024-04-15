"use client";

import { FC, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";

interface IProps {
  handleSubmit: (skill: string) => void;
  className?: string;
}

export const SkillAddForm: FC<IProps> = ({ handleSubmit, className = "" }) => {
  const [value, setValue] = useState<string>("");
  return (
    <div className={className}>
      <form
        action={() => {
          if (value !== "") {
            handleSubmit(value);
            setValue("");
          }
        }}
      >
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            name="name"
            type="text"
            placeholder="Add a new skill"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          {value !== "" && (
            <>
              <Button
                type="submit"
                disabled={value === ""}
                variant="ghost"
                size="empty"
                className=""
              >
                <CheckCircledIcon className="size-5" />
              </Button>
              <Button
                variant="ghost"
                disabled={value === ""}
                className=""
                size="empty"
                onClick={() => setValue("")}
              >
                <CrossCircledIcon className="size-5" />
              </Button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};
