"use client";

import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";
import { formatCurrencyInCents } from "@/helpers/currency";

import { AppointmentTableActions } from "./table-actions";

type Appointment = typeof appointmentsTable.$inferSelect & {
  patient: typeof patientsTable.$inferSelect | null;
  doctor: typeof doctorsTable.$inferSelect | null;
};

export const appointmentsTableColumns: ColumnDef<Appointment>[] = [
  {
    accessorKey: "patient.name",
    header: "Paciente",
  },
  {
    accessorKey: "doctor.name",
    header: "Médico",
  },

  {
    accessorKey: "date",
    header: "Data e Hora",
    cell: ({ row }) => {
      return dayjs(row.original.date).format("DD/MM/YYYY HH:mm");
    },
  },
  {
    id: "specialty",
    accessorKey: "doctor.specialty",
    header: "Especialidade",
  },
  {
    accessorKey: "doctor.appointmentPriceInCents",
    header: "Valor",
    cell: ({ row }) => {
      const price = row.original.doctor?.appointmentPriceInCents;
      if (price === undefined || price === null) return "-";
      return formatCurrencyInCents(price);
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const appointment = row.original;
      return <AppointmentTableActions appointment={appointment} />;
    },
  },
];
