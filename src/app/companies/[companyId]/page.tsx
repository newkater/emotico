import { Title } from "@/components/title";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CompanyImage } from "@/components/company-image";
import { CompanyPositions } from "@/components/company-positions";
import { getCompany } from "@/actions/company";

type Props = {
  params: {
    companyId: string;
  };
};

const CompanyPage: React.FC<Props> = async ({ params: { companyId } }) => {
  const company = await getCompany(companyId);

  if (company === undefined) {
    notFound()
  }

  return (
    <div>
      <section className="flex bg-fill-medium my-5 p-12 items-center">
        <CompanyImage
          company={company}
          size={32}
          className="size-32 mr-12 hidden md:block"
        />
        <div>
          <Title className="text-2xl my-5">
            <h2>{company.name}</h2>
          </Title>
          <p className="text-xl">{company.description}</p>
          <div className="mt-7">
            <Button variant="default" size="xl">
              <Link href={`/companies/${companyId}/edit`}>Edit</Link>
            </Button>
            <Button variant="link" size="xl">
              <Link href="/companies">Back to Companies</Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="bg-fill-medium my-10 p-12">
        <Title className="text-3xl flex justify-center mb-5">
          <h2>Our Open Positions</h2>
        </Title>
        <CompanyPositions companyId={company.public_id} />
      </section>
    </div>
  );
};

export default CompanyPage;
