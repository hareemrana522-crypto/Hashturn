import fs from "fs";
import path from "path";
import { neon } from "@neondatabase/serverless";

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const text = fs.readFileSync(filePath, "utf8");
  const lines = text.split(/\r?\n/);
  const out = {};
  for (let line of lines) {
    line = line.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if ((val.startsWith("\"") && val.endsWith("\"")) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

// Load env.local then env as fallback
const root = process.cwd();
const envLocal = loadEnvFile(path.join(root, ".env.local"));
const envBase = loadEnvFile(path.join(root, ".env"));
// Apply env values from files, overriding existing process.env to ensure local files take precedence
Object.entries(envBase).forEach(([k, v]) => { process.env[k] = v; });
Object.entries(envLocal).forEach(([k, v]) => { process.env[k] = v; });

const url = process.env.HASHTURN_NEXT_DATABASE_URL || process.env.DATABASE_URL;
if (!url) {
  console.error("No database URL found in process.env.HASHTURN_NEXT_DATABASE_URL or process.env.DATABASE_URL.\nPlease set one in .env.local or .env.");
  process.exit(1);
}

const redacted = url.replace(/:[^:@\/]+@/, ":***@");
console.log("Using DB URL:", redacted);

const sql = neon(url);

(async () => {
  try {
    const rows = await sql`SELECT slug, title, client, service, hero_image, description, content, results, tools, created_at FROM projects ORDER BY created_at DESC LIMIT 50`;
    console.log("\nProjects (up to 50):\n", JSON.stringify(rows, null, 2));
  } catch (e) {
    console.error("DB query error:", e && e.message ? e.message : e);
    process.exit(1);
  }
})();
