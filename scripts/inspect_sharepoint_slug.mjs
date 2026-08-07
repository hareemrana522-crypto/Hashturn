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
Object.entries(envBase).forEach(([k,v])=>process.env[k]=v);
Object.entries(envLocal).forEach(([k,v])=>process.env[k]=v);
const url = process.env.HASHTURN_NEXT_DATABASE_URL || process.env.DATABASE_URL;
if (!url) { console.error('No DB URL'); process.exit(1); }
const sql = neon(url);
const slug = 'full-lifecycle-document-synchronization-sharepoint-assembly';

try {
  const rows = await sql`SELECT * FROM projects WHERE slug = ${slug}`;
  console.log('rows', rows.length);
  for (const row of rows) {
    console.log('---');
    console.log(Object.keys(row).sort().join(', '));
    console.log(JSON.stringify(row, null, 2));
  }
  const columns = await sql`SELECT column_name FROM information_schema.columns WHERE table_name = 'projects' ORDER BY ordinal_position`;
  console.log('columns', columns.map(c=>c.column_name));
} catch (e) {
  console.error(e);
  process.exit(1);
}
