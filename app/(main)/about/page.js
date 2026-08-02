import Link from 'next/link';
import ValuesTabs from '@/components/ValuesTabs';
import ScrollReveal from '@/components/ScrollReveal';
import ToolsMarquee from '@/components/ToolsMarquee';
import { sql } from '@/lib/db';

export const metadata = {
  title: 'About Us | HashTurn',
  description: 'Learn about HashTurn, our mission, values, and the team behind our automation solutions.',
};

export default async function AboutPage() {
  const teamMembers = await sql`SELECT id, name, role, bio, avatar, avatar_color, image, linkedin FROM team_members ORDER BY display_order ASC`.catch(() => []);
  return (
    <>
      <ScrollReveal />
      {/* =========================================
           HERO SECTION
      ========================================= */}
      <section className="page" id="about-hero" style={{ paddingTop: 180, paddingBottom: 80 }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="hero-content reveal" style={{ maxWidth: 1200, margin: "0 auto", width: "100%", textAlign: "center" }}>
            <p className="eyebrow" style={{ color: "var(--green)", fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "1px", fontWeight: "700", textTransform: "uppercase", marginBottom: "15px" }}>About Us</p>
            <h1 className="hero-title" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: "800", marginBottom: 20, fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.2, color: "var(--foreground)" }}>
              We Are HashTurn.<br />
              <span className="text-multicolor">We Build Automation That Works.</span>
            </h1>
            <p className="hero-sub reveal" style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.1rem", lineHeight: 1.7, color: "var(--muted)", maxWidth: "700px", margin: "0 auto 35px" }}>
              We believe technology should work for you, not the other way around. Our mission is to eliminate repetitive tasks so your team can focus on what actually matters.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
           OUR MISSION
      ========================================= */}
      <section style={{ padding: "120px 0" }}>
        <div className="container">
          <div className="mission-layout">

            <div className="mission-text">
              <span className="eyebrow">Our Mission</span>
              <h2 className="section-title">Every Hour Saved Is <span className="gradient-text">an Hour Earned</span></h2>
              <p className="section-body">HashTurn was built on a simple idea: businesses waste enormous amounts of time on repetitive tasks that technology can handle better. Manual data entry, copy-pasting between apps, generating the same reports every week, sending the same emails — none of this should require a human.</p>
              <p className="section-body">We started on Fiverr, delivering hundreds of automation projects for businesses around the world. We earned a 5-star reputation by doing one thing consistently: building automation that actually works, on time, and exactly as promised.</p>
              <p className="section-body">Today, HashTurn is a full-service automation company. We work with businesses across every industry — retail, finance, healthcare, logistics, and more — helping them save hundreds of hours every month.</p>
            </div>

            <div className="mission-collage">
              <div className="mission-blob blob-1"></div>
              <div className="mission-blob blob-2"></div>

              <div className="mission-stat-card mc-1">
                <h3>200+</h3>
                <p>Projects Delivered</p>
              </div>

              <div className="mission-stat-card mc-2">
                <h3>50+</h3>
                <p>Clients Served</p>
              </div>

              <div className="mission-stat-card mc-3">
                <h3>5★</h3>
                <p>Fiverr Rating</p>
              </div>

              <div className="mission-stat-card mc-4">
                <h3>5,000+</h3>
                <p>Hours Saved</p>
              </div>

              <div className="mission-global-banner">
                <svg className="mission-global-icon" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M2 12h20M12 2c2.5 2.7 4 6.2 4 10s-1.5 7.3-4 10c-2.5-2.7-4-6.2-4-10s1.5-7.3 4-10z"/>
                </svg>
                <h3>Global</h3>
                <p>Clients across USA, UK, Europe, Middle East &amp; Asia</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================
           VALUES
      ========================================= */}
      <ValuesTabs />

      {/* =========================================
           OUR PEOPLE
      ========================================= */}
      <section style={{ padding: "120px 0", background: "rgba(255, 255, 255, 0.015)" }}>
        <div className="container">
          <div className="section-header reveal" style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p className="eyebrow" style={{ color: "var(--green)" }}>OUR PEOPLE</p>
            <h2 className="section-title">Meet the Team</h2>
            <p className="section-subtitle-text tight-subtitle" style={{ margin: "20px auto 0" }}>
              The specialists who design, build, and support your automation.
            </p>
          </div>

          <div className="about-team-grid">
            {teamMembers.map((member) => (
              <div key={member.id} className="team-card reveal" style={{ "--theme-color": member.avatar_color || "var(--green)" }}>
                <div className="team-image-wrapper">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="team-image" />
                  ) : (
                    <div className="team-image-placeholder" style={{ background: member.avatar_color || "var(--green)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "2.5rem", fontWeight: "bold" }}>
                      {member.avatar || member.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div className="team-image-glow"></div>
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                  {member.linkedin && (
                    <div className="team-socials">
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        LinkedIn
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* =========================================
           EXPERTISE
      ========================================= */}
      <section style={{ padding: "120px 0", overflow: "hidden" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <div className="section-header reveal" style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={{ color: 'var(--green)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Our Expertise</span>
            <h2 className="section-title" style={{ marginTop: '10px' }}>Tools We <span className="gradient-text">Master</span></h2>
            <p className="section-subtitle-text tight-subtitle" style={{ margin: "10px auto 0", fontSize: "1.15rem" }}>
              We are certified in the world's leading automation and development platforms.
            </p>
          </div>
        </div>
        
        {/* Full width marquee outside container */}
        <div style={{ width: '100%' }}>
          <ToolsMarquee />
        </div>
      </section>

      {/* =========================================
           CTA SECTION (WORK WITH US)
      ========================================= */}
      <section style={{ padding: "120px 0", textAlign: "center", position: "relative" }}>
        <div className="container" style={{ maxWidth: "800px", margin: "0 auto", padding: "0 20px" }}>
          <div className="section-header reveal">
            <span className="eyebrow" style={{ color: 'var(--green)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Work With Us</span>
            <h2 className="section-title" style={{ marginTop: '10px' }}>
              Ready to See What Automation<br/>
              <span className="gradient-text">Can Do for Your Business?</span>
            </h2>
            <p className="section-subtitle-text tight-subtitle" style={{ margin: "20px auto 40px auto", maxWidth: "600px", fontSize: "1.1rem" }}>
              Book a free strategy call. No commitment, no pressure — just an honest conversation about your business and how we can help.
            </p>
            <a href="/contact" className="button1" style={{ fontSize: "1.1rem", padding: "16px 36px", display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
              Book Free Strategy Call <span>&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        .eyebrow {
          display: block;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: .78rem;
          font-weight: 700;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: var(--blue);
          margin-bottom: .9rem;
        }

        .cta-book-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(0, 177, 64, 0.4) !important;
        }

        .section-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(1.9rem, 3.6vw, 2.6rem);
          font-weight: 800;
          line-height: 1.2;
          margin: 0 0 1.4rem;
        }

        .gradient-text {
          background: linear-gradient(90deg, var(--red), var(--yellow), var(--green), var(--blue));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .section-body {
          font-family: 'Inter', sans-serif;
          font-size: .98rem;
          line-height: 1.75;
          color: var(--muted);
          margin: 0 0 1.2rem;
        }

        .mission-layout {
          display: grid;
          grid-template-columns: 1.05fr .95fr;
          gap: 4rem;
          align-items: center;
        }

        .mission-title-nowrap {
          white-space: nowrap;
        }
      
        .mission-collage {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.3rem;
          padding: 10px;
        }
      
        .mission-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          opacity: .28;
          z-index: 0;
        }
        .blob-1 { width: 200px; height: 200px; background: var(--blue); top: -30px; right: 10px; }
        .blob-2 { width: 180px; height: 180px; background: var(--yellow); bottom: 100px; left: -20px; }
      
        .mission-stat-card {
          position: relative;
          z-index: 2;
          background: rgba(255,255,255,.65);
          backdrop-filter: blur(16px) saturate(1.4);
          -webkit-backdrop-filter: blur(16px) saturate(1.4);
          border: 1px solid rgba(255,255,255,.85);
          border-radius: 20px;
          padding: 1.8rem 1.5rem;
          box-shadow: 0 16px 36px rgba(15,17,21,.08);
          transition: transform .4s cubic-bezier(.25,.8,.25,1), box-shadow .4s cubic-bezier(.25,.8,.25,1);
        }
        .mission-stat-card:hover {
          transform: translateY(-8px) rotate(0deg) scale(1.03);
          box-shadow: 0 22px 48px rgba(15,17,21,.14);
        }
        .mc-1 { transform: rotate(-3deg); }
        .mc-2 { transform: rotate(2deg); }
        .mc-3 { transform: rotate(2deg); }
        .mc-4 { transform: rotate(-2deg); }
      
        .mission-stat-card h3 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 2rem;
          font-weight: 800;
          margin: 0 0 .3rem;
        }
        .mc-1 h3 { color: var(--blue); }
        .mc-2 h3 { color: var(--red); }
        .mc-3 h3 { color: #FFD600; }
        .mc-4 h3 { color: var(--green); }
      
        .mission-stat-card p {
          font-family: 'Inter', sans-serif;
          font-size: .84rem;
          color: #4b5563;
          margin: 0;
        }
      
        .mission-global-banner {
          grid-column: 1 / -1;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, var(--blue), var(--green));
          border-radius: 20px;
          padding: 2rem 2.2rem;
          z-index: 2;
          box-shadow: 0 16px 36px rgba(0, 71, 255, 0.25);
        }
        .mission-global-icon {
          position: absolute;
          right: 10px;
          bottom: -20px;
          font-size: 6rem;
          color: var(--white);
          opacity: .16;
          transform: rotate(-8deg);
        }
        .mission-global-banner h3 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--white);
          margin: 0 0 .4rem;
          position: relative;
          z-index: 1;
        }
        .mission-global-banner p {
          font-family: 'Inter', sans-serif;
          font-size: .9rem;
          color: rgba(255,255,255,.9);
          margin: 0;
          position: relative;
          z-index: 1;
        }
      
        /* Team Card Styles */
        .team-card {
          position: relative;
          background: #ffffff;
          border: 1px solid #f0f0f0;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
          border-radius: 24px;
          padding: 45px 25px 40px 25px;
          text-align: center;
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          min-height: 480px;
        }

        .team-card:hover {
          transform: translateY(-8px);
          border-color: var(--theme-color);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
          background: #ffffff;
        }

        .team-image-wrapper {
          position: relative;
          width: 145px;
          height: 145px;
          margin: 0 auto 24px;
        }

        .team-image, .team-image-placeholder {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          position: relative;
          z-index: 2;
          border: 2px solid rgba(255, 255, 255, 0.08);
          transition: all 0.4s ease;
          background: var(--border);
        }

        .team-card:hover .team-image, .team-card:hover .team-image-placeholder {
          border-color: var(--theme-color);
          transform: scale(1.05);
        }

        .team-image-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          background: var(--theme-color);
          border-radius: 50%;
          filter: blur(18px);
          opacity: 0;
          z-index: 1;
          transition: opacity 0.4s ease;
        }

        .team-card:hover .team-image-glow {
          opacity: 0.35;
        }

        .team-info {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          width: 100%;
        }

        .team-info h3 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--foreground);
          margin: 0 0 6px;
        }

        .team-role {
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          color: var(--theme-color);
          margin: 0 0 12px;
        }

        .team-bio {
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          line-height: 1.5;
          color: var(--muted);
          margin: 0 0 20px;
          text-align: justify;
          text-justify: inter-word;
          hyphens: auto;
          -webkit-hyphens: auto;
        }

        .team-socials {
          margin-top: auto;
          display: flex;
          justify-content: center;
        }

        .social-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          border-radius: 50px;
          color: #0077b5;
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          background: #0077b5;
          border-color: #0077b5;
          color: #ffffff;
          transform: translateY(-2px);
        }

        @media (max-width: 900px) {
          .mission-layout { grid-template-columns: 1fr; gap: 2.5rem; }
          .mc-1, .mc-2, .mc-3, .mc-4 { transform: none; margin: 0; }
          .mission-title-nowrap { white-space: normal; }
        }

        @media (max-width: 480px) {
          .mission-collage { grid-template-columns: 1fr; gap: 1rem; }
        }

        .about-team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          width: 100%;
          margin: 0 auto;
        }

        @media (max-width: 1024px) {
          .about-team-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .about-team-grid { grid-template-columns: 1fr; }
        }
      `}} />
    </>
  );
}
