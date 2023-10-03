import { authConfig } from "@/lib/auth";
import { DEFAULT_REDIRECTS } from "@/lib/constants";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authConfig);

  if (session) {
    if (session?.user.role === "HR") {
      redirect(DEFAULT_REDIRECTS.staffDirectory);
    }
    if (session?.user.role === "STAFF") {
      redirect(DEFAULT_REDIRECTS.roleListing);
    }
  } else {
    redirect("/login");
  }
}
