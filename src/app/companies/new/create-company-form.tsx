"use client";

import { FormInput } from "@/components/form-input";
import { FormText } from "@/components/form-text";
import { useToast } from "@/components/ui/use-toast";
import { addCompany } from "@/actions/company";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

interface IProps {}

export const CreateCompanyForm: React.FC<IProps> = () => {
  const { toast } = useToast();

  return (
    <div>
      <form
        action={async (formData: FormData) => {
          const result = await addCompany(formData);
          if (result.status >= 0) {
            toast({ description: "The company has been created." });
            redirect("/companies");
          } else {
            const { error } = result;
            const title = "Failed to create a company";
            const description = error ? JSON.stringify(error) : "Something went wrong";
            toast({ variant: "destructive", title, description });
          }
        }}
      >
        <FormInput type="text" name={"name"} label={"Company Name"} />
        <FormText name={"description"} label={"Company Description"} />
        <div className="mt-5">
          <Button type="submit" size="xl" >
            Create
          </Button>
          <Button variant="link" size="xl">
            <Link href="/companies">
                Back to Companies
            </Link>
          </Button>
        </div>
      </form>
    </div>
  );
};
