import { z } from "zod";

export const upsertDoctorSchema = z
  .object({
    id: z.string().uuid().optional(),
    name: z.string().min(1, {
      message: "Nome é obrigatório",
    }),
    specialty: z.string().min(1, { message: "Especialização é obrigatória" }),
    appointmentPriceInCents: z
      .number()
      .min(1, { message: "Preço da consulta é obrigatório" }),

    availableFromWeekday: z.number().min(0).max(6),
    availableToWeekday: z.number().min(0).max(6),
    availableFromTime: z.string().min(1, {
      message: "Horário de início é obrigatório",
    }),
    availableToTime: z.string().min(1, {
      message: "Horário de término é obrigatório",
    }),
  })
  .refine(
    (data) => {
      return data.availableFromTime < data.availableToTime;
    },
    {
      message: "O dia inicial deve ser anterior ao dia final",
      path: ["availableToTime"],
    },
  );

export type upsertDoctorSchema = z.infer<typeof upsertDoctorSchema>;
