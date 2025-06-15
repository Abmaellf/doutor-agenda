import { desc } from "drizzle-orm";

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
import { patientsTable } from "@/db/schema";

import { AddPatientButton } from "./_components/add-patient-button";
import { patientsTableColumns } from "./_components/table-columns";

export default async function PatientsPage() {
  const patients = await db.query.patientsTable.findMany({
    orderBy: [desc(patientsTable.createdAt)],
  });

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Pacientes</PageTitle>
          <PageDescription>
            Gerencie os pacientes da sua clínica
          </PageDescription>
        </PageHeaderContent>
        <PageAction>
          <AddPatientButton />
        </PageAction>
      </PageHeader>

      <PageContent>
        <DataTable columns={patientsTableColumns} data={patients} />
      </PageContent>
    </PageContainer>
  );
}
