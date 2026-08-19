export const revalidate = 60;

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { sql } from "@/lib/db";

const GanttComparison = dynamic(() => import('@/components/GanttComparison'));
const OrbitWheel = dynamic(() => import('@/components/OrbitWheel'));
const AnimatedCounter = dynamic(() => import('@/components/AnimatedCounter'));
const ReviewsMarquee = dynamic(() => import('@/components/ReviewsMarquee'));

const SERVICES_ACCORDION = [
  {
    idx: "01",
    title: "Business Process Automation",
    desc: "Map, optimize, and automate your entire business workflows — from lead capture to invoice generation — without disrupting how your team works.",
    link: "Learn about Automation",
  },
  {
    idx: "02",
    title: "Robotic Process Automation (RPA)",
    desc: "Software robots that handle repetitive computer tasks 24/7 — logging in, extracting data, filling forms, generating reports — with perfect accuracy.",
    link: "Learn about RPA",
  },
  {
    idx: "03",
    title: "API & Webhook Integration",
    desc: "Connect any two apps — even if they weren't built to work together. We sync your CRM, ERP, ecommerce store, and databases in real-time.",
    link: "Learn about Integration",
  },
  {
    idx: "04",
    title: "CRM Automation",
    desc: "Automate your entire sales pipeline — lead scoring, follow-up sequences, deal tracking, and reporting — so your sales team only does selling.",
    link: "Learn about CRM Automation",
  },
  {
    idx: "05",
    title: "Microsoft 365 Solutions",
    desc: "SharePoint, Power Apps, Power Automate, Excel VBA, Office Scripts — we build custom tools and automations deep inside your Microsoft environment.",
    link: "Learn about Microsoft 365 Solutions",
  },
  {
    idx: "06",
    title: "Mobile & Web Development",
    desc: "Custom apps built with Flutter, React Native, Next.js, and more. Ecommerce stores, customer portals, internal dashboards — we build it all.",
    link: "Learn about Mobile & Web Development",
  },
];

const PROCESS_STEPS = [
  { color: "var(--blue)", icon: "fa-comments", num: "01", title: "Free Discovery Call", desc: "We learn about your business, current workflows, and where you're losing the most time. No cost, no commitment." },
  { color: "var(--yellow)", icon: "fa-compass-drafting", num: "02", title: "Strategy & Plan", desc: "We design a custom automation roadmap — exactly what will be built, how it works, and the time and cost you'll save." },
  { color: "var(--red)", icon: "fa-code", num: "03", title: "Build & Test", desc: "Our team builds and thoroughly tests your automation. You're updated every step of the way until everything is perfect." },
  { color: "var(--green)", icon: "fa-rocket", num: "04", title: "Launch & Support", desc: "We go live and provide ongoing support. Your automation runs reliably — and we're here if anything needs adjusting." },
];

const WHY_ITEMS = [
  { color: "var(--blue)", num: "01", title: "200+ successfully delivered projects", desc: "Proven track record across industries — retail, finance, healthcare, logistics, and more." },
  { color: "var(--green)", num: "02", title: "End-to-end service", desc: "From strategy to build to support — you get one dedicated team from start to finish." },
  { color: "var(--yellow)", num: "03", title: "Fast delivery, clear communication", desc: "Most projects delivered in days, not months. You're always in the loop with progress updates." },
  { color: "var(--red)", num: "04", title: "Microsoft-certified expertise", desc: "Deep experience with the full Microsoft ecosystem — Power Platform, SharePoint, Excel VBA, and beyond." },
];

