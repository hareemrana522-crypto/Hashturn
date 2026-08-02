"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import DeleteButton from "../../DeleteButton";
import { deleteTeamMember } from "./actions";

export default function TeamTable({ initialMembers }) {
  const [members, setMembers] = useState(initialMembers);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const dragSrc = useRef(null);

  const handleDragStart = (e, index) => {
    dragSrc.current = index;
    e.currentTarget.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove("dragging");
    document.querySelectorAll(".team-row").forEach(r => r.classList.remove("drag-over"));
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    document.querySelectorAll(".team-row").forEach(r => r.classList.remove("drag-over"));
    if (dragSrc.current !== index) {
      e.currentTarget.classList.add("drag-over");
    }
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const srcIndex = dragSrc.current;
    if (srcIndex === null || srcIndex === index) return;

    const newMembers = [...members];
    const [draggedMember] = newMembers.splice(srcIndex, 1);
    newMembers.splice(index, 0, draggedMember);

    setMembers(newMembers);
    setIsDirty(true);
    e.currentTarget.classList.remove("drag-over");
  };

  const saveOrder = async () => {
    setIsSaving(true);
    setSaveStatus("Saving...");
    try {
      const order = members.map(m => m.id);
      const res = await fetch("/api/admin/team-reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order }),
      });
      if (res.ok) {
        setSaveStatus("Saved!");
        setIsDirty(false);
        setTimeout(() => setSaveStatus(""), 2000);
      } else {
        setSaveStatus("Error saving order.");
      }
    } catch (err) {
      setSaveStatus("Network error.");
    }
    setIsSaving(false);
  };

  return (
    <div>
      {isDirty && (
        <div style={{ padding: "0.75rem 1.25rem", background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: "8px", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ fontSize: "0.85rem", color: "#166534" }}>Order changed</span>
          <button onClick={saveOrder} disabled={isSaving} className="btn-admin btn-admin--green btn-admin--sm">
            Save Order
          </button>
          <span style={{ fontSize: "0.85rem", color: "#166534" }}>{saveStatus}</span>
        </div>
      )}

      <div style={{ overflowX: "auto" }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: "36px" }}></th>
              <th>Member</th>
              <th>Role</th>
              <th>Bio</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m, idx) => (
              <tr 
                key={m.id} 
                className="team-row" 
                draggable="true"
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDrop={(e) => handleDrop(e, idx)}
                style={{ cursor: "default", transition: "background 0.1s" }}
              >
                <td className="drag-handle" style={{ cursor: "grab", padding: "0 0.5rem", color: "#374151" }} title="Drag to reorder">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ display: "block", margin: "auto", opacity: 0.4 }}>
                    <circle cx="4" cy="3" r="1.2" fill="currentColor"/>
                    <circle cx="10" cy="3" r="1.2" fill="currentColor"/>
                    <circle cx="4" cy="7" r="1.2" fill="currentColor"/>
                    <circle cx="10" cy="7" r="1.2" fill="currentColor"/>
                    <circle cx="4" cy="11" r="1.2" fill="currentColor"/>
                    <circle cx="10" cy="11" r="1.2" fill="currentColor"/>
                  </svg>
                </td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    {m.image ? (
                      <img src={m.image} alt={m.name} style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: m.avatar_color || "#22C55E", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.85rem", color: "#fff", flexShrink: 0 }}>
                        {m.avatar || String(m.name).split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <span style={{ fontWeight: 500 }}>{String(m.name)}</span>
                  </div>
                </td>
                <td style={{ color: "#4B5563" }}>{String(m.role)}</td>
                <td style={{ color: "#6B7280", maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {String(m.bio)}
                </td>
                <td>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <Link
                      href={`/admin/team/edit/${m.id}`}
                      className="btn-admin btn-admin--outline btn-admin--sm"
                    >
                      Edit
                    </Link>
                    <form action={deleteTeamMember} style={{ display: "inline" }}>
                      <input type="hidden" name="id" value={String(m.id)} />
                      <DeleteButton confirmMessage="Remove this team member?" />
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style>{`
        .team-row.dragging { opacity: 0.4; }
        .team-row.drag-over { border-top: 2px solid #22C55E; }
        .drag-handle:active { cursor: grabbing !important; }
      `}</style>
    </div>
  );
}
