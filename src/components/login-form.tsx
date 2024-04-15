"use client";

import { redirect } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { FormInput } from "./form-input";
import { loginCandidate, loginRecruiter } from "@/actions/account";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import Link from "next/link";
import { TextCondensed } from "./text-condensed";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

interface IProps {}

export const LoginForm: React.FC<IProps> = () => {
  const { toast } = useToast();
  const [recruiter, setRecruiter] = useState(false);

  const onSubmit = async (formData: FormData) => {
    const login = formData.get("name")?.valueOf().toString() ?? ""
    const password = formData.get("password")?.valueOf().toString() ?? ""
    const result = recruiter ? await loginRecruiter({login, password}) : await loginCandidate({login, password});
    if (result.success) {
      toast({ description: "Login succeeded." });
      redirect(DEFAULT_LOGIN_REDIRECT);
    } else {
      toast({ variant: "destructive", description: "Login failed" });
    }
  };

  return (
    <section>
      <form className="min-w-md mx-auto" action={onSubmit}>
        <FormInput name="name" type="text" label="Username" />
        <FormInput name="password" type="password" label="Password" />
        <Button type="submit" size="xl" className="w-full mt-3">
          Login
        </Button>
      </form>
      <div className="w-full py-5 flex justify-center items-center">
        <Checkbox className="text-primary-dark" onCheckedChange={(checked) => setRecruiter(!!checked)} />
        <Label className="ml-3 text-primary-dark text-lg">
          <TextCondensed>I am a recruiter</TextCondensed>
        </Label>
      </div>
      <Button variant="link" size="xl" className="w-full">
        <Link href="/">
          <TextCondensed>Back to Home Page</TextCondensed>
        </Link>
      </Button>
    </section>
  );
};
