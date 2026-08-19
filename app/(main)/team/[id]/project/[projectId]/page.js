export const revalidate = 60;

import { sql } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProjectById, getUniqueProjectsForMember } from '@/lib/dummyProjects';

export async function generateMetadata({ params }) {
  const { id, projectId } = params;
  let member = null;
  try {
    const results = await sql`SELECT * FROM team_members WHERE id = ${id}`;
    if (results.length > 0) member = results[0];
  } catch (e) {}

  if (member) {
    const projects = getUniqueProjectsForMember(member);
    const project = projects.find(p => p.id === projectId) || getProjectById(projectId);
    if (project) {
      return {
        title: `${project.title} | HashTurn`,
        description: project.summary
      };
    }
  }
  return { title: 'Project Details | HashTurn' };
}

export default async function ProjectDetailPage({ params }) {
  const { id, projectId } = params;
  
  let member = null;
  try {
    const results = await sql`SELECT * FROM team_members WHERE id = ${id}`;
    if (results.length > 0) member = results[0];
  } catch (e) {
    console.error(e);
  }
  
  if (!member) return notFound();

  const projects = getUniqueProjectsForMember(member);
  const project = projects.find(p => p.id === projectId) || getProjectById(projectId);
  
  if (!project) return notFound();
  return (
    <main style={{ padding: 'clamp(100px, 12vw, 140px) 0', background: 'var(--bg)', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        
        <Link href={`/team/${member.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '2rem', fontWeight: 600, fontSize: '0.9rem' }}>
          ← Back to {member.name}'s Profile
        </Link>

        <div style={{ marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '1rem' }}>
            {project.category}
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, color: 'var(--foreground)', lineHeight: 1.2, marginBottom: '1.5rem' }}>
            {project.title}
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--muted)', lineHeight: 1.6 }}>
            {project.summary}
          </p>
        </div>

        <div style={{ width: '100%', height: 'clamp(300px, 40vw, 500px)', borderRadius: '24px', overflow: 'hidden', marginBottom: '4rem', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
          <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem' }}>
          <div style={{ fontSize: '1.1rem', color: 'var(--muted)', lineHeight: 1.8 }}>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--foreground)', marginBottom: '1.5rem' }}>Project Overview</h2>
            <p style={{ marginBottom: '1.5rem' }}>{project.description}</p>
            <p>
              As a key expert on this initiative, <strong>{member.name}</strong> played a crucial role in bringing this automation to life. 
              Their specialized skills in {member.role} ensured the system was delivered on time and exceeded client expectations.
            </p>
          </div>
          
          <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '16px', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--foreground)', marginBottom: '1.5rem' }}>Team Contribution</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              {member.image ? (
                <img src={member.image} alt={member.name} style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--theme-color, var(--green))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '1.5rem' }}>
                  {member.name.charAt(0)}
                </div>
              )}
              <div>
                <strong style={{ display: 'block', fontSize: '1.1rem', color: 'var(--foreground)', marginBottom: '0.2rem' }}>{member.name}</strong>
                <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{member.role}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
