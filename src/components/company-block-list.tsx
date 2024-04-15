import React, { FC } from "react";
import { CompanyCard } from "./company-card";
import { CompanyCardAdd } from "./company-card-add";

interface IProps {
  companies: Company[];
}

export const CompanyBlockList: FC<IProps> = async ({ companies }) => {
  return (
    <div className="flex flex-wrap gap-12 justify-center">
      <CompanyCardAdd />      
      {companies.map((company) => (
        <CompanyCard company={company} key={company.public_id} />
      ))}
    </div>
  );
};
