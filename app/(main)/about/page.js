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
  // Temporarily update image on load to bypass local connection limits
  await sql`UPDATE team_members SET image = '/hassan.jpg' WHERE name = 'M Hassaan Sikandar'`.catch(() => {});
  const teamMembers = await sql`SELECT id, name, role, bio, avatar, avatar_color, image, linkedin FROM team_members ORDER BY display_order ASC`.catch(() => []);
  return (
    <>
      <ScrollReveal />
      {/* =========================================
           HERO SECTION
      ========================================= */}
      <section className="page" id="about-hero" style={{ paddingTop: "clamp(120px, 14vw, 180px)", paddingBottom: "clamp(40px, 6vw, 80px)", background: "var(--bg)" }}>
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
      <section style={{ padding: "clamp(50px, 8vw, 120px) 0", background: "var(--off)" }}>
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
      <section style={{ padding: "clamp(50px, 8vw, 120px) 0", background: "var(--bg)" }}>
        <div className="container">
          <div className="section-header reveal" style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p className="eyebrow" style={{ color: "var(--green)" }}>OUR PEOPLE</p>
            <h2 className="section-title">Meet the Team</h2>
            <p className="section-subtitle-text tight-subtitle" style={{ margin: "20px auto 0" }}>
              The specialists who design, build, and support your automation.
            </p>
          </div>

          <div className="about-team-grid">
            {teamMembers.map((member, idx) => {
              const BRAND = ["var(--blue)", "var(--green)", "var(--yellow)", "var(--red)"];
              const cardColor = BRAND[idx % BRAND.length];
              const initials = member.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
              return (
                <div key={member.id} className="team-card reveal" style={{ "--theme-color": cardColor }}>
                  <div className="tc-photo">
                    {member.image ? (
                      <img src={member.image} alt={member.name} />
                    ) : (
                      <div className="tc-initials" style={{ background: cardColor }}>{initials}</div>
                    )}
                  </div>
                  <div className="tc-body">
                    <h3 className="tc-name">{member.name}</h3>
                    <p className="tc-role">{member.role}</p>
                    <div className="tc-socials">
                      {member.linkedin ? (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="tc-icon-btn tc-linkedin" title="LinkedIn">
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                      ) : (
                        <a href="#" className="tc-icon-btn tc-linkedin" title="LinkedIn">
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                      )}
                      <a href="#" className="tc-icon-btn tc-facebook" title="Facebook">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                          <path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6c0-.88.39-1 1-1h2V2h-3c-2.42 0-4 1.35-4 4v2z"/>
                        </svg>
                      </a>
                      <a href="#" className="tc-icon-btn tc-instagram" title="Instagram">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                        </svg>
                      </a>
                      <a href="#" className="tc-icon-btn tc-github" title="GitHub">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Equalize all team card heights to the tallest card */}
      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          function equalizeCards() {
            var cards = document.querySelectorAll('.team-card');
            if (!cards.length) return;
            // Reset heights first
            cards.forEach(function(c) { c.style.height = 'auto'; });
            // Find max height
            var max = 0;
            cards.forEach(function(c) {
              var h = c.getBoundingClientRect().height;
              if (h > max) max = h;
            });
            // Apply to all
            cards.forEach(function(c) { c.style.height = max + 'px'; });
          }
          // Run after images load
          if (document.readyState === 'complete') {
            equalizeCards();
          } else {
            window.addEventListener('load', equalizeCards);
          }
          // Also re-run on resize
          window.addEventListener('resize', function() {
            var cards = document.querySelectorAll('.team-card');
            cards.forEach(function(c) { c.style.height = 'auto'; });
            setTimeout(equalizeCards, 50);
          });
        })();
      ` }} />
      
      {/* =========================================
           EXPERTISE
      ========================================= */}
      <section style={{ padding: "clamp(50px, 8vw, 120px) 0", overflow: "hidden", background: "var(--off)" }}>
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
      <section style={{ padding: "clamp(50px, 8vw, 120px) 0", textAlign: "center", position: "relative", background: "var(--bg)" }}>
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
      
        /* Team Grid & Card Styles */
        .about-team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          max-width: 900px;
          margin: 0 auto;
        }

        .team-card {
          background: #ffffff;
          border: 1px solid #ebebeb;
          border-radius: 12px;
          padding: 16px;
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .team-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.08);
          border-color: var(--theme-color);
        }

        .tc-photo {
          width: 100%;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          border-radius: 8px;
          background: #f4f4f5;
        }

        .tc-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .team-card:hover .tc-photo img {
          transform: scale(1.05);
        }

        .tc-initials {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.2rem;
          font-weight: 800;
          color: #fff;
          font-family: 'Plus Jakarta Sans', sans-serif;
          border-radius: 8px;
        }

        .tc-body {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          gap: 4px;
        }

        .tc-name {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text);
          margin: 0;
        }

        .tc-role {
          font-family: 'Inter', sans-serif;
          font-size: 0.76rem;
          color: var(--muted);
          margin: 0;
          font-weight: 500;
        }

        .tc-socials {
          display: flex;
          gap: 10px;
          margin-top: 6px;
          justify-content: center;
        }

        .tc-icon-btn {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #f4f4f5;
          border: 1px solid #e4e4e7;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #555;
          text-decoration: none;
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }

        .tc-icon-btn:hover {
          color: #fff;
          transform: translateY(-2px);
        }

        .tc-linkedin:hover {
          background: #0a66c2;
          border-color: #0a66c2;
        }

        .tc-facebook:hover {
          background: #1877f2;
          border-color: #1877f2;
        }

        .tc-instagram:hover {
          background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
          border-color: #d62976;
        }

        .tc-github:hover {
          background: #24292f;
          border-color: #24292f;
        }

        @media (max-width: 900px) {
          .mission-layout { grid-template-columns: 1fr; gap: 2.5rem; }
          .mc-1, .mc-2, .mc-3, .mc-4 { transform: none; margin: 0; }
          .mission-title-nowrap { white-space: normal; }
          .about-team-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 560px) {
          .about-team-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 480px) {
          .mission-collage { grid-template-columns: 1fr; gap: 1rem; }
        }

        .about-team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          max-width: 1080px;
          margin: 0 auto;
        }

        @media (max-width: 900px) {
          .about-team-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 560px) {
          .about-team-grid { grid-template-columns: 1fr; }
        }
      `}} />
    </>
  );
}
