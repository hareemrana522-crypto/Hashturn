import { sql } from '../lib/db.js';
async function listSlugs() {
  try {
    const projs = await sql`SELECT slug FROM projects`;
    console.log(projs.map(p => p.slug));
  } catch(e) {
    console.error(e);
  }
}
listSlugs();
