import { Title } from "@/components/title";
import { CompanyForm } from "../../company-form";
import { notFound } from "next/navigation";
import { getCompany } from "@/actions/company";

interface IProps {
  params: {
    companyId: string;
  };
}

const CompanyEditPage: React.FC<IProps> = async ({ params: { companyId } }) => {
  const company = await getCompany(companyId);

  if (company === undefined) {
    console.error(`Company with id ${companyId} is undefined`);
    notFound();
  }

  return (
    <div>
      <Title>
        <h2 className="text-3xl my-5">Edit Company</h2>
        <CompanyForm
          company={company}
          connectionString={
            process.env.NEXT_PUBLIC_BLOB_SAS_CONNECTION_STRING || ""
          }
        />
      </Title>
    </div>
  );
};

export default CompanyEditPage;
