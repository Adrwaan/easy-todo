import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Easy Todo!",
  description: "A simple todo-list with auth and todos saved in cloud.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
