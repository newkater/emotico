import { Roboto_Condensed } from "next/font/google";
import { cn } from "@/lib/utils";

interface IProps {
  children: React.ReactNode;
  className?: string;
}

const robotoCondensed = Roboto_Condensed({ subsets: ["latin", "cyrillic"] });

export const TextCondensed: React.FC<IProps> = ({
  children,
  className = "",
}) => {
  return (
    <span className={cn(robotoCondensed.className, className)}>{children}</span>
  );
};
