const { neon } = require('@neondatabase/serverless');
async function test() {
  const sql = neon(process.env.DATABASE_URL);
  try {
    const members = await sql`SELECT id FROM team_members LIMIT 3`;
    const order = members.map(m => m.id);
    for (let i = 0; i < order.length; i++) {
      await sql`UPDATE team_members SET display_order = ${i + 1} WHERE id = ${order[i]}`;
    }
    console.log('Update successful');
  } catch(e) {
    console.error('Update Error:', e.message);
  }
}
test();
