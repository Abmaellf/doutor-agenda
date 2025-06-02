import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { usersToClinicTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import SignOutButton from "./components/sign-out-button";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }
  //Primeiro precisamos buscar as clinicas do usuario

  const clinics = await db.query.usersToClinicTable.findMany({
    where: eq(usersToClinicTable.userId, session.user.id),
  });

  if (clinics.length === 0) {
    redirect("/clinic-form");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <h1>{session?.user?.name}</h1>
      <h1>{session?.user?.email}</h1>
      <SignOutButton />
    </div>
  );
};

export default DashboardPage;
