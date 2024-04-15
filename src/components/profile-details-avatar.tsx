"use client";

import { fileContainers } from "@/constants";
import { getContainerClient, uploadFileFromBuffer } from "@/lib/storage";
import { bufferFromFile, generateFileName } from "@/lib/utils";
import { FC } from "react";
import { useToast } from "./ui/use-toast";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { updateCandidate } from "@/actions/candidate";

interface IProps {
  candidate: Candidate;
  connectionString: string;
}

export const ProfileDetailsAvatar: FC<IProps> = ({
  candidate,
  connectionString,
}) => {
  const { toast } = useToast();
  return (
    <div className="p-5 text-lg">
      <p className="block mb-1 text-md font-medium text-gray-900">Image:</p>
      <form
        action={async (formData: FormData) => {
          const file: File | null = formData.get("avatar") as unknown as File;
          const buffer = await bufferFromFile(file);
          const client = await getContainerClient(
            connectionString,
            fileContainers.image
          );
          const { value, error } = await uploadFileFromBuffer(
            buffer,
            client,
            generateFileName(file),
            file.type
          );

          if (value) {
            toast({ title: "The file was uploaded", description: value });
            const image = value.split("?")[0];
            const photo = image;
            const result = await updateCandidate(candidate.public_id, {...candidate, photo});
            if (result.data) {
              toast({ description: "The image was updated" });
            }
          } else {
            const title = "Failed to upload the image";
            const description = error ? error.message : "Something went wrong";
            toast({ variant: "destructive", title, description });
          }
        }}
      >
        <Label
          htmlFor="avatar"
          className="text-primary-dark text-lg underline-offset-4 hover:underline mr-3"
        >
          Upload profile image
        </Label>
        <input id="avatar" name="avatar" type="file" />
        <Button variant="outline" type="submit" className="mx-1">
          Save
        </Button>
        <Button variant="secondary" type="reset">
          Cancel
        </Button>
      </form>
    </div>
  );
};
