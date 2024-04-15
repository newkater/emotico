import { Button } from "./ui/button";
import { LOGOUT_PATH } from "@/routes";
import Link from "next/link";

export const LogoutButton: React.FC = () => {
  return (
    <Button variant="outline" type="submit" size="xl">
      <Link href={LOGOUT_PATH}>Sign Out</Link>
    </Button>
  );
};
