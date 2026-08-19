import Link from "next/link";
import Image from "next/image";
import { sql } from "@/lib/db";
import { updateTeamMember } from "../../actions";
import { notFound } from "next/navigation";

export default async function EditTeamMemberPage({ params }) {
  const { id } = params;

  let member = null;
  try {
    const results = await sql`SELECT * FROM team_members WHERE id = ${id} LIMIT 1`;
    member = results[0];
  } catch (error) {
    console.error("Failed to fetch team member", error);
  }

  if (!member) {
    return notFound();
  }

  return (
    <div className="admin-card" suppressHydrationWarning>
      <div className="admin-card__header">
        <span className="admin-card__title">Edit Team Member</span>
        <Link href="/admin/team" className="btn-admin btn-admin--outline">
          ← Back
        </Link>
      </div>

      <form
        action={updateTeamMember}
        style={{
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}
      >
        <input type="hidden" name="originalId" value={String(member.id)} />

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              defaultValue={String(member.name)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role / Job Title *</label>
            <input
              type="text"
              id="role"
              name="role"
              required
              defaultValue={String(member.role)}
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
              min="1"
              defaultValue={String(member.display_order || "99")}
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
              defaultValue={String(member.avatar || "")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="avatarColor">Avatar Color</label>
            <input
              type="color"
              id="avatarColor"
              name="avatarColor"
              defaultValue={String(member.avatar_color || "#22C55E")}
              style={{ width: "100%", height: "40px" }}
            />
          </div>
        </div>

        <div className="form-group">
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label htmlFor="image">Profile Picture (Image)</label>
            {member.image && (
              <div style={{ marginBottom: "0.5rem" }}>
                <Image src={String(member.image)} alt="Current" width={50} height={50} style={{ objectFit: "cover", borderRadius: "50%" }} />
                <input type="hidden" name="currentImage" value={String(member.image)} />
              </div>
            )}
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
            />
            {member.image && (
              <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
                (Image is already saved. Select a new file only if you want to change it.)
              </span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="linkedin">LinkedIn URL</label>
          <input
            type="text"
            id="linkedin"
            name="linkedin"
            defaultValue={String(member.linkedin || "")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="bio">Short Bio</label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            defaultValue={String(member.bio || "")}
          ></textarea>
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button type="submit" className="btn-admin btn-admin--green">
            Update Member
          </button>
          <Link href="/admin/team" className="btn-admin btn-admin--outline">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
