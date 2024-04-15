"use client";

import { createInterview } from "@/actions/interview";
import { Title } from "@/components/title";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";
import React, { FC } from "react";

interface IProps {
  position: Position;
}

export const CreateInterviewForm: FC<IProps> = ({ position }) => {
  const { toast } = useToast();
  return (
    <div>
      <Title className="text-lg">Follow the link to start</Title>
      <form
        action={async () => {
          const interviewId = await createInterview(position.public_id)
          if (interviewId){
            toast({ description: "Interview created." });
            redirect(`/interviews/${interviewId}`)
          } else {
            const title = "Failed to start the interview";
            const description = "Something went wrong";
            toast({ variant: "destructive", title, description });
          }
        }}
      >
        <Button type="submit" variant="link" size="xl">
          <div className="text-lg">Proceed</div>
        </Button>
      </form>
    </div>
  );
};
