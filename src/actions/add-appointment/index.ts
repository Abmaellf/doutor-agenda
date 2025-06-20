"use server";

import dayjs from "dayjs";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { appointmentsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

import { addAppointmentSchema } from "./schema";

export const addAppointment = actionClient
  .schema(addAppointmentSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }
    if (!session.user.clinic) {
      throw new Error("Clinic not found");
    }

    const { date, time } = parsedInput;

    const [hour, minute] = time.split(":").map(Number);

    const appointmentDate = dayjs(date)
      .set("hour", hour)
      .set("minute", minute)
      .toDate();

    // const { patientId, doctorId } = parsedInput;

    await db.insert(appointmentsTable).values({
      ...parsedInput,
      clinicId: session?.user.clinic?.id,
      date: appointmentDate,
    });

    revalidatePath("/appointments");
  });
