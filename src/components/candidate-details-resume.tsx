"use client";

import { FC, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Button } from "./ui/button";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { Label } from "./ui/label";
import { bufferFromFile, generateFileName } from "@/lib/utils";
import { getContainerClient, uploadFileFromBuffer } from "@/lib/storage";
import { useToast } from "./ui/use-toast";
import { updateCandidate } from "@/actions/candidate";
import { fileContainers } from "@/constants"

interface IProps {
  candidate: Candidate;
  connectionString: string;
}

export const CandidateDetailsResume: FC<IProps> = ({ candidate, connectionString }) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-3">
      <CollapsibleTrigger asChild>
        <div className="flex w-full py-2 px-4 rounded-lg border-2">
          <h3 className="font-medium text-lg">Resume</h3>
          <Button variant="ghost" size="icon7">
            {isOpen ? (
              <ChevronUpIcon className="size-4" />
            ) : (
              <ChevronDownIcon className="size-4" />
            )}
          </Button>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="border-2 rounded-lg">
        {candidate.resume !== "" && (
          <div className="">
            <Button variant="link" size="xl">
              <a href={candidate.resume} target="_blank" rel="noopener noreferrer">Download</a>
            </Button>
          </div>
        )}
        <div className="px-10 py-2">
          <form action={async (formData: FormData) => {
            const file: File | null = formData.get("resume") as unknown as File;
            const buffer = await bufferFromFile(file);
            const client = await getContainerClient(connectionString, fileContainers.document);
            const { value, error } = await uploadFileFromBuffer(
              buffer,
              client,
              generateFileName(file),
              file.type
            );

            if (value) {
              toast({ title: "The file was uploaded", description: value });
              const resume = value.split("?")[0];
              const result = await updateCandidate(candidate.public_id, {...candidate, resume});
              if (result.data) {
                toast({ description: "Resume was updated" });
              }
            } else {
              const title = "Failed to upload the file";
              const description = error
                ? error.message
                : "Something went wrong";
              toast({ variant: "destructive", title, description });
            }
          }}>
            <Label
              htmlFor="resume"
              className="text-primary-dark text-lg underline-offset-4 hover:underline mr-3"
            >
              Upload resume
            </Label>
            <input id="resume" name="resume" type="file" />
            <Button variant="outline" type="submit" className="mx-1">
              Save
            </Button>
            <Button variant="secondary" type="reset">
              Cancel
            </Button>
          </form>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
