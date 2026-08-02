import { neon } from '@neondatabase/serverless';

async function cleanup() {
  const sql = neon(process.env.DATABASE_URL);
  console.log("Cleaning up dummy blogs...");
  const validSlugs = ['automate-sales-pipeline-2024', 'logistics-firm-case-study', 'sharepoint-vs-custom-apps'];
  
  // Find blogs to delete
  const res = await sql`SELECT slug, title FROM blog_posts`;
  console.log("All blogs in DB:", res);
  
  for (const row of res) {
    if (!validSlugs.includes(row.slug)) {
      console.log(`Deleting dummy blog: ${row.title} (${row.slug})`);
      await sql`DELETE FROM blog_posts WHERE slug = ${row.slug}`;
    }
  }
  console.log("Cleanup complete!");
}

cleanup().catch(console.error);

cleanup().catch(console.error);
