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
  console.error('No DB URL found in .env.local or .env');
  process.exit(1);
}

const sql = neon(url);
(async () => {
  try {
    const slug = 'automated-email-to-planner-task-lifecycle';
    const imgTags = `\n<img src="/work/Email-to-Planner_Flow1_Trigger.png" style="max-width:100%;"/>\n<img src="/work/Email-to-Planner_Flow2_Companion.png" style="max-width:100%;"/>\n<img src="/work/Email-to-Planner_Flow3_ETagInject.png" style="max-width:100%;"/>`;
    await sql`
      UPDATE projects
      SET content = COALESCE(content, '') || ${imgTags}
      WHERE slug = ${slug}
    `;

    const res = await sql`SELECT slug, title, content FROM projects WHERE slug = ${slug} LIMIT 1`;
    console.log('Updated project row:\n', JSON.stringify(res, null, 2));
  } catch (e) {
    console.error('DB update error:', e && e.message ? e.message : e);
    process.exit(1);
  }
})();
