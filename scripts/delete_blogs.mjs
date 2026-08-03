import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);
sql`DELETE FROM blog_posts`.then(() => console.log('Deleted all dummy blogs'));
