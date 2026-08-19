import Link from "next/link";
import { sql } from "@/lib/db";
import { updateSubmissionStatus, deleteSubmission } from "./actions";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SubmissionsAdminPage() {
  const submissions = await sql`SELECT * FROM submissions ORDER BY created_at DESC`.catch((e) => {
    console.error("Database Error on Submissions Page:", e);
    return [];
  });
  const newCount = submissions.filter(s => s.status === 'new').length;

  const statusColors = {
    new: '#22C55E', read: '#3B82F6', replied: '#8B5CF6', closed: '#9CA3AF',
  };

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  return (
    <div>
      {newCount > 0 && (
        <div style={{ marginBottom: "1.25rem", padding: "0.875rem 1.25rem", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: "8px", color: "#86EFAC", fontSize: "0.9rem" }}>
          <strong>{newCount} new submission{newCount > 1 ? 's' : ''}</strong> waiting for review.
        </div>
      )}

      <div className="admin-card">
        <div className="admin-card__header">
          <span className="admin-card__title">Form Submissions ({submissions.length})</span>
        </div>

        {submissions.length === 0 ? (
          <div style={{ padding: "2rem", textAlign: "center", color: "#9CA3AF" }}>
            No submissions yet. They'll appear here when visitors fill out the contact or quote forms.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {submissions.map(s => (
              <div key={s.id} style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #F3F4F6", background: s.status === 'new' ? 'rgba(34,197,94,0.04)' : 'transparent' }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.3rem" }}>
                      <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>{String(s.name)}</span>
                      <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: statusColors[String(s.status)] ?? '#6B7280', background: "#F3F4F6", padding: "0.15rem 0.5rem", borderRadius: "4px" }}>
                        {String(s.status)}
                      </span>
                      {s.source && <span style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>via {String(s.source)}</span>}
                    </div>
                    <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", fontSize: "0.83rem", color: "#6B7280", marginBottom: "0.75rem" }}>
                      <a href={`mailto:${s.email}`} style={{ color: "#60A5FA" }}>{String(s.email)}</a>
                      {s.company && <span>{String(s.company)}</span>}
                      {s.service && <span>Service: <strong style={{ color: "#374151" }}>{String(s.service)}</strong></span>}
                      {s.budget && <span>Budget: <strong style={{ color: "#374151" }}>{String(s.budget)}</strong></span>}
                      <span>{formatDate(String(s.created_at))}</span>
                    </div>
                    <p style={{ fontSize: "0.88rem", color: "#374151", lineHeight: 1.55, maxWidth: "680px" }}>{String(s.message)}</p>
                    {s.how && <p style={{ marginTop: "0.4rem", fontSize: "0.78rem", color: "#9CA3AF" }}>How they found us: {String(s.how)}</p>}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", flexShrink: 0 }}>
                    {s.status === 'new' && (
                      <form action={updateSubmissionStatus} style={{ display: "inline" }}>
                        <input type="hidden" name="id" value={String(s.id)} />
                        <input type="hidden" name="status" value="read" />
                        <button type="submit" className="btn-admin btn-admin--outline btn-admin--sm">Mark Read</button>
                      </form>
                    )}
                    {s.status === 'read' && (
                      <form action={updateSubmissionStatus} style={{ display: "inline" }}>
                        <input type="hidden" name="id" value={String(s.id)} />
                        <input type="hidden" name="status" value="replied" />
                        <button type="submit" className="btn-admin btn-admin--outline btn-admin--sm">Mark Replied</button>
                      </form>
                    )}
                    {(s.status === 'replied' || s.status === 'read') && (
                      <form action={updateSubmissionStatus} style={{ display: "inline" }}>
                        <input type="hidden" name="id" value={String(s.id)} />
                        <input type="hidden" name="status" value="closed" />
                        <button type="submit" className="btn-admin btn-admin--ghost btn-admin--sm">Close</button>
                      </form>
                    )}
                    {s.status === 'closed' && (
                      <form action={updateSubmissionStatus} style={{ display: "inline" }}>
                        <input type="hidden" name="id" value={String(s.id)} />
                        <input type="hidden" name="status" value="new" />
                        <button type="submit" className="btn-admin btn-admin--ghost btn-admin--sm">Reopen</button>
                      </form>
                    )}
                    <a href={`mailto:${s.email}?subject=Re: Your enquiry to HashTurn`} className="btn-admin btn-admin--green btn-admin--sm" style={{ textAlign: "center" }}>Reply →</a>
                    <form action={deleteSubmission} style={{ display: "inline", marginTop: "1rem" }}>
                      <input type="hidden" name="id" value={String(s.id)} />
                      <button
                        type="submit"
                        className="btn-admin btn-admin--danger btn-admin--sm"
                        style={{ width: "100%" }}
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
