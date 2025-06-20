import { desc, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { DataTable } from "@/components/ui/data-table";
import {
  PageAction,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { db } from "@/db";
import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { AddAppointmentButton } from "./_components/add-appointment-button";
import { appointmentsTableColumns } from "./_components/table-columns";

export default async function AppointmentsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }
  if (!session.user.clinic) {
    redirect("/clinics-form");
  }

  const appointments = await db.query.appointmentsTable.findMany({
    where: eq(appointmentsTable.clinicId, session.user.clinic.id),
    with: {
      patient: true,
      doctor: true,
    },
    orderBy: [desc(appointmentsTable.date)],
  });

  const patients = await db.query.patientsTable.findMany({
    where: eq(patientsTable.clinicId, session.user.clinic.id),
    orderBy: [desc(patientsTable.createdAt)],
  });

  const doctors = await db.query.doctorsTable.findMany({
    where: eq(doctorsTable.clinicId, session.user.clinic.id),
    orderBy: [desc(doctorsTable.createdAt)],
  });

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Agendamentos</PageTitle>
          <PageDescription>
            Gerencie os agendamentos da sua clínica
          </PageDescription>
        </PageHeaderContent>
        <PageAction>
          <AddAppointmentButton patients={patients} doctors={doctors} />
        </PageAction>
      </PageHeader>

      <PageContent>
        <DataTable columns={appointmentsTableColumns} data={appointments} />
      </PageContent>
    </PageContainer>
  );
}
