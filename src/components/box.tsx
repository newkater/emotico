import { cn } from "@/lib/utils";
import React from "react";

interface IProps {
  children: React.ReactNode;
  className?: string;
}

export const Box: React.FC<IProps> = ({ children, className = "" }) => {
  return (
    <div
      className={
        cn("rounded-xl p-10 border-solid border-2 border-gray-300 shadow-lg opacity-80 hover:opacity-100 hover:border-gray-400 hover:scale-[1.02] transition duration-150 ease-in-out", className)
      }
    >
      {children}
    </div>
  );
};
