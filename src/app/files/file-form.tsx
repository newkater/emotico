"use client";

import { uploadFileFromBuffer, getContainerClient } from "@/lib/storage";
import { bufferFromFile } from "@/lib/utils";
import { FC } from "react";

interface IProps {
  connectionString: string
}

export const FileForm: FC<IProps> = ({connectionString}) => {
  return (
    <div className="mt-10">
      <form
        action={async (formData: FormData) => {
          console.log(connectionString);

          const file: File | null = formData.get("file") as unknown as File;
          const buffer = await bufferFromFile(file)
          const client = await getContainerClient(connectionString, "test");
          const { value, error } = await uploadFileFromBuffer(buffer, client, file.name, file.type)

          if (value) {
            console.log({
              title: "The image was uploaded",
              description: value,
            });
          } else {
            const title = "Failed to upload the image";
            const description = error ? error.message : "Something went wrong";
            console.error({ variant: "destructive", title, description });
          }
        }}
      >
        <input type="file" name="file" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
