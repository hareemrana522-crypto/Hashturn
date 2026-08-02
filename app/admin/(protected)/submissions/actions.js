"use server";

import { sql } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteSubmission(formData) {
  const id = formData.get("id");
  if (!id) return;

  try {
    await sql`DELETE FROM submissions WHERE id = ${id}`;
    revalidatePath("/admin/submissions");
    revalidatePath("/admin/dashboard");
  } catch (error) {
    console.error("Failed to delete submission", error);
  }
}

export async function updateSubmissionStatus(formData) {
  const id = formData.get("id");
  const status = formData.get("status");
  if (!id || !status) return;

  try {
    await sql`UPDATE submissions SET status = ${status} WHERE id = ${id}`;
    revalidatePath("/admin/submissions");
    revalidatePath("/admin/dashboard");
  } catch (error) {
    console.error("Failed to update submission status", error);
  }
}
