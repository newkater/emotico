import { cn } from "@/lib/utils";
import { Roboto_Condensed } from "next/font/google";

const robotoCondensed = Roboto_Condensed({ subsets: ["latin", "cyrillic"] });

interface IProps {
  children: React.ReactNode;
}

export const CardFooter: React.FC<IProps> = ({ children }) => {
  return <div className={cn(robotoCondensed.className, " text-primary-dark font-medium text-lg py-5")}>{children}</div>;
};
