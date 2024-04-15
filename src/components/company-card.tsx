import { FC } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { CompanyImage } from "./company-image";
import Link from "next/link";
import { TextCondensed } from "./text-condensed";
import { Button } from "./ui/button";

interface IProps {
  company: Company;
}

export const CompanyCard: FC<IProps> = ({ company }) => {
  return (
    <Card className="size-76">
      <Link href={`/companies/${company.public_id}`}>
        <CardHeader>
          <CardTitle className="flex justify-center">{company.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <CompanyImage company={company} size={36} className="size-36" />
        </CardContent>
        <CardFooter className="text-primary-dark text-lg flex justify-center py-0 mb-2">
          <Button variant="link" size="xl">
            <TextCondensed className="text-lg">details</TextCondensed>
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
};
