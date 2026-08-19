const { neon } = require('@neondatabase/serverless');

async function migrate() {
  const oldUrl = "postgresql://neondb_owner:npg_spyBVYtrP36L@ep-ancient-water-anfwvo88-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
  const newUrl = process.env.DATABASE_URL;
  
  const oldSql = neon(oldUrl);
  const newSql = neon(newUrl);

  try {
    console.log("Fetching old projects...");
    const oldProjects = await oldSql`SELECT * FROM projects ORDER BY created_at ASC LIMIT 5`;

    console.log("Deleting the dummy projects I just added...");
    await newSql`DELETE FROM projects WHERE slug IN ('enterprise-automation-solution', 'ai-powered-analytics-dashboard', 'legacy-system-modernization')`;

    for (const p of oldProjects) {
      // check if it already exists in the new DB
      const exists = await newSql`SELECT slug FROM projects WHERE slug = ${p.slug}`;
      if (exists.length === 0) {
        await newSql`
          INSERT INTO projects (
            slug, title, description, service, client, tools, hero_image, results, content, display_order, created_at
          ) VALUES (
            ${p.slug}, ${p.title}, ${p.description}, ${p.service}, ${p.client}, ${p.tools}, ${p.hero_image}, ${p.results}, ${p.content}, ${p.display_order}, ${p.created_at}
          )
        `;
        console.log(`Migrated: ${p.title}`);
      } else {
        console.log(`Skipped (already exists): ${p.title}`);
      }
    }
    console.log("Migration complete!");
  } catch (e) {
    console.error("Error:", e);
  }
}
migrate();
