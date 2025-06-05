import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { customSession } from "better-auth/plugins";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import * as schema from "@/db/schema";
import { usersToClinicTable } from "@/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema,
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
    customSession(async ({ user, session }) => {
      const clinics = await db.query.usersToClinicTable.findMany({
        where: eq(usersToClinicTable.userId, user.id),
        with: {
          clinic: true,
        },
      });
      // TODO Ao adaptar para o usuário ter multiplas clinicas, deve-se mudar esse código para retornar todas as clinicas
      const clinic = clinics[0];

      return {
        user: {
          ...user,
          clinic: {
            id: clinic.clinicId,
            name: clinic.clinic.name,
          },
        },
        session,
      };
    }),
  ],

  user: {
    modelName: "usersTable",
  },

  session: {
    modelName: "sessionsTable",
  },

  account: {
    modelName: "accountsTable",
  },

  verification: {
    modelName: "verificationsTable",
  },
  emailAndPassword: {
    enabled: true,
  },
});
