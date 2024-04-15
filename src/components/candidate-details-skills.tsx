"use client";

import { FC, useState } from "react";
import { SkillList } from "./skill-list";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  Pencil2Icon,
} from "@radix-ui/react-icons";
import { addCandidateSkills, removeCandidateSkills } from "@/actions/candidate";
import { SkillAddForm } from "./skill-add-form";

interface IProps {
  candidate: Candidate;
}

export const CandidateDetailsSkills: FC<IProps> = ({ candidate }) => {
  const { toast } = useToast();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const currentSkills: string[] = candidate.skills ?? [];
  const [candidateSkills, setCandidateSkills] =
    useState<string[]>(currentSkills);

  const closeForm = () => {
    setLoading(false);
    setCandidateSkills(currentSkills);
    setEditMode(false);
  };

  return (
    <div>
      <p className="font-medium text-lg mt-3">Skills:</p>
      {editMode ? (
        <>
          <SkillList
            skills={candidateSkills}
            handleClick={(skill) =>
              setCandidateSkills(candidateSkills.filter((s) => s !== skill))
            }
          />
          <div className="flex mt-5 items-center">
            <SkillAddForm
              handleSubmit={(skill) =>
                setCandidateSkills([...candidateSkills, skill])
              }
              className="ml-2"
            />
          </div>
          <form
            action={async () => {
              setLoading(true);
              const skillsToRemove = currentSkills.filter(s => !candidateSkills.includes(s))
              
              const removeResult = await removeCandidateSkills(skillsToRemove)             
              const result = await addCandidateSkills(
                candidateSkills
              );
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
          </form>
        </>
      ) : (
        <>
          <SkillList skills={candidate.skills ?? []} />
          <Button
            className=""
            variant="ghost"
            size="icon8"
            onClick={() => setEditMode(true)}
          >
            <Pencil2Icon className="size-5" />
          </Button>
        </>
      )}
    </div>
  );
};
