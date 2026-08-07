import { sql } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { getUniqueProjectsForMember } from '@/lib/dummyProjects';

export async function generateMetadata({ params }) {
  const { id } = params;
  try {
    const results = await sql`SELECT name, role FROM team_members WHERE id = ${id}`;
    if (results.length > 0) {
      return {
        title: `${results[0].name} - ${results[0].role} | HashTurn`,
        description: `Profile and projects for ${results[0].name}, ${results[0].role} at HashTurn.`
      };
    }
  } catch (e) {}
  return { title: 'Team Member | HashTurn' };
}

export default async function TeamMemberPage({ params }) {
  const { id } = params;
  
  let member = null;
  try {
    const results = await sql`SELECT * FROM team_members WHERE id = ${id}`;
    if (results.length > 0) {
      member = results[0];
    }
  } catch (error) {
    console.error('Failed to fetch team member', error);
  }

  if (!member) {
    return notFound();
  }

  const initials = member.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  const themeColor = member.avatar_color || 'var(--green)';

  const memberProjects = getUniqueProjectsForMember(member, 3);

  return (
    <>
      <ScrollReveal />
      
      {/* =========================================
           HERO SECTION
      ========================================= */}
      <section style={{ paddingTop: 'clamp(120px, 14vw, 160px)', paddingBottom: '80px', background: 'var(--bg)' }}>
        <div className="container">
          <Link href="/about#team" className="reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '2rem', fontWeight: 600, fontSize: '0.9rem' }}>
            ← Back to Team
          </Link>
          
          <div className="member-hero-grid">
            <div className="member-hero-image reveal">
              <div className="image-wrapper" style={{ '--theme': themeColor }}>
                {member.image ? (
                  <img src={member.image} alt={member.name} />
                ) : (
                  <div className="initials-avatar">{initials}</div>
                )}
              </div>
            </div>
            
            <div className="member-hero-content reveal" style={{ transitionDelay: '0.1s' }}>
              <p className="eyebrow" style={{ color: themeColor }}>{member.role}</p>
              <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>{member.name}</h1>
              
              <div className="member-bio" style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'var(--muted)', marginBottom: '2.5rem' }}>
                {member.bio ? (
                  <p>{member.bio}</p>
                ) : (
                  <p>{member.name} is a key part of the HashTurn team, bringing expertise in {member.role.toLowerCase()} and automation to deliver exceptional results for our clients globally.</p>
                )}
              </div>
              
              <div className="member-socials">
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="social-pill" style={{ '--hover-color': '#0A66C2' }}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    <span>LinkedIn Profile</span>
                  </a>
                )}
                <a href="#" className="social-pill" style={{ '--hover-color': '#1877F2' }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6c0-.88.39-1 1-1h2V2h-3c-2.42 0-4 1.35-4 4v2z"/></svg>
                  <span>Facebook Profile</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
           DUMMY PROJECTS SECTION
      ========================================= */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--off)' }}>
        <div className="container">
          <div className="section-header reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p className="eyebrow" style={{ color: 'var(--blue)' }}>PORTFOLIO</p>
            <h2 className="section-title">Recent <span className="gradient-text">Projects</span></h2>
            <p className="section-subtitle-text tight-subtitle" style={{ margin: '15px auto 0', maxWidth: '600px' }}>
              Explore the automation solutions {member.name.split(' ')[0]} has contributed to.
            </p>
          </div>

          <div className="dummy-projects-grid">
            {memberProjects.map((proj, idx) => (
              <Link href={`/team/${member.id}/project/${proj.id}`} key={proj.id} className="dummy-project-card reveal" style={{ textDecoration: 'none' }}>
                <div className="dp-image-wrap">
                  <img src={proj.image} alt={proj.title} className="dp-image" />
                </div>
                <div className="dp-content">
                  <span className="dp-category">{proj.category}</span>
                  <h3 className="dp-title">{proj.title}</h3>
                  <p className="dp-summary">{proj.summary}</p>
                  <span className="dp-link">View Details <i className="fa-solid fa-arrow-right" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .member-hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }
        @media(min-width: 900px) {
          .member-hero-grid {
            grid-template-columns: 0.8fr 1.2fr;
            gap: 5rem;
          }
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1.1;
          border-radius: 20px;
          overflow: hidden;
          background: var(--theme);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        
        .image-wrapper::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.1);
          pointer-events: none;
        }

        .image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        
        .initials-avatar {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 5rem;
          font-weight: 800;
          color: rgba(255,255,255,0.9);
        }

        .member-socials {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .social-pill {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 14px 28px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 100px;
          color: var(--foreground);
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          letter-spacing: 0.5px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          backdrop-filter: blur(10px);
        }

        .social-pill::before {
          content: "";
          position: absolute;
          inset: 0;
          background: var(--hover-color);
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: -1;
        }

        .social-pill:hover {
          color: #fff;
          border-color: transparent;
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 15px 30px rgba(0,0,0,0.2), 0 0 20px var(--hover-color);
        }

        .social-pill:hover::before {
          opacity: 1;
        }

        .social-pill svg {
          transition: transform 0.4s ease;
        }
        
        .social-pill:hover svg {
          transform: scale(1.15) rotate(-5deg);
        }

        /* Dummy Projects Stacked Layout */
        .dummy-projects-grid {
          display: flex;
          flex-direction: column;
          gap: 4rem;
        }

        .dummy-project-card.reveal {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s cubic-bezier(0.25, 1, 0.5, 1);
        }
        
        @media(min-width: 900px) {
          .dummy-project-card.reveal {
            transform: translateX(-50px);
          }
          .dummy-project-card:nth-child(even).reveal {
            transform: translateX(50px);
          }
        }
        
        .dummy-project-card.reveal.visible {
          opacity: 1;
          transform: translate(0, 0);
        }

        .dummy-project-card {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          overflow: hidden;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }
        
        .dummy-project-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--glass-shadow);
          border-color: rgba(255,255,255,0.2);
        }

        .dp-image-wrap {
          width: 100%;
          height: 250px;
          background: #f8f8f8;
          overflow: hidden;
          position: relative;
        }

        @media(min-width: 900px) {
          .dummy-project-card {
            flex-direction: row;
            height: 350px;
          }
          .dummy-project-card:nth-child(even) {
            flex-direction: row-reverse;
          }
          .dp-image-wrap {
            width: 45%;
            height: 100%;
          }
        }

        .dp-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .dummy-project-card:hover .dp-image {
          transform: scale(1.05);
        }

        .dp-content {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex-grow: 1;
        }

        .dp-category {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--blue);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.8rem;
        }

        .dp-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--foreground);
          margin-bottom: 0.8rem;
          line-height: 1.3;
        }

        .dp-summary {
          font-size: 0.9rem;
          color: var(--muted);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .dp-link {
          margin-top: auto;
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--foreground);
          display: flex;
          align-items: center;
          gap: 8px;
          transition: color 0.3s ease;
        }
        
        .dummy-project-card:hover .dp-link {
          color: var(--blue);
        }
      `}} />
    </>
  );
}
