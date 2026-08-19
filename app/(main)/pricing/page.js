"use client";

import { useState } from "react";
import Link from "next/link";
import Script from "next/script";



export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <>
      {/* ░░ HERO SECTION ░░ */}
      <section className="page" style={{ paddingTop: 100, paddingBottom: 0, minHeight: 'auto' }} id="pricing-hero">
        <div className="container">
          <div className="section-header reveal">
            <span className="eyebrow" style={{ color: "navy" }}>PRICING</span>
            <h1 className="hero-title" style={{ fontSize: "3rem", marginBottom: "1rem" }}>
              Simple, <span className="text-multicolor">Transparent Pricing</span>
            </h1>
            <p className="section-subtitle-text tight-subtitle" style={{ maxWidth: "600px", margin: "0 auto 1.5rem auto" }}>
              No hidden fees. No surprises. Pick a package or get a custom quote
              for your specific project.
            </p>

            {/* Toggle UI */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
              <span style={{ fontWeight: isAnnual ? 600 : 700, fontSize: "1.1rem", color: isAnnual ? "var(--muted)" : "inherit", cursor: "pointer" }} onClick={() => setIsAnnual(false)}>Monthly</span>
              <div 
                style={{ width: "54px", height: "28px", background: "#333", borderRadius: "20px", position: "relative", cursor: "pointer", transition: "all 0.3s ease" }}
                onClick={() => setIsAnnual(!isAnnual)}
              >
                <div style={{ width: "22px", height: "22px", background: "#fff", borderRadius: "50%", position: "absolute", top: "3px", left: isAnnual ? "28px" : "4px", boxShadow: "0 2px 4px rgba(0,0,0,0.2)", transition: "left 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)" }}></div>
              </div>
              <span style={{ fontWeight: isAnnual ? 700 : 600, fontSize: "1.1rem", color: isAnnual ? "inherit" : "var(--muted)", cursor: "pointer" }} onClick={() => setIsAnnual(true)}>Annual</span>
              <span style={{ background: "var(--green)", color: "white", fontSize: "0.85rem", padding: "5px 12px", borderRadius: "20px", fontWeight: 800, marginLeft: "-4px" }}>Save 20%</span>
            </div>
          </div>
        </div>
      </section>

      {/* ░░ PRICING CARDS ░░ */}
      <section style={{ paddingTop: 40, paddingBottom: 100, background: "white" }} id="pricing-cards">
        <div className="container">
          <div className="pricing-grid reveal" style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", 
            gap: "1.5rem",
            alignItems: "stretch"
          }}>
            
            {/* Starter Card */}
            <div className="pricing-card" style={{
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              borderRadius: "24px",
              padding: "2rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
            }}>
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⚡</div>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Starter</h3>
              <p style={{ color: "var(--muted)", fontSize: "0.95rem", marginBottom: "1.5rem", lineHeight: 1.6, minHeight: "50px" }}>
                Perfect for small businesses looking to automate one key workflow.
              </p>
              <div style={{ marginBottom: "2rem" }}>
                <span style={{ fontSize: "2.8rem", fontWeight: 800, letterSpacing: "-1px" }}>${isAnnual ? "39" : "49"}</span>
                <span style={{ color: "var(--muted)", fontSize: "0.9rem" }}> /project</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem 0", flexGrow: 1, display: "flex", flexDirection: "column", gap: "1rem", fontSize: "1rem" }}>
                <li><i className="fa-solid fa-check" style={{ color: "var(--green)", width: "20px" }}></i> 1 automation workflow</li>
                <li><i className="fa-solid fa-check" style={{ color: "var(--green)", width: "20px" }}></i> Up to 3 app integrations</li>
                <li><i className="fa-solid fa-check" style={{ color: "var(--green)", width: "20px" }}></i> Make.com or n8n</li>
                <li><i className="fa-solid fa-check" style={{ color: "var(--green)", width: "20px" }}></i> 7-day delivery</li>
                <li><i className="fa-solid fa-check" style={{ color: "var(--green)", width: "20px" }}></i> 14 days of support</li>
                <li style={{ color: "var(--muted)", opacity: 0.6 }}><i className="fa-solid fa-minus" style={{ width: "20px" }}></i> Custom development</li>
                <li style={{ color: "var(--muted)", opacity: 0.6 }}><i className="fa-solid fa-minus" style={{ width: "20px" }}></i> Ongoing maintenance</li>
              </ul>
              <a href="/contact" className="btn-ghost" style={{ width: "100%", textAlign: "center" }}>Get Started</a>
            </div>

            {/* Growth Card */}
            <div className="pricing-card highlighted" style={{
              background: "linear-gradient(#fff, #fff) padding-box, var(--brand-gradient) border-box",
              border: "2px solid transparent",
              borderRadius: "24px",
              padding: "2rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 0 40px rgba(29,201,115,0.15)",
              position: "relative",
              transform: "scale(1.02)",
              zIndex: 10
            }}>
              <div style={{
                position: "absolute",
                top: "-14px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "var(--green)",
                color: "white",
                padding: "6px 20px",
                borderRadius: "20px",
                fontSize: "0.85rem",
                fontWeight: 800
              }}>Most Popular</div>
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🚀</div>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Growth</h3>
              <p style={{ color: "var(--muted)", fontSize: "0.95rem", marginBottom: "1.5rem", lineHeight: 1.6, minHeight: "50px" }}>
                For growing businesses that need multiple automations and integrations.
              </p>
              <div style={{ marginBottom: "2rem" }}>
                <span style={{ fontSize: "2.8rem", fontWeight: 800, letterSpacing: "-1px" }}>${isAnnual ? "399" : "499"}</span>
                <span style={{ color: "var(--muted)", fontSize: "0.9rem" }}> /project</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem 0", flexGrow: 1, display: "flex", flexDirection: "column", gap: "1rem", fontSize: "1rem" }}>
                <li><i className="fa-solid fa-check" style={{ color: "var(--green)", width: "20px" }}></i> Up to 5 automation workflows</li>
                <li><i className="fa-solid fa-check" style={{ color: "var(--green)", width: "20px" }}></i> Unlimited app integrations</li>
                <li><i className="fa-solid fa-check" style={{ color: "var(--green)", width: "20px" }}></i> Make.com, n8n, Power Automate, or UiPath</li>
                <li><i className="fa-solid fa-check" style={{ color: "var(--green)", width: "20px" }}></i> 14-day delivery</li>
                <li><i className="fa-solid fa-check" style={{ color: "var(--green)", width: "20px" }}></i> 30 days of support</li>
                <li><i className="fa-solid fa-check" style={{ color: "var(--green)", width: "20px" }}></i> CRM automation included</li>
                <li style={{ color: "var(--muted)", opacity: 0.6 }}><i className="fa-solid fa-minus" style={{ width: "20px" }}></i> Custom app development</li>
              </ul>
              <a href="/contact" className="cta-btn-grad" style={{ width: "100%", textAlign: "center", justifyContent: "center" }}>Get Started</a>
            </div>

            {/* Enterprise Card */}
            <div className="pricing-card" style={{
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              borderRadius: "24px",
              padding: "2rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
            }}>
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🏢</div>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Enterprise</h3>
              <p style={{ color: "var(--muted)", fontSize: "0.95rem", marginBottom: "1.5rem", lineHeight: 1.6, minHeight: "50px" }}>
                Full-scale automation, custom development, and ongoing partnership.
              </p>
              <div style={{ marginBottom: "2rem", display: "flex", alignItems: "flex-end", height: "56px" }}>
                <span style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-1px" }}>Custom</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem 0", flexGrow: 1, display: "flex", flexDirection: "column", gap: "1rem", fontSize: "1rem" }}>
                <li><i className="fa-solid fa-check" style={{ color: "var(--green)", width: "20px" }}></i> Unlimited automation workflows</li>
                <li><i className="fa-solid fa-check" style={{ color: "var(--green)", width: "20px" }}></i> Full Microsoft 365 / RPA suite</li>
                <li><i className="fa-solid fa-check" style={{ color: "var(--green)", width: "20px" }}></i> Custom app development (web/mobile)</li>
                <li><i className="fa-solid fa-check" style={{ color: "var(--green)", width: "20px" }}></i> Dedicated project manager</li>
                <li><i className="fa-solid fa-check" style={{ color: "var(--green)", width: "20px" }}></i> Ongoing maintenance & support</li>
                <li><i className="fa-solid fa-check" style={{ color: "var(--green)", width: "20px" }}></i> SLA guarantee</li>
                <li><i className="fa-solid fa-check" style={{ color: "var(--green)", width: "20px" }}></i> Team training included</li>
              </ul>
              <a href="/contact" className="btn-ghost" style={{ width: "100%", textAlign: "center" }}>Contact Us</a>
            </div>

          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "3.5rem" }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              background: "var(--glass-bg)",
              border: "none",
              padding: "8px 8px 8px 16px",
              borderRadius: "50px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
              flexWrap: "wrap",
              justifyContent: "center"
            }}>
              <span style={{ fontSize: "1.1rem" }}>🔔</span>
              <span style={{ color: "var(--muted)", fontSize: "0.95rem", fontWeight: 500 }}>
                All prices are starting estimates. Final pricing depends on project complexity.
              </span>
              <Link href="/quote" style={{ 
                background: "var(--text)", 
                color: "white", 
                padding: "8px 16px", 
                borderRadius: "30px", 
                fontSize: "0.9rem", 
                fontWeight: 600,
                textDecoration: "none",
                marginLeft: "8px"
              }}>
                Get a free custom quote →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ░░ FAQ SECTION ░░ */}
      <section className="page" id="faq">
        <div className="container">
          <div className="section-header reveal">
            <span className="eyebrow" style={{ color: "navy" }}>QUESTIONS</span>
            <h2 className="section-title">
              Frequently <span className="text-multicolor">Asked Questions</span>
            </h2>
          </div>
          
          <div className="faq-grid reveal" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 450px), 1fr))",
            gap: "1.5rem",
            marginTop: "3rem"
          }}>
            <div className="faq-card" style={{ padding: "2.5rem", borderRadius: "16px", border: "2px solid transparent", background: "linear-gradient(var(--off, #fff), var(--off, #fff)) padding-box, var(--brand-gradient) border-box", position: "relative", overflow: "hidden" }}>
              <h4 style={{ fontSize: "1.2rem", marginBottom: "1rem", position: "relative", zIndex: 2, color: "var(--text)" }}>How long does a project take?</h4>
              <p style={{ color: "var(--muted)", fontSize: "1rem", lineHeight: 1.6, position: "relative", zIndex: 2, textAlign: "justify", textJustify: "inter-word" }}>
                Most automation projects are delivered in 3-14 days depending on complexity. 
                Custom mobile or web apps typically take 4-8 weeks.
              </p>
            </div>
            
            <div className="faq-card" style={{ padding: "2.5rem", borderRadius: "16px", border: "2px solid transparent", background: "linear-gradient(var(--off, #fff), var(--off, #fff)) padding-box, var(--brand-gradient) border-box", position: "relative", overflow: "hidden" }}>
              <h4 style={{ fontSize: "1.2rem", marginBottom: "1rem", position: "relative", zIndex: 2, color: "var(--text)" }}>Do I need technical knowledge?</h4>
              <p style={{ color: "var(--muted)", fontSize: "1rem", lineHeight: 1.6, position: "relative", zIndex: 2, textAlign: "justify", textJustify: "inter-word" }}>
                Not at all. We handle everything — you just tell us what you want and we translate 
                that into the final automated system.
              </p>
            </div>
            
            <div className="faq-card" style={{ padding: "2.5rem", borderRadius: "16px", border: "2px solid transparent", background: "linear-gradient(var(--off, #fff), var(--off, #fff)) padding-box, var(--brand-gradient) border-box", position: "relative", overflow: "hidden" }}>
              <h4 style={{ fontSize: "1.2rem", marginBottom: "1rem", position: "relative", zIndex: 2, color: "var(--text)" }}>What if I need changes after delivery?</h4>
              <p style={{ color: "var(--muted)", fontSize: "1rem", lineHeight: 1.6, position: "relative", zIndex: 2, textAlign: "justify", textJustify: "inter-word" }}>
                We include a support period with every project. Minor adjustments are covered. 
                For new features, we can quote them as add-ons.
              </p>
            </div>
            
            <div className="faq-card" style={{ padding: "2.5rem", borderRadius: "16px", border: "2px solid transparent", background: "linear-gradient(var(--off, #fff), var(--off, #fff)) padding-box, var(--brand-gradient) border-box", position: "relative", overflow: "hidden" }}>
              <h4 style={{ fontSize: "1.2rem", marginBottom: "1rem", position: "relative", zIndex: 2, color: "var(--text)" }}>Can I pay per hour instead?</h4>
              <p style={{ color: "var(--muted)", fontSize: "1rem", lineHeight: 1.6, position: "relative", zIndex: 2, textAlign: "justify", textJustify: "inter-word" }}>
                Yes. For complex or ongoing projects, we also offer hourly retainer arrangements. 
                Contact us to discuss your specific needs.
              </p>
            </div>
            
            <div className="faq-card" style={{ padding: "2.5rem", borderRadius: "16px", border: "2px solid transparent", background: "linear-gradient(var(--off, #fff), var(--off, #fff)) padding-box, var(--brand-gradient) border-box", position: "relative", overflow: "hidden" }}>
              <h4 style={{ fontSize: "1.2rem", marginBottom: "1rem", position: "relative", zIndex: 2, color: "var(--text)" }}>What&apos;s your refund policy?</h4>
              <p style={{ color: "var(--muted)", fontSize: "1rem", lineHeight: 1.6, position: "relative", zIndex: 2, textAlign: "justify", textJustify: "inter-word" }}>
                We stand behind our work. If we can&apos;t deliver what we promised, you get a full refund. 
                Simple and risk-free.
              </p>
            </div>
            
            <div className="faq-card" style={{ padding: "2.5rem", borderRadius: "16px", border: "2px solid transparent", background: "linear-gradient(var(--off, #fff), var(--off, #fff)) padding-box, var(--brand-gradient) border-box", position: "relative", overflow: "hidden" }}>
              <h4 style={{ fontSize: "1.2rem", marginBottom: "1rem", position: "relative", zIndex: 2, color: "var(--text)" }}>Do you work with international clients?</h4>
              <p style={{ color: "var(--muted)", fontSize: "1rem", lineHeight: 1.6, position: "relative", zIndex: 2, textAlign: "justify", textJustify: "inter-word" }}>
                Absolutely. We serve clients across the US, Europe, and Asia. All projects are 
                managed fully online.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ░░ CTA ░░ */}
      <section className="cta-section" id="pricing-cta">
        <div className="container">
          <div className="cta-outer reveal">
            <div className="cta-mesh-card">
              <div className="cta-mesh-blob mb-1"></div>
              <div className="cta-mesh-blob mb-2"></div>
              <div className="cta-mesh-blob mb-3"></div>
              <div className="cta-mesh-blob mb-4"></div>
              <div className="cta-mesh-overlay"></div>

              <div className="cta-content">
                <p className="eyebrow" style={{ color: "navy" }}>GET STARTED</p>
                <h2 className="section-title">
                  Not sure which <span className="text-multicolor">package is right?</span>
                </h2>
                <p className="section-subtitle-text tight-subtitle">
                  Book a free 30-minute call and we&apos;ll recommend exactly what you need.
                </p>
                <div className="hero-actions" style={{ justifyContent: "center", marginTop: 24 }}>
                  <a href="/contact" className="cta-btn-grad">
                    Book Free Strategy Call <i className="fa-solid fa-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
