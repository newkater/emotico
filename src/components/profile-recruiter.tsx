import { getRecruiterAccount } from "@/actions/account";
import { notFound, redirect } from "next/navigation";
import React, { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Title } from "./title";
import { ProfileDetailsAvatar } from "./profile-details-avatar";
import { ProfileRecruiterAvatar } from "./profile-recruiter-avatar";
import { getPositions } from "@/actions/position";
import { LOGIN_PATH } from "@/routes";
import { PositionCards } from "./position-cards";
import { PositionCardAdd } from "./position-card-add";

const connectionString =
  process.env.NEXT_PUBLIC_BLOB_SAS_CONNECTION_STRING || "";

interface IProps {
  userId: string;
}

export const ProfileRecruiter: FC<IProps> = async ({ userId }) => {
  const recruiter = await getRecruiterAccount();

  if (recruiter === undefined) {
    redirect(LOGIN_PATH);
  }

  const positions = (await getPositions()) ?? [];

  const myPositions = positions.filter(
    (position) => position.company.public_id === recruiter.company_public_id
  );

  if (recruiter === undefined) {
    notFound();
  }

  return (
    <div>
      <Avatar className="size-32">
        <AvatarImage src={recruiter.photo} />
        <AvatarFallback>
          {recruiter.first_name[0]}
          {recruiter.last_name[0]}
        </AvatarFallback>
      </Avatar>
      <Title className="py-2 mt-2">
        <h3 className="text-2xl font-medium">
          {recruiter.first_name} {recruiter.last_name}
        </h3>
      </Title>
      <ProfileRecruiterAvatar
        connectionString={connectionString}
        userId={userId}
      />
      <div>
        <Title className="text-2xl flex justify-center py-6">
          <h3>My Positions:</h3>
        </Title>
        <section className="flex flex-wrap gap-12 justify-center">
          <PositionCardAdd />
          <PositionCards
            positions={
              myPositions?.map((position) => {
                return {
                  ...position,
                  recruiter_public_id: recruiter.public_id,
                  description: "",
                  company: { ...position.company, description: "" },
                };
              }) ?? []
            }
          />
        </section>
      </div>
    </div>
  );
};
