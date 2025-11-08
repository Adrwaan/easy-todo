import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { LoginCard } from "./_components/login/login-card";

export default async function page() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) redirect("/");

  return (
    <div className="flex h-dvh w-screen items-center justify-center bg-blue-900">
      <LoginCard />
    </div>
  );
}
