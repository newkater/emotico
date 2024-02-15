import { RegisterForm } from "@/components/register-form";
import Link from "next/link";

export default function Register() {
    return (
      <div>
        <h1>Register page.</h1>
        <RegisterForm></RegisterForm>
        <Link href="/login">Already have an account</Link>
      </div>
    )
  }
  