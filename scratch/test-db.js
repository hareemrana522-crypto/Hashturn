const { neon } = require('@neondatabase/serverless');

async function test() {
  const url = process.env.DATABASE_URL || process.env.HASHTURN_NEXT_DATABASE_URL;
  if (!url) {
    console.log("No DATABASE_URL found");
    return;
  }
  const sql = neon(url);
  try {
    const res = await sql`SELECT * FROM submissions`;
    console.log("Submissions count:", res.length);
    console.log(res);
  } catch (e) {
    console.error("DB Error:", e);
  }
}
test();