export default async function HomePage() {
  const reviews = await sql`SELECT name as client_name, location as company, rating, review_text as text, source FROM reviews WHERE featured = true ORDER BY created_at DESC LIMIT 6`.catch(() => []);


  return (
    <>
      {/* ░░ HERO ░░ */}
      <section
        className="page"
        id="home"
        style={{
          paddingTop: "calc(var(--nav-h) + 40px)",
          paddingBottom: "40px",
          position: "relative",
          background: "#ffffff",
          overflow: "hidden"
        }}
      >
        {/* Background Image with Reduced Opacity */}
        <div 
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "url('/custom-blur-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.15,
            zIndex: 0
          }}
        />

        {/* Blur Overlay (Optional but nice) */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backdropFilter: "blur(5px)", zIndex: 0 }}></div>

        {/* Floating Tool Icons in Background (NOW ON TOP OF BG) */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
          <style>{`
            @keyframes floatIcon1 { 0% { transform: translate(0px, 0px) rotate(0deg); } 50% { transform: translate(20px, -20px) rotate(10deg); } 100% { transform: translate(0px, 0px) rotate(0deg); } }
            @keyframes floatIcon2 { 0% { transform: translate(0px, 0px) rotate(0deg); } 50% { transform: translate(-20px, 25px) rotate(-10deg); } 100% { transform: translate(0px, 0px) rotate(0deg); } }
            @keyframes floatIcon3 { 0% { transform: translate(0px, 0px) rotate(0deg); } 50% { transform: translate(25px, 20px) rotate(15deg); } 100% { transform: translate(0px, 0px) rotate(0deg); } }
            @keyframes floatIcon4 { 0% { transform: translate(0px, 0px) rotate(0deg); } 50% { transform: translate(-25px, -20px) rotate(-15deg); } 100% { transform: translate(0px, 0px) rotate(0deg); } }
            .floating-tool {
              position: absolute;
              opacity: 0.9;
              transition: opacity 0.3s ease;
              pointer-events: auto; /* Allow hover */
              width: 56px;
              height: 56px;
              border-radius: 50%;
            }
          `}</style>

          <div className="floating-tool" style={{ top: "18%", left: "12%", animation: "floatIcon1 6s infinite ease-in-out" }}>
            <div className="tool-badge-card" style={{ "--icon-color": "#61dafb" }}>
              <Image src="/react.png.png" alt="" width={60} height={30} style={{ width: "auto", objectFit: "contain" }} />
              <span className="tool-tooltip">React.js</span>
            </div>
          </div>

          <div className="floating-tool" style={{ top: "65%", left: "18%", animation: "floatIcon2 8s infinite ease-in-out" }}>
            <div className="tool-badge-card" style={{ "--icon-color": "#afb746" }}>
              <Image src="/pyth.png.png" alt="" width={60} height={30} style={{ width: "auto", objectFit: "contain" }} />
              <span className="tool-tooltip">Python</span>
            </div>
          </div>

          <div className="floating-tool" style={{ top: "22%", right: "15%", animation: "floatIcon3 7s infinite ease-in-out" }}>
            <div className="tool-badge-card" style={{ "--icon-color": "#ff9900" }}>
              <Image src="/aws.png.png" alt="" width={50} height={25} style={{ width: "auto", objectFit: "contain" }} />
              <span className="tool-tooltip">AWS</span>
            </div>
          </div>

          <div className="floating-tool" style={{ top: "70%", right: "12%", animation: "floatIcon4 9s infinite ease-in-out" }}>
            <div className="tool-badge-card" style={{ "--icon-color": "#2496ed" }}>
              <Image src="/docker.png.png" alt="" width={46} height={23} style={{ width: "auto", objectFit: "contain" }} />
              <span className="tool-tooltip">Docker</span>
            </div>
          </div>

          <div className="floating-tool" style={{ top: "82%", left: "50%", animation: "floatIcon1 7.5s infinite ease-in-out" }}>
            <div className="tool-badge-card" style={{ "--icon-color": "#742774" }}>
              <Image src="/Powerapps.png.png" alt="" width={60} height={30} style={{ width: "auto", objectFit: "contain" }} />
              <span className="tool-tooltip">Power Apps</span>
            </div>
          </div>
        </div>
        
        <div className="container" style={{ position: "relative", zIndex: 1, pointerEvents: "none" }}>
          <style>{`
            @keyframes fadeInUpStagger {
              0% { opacity: 0; transform: translateY(30px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            .stagger-anim {
              opacity: 0;
              animation: fadeInUpStagger 0.8s ease-out forwards;
            }
          `}</style>
          <div
            className="hero-content"
            style={{ maxWidth: 1200, margin: "0 auto", width: "100%", textAlign: "center", padding: "40px 20px", pointerEvents: "auto" }}
          >
            <h1
              className="hero-title"
              style={{ marginBottom: 20, fontSize: "clamp(2.2rem, 7.5vw, 75px)", lineHeight: "1.1", letterSpacing: "-0.05em", fontWeight: 800 }}
            >
              <span className="stagger-anim" style={{ display: "inline-block", color: "rgb(8, 8, 8)", animationDelay: "0.1s" }}>We Automate the Work.</span>
              <br />
              <span className="text-multicolor stagger-anim" style={{ display: "inline-block", animationDelay: "0.4s" }}>You Run the Business.</span>
            </h1>
            <p
              className="hero-sub stagger-anim"
              style={{ marginBottom: 35, fontSize: "0.95rem", maxWidth: "700px", margin: "0 auto 35px", lineHeight: 1.6, color: "rgb(55, 65, 81)", animationDelay: "0.7s" }}
            >
              Custom automation systems that eliminate repetitive tasks.
            </p>

            <div
              className="hero-actions stagger-anim"
              style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: 50, flexWrap: "wrap", animationDelay: "1s" }}
            >
              <a href="/contact" className="cta-btn-grad">
                Book Free Strategy Call <i className="fa-solid fa-arrow-right"></i>
              </a>
              <a href="/services" className="btn-ghost">
                See Our Services
              </a>
            </div>

            <div
              className="hero-stats stagger-anim"
              style={{
                marginTop: 0,
                paddingTop: "10px",
                display: "flex",
                justifyContent: "center",
                gap: "30px",
                flexWrap: "wrap",
                animationDelay: "1.3s"
              }}
            >
              <div className="stat-box" style={{ textAlign: "center" }}>
                <div className="stat-num" style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--text)" }}>200+</div>
                <p className="stat-label" style={{ fontSize: "0.85rem", color: "var(--muted)" }}>Projects Delivered</p>
              </div>

              <div className="stat-box" style={{ textAlign: "center" }}>
                <div className="stat-num" style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--text)" }}>
                  <span className="star-icon" style={{ color: "var(--yellow)" }}>⭐</span> 5.0
                </div>
                <p className="stat-label" style={{ fontSize: "0.85rem", color: "var(--muted)" }}>Fiverr Rating</p>
              </div>

              <div className="stat-box" style={{ textAlign: "center" }}>
                <div className="stat-num" style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--text)" }}>Fast</div>
                <p className="stat-label" style={{ fontSize: "0.85rem", color: "var(--muted)" }}>Turnaround</p>
              </div>

              <div className="stat-box" style={{ textAlign: "center" }}>
                <div className="stat-num" style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--text)" }}>100%</div>
                <p className="stat-label" style={{ fontSize: "0.85rem", color: "var(--muted)" }}>Client Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ░░ OUR TOOLKIT SECTION ░░ */}
      <section className="tools-wheel-section">
        <div className="container wheel-flex-container">
          <div className="wheel-text-side reveal">
            <span className="eyebrow">Our Toolkit</span>
            <h2>
              Industry
              <br />
              <span className="text-gradient">Leading Tools</span>
            </h2>
            <p>We are certified experts in the platforms businesses trust most.</p>
          </div>

          <div className="wheel-visual-side">
            <OrbitWheel />
          </div>
        </div>
      </section>

      {/* ░░ THE PROBLEM WE SOLVE ░░ */}
      <section id="problem" className="page">
        <div className="container">
          <div className="section-header reveal" style={{ maxWidth: "1000px" }}>
            <p className="eyebrow">THE PROBLEM WE SOLVE</p>
            <h2 className="section-title">
              Your Team Spends Too Much Time on Tasks <span className="gradient-text">That Shouldn&apos;t Exist</span>
            </h2>
            <p className="section-subtitle-text tight-subtitle">
              Data entry, copy-pasting between apps, sending the same emails, generating the same reports — these tasks eat hours every day. HashTurn eliminates them so your team can focus on what actually matters.
            </p>
          </div>

          <GanttComparison />
        </div>
      </section>

      {/* ░░ FIXED STATS ░░ */}
      <section className="fixed-stats-section">
        <div className="container">
          <div className="stats-grid-four">
            <div className="stat-grid-card reveal">
              <div className="stat-info">
                <div className="stat-number-wrapper">
                  <h3 className="stat-number">
                    <AnimatedCounter target={200} />
                  </h3>
                  <span className="stat-plus">+</span>
                </div>
                <p className="stat-text">Projects Delivered</p>
              </div>
            </div>

            <div className="stat-grid-card reveal">
              <div className="stat-info">
                <div className="stat-number-wrapper">
                  <h3 className="stat-number">
                    <AnimatedCounter target={50} />
                  </h3>
                  <span className="stat-plus">+</span>
                </div>
                <p className="stat-text">Expert Developers</p>
              </div>
            </div>

            <div className="stat-grid-card reveal">
              <div className="stat-info">
                <div className="stat-number-wrapper">
                  <h3 className="stat-number">
                    <AnimatedCounter target={5000} />
                  </h3>
                  <span className="stat-plus">+</span>
                </div>
                <p className="stat-text">Client Satisfaction</p>
              </div>
            </div>

            <div className="stat-grid-card reveal">
              <div className="stat-info">
                <div className="stat-number-wrapper">
                  <h3 className="stat-number">
                    <AnimatedCounter target={5.0} />
                  </h3>
                  <span className="stat-star">
                    <i className="fa-solid fa-star"></i>
                  </span>
                </div>
                <p className="stat-text">Average Fiverr Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ░░ SERVICES SECTION ░░ */}
      <section id="services" className="page page-alt">
        <div className="container">
          <div className="services-modern-header reveal">
            <div className="header-left-block">
              <p className="eyebrow">WHAT WE DO</p>
              <h2 className="section-title text-left-align">
                Automation Solutions for <br />
                <span className="gradient-text"> Every Business Need</span>
              </h2>
            </div>
            <div className="header-right-block">
              <a href="/services" className="btn-minimal-action">
                View All Services
              </a>
            </div>
          </div>

          <div className="modern-services-accordion-list">
            {SERVICES_ACCORDION.map((s) => (
              <div className="service-accordion-row reveal" key={s.idx}>
                <div className="accordion-trigger">
                  <span className="service-index">{s.idx}</span>
                  <h3 className="service-main-title">{s.title}</h3>
                  <span className="accordion-plus-icon">+</span>
                </div>
                <div className="accordion-hidden-content">
                  <div className="content-wrapper-inner">
                    <p>{s.desc}</p>
                    <a href={`/services#${s.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`} className="service-action-link">
                      {s.link} <span>→</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ░░ OUR PROCESS ░░ */}
      <section className="page process-section" id="process">
        <div className="container">
          <div className="section-header reveal">
            <p className="eyebrow">Our Process</p>
            <h2 className="section-title">
              From Idea to Automation <br />
              in <span className="gradient-text">4 Simple Steps</span>
            </h2>
            <p className="section-subtitle-text tight-subtitle">
              We make the whole process simple, clear, and collaborative — no
              technical knowledge required on your end.
            </p>
          </div>

          <div className="process-track">
            <div className="process-line"></div>
            <div className="process-grid">
              {PROCESS_STEPS.map((step) => (
                <div
                  className="process-step reveal"
                  style={{ "--step-color": step.color }}
                  key={step.num}
                >
                  <div className="process-icon-wrap">
                    <div className="process-icon">
                      <i className={`fa-solid ${step.icon}`}></i>
                    </div>
                    <span className="process-num">{step.num}</span>
                  </div>
                  <div className="process-card glass-card">
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ░░ CLIENT REVIEWS ░░ */}
      <section className="page page-alt reviews-section" id="reviews">
        <div className="container">
          <div className="section-header reveal">
            <p className="eyebrow">Client Reviews</p>
            <h2 className="section-title">
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
            <p className="section-subtitle-text tight-subtitle">
              200+ projects delivered on Fiverr — here&apos;s what businesses
              say about working with us.
            </p>
          </div>

          <ReviewsMarquee reviews={reviews} />

          <div className="reviews-cta reveal">
            <a href="https://www.fiverr.com/zeeshaanbillal?public_mode=true" target="_blank" rel="noopener noreferrer" className="btn-ghost">
              See All Reviews on Fiverr
            </a>
          </div>
        </div>
      </section>

      {/* ░░ WHY HASHTURN ░░ */}
      <section className="page why-section" id="why-hashturn">
        <div className="container why-layout">
          <div className="why-text">
            <p className="eyebrow reveal">Why Hashturn</p>
            <h2 className="section-title text-left-align reveal">
              Automation Built for{" "}
              <span className="gradient-text">Your Business</span>, Not a
              Generic Template
            </h2>
            <p className="section-body reveal">
              Unlike off-the-shelf software, every automation we build is
              custom-designed for your exact workflows. We take the time to
              understand your business before writing a single line of code.
            </p>

            <div className="why-list">
              {WHY_ITEMS.map((item) => (
                <div
                  className="why-item reveal"
                  style={{ "--wc": item.color }}
                  key={item.num}
                >
                  <span className="why-item-num">{item.num}</span>
                  <div className="why-item-body">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="why-collage reveal">
            <div className="why-blob blob-1"></div>
            <div className="why-blob blob-2"></div>

            <div className="why-float-card wc-1" style={{ "--wc": "var(--blue)" }}>
              <div className="why-float-icon">
                <i className="fa-solid fa-clock"></i>
              </div>
              <h3>3 hrs</h3>
              <p>Avg. daily time saved per client</p>
            </div>

            <div
              className="why-float-card wc-2 wc-featured"
              style={{ "--wc": "var(--green)" }}
            >
              <i className="fa-solid fa-face-smile why-float-bg"></i>
              <div className="why-float-icon">
                <i className="fa-solid fa-face-smile"></i>
              </div>
              <h3>98%</h3>
              <p>Client satisfaction rate</p>
            </div>

            <div className="why-float-card wc-3" style={{ "--wc": "var(--yellow)" }}>
              <div className="why-float-icon">
                <i className="fa-solid fa-bolt"></i>
              </div>
              <h3>&lt;48h</h3>
              <p>Avg. project kickoff time</p>
            </div>

            <div className="why-float-card wc-4" style={{ "--wc": "var(--red)" }}>
              <div className="why-float-icon">
                <i className="fa-solid fa-chart-line"></i>
              </div>
              <h3>10x</h3>
              <p>Avg. ROI, first year</p>
            </div>
          </div>
        </div>
      </section>

      {/* ░░ FINAL CTA (ULTRA-MINIMAL & CLEAN) ░░ */}
      <section className="page" id="cta" style={{ background: "white", padding: "140px 0", borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: "center", maxWidth: "900px", margin: "0 auto" }}>
            
            <span className="eyebrow" style={{ color: "navy", fontSize: "0.85rem", letterSpacing: "2px", fontWeight: "700", display: "block", marginBottom: "20px" }}>
              READY TO AUTOMATE?
            </span>
            
            <h2 style={{ 
              fontSize: "clamp(1.8rem, 3vw, 2.8rem)", 
              fontWeight: "800", 
              lineHeight: "1.2", 
              color: "var(--text)", 
              marginBottom: "25px",
              letterSpacing: "-0.5px"
            }}>
              Stop Losing Hours to Tasks <br />
              <span style={{ color: "navy" }}>A Robot Can Do Better.</span>
            </h2>
            
            <p style={{ 
              fontSize: "1.1rem", 
              lineHeight: "1.7", 
              color: "var(--muted)", 
              marginBottom: "40px"
            }}>
              Book a free 30-minute strategy call. We'll map out exactly how automation can save your business time and money — no obligation, no cost.
            </p>

            <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/contact" className="btn-primary" style={{ padding: "1rem 2.5rem", fontSize: "1.05rem" }}>
                Book Free Strategy Call <i className="fa-solid fa-arrow-right"></i>
              </a>
              <a href="/services" className="btn-ghost" style={{ padding: "1rem 2.5rem", fontSize: "1.05rem" }}>
                View All Services
              </a>
            </div>

            <div style={{ 
              marginTop: "50px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              gap: "25px",
              color: "var(--muted)",
              fontSize: "0.9rem",
              fontWeight: "600",
              flexWrap: "wrap"
            }}>
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <i className="fa-solid fa-check" style={{ color: "var(--green)" }}></i> Free call
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <i className="fa-solid fa-check" style={{ color: "var(--green)" }}></i> No credit card required
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <i className="fa-solid fa-check" style={{ color: "var(--green)" }}></i> Response within 24 hours
              </span>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
