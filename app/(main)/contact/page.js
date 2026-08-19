"use client";
import { useState, useEffect } from "react";
import Script from "next/script";
import Navbar from "@/components/Navbar";

export default function ContactPage() {
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    // Delay rendering the heavy calendly widget to avoid blocking page load
    const timer = setTimeout(() => {
      setShowCalendar(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: "submitting", message: "" });
    const formData = new FormData(e.target);
    
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      
      if (res.ok) {
        setStatus({ state: "success", message: "Message sent successfully!" });
        e.target.reset();
      } else {
        setStatus({ state: "error", message: data.error || "Failed to send message." });
      }
    } catch (err) {
      setStatus({ state: "error", message: "Network error. Please try again." });
    }
  };

  return (
    <>
      <Navbar />
      
      {/* =========================================
           HERO SECTION
      ========================================= */}
      <section className="page" id="contact-hero" style={{ paddingTop: "calc(var(--nav-h) + 60px)" }}>
        <div className="container">
          
          <div className="section-header reveal" style={{ textAlign: "center" }}>
            <p className="section-label" style={{ color: "navy", fontWeight: "bold", letterSpacing: "1px", textTransform: "uppercase", fontSize: "0.85rem", marginBottom: "1rem" }}>Get in Touch</p>
            <h1 className="section-title" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.1, marginBottom: "1.5rem" }}>
              Book Your Free<br />
              <span className="gradient-text">Strategy Call</span>
            </h1>
            <p className="section-sub" style={{ margin: "0 auto", color: "var(--muted)", maxWidth: "600px", fontSize: "1.1rem" }}>
              Tell us about your business and the tasks that are eating your team's time. We'll show you exactly how automation can fix it — for free.
            </p>
          </div>

        </div>
      </section>

      {/* =========================================
           CALENDLY SECTION
      ========================================= */}
      <section className="section" style={{ padding: "3rem 1.5rem", backgroundColor: "#f9fafb" }}>
        <div className="container" style={{ marginBottom: "1rem", textAlign: "center" }}>
          <p className="section-label" style={{ color: "navy", fontWeight: "bold", letterSpacing: "1px", textTransform: "uppercase", fontSize: "0.85rem", marginBottom: "1rem" }}>Schedule Instantly</p>
          <h2 className="section-title" style={{ marginBottom: "0.5rem", fontSize: "2rem" }}>Book a Time That Works for You</h2>
          <p className="section-sub" style={{ margin: "0 auto", color: "var(--muted)", marginBottom: "3rem" }}>Pick a slot and we'll call you — no waiting, no back-and-forth.</p>
        </div>
        
        <div style={{ minHeight: "37.5rem", borderRadius: "1rem", overflow: "hidden", backgroundColor: "var(--bg-alt)", boxShadow: "0 10px 40px rgba(0,0,0,0.03)", maxWidth: "62.5rem", margin: "0 auto", height: "43.75rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {!showCalendar ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
              <div className="spinner" style={{ border: "3px solid rgba(0,0,0,0.1)", borderTop: "3px solid var(--green)", borderRadius: "50%", width: "40px", height: "40px", animation: "spin 1s linear infinite" }}></div>
              <p style={{ color: "var(--muted)", fontSize: "0.95rem" }}>Loading Calendar...</p>
              <style jsx>{`
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
              `}</style>
            </div>
          ) : (
            <iframe 
              src="https://calendly.com/hashturns/30min?embed_domain=hashturn.com&embed_type=Inline" 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              title="Select a Date & Time - Calendly"
              loading="lazy"
            ></iframe>
          )}
        </div>
      </section>

      {/* =========================================
           CONTACT FORM SECTION
      ========================================= */}
      <section className="page" style={{ padding: "4rem 0" }}>
        <div className="container">
          <div className="responsive-grid-contact contact-layout reveal">
            
            {/* Left: Form Area */}
            <div className="glass-panel contact-form" style={{ backgroundColor: "#fff", border: "1px solid var(--border)", borderRadius: "16px", boxShadow: "0 10px 40px rgba(0,0,0,0.03)", padding: "2.5rem 2.5rem 1.25rem 2.5rem", height: "fit-content" }}>
              <h3 style={{ fontSize: "1.6rem", fontWeight: "800", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "0.5rem", color: "var(--text)" }}>Send Us a Message</h3>
              <p style={{ color: "var(--muted)", fontSize: "0.95rem", fontFamily: "'Inter', sans-serif", marginBottom: "2.5rem" }}>Fill out the form below and we'll get back to you within 24 hours.</p>
              
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
                <input type="hidden" name="source" value="contact" />
                
                <div className="form-row-grid">
                  <div className="form-group">
                    <label style={{ color: "var(--text)" }}>Your Name <span style={{ color: "var(--red)" }}>*</span></label>
                    <input type="text" name="name" placeholder="John Smith" required />
                  </div>
                  <div className="form-group">
                    <label style={{ color: "var(--text)" }}>Email Address <span style={{ color: "var(--red)" }}>*</span></label>
                    <input type="email" name="email" placeholder="john@company.com" required />
                  </div>
                </div>

                <div className="form-row-grid">
                  <div className="form-group">
                    <label style={{ color: "var(--text)" }}>Company Name</label>
                    <input type="text" name="company" placeholder="Acme Corp" />
                  </div>
                  <div className="form-group">
                    <label style={{ color: "var(--text)" }}>Estimated Budget</label>
                    <select name="budget">
                      <option value="">Select a range</option>
                      <option value="Under $500">Under $500</option>
                      <option value="$500 - $2,000">$500 - $2,000</option>
                      <option value="$2,000 - $5,000">$2,000 - $5,000</option>
                      <option value="$5,000+">$5,000+</option>
                      <option value="Not sure yet">Not sure yet</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label style={{ color: "var(--text)" }}>What service are you interested in? <span style={{ color: "var(--red)" }}>*</span></label>
                  <select name="service" required>
                    <option value="">Select a service</option>
                    <option value="Business Process Automation">Business Process Automation</option>
                    <option value="Robotic Process Automation (RPA)">Robotic Process Automation (RPA)</option>
                    <option value="API & Webhook Integration">API & Webhook Integration</option>
                    <option value="CRM Automation">CRM Automation</option>
                    <option value="Microsoft 365 Solutions">Microsoft 365 Solutions</option>
                    <option value="Mobile & Web Development">Mobile & Web Development</option>
                    <option value="Other">Other / Not Sure</option>
                  </select>
                </div>

                <div className="form-group">
                  <label style={{ color: "var(--text)" }}>Tell Us About Your Project <span style={{ color: "var(--red)" }}>*</span></label>
                  <textarea name="message" rows="5" placeholder="Describe the tasks you want automated, the apps you use, and any challenges you're facing..." required></textarea>
                </div>

                {/* Turnstile UI */}
                {process.env.NODE_ENV === 'development' ? (
                  <div style={{ padding: "10px 15px", border: "1px solid var(--border)", borderRadius: "8px", display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem", minWidth: "300px", backgroundColor: "#fcfcfc" }}>
                    <i className="fa-solid fa-check-circle" style={{ color: "var(--green)", fontSize: "1.5rem" }}></i>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "var(--text)" }}>Success!</span>
                    <div style={{ marginLeft: "auto", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                      <span style={{ fontSize: "0.75rem", color: "#f6821f", fontWeight: "bold", fontFamily: "sans-serif" }}>CLOUDFLARE</span>
                      <span style={{ fontSize: "0.65rem", color: "var(--muted)" }}>Privacy · Terms</span>
                    </div>
                  </div>
                ) : (
                  <div style={{ marginBottom: "1.5rem" }}>
                    <div className="cf-turnstile" data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'} data-theme="light"></div>
                    <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
                  </div>
                )}

                <button type="submit" disabled={status.state === "submitting"} className="btn-solid" style={{ width: "100%", textAlign: "center", display: "block", backgroundColor: "var(--green)", border: "none", color: "#fff", padding: "16px", borderRadius: "10px", fontWeight: "700", fontSize: "1.05rem", cursor: status.state === "submitting" ? "not-allowed" : "pointer", opacity: status.state === "submitting" ? 0.7 : 1, transition: "opacity 0.2s" }}>
                  {status.state === "submitting" ? "Sending..." : "Send Message & Book Free Call"} {status.state !== "submitting" && <i className="fa-solid fa-arrow-right" style={{ marginLeft: "5px" }}></i>}
                </button>
                <div className="form-note" style={{ marginTop: "1rem" }}>
                  <i className="fa-solid fa-lock" style={{ color: "var(--yellow)" }}></i> <span style={{ color: "var(--muted)", marginLeft: "5px" }}>Your information is private and will never be shared. We respond within 24 hours.</span>
                </div>
              </form>
            </div>

            {/* Right: Info Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              
              {/* Card 1: What Happens Next? */}
              <div className="glass-panel" style={{ backgroundColor: "#fff", border: "1px solid var(--border)", borderRadius: "16px", padding: "2rem", boxShadow: "0 10px 40px rgba(0,0,0,0.03)" }}>
                <h4 style={{ fontSize: "1.2rem", fontWeight: "800", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "1.5rem", color: "var(--text)" }}>What Happens Next?</h4>
                
                <div style={{ display: "flex", gap: "1.2rem", marginBottom: "1.5rem" }}>
                  <div style={{ minWidth: "32px", height: "32px", borderRadius: "50%", backgroundColor: "var(--green)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.95rem", fontWeight: "bold" }}>1</div>
                  <div>
                    <h5 style={{ fontWeight: "700", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1rem", marginBottom: "0.3rem", color: "var(--text)" }}>We review your message</h5>
                    <p style={{ color: "var(--muted)", fontSize: "0.9rem", fontFamily: "'Inter', sans-serif", lineHeight: 1.6 }}>Within 24 hours, our team reads your project details carefully.</p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "1.2rem", marginBottom: "1.5rem" }}>
                  <div style={{ minWidth: "32px", height: "32px", borderRadius: "50%", backgroundColor: "var(--green)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.95rem", fontWeight: "bold" }}>2</div>
                  <div>
                    <h5 style={{ fontWeight: "700", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1rem", marginBottom: "0.3rem", color: "var(--text)" }}>Free strategy call</h5>
                    <p style={{ color: "var(--muted)", fontSize: "0.9rem", fontFamily: "'Inter', sans-serif", lineHeight: 1.6 }}>We schedule a 30-minute call to discuss your needs and ask questions.</p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "1.2rem" }}>
                  <div style={{ minWidth: "32px", height: "32px", borderRadius: "50%", backgroundColor: "var(--green)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.95rem", fontWeight: "bold" }}>3</div>
                  <div>
                    <h5 style={{ fontWeight: "700", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1rem", marginBottom: "0.3rem", color: "var(--text)" }}>Custom proposal</h5>
                    <p style={{ color: "var(--muted)", fontSize: "0.9rem", fontFamily: "'Inter', sans-serif", lineHeight: 1.6 }}>You receive a clear plan with timeline, deliverables, and fixed pricing.</p>
                  </div>
                </div>
              </div>

              {/* Card 2: Why Work With Us? */}
              <div className="glass-panel" style={{ backgroundColor: "#0e0e0e", color: "#fff", borderRadius: "16px", padding: "2.5rem 2rem", boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}>
                <h4 style={{ fontSize: "1.2rem", fontWeight: "800", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "1.8rem" }}>Why Work With Us?</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                  <li style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <i className="fa-solid fa-star" style={{ color: "var(--yellow)", fontSize: "1.1rem" }}></i>
                    <span style={{ color: "rgba(255,255,255,0.9)" }}>5-star rated on Fiverr (200+ reviews)</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <i className="fa-solid fa-check" style={{ color: "var(--green)", fontSize: "1.1rem" }}></i>
                    <span style={{ color: "rgba(255,255,255,0.9)" }}>200+ automation projects delivered</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <i className="fa-solid fa-bolt" style={{ color: "var(--red)", fontSize: "1.1rem" }}></i>
                    <span style={{ color: "rgba(255,255,255,0.9)" }}>Most projects start within 48 hours</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <i className="fa-solid fa-sack-dollar" style={{ color: "var(--yellow)", fontSize: "1.1rem" }}></i>
                    <span style={{ color: "rgba(255,255,255,0.9)" }}>Fixed pricing — no hidden fees</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <i className="fa-solid fa-globe" style={{ color: "var(--blue)", fontSize: "1.1rem" }}></i>
                    <span style={{ color: "rgba(255,255,255,0.9)" }}>Serving clients worldwide</span>
                  </li>
                </ul>
              </div>

              {/* Card 3: Prefer Email? */}
              <div className="glass-panel" style={{ backgroundColor: "#fff", border: "1px solid var(--border)", borderRadius: "16px", padding: "2rem", boxShadow: "0 10px 40px rgba(0,0,0,0.03)" }}>
                <h4 style={{ fontSize: "1.2rem", fontWeight: "800", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "0.8rem", color: "var(--text)" }}>Prefer Email?</h4>
                <p style={{ color: "var(--muted)", fontSize: "0.95rem", fontFamily: "'Inter', sans-serif", marginBottom: "1.5rem" }}>You can also reach us directly at:</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <a href="mailto:hello@hashturn.com" style={{ display: "flex", alignItems: "center", gap: "0.8rem", color: "var(--green)", fontWeight: "600", fontFamily: "'Inter', sans-serif", fontSize: "1rem", textDecoration: "none" }}>
                    <i className="fa-regular fa-envelope"></i> hello@hashturn.com
                  </a>
                  <a href="mailto:hello@hashturn.net" style={{ display: "flex", alignItems: "center", gap: "0.8rem", color: "var(--green)", fontWeight: "600", fontFamily: "'Inter', sans-serif", fontSize: "1rem", textDecoration: "none" }}>
                    <i className="fa-regular fa-envelope"></i> hello@hashturn.net
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
