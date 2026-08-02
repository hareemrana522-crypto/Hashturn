import Link from "next/link";
import { sql } from "@/lib/db";

export default async function DashboardPage() {
  let blogCount = 0,
    projectCount = 0,
    teamCount = 0,
    reviewCount = 0,
    submissionCount = 0,
    newCount = 0;

  try {
    const [b, p, t, r, s, n] = await Promise.all([
      sql`SELECT COUNT(*)::int AS c FROM blog_posts`,
      sql`SELECT COUNT(*)::int AS c FROM projects`,
      sql`SELECT COUNT(*)::int AS c FROM team_members`,
      sql`SELECT COUNT(*)::int AS c FROM reviews`,
      sql`SELECT COUNT(*)::int AS c FROM submissions`,
      sql`SELECT COUNT(*)::int AS c FROM submissions WHERE status='new'`,
    ]);
    blogCount = b[0].c;
    projectCount = p[0].c;
    teamCount = t[0].c;
    reviewCount = r[0].c;
    submissionCount = s[0].c;
    newCount = n[0].c;
  } catch (e) {
    console.error("Dashboard DB error:", e);
  }

  return (
    <>
      <div className="stat-cards">
        <div className="stat-card">
          <div className="stat-card__label">Blog Posts</div>
          <div className="stat-card__value">{blogCount}</div>
          <div className="stat-card__sub">
            <Link href="/admin/blog" style={{ color: "#22C55E" }}>
              Manage →
            </Link>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card__label">Team Members</div>
          <div className="stat-card__value">{teamCount}</div>
          <div className="stat-card__sub">
            <Link href="/admin/team" style={{ color: "#22C55E" }}>
              Manage →
            </Link>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card__label">Projects</div>
          <div className="stat-card__value">{projectCount}</div>
          <div className="stat-card__sub">
            <Link href="/admin/projects" style={{ color: "#22C55E" }}>
              Manage →
            </Link>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card__label">Reviews</div>
          <div className="stat-card__value">{reviewCount}</div>
          <div className="stat-card__sub">
            <Link href="/admin/reviews" style={{ color: "#22C55E" }}>
              Manage →
            </Link>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card__label">Submissions</div>
          <div className="stat-card__value">{submissionCount}</div>
          <div className="stat-card__sub">
            {newCount > 0 ? (
              <Link href="/admin/submissions" style={{ color: "#22C55E" }}>
                {newCount} new →
              </Link>
            ) : (
              <Link href="/admin/submissions" style={{ color: "#22C55E" }}>
                View all →
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="admin-card" style={{ marginTop: "1.5rem" }}>
        <div className="admin-card__header">
          <span className="admin-card__title">Quick Actions</span>
        </div>
        <div
          style={{
            padding: "1.25rem",
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
          }}
        >
          <Link href="/admin/blog/new" className="btn-admin btn-admin--green">
            + New Blog Post
          </Link>
          <Link
            href="/admin/projects/new"
            className="btn-admin btn-admin--green"
          >
            + New Project
          </Link>
          <Link
            href="/admin/reviews/new"
            className="btn-admin btn-admin--outline"
          >
            + Add Review
          </Link>
          <Link href="/admin/team/new" className="btn-admin btn-admin--outline">
            + Add Team Member
          </Link>
        </div>
      </div>
    </>
  );
}
