import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "./schema";

//Por que tem um ! no final?
//Porque o process.env.DATABASE_URL é uma string e o drizzle espera uma URL.
export const db = drizzle(process.env.DATABASE_URL!, {
  schema,
});
