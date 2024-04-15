"use client";

import React from "react";
import { FormInput } from "./form-input";
import { redirect } from "next/navigation";
import { LOGIN_PATH } from "@/routes";
import { FormSelect } from "./form-select";
import { registerRecruiter } from "@/actions/account";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import Link from "next/link";
import { TextCondensed } from "./text-condensed";

interface IProps {
  companies: Company[];
}

export const RegisterForm: React.FC<IProps> = ({ companies }) => {
  const options = companies.map((c) => ({ key: c.public_id, value: c.name }));
  const { toast } = useToast();

  const onSubmit = async (formData: FormData) => {
    const companyId = formData.get("company_public_id")?.toString() ?? "";
    const companyName =
      companies.find((c) => c.public_id === companyId)?.name ?? "";
    formData.set("company_name", companyName);
    // const object = Object.fromEntries(formData);
    // const json = JSON.stringify(object);
    // console.log("Register Request :", { json });
    // console.log(companyId);
    // console.log(companyName);
    const success = await registerRecruiter(formData);
    if (success) {
      toast({ description: "Registration succeeded." });
      redirect(LOGIN_PATH);
    } else {
      toast({ variant: "destructive", description: "Registration failed" });
    }
  };

  return (
    <section>
      <form className="min-w-md mx-auto" action={onSubmit}>
        <FormSelect
          name="company_public_id"
          label="Company"
          options={options || []}
          selected=""
        />
        <FormInput name="login" type="text" label="Username" />
        <FormInput name="first_name" type="text" label="First Name" />
        <FormInput name="last_name" type="text" label="Last Name" />
        <FormInput name="password" type="password" label="Password" />
        <Button type="submit" size="xl" className="w-full mt-3">
          Register
        </Button>
        <Button variant="link" size="xl" className="w-full mt-2">
          <Link href="/">
            <TextCondensed>Back to Home Page</TextCondensed>
          </Link>
        </Button>
      </form>
    </section>
  );
};
