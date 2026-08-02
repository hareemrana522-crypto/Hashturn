"use server";

import { sql } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteReview(formData) {
  const id = formData.get("id");
  if (!id) return;

  try {
    await sql`DELETE FROM reviews WHERE id = ${id}`;
    revalidatePath("/admin/reviews");
  } catch (error) {
    console.error("Failed to delete review", error);
  }
}

export async function createReview(formData) {
  const clientName = formData.get("clientName");
  const company = formData.get("company") || "";
  const text = formData.get("text") || "";
  const rating = parseInt(formData.get("rating") || "5", 10);
  const source = formData.get("source") || "Direct";
  const featured = formData.get("featured") === "on";
  const initials = clientName ? clientName.substring(0, 2).toUpperCase() : "A";
  
  try {
    await sql`
      INSERT INTO reviews (name, location, rating, review_text, source, featured, initials)
      VALUES (${clientName}, ${company}, ${rating}, ${text}, ${source}, ${featured}, ${initials})
    `;
  } catch (error) {
    console.error("Failed to create review", error);
    throw new Error("Database error while creating review.");
  }

  revalidatePath("/admin/reviews");
  redirect("/admin/reviews");
}

export async function updateReview(formData) {
  const id = formData.get("originalId");
  const clientName = formData.get("clientName");
  const company = formData.get("company") || "";
  const text = formData.get("text") || "";
  const rating = parseInt(formData.get("rating") || "5", 10);
  const source = formData.get("source") || "Direct";
  const featured = formData.get("featured") === "on";
  const initials = clientName ? clientName.substring(0, 2).toUpperCase() : "A";
  
  try {
    await sql`
      UPDATE reviews
      SET name = ${clientName}, location = ${company}, rating = ${rating}, review_text = ${text}, source = ${source}, featured = ${featured}, initials = ${initials}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error("Failed to update review", error);
    throw new Error("Database error while updating review.");
  }

  revalidatePath("/admin/reviews");
  redirect("/admin/reviews");
}
