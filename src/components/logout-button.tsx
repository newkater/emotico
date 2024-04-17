import { revalidatePath } from "next/cache";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";
import { signOut } from "@/lib/auth";

export const LogoutButton: React.FC = () => {
  return (
    <form action={async () => {
      "use server"
      await signOut()
      revalidatePath("/")
      redirect("/")
    }
    }>
    <Button variant="outline" type="submit" size="xl">
      Sign Out
    </Button>      
    </form>

  );
};
