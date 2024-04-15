import { getPosition } from "@/actions/position";
import { PositionDetails } from "@/components/position-details";
import { Title } from "@/components/title";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";

interface IProps {
  params: {
    positionId: string;
  };
}

const CompanyEditPage: React.FC<IProps> = async ({
  params: { positionId },
}) => {
  const position = await getPosition(positionId);

  if (position === undefined) {
    notFound();
  }

  return (
    <div>
      <Title className="text-3xl flex justify-center pt-8 pb-6">
        <h2>Position Details</h2>
      </Title>
      <PositionDetails position={position} />
      <Button variant="link" size="xl">
        <Link href="/positions">To Position List</Link>
      </Button>
      <Button variant="link" size="xl">
        <Link href={`/companies/${position.company.public_id}`}>
          Other {position.company.name} positions
        </Link>
      </Button>
    </div>
  );
};

export default CompanyEditPage;
