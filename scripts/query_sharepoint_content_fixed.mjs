import fs from 'fs';
import path from 'path';
import { neon } from '@neondatabase/serverless';

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const text = fs.readFileSync(filePath, 'utf8');
  const lines = text.split(/\r?\n/);
  const out = {};
  for (let line of lines) {
    line = line.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}
const root = process.cwd();
const envLocal = loadEnvFile(path.join(root, '.env.local'));
const envBase = loadEnvFile(path.join(root, '.env'));
Object.entries(envBase).forEach(([k, v]) => { process.env[k] = v; });
Object.entries(envLocal).forEach(([k, v]) => { process.env[k] = v; });
const url = process.env.HASHTURN_NEXT_DATABASE_URL || process.env.DATABASE_URL;
if (!url) {
  console.error('No DB URL');
  process.exit(1);
}
const sql = neon(url);
const slug = 'full-lifecycle-document-synchronization-sharepoint-assembly';
const result = await sql`SELECT slug, title, service as category, client, description as summary, description as problem, content as solution, results as results_text, tools as tech_stack, hero_image as image FROM projects WHERE slug = ${slug} LIMIT 1`;
console.log('len', result[0].solution.length);
console.log(JSON.stringify(result[0].solution));
