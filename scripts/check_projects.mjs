import { sql } from '../lib/db.js';

async function checkProjects() {
  try {
    console.log("Fetching projects...");
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.log("Tables in DB:", tables.map(t => t.table_name));

    if (tables.some(t => t.table_name === 'blog_posts')) {
      const posts = await sql`SELECT slug, title FROM blog_posts LIMIT 5`;
      console.log("Blog Posts:", posts);
    }
    
    const cols = await sql`SELECT column_name FROM information_schema.columns WHERE table_name = 'projects'`;
    console.log("Project columns:", cols.map(c => c.column_name));
    
    if (tables.some(t => t.table_name === 'projects')) {
      const projs = await sql`SELECT * FROM projects LIMIT 1`;
      console.log("Single project data:", projs[0]);
    }
    
  } catch (err) {
    console.error("Error:", err.message);
  }
}

checkProjects();
