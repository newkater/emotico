import { cn } from "@/lib/utils";
import { Roboto_Condensed } from "next/font/google";

interface IProps {
  children: React.ReactNode;
  className?: string;
}

const robotoCondensed = Roboto_Condensed({ subsets: ["latin", "cyrillic"] });

export const Title: React.FC<IProps> = ({ children, className = "" }) => {
  return (
    <div
      className={
        cn(robotoCondensed.className, "text-primary-dark font-bold", className)
      }
    >
      {children}
    </div>
  );
};
