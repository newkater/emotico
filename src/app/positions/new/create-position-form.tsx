"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FC, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { addPosition } from "@/actions/position";
import { redirect } from "next/navigation";
import { SkillAddForm } from "@/components/skill-add-form";

interface IProps {}

export const CreatePositionForm: FC<IProps> = ({}) => {
  const { toast } = useToast();

  const position: PositionCreate = {
    name: "",
    description: "",
    skills: [],
    status: 0,
  };

  const [form, setForm] = useState<PositionCreate>(position);

  const removeSkill = (skill: string) => {
    const skillset = new Set(form.skills);
    skillset.delete(skill);
    const skills = Array.from(skillset);
    setForm({ ...form, skills });
  };

  const addSkill = (skill: string) => {
    const skillset = new Set(form.skills);
    skillset.add(skill);
    const skills = Array.from(skillset);
    setForm({ ...form, skills });
  };

  return (
    <>
      <form
        id="createpositionform"
        action={async () => {
          const result = await addPosition(form);
          if (result.data) {
            toast({ description: "The position has been created." });
            redirect("/positions");
          } else {
            const { error } = result;
            const title = "Failed to create a position";
            const description = error
              ? JSON.stringify(error)
              : "Something went wrong";
            toast({ variant: "destructive", title, description });
          }
        }}
      >
        <div className="my-3">
          <Label htmlFor="name" className="font-medium">
            Name:
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            className="mt-1"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          ></Input>
        </div>
        <div className="my-3">
          <Label htmlFor="description" className="font-medium">
            Description:
          </Label>
          <Textarea
            id="description"
            name="description"
            rows={3}
            className="mt-1"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          ></Textarea>
        </div>
        <div className="my-3">
          <Label className="font-medium mr-1">Skills:</Label>

          <div>
            {form.skills.map((skill) => (
              <Badge
                variant="primary"
                className="text-md font-medium mr-1 hover:border-dashed"
                onClick={() => removeSkill(skill)}
                key={skill}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </form>
      <SkillAddForm
        className="mt-3"
        handleSubmit={(skill: string) => {
          addSkill(skill);
        }}
      />
      <div className="mt-10">
        <Button form="createpositionform" type="submit" size="xl">
          Create
        </Button>
        <Button variant="link" size="xl">
          <Link href="/positions">Back to positions</Link>
        </Button>
      </div>
    </>
  );
};
