import { neon } from '@neondatabase/serverless';

async function check() {
  const sql = neon(process.env.DATABASE_URL);
  
  const tables = ['reviews', 'projects', 'blog_posts', 'team_members'];
  for (const t of tables) {
    const res = await sql.query(`SELECT COUNT(*) FROM ${t}`);
    console.log(`\n--- ${t} count ---`);
    console.log(res.rows[0].count);
  }
}

check().catch(console.error);
