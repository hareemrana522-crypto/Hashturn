const { neon } = require('@neondatabase/serverless');

async function list() {
  const sql = neon(process.env.DATABASE_URL);
  try {
    const rows = await sql`SELECT title, slug FROM projects`;
    console.log(rows);
  } catch (e) {
    console.error(e);
  }
}
list();
