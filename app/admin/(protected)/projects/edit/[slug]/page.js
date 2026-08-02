import Link from "next/link";
import { sql } from "@/lib/db";
import { updateProject } from "../../actions";
import { notFound } from "next/navigation";

export default async function EditProjectPage({ params }) {
  const { slug } = params;

  let project = null;
  try {
    const results = await sql`SELECT slug, title, service as category, client as client_name, description as problem, content as solution, results as result, tools as tech_stack, hero_image as main_image FROM projects WHERE slug = ${slug} LIMIT 1`;
    project = results[0];
  } catch (error) {
    console.error("Failed to fetch project", error);
  }

  if (!project) {
    return notFound();
  }

  return (
    <div className="admin-card">
      <div className="admin-card__header">
        <span className="admin-card__title">Edit Project</span>
        <Link href="/admin/projects" className="btn-admin btn-admin--outline">
          ← Back
        </Link>
      </div>

      <form
        action={updateProject}
        style={{
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}
      >
        <input type="hidden" name="originalSlug" value={String(project.slug)} />

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Project Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              defaultValue={String(project.title)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select id="category" name="category" defaultValue={String(project.category)}>
              <option value="Process Automation">Process Automation</option>
              <option value="RPA">RPA</option>
              <option value="Web Development">Web Development</option>
              <option value="API Integration">API Integration</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="clientName">Client Name</label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              defaultValue={String(project.client_name || "")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="techStack">
              Tech Stack <span style={{ color: "#9CA3AF", fontWeight: 400 }}>(comma-separated)</span>
            </label>
            <input
              type="text"
              id="techStack"
              name="techStack"
              defaultValue={String(project.tech_stack || "")}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="problem">The Problem</label>
          <textarea
            id="problem"
            name="problem"
            rows={4}
            defaultValue={String(project.problem || "")}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="image">Main Image (Project Thumbnail)</label>
          {project.main_image && (
            <div style={{ marginBottom: "0.5rem" }}>
              <img src={String(project.main_image)} alt="Current" style={{ width: "150px", height: "auto", objectFit: "cover", borderRadius: "8px" }} />
              <input type="hidden" name="currentImage" value={String(project.main_image)} />
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
          <label htmlFor="solution">Our Solution</label>
          <textarea
            id="solution"
            name="solution"
            rows={4}
            defaultValue={String(project.solution || "")}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="result">The Result / Impact</label>
          <textarea
            id="result"
            name="result"
            rows={4}
            defaultValue={String(project.result || "")}
          ></textarea>
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button type="submit" className="btn-admin btn-admin--green">
            Update Project
          </button>
          <Link href="/admin/projects" className="btn-admin btn-admin--outline">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
