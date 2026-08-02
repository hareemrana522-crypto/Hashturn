import { neon } from '@neondatabase/serverless';

async function fixTools() {
  const sql = neon(process.env.DATABASE_URL);
  console.log("Fixing tools format in DB...");
  
  await sql`UPDATE projects SET tools = replace(replace(tools, '[', ''), ']', '')`;
  
  console.log("Fix complete!");
}

fixTools().catch(console.error);

fixTools().catch(console.error);
