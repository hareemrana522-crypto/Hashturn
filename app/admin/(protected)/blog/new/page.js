import Link from "next/link";
import { createBlog } from "../actions";

export default function NewBlogPage() {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="admin-card">
      <div className="admin-card__header">
        <span className="admin-card__title">New Blog Post</span>
        <Link href="/admin/blog" className="btn-admin btn-admin--outline">
          ← Back
        </Link>
      </div>

      <form
        action={createBlog}
        style={{
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}
      >
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              placeholder="Enter post title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              defaultValue="HashTurn Team"
              placeholder="HashTurn Team"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="pubDate">Publish Date</label>
            <input
              type="date"
              id="pubDate"
              name="pubDate"
              defaultValue={today}
            />
          </div>
          <div className="form-group">
            <label htmlFor="tags">
              Tags{" "}
              <span style={{ color: "#9CA3AF", fontWeight: 400 }}>
                (comma-separated)
              </span>
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              placeholder="automation, RPA, Microsoft 365"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description / Excerpt</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Brief description for SEO and previews"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Hero Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">
            Content{" "}
            <span style={{ color: "#9CA3AF", fontWeight: 400 }}>
              (Markdown)
            </span>
          </label>
          <textarea
            id="content"
            name="content"
            rows={20}
            placeholder="Write your blog post content here in Markdown..."
          ></textarea>
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button type="submit" className="btn-admin btn-admin--green">
            Publish Post
          </button>
          <Link href="/admin/blog" className="btn-admin btn-admin--outline">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
