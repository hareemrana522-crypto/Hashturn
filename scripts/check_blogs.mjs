import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);
sql`SELECT slug, title FROM blog_posts`.then(console.log);
