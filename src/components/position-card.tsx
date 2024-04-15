import Link from "next/link";
import { FC } from "react";
import { CompanyImage } from "./company-image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";

interface IProps {
  position: Position;
}

export const PositionCard: FC<IProps> = ({ position }) => {
  return (
    <Card className="size-80">
      <Link href={`/positions/${position.public_id}`}>
        <div className="flex flex-col justify-between">
          <CardHeader>
            <div className="min-h-12">
              <CardTitle>
                {position.company.name} - {position.name}
              </CardTitle>              
            </div>
          </CardHeader>
          <CardContent className="flex justify-center h-36">
            <CompanyImage
              company={position.company}
              size={20}
              className="size-20 min-w-20 mr-2"
            />
            <div className="text-ellipsis">{position.description}</div>
          </CardContent>
          <CardFooter>
            <div className="">
              <strong>Main skills: </strong>
              <span>
                {position.skills ? position.skills.join(", ") : ""}
              </span>
            </div>
          </CardFooter>
        </div>
      </Link>
    </Card>
  );
};
