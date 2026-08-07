import Link from "next/link";
import Image from "next/image";
import { TOOL_LOGOS } from "@/lib/case-studies";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Work — Hashturn",
  description:
    "Browse automation projects delivered by HashTurn. See real results for real clients across business process automation, RPA, Microsoft 365, and API integrations.",
};

export default async function WorkPage() {
  const projects = await sql`SELECT slug, title, service as category, client, description as summary, tools as tech_stack, hero_image as image FROM projects ORDER BY created_at DESC`.catch(() => []);

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
            {projects.map((study, idx) => {
              const techList = study.tech_stack ? study.tech_stack.split(',').map(s => s.trim()) : [];
              const colors = ["#22C55E", "#3B82F6", "#EF4444", "#EAB308", "#8B5CF6"];
              const studyColor = colors[idx % colors.length];

              return (
                <Link
                  key={study.slug}
                  href={`/work/${study.slug}`}
                  className="case-study-card glass-card"
                  style={{
                    "--cs-color": studyColor,
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
                    style={{ position: "relative", height: 240, flexShrink: 0, background: `color-mix(in srgb, ${studyColor} 10%, #f9fafb)` }}
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
                          display: "block",
                          padding: "1.5rem"
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: `color-mix(in srgb, ${studyColor} 15%, #f8f8f8)`,
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
                            color: studyColor,
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
                      {study.summary && study.summary.length > 180
                        ? study.summary.slice(0, 180) + "…"
                        : (study.summary || "")}
                    </p>

                    {/* Tech logos */}
                    <div className="tech-icons-row" style={{ marginBottom: "1.2rem" }}>
                      {techList.slice(0, 4).map((t) => {
                        const cleanT = t.replace(/[{}"\[\]]/g, '').trim();
                        const tool = TOOL_LOGOS[cleanT];
                        console.log("Mapping tool:", cleanT, "Found:", !!tool);
                        const finalTool = tool || { img: "react.png.png", color: "#ccc" };
                        return (
                          <div key={cleanT} className="tech-icon-badge" style={{ "--icon-color": finalTool.color }}>
                            {finalTool.text ? (
                              <span style={{ fontSize: "1.3rem", fontWeight: 800 }}>{finalTool.text}</span>
                            ) : finalTool.icon ? (
                              <i className={finalTool.icon} style={{ fontSize: "1.5rem", color: finalTool.color }}></i>
                            ) : (
                              <img 
                                src={`/${finalTool.img}`} 
                                alt={cleanT} 
                                style={{ 
                                  ...(finalTool.h ? { width: "auto", height: finalTool.h } : {}),
                                  ...(finalTool.blend ? { mixBlendMode: finalTool.blend } : {})
                                }} 
                              />
                            )}
                            <span className="tech-icon-tooltip">{cleanT}</span>
                          </div>
                        );
                      })}
                      {techList.length > 4 && (
                        <div className="tech-icon-badge" style={{ "--icon-color": "#9ca3af", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#6b7280" }}>+{techList.length - 4}</span>
                        </div>
                      )}
                    </div>

                    <span className="cs-view-link" style={{ marginTop: "auto" }}>
                      View case study <i className="fa-solid fa-arrow-right" />
                    </span>
                  </div>
                </Link>
              );
            })}
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
