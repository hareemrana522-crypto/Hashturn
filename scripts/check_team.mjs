import { sql } from '../lib/db.js';
async function check() {
  try {
    const team = await sql`SELECT id, name FROM team_members`;
    console.log('Team count:', team.length);
    console.log(team);
  } catch(e) {
    console.error(e);
  }
}
check();
