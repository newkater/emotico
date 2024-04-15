import { LoginForm } from "@/components/login-form";
import { NextPage } from "next";
import Link from "next/link";
import { REGISTER_PATH } from "@/routes";
import { Card } from "../card";
import { CardTitle } from "../card-title";
import { CardSubTitle } from "../card-subtitle";
import { CardFooter } from "../card-footer";
import { CardContent } from "../card-content";

const LoginPage: NextPage = () => {
  return (
    <Card>
      <CardTitle>Welcome back!</CardTitle>
      <CardSubTitle>Sign in to start working with Emotico</CardSubTitle>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter>
        <span>Don&apos;t have an account?</span>
        <Link
          href={REGISTER_PATH}
          className="text-primary-light ml-2 underline"
        >
          Register
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LoginPage;
