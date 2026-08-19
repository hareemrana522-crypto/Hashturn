export const revalidate = 60;

import Link from 'next/link';
import { sql } from '@/lib/db';
import { marked } from 'marked';

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const result = await sql`SELECT title, description as desc FROM blog_posts WHERE slug = ${params.slug} LIMIT 1`.catch(() => []);
  const post = result[0];
  if (!post) {
    return { title: 'Post Not Found | HashTurn' };
  }
  return {
    title: `${post.title} | HashTurn Blog`,
    description: post.desc,
  };
}

export default async function BlogPost({ params }) {
  const result = await sql`SELECT slug, title, content, hero_image as image, tags as tag, pub_date, '5 min read' as read_time FROM blog_posts WHERE slug = ${params.slug} LIMIT 1`.catch(() => []);
  const post = result[0];

  if (!post) {
    return (
      <section className="page" style={{ paddingTop: 180, paddingBottom: 120, textAlign: 'center' }}>
        <div className="container">
          <h1 className="hero-title" style={{ fontSize: "2rem", marginBottom: "20px" }}>Post not found</h1>
          <a href="/blog" className="btn-ghost">Back to Blog</a>
        </div>
      </section>
    );
  }

  const htmlContent = marked.parse(post.content || "");


  return (
    <>
      <section className="page" id="post-hero" style={{ paddingTop: 180, paddingBottom: 60 }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="reveal">
            <a href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--muted)', textDecoration: 'none', fontWeight: 600, fontFamily: "'Inter', sans-serif", fontSize: '0.9rem' }}>
              <i className="fa-solid fa-arrow-left"></i> Back to Blog
            </a>
            
            <div style={{ marginBottom: "1rem" }}>
              <span className="blog-tag" style={{ color: post.color }}>
                {post.tag}
              </span>
            </div>
            
            <h1 className="hero-title" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: "800", marginBottom: 20, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", lineHeight: 1.3, color: "var(--foreground)" }}>
              {post.title}
            </h1>
            
            <div className="blog-meta" style={{ marginBottom: "2rem", fontSize: "0.95rem" }}>
              <span>{new Date(post.pub_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              <span>•</span>
              <span>{post.read_time || "5 min read"}</span>
            </div>

            <div style={{ width: "100%", height: "400px", borderRadius: "16px", overflow: "hidden", marginBottom: "3rem" }}>
              <img src={post.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>

            <div 
              className="blog-content" 
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.05rem", lineHeight: 1.8, color: "var(--text)" }}
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            >
            </div>

            <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid var(--border)", textAlign: "center" }}>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.3rem", fontWeight: "700", color: "var(--foreground)", marginBottom: "1rem" }}>
                  Ready to transform your business?
                </h3>
                <Link href="/contact" className="cta-btn-grad" style={{ display: "inline-block", padding: "12px 28px", borderRadius: "8px", color: "#fff", fontWeight: "600", textDecoration: "none" }}>
                  Get a Free Strategy Call
                </Link>
              </div>
          </div>
        </div>
      </section>
    </>
  );
}
