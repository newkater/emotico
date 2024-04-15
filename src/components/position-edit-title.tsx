"use client";

import React, { FC, useState } from "react";
import { useToast } from "./ui/use-toast";
import { updatePosition } from "@/actions/position";
import {
  ReloadIcon,
  Pencil2Icon,
  CheckCircledIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface IProps {
  position: Position;
}

export const PositionEditTitle: FC<IProps> = ({ position }) => {
  const { toast } = useToast();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const Field = () => {
    return (
      <div className="p-5 text-lg">
        <p className="block mb-1 text-md min-w-[350px] font-medium text-gray-900">
          Title:
        </p>
        <p>
          <span className="h-8">{position.name}</span>
          <Button
            className=""
            variant="ghost"
            size="icon8"
            onClick={() => setEditMode(true)}
          >
            <Pencil2Icon className="size-5" />
          </Button>
        </p>
      </div>
    );
  };

  return (
    <>
      {editMode ? (
        <div className="p-5 text-lg">
          <form
            id="position_title"
            action={async (formData: FormData) => {
              setLoading(true);
              const result = await updatePosition(position.public_id, formData);
              setLoading(false);
              if (result.data) {
                toast({ description: "The position has been updated." });
                setEditMode(false);
              } else {
                const { error } = result;
                const title = "Failed to update the title";
                const description = error
                  ? JSON.stringify(error)
                  : "Something went wrong";
                toast({ variant: "destructive", title, description });
              }
            }}
          >
            <Label className="text-md" htmlFor="title">Title:</Label>
            <div className="">              
              <Input
                id="title"
                name="name"
                type="text"
                className="text-md"
                defaultValue={position.name}
                disabled={loading}
              />
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
                    onClick={() => setEditMode(false)}
                  >
                    <CrossCircledIcon className="size-5" />
                  </Button>
                  </div>
              )}
            </div>
          </form>
        </div>
      ) : (
        Field()
      )}
    </>
  );
};
