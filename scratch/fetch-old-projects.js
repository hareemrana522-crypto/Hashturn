const { neon } = require('@neondatabase/serverless');

async function fetchOld() {
  const oldUrl = "postgresql://neondb_owner:npg_spyBVYtrP36L@ep-ancient-water-anfwvo88-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
  const sql = neon(oldUrl);
  try {
    const res = await sql`SELECT * FROM projects ORDER BY created_at ASC LIMIT 5`;
    console.log(JSON.stringify(res, null, 2));
  } catch (e) {
    console.error("Error:", e);
  }
}
fetchOld();
