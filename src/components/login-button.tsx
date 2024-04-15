import { LOGIN_PATH } from "@/routes";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const LoginButton = () => {
  return (
    <Button variant="outline" size="xl">
      <Link href={LOGIN_PATH}>
        Login / Register
      </Link>
    </Button>
  );
};

export default LoginButton;
