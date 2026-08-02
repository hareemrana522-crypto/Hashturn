import Link from "next/link";
import { sql } from "@/lib/db";
import { updateReview } from "../../actions";
import { notFound } from "next/navigation";

export default async function EditReviewPage({ params }) {
  const { id } = params;

  let review = null;
  try {
    const results = await sql`SELECT id, name as client_name, location as company, rating, review_text as text, source, featured, created_at FROM reviews WHERE id = ${id} LIMIT 1`;
    review = results[0];
  } catch (error) {
    console.error("Failed to fetch review", error);
  }

  if (!review) {
    return notFound();
  }

  return (
    <div className="admin-card">
      <div className="admin-card__header">
        <span className="admin-card__title">Edit Review</span>
        <Link href="/admin/reviews" className="btn-admin btn-admin--outline">
          ← Back
        </Link>
      </div>

      <form
        action={updateReview}
        style={{
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}
      >
        <input type="hidden" name="originalId" value={String(review.id)} />

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="clientName">Client Name *</label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              required
              defaultValue={String(review.client_name)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="company">Company / Location</label>
            <input
              type="text"
              id="company"
              name="company"
              defaultValue={String(review.company || "")}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <input
              type="text"
              id="role"
              name="role"
              defaultValue={String(review.role || "")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="source">Source</label>
            <input
              type="text"
              id="source"
              name="source"
              defaultValue={String(review.source || "Direct")}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="rating">Rating (1-5)</label>
            <select id="rating" name="rating" defaultValue={String(review.rating || "5")}>
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Good</option>
              <option value="3">3 - Average</option>
              <option value="2">2 - Poor</option>
              <option value="1">1 - Terrible</option>
            </select>
          </div>
          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingTop: '1.5rem' }}>
            <input type="checkbox" id="featured" name="featured" defaultChecked={review.featured} style={{ width: 'auto' }} />
            <label htmlFor="featured" style={{ marginBottom: 0 }}>Featured (Show on Homepage)</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="text">Review Text *</label>
          <textarea
            id="text"
            name="text"
            rows={5}
            required
            defaultValue={String(review.text)}
          ></textarea>
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button type="submit" className="btn-admin btn-admin--green">
            Update Review
          </button>
          <Link href="/admin/reviews" className="btn-admin btn-admin--outline">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
