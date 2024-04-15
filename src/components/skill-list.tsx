import React, { FC } from "react";
import { Badge } from "./ui/badge";

interface IProps {
  skills: string[];
  className?: string;
  handleClick?: (skill: string) => void;
}

export const SkillList: FC<IProps> = ({ skills, className = "", handleClick }) => {
  return (
    <div className={className}>
      {skills.map((skill) => (
        <Badge
          variant="primary"
          className="text-md font-medium mr-1"
          key={skill}
          onClick={handleClick ? () =>  handleClick(skill) : undefined}
        >
          {skill}
        </Badge>
      ))}
    </div>
  );
};
