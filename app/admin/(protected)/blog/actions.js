"use server";

import { sql } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadImage } from "@/lib/blob";

export async function deleteBlog(formData) {
  const slug = formData.get("slug");
  if (!slug) return;

  try {
    await sql`DELETE FROM blog_posts WHERE slug = ${slug}`;
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
  } catch (error) {
    console.error("Failed to delete blog post", error);
  }
}

export async function createBlog(formData) {
  const title = formData.get("title");
  const author = formData.get("author") || "HashTurn Team";
  const pubDate = formData.get("pubDate");
  const tagsRaw = formData.get("tags") || "";
  // Convert comma-separated tags to JSON array
  const tags = JSON.stringify(tagsRaw.split(",").map(t => t.trim()).filter(Boolean));
  const description = formData.get("description") || "";
  const content = formData.get("content") || "";
  
  // Generating a slug from the title
  let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  try {
    let heroImage = "/placeholder.jpg";
    const imageFile = formData.get("image");
    if (imageFile && imageFile.size > 0) {
      heroImage = await uploadImage(imageFile, "blog");
    }

    await sql`
      INSERT INTO blog_posts (slug, title, description, pub_date, author, content, tags, hero_image)
      VALUES (${slug}, ${title}, ${description}, ${pubDate}, ${author}, ${content}, ${tags}, ${heroImage})
    `;
  } catch (error) {
    console.error("Failed to create blog post", error);
    throw new Error("Database error while creating blog post.");
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function updateBlog(formData) {
  const originalSlug = formData.get("originalSlug");
  const title = formData.get("title");
  const author = formData.get("author") || "HashTurn Team";
  const pubDate = formData.get("pubDate");
  const tagsRaw = formData.get("tags") || "";
  // Convert comma-separated tags to JSON array
  const tags = JSON.stringify(tagsRaw.split(",").map(t => t.trim()).filter(Boolean));
  const description = formData.get("description") || "";
  const content = formData.get("content") || "";

  let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  try {
    let heroImage = formData.get("currentImage") || "";
    const imageFile = formData.get("image");
    if (imageFile && imageFile.size > 0) {
      heroImage = await uploadImage(imageFile, "blog");
    }

    await sql`
      UPDATE blog_posts 
      SET slug = ${slug}, title = ${title}, description = ${description}, pub_date = ${pubDate}, author = ${author}, content = ${content}, tags = ${tags}, hero_image = ${heroImage}
      WHERE slug = ${originalSlug}
    `;
  } catch (error) {
    console.error("Failed to update blog post", error);
    throw new Error("Database error while updating blog post.");
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}
