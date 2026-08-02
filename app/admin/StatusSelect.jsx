"use client";

export default function StatusSelect({ defaultValue }) {
  return (
    <select
      name="status"
      defaultValue={defaultValue}
      onChange={(e) => e.target.form.requestSubmit()}
      style={{
        padding: "0.2rem",
        fontSize: "0.75rem",
        borderRadius: "4px",
        border: "1px solid #D1D5DB",
      }}
    >
      <option value="new">New</option>
      <option value="read">Read</option>
      <option value="replied">Replied</option>
      <option value="closed">Closed</option>
    </select>
  );
}
