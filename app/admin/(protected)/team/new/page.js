import Link from "next/link";
import { createTeamMember } from "../actions";

export default function NewTeamMemberPage() {
  return (
    <div className="admin-card">
      <div className="admin-card__header">
        <span className="admin-card__title">Add Team Member</span>
        <Link href="/admin/team" className="btn-admin btn-admin--outline">
          ← Back
        </Link>
      </div>

      <form
        action={createTeamMember}
        style={{
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}
      >
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="e.g. Jane Doe"
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role / Job Title *</label>
            <input
              type="text"
              id="role"
              name="role"
              required
              placeholder="e.g. Lead Developer"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="displayOrder">Display Order (Sort Priority)</label>
            <input
              type="number"
              id="displayOrder"
              name="displayOrder"
              defaultValue="99"
              min="1"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="avatar">Initials (Avatar)</label>
            <input
              type="text"
              id="avatar"
              name="avatar"
              placeholder="e.g. JD"
            />
          </div>
          <div className="form-group">
            <label htmlFor="avatarColor">Avatar Color</label>
            <input
              type="color"
              id="avatarColor"
              name="avatarColor"
              defaultValue="#22C55E"
              style={{ width: "100%", height: "40px" }}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="image">Profile Picture (Image)</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
          />
        </div>

        <div className="form-group">
          <label htmlFor="linkedin">LinkedIn URL</label>
          <input
            type="text"
            id="linkedin"
            name="linkedin"
            placeholder="https://linkedin.com/in/..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="bio">Short Bio</label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            placeholder="A brief bio..."
          ></textarea>
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button type="submit" className="btn-admin btn-admin--green">
            Add Member
          </button>
          <Link href="/admin/team" className="btn-admin btn-admin--outline">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
