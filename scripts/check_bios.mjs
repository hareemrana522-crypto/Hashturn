import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

const rows = await sql`SELECT name, role, bio FROM team_members ORDER BY display_order ASC`;
for (const r of rows) {
  console.log(`\n--- ${r.name} (${r.role}) ---`);
  console.log(r.bio);
}
