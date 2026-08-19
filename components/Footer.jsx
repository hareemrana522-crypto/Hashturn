const SERVICE_LINKS = [
  { href: "/services#business-process-automation", label: "Business Process Automation", color: "var(--red)" },
  { href: "/services#robotic-process-automation-rpa", label: "Robotic Process Automation", color: "var(--blue)" },
  { href: "/services#api-webhook-integration", label: "API & Webhook Integration", color: "var(--green)" },
  { href: "/services#crm-automation", label: "CRM Automation", color: "var(--yellow)" },
  { href: "/services#microsoft-365-solutions", label: "Microsoft 365 Solutions", color: "var(--red)" },
  { href: "/services#mobile-web-development", label: "Mobile & Web Development", color: "var(--blue)" },
];

const COMPANY_LINKS = [
  { href: "/about", label: "About Us", color: "var(--green)" },
  { href: "/pricing", label: "Pricing", color: "var(--yellow)" },
  { href: "/blog", label: "Blog", color: "var(--red)" },
  { href: "/quote", label: "Get a Quote", color: "var(--blue)" },
  { href: "/contact", label: "Contact", color: "var(--green)" },
];

const SOCIALS = [
  { icon: "fa-brands fa-facebook-f", color: "#1877F2", label: "Facebook", href: "https://www.facebook.com/hashturnofficial/" },
  { icon: "fa-brands fa-linkedin-in", color: "#0A66C2", label: "LinkedIn", href: "https://www.linkedin.com/company/hashturn/" },
  { icon: "fa-brands fa-medium-m", color: "#00AB6C", label: "Medium", href: "https://medium.com/@hashturnofficial" },
  { icon: "fa-brands fa-whatsapp", color: "#25D366", label: "WhatsApp", href: "https://api.whatsapp.com/send/?phone=923090483683&text&type=phone_number&app_absent=0" },
];

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <div className="footer-grad-bar"></div>
      <div className="footer-mesh">
        <div className="footer-mesh-blob fmb-1"></div>
        <div className="footer-mesh-blob fmb-2"></div>
        <div className="footer-mesh-blob fmb-3"></div>
      </div>

      <div className="container footer-grid">
        <div className="footer-brand-col">
          <div className="nav-logo">
            <div className="logo-mark">
              <Image src="/logo.png.png" alt="Hashturn Logo" width={36} height={36} style={{ objectFit: 'contain' }} />
            </div>
            <span className="logo-text">HASHTURN</span>
          </div>

          <h3 className="footer-tagline">
            We automate the work.
            <br />
            You run the business.
          </h3>
          <p className="footer-desc">
            Custom automation solutions for businesses ready to stop wasting
            time on manual tasks.
          </p>

          <div className="footer-socials">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href || "#"}
                className="footer-social-icon"
                style={{ "--sc": s.color }}
                aria-label={s.label}
              >
                <i className={s.icon}></i>
              </a>
            ))}
          </div>

          <a href="/contact" className="footer-cta-btn">
            Book Free Strategy Call
          </a>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-col-title">Services</h4>
          {SERVICE_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="footer-link"
              style={{ "--lc": s.color }}
            >
              {s.label}
            </a>
          ))}
        </div>

        <div className="footer-links-col">
          <h4 className="footer-col-title">Company</h4>
          {COMPANY_LINKS.map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="footer-link"
              style={{ "--lc": c.color }}
            >
              {c.label}
            </a>
          ))}
        </div>

        <div className="footer-links-col">
          <h4 className="footer-col-title">Contact</h4>
          <a href="mailto:hello@hashturn.com" className="footer-contact-item">
            <i className="fa-solid fa-envelope"></i> hello@hashturn.com
          </a>
          <a href="mailto:hello@hashturn.net" className="footer-contact-item">
            <i className="fa-solid fa-envelope"></i> hello@hashturn.net
          </a>
          <a
            href="/contact"
            className="footer-contact-item footer-contact-highlight"
          >
            <i className="fa-solid fa-bolt"></i> Get a Free Quote
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© 2026 HashTurn · All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <span>·</span>
            <a href="#">Terms of Service</a>
            <span>·</span>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
