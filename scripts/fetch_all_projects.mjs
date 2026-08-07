import { sql } from '../lib/db.js';

async function getProjects() {
  try {
    const projs = await sql`SELECT slug, title, content, client, service, description FROM projects ORDER BY created_at ASC`;
    console.log(JSON.stringify(projs, null, 2));
  } catch (err) {
    console.error("Error fetching DB:", err);
  }
}

getProjects();
