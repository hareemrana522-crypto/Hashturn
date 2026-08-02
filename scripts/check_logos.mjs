import { neon } from '@neondatabase/serverless';
import { TOOL_LOGOS } from '../lib/case-studies.js';

async function test() {
  const sql = neon(process.env.DATABASE_URL);
  const projects = await sql`SELECT slug, tools as tech_stack FROM projects`;
  for (const study of projects) {
    const techList = study.tech_stack ? study.tech_stack.split(',').map(s => s.trim()) : [];
    console.log(`Project: ${study.slug}`);
    console.log(`Raw DB: ${study.tech_stack}`);
    console.log(`Parsed List:`, techList);
    for (const t of techList) {
      const tool = TOOL_LOGOS[t];
      console.log(`  - Tool "${t}": found in LOGOS? ${!!tool}`);
    }
  }
}
test().catch(console.error);
