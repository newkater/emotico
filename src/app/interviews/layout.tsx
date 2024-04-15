import { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const InterviewsLayout: FC<IProps> = ({ children }) => {
  return (
    <div>
      <main className="container mx-auto">{children}</main>
    </div>
  );
};

export default InterviewsLayout;
