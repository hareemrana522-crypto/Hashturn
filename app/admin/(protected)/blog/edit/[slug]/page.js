import Link from "next/link";
import Image from "next/image";
import { sql } from "@/lib/db";
import { updateBlog } from "../../actions";
import { notFound } from "next/navigation";

export default async function EditBlogPage({ params }) {
  const { slug } = params;

  let post = null;
  try {
    const results = await sql`SELECT * FROM blog_posts WHERE slug = ${slug} LIMIT 1`;
    post = results[0];
  } catch (error) {
    console.error("Failed to fetch blog post", error);
  }

  if (!post) {
    return notFound();
  }

  // Format date for input[type="date"]
  let formattedDate = "";
  if (post.pub_date) {
    try { formattedDate = new Date(post.pub_date).toISOString().split("T")[0]; } catch {}
  }

  // Parse tags JSON array to comma-separated string for the form
  let tagsDisplay = "";
  try {
    const parsed = JSON.parse(post.tags || "[]");
    if (Array.isArray(parsed)) {
      tagsDisplay = parsed.join(", ");
    } else {
      tagsDisplay = String(post.tags || "");
    }
  } catch {
    tagsDisplay = String(post.tags || "");
  }

  return (
    <div className="admin-card">
      <div className="admin-card__header">
        <span className="admin-card__title">Edit Blog Post</span>
        <Link href="/admin/blog" className="btn-admin btn-admin--outline">
          ← Back
        </Link>
      </div>

      <form
        action={updateBlog}
        style={{
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}
      >
        <input type="hidden" name="originalSlug" value={String(post.slug)} />
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              defaultValue={String(post.title)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              defaultValue={String(post.author || "HashTurn Team")}
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
              defaultValue={formattedDate}
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
              defaultValue={tagsDisplay}
              placeholder="e.g. Power Automate, SharePoint, Microsoft 365"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description / Excerpt</label>
          <input
            type="text"
            id="description"
            name="description"
            defaultValue={String(post.description || "")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Hero Image</label>
          {post.hero_image && (
            <div style={{ marginBottom: "0.5rem" }}>
              <Image src={String(post.hero_image)} alt="Current" width={150} height={100} style={{ width: "150px", height: "auto", objectFit: "cover", borderRadius: "8px" }} />
              <input type="hidden" name="currentImage" value={String(post.hero_image)} />
            </div>
          )}
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
            defaultValue={String(post.content || "")}
            suppressHydrationWarning={true}
          ></textarea>
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button type="submit" className="btn-admin btn-admin--green">
            Update Post
          </button>
          <Link href="/admin/blog" className="btn-admin btn-admin--outline">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
