import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { RegisterCard } from "./_components/register/register-card";

export default async function page() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) redirect("/");

  return (
    <div className="flex min-h-dvh w-full items-center justify-center bg-blue-900 py-8">
      <RegisterCard />
    </div>
  );
}
