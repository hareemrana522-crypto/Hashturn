import Link from 'next/link';

const BLOG_POSTS = [
  {
    slug: "automate-sales-pipeline-2024",
    tag: "Automation",
    title: "How to automate your entire sales pipeline in 2024",
    desc: "Discover the step-by-step guide to removing manual data entry from your CRM and speeding up your sales cycle.",
    date: "Aug 12",
    readTime: "5 min read",
    featured: false,
    color: "var(--blue)",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
  },
  {
    slug: "logistics-firm-case-study",
    tag: "Case Study",
    title: "How We Saved a Logistics Firm 40 Hours a Week",
    desc: "A deep dive into the custom Power Automate flows we built to handle dispatch scheduling and invoice generation entirely on autopilot.",
    date: "Sep 05",
    readTime: "8 min read",
    featured: true,
    color: "var(--red)",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800"
  },
  {
    slug: "sharepoint-vs-custom-apps",
    tag: "Microsoft 365",
    title: "SharePoint vs. Custom Apps: Which is right for you?",
    desc: "Are you outgrowing your SharePoint lists? Here is how to know when it's time to build a custom internal tool.",
    date: "Sep 22",
    readTime: "4 min read",
    featured: false,
    color: "var(--yellow)",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
  },
];



export function generateMetadata({ params }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) {
    return { title: 'Post Not Found | HashTurn' };
  }
  return {
    title: `${post.title} | HashTurn Blog`,
    description: post.desc,
  };
}

export default function BlogPost({ params }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

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
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>

            <div style={{ width: "100%", height: "400px", borderRadius: "16px", overflow: "hidden", marginBottom: "3rem" }}>
              <img src={post.image} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>

            <div className="blog-content" style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.05rem", lineHeight: 1.8, color: "var(--text)" }}>
              <p style={{ fontSize: "1.2rem", color: "var(--muted)", marginBottom: "2rem", lineHeight: 1.6 }}>
                {post.desc}
              </p>
              
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.5rem", fontWeight: "700", color: "var(--foreground)", marginTop: "2.5rem", marginBottom: "1rem" }}>
                Introduction
              </h2>
              <p style={{ marginBottom: "1.5rem" }}>
                Automation is fundamentally changing how modern businesses operate. We recently worked with a rapidly growing company that was struggling to keep up with manual tasks, leading to bottlenecks and frustrated employees. This post breaks down how we solved their core operational challenges.
              </p>

              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.5rem", fontWeight: "700", color: "var(--foreground)", marginTop: "2.5rem", marginBottom: "1rem" }}>
                The Challenge
              </h2>
              <p style={{ marginBottom: "1.5rem" }}>
                Before we stepped in, their team was spending nearly 40 hours a week manually entering data across different spreadsheets and sending repetitive emails to clients. This manual process was not only slow but also highly prone to human error, resulting in delayed responses and lost revenue opportunities.
              </p>

              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.5rem", fontWeight: "700", color: "var(--foreground)", marginTop: "2.5rem", marginBottom: "1rem" }}>
                Our Solution
              </h2>
              <p style={{ marginBottom: "1.5rem" }}>
                We implemented a custom automation flow that integrated their existing CRM directly with their email and accounting software. By leveraging modern API integrations and custom scripting, we automated the entire data pipeline. Now, when a new lead is captured, all systems are updated instantly—saving them countless hours and allowing the team to focus on high-value work.
              </p>

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
        </div>
      </section>
    </>
  );
}
