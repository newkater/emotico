"use client";

import { registerCandidate } from "@/actions/account";
import React from "react";
import { FormInput } from "./form-input";
import { redirect } from "next/navigation";
import { LOGIN_PATH } from "@/routes";
import { useToast } from "./ui/use-toast";
import Link from "next/link";
import { TextCondensed } from "./text-condensed";
import { Button } from "./ui/button";

export const RegisterForm = () => {
  const { toast } = useToast();

  const onSubmit = async (formData: FormData) => {
    const success = await registerCandidate(formData);
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
        <FormInput name="login" type="text" label="Username" />
        <FormInput name="first_name" type="text" label="First Name" />
        <FormInput name="last_name" type="text" label="Last Name" />
        <FormInput name="password" type="password" label="Password" />
        <FormInput name="current_position" type="text" label="Current Position" />
        <FormInput name="bio" type="text" label="Bio" />
        <FormInput name="education" type="text" label="Education" />
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
