import { FC } from "react";
import { ImSpinner7 } from "react-icons/im";

interface IProps {
  size: number;
}

export const Spinner: FC<IProps> = ({ size }) => {
  return (
    <div className="p-5">
      <ImSpinner7 size={size} className="text-primary-dark animate-spin" />
    </div>
  );
};
