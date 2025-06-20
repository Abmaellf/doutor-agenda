import { z } from "zod";

export const deleteAppointmentSchema = z.object({
  id: z.string().uuid("ID do agendamento inválido"),
});
