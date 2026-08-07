import { sql } from '../lib/db.js';

const slug = 'full-lifecycle-document-synchronization-sharepoint-assembly';
const result = await sql`SELECT slug, title, service as category, client, description as summary, description as problem, content as solution, results as results_text, tools as tech_stack, hero_image as image FROM projects WHERE slug = ${slug} LIMIT 1`;
console.log('rows', result.length);
console.log('solution length', result[0].solution?.length);
console.log('solution', result[0].solution);
