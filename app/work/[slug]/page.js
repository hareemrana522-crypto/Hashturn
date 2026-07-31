import Link from "next/link";
import Image from "next/image";
import { CASE_STUDIES, TOOL_LOGOS } from "@/lib/case-studies";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return CASE_STUDIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const study = CASE_STUDIES.find((s) => s.slug === params.slug);
  if (!study) return {};
  return {
    title: `${study.title} — HashTurn`,
    description: study.summary,
  };
}

export default function CaseStudyPage({ params }) {
  const study = CASE_STUDIES.find((s) => s.slug === params.slug);
  if (!study) notFound();

  return (
    <>
      {/* ░░ BACK LINK + HERO ░░ */}
      <section className="page" style={{ paddingTop: "calc(var(--nav-h) + 3rem)" }}>
        <div className="container">
          <Link href="/work" className="cd-back-link">
            <i className="fa-solid fa-arrow-left" />
            All Projects
          </Link>

          {/* Title block */}
          <div className="cd-overview" style={{ "--cs-color": study.color }}>
            <span
              className="cs-tag"
              style={{ "--cs-color": study.color, marginBottom: "1.2rem" }}
            >
              {study.category}
            </span>
            <h1 className="cd-title">{study.title}</h1>
            <p className="cd-description">{study.summary}</p>

            {/* Meta row */}
            <div className="cd-meta-row">
              <div>
                <p className="cd-meta-label">Client</p>
                <p className="cd-meta-value">{study.client}</p>
              </div>
              <div>
                <p className="cd-meta-label">Service</p>
                <p className="cd-meta-value">{study.category}</p>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div
            className="cd-hero-row"
            style={{ marginTop: "2.5rem", "--cs-color": study.color, textAlign: "center" }}
          >
            {study.image ? (
              <img
                src={study.image}
                alt={study.title}
                className="cd-hero-image"
                style={{ objectFit: "contain", width: "100%", height: "auto", borderRadius: 24, maxHeight: "800px" }}
              />
            ) : (
              <div
                style={{
                  background: `color-mix(in srgb, ${study.color} 12%, #f8f8f8)`,
                  borderRadius: 24,
                  minHeight: 320,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800,
                    fontSize: "2rem",
                    color: study.color,
                    opacity: 0.35,
                  }}
                >
                  {study.client}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ░░ BODY — article + sidebar ░░ */}
      <section className="page">
        <div className="container">
          <div className="cd-body-grid" style={{ "--cs-color": study.color }}>
            {/* ── Article ── */}
            <article>
              <h2 className="cd-article-title">Our Solution</h2>

              {/* Challenge */}
              <div className="cd-section">
                <h3>The Challenge</h3>
                <p>{study.challenge}</p>
              </div>

              {/* Solution intro */}
              <div className="cd-section">
                <h3>Our Approach</h3>
                <p>{study.solution}</p>
              </div>

              {/* Detailed sections */}
              {study.sections.map((sec) => (
                <div key={sec.heading} className="cd-section">
                  <h3>{sec.heading}</h3>
                  <p>{sec.body}</p>
                  {sec.bullets && sec.bullets.length > 0 && (
                    <ul className="cd-bullets">
                      {sec.bullets.map((b) => (
                        <li key={b}>
                          <strong>{b.split(":")[0]}:</strong>
                          {b.includes(":") ? b.slice(b.indexOf(":") + 1) : ""}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {/* Technical highlight */}
              {study.technicalHighlight && (
                <div className="cd-section">
                  <h3>Technical Highlight</h3>
                  <p>{study.technicalHighlight}</p>
                </div>
              )}

              {/* Additional Images (Flow Screenshots) */}
              {study.images && study.images.length > 0 && (
                <div className="cd-section" style={{ marginTop: "3rem" }}>
                  <h3 style={{ marginBottom: "1.5rem" }}>Workflow Architecture</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                    {study.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`Workflow Step ${i + 1}`}
                        style={{ width: "100%", height: "auto", borderRadius: "12px", border: "1px solid var(--border)" }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* ── Sidebar ── */}
            <aside className="cd-sidebar">
              {/* Tech stack box */}
              <div className="cd-sidebar-box">
                <h4>Tools & Technologies</h4>
                <div className="tech-icons-row" style={{ marginTop: "1rem" }}>
                  {study.tech.map((t) => {
                    const tool = TOOL_LOGOS[t] || { img: "react.png.png", color: "#ccc" };
                    return (
                      <div key={t} className="tech-icon-badge" style={{ "--icon-color": tool.color }}>
                        {tool.text ? (
                          <span style={{ fontSize: "1.3rem", fontWeight: 800 }}>{tool.text}</span>
                        ) : (
                          <img 
                            src={`/${tool.img}`} 
                            alt={t} 
                            style={tool.h ? { width: "auto", height: tool.h } : {}} 
                          />
                        )}
                        <span className="tech-icon-tooltip">{t}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Results box */}
              <div className="cd-sidebar-box" style={{ "--cs-color": study.color }}>
                <h4>Key Results</h4>
                <ul className="cd-sidebar-results">
                  {study.results.map((r) => (
                    <li key={r}>
                      <i
                        className="fa-solid fa-check"
                        style={{ color: study.color, marginRight: 8 }}
                      />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA box */}
              <div className="cd-sidebar-cta">
                <h4>Need Something Similar?</h4>
                <p>
                  Book a free 30-minute strategy call and we&apos;ll show you
                  how we&apos;d build it for your business.
                </p>
                <a href="/contact" className="btn-primary">
                  Book Free Call <i className="fa-solid fa-arrow-right" />
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
