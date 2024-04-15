import { getCandidateInterviews } from "@/actions/interview";
import { InterviewCard } from "@/app/interviews/interview-card";
import React from "react";

export const InterviewsCandidate = async () => {
  const data = await getCandidateInterviews()
  const interviews = data?.interviews ?? []

  return (
    <div>
      {interviews.map((interview) => (
        <InterviewCard key={interview.public_id} interview={interview} />
      ))}
    </div>
  );
};
