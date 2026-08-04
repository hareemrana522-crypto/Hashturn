'use client';
import React from 'react';

const COLORS = [
  "var(--blue)", "var(--yellow)", "var(--red)",
  "var(--green)", "var(--blue)", "var(--yellow)",
];

const FALLBACK_REVIEWS = [
  { client_name: "James R.", company: "via Fiverr", rating: 5, text: "Exceptional work! The automation saved us 20+ hours a week. Highly recommend HashTurn to any business looking to scale." },
  { client_name: "Sofia M.", company: "via Fiverr", rating: 5, text: "Absolutely brilliant team. They connected our CRM to our invoicing system flawlessly and delivered ahead of schedule." },
  { client_name: "David K.", company: "via Fiverr", rating: 5, text: "Our Power Automate flows have never worked better. Professional, clear communication and outstanding quality." },
  { client_name: "Amara L.", company: "via Fiverr", rating: 5, text: "Within 48 hours we had a fully working SharePoint solution. Incredible speed and quality. 5 stars without hesitation." },
  { client_name: "Tom W.", company: "via Fiverr", rating: 5, text: "The RPA bot handles our daily reports perfectly. Zero errors and always on time. Best investment we've made." },
  { client_name: "Priya S.", company: "via Fiverr", rating: 5, text: "They understood our complex workflow immediately and delivered exactly what we needed. Will hire again for sure." },
];

/* Exact same card markup as the original homepage review cards */
function ReviewCard({ r, colorIdx }) {
  const reviewColor = COLORS[colorIdx % COLORS.length];
  const initial = r.client_name ? r.client_name.charAt(0).toUpperCase() : "A";
  return (
    <div
      className="review-card glass-card"
      style={{ "--rv-color": reviewColor, width: "320px", flexShrink: 0 }}
    >
      <i className="fa-solid fa-quote-left review-quote-icon"></i>
      <div className="review-stars">
        {Array.from({ length: r.rating || 5 }).map((_, i) => (
          <i className="fa-solid fa-star" key={i}></i>
        ))}
      </div>
      <p className="review-text">{r.text}</p>
      <div className="review-footer">
        <div className="review-avatar">{initial}</div>
        <div className="review-meta">
          <h4>{r.client_name}</h4>
          <span>
            {r.company ? r.company : (r.source === "Fiverr" ? "via Fiverr" : "")}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ReviewsMarquee({ reviews = [] }) {
  const items = reviews.length >= 2 ? reviews : FALLBACK_REVIEWS;

  /* Split into two rows */
  const half = Math.ceil(items.length / 2);
  const row1 = items.slice(0, half);
  const row2 = items.slice(half).length ? items.slice(half) : items.slice(0, half);

  /* Duplicate for seamless infinite loop */
  const r1 = [...row1, ...row1, ...row1, ...row1];
  const r2 = [...row2, ...row2, ...row2, ...row2];

  return (
    <div className="rm-wrapper">
      {/* ROW 1 — scrolls LEFT */}
      <div className="rm-row">
        <div className="rm-track rm-left">
          {r1.map((r, i) => (
            <ReviewCard r={r} colorIdx={i} key={`r1-${i}`} />
          ))}
        </div>
      </div>

      {/* ROW 2 — scrolls RIGHT */}
      <div className="rm-row">
        <div className="rm-track rm-right">
          {r2.map((r, i) => (
            <ReviewCard r={r} colorIdx={i + 3} key={`r2-${i}`} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .rm-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .rm-row {
          width: 100%;
          overflow: hidden;
        }

        .rm-track {
          display: flex;
          gap: 1.75rem;
          width: max-content;
        }

        .rm-left {
          animation: rmLeft 40s linear infinite;
        }
        .rm-right {
          animation: rmRight 45s linear infinite;
        }

        .rm-row:hover .rm-track {
          animation-play-state: paused;
        }

        @keyframes rmLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes rmRight {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
