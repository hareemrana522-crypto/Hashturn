import Link from "next/link";
import { sql } from "@/lib/db";
import { deleteBlog } from "./actions";
import DeleteButton from "../../DeleteButton";

export default async function BlogAdminPage() {
  let posts = [];
  let dbError = null;
  let totalCount = 0;
  try {
    const countResult = await sql`SELECT COUNT(*) as c FROM blog_posts`;
    totalCount = countResult[0]?.c ?? 0;
    posts = await sql`SELECT slug, title, description, pub_date, author FROM blog_posts ORDER BY pub_date DESC`;
  } catch (e) {
    dbError = String(e);
    console.error("Admin blog list error:", e);
  }

  return (
    <div className="admin-card">
      <div className="admin-card__header">
        <span className="admin-card__title">Blog Posts ({posts.length}) — DB Count: {String(totalCount)}</span>
        <Link href="/admin/blog/new" className="btn-admin btn-admin--green">
          + New Post
        </Link>
      </div>

      {dbError && (
        <div style={{ padding: "1rem", background: "#fee2e2", color: "#dc2626", margin: "1rem 1.5rem", borderRadius: "8px", fontSize: "0.85rem", fontFamily: "monospace" }}>
          DB Error: {dbError}
        </div>
      )}

      {posts.length === 0 && !dbError ? (
        <div style={{ padding: "2rem", textAlign: "center", color: "#9CA3AF" }}>
          No posts yet.{" "}
          <Link href="/admin/blog/new" style={{ color: "#22C55E" }}>
            Write your first post →
          </Link>
        </div>
      ) : posts.length === 0 ? null : (
        <div style={{ overflowX: "auto" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Author</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.slug}>
                  <td>
                    <div style={{ fontWeight: 500 }}>{String(p.title)}</div>
                    <div
                      style={{
                        fontSize: "0.78rem",
                        color: "#9CA3AF",
                        maxWidth: "360px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {String(p.description)}
                    </div>
                  </td>
                  <td style={{ color: "#6B7280", whiteSpace: "nowrap" }}>
                    {String(p.pub_date)}
                  </td>
                  <td style={{ color: "#4B5563" }}>{String(p.author)}</td>
                  <td>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <Link
                        href={`/admin/blog/edit/${p.slug}`}
                        className="btn-admin btn-admin--outline btn-admin--sm"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/blog/${p.slug}`}
                        target="_blank"
                        className="btn-admin btn-admin--outline btn-admin--sm"
                      >
                        View ↗
                      </Link>
                      <form action={deleteBlog} style={{ display: "inline" }}>
                        <input type="hidden" name="slug" value={String(p.slug)} />
                        <DeleteButton confirmMessage="Delete this post?" />
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
