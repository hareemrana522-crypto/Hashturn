import Link from "next/link";
import { createReview } from "../actions";

export default function NewReviewPage() {
  return (
    <div className="admin-card">
      <div className="admin-card__header">
        <span className="admin-card__title">Add Client Review</span>
        <Link href="/admin/reviews" className="btn-admin btn-admin--outline">
          ← Back
        </Link>
      </div>

      <form
        action={createReview}
        style={{
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}
      >
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="clientName">Client Name *</label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              required
              placeholder="e.g. John Smith"
            />
          </div>
          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              placeholder="e.g. Acme Corp"
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
              placeholder="e.g. CEO"
            />
          </div>
          <div className="form-group">
            <label htmlFor="source">Source</label>
            <input
              type="text"
              id="source"
              name="source"
              placeholder="e.g. Google, Clutch"
              defaultValue="Direct"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="rating">Rating (1-5)</label>
            <select id="rating" name="rating" defaultValue="5">
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Good</option>
              <option value="3">3 - Average</option>
              <option value="2">2 - Poor</option>
              <option value="1">1 - Terrible</option>
            </select>
          </div>
          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingTop: '1.5rem' }}>
            <input type="checkbox" id="featured" name="featured" style={{ width: 'auto' }} />
            <label htmlFor="featured" style={{ marginBottom: 0 }}>Featured (Show on Homepage)</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="text">Review Text *</label>
          <textarea
            id="text"
            name="text"
            rows={4}
            required
            placeholder="The client's testimonial..."
          ></textarea>
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button type="submit" className="btn-admin btn-admin--green">
            Add Review
          </button>
          <Link href="/admin/reviews" className="btn-admin btn-admin--outline">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
