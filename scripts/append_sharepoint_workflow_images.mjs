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
  console.error('No database URL found in .env.local or .env');
  process.exit(1);
}

const sql = neon(url);
const slug = 'full-lifecycle-document-synchronization-sharepoint-assembly';
const imgTags = [
  '<img src="/work/SharePoint-Assembly_Flow1_CreateModify.png" style="max-width:100%;"/>',
  '<img src="/work/SharePoint-Assembly_Flow2_Delete.png" style="max-width:100%;"/>'
].join('\n');

async function run() {
  const existing = await sql`SELECT slug, title, content FROM projects WHERE slug = ${slug} LIMIT 1`;
  if (!existing[0]) {
    console.error('Project not found:', slug);
    process.exit(1);
  }
  console.log('Existing content preview:');
  console.log(existing[0].content.slice(0, 400));
  const updated = await sql`UPDATE projects SET content = COALESCE(content, '') || '\n' || ${imgTags} WHERE slug = ${slug} RETURNING slug, content`;
  console.log('Updated content preview:');
  console.log(updated[0].content.slice(-500));
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
