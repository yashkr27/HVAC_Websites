import {
  Activity,
  Bell,
  Calendar,
  ChevronRight,
  ClipboardList,
  LogOut,
  Settings,
  Shield,
  User,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";
import logoWebp from "../assets/logo.webp";
import { pageStyles } from "../components/siteData.js";

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const user = { name: "Amanda Rodriguez", email: "amanda.r@email.com", phone: "(708) 555-0198", address: "123 Maple Dr, Homer Glen, IL 60491" };

const appointments = [
  { id: "APT-001", service: "Annual AC Tune-Up", date: "Jun 12, 2026", time: "10:00 AM", status: "Confirmed", tech: "Mike D." },
  { id: "APT-002", service: "Filter Replacement", date: "Jul 8, 2026", time: "2:00 PM", status: "Scheduled", tech: "Sarah K." },
];

const requests = [
  { id: "REQ-044", service: "AC Not Cooling Properly", submitted: "May 28, 2026", status: "Completed", note: "Refrigerant topped off, coils cleaned." },
  { id: "REQ-039", service: "Strange Furnace Noise", submitted: "Jan 15, 2026", status: "Completed", note: "Blower motor bearing replaced." },
  { id: "REQ-052", service: "Thermostat Issue", submitted: "Jun 1, 2026", status: "In Review", note: "Technician will confirm timing." },
];

const plan = {
  name: "Gold Maintenance Plan",
  renewsOn: "Oct 1, 2026",
  includes: ["2 seasonal tune-ups/year", "Priority scheduling", "10% off all repairs", "Annual filter replacements", "No emergency service fee"],
};

const activity = [
  { icon: Wrench, label: "AC Tune-Up completed", date: "May 15, 2026", detail: "Technician: Mike D." },
  { icon: ClipboardList, label: "Service request submitted", date: "Jun 1, 2026", detail: "Thermostat issue" },
  { icon: Calendar, label: "Appointment scheduled", date: "Jun 2, 2026", detail: "Jun 12 — AC Tune-Up" },
  { icon: Shield, label: "Maintenance plan renewed", date: "Oct 1, 2025", detail: "Gold Plan — 1 year" },
];

// ─── Status Badge ─────────────────────────────────────────────────────────────
function Badge({ status }) {
  const colors = {
    Confirmed: { bg: "rgba(0,0,0,0.08)", text: "#000" },
    Scheduled: { bg: "rgba(0,0,0,0.05)", text: "rgba(0,0,0,0.65)" },
    Completed: { bg: "rgba(34,197,94,0.12)", text: "#166534" },
    "In Review": { bg: "rgba(234,179,8,0.12)", text: "#854d0e" },
  };
  const c = colors[status] || colors.Scheduled;
  return (
    <span
      style={{
        background: c.bg,
        color: c.text,
        fontSize: "12px",
        fontWeight: 600,
        padding: "4px 10px",
        borderRadius: "9999px",
        whiteSpace: "nowrap",
      }}
    >
      {status}
    </span>
  );
}

// ─── Card wrapper ─────────────────────────────────────────────────────────────
function Card({ children, style = {} }) {
  return (
    <div style={{ ...pageStyles.card, ...style }}>
      {children}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2
      style={{
        fontSize: "18px",
        fontWeight: 600,
        color: "#000",
        letterSpacing: "-0.02em",
        margin: "0 0 20px",
        fontFamily: "'TT Norms Pro', sans-serif",
      }}
    >
      {children}
    </h2>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const navItems = [
  [Calendar, "Appointments", "#appointments"],
  [ClipboardList, "Service Requests", "#requests"],
  [Shield, "Maintenance Plan", "#plan"],
  [Activity, "Recent Activity", "#activity"],
  [User, "Account", "#account"],
];

function Sidebar() {
  return (
    <aside
      style={{
        width: "240px",
        flexShrink: 0,
        background: "#fff",
        borderRight: "1px solid rgba(0,0,0,0.07)",
        display: "flex",
        flexDirection: "column",
        padding: "28px 0",
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
      }}
      className="dash-sidebar"
    >
      <div style={{ padding: "0 20px 28px" }}>
        <Link to="/">
          <img src={logoWebp} alt="AAA Heating & Air" style={{ height: "32px", objectFit: "contain" }} />
        </Link>
      </div>
      <nav style={{ flex: 1 }}>
        {navItems.map(([Icon, label, href]) => (
          <a
            key={label}
            href={href}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "11px 20px",
              color: "rgba(0,0,0,0.65)",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
              fontFamily: "'TT Norms Pro', sans-serif",
              transition: "color 0.2s, background 0.2s",
              borderRadius: "8px",
              margin: "0 8px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0,0,0,0.04)";
              e.currentTarget.style.color = "#000";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "none";
              e.currentTarget.style.color = "rgba(0,0,0,0.65)";
            }}
          >
            <Icon size={16} />
            {label}
          </a>
        ))}
      </nav>
      <div style={{ borderTop: "1px solid rgba(0,0,0,0.07)", padding: "16px 20px 0", display: "flex", flexDirection: "column", gap: "4px" }}>
        <a
          href="#settings"
          style={{
            display: "flex", alignItems: "center", gap: "12px",
            padding: "10px 12px", color: "rgba(0,0,0,0.5)", textDecoration: "none",
            fontSize: "14px", borderRadius: "8px", fontFamily: "'TT Norms Pro', sans-serif",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#000"; e.currentTarget.style.background = "rgba(0,0,0,0.04)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(0,0,0,0.5)"; e.currentTarget.style.background = "none"; }}
        >
          <Settings size={15} /> Settings
        </a>
        <Link
          to="/"
          style={{
            display: "flex", alignItems: "center", gap: "12px",
            padding: "10px 12px", color: "rgba(0,0,0,0.5)", textDecoration: "none",
            fontSize: "14px", borderRadius: "8px", fontFamily: "'TT Norms Pro', sans-serif",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#000"; e.currentTarget.style.background = "rgba(0,0,0,0.04)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(0,0,0,0.5)"; e.currentTarget.style.background = "none"; }}
        >
          <LogOut size={15} /> Sign Out
        </Link>
      </div>
    </aside>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
export default function Dashboard() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#F5F5F5",
        fontFamily: "'TT Norms Pro', sans-serif",
      }}
    >
      <style>{`
        @media (max-width: 840px) {
          .dash-sidebar { display: none !important; }
        }
        @media (max-width: 640px) {
          .dash-main { padding: 24px 16px !important; }
        }
      `}</style>

      <Sidebar />

      {/* Main Content */}
      <main
        className="dash-main"
        style={{
          flex: 1,
          padding: "40px 40px",
          overflowY: "auto",
          maxWidth: "960px",
        }}
      >
        {/* Welcome Header */}
        <div
          style={{
            background: "#000",
            borderRadius: "20px",
            padding: "36px 40px",
            marginBottom: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
                marginBottom: "8px",
              }}
            >
              Customer Dashboard
            </p>
            <h1
              style={{
                color: "#fff",
                fontSize: "clamp(22px, 3vw, 32px)",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                margin: "0 0 6px",
              }}
            >
              Welcome back, {user.name.split(" ")[0]}
            </h1>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "14px", margin: 0 }}>
              Next appointment: {appointments[0].date} at {appointments[0].time}
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Link
              to="/contact"
              style={{
                background: "#fff",
                color: "#000",
                padding: "10px 20px",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none",
                fontFamily: "'TT Norms Pro', sans-serif",
                whiteSpace: "nowrap",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Request Service
            </Link>
            <button
              aria-label="Notifications"
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "none",
                borderRadius: "10px",
                padding: "10px 12px",
                cursor: "pointer",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
            >
              <Bell size={17} />
            </button>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <section id="appointments" style={{ marginBottom: "24px" }}>
          <Card>
            <SectionTitle>Upcoming Appointments</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {appointments.map((apt) => (
                <div
                  key={apt.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px",
                    background: "#F9F9F9",
                    borderRadius: "12px",
                    gap: "12px",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        background: "#000",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Calendar size={20} color="#fff" />
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, color: "#000", margin: "0 0 3px", fontSize: "15px" }}>
                        {apt.service}
                      </p>
                      <p style={{ color: "rgba(0,0,0,0.5)", fontSize: "13px", margin: 0 }}>
                        {apt.date} at {apt.time} · Tech: {apt.tech}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Badge status={apt.status} />
                    <ChevronRight size={16} color="rgba(0,0,0,0.3)" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Service Requests */}
        <section id="requests" style={{ marginBottom: "24px" }}>
          <Card>
            <SectionTitle>Service Requests</SectionTitle>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
                    {["ID", "Service", "Submitted", "Status", "Notes"].map((h) => (
                      <th
                        key={h}
                        style={{
                          textAlign: "left",
                          padding: "10px 12px",
                          color: "rgba(0,0,0,0.45)",
                          fontWeight: 600,
                          fontSize: "12px",
                          letterSpacing: "0.04em",
                          textTransform: "uppercase",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr
                      key={req.id}
                      style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", transition: "background 0.15s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#FAFAFA")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td style={{ padding: "14px 12px", color: "rgba(0,0,0,0.4)", fontFamily: "monospace", fontSize: "12px" }}>{req.id}</td>
                      <td style={{ padding: "14px 12px", fontWeight: 500, color: "#000" }}>{req.service}</td>
                      <td style={{ padding: "14px 12px", color: "rgba(0,0,0,0.55)" }}>{req.submitted}</td>
                      <td style={{ padding: "14px 12px" }}><Badge status={req.status} /></td>
                      <td style={{ padding: "14px 12px", color: "rgba(0,0,0,0.55)", fontSize: "13px" }}>{req.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* Maintenance Plan + Recent Activity — 2 col */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          {/* Maintenance Plan */}
          <section id="plan">
            <Card style={{ height: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                <SectionTitle>Maintenance Plan</SectionTitle>
                <Shield size={20} color="#000" />
              </div>
              <div
                style={{
                  background: "#000",
                  borderRadius: "12px",
                  padding: "20px",
                  marginBottom: "20px",
                }}
              >
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "6px" }}>
                  Active Plan
                </p>
                <p style={{ color: "#fff", fontSize: "18px", fontWeight: 600, margin: "0 0 4px" }}>{plan.name}</p>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px", margin: 0 }}>Renews {plan.renewsOn}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {plan.includes.map((item) => (
                  <div key={item} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#000", flexShrink: 0, marginTop: "6px" }} />
                    <p style={{ color: "rgba(0,0,0,0.68)", fontSize: "14px", margin: 0 }}>{item}</p>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* Recent Activity */}
          <section id="activity">
            <Card style={{ height: "100%" }}>
              <SectionTitle>Recent Activity</SectionTitle>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {activity.map(({ icon: Icon, label, date, detail }, i) => (
                  <div
                    key={label + date}
                    style={{
                      display: "flex",
                      gap: "14px",
                      paddingBottom: i < activity.length - 1 ? "18px" : 0,
                      marginBottom: i < activity.length - 1 ? "18px" : 0,
                      borderBottom: i < activity.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
                    }}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        background: "rgba(0,0,0,0.06)",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={15} color="#000" />
                    </div>
                    <div>
                      <p style={{ color: "#000", fontWeight: 500, fontSize: "14px", margin: "0 0 2px" }}>{label}</p>
                      <p style={{ color: "rgba(0,0,0,0.45)", fontSize: "12px", margin: 0 }}>{detail} · {date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>

        {/* Account Information */}
        <section id="account">
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
              <SectionTitle>Account Information</SectionTitle>
              <button
                style={{
                  background: "none",
                  border: "1.5px solid rgba(0,0,0,0.14)",
                  borderRadius: "9999px",
                  padding: "7px 16px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: 500,
                  fontFamily: "'TT Norms Pro', sans-serif",
                  color: "#000",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#000")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.14)")}
              >
                Edit Profile
              </button>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "24px",
              }}
            >
              {[
                ["Full Name", user.name],
                ["Email Address", user.email],
                ["Phone Number", user.phone],
                ["Service Address", user.address],
              ].map(([label, value]) => (
                <div key={label}>
                  <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", marginBottom: "6px" }}>
                    {label}
                  </p>
                  <p style={{ color: "#000", fontSize: "15px", margin: 0 }}>{value}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
