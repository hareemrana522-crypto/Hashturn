export const metadata = {
  title: 'Contact | HashTurn',
  description: 'Book your free strategy call and learn how automation can save your team hours every week.',
};

export default function ContactPage() {
  return (
    <>
      {/* =========================================
           HERO SECTION
      ========================================= */}
      <section className="page" id="contact-hero" style={{ paddingTop: 180, paddingBottom: 100, backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="hero-content reveal" style={{ maxWidth: 800, margin: "0 auto", width: "100%", textAlign: "center" }}>
            <p className="eyebrow" style={{ color: "var(--green)", fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "1px", fontWeight: "700", textTransform: "uppercase", marginBottom: "15px" }}>GET IN TOUCH</p>
            <h1 className="hero-title" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: "800", marginBottom: 20, fontSize: "clamp(2.5rem, 4vw, 4rem)", lineHeight: 1.2, color: "var(--foreground)" }}>
              Book Your Free<br />
              <span className="text-multicolor">Strategy Call</span>
            </h1>
            <p className="hero-sub reveal" style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.1rem", lineHeight: 1.7, color: "var(--muted)", maxWidth: "600px", margin: "0 auto" }}>
              Tell us about your business and the tasks that are eating your team's time. We'll show you exactly how automation can fix it — for free.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
           MEETING SECTION
      ========================================= */}
      <section className="page" id="meeting" style={{ padding: "120px 0", backgroundColor: "var(--white)" }}>
        <div className="container" style={{ textAlign: "center" }}>
           <p className="eyebrow" style={{ color: "var(--green)", fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "1px", fontWeight: "700", textTransform: "uppercase", marginBottom: "15px" }}>SCHEDULE INSTANTLY</p>
           <h2 className="section-title" style={{ color: "var(--text)" }}>Book a Time That Works for You</h2>
           <p className="section-desc" style={{ marginBottom: "50px", color: "var(--muted)" }}>Pick a slot and we'll call you — no waiting, no back-and-forth.</p>
           
           <div style={{ minHeight: "600px", border: "2px dashed var(--border)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--bg-alt)" }}>
             <p style={{ color: "var(--muted)", fontFamily: "'Inter', sans-serif" }}>[ Calendly Widget Will Go Here ]</p>
           </div>
        </div>
      </section>

      {/* =========================================
           CONTACT FORM SECTION
      ========================================= */}
      <section className="page" id="contact-form" style={{ paddingBottom: 120, backgroundColor: "var(--white)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "3rem", alignItems: "start" }}>
            
            {/* Left: Form */}
            <div className="glass-panel contact-form" style={{ backgroundColor: "#fff", border: "1px solid var(--border)", borderRadius: "16px", boxShadow: "0 10px 40px rgba(0,0,0,0.03)" }}>
              <h3 style={{ fontSize: "1.6rem", fontWeight: "800", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "0.5rem", color: "var(--text)" }}>Send Us a Message</h3>
              <p style={{ color: "var(--muted)", fontSize: "0.95rem", fontFamily: "'Inter', sans-serif", marginBottom: "2.5rem" }}>Fill out the form below and we'll get back to you within 24 hours.</p>
              
              <form>
                <div className="form-row">
                  <div className="form-group">
                    <label style={{ color: "var(--text)" }}>Your Name <span style={{ color: "var(--red)" }}>*</span></label>
                    <input type="text" placeholder="John Smith" />
                  </div>
                  <div className="form-group">
                    <label style={{ color: "var(--text)" }}>Email Address <span style={{ color: "var(--red)" }}>*</span></label>
                    <input type="email" placeholder="john@company.com" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label style={{ color: "var(--text)" }}>Company Name</label>
                    <input type="text" placeholder="Acme Corp" />
                  </div>
                  <div className="form-group">
                    <label style={{ color: "var(--text)" }}>Estimated Budget</label>
                    <select>
                      <option>Select a range</option>
                      <option>$1k - $5k</option>
                      <option>$5k - $10k</option>
                      <option>$10k+</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label style={{ color: "var(--text)" }}>What service are you interested in? <span style={{ color: "var(--red)" }}>*</span></label>
                  <select>
                    <option>Select a service</option>
                    <option>Business Process Automation</option>
                    <option>Robotic Process Automation</option>
                    <option>API & Webhook Integration</option>
                    <option>CRM Automation</option>
                  </select>
                </div>

                <div className="form-group">
                  <label style={{ color: "var(--text)" }}>Tell Us About Your Project <span style={{ color: "var(--red)" }}>*</span></label>
                  <textarea rows="5" placeholder="Describe the tasks you want automated, the apps you use, and any challenges you're facing..."></textarea>
                </div>

                {/* Turnstile placeholder */}
                <div style={{ padding: "10px 15px", border: "1px solid var(--border)", borderRadius: "8px", display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem", minWidth: "300px", backgroundColor: "#fcfcfc" }}>
                  <i className="fa-solid fa-check-circle" style={{ color: "var(--green)", fontSize: "1.5rem" }}></i>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "var(--text)" }}>Success!</span>
                  <div style={{ marginLeft: "auto", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                    <span style={{ fontSize: "0.75rem", color: "#f6821f", fontWeight: "bold", fontFamily: "sans-serif" }}>CLOUDFLARE</span>
                    <span style={{ fontSize: "0.65rem", color: "var(--muted)" }}>Privacy · Terms</span>
                  </div>
                </div>

                <button type="button" className="btn-solid" style={{ width: "100%", textAlign: "center", display: "block", backgroundColor: "var(--green)", border: "none", color: "#fff", padding: "16px", borderRadius: "10px", fontWeight: "700", fontSize: "1.05rem", cursor: "pointer", transition: "opacity 0.2s" }}>
                  Send Message & Book Free Call <i className="fa-solid fa-arrow-right" style={{ marginLeft: "5px" }}></i>
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
