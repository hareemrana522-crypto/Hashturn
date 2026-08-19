export const revalidate = 60;




export const metadata = {
  title: "Services — Hashturn",
};

const SERVICES = [
  {
    color: "var(--red)",
    title: "Business Process Automation",
    tagTag: "h5",
    tagline: "Stop doing manually what machines can do better.",
    summary:
      "Every business has repetitive processes that eat time and drain energy. We analyze your existing workflows, identify automation opportunities, and build systems that handle the routine work — so your team can focus on what only humans can do.",
    deliverTitle: "What We Deliver",
    deliver: [
      "Automated invoice generation and sending",
      "Scheduled reporting and data exports",
      "Employee onboarding and offboarding flows",
      "Approval workflows and document routing",
      "Automated notifications and reminders",
      "Data validation and quality checks",
    ],
    tools: [
      { img: "automate.png.png", h: 32, label: "Power Automate", color: "#7ec9f7" },
      { img: "share.png.png",    h: 30, label: "SharePoint",     color: "#1c667b" },
      { img: "Powerapps.png.png",h: 30, label: "Power Apps",     color: "#742774" },
      { img: "powerbi.png.png",  h: 30, label: "Power BI",       color: "#f2c811" },
      { img: "msteam.png.png",   h: 30, label: "MS Teams",       color: "#464eb8" },
    ],
  },
  {
    color: "var(--green)",
    title: "Robotic Process Automation (RPA)",
    tagTag: "h6",
    tagline: "Software robots that work 24/7 without breaks or errors.",
    summary:
      "RPA bots interact with your existing software exactly like a human would — clicking, typing, reading screens, copying data — but faster, more accurately, and around the clock. Perfect for tasks that can't be automated with APIs.",
    deliverTitle: "WHAT WE DELIVER",
    deliver: [
      "Web scraping and data extraction",
      "Legacy system automation (no API needed)",
      "Automated form filling and data entry",
      "ERP and CRM data migration",
      "Report generation from multiple systems",
      "Scheduled batch processing jobs",
    ],
    tools: [
      { img: "pyth.png.png",     h: 30, label: "Python",        color: "#afb746" },
      { img: "automate.png.png", h: 32, label: "Power Automate",color: "#7ec9f7" },
      { img: "excel.png.png",    h: 25, label: "MS Excel",      color: "#107c41" },
      { img: "sql.png.png",      h: 30, label: "SQL Server",    color: "#3882ba" },
      { img: "azure.png.png",    h: 30, label: "MS Azure",      color: "#0089d6" },
    ],
  },
  {
    color: "var(--blue)",
    title: "API & Webhook Integration",
    tagTag: "h6",
    tagline: "Connect every tool in your tech stack — automatically.",
    summary:
      "Your business runs on multiple apps that don't talk to each other. We build the bridges. When a deal closes in your CRM, it automatically creates an invoice, updates your project management tool, and sends a Slack notification — no manual steps.",
    deliverTitle: "WHAT WE DELIVER",
    deliver: [
      "CRM to accounting software sync",
      "Ecommerce order management automation",
      "Real-time data sync between platforms",
      "Custom webhook handlers and listeners",
      "Third-party payment gateway integration",
      "Multi-system data aggregation dashboards",
    ],
    tools: [
      { img: "node.png.png",     h: 30, label: "Node.js",        color: "#339933" },
      { img: "docker.png.png",   h: 23, label: "Docker",         color: "#2496ed" },
      { img: "mongo.png.png",    h: 35, label: "MongoDB",        color: "#47a248" },
      { img: "azure.png.png",    h: 30, label: "Microsoft Azure",color: "#0089d6" },
      { img: "automate.png.png", h: 32, label: "Power Automate", color: "#7ec9f7" },
    ],
  },
  {
    color: "var(--yellow)",
    title: "CRM Automation",
    tagTag: "h6",
    tagline: "Your sales pipeline on autopilot — from lead to close.",
    summary:
      "Stop letting leads fall through the cracks. We automate your entire CRM workflow — lead capture, scoring, nurturing sequences, follow-up reminders, deal updates, and reporting — so your sales team spends more time selling and less time on admin.",
    deliverTitle: "WHY WE DELIVER",
    deliver: [
      "Automated lead capture from all channels",
      "Lead scoring and prioritization",
      "Personalized email follow-up sequences",
      "Deal stage automation and notifications",
      "Activity logging and task creation",
      "Sales pipeline reporting and dashboards",
    ],
    tools: [
      { img: "automate.png.png", h: 32, label: "Power Automate",color: "#7ec9f7" },
      { img: "out.png.png",      h: 25, label: "MS Outlook",    color: "#0078d4" },
      { img: "powerbi.png.png",  h: 30, label: "Power BI",      color: "#f2c811" },
      { img: "excel.png.png",    h: 25, label: "MS Excel",      color: "#107c41" },
      { img: "sql.png.png",      h: 30, label: "SQL Server",    color: "#3882ba" },
    ],
  },
  {
    color: "var(--blue)",
    title: "Microsoft 365 Solutions",
    tagTag: "h6",
    tagline: "The full power of Microsoft — customized for your team.",
    summary:
      "If your business runs on Microsoft 365, we can unlock its full potential. From SharePoint intranets and Power Apps portals to complex Excel VBA macros and Power Automate flows — we build tools that live inside the Microsoft environment your team already uses.",
    deliverTitle: "WHY WE DELIVER",
    deliver: [
      "SharePoint site design and automation",
      "Power Apps custom business applications",
      "Power Automate workflow development",
      "Excel VBA and Office Scripts automation",
      "Power BI dashboards and reporting",
      "Word document population and generation",
    ],
    tools: [
      { img: "share.png.png",    h: 30, label: "SharePoint",    color: "#1c667b" },
      { img: "Powerapps.png.png",h: 30, label: "Power Apps",    color: "#742774" },
      { img: "automate.png.png", h: 32, label: "Power Automate",color: "#7ec9f7" },
      { img: "excel.png.png",    h: 25, label: "MS Excel",      color: "#107c41" },
      { img: "powerbi.png.png",  h: 30, label: "Power BI",      color: "#f2c811" },
      { img: "word.png.png",     h: 25, label: "MS Word",       color: "#185abd" },
    ],
  },
  {
    color: "var(--green)",
    title: "Mobile & Web Development",
    tagTag: "h6",
    tagline: "Custom apps that fit your business perfectly.",
    summary:
      "Sometimes you need software built exactly the way you want it — not a workaround using existing tools. We build web apps, mobile apps, and ecommerce stores that solve your specific business problems, with clean code and great user experience.",
    deliverTitle: "WHY WE DELIVER",
    deliver: [
      "Next.js and React web applications",
      "Flutter cross-platform mobile apps",
      "React Native iOS and Android apps",
      "Shopify ecommerce stores and custom themes",
      "Customer portals and internal dashboards",
      "API development and backend services",
    ],
    tools: [
      { img: "react.png.png",h: 30, label: "React.js",color: "#61dafb" },
      { img: "ang.png.png",  h: 32, label: "Angular", color: "#dd0031" },
      { img: "node.png.png", h: 30, label: "Node.js", color: "#339933" },
      { img: "djan.png.png", h: 30, label: "Django",  color: "#092e20" },
      { img: "aws.png.png",  h: 25, label: "AWS",     color: "#ff9900" },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* ░░ HERO ░░ */}
      <section className="srv-hero-section">
        <div className="container srv-hero-inner">
          <span className="srv-tag">OUR SERVICES</span>
          <h1 className="srv-title" style={{ marginBottom: 10 }}>
            Everything You Need to <br />{" "}
            <span className="text-multicolor"> Automate Your Business</span>
          </h1>
          <p className="srv-subtitle" style={{ fontSize: 15 }}>
            From simple workflow automation to complex enterprise integrations{" "}
            <br /> — we have the tools, expertise, and experience to deliver
            results fast.
          </p>
          <div>
            <a href="/contact" className="cta-btn-grad" style={{ marginTop: 15 }}>
              Get a Free Quote<i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>

      {/* ░░ SERVICE ROWS ░░ */}
      <section className="srv-split-section">
        <div className="container">
          <div className="srv-split-list">
            {SERVICES.map((s) => {
              const Tagline = s.tagTag;
              return (
                <div
                  className="srv-split-row"
                  style={{ "--row-color": s.color }}
                  key={s.title}
                  id={s.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}
                >
                  <div className="srv-left-col">
                    <h3 className="srv-row-heading">{s.title}</h3>
                    <Tagline style={{ fontSize: 17 }}>{s.tagline}</Tagline>
                    <p className="srv-row-summary">{s.summary}</p>

                    <div>
                      <a
                        href="/quote"
                        className="cta-btn-grad"
                        style={{ marginTop: 15 }}
                      >
                        Get a Quote for This Services
                        <i className="fa-solid fa-arrow-right"></i>
                      </a>
                    </div>

                    <div className="tech-icons-row" style={{ marginTop: "1.5rem" }}>
                      {s.tools.map((tool) => (
                        <div
                          key={tool.label}
                          className="tech-icon-badge"
                          style={{ "--icon-color": tool.color || "#ccc" }}
                        >
                          <img
                            src={`/${tool.img}`}
                            alt={tool.label}
                            style={{ height: `${tool.h || 30}px`, width: 'auto', objectFit: 'contain' }}
                          />
                          <span className="tech-icon-tooltip">{tool.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="srv-right-col">
                    <h4 className="srv-detail-title">{s.deliverTitle}</h4>
                    <ul className="srv-feature-list">
                      {s.deliver.map((item) => (
                        <li key={item}>
                          <iconify-icon icon="lucide:check-circle"></iconify-icon>{" "}
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ░░ SERVICES PAGE CTA ░░ */}
      <section className="page cta-section" id="services-cta">
        <div className="container">
          <div className="cta-outer reveal">
            <div className="cta-mesh-card">
              <div className="cta-mesh-blob mb-1"></div>
              <div className="cta-mesh-blob mb-2"></div>
              <div className="cta-mesh-blob mb-3"></div>
              <div className="cta-mesh-blob mb-4"></div>
              <div className="cta-mesh-overlay"></div>

              <div className="cta-content">
                <p className="eyebrow">Start Today</p>
                <h2 className="section-title">Not Sure Which Service You Need?</h2>
                <p className="section-subtitle-text tight-subtitle">
                  Book a free 30-minute call. We&apos;ll analyze your business
                  and recommend exactly what will save you the most time and
                  money.
                </p>

                <div className="hero-actions" style={{ marginTop: 13 }}>
                  <a href="/contact" className="cta-btn-grad">
                    Book Free Strategy Call <i className="fa-solid fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="cta-sticker sticker-1">
              <i className="fa-solid fa-check"></i> No Obligation
            </div>
            <div className="cta-sticker sticker-2">
              <i className="fa-solid fa-clock"></i> Just 30 Minutes
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
