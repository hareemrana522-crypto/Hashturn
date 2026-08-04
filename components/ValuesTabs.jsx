'use client';

import React from 'react';

export default function ValuesTabs() {
  const values = [
    {
      idx: 1,
      title: "Understand First, Build Second",
      desc: "We never start building until we fully understand your business, your processes, and your goals. The best automation starts with the right strategy.",
      icon: "🔍",
      color: "var(--blue)"
    },
    {
      idx: 2,
      title: "Quality Over Speed",
      desc: "We deliver fast — but never sacrifice quality. Every automation is thoroughly tested before it goes live. We stand behind our work.",
      icon: "✅",
      color: "var(--green)"
    },
    {
      idx: 3,
      title: "Clear Communication",
      desc: "No jargon, no black boxes. You always know exactly what we are building, why, and when it will be ready. No surprises, ever.",
      icon: "💬",
      color: "var(--yellow)"
    },
    {
      idx: 4,
      title: "Real ROI, Real Results",
      desc: "We focus on measurable outcomes — hours saved, errors eliminated, revenue recovered. If it does not move the needle, we do not build it.",
      icon: "📈",
      color: "var(--red)"
    }
  ];

  return (
    <section style={{ padding: 'clamp(50px, 8vw, 120px) 0', backgroundColor: '#ffffff' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ 
            color: 'var(--green)', 
            fontWeight: 700, 
            textTransform: 'uppercase', 
            letterSpacing: '2px', 
            fontSize: '0.9rem',
            fontFamily: "'Plus Jakarta Sans', sans-serif"
          }}>What We Believe</span>
          <h2 style={{ 
            fontSize: 'clamp(1.9rem, 3.6vw, 2.6rem)', 
            fontWeight: 800, 
            color: '#0f1115', 
            marginTop: '10px',
            fontFamily: "'Plus Jakarta Sans', sans-serif"
          }}>Our <span className="gradient-text">Values</span></h2>
        </div>
        
        <div className="values-grid">
      {values.map((v) => (
        <div className="value-card" key={v.idx} style={{ '--card-color': v.color }}>
          <div className="icon-wrapper" style={{ backgroundColor: `color-mix(in srgb, ${v.color} 15%, transparent)` }}>
            <span className="icon">{v.icon}</span>
          </div>
          <h3 className="value-title">{v.title}</h3>
          <p className="value-desc">{v.desc}</p>
        </div>
      ))}

      <style jsx>{`
        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
          gap: 1.2rem;
          width: 100%;
          margin-top: 2rem;
        }

        .value-card {
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 24px;
          padding: 1.5rem;
          text-align: left;
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          position: relative;
          z-index: 1;
          overflow: hidden;
        }

        .value-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(circle at top right, color-mix(in srgb, var(--card-color) 12%, transparent), transparent 60%);
          z-index: -1;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .value-card:hover::before {
          opacity: 1;
        }

        .value-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
          border-color: rgba(0,0,0,0.12);
        }

        .icon-wrapper {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.2rem;
          transition: transform 0.4s ease;
        }

        .value-card:hover .icon-wrapper {
          transform: scale(1.1) rotate(5deg);
        }

        .icon {
          font-size: 1.8rem;
          font-family: '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';
        }

        .value-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.25rem;
          font-weight: 800;
          color: #0f1115;
          margin: 0 0 0.8rem 0;
          line-height: 1.3;
        }

        .value-desc {
          font-family: 'Inter', sans-serif;
          font-size: 1.05rem;
          line-height: 1.6;
          color: #4b5563;
          margin: 0;
          text-align: justify;
          text-justify: inter-word;
        }
      `}</style>
        </div>
      </div>
    </section>
  );
}
