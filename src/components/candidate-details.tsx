import { FC } from "react";
import { CandidateDetailsEducation } from "./candidate-details-education";
import { CandidateDetailsBio } from "./candidate-details-bio";
import { CandidateDetailsResume } from "./candidate-details-resume";
import { CandidateDetailsSkills } from "./candidate-details-skills";
import { CandidateDetailsPosition } from "./candidate-details-position";

const connectionString =
  process.env.NEXT_PUBLIC_BLOB_SAS_CONNECTION_STRING || "";

interface IProps {
  candidate: Candidate;
}

export const CandidateDetails: FC<IProps> = async ({ candidate }) => {
  return (
    <div>
      <CandidateDetailsPosition candidate={candidate} />
      <CandidateDetailsBio candidate={candidate} />
      <CandidateDetailsEducation candidate={candidate} />
      <CandidateDetailsSkills candidate={candidate} /> 
      <CandidateDetailsResume
        candidate={candidate}
        connectionString={connectionString}
      />
    </div>
  );
};
