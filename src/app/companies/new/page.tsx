import { Title } from "@/components/title";
import React from "react";
import { CreateCompanyForm } from "./create-company-form";

const CreateCompanyPage = () => {
  return (
    <div>
      <Title>
        <h2 className="text-3xl my-5">Add Company</h2>
        <CreateCompanyForm />
      </Title>
    </div>
  );
};

export default CreateCompanyPage;
