"use client";

import { useEffect, useRef, useState } from "react";

const COLS = 20;
const HOURS = [
  "8am",
  "9am",
  "10am",
  "11am",
  "12pm",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
];

const beforeTasks = [
  { cat: "Data entry", name: "Manual CRM updates", start: 0, dur: 5, color: "#e24b4a", tc: "#fff", pain: "Hours lost", tip: "Your team types the same data into 3 systems every morning. Records drift, errors creep in." },
  { cat: "Data entry", name: "Copy-pasting between apps", start: 3, dur: 6, color: "#f09595", tc: "#501313", pain: "Error-prone", tip: "Spreadsheets, email, CRM, invoicing — manual copy-paste everywhere. One wrong cell costs a client." },
  { cat: "Lead management", name: "Chasing missed follow-ups", start: 7, dur: 5, color: "#e24b4a", tc: "#fff", pain: "Lost revenue", tip: "Leads go cold while your team digs through inboxes to remember who needs a follow-up." },
  { cat: "Lead management", name: "Manually logging calls", start: 5, dur: 4, color: "#888780", tc: "#fff", pain: "Robot work", tip: "Every call logged by hand — time that should be spent on the next call." },
  { cat: "Finance", name: "Re-entering invoice data", start: 9, dur: 5, color: "#f09595", tc: "#501313", pain: "Error-prone", tip: "Invoice details copied from email into accounting. One typo = dispute and delayed payment." },
  { cat: "Finance", name: "Chasing payment errors", start: 13, dur: 4, color: "#e24b4a", tc: "#fff", pain: "Money wasted", tip: "Time spent reconciling mistakes that should never have happened." },
  { cat: "Reporting", name: "Building reports by hand", start: 10, dur: 6, color: "#888780", tc: "#fff", pain: "Robot work", tip: "Hours pulling numbers from 5 tools into one spreadsheet — every single week." },
  { cat: "Reporting", name: "Fixing reporting errors", start: 15, dur: 3, color: "#f09595", tc: "#501313", pain: "Error-prone", tip: "Wrong data means wrong decisions. Someone has to find and fix errors manually." },
];

const afterTasks = [
  { cat: "Data flow", name: "Auto-sync across all apps", start: 0, dur: 5, color: "#1d9e75", tc: "#fff", pain: "Automated", tip: "Data enters once and instantly appears everywhere — CRM, invoicing, reporting. Zero manual entry." },
  { cat: "Lead management", name: "Instant lead follow-up", start: 2, dur: 5, color: "#5dcaa5", tc: "#fff", pain: "Bot-handled", tip: "Every new lead triggers an automatic follow-up within seconds. No lead ever goes cold." },
  { cat: "Finance", name: "Invoice auto-processing", start: 3, dur: 5, color: "#5dcaa5", tc: "#fff", pain: "Bot-handled", tip: "Invoices generated, sent, and logged automatically. Zero re-entry, zero errors." },
  { cat: "High-value work", name: "Strategy and client relationships", start: 6, dur: 5, color: "#2a78d6", tc: "#fff", pain: "Your team", tip: "Freed from robot work, your team focuses on decisions, relationships, and growth." },
  { cat: "High-value work", name: "Closing deals", start: 9, dur: 5, color: "#2a78d6", tc: "#fff", pain: "Your team", tip: "More time selling, less time logging. Bots handle the rest." },
  { cat: "Reporting", name: "Live dashboards, auto-updated", start: 13, dur: 5, color: "#1d9e75", tc: "#fff", pain: "Automated", tip: "Reports build themselves in real time. No weekly spreadsheet marathon." },
];

function barColors(isAfter, pain) {
  if (isAfter) {
    return pain === "Your team"
      ? { bg: "#dbeafe", tc: "#1e40af" }
      : { bg: "#d1fae5", tc: "#065f46" };
  }
  return pain === "Robot work"
    ? { bg: "#f1efea", tc: "#555" }
    : { bg: "#fee2e2", tc: "#991b1b" };
}

