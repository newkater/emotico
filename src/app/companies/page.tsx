import { getCompanies } from "@/actions/company";
import { CompanyBlockList } from "@/components/company-block-list";
import { Title } from "@/components/title";

const Companies = async () => {
  const data = await getCompanies();
  const companies = data?.companies

  return (
    <div>
      <Title className="text-3xl flex justify-center pt-8 pb-6">
        <h2>Browse Companies</h2>
      </Title>
      <CompanyBlockList
        companies={ companies ?? []}
      />
    </div>
  );
};

export default Companies;
