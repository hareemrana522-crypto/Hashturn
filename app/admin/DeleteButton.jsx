"use client";

export default function DeleteButton({ confirmMessage = "Are you sure you want to delete this?" }) {
  return (
    <button
      type="submit"
      className="btn-admin btn-admin--danger btn-admin--sm"
      onClick={(e) => {
        if (!confirm(confirmMessage)) {
          e.preventDefault();
        }
      }}
    >
      Delete
    </button>
  );
}
