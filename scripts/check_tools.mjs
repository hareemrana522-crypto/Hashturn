import { neon } from '@neondatabase/serverless';

async function check() {
  const sql = neon(process.env.DATABASE_URL);
  const res = await sql`SELECT slug, tools FROM projects`;
  console.log(res);
}

check().catch(console.error);
