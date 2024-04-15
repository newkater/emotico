import { getPosition } from "@/actions/position";
import { CompanyImage } from "@/components/company-image";
import { Title } from "@/components/title";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getUserRole } from "@/lib/auth";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: {
    positionId: string;
  };
};

const PositionPage: React.FC<Props> = async ({ params: { positionId } }) => {
  const position = await getPosition(positionId);
  if (position === undefined) {
    notFound();
  }

  const role = await getUserRole();

  return (
    <div>
      <Title className="text-3xl flex justify-center pt-8 pb-6">
        <h2>
          {position.name} in {position.company.name}
        </h2>
      </Title>
      <section className="bg-fill-medium my-5 p-12">
        <div className="flex items-center">
          <CompanyImage
            company={position.company}
            size={40}
            className="size-40 mr-12 hidden md:block"
          />
          <div>
            <div>
              <p className="font-medium text-lg">Position:</p>
              <p>{position.name}</p>
            </div>
            <div>
              <p className="font-medium text-lg">Company:</p>
              <p>{position.company.name}</p>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h3 className="font-medium text-lg">Details:</h3>
          <p>{position.description}</p>
        </div>
        <div className="mt-5">
          <h3 className="font-medium text-lg">Skills:</h3>
          {position.skills &&
            position.skills.map((skill) => (
              <Badge
                variant="primary"
                className="text-md font-medium mr-1"
                key={skill}
              >
                {skill}
              </Badge>
            ))}
        </div>
      </section>
      {role === "RECRUITER" && (
        <Button variant="default" size="xl">
          <Link href={`/positions/${position.public_id}/edit`}>Edit</Link>
        </Button>
      )}
      {role === "CANDIDATE" && (
        <Button variant="default" size="xl">
          <Link href={`/positions/${position.public_id}/apply`}>Apply</Link>
        </Button>
      )}
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

export default PositionPage;
