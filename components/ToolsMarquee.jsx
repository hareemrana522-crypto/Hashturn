'use client';
import React from 'react';
import Image from 'next/image';

const ROW_1 = [
  { label: "SharePoint", img: "share.png.png", h: 30, color: "#1c667b" },
  { label: "Power Automate", img: "automate.png.png", h: 32, color: "#7ec9f7" },
  { label: "Power Apps", img: "Powerapps.png.png", h: 30, color: "#742774" },
  { label: "MS Teams", img: "msteam.png.png", h: 30, color: "#464eb8" },
  { label: "Microsoft 365", img: "365.png.png", h: 32, color: "#804f9d" },
  { label: "Microsoft Azure", img: "azure.png.png", h: 30, color: "#0089d6" },
  { label: "AWS", img: "aws.png.png", h: 25, color: "#ff9900" },
];

const ROW_2 = [
  { label: "MS Excel", img: "excel.png.png", h: 25, color: "#107c41" },
  { label: "MS Word", img: "word.png.png", h: 25, color: "#185abd" },
  { label: "PowerPoint", img: "power.png.png", h: 25, color: "#b7472a" },
  { label: "MS Outlook", img: "out.png.png", h: 25, color: "#0078d4" },
  { label: "OneDrive", img: "drive.png.png", h: 25, color: "#0060b6" },
  { label: "React.js", img: "react.png.png", h: 30, color: "#61dafb" },
  { label: "Angular", img: "ang.png.png", h: 32, color: "#dd0031" },
];


export default function ToolsMarquee() {
  return (
    <div className="tools-marquee-container">
      {/* ROW 1 */}
      <div className="marquee-row row-1">
        <div className="marquee-track">
          {Array(6).fill(ROW_1).flat().map((t, i) => (
            <div className="tool-badge" key={`r1-${i}`} style={{ "--ic": t.color }}>
              <Image src={`/${t.img}`} alt={t.label} height={t.h} width={t.h * 1.5} style={{ objectFit: 'contain', width: 'auto' }} />
              <span className="tool-tooltip">{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ROW 2 */}
      <div className="marquee-row row-2">
        <div className="marquee-track">
          {Array(6).fill(ROW_2).flat().map((t, i) => (
            <div className="tool-badge" key={`r2-${i}`} style={{ "--ic": t.color }}>
              <Image src={`/${t.img}`} alt={t.label} height={t.h} width={t.h * 1.5} style={{ objectFit: 'contain', width: 'auto' }} />
              <span className="tool-tooltip">{t.label}</span>
            </div>
          ))}
        </div>
      </div>


      <style jsx>{`
        .tools-marquee-container {
          width: 100%;
          display: flex;
          flex-direction: column;
        }

        .marquee-row {
          position: relative;
          width: 100%;
          overflow: visible;
          padding: 50px 0; /* Huge padding so the mask doesn't clip the tooltips popping up */
          margin-bottom: -40px; /* Pull the next row up to keep them close together */
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
        }

        .marquee-track {
          display: flex;
          gap: 70px;
          padding-right: 70px; /* Crucial for a flawless seamless loop */
          width: max-content;
          animation: scrollLR linear infinite;
        }

        
        /* Dashed connecting line exactly like the OrbitWheel rings */
        .marquee-track::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          border-top: 1px dashed rgba(0, 0, 0, 0.2);
          z-index: -1;
          transform: translateY(-50%);
        }
        
        .row-1 .marquee-track { animation-duration: 32s; }
        .row-2 .marquee-track { animation-duration: 40s; animation-direction: reverse; }
        .row-3 .marquee-track { animation-duration: 26s; }

        @keyframes scrollLR {
          from { transform: translateX(0%); }
          to   { transform: translateX(calc(-100% / 6)); }
        }

        .tool-badge {
          position: relative;
          width: 64px;
          height: 64px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 50%;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
          cursor: pointer;
          transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                      box-shadow 0.25s ease,
                      background-color 0.25s ease,
                      border-color 0.25s ease;
        }

        .tool-badge:hover,
        .tool-badge:active {
          transform: scale(1.22);
          background: #ffffff;
          box-shadow: 0 0 20px var(--ic), 0 4px 15px rgba(0,0,0,0.08);
          border-color: var(--ic);
          z-index: 10;
        }

        .tool-tooltip {
          position: absolute;
          top: -38px;
          left: 50%;
          transform: translateX(-50%) translateY(5px) scale(0.85);
          background: var(--text);
          color: var(--white);
          font-size: 0.75rem;
          padding: 5px 11px;
          border-radius: 6px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease, transform 0.2s ease;
          white-space: nowrap;
          font-weight: 500;
          font-family: 'Plus Jakarta Sans', sans-serif;
          z-index: 30;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }
        
        .tool-tooltip::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%);
          border-width: 4px 4px 0;
          border-style: solid;
          border-color: var(--text) transparent;
          display: block;
          width: 0;
        }
        
        .tool-badge:hover .tool-tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(0) scale(1);
        }

        .marquee-row:hover .marquee-track { 
          animation-play-state: paused; 
        }

        @media (max-width: 768px) {
          .tool-badge {
            width: 56px;
            height: 56px;
          }
        }
      `}</style>
    </div>
  );
}
