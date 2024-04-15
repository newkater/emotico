import { redirect } from "next/navigation";
import { signOut } from "@/lib/auth";
import { DEFAULT_PATH } from "@/routes";
import { revalidatePath } from "next/cache";

export async function GET() {
  await signOut();
  revalidatePath("/");
  redirect(DEFAULT_PATH);
}
