"use server";

import { sql } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadImage } from "@/lib/blob";

export async function deleteProject(formData) {
  const slug = formData.get("slug");
  if (!slug) return;

  try {
    await sql`DELETE FROM projects WHERE slug = ${slug}`;
    revalidatePath("/admin/projects");
    revalidatePath("/work");
  } catch (error) {
    console.error("Failed to delete project", error);
  }
}

export async function createProject(formData) {
  const title = formData.get("title");
  const category = formData.get("category") || "Web Development";
  const clientName = formData.get("clientName") || "";
  const problem = formData.get("problem") || "";
  const solution = formData.get("solution") || "";
  const result = formData.get("result") || "";
  const techStack = formData.get("techStack") || "";
  
  let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  try {
    let mainImage = "/placeholder-project.jpg";
    const imageFile = formData.get("image");
    if (imageFile && imageFile.size > 0) {
      mainImage = await uploadImage(imageFile, "projects");
    }

    await sql`
      INSERT INTO projects (slug, title, service, client, description, content, results, tools, hero_image)
      VALUES (${slug}, ${title}, ${category}, ${clientName}, ${problem}, ${solution}, ${result}, ${techStack}, ${mainImage})
    `;
  } catch (error) {
    console.error("Failed to create project", error);
    throw new Error("Database error while creating project.");
  }

  revalidatePath("/admin/projects");
  revalidatePath("/work");
  redirect("/admin/projects");
}

export async function updateProject(formData) {
  const originalSlug = formData.get("originalSlug");
  const title = formData.get("title");
  const category = formData.get("category") || "Web Development";
  const clientName = formData.get("clientName") || "";
  const problem = formData.get("problem") || "";
  const solution = formData.get("solution") || "";
  const result = formData.get("result") || "";
  const techStack = formData.get("techStack") || "";
  
  let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  try {
    let mainImage = formData.get("currentImage") || "";
    const imageFile = formData.get("image");
    if (imageFile && imageFile.size > 0) {
      mainImage = await uploadImage(imageFile, "projects");
    }

    await sql`
      UPDATE projects
      SET slug = ${slug}, title = ${title}, service = ${category}, client = ${clientName}, description = ${problem}, content = ${solution}, results = ${result}, tools = ${techStack}, hero_image = ${mainImage}
      WHERE slug = ${originalSlug}
    `;
  } catch (error) {
    console.error("Failed to update project", error);
    throw new Error("Database error while updating project.");
  }

  revalidatePath("/admin/projects");
  revalidatePath("/work");
  redirect("/admin/projects");
}
