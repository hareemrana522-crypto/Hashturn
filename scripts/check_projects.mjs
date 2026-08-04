import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);
const projects = await sql`SELECT slug, title, created_at FROM projects ORDER BY created_at ASC`;
console.log(projects);
