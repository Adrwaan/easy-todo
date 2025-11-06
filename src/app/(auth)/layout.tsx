import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "../globals.css";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { auth } from "@/lib/auth";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Easy Todo!",
  description: "A simple todo-list with auth and todos saved in cloud.",
};

export default async function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) redirect("/");

  return (
    <html lang="pt-BR">
      <body
        className={`${nunito.variable} antialiased selection:bg-slate-900 selection:text-background`}
      >
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
