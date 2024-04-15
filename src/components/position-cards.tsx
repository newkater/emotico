import React, { FC } from "react";
import { PositionCard } from "./position-card";

interface IProps {
  positions: Position[];
}

export const PositionCards: FC<IProps> = ({ positions }) => {
  return (
    <>
      {positions.map((position) => (
        <PositionCard position={position} key={position.public_id}/>
      ))}
    </>
  );
};
