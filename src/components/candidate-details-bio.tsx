"use client";

import { FC, useState } from "react";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  Pencil2Icon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import { Textarea } from "./ui/textarea";
import { updateCandidate } from "@/actions/candidate";

interface IProps {
  candidate: Candidate;
}

export const CandidateDetailsBio: FC<IProps> = ({ candidate }) => {
  const { toast } = useToast();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="mt-3">
      <p className="font-medium text-lg">Bio:</p>
      {editMode ? (
        <div>
          <form
            action={async (formData: FormData) => {
              setLoading(true);
              const bio = formData.get("bio")?.toString() ?? ""
              const result = await updateCandidate(candidate.public_id, {...candidate, bio});
              setLoading(false);
              if (result.data) {
                setEditMode(false);
              } else {
                const { error } = result;
                const title = "Failed to update bio";
                const description = error
                  ? JSON.stringify(error)
                  : "Something went wrong";
                toast({ variant: "destructive", title, description });
              }
            }}
          >
            <Textarea
              name="bio"
              className="text-lg px-3 py-5"
              defaultValue={candidate.bio}
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
          </form>
        </div>
      ) : (
        <>
          <span className="text-lg">{candidate.bio}</span>
          <Button
            className="ml-2"
            variant="outline"
            size="icon6"
            onClick={() => setEditMode(true)}
          >
            <Pencil2Icon className="size-4" />
          </Button>
        </>
      )}
    </div>
  );
};
