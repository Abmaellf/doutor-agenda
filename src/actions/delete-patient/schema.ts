import { z } from "zod";

export const deletePatientSchema = z.object({
  id: z.string(),
});

export type DeletePatientSchema = z.infer<typeof deletePatientSchema>;
