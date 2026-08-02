import Link from "next/link";
import { createProject } from "../actions";

export default function NewProjectPage() {
  return (
    <div className="admin-card">
      <div className="admin-card__header">
        <span className="admin-card__title">New Project</span>
        <Link href="/admin/projects" className="btn-admin btn-admin--outline">
          ← Back
        </Link>
      </div>

      <form
        action={createProject}
        style={{
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}
      >
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Project Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              placeholder="e.g. Acme Corp CRM Automation"
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select id="category" name="category">
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
              placeholder="Optional"
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
              placeholder="Next.js, Node.js, Power Automate"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="problem">The Problem</label>
          <textarea
            id="problem"
            name="problem"
            rows={4}
            placeholder="Describe the client's problem..."
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="image">Main Image (Project Thumbnail)</label>
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
            placeholder="Describe what HashTurn built..."
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="result">The Result / Impact</label>
          <textarea
            id="result"
            name="result"
            rows={4}
            placeholder="Describe the measurable impact..."
          ></textarea>
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button type="submit" className="btn-admin btn-admin--green">
            Save Project
          </button>
          <Link href="/admin/projects" className="btn-admin btn-admin--outline">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
