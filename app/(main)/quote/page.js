"use client";
import { useState } from 'react';
import Script from 'next/script';

export default function QuotePage() {
  const [status, setStatus] = useState({ state: "idle", message: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ state: "submitting", message: "" });

    const formData = new FormData(e.target);
    if (formData.get("_honey")) {
      return setStatus({ state: "success", message: "Quote request received." });
    }

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      if (res.ok) {
        setStatus({ state: "success", message: "Request sent successfully! We'll be in touch." });
        e.target.reset();
      } else {
        setStatus({ state: "error", message: data.error || "Something went wrong." });
      }
    } catch (err) {
      setStatus({ state: "error", message: "Failed to send request. Please try again." });
    }
  }

  return (
    <>
      <section className="page" id="quote-hero" style={{ paddingTop: 180, paddingBottom: 100, backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="hero-content reveal" style={{ maxWidth: 800, margin: "0 auto", width: "100%", textAlign: "center" }}>
            <p className="eyebrow" style={{ color: "var(--green)", fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "1px", fontWeight: "700", textTransform: "uppercase", marginBottom: "15px" }}>FREE QUOTE</p>
            <h1 className="hero-title" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: "800", marginBottom: 20, fontSize: "clamp(2.5rem, 4vw, 4rem)", lineHeight: 1.2, color: "var(--foreground)" }}>
              Get a Custom Quote<br />
              <span className="text-multicolor">in 24 Hours</span>
            </h1>
            <p className="hero-sub reveal" style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.1rem", lineHeight: 1.7, color: "var(--muted)", maxWidth: "600px", margin: "0 auto" }}>
              Tell us what you need automated and we'll send you a clear plan, timeline, and fixed price — no obligation.
            </p>
          </div>
        </div>
      </section>

      <section className="page" id="quote-form" style={{ paddingBottom: 120, paddingTop: 40, backgroundColor: "var(--white)" }}>
        <div className="container">
          <div className="responsive-grid-quote">
            
            {/* Left: Form */}
            <div className="glass-panel contact-form" style={{ backgroundColor: "#fff", border: "1px solid var(--border)", borderRadius: "16px", boxShadow: "0 10px 40px rgba(0,0,0,0.03)", padding: "2.5rem 2.5rem 1.25rem 2.5rem", height: "fit-content" }}>
              <h3 style={{ fontSize: "1.6rem", fontWeight: "800", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "0.5rem", color: "var(--text)" }}>Project Details</h3>
              <p style={{ color: "var(--muted)", fontSize: "0.95rem", fontFamily: "'Inter', sans-serif", marginBottom: "2.5rem" }}>The more detail you provide, the more accurate your quote will be.</p>
              
              {status.state === "success" && (
                <div style={{ padding: "12px 16px", backgroundColor: "rgba(0, 177, 64, 0.1)", color: "var(--green)", border: "1px solid var(--green)", borderRadius: "8px", marginBottom: "1.5rem", fontSize: "0.95rem", fontWeight: "600" }}>
                  <i className="fa-solid fa-check-circle" style={{ marginRight: "8px" }}></i>
                  {status.message}
                </div>
              )}

              {status.state === "error" && (
                <div style={{ padding: "12px 16px", backgroundColor: "rgba(232, 25, 44, 0.1)", color: "var(--red)", border: "1px solid var(--red)", borderRadius: "8px", marginBottom: "1.5rem", fontSize: "0.95rem", fontWeight: "600" }}>
                  <i className="fa-solid fa-triangle-exclamation" style={{ marginRight: "8px" }}></i>
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <input type="text" name="_honey" style={{ display: "none" }} tabIndex="-1" autoComplete="off" />
                <input type="hidden" name="source" value="quote" />
                
                <div className="form-row-grid">
                  <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text)" }}>Your Name <span style={{ color: "var(--red)" }}>*</span></label>
                    <input type="text" name="name" placeholder="John Smith" style={{ padding: "0.8rem 1rem", borderRadius: "8px", border: "1px solid var(--border)", outline: "none", fontFamily: "'Inter', sans-serif" }} required />
                  </div>
                  <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text)" }}>Email Address <span style={{ color: "var(--red)" }}>*</span></label>
                    <input type="email" name="email" placeholder="john@company.com" style={{ padding: "0.8rem 1rem", borderRadius: "8px", border: "1px solid var(--border)", outline: "none", fontFamily: "'Inter', sans-serif" }} required />
                  </div>
                </div>

                <div className="form-row-grid">
                  <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text)" }}>Company Name</label>
                    <input type="text" name="company" placeholder="Acme Corp" style={{ padding: "0.8rem 1rem", borderRadius: "8px", border: "1px solid var(--border)", outline: "none", fontFamily: "'Inter', sans-serif" }} />
                  </div>
                  <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text)" }}>Estimated Budget</label>
                    <select name="budget" style={{ padding: "0.8rem 1rem", borderRadius: "8px", border: "1px solid var(--border)", outline: "none", fontFamily: "'Inter', sans-serif", backgroundColor: "#fff" }}>
                      <option value="">Select a range</option>
                      <option value="Under $500">Under $500</option>
                      <option value="$500 - $2,000">$500 - $2,000</option>
                      <option value="$2,000 - $5,000">$2,000 - $5,000</option>
                      <option value="$5,000+">$5,000+</option>
                      <option value="Not sure yet">Not sure yet</option>
                    </select>
                  </div>
                </div>

                <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1.25rem" }}>
                  <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text)" }}>Service Type <span style={{ color: "var(--red)" }}>*</span></label>
                  <select name="service" style={{ padding: "0.8rem 1rem", borderRadius: "8px", border: "1px solid var(--border)", outline: "none", fontFamily: "'Inter', sans-serif", backgroundColor: "#fff" }} required>
                    <option value="">Select a service</option>
                    <option value="Business Process Automation">Business Process Automation</option>
                    <option value="Robotic Process Automation (RPA)">Robotic Process Automation (RPA)</option>
                    <option value="API & Webhook Integration">API & Webhook Integration</option>
                    <option value="CRM Automation">CRM Automation</option>
                    <option value="Microsoft 365 Solutions">Microsoft 365 Solutions</option>
                    <option value="Mobile & Web Development">Mobile & Web Development</option>
                    <option value="Other / Not Sure">Other / Not Sure</option>
                  </select>
                </div>

                <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1.25rem" }}>
                  <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text)" }}>Tools/Apps Involved</label>
                  <input type="text" name="apps" placeholder="e.g. HubSpot, QuickBooks, Google Sheets, Shopify..." style={{ padding: "0.8rem 1rem", borderRadius: "8px", border: "1px solid var(--border)", outline: "none", fontFamily: "'Inter', sans-serif" }} />
                </div>

                <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1.25rem" }}>
                  <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text)" }}>Describe Your Project <span style={{ color: "var(--red)" }}>*</span></label>
                  <textarea name="message" rows="5" placeholder="What process do you want to automate? What apps are involved? What does the current manual process look like? What would the ideal automated version do?" style={{ padding: "0.8rem 1rem", borderRadius: "8px", border: "1px solid var(--border)", outline: "none", fontFamily: "'Inter', sans-serif", resize: "vertical" }} required></textarea>
                </div>

                <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "2rem" }}>
                  <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text)" }}>Desired Timeline</label>
                  <select name="timeline" style={{ padding: "0.8rem 1rem", borderRadius: "8px", border: "1px solid var(--border)", outline: "none", fontFamily: "'Inter', sans-serif", backgroundColor: "#fff" }}>
                    <option value="">Select a timeline</option>
                    <option value="As soon as possible">As soon as possible</option>
                    <option value="1-2 weeks">1-2 weeks</option>
                    <option value="Within a month">Within a month</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>

                <div style={{ marginTop: "20px" }}>
                  {/* Cloudflare Turnstile removed from this page */}
                </div>

                <button type="submit" disabled={status.state === "submitting"} className="btn-solid" style={{ width: "100%", textAlign: "center", display: "block", backgroundColor: "var(--green)", border: "none", color: "#fff", padding: "16px", borderRadius: "10px", fontWeight: "700", fontSize: "1.05rem", cursor: status.state === "submitting" ? "not-allowed" : "pointer", opacity: status.state === "submitting" ? 0.7 : 1, transition: "opacity 0.2s" }}>
                  {status.state === "submitting" ? "Sending..." : "Submit Quote Request"} {status.state !== "submitting" && <i className="fa-solid fa-arrow-right" style={{ marginLeft: "5px" }}></i>}
                </button>
                <div className="form-note" style={{ marginTop: "1rem", textAlign: "center", fontSize: "0.85rem" }}>
                  <i className="fa-solid fa-lock" style={{ color: "var(--yellow)" }}></i> <span style={{ color: "var(--muted)", marginLeft: "5px" }}>We respond within 24 hours. No spam, no pressure.</span>
                </div>
              </form>
            </div>

            {/* Right: Info Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              
              {/* Card 1: What's Included */}
              <div className="glass-panel" style={{ backgroundColor: "#fff", border: "1px solid var(--border)", borderRadius: "16px", padding: "2rem", boxShadow: "0 10px 40px rgba(0,0,0,0.03)" }}>
                <h4 style={{ fontSize: "1.1rem", fontWeight: "800", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "1.5rem", color: "var(--text)" }}>What's Included in Your Quote</h4>
                
                <ul style={{ listStyle: "none", padding: 0, margin: 0, fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                  <li style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                    <i className="fa-solid fa-square-check" style={{ color: "var(--green)", fontSize: "1.2rem" }}></i>
                    <span style={{ color: "var(--muted)" }}>Detailed scope of work</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                    <i className="fa-solid fa-square-check" style={{ color: "var(--green)", fontSize: "1.2rem" }}></i>
                    <span style={{ color: "var(--muted)" }}>Fixed price <span style={{ fontSize: "0.85em" }}>(no hidden fees)</span></span>
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                    <i className="fa-solid fa-square-check" style={{ color: "var(--green)", fontSize: "1.2rem" }}></i>
                    <span style={{ color: "var(--muted)" }}>Clear delivery timeline</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                    <i className="fa-solid fa-square-check" style={{ color: "var(--green)", fontSize: "1.2rem" }}></i>
                    <span style={{ color: "var(--muted)" }}>Technology recommendations</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                    <i className="fa-solid fa-square-check" style={{ color: "var(--green)", fontSize: "1.2rem" }}></i>
                    <span style={{ color: "var(--muted)" }}>Estimated hours saved per month</span>
                  </li>
                </ul>
              </div>

              {/* Card 2: Prefer a Call? */}
              <div className="glass-panel" style={{ backgroundColor: "#fff", border: "1px solid var(--border)", borderRadius: "16px", padding: "2rem", boxShadow: "0 10px 40px rgba(0,0,0,0.03)" }}>
                <h4 style={{ fontSize: "1.1rem", fontWeight: "800", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "0.8rem", color: "var(--text)" }}>Prefer a Call?</h4>
                <p style={{ color: "var(--muted)", fontSize: "0.95rem", fontFamily: "'Inter', sans-serif", marginBottom: "1.5rem", lineHeight: 1.6 }}>Schedule a free 30-minute strategy call and we'll discuss your project live.</p>
                <a href="/contact" style={{ display: "block", textAlign: "center", backgroundColor: "var(--green)", color: "#fff", padding: "12px", borderRadius: "8px", fontWeight: "600", textDecoration: "none", fontFamily: "'Inter', sans-serif" }}>
                  Book Free Call
                </a>
              </div>

              {/* Card 3: Why HashTurn? */}
              <div className="glass-panel" style={{ backgroundColor: "#0e0e0e", color: "#fff", borderRadius: "16px", padding: "2rem", boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}>
                <h4 style={{ fontSize: "1.1rem", fontWeight: "800", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "1.5rem" }}>Why HashTurn?</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <li style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                    <i className="fa-solid fa-star" style={{ color: "var(--yellow)" }}></i>
                    <span style={{ color: "rgba(255,255,255,0.9)" }}>5-star rated — 200+ Fiverr reviews</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                    <i className="fa-solid fa-bolt" style={{ color: "var(--red)" }}></i>
                    <span style={{ color: "rgba(255,255,255,0.9)" }}>Most projects start within 48 hours</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                    <i className="fa-solid fa-sack-dollar" style={{ color: "var(--yellow)" }}></i>
                    <span style={{ color: "rgba(255,255,255,0.9)" }}>Fixed pricing, no surprises</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                    <i className="fa-solid fa-globe" style={{ color: "var(--blue)" }}></i>
                    <span style={{ color: "rgba(255,255,255,0.9)" }}>Serving clients in 20+ countries</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
