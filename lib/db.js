import { neon } from '@neondatabase/serverless';

// Lazily initialized to prevent errors during Next.js build time
let _sql = null;

export function getDb() {
  if (!_sql) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      // Return a dummy function if URL is missing so the app doesn't crash entirely at build
      // but will throw when actually executed.
      return () => { throw new Error('DATABASE_URL environment variable is not set'); };
    }
    _sql = neon(url);
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
