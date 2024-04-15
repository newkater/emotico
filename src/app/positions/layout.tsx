import { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const PositionsLayout: FC<IProps> = ({ children }) => {
  return (
    <div>
      <main className="container mx-auto">{children}</main>
    </div>
  );
};

export default PositionsLayout;
