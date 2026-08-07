import { neon } from '@neondatabase/serverless';

// Lazily initialized to prevent errors during Next.js build time
let _sql = null;

export function getDb() {
  if (!_sql) {
    const url =
      process.env.DATABASE_URL ||
      process.env.HASHTURN_NEXT_DATABASE_URL ||
      import.meta?.env?.DATABASE_URL ||
      import.meta?.env?.HASHTURN_NEXT_DATABASE_URL;
    if (!url) throw new Error('DATABASE_URL environment variable is not set');
    console.log('📦 DB connection URL (truncated):', url.slice(0, 30) + '...');
    _sql = neon(url, { fetchOptions: { cache: 'no-store' } });
  }
  return _sql;
}

// Convenience: use as tagged template literal -> sql`SELECT ...`
export const sql = new Proxy(
  (...args) => getDb()(...args),
  {
    apply(_target, _thisArg, args) {
      return getDb()(...args);
    },
  }
);
