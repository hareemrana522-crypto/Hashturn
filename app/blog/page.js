import Link from 'next/link';

export const metadata = {
  title: 'Blog | HashTurn',
  description: 'Discover actionable tips on automation, case studies from real businesses, and the latest in Microsoft 365 solutions.',
};

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

export default function BlogPage() {
  return (
    <>
      {/* =========================================
           HERO SECTION
      ========================================= */}
      <section className="page" id="blog-hero" style={{ paddingTop: 180, paddingBottom: 120 }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="hero-content reveal" style={{ maxWidth: 1200, margin: "0 auto", width: "100%", textAlign: "center" }}>
            <p className="eyebrow" style={{ color: "var(--red)", fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "1px", fontWeight: "700", textTransform: "uppercase", marginBottom: "15px" }}>Our Blog</p>
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
            {BLOG_POSTS.map((post) => (
              <div
                key={post.slug}
                className={`glass-panel blog-card ${
                  post.featured ? "blog-card-featured" : ""
                }`}
                style={{ display: "flex", flexDirection: "column" }}
              >
                {/* Blog Image */}
                <div style={{ margin: "-2rem -2rem 1.5rem -2rem", borderRadius: "1rem 1rem 0 0", overflow: "hidden" }}>
                  <img src={post.image} alt={post.title} style={{ width: "100%", height: "220px", objectFit: "cover" }} />
                </div>
                
                <span className="blog-tag" style={{ color: post.color }}>
                  {post.tag}
                </span>
                <h3>{post.title}</h3>
                <p style={{ flexGrow: 1 }}>{post.desc}</p>
                <div className="blog-meta">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <a href={`/blog/${post.slug}`} className="blog-link">
                  Read More <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
