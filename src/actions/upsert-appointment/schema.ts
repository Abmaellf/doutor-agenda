import { z } from "zod";

export const upsertAppointmentSchema = z.object({
  patientId: z.string().uuid("Paciente é obrigatório"),
  doctorId: z.string().uuid("Médico é obrigatório"),
  appointmentPriceInCents: z.number().min(1, "Valor da consulta é obrigatório"),
  time: z.string().min(1, "Horário é obrigatório"),
  date: z.date(),
});
