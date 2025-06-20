"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { appointmentsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

import { deleteAppointmentSchema } from "./schema";

export const deleteAppointment = actionClient
  .schema(deleteAppointmentSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const appointment = await db.query.appointmentsTable.findFirst({
      where: eq(appointmentsTable.id, parsedInput.id),
    });
    if (!appointment) {
      throw new Error("Agendamento não encontrado");
    }

    if (appointment?.clinicId !== session.user.clinic?.id) {
      throw new Error("Agendamento não encontrado");
    }

    await db
      .delete(appointmentsTable)
      .where(eq(appointmentsTable.id, parsedInput.id));

    revalidatePath("/appointments");
  });
