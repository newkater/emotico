import { getCandidateAccount } from "@/actions/account";
import { notFound } from "next/navigation";
import React, { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Title } from "./title";
import { CandidateDetails } from "./candidate-details";
import { ProfileDetailsAvatar } from "./profile-details-avatar";

const connectionString =
  process.env.NEXT_PUBLIC_BLOB_SAS_CONNECTION_STRING || "";

interface IProps {}

export const ProfileCandidate: FC<IProps> = async () => {
  const candidate = await getCandidateAccount();

  if (candidate === undefined) {
    notFound();
  }

  return (
    <div>
      <div className="flex items-top">
        <div className="px-10 hidden md:flex">
          <Avatar className="size-32">
            <AvatarImage src={candidate.photo} />
            <AvatarFallback>
              {candidate.first_name[0]}
              {candidate.last_name[0]}
            </AvatarFallback>
          </Avatar>`          
        </div>
        <div className="mt-2">
          <Title >
            <h3 className="text-2xl font-medium">
              {candidate.first_name} {candidate.last_name}
            </h3>
          </Title>

          {candidate && <CandidateDetails candidate={candidate} />}
          {candidate && (
            <ProfileDetailsAvatar
              connectionString={connectionString}
              candidate={candidate}
            />
          )}
        </div>
      </div>
    </div>
  );
};
