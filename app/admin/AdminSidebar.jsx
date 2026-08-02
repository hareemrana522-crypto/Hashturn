"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { id: "dashboard", label: "Dashboard", href: "/admin/dashboard", icon: "■" },
  { id: "blog", label: "Blog Posts", href: "/admin/blog", icon: "✎" },
  { id: "team", label: "Team", href: "/admin/team", icon: "👥" },
  { id: "reviews", label: "Reviews", href: "/admin/reviews", icon: "⭐" },
  { id: "projects", label: "Projects", href: "/admin/projects", icon: "📁" },
  { id: "submissions", label: "Submissions", href: "/admin/submissions", icon: "✉" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });
      if (res.ok) {
        router.push("/admin/login");
        router.refresh();
      }
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <aside className="sidebar" id="sidebar">
      <Link href="/admin/dashboard" className="sidebar__logo">
        <span className="sidebar__logo-mark">
          <span className="slm-r"></span>
          <span className="slm-g"></span>
          <span className="slm-y"></span>
          <span className="slm-b"></span>
        </span>
        <span>
          <span className="sidebar__logo-text">HASHTURN</span>
          <span className="sidebar__logo-badge">Admin Panel</span>
        </span>
      </Link>

      <nav className="sidebar__nav">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              className={isActive ? "active" : ""}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar__footer">
        <form onSubmit={handleLogout}>
          <button type="submit">→ Sign Out</button>
        </form>
        <a href="/" className="sidebar__view-site" target="_blank" rel="noreferrer">
          ↗ View Website
        </a>
      </div>
    </aside>
  );
}
