import { FC } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { grayscaleLogo } from "@/assets/images";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import { TextCondensed } from "./text-condensed";
import { Button } from "./ui/button";
import { SquareImage } from "./square-image";

export const PositionCardAdd: FC = ({}) => {
  return (
    <Card className="size-80">
      <Link href="/positions/new">
        <CardHeader>
          <CardTitle className="flex justify-center">
            <Skeleton className="h-4 mt-2 w-32">
            </Skeleton>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="size-36 rounded-md bg-neutral-900/10 flex items-center justify-center">
          <SquareImage src={grayscaleLogo} alt={"add new position"} size={28} className="size-28 bg-transparent opacity-50" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" size="xl">
            <TextCondensed className="text-lg">Add new position</TextCondensed>
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
};
