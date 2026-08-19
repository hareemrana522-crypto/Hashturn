"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("");

  /* ── Sticky nav ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Active nav highlight on scroll (scroll-spy) ── */
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    if (!sections.length) return;

    const sectionIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    sections.forEach((s) => sectionIO.observe(s));
    return () => sectionIO.disconnect();
  }, []);

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`} id="navbar">
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          <div className="logo-mark">
            <Image src="/logo.png.png" alt="Hashturn Logo" width={55} height={55} style={{ objectFit: 'contain' }} />
          </div>
          <span className="logo-text" style={{ color: "#000", fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, letterSpacing: "1px" }}>HASHTURN</span>
        </Link>

        <ul className={`nav-links${open ? " open" : ""}`} id="navLinks">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`nav-link${
                  activeId === link.href.replace("#", "") ? " active-link" : ""
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/contact" className="nav-cta button1">Get Free Quote</Link>

        <button
          className="hamburger"
          id="hamburger"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
