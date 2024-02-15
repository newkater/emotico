import { LoginForm } from "@/components/login-form";
import Link from "next/link";

export default function Login() {
    return (
      <div>
        <h1>Login page.</h1>
        <LoginForm></LoginForm>
        <Link href="/register">Have no account</Link>
      </div>
    )
  }
  