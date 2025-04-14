
import type React from "react";
import "../../styles/globals.css"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import ClientRoot from "@/components/ClientRoot";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }
  return (
  <ClientRoot>{children}</ClientRoot>
  );
}
