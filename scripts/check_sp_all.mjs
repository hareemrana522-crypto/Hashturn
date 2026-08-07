import { sql } from '../lib/db.js';

async function checkSP() {
  try {
    const projs = await sql`SELECT * FROM projects WHERE slug = 'sharepoint-assembly-document-sync'`;
    console.log(JSON.stringify(projs, null, 2));
  } catch (err) {
    console.error("Error fetching DB:", err);
  }
}

checkSP();
