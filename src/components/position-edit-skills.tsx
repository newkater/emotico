"use client";

import React, { FC, useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  Pencil2Icon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import { addPositionSkills, removePositionSkills } from "@/actions/position";
import { SkillList } from "./skill-list";
import { SkillAddForm } from "./skill-add-form";

interface IProps {
  position: Position;
}

export const PositionEditSkills: FC<IProps> = ({ position }) => {
  const { toast } = useToast();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const currentSkills: string[] = position.skills ?? [];
  const [positionSkills, setPositionSkills] = useState<string[]>(currentSkills);

  const closeForm = () => {
    setLoading(false);
    setPositionSkills(currentSkills);
    setEditMode(false);
  };

  const Field = () => {
    return (
      <>
        <SkillList skills={currentSkills} />
        <Button
          className=""
          variant="ghost"
          size="icon8"
          onClick={() => setEditMode(true)}
        >
          <Pencil2Icon className="size-5" />
        </Button>
      </>
    );
  };

  return (
    <div className="p-5 text-lg">
      <p className="block mb-1 text-md font-medium text-gray-900">Skills:</p>
      {editMode ? (
        <>
          <SkillList
            skills={positionSkills}
            handleClick={(skill) =>
              setPositionSkills(positionSkills.filter((s) => s !== skill))
            }
          />
          <div className="flex mt-5 items-center">
            <SkillAddForm
              handleSubmit={(skill) =>
                setPositionSkills([...positionSkills, skill])
              }
              className="ml-2"
            />
          </div>
          <form
            action={async () => {
              setLoading(true);
              const skillsToRemove = currentSkills.filter(
                (s) => !positionSkills.includes(s)
              );

              const removeResult = await removePositionSkills(position.public_id, skillsToRemove);
              const result = await addPositionSkills(position.public_id, positionSkills);
              setLoading(false);
              if (result.status >= 0) {
                toast({ description: "Skills have been updated." });
                setEditMode(false);
              } else {
                const { error } = result;
                console.error({ error });
                const title = "Failed to update skills";
                const description = error
                  ? JSON.stringify(error)
                  : "Something went wrong";
                toast({ variant: "destructive", title, description });
              }
            }}
          >
            {loading ? (
              <Button variant="outline" size="icon">
                <ReloadIcon className="animate-spin size-5" />
              </Button>
            ) : (
              <div className="flex mt-2">
                <Button
                  type="submit"
                  variant="outline"
                  size="icon"
                  className="ml-1"
                >
                  <CheckCircledIcon className="size-5" />
                </Button>
                <Button
                  variant="outline"
                  className="ml-1"
                  size="icon"
                  onClick={closeForm}
                >
                  <CrossCircledIcon className="size-5" />
                </Button>
              </div>
            )}
          </form>
        </>
      ) : (
        Field()
      )}
    </div>
  );
};
