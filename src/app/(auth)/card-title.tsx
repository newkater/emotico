import { cn } from "@/lib/utils";
import { Roboto_Condensed } from "next/font/google";

interface IProps {
  children: React.ReactNode;
}

const robotoCondensed = Roboto_Condensed({ subsets: ["latin", "cyrillic"] });

export const CardTitle: React.FC<IProps> = ({children}) => {
  return (
    <div
      className={
        cn(robotoCondensed.className, " text-primary-dark font-bold text-4xl m-2")
      }
    >
     {children}
    </div>
  );
};
