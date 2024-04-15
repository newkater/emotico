import React, { FC } from "react";
import { CompanyImage } from "./company-image";
import { PositionEditTitle } from "./position-edit-title";
import { PositionEditDescription } from "./position-edit-description";
import { PositionEditSkills } from "./position-edit-skills";

interface IProps {
  position: Position;
}

export const PositionDetailsInfo: FC<IProps> = async ({ position }) => {
  return (
    <div className="flex flex-col p-6">
      <div className="flex">
        <CompanyImage
          size={24}
          company={position.company}
          className="size-24 m-3"
        />
        <div className="p-5 text-lg w-full">
          <span className="font-semibold">Company: </span>
          <span>{position.company.name}</span>
        </div>
      </div>
      <PositionEditTitle position={position} />
      <PositionEditDescription position={position} />
      <PositionEditSkills position={position} />
    </div>
  );
};
