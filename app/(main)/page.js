import GanttComparison from "@/components/GanttComparison";
import OrbitWheel from "@/components/OrbitWheel";
import AnimatedCounter from "@/components/AnimatedCounter";
import ReviewsMarquee from "@/components/ReviewsMarquee";
import { sql } from "@/lib/db";

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
        style={{ paddingTop: "calc(var(--nav-h) + 40px)", paddingBottom: "40px" }}
      >
        <div className="container">
          <div className="cta-outer reveal">
            <div
              className="cta-mesh-card"
              style={{ padding: "90px 40px 60px", textAlign: "center" }}
            >
              <div className="cta-mesh-blob mb-1"></div>
              <div className="cta-mesh-blob mb-2"></div>
              <div className="cta-mesh-blob mb-3"></div>
              <div className="cta-mesh-blob mb-4"></div>
              <div className="cta-mesh-overlay"></div>

              <div
                className="cta-content"
                style={{ maxWidth: 900, margin: "0 auto", width: "100%" }}
              >
                <h1
                  className="hero-title"
                  style={{ marginBottom: 20, fontSize: "2.3rem", lineHeight: 1.15, fontWeight: 800 }}
                >
                  We Automate the Work.
                  <br />
                  <span className="text-multicolor">You Run the Business.</span>
                </h1>
                <p
                  className="hero-sub reveal"
                  style={{ marginBottom: 35, fontSize: "0.95rem", maxWidth: "700px", margin: "0 auto 35px", lineHeight: 1.6 }}
                >
                  HashTurn designs and builds custom automation systems —
                  connecting your apps, eliminating repetitive tasks, and
                  giving your team back hundreds of hours every month.
                </p>

                <div
                  className="hero-actions reveal"
                  style={{ justifyContent: "center", marginBottom: 50 }}
                >
                  <a href="/contact" className="cta-btn-grad">
                    Book Free Strategy Call <i className="fa-solid fa-arrow-right"></i>
                  </a>
                  <a href="/services" className="btn-ghost">
                    See Our Services
                  </a>
                </div>

                <div
                  className="hero-stats"
                  style={{
                    marginTop: 0,
                    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                    paddingTop: 0,
                  }}
                >
                  <div className="stat-box">
                    <div className="stat-num">200+</div>
                    <p className="stat-label">Projects Delivered</p>
                  </div>

                  <div className="stat-box">
                    <div className="stat-num">
                      <span className="star-icon">⭐</span> 5.0
                    </div>
                    <p className="stat-label">Fiverr Rating</p>
                  </div>

                  <div className="stat-box">
                    <div className="stat-num">Fast</div>
                    <p className="stat-label">Turnaround</p>
                  </div>

                  <div className="stat-box">
                    <div className="stat-num">100%</div>
                    <p className="stat-label">Client Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="cta-sticker sticker-1">
              <i className="fa-solid fa-check"></i> 200+ Projects Delivered
            </div>
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

      {/* ░░ FINAL CTA ░░ */}
      <section className="page cta-section" id="cta">
        <div className="container">
          <div className="cta-outer reveal">
            <div className="cta-mesh-card">
              <div className="cta-mesh-blob mb-1"></div>
              <div className="cta-mesh-blob mb-2"></div>
              <div className="cta-mesh-blob mb-3"></div>
              <div className="cta-mesh-blob mb-4"></div>
              <div className="cta-mesh-overlay"></div>

              <div className="cta-content">
                <p className="eyebrow">Ready to Automate?</p>
                <h2 className="section-title">
                  Stop Losing Hours to Tasks
                  <br />a Robot Can Do Better.
                </h2>
                <p className="section-subtitle-text tight-subtitle">
                  Book a free 30-minute strategy call. We&apos;ll map out
                  exactly how automation can save your business time and
                  money — no obligation, no cost.
                </p>

                <div className="hero-actions" style={{ marginTop: 15 }}>
                  <a href="/contact" className="cta-btn-grad">
                    Book Free Strategy Call <i className="fa-solid fa-arrow-right"></i>
                  </a>
                  <a href="/services" className="btn-ghost">
                    View All Services
                  </a>
                </div>

                <p className="cta-trust">
                  Free call &nbsp;·&nbsp; No credit card required &nbsp;·&nbsp;
                  Response within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
