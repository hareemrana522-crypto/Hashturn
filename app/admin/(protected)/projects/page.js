import Link from "next/link";
import { sql } from "@/lib/db";
import { deleteProject } from "./actions";
import DeleteButton from "../../DeleteButton";

export default async function ProjectsAdminPage() {
  const projects = await sql`SELECT slug, title, service as category, created_at FROM projects ORDER BY created_at DESC`.catch(() => []);

  return (
    <div className="admin-card">
      <div className="admin-card__header">
        <span className="admin-card__title">Projects ({projects.length})</span>
        <Link href="/admin/projects/new" className="btn-admin btn-admin--green">
          + New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div style={{ padding: "2rem", textAlign: "center", color: "#9CA3AF" }}>
          No projects yet.{" "}
          <Link href="/admin/projects/new" style={{ color: "#22C55E" }}>
            Add your first project →
          </Link>
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Date Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.slug}>
                  <td>
                    <div style={{ fontWeight: 500 }}>{String(p.title)}</div>
                  </td>
                  <td>
                    <span className="tag-badge">{String(p.category)}</span>
                  </td>
                  <td style={{ color: "#6B7280", whiteSpace: "nowrap" }}>
                    {new Date(p.created_at).toLocaleDateString()}
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <Link
                        href={`/admin/projects/edit/${p.slug}`}
                        className="btn-admin btn-admin--outline btn-admin--sm"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/work/${p.slug}`}
                        target="_blank"
                        className="btn-admin btn-admin--outline btn-admin--sm"
                      >
                        View ↗
                      </Link>
                      <form action={deleteProject} style={{ display: "inline" }}>
                        <input type="hidden" name="slug" value={String(p.slug)} />
                        <DeleteButton confirmMessage="Delete this project?" />
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