export default function GanttComparison() {
  const [tab, setTab] = useState("before");
  const [progress, setProgress] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    title: "",
    sub: "",
    pain: "",
    bg: "",
    tc: "",
  });
  const wrapRef = useRef(null);

  /* ── track viewport width for the responsive grid ── */
  useEffect(() => {
    const update = () => setWindowWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ── auto tab-loop with animated progress bar (matches switchTab in main.js) ── */
  useEffect(() => {
    let rafId;
    let timer;

    if (tab === "before") {
      setProgress(0);
      const DELAY = 2000;
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min(((now - t0) / DELAY) * 100, 100);
        setProgress(p);
        if (p < 100) {
          rafId = requestAnimationFrame(tick);
        } else {
          setTab("after");
        }
      };
      rafId = requestAnimationFrame(tick);
    } else {
      setProgress(0);
      timer = setTimeout(() => setTab("before"), 3000);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (timer) clearTimeout(timer);
    };
  }, [tab]);

  const isMobile = windowWidth < 768;
  const W = isMobile ? 850 : Math.max(windowWidth - 32, 300);
  const LBL_W = isMobile ? 150 : Math.min(200, Math.floor(W * 0.25));
  const BAR_W = W - LBL_W;
  const COL_W = Math.floor(BAR_W / COLS);

  const showTooltip = (e, task, isAfter) => {
    const { bg, tc } = barColors(isAfter, task.pain);
    moveTooltip(e, {
      visible: true,
      title: task.name,
      sub: task.tip,
      pain: task.pain,
      bg,
      tc,
    });
  };

  const moveTooltip = (e, extra = null) => {
    const cx = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
    const cy = e.clientY || (e.touches && e.touches[0]?.clientY) || 0;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let l = cx + 16;
    let t = cy - 12;
    if (l + 220 > vw - 8) l = cx - 226;
    if (t + 140 > vh - 8) t = vh - 148;
    if (t < 8) t = 8;

    setTooltip((prev) => ({
      ...(extra || prev),
      x: l,
      y: t,
    }));
  };

  const hideTooltip = () => setTooltip((prev) => ({ ...prev, visible: false }));

  const renderPanel = (tasks, isAfter) => (
    <div ref={wrapRef}>
      {/* hour header row */}
      <div
        style={{
          display: "flex",
          paddingLeft: LBL_W,
          marginBottom: 6,
          width: W,
        }}
      >
        {HOURS.map((h) => (
          <div
            key={h}
            style={{
              width: 2 * COL_W,
              fontSize: 12,
              color: "var(--tm)",
              textAlign: "center",
              flexShrink: 0,
            }}
          >
            {h}
          </div>
        ))}
      </div>

      {/* task rows */}
      <div style={{ width: W }}>
        {tasks.map((t) => {
          const vgCols = [];
          for (let c = 0; c <= COLS; c += 2) vgCols.push(c);

          const { bg, tc } = barColors(isAfter, t.pain);
          const left = t.start * COL_W;
          const width = Math.max(t.dur * COL_W - 3, 28);

          return (
            <div
              key={t.name}
              className="g-row"
              onMouseEnter={(e) => showTooltip(e, t, isAfter)}
              onMouseMove={(e) => moveTooltip(e)}
              onMouseLeave={hideTooltip}
              onTouchStart={(e) => showTooltip(e, t, isAfter)}
              onTouchEnd={hideTooltip}
            >
              <div className="rlbl" style={{ width: LBL_W }}>
                <div className="cat">{t.cat}</div>
                <div
                  className="nm"
                  style={{ maxWidth: LBL_W - 12 }}
                  title={t.name}
                >
                  {t.name}
                </div>
              </div>
              <div className="barea" style={{ width: BAR_W }}>
                {vgCols.map((c) => (
                  <div key={c} className="vg" style={{ left: c * COL_W }} />
                ))}
                <div
                  className="bar"
                  style={{
                    left,
                    width,
                    background: t.color,
                    color: t.tc,
                    fontSize: isMobile ? 11 : 12,
                  }}
                  title={t.name}
                >
                  {t.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <div className="tab-row">
        <div
          className={`tab bad${tab === "before" ? " active" : ""}`}
          id="tb-before"
          onClick={() => setTab("before")}
        >
          ✕ Before HASHTURN
        </div>
        <div
          className={`tab${tab === "after" ? " good" : ""}`}
          id="tb-after"
          onClick={() => setTab("after")}
        >
          ✓ After HASHTURN
        </div>
        <div
          className="cbar"
          id="cbar"
          style={{
            width: `${progress}%`,
            opacity: tab === "before" ? 1 : 0,
          }}
        ></div>
      </div>

      <div className="panels-wrap" id="panels-wrap">
        {/* BEFORE */}
        <div
          className={`panel${tab === "before" ? " active" : ""}`}
          id="panel-before"
          style={{ overflowX: isMobile ? "auto" : "hidden" }}
        >
          <div className="legend">
            <div className="leg">
              <div className="leg-sq" style={{ background: "#e24b4a" }}></div>
              Hours lost daily
            </div>
            <div className="leg">
              <div className="leg-sq" style={{ background: "#f09595" }}></div>
              Error-prone task
            </div>
            <div className="leg">
              <div className="leg-sq" style={{ background: "#888780" }}></div>
              Robot work
            </div>
          </div>
          <div id="g-before">{renderPanel(beforeTasks, false)}</div>
        </div>

        {/* AFTER */}
        <div
          className={`panel${tab === "after" ? " active" : ""}`}
          id="panel-after"
          style={{ overflowX: isMobile ? "auto" : "hidden" }}
        >
          <div className="legend">
            <div className="leg">
              <div className="leg-sq" style={{ background: "#1d9e75" }}></div>
              Automated flow
            </div>
            <div className="leg">
              <div className="leg-sq" style={{ background: "#5dcaa5" }}></div>
              Bot-handled
            </div>
            <div className="leg">
              <div className="leg-sq" style={{ background: "#2a78d6" }}></div>
              Your team, high-value
            </div>
          </div>
          <div id="g-after">{renderPanel(afterTasks, true)}</div>
        </div>
      </div>

      <div
        className="tt"
        id="gtt"
        style={{
          display: tooltip.visible ? "block" : "none",
          left: tooltip.x,
          top: tooltip.y,
        }}
      >
        <div className="tt-t" id="gtt-t">
          {tooltip.title}
        </div>
        <div className="tt-s" id="gtt-s">
          {tooltip.sub}
        </div>
        <div
          className="tt-b"
          id="gtt-b"
          style={{ background: tooltip.bg, color: tooltip.tc }}
        >
          {tooltip.pain}
        </div>
      </div>
    </>
  );
}
