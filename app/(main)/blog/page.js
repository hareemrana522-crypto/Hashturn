export const revalidate = 60;

import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Blog | HashTurn',
  description: 'Discover actionable tips on automation, case studies from real businesses, and the latest in Microsoft 365 solutions.',
};

import { sql } from '@/lib/db';

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await sql`SELECT slug, title, description as desc, pub_date, '5 min read' as read_time, false as featured, hero_image as image, tags as tag FROM blog_posts ORDER BY pub_date DESC`.catch(() => []);

  // Use a fallback color array for tags
  const colors = ["var(--blue)", "var(--red)", "var(--yellow)", "var(--green)"];

  return (
    <>
      {/* =========================================
           HERO SECTION
      ========================================= */}
      <section className="page" id="blog-hero" style={{ paddingTop: 180, paddingBottom: 120 }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="hero-content reveal" style={{ maxWidth: 1200, margin: "0 auto", width: "100%", textAlign: "center" }}>
            <p className="eyebrow" style={{ color: "navy", fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "1px", fontWeight: "700", textTransform: "uppercase", marginBottom: "15px" }}>Our Blog</p>
            <h1 className="hero-title" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: "800", marginBottom: 20, fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.2, color: "var(--foreground)" }}>
              Latest Insights & <span className="text-multicolor">Updates</span>
            </h1>
            <p className="hero-sub reveal" style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.1rem", lineHeight: 1.7, color: "var(--muted)", maxWidth: "700px", margin: "0 auto 50px" }}>
              Discover actionable tips on automation, case studies from real businesses, and the latest in Microsoft 365 solutions.
            </p>
          </div>
        </div>

        <div className="container">
          <div className="blog-grid reveal">
            {posts.map((post, idx) => {
              // Parse tags - stored as JSON array string
              let firstTag = "Insight";
              try {
                const tagsArr = JSON.parse(post.tag || '[]');
                if (Array.isArray(tagsArr) && tagsArr.length > 0) {
                  firstTag = tagsArr[0];
                } else if (typeof post.tag === 'string' && post.tag && !post.tag.startsWith('[')) {
                  firstTag = post.tag;
                }
              } catch { firstTag = post.tag || "Insight"; }
              return (
              <div
                key={post.slug}
                className={`blog-card ${
                  post.featured ? "blog-card-featured" : ""
                }`}
                style={{ display: "flex", flexDirection: "column" }}
              >
                {/* Blog Image */}
                <div style={{ position: "relative", height: "240px", width: "100%", overflow: "hidden" }}>
                  <Image src={post.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"} alt={post.title} fill priority={idx < 6} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: "cover" }} />
                </div>
                
                <div className="blog-card-content" style={{ padding: "1.8rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <span className="blog-tag" style={{ color: colors[idx % colors.length] }}>
                    {firstTag}
                  </span>
                  <h3 style={{ fontSize: "1.1rem", lineHeight: "1.5", marginBottom: "0.8rem", fontWeight: "700" }}>{post.title}</h3>
                  <p style={{ flexGrow: 1, color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>{post.desc}</p>
                  
                  <div style={{ marginTop: "1.5rem", borderTop: "1px solid rgba(0,0,0,0.05)", paddingTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div className="blog-meta" style={{ marginBottom: 0 }}>
                      <span>{new Date(post.pub_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      <span>•</span>
                      <span>{post.read_time || "5 min read"}</span>
                    </div>
                    <a href={`/blog/${post.slug}`} className="blog-link" style={{ color: "var(--blue)" }}>
                      Read More <i className="fa-solid fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
