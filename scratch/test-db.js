const { neon } = require('@neondatabase/serverless');

async function checkDb() {
  const url = process.env.DATABASE_URL;
  const sql = neon(url);
  try {
    const res = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'projects'
    `;
    console.log("Columns in projects:", res);
  } catch (e) {
    console.error("Error:", e);
  }
}
checkDb();
