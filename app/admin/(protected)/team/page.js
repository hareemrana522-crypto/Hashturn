import Link from "next/link";
import { sql } from "@/lib/db";
import TeamTable from "./TeamTable";
import DeleteButton from "../../DeleteButton";

export default async function TeamAdminPage() {
  const members = await sql`SELECT id, name, role, avatar, avatar_color, image, linkedin, bio, display_order FROM team_members ORDER BY display_order ASC, name ASC`.catch(() => []);

  return (
    <div className="admin-card">
      <div className="admin-card__header">
        <span className="admin-card__title">Team Members ({members.length})</span>
        <Link href="/admin/team/new" className="btn-admin btn-admin--green">
          + Add Member
        </Link>
      </div>

      {members.length === 0 ? (
        <div style={{ padding: "2rem", textAlign: "center", color: "#9CA3AF" }}>
          No team members yet.{" "}
          <Link href="/admin/team/new" style={{ color: "#22C55E" }}>
            Add your first member →
          </Link>
        </div>
      ) : (
        <div>
          <p style={{ padding: "0.75rem 1.25rem", fontSize: "0.8rem", color: "#6B7280", borderBottom: "1px solid #F3F4F6", margin: 0 }}>
            Drag rows to reorder — order is reflected on the About page.
          </p>
          <TeamTable initialMembers={members} />
        </div>
      )}
    </div>
  );
}
