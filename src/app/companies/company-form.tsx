"use client";

import { FormInput } from "@/components/form-input";
import { FormText } from "@/components/form-text";
import { useToast } from "@/components/ui/use-toast";
import { deleteCompany, modifyCompany } from "@/actions/company";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { bufferFromFile, generateFileName } from "@/lib/utils";
import { getContainerClient, uploadFileFromBuffer } from "@/lib/storage";
import { CompanyImage } from "@/components/company-image";
import { fileContainers } from "@/constants";

interface IProps {
  company: Company;
  connectionString: string;
}

export const CompanyForm: React.FC<IProps> = ({
  company,
  connectionString,
}) => {
  const { toast } = useToast();

  return (
    <div>
      <form
        id="company"
        action={async (formData: FormData) => {
          const name = formData.get("name")?.toString() ?? company.name;
          const description =
            formData.get("description")?.toString() ?? company.description;
          const result = await modifyCompany({ ...company, name, description });
          if (result.status >= 0) {
            toast({ description: "The company has been updated." });
            redirect("/companies");
          } else {
            const { error } = result;
            const title = "Failed to update a company";
            const description = error
              ? JSON.stringify(error)
              : "Something went wrong";
            toast({ variant: "destructive", title, description });
          }
        }}
      >
        <FormInput
          type="text"
          name={"name"}
          label={"Company Name"}
          defaultValue={company.name}
        />
        <FormText
          name={"description"}
          label={"Company Description"}
          defaultValue={company.description}
        />
      </form>
      <div className="flex items-center mt-5">
        <Button form="company" type="submit" size="xl" className="mr-4">
          Update
        </Button>
        <form
          action={async (formData) => {
            if (confirm("Are you sure")) {
              const { status, error } = await deleteCompany(company.public_id);
              if (status >= 0) {
                toast({ description: "The company has been deleted." });
                redirect("/companies");
              } else {
                const title = "Failed to update a company";
                const description = error
                  ? JSON.stringify(error)
                  : "Something went wrong";
                toast({ variant: "destructive", title, description });
              }
            }
          }}
        >
          <Button type="submit" variant="secondary" size="xl">
            <span className="text-lg">Delete</span>
          </Button>
        </form>
        <Button variant="link" size="xl">
          <Link href="/companies">Back to Companies</Link>
        </Button>
      </div>
      <div className="mt-10">
        <form
          action={async (formData: FormData) => {
            const file: File | null = formData.get("file") as unknown as File;
            const buffer = await bufferFromFile(file);
            const client = await getContainerClient(
              connectionString,
              fileContainers.image
            );
            const { value, error } = await uploadFileFromBuffer(
              buffer,
              client,
              generateFileName(file),
              file.type
            );

            if (value) {
              toast({ title: "The image was uploaded", description: value });
              const logo = value.split("?")[0];
              const { status } = await modifyCompany({ ...company, logo });
              if (status >= 0) {
                toast({ description: "Company Image was updated" });
              }
            } else {
              const title = "Failed to upload the image";
              const description = error
                ? error.message
                : "Something went wrong";
              toast({ variant: "destructive", title, description });
            }
          }}
        >
          <CompanyImage company={company} size={32} />
          <input type="file" name="file" className="mt-5" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};
