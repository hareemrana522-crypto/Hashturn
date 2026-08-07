import { sql } from '../lib/db.js';
async function checkImages() {
  try {
    const projs = await sql`SELECT slug, hero_image FROM projects`;
    console.log(JSON.stringify(projs, null, 2));
  } catch(e) {
    console.error(e);
  }
}
checkImages();
