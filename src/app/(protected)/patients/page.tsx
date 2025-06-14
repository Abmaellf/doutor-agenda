import { desc } from "drizzle-orm";

import { PageContainer } from "@/components/ui/page-container";
import { db } from "@/db";
import { patientsTable } from "@/db/schema";

import { AddPatientButton } from "./_components/add-patient-button";
import { PatientCard } from "./_components/patient-card";

export default async function PatientsPage() {
  const patients = await db.query.patientsTable.findMany({
    orderBy: [desc(patientsTable.createdAt)],
  });

  return (
    <PageContainer>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Pacientes</h1>
        <AddPatientButton />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {patients.map((patient) => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </div>
    </PageContainer>
  );
}
