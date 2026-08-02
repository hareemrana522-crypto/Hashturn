import Link from "next/link";
import Image from "next/image";
import { CASE_STUDIES, TOOL_LOGOS } from "@/lib/case-studies";

export const metadata = {
  title: "Our Work — Hashturn",
  description:
    "Browse automation projects delivered by HashTurn. See real results for real clients across business process automation, RPA, Microsoft 365, and API integrations.",
};

export default function WorkPage() {
  return (
    <>
      {/* ░░ HERO ░░ */}
      <section className="srv-hero-section">
        <div className="container srv-hero-inner reveal">
          <span className="srv-tag">CASE STUDIES</span>
          <h1 className="srv-title" style={{ marginBottom: 10 }}>
            Projects <span className="text-multicolor">We&apos;ve Delivered</span>
          </h1>
          <p className="srv-subtitle" style={{ fontSize: 15 }}>
            Real automation builds for real businesses — with measurable
            results.
          </p>
        </div>
      </section>

      {/* ░░ CASE STUDIES GRID ░░ */}
      <section className="page" style={{ paddingTop: "1.5rem", minHeight: "auto" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
              gap: "2rem",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            {CASE_STUDIES.map((study) => (
              <Link
                key={study.slug}
                href={`/work/${study.slug}`}
                className="case-study-card glass-card"
                style={{
                  "--cs-color": study.color,
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "100%",
                  overflow: "hidden",
                  transition: "transform 0.4s ease, box-shadow 0.4s ease",
                }}
              >
                {/* Project Image */}
                <div
                  className="cs-image-wrap"
                  style={{ position: "relative", height: 240, flexShrink: 0 }}
                >
                  {study.image ? (
                    <img
                      src={study.image}
                      alt={study.title}
                      className="cs-image"
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        backgroundColor: "#f8f9fa",
                        display: "block",
                        padding: "1rem",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: `color-mix(in srgb, ${study.color} 15%, #f8f8f8)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontWeight: 800,
                          fontSize: "1.4rem",
                          color: study.color,
                          opacity: 0.5,
                        }}
                      >
                        {study.client}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="cs-body" style={{ padding: "2.2rem 2.5rem 3.5rem 2.5rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <span className="cs-tag">{study.category}</span>
                  <h2 className="cs-title" style={{ fontSize: "1.7rem", marginBottom: "0.7rem" }}>{study.title}</h2>
                  <p
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      color: "var(--muted)",
                      marginBottom: "0.8rem",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    Client: {study.client}
                  </p>
                  <p className="cs-desc">
                    {study.summary.length > 180
                      ? study.summary.slice(0, 180) + "…"
                      : study.summary}
                  </p>

                  {/* Tech logos */}
                  <div className="tech-icons-row" style={{ marginBottom: "1.2rem" }}>
                    {study.tech.map((t) => {
                      const tool = TOOL_LOGOS[t] || { img: "react.png.png", color: "#ccc" };
                      return (
                        <div key={t} className="tech-icon-badge" style={{ "--icon-color": tool.color }}>
                          {tool.text ? (
                            <span style={{ fontSize: "1.3rem", fontWeight: 800 }}>{tool.text}</span>
                          ) : tool.icon ? (
                            <i className={tool.icon} style={{ fontSize: "1.5rem", color: tool.color }}></i>
                          ) : (
                            <img 
                              src={`/${tool.img}`} 
                              alt={t} 
                              style={{ 
                                ...(tool.h ? { width: "auto", height: tool.h } : {}),
                                ...(tool.blend ? { mixBlendMode: tool.blend } : {})
                              }} 
                            />
                          )}
                          <span className="tech-icon-tooltip">{t}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Results preview */}
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.4rem 0" }}>
                    {study.results.slice(0, 2).map((r) => (
                      <li
                        key={r}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.6rem",
                          fontSize: "0.85rem",
                          lineHeight: 1.6,
                          color: "var(--text)",
                          fontFamily: "'Inter', sans-serif",
                          marginBottom: "0.6rem",
                        }}
                      >
                        <i
                          className="fa-solid fa-check"
                          style={{ marginTop: "0.25rem", flexShrink: 0, color: study.color }}
                        />
                        {r}
                      </li>
                    ))}
                  </ul>

                  <span className="cs-view-link" style={{ marginTop: "auto" }}>
                    View case study <i className="fa-solid fa-arrow-right" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* ░░ CTA ░░ */}
      <section className="cta-section" id="work-cta" style={{ padding: "4rem 0 6rem 0" }}>
        <div className="container">
          <div className="cta-outer reveal">
            <div className="cta-mesh-card">
              <div className="cta-mesh-blob mb-1"></div>
              <div className="cta-mesh-blob mb-2"></div>
              <div className="cta-mesh-blob mb-3"></div>
              <div className="cta-mesh-blob mb-4"></div>
              <div className="cta-mesh-overlay"></div>

              <div className="cta-content">
                <h2 className="section-title">Ready to See Results Like These?</h2>
                <p className="section-subtitle-text tight-subtitle">
                  Book a free 30-minute strategy call and we&apos;ll show you
                  exactly how we&apos;d automate your processes.
                </p>
                <div className="hero-actions" style={{ justifyContent: "center", marginTop: 24 }}>
                  <a href="/contact" className="cta-btn-grad">
                    Book Free Strategy Call <i className="fa-solid fa-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
