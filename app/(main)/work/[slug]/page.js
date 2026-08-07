import Link from "next/link";
import Image from "next/image";
import { marked } from "marked";
import { TOOL_LOGOS } from "@/lib/case-studies";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const result = await sql`SELECT title, description as problem FROM projects WHERE slug = ${params.slug} LIMIT 1`.catch(() => []);
  const study = result[0];
  if (!study) return {};
  return {
    title: `${study.title} — HashTurn`,
    description: study.problem,
  };
}

export default async function CaseStudyPage({ params }) {
  const result = await sql`SELECT *, service as category, hero_image as image, description as summary, description as problem FROM projects WHERE slug = ${params.slug} LIMIT 1`.catch((e) => {
    console.error('DB query failed', e);
    return [];
  });
  const study = result[0];

  if (!study) notFound();

  // debug: log which slug is being rendered (server-side)
  console.log('Rendering case study server-side for', params.slug);
  console.log('study raw', JSON.stringify(study));
  console.log('study.content length', study.content?.length);
  console.log('study.content includes img1', String(study.content).includes('SharePoint-Assembly_Flow1_CreateModify.png'));
  console.log('study.content raw', study.content);

  const studyColor = "#3B82F6";
  const rawContent = study.content || study.solution || '';
  const solutionHtml = rawContent ? marked.parse(String(rawContent), { mangle: false, headerIds: false }) : "";
  const techList = study.tools ? study.tools.split(',').map(s => s.trim()) : [];
  const resultsList = study.results ? study.results.split('\n').filter(r => r.trim() !== '') : [];

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
          <div className="cd-overview reveal" style={{ "--cs-color": study.color }}>
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
      <section className="page" style={{ paddingTop: "2rem" }}>
        <div className="container">
          <div className="cd-body-grid" style={{ "--cs-color": studyColor }}>
            {/* ── Article ── */}
            <article>
              <h2 className="cd-article-title">Case Study</h2>

              {/* Full Case Study Content */}
              {rawContent && (
                <div className="cd-section">
                  <div className="solution-html" dangerouslySetInnerHTML={{ __html: solutionHtml }} />
                </div>
              )}
            </article>

            {/* ── Sidebar ── */}
            <aside className="cd-sidebar reveal">
              {/* Tech stack box */}
              <div className="cd-sidebar-box glass-card">
                <h4>Tools & Technologies</h4>
                <div className="tech-icons-row" style={{ marginTop: "1rem" }}>
                  {techList.map((t) => {
                    const cleanT = t.replace(/[{}"\[\]]/g, '').trim();
                    const tool = TOOL_LOGOS[cleanT] || { img: "react.png.png", color: "#ccc" };
                    return (
                      <div key={cleanT} className="tech-icon-badge" style={{ "--icon-color": tool.color }}>
                        {tool.text ? (
                          <span style={{ fontSize: "1.3rem", fontWeight: 800 }}>{tool.text}</span>
                        ) : tool.icon ? (
                          <i className={tool.icon} style={{ fontSize: "1.5rem", color: tool.color }}></i>
                        ) : (
                          <img 
                            src={`/${tool.img}`} 
                            alt={cleanT} 
                            style={{ 
                              ...(tool.h ? { width: "auto", height: tool.h } : {}),
                              ...(tool.blend ? { mixBlendMode: tool.blend } : {})
                            }} 
                          />
                        )}
                        <span className="tech-icon-tooltip">{cleanT}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Results box */}
              {resultsList.length > 0 && (
                <div className="cd-sidebar-box glass-card" style={{ "--cs-color": studyColor }}>
                  <h4>Key Results</h4>
                  <ul className="cd-sidebar-results">
                    {resultsList.map((r, i) => (
                      <li key={i}>
                        <i
                          className="fa-solid fa-check"
                          style={{ color: studyColor, marginRight: 8 }}
                        />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA box */}
              <div className="cd-sidebar-cta glass-card">
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
