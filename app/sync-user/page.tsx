import { redirect } from "next/navigation";
import { syncCurrentUser } from "@/lib/sync-user";

export default async function SyncUserPage() {
  const user = await syncCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  redirect("/");
}
