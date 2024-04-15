import { Box } from "./box";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import Link from "next/link";

import { Roboto_Condensed } from "next/font/google";
import { cn } from "@/lib/utils";

const robotoCondensed = Roboto_Condensed({ subsets: ["latin", "cyrillic"] });


const Card = (
  title: string,
  text: string,
  i: number
) => {
  return (
  <Box key={variant(i)} className={variant(i)}>
    <Link href={"/positions"}>
      <div className="flex justify-between py-6 px-10 items-center">
        <h3 className="text-4xl italic font-medium">{title}</h3>
        <div>
        <HiOutlineArrowLongRight className={"mx-3"} size={50} />          
        </div>
      </div>
      <p className="text-3xl py-8 px-10 italic">{text}</p>
    </Link>
  </Box>
  )
};

const variant = (i: number) => {
  switch (i) {
    case 1: return "bg-color-1"
    case 2: return "bg-color-2"
    case 3: return "bg-color-3"  
    default: return undefined
  }
}

const cards = [
  {
    title: "Search for your dream job",
    text: "Enjoy a simplified search for positions that are perfect for you.",
    variant: 1
  },
  {
    title: "Participate in interviews",
    text: "We provide a comfortable interview platform with quick and extensive feedback.",
    variant: 2
  },
  {
    title: "Search applicants for your position",
    text: "All you have to do is post the job and read the report. We will do the rest.",
    variant: 3
  },
];

export const HomeMain = () => {
  return (
    <div className={cn(robotoCondensed.className, "container grid lg:grid-cols-2 gap-10 py-16")}>
      <div className="py-10 px-20">
        <div className="">
          <h3 className="text-5xl font-semibold">
            Enhance your interview experience with
          </h3>
        </div>
        <p className="text-5xl text-primary-light py-10 font-semibold">
          Emotico
        </p>
      </div>
      {cards.map(card => Card(card.title, card.text, card.variant))}
    </div>
  );
};
