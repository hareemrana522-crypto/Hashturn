import { sql } from '../lib/db.js';
async function check() {
  try {
    const projs = await sql`SELECT name, image FROM team_members WHERE name ILIKE '%Maaz%'`;
    console.log(JSON.stringify(projs, null, 2));
  } catch(e) {
    console.error(e);
  }
}
check();
