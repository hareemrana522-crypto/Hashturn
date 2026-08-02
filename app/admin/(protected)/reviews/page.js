import Link from "next/link";
import { sql } from "@/lib/db";
import { deleteReview } from "./actions";
import DeleteButton from "../../DeleteButton";

export default async function ReviewsAdminPage() {
  const reviews = await sql`SELECT id, name as client_name, location as company, rating, review_text as text, source, featured, created_at FROM reviews ORDER BY created_at DESC`.catch(() => []);

  return (
    <div className="admin-card">
      <div className="admin-card__header">
        <span className="admin-card__title">Client Reviews ({reviews.length})</span>
        <Link href="/admin/reviews/new" className="btn-admin btn-admin--green">
          + Add Review
        </Link>
      </div>

      {reviews.length === 0 ? (
        <div style={{ padding: "2rem", textAlign: "center", color: "#9CA3AF" }}>
          No reviews yet.{" "}
          <Link href="/admin/reviews/new" style={{ color: "#22C55E" }}>
            Add one now →
          </Link>
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Source</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((r) => (
                <tr key={r.id}>
                  <td>
                    <div style={{ fontWeight: 500 }}>{String(r.client_name)}</div>
                    <div style={{ fontSize: "0.78rem", color: "#9CA3AF" }}>{String(r.company)}</div>
                  </td>
                  <td style={{ color: "#EAB308", fontWeight: 700, whiteSpace: "nowrap" }}>
                    {'★'.repeat(Number(r.rating))}{'☆'.repeat(5 - Number(r.rating))}
                  </td>
                  <td style={{ maxWidth: "280px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#4B5563" }}>
                    {String(r.text)}
                  </td>
                  <td style={{ color: "#6B7280" }}>{String(r.source || "Direct")}</td>
                  <td>
                    {r.featured ? (
                      <span style={{ color: "#22C55E", fontSize: "0.8rem", fontWeight: 600 }}>✓ Yes</span>
                    ) : (
                      <span style={{ color: "#9CA3AF", fontSize: "0.8rem" }}>No</span>
                    )}
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <Link
                        href={`/admin/reviews/edit/${r.id}`}
                        className="btn-admin btn-admin--outline btn-admin--sm"
                      >
                        Edit
                      </Link>
                      <form action={deleteReview} style={{ display: "inline" }}>
                        <input type="hidden" name="id" value={String(r.id)} />
                        <DeleteButton confirmMessage="Delete this review?" />
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
