import { sql } from '../lib/db.js';

async function findSharepointProjects() {
  try {
    const projs = await sql`SELECT slug, title FROM projects WHERE title ILIKE '%sharepoint%' OR slug ILIKE '%sharepoint%'`;
    console.log(JSON.stringify(projs, null, 2));
  } catch (err) {
    console.error("Error fetching DB:", err);
  }
}

findSharepointProjects();
