import "../admin.css";
import AdminSidebar from "../AdminSidebar";

export const metadata = {
  title: "HashTurn Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }) {
  return (
    <div className="admin-body-wrapper">
      <AdminSidebar />
      <div className="admin-main">
        <header className="admin-topbar">
          <span className="admin-topbar__title">HashTurn Admin Panel</span>
          <div className="admin-topbar__actions">
          </div>
        </header>

        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}
