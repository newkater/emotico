import { LOGIN_PATH } from "@/routes";
import { NextPage } from "next";
import Link from "next/link";
import { Card } from "../card";
import { CardContent } from "../card-content";
import { CardFooter } from "../card-footer";
import { CardSubTitle } from "../card-subtitle";
import { CardTitle } from "../card-title";
import { RegisterForm } from "@/components/register-form-recruiter";
import { getCompanies } from "@/actions/company";

const RegisterPage: NextPage = async () => {
  const data = await getCompanies();
  const companies = data?.companies ?? []

  return (
    <Card>
      <CardTitle>Create Recruiter Account</CardTitle>
      <CardSubTitle>
        <Link href="/register">Click here to create a candidate account</Link>
      </CardSubTitle>
      <CardContent>
        <RegisterForm companies={companies} />
      </CardContent>
      <CardFooter>
        <span>Already have an account?</span>
        <Link href={LOGIN_PATH} className="text-primary-light ml-2 underline">
          Login
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RegisterPage;
