"use server";

import { sql } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadImage } from "@/lib/blob";

export async function deleteTeamMember(formData) {
  const id = formData.get("id");
  if (!id) return;

  try {
    await sql`DELETE FROM team_members WHERE id = ${id}`;
    revalidatePath("/admin/team");
    revalidatePath("/about"); // Revalidate about page where team is shown
  } catch (error) {
    console.error("Failed to delete team member", error);
  }
}

export async function createTeamMember(formData) {
  const name = formData.get("name") || "";
  const role = formData.get("role") || "";
  const bio = formData.get("bio") || "";
  const avatar = formData.get("avatar") || ""; // this was text initials in old DB
  const avatarColor = formData.get("avatarColor") || "#22C55E";
  const linkedin = formData.get("linkedin") || "";
  const displayOrder = parseInt(formData.get("displayOrder") || "99", 10);
  
  try {
    let image = "";
    const imageFile = formData.get("image");
    if (imageFile && imageFile.size > 0) {
      image = await uploadImage(imageFile, "team");
    }

    const id = crypto.randomUUID();

    await sql`
      INSERT INTO team_members (id, name, role, bio, avatar, avatar_color, image, linkedin, display_order)
      VALUES (${id}, ${name}, ${role}, ${bio}, ${avatar}, ${avatarColor}, ${image}, ${linkedin}, ${displayOrder})
    `;
  } catch (error) {
    console.error("Failed to create team member", error);
    throw new Error("Database error while creating team member.");
  }

  revalidatePath("/admin/team");
  revalidatePath("/about");
  redirect("/admin/team");
}

export async function updateTeamMember(formData) {
  const originalId = formData.get("originalId");
  const name = formData.get("name") || "";
  const role = formData.get("role") || "";
  const bio = formData.get("bio") || "";
  const avatar = formData.get("avatar") || "";
  const avatarColor = formData.get("avatarColor") || "#22C55E";
  const linkedin = formData.get("linkedin") || "";
  const displayOrder = parseInt(formData.get("displayOrder") || "99", 10);
  
  try {
    let image = formData.get("currentImage") || "";
    const imageFile = formData.get("image");
    if (imageFile && imageFile.size > 0) {
      image = await uploadImage(imageFile, "team");
    }

    await sql`
      UPDATE team_members
      SET name = ${name}, role = ${role}, bio = ${bio}, display_order = ${displayOrder},
          avatar = ${avatar}, avatar_color = ${avatarColor}, image = ${image}, linkedin = ${linkedin}
      WHERE id = ${originalId}
    `;
  } catch (error) {
    console.error("Failed to update team member", error);
    throw new Error("Database error while updating team member.");
  }

  revalidatePath("/admin/team");
  revalidatePath("/about");
  redirect("/admin/team");
}
