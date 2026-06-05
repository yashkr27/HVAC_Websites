import { ArrowRight } from "lucide-react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Gallery from "./pages/Gallery.jsx";
import Reviews from "./pages/Reviews.jsx";
import ServiceAreas from "./pages/ServiceAreas.jsx";
import Services from "./pages/Services.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import ChatbotWidget from "./components/ChatbotWidget.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { Footer } from "./components/SiteChrome.jsx";

const hvacImages = {
  hero:
    "https://images.pexels.com/photos/6471913/pexels-photo-6471913.jpeg?auto=compress&cs=tinysrgb&w=1800",
  maintenance:
    "https://images.pexels.com/photos/5463580/pexels-photo-5463580.jpeg?auto=compress&cs=tinysrgb&w=1200",
  heating:
    "https://images.pexels.com/photos/34938439/pexels-photo-34938439.jpeg?auto=compress&cs=tinysrgb&w=1200",
  cooling:
    "https://images.pexels.com/photos/5463582/pexels-photo-5463582.jpeg?auto=compress&cs=tinysrgb&w=1200",
  service:
    "https://images.pexels.com/photos/34938442/pexels-photo-34938442.jpeg?auto=compress&cs=tinysrgb&w=1400",
};

// ─── Brand Marquee ────────────────────────────────────────────────────────────
const heroBrands = [
  { label: "Licensed & Insured", style: { fontFamily: "Georgia, serif", fontWeight: 700, letterSpacing: "-0.02em", fontSize: "15px" } },
  { label: "Same-Day Service", style: { fontFamily: "Arial, sans-serif", fontWeight: 900, letterSpacing: "0.08em", fontSize: "13px", textTransform: "uppercase" } },
  { label: "Emergency Repairs", style: { fontFamily: "'Trebuchet MS', sans-serif", fontWeight: 600, letterSpacing: "0.01em", fontSize: "15px", fontStyle: "italic" } },
  { label: "Residential & Commercial", style: { fontFamily: "'Courier New', monospace", fontWeight: 700, letterSpacing: "0.12em", fontSize: "13px", textTransform: "uppercase" } },
  { label: "EPA Certified", style: { fontFamily: "Palatino, 'Book Antiqua', serif", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "16px" } },
  { label: "Financing Available", style: { fontFamily: "Impact, 'Arial Narrow', sans-serif", fontWeight: 400, letterSpacing: "0.04em", fontSize: "14px" } },
  { label: "Trusted Local Experts", style: { fontFamily: "Verdana, sans-serif", fontWeight: 700, letterSpacing: "-0.03em", fontSize: "13px" } },
];

function HeroMarquee() {
  const doubled = [...heroBrands, ...heroBrands];
  return (
    <div
      className="hero-marquee-wrapper"
      style={{
        marginTop: "48px",
        width: "100%",
        maxWidth: "32rem",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 22s linear infinite;
        }
      `}</style>
      <div className="marquee-track">
        {doubled.map((brand, i) => (
          <span
            key={i}
            style={{
              ...brand.style,
              marginLeft: "28px",
              marginRight: "28px",
              flexShrink: 0,
              color: "rgba(0,0,0,0.6)",
              whiteSpace: "nowrap",
            }}
          >
            {brand.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Hero Section — truly full-screen ────────────────────────────────────────
function HeroSection() {
  return (
    <div
      style={{
        flex: 1,
        padding: "0 24px 24px",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      <style>{`
        .hero-container {
          height: min(78vh, 680px);
        }
        @media (min-width: 769px) and (max-width: 1100px) {
          .hero-container {
            height: min(68vh, 580px);
            min-height: 520px;
          }
          .hero-content {
            padding-top: 110px !important;
          }
          .hero-marquee-wrapper {
            margin-top: 48px !important;
          }
        }
        @media (max-width: 768px) {
          .hero-container {
            height: auto;
            min-height: 500px;
          }
          .hero-content {
            padding: 32px 24px !important;
            padding-top: 100px !important;
          }
          .hero-title {
            font-size: 38px !important;
            margin-bottom: 12px !important;
          }
          .hero-desc {
            font-size: 15px !important;
            margin-bottom: 24px !important;
          }
          .hero-marquee-wrapper {
            margin-top: 40px !important;
          }
        }
      `}</style>
      <div
        className="hero-container"
        style={{
          position: "relative",
          width: "100%",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <img
          src={hvacImages.hero}
          alt="HVAC technician checking an outdoor air conditioning system"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(245,245,245,0.92) 0%, rgba(245,245,245,0.7) 44%, rgba(245,245,245,0.2) 100%)",
          }}
        />

        {/* Content Overlay */}
        <div
          className="hero-content"
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            height: "100%",
            padding: "48px 56px",
            paddingTop: "140px",
          }}
        >
          <h1
            className="hero-title"
            style={{
              color: "#000",
              fontSize: "clamp(48px, 5.5vw, 72px)",
              fontWeight: 500,
              lineHeight: 1.05,
              maxWidth: "40rem",
              marginBottom: "20px",
              letterSpacing: "-0.04em",
              fontFamily: "'TT Norms Pro', sans-serif",
            }}
          >
            Your Comfort
            <br />
            Comes First
          </h1>

          <p
            className="hero-desc"
            style={{
              color: "rgba(0,0,0,0.7)",
              fontSize: "clamp(15px, 1.5vw, 19px)",
              maxWidth: "34rem",
              marginBottom: "36px",
              lineHeight: 1.65,
              fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif",
            }}
          >
            Professional heating, cooling, and indoor air quality solutions for
            homes and businesses throughout Chicagoland.
          </p>

          {/* CTA Button */}
          <Link
            to="/contact#request-estimate"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              background: "#000",
              color: "#fff",
              fontSize: "clamp(15px, 1.2vw, 18px)",
              fontWeight: 500,
              paddingLeft: "32px",
              paddingRight: "8px",
              paddingTop: "8px",
              paddingBottom: "8px",
              borderRadius: "9999px",
              border: "none",
              cursor: "pointer",
              transition: "background 0.2s",
              fontFamily: "'TT Norms Pro', sans-serif",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#000")}
          >
            Schedule Service
            <span
              style={{
                background: "#fff",
                borderRadius: "9999px",
                padding: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ArrowRight size={20} color="#000" />
            </span>
          </Link>

          <HeroMarquee />
        </div>
      </div>
    </div>
  );
}

// ─── Info Section ─────────────────────────────────────────────────────────────
function InfoSection() {
  return (
    <section
      className="info-section-wrapper"
      style={{
        background: "#F5F5F5",
        padding: "64px 24px",
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .info-section-wrapper { padding: 48px 24px !important; }
        }
      `}</style>
      <div style={{ maxWidth: "88rem", margin: "0 auto" }}>
        {/* Row 1 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "48px",
            marginBottom: "64px",
            alignItems: "flex-start",
          }}
        >
          {/* Left */}
          <div>
            <h2
              style={{
                color: "#000",
                fontSize: "clamp(32px, 4vw, 48px)",
                fontWeight: 500,
                lineHeight: 1.15,
                marginBottom: "32px",
                letterSpacing: "-0.03em",
                fontFamily: "'TT Norms Pro', sans-serif",
              }}
            >
              Meet AAA Heating &amp; Air Conditioning.
            </h2>
            <Link
              to="/about"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                background: "#000",
                color: "#fff",
                fontSize: "15px",
                fontWeight: 500,
                paddingLeft: "28px",
                paddingRight: "8px",
                paddingTop: "8px",
                paddingBottom: "8px",
                borderRadius: "9999px",
                border: "none",
                cursor: "pointer",
                transition: "background 0.2s",
                fontFamily: "'TT Norms Pro', sans-serif",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#000")}
            >
              Learn More
              <span
                style={{
                  background: "#fff",
                  borderRadius: "9999px",
                  padding: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ArrowRight size={16} color="#000" />
              </span>
            </Link>
          </div>

          {/* Right */}
          <p
            style={{
              color: "rgba(0,0,0,0.7)",
              fontSize: "clamp(18px, 2vw, 28px)",
              lineHeight: 1.5,
              fontFamily: "'TT Norms Pro', sans-serif",
            }}
          >
            For years, we've helped homeowners and businesses stay comfortable
            through reliable HVAC services, expert technicians, and responsive
            customer support.
          </p>
        </div>

        {/* Row 2 — Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
          }}
          className="info-cards-grid"
        >
          <style>{`
            @media (max-width: 1024px) {
              .info-cards-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
            @media (max-width: 640px) {
              .info-cards-grid { grid-template-columns: 1fr !important; }
              .info-card { min-height: 220px !important; padding: 24px !important; }
            }
            .card-1-lg { grid-column: span 2; }
            @media (max-width: 1024px) {
              .card-1-lg { grid-column: span 1 !important; }
            }
          `}</style>

          {/* Card 1 — spans 2 cols on lg */}
          <div
            className="card-1-lg info-card"
            style={{
              borderRadius: "16px",
              backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.68)), url('${hvacImages.maintenance}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "320px",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                color: "#fff",
                fontSize: "22px",
                fontWeight: 500,
                lineHeight: 1.3,
                letterSpacing: "-0.02em",
                fontFamily: "'TT Norms Pro', sans-serif",
              }}
            >
              Maintenance Plans
            </p>
            <p
              style={{
                color: "rgba(255,255,255,0.82)",
                fontSize: "15px",
                maxWidth: "280px",
                lineHeight: 1.5,
                fontFamily: "'TT Norms Pro', sans-serif",
              }}
            >
              Seasonal tune-ups, filter checks, and inspections that help
              prevent costly breakdowns.
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="info-card"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.7)), url('${hvacImages.heating}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "16px",
              padding: "28px",
              minHeight: "320px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                color: "#fff",
                fontSize: "22px",
                fontWeight: 500,
                lineHeight: 1.3,
                fontFamily: "'TT Norms Pro', sans-serif",
              }}
            >
              Heating
              <br />
              Solutions
            </p>
            <p
              style={{
                color: "rgba(255,255,255,0.82)",
                fontSize: "15px",
                lineHeight: 1.5,
                fontFamily: "'TT Norms Pro', sans-serif",
              }}
            >
              Furnace repair, replacement, and maintenance for dependable warmth
              all winter.
            </p>
          </div>

          {/* Card 3 */}
          <div
            className="info-card"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.7)), url('${hvacImages.cooling}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "16px",
              padding: "28px",
              minHeight: "320px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                color: "#fff",
                fontSize: "22px",
                fontWeight: 500,
                lineHeight: 1.3,
                fontFamily: "'TT Norms Pro', sans-serif",
              }}
            >
              Cooling
              <br />
              Solutions
            </p>
            <p
              style={{
                color: "rgba(255,255,255,0.82)",
                fontSize: "15px",
                lineHeight: 1.5,
                fontFamily: "'TT Norms Pro', sans-serif",
              }}
            >
              Professional AC installation and repair services designed for
              efficiency and comfort.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Backed By (Trusted By) Section ──────────────────────────────────────────
const backerBrands = [
  { label: "5-Star Reviews", style: { fontFamily: "'Times New Roman', serif", fontWeight: 400, letterSpacing: "0.02em", fontSize: "14px" } },
  { label: "Local Experts", style: { fontFamily: "'Arial Black', Arial, sans-serif", fontWeight: 900, letterSpacing: "0.08em", fontSize: "16px" } },
  { label: "Licensed Technicians", style: { fontFamily: "Impact, sans-serif", fontWeight: 700, letterSpacing: "0.05em", fontSize: "18px" } },
  { label: "Same-Day Appointments", style: { fontFamily: "Georgia, serif", fontWeight: 600, letterSpacing: "-0.02em", fontSize: "17px" } },
  { label: "Emergency Service", style: { fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, letterSpacing: "-0.01em", fontSize: "15px" } },
  { label: "Indoor Air Quality", style: { fontFamily: "Verdana, sans-serif", fontWeight: 700, letterSpacing: "0.06em", fontSize: "14px", textTransform: "uppercase" } },
  { label: "Preventive Maintenance", style: { fontFamily: "'Courier New', monospace", fontWeight: 700, letterSpacing: "0.18em", fontSize: "14px" } },
  { label: "Customer Satisfaction", style: { fontFamily: "Palatino, 'Book Antiqua', serif", fontWeight: 500, letterSpacing: "0.03em", fontSize: "15px" } },
];

function BackedBySection() {
  const doubled = [...backerBrands, ...backerBrands];
  return (
    <section className="backed-by-section" style={{ background: "#F5F5F5", padding: "48px 24px" }}>
      <style>{`
        @media (max-width: 768px) {
          .backed-by-section { padding: 40px 24px !important; }
        }
        @keyframes backers-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .backers-track {
          display: flex;
          width: max-content;
          animation: backers-marquee 30s linear infinite;
        }
      `}</style>
      <div
        style={{
          maxWidth: "88rem",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 3fr",
          gap: "32px",
          alignItems: "center",
        }}
        className="backed-grid"
      >
        <style>{`
          @media (max-width: 768px) {
            .backed-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>

        {/* Left */}
        <p
          style={{
            color: "rgba(0,0,0,0.7)",
            fontSize: "15px",
            lineHeight: 1.6,
            fontFamily: "'TT Norms Pro', sans-serif",
          }}
        >
          Trusted by homeowners and businesses across Chicagoland.
        </p>

        {/* Right: Marquee */}
        <div style={{ overflow: "hidden" }}>
          <div className="backers-track">
            {doubled.map((brand, i) => (
              <span
                key={i}
                style={{
                  ...brand.style,
                  marginLeft: "40px",
                  marginRight: "40px",
                  flexShrink: 0,
                  color: "rgba(0,0,0,0.5)",
                  whiteSpace: "nowrap",
                }}
              >
                {brand.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Emergency Section ────────────────────────────────────────────────────────
function EmergencySection() {
  return (
    <section
      className="emergency-section"
      style={{
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a0505 50%, #0a0a0a 100%)",
        padding: "64px clamp(20px, 4vw, 64px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.8; }
          70% { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes blink-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .emergency-pulse-dot {
          width: 10px; height: 10px; border-radius: 50%;
          background: #ef4444; position: relative; flex-shrink: 0;
          animation: blink-dot 1.4s ease-in-out infinite;
        }
        .emergency-pulse-dot::before {
          content: ''; position: absolute; inset: -4px;
          border-radius: 50%; border: 2px solid #ef4444;
          animation: pulse-ring 1.4s ease-out infinite;
        }
        .emergency-grid {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 48px;
          align-items: center;
          max-width: min(96rem, calc(100vw - 48px));
          margin: 0 auto;
        }
        @media (max-width: 768px) {
          .emergency-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .emergency-features { flex-wrap: wrap; gap: 16px !important; }
        }
        .emergency-call-btn {
          display: inline-flex; align-items: center; gap: 12px;
          background: #ef4444; color: #fff;
          font-size: clamp(15px, 1.2vw, 18px); font-weight: 700;
          padding: 14px 28px; border-radius: 9999px; border: none;
          cursor: pointer; text-decoration: none; white-space: nowrap;
          font-family: 'TT Norms Pro', sans-serif; letter-spacing: -0.01em;
          transition: background 0.2s, transform 0.15s;
          box-shadow: 0 0 32px rgba(239,68,68,0.4);
        }
        .emergency-call-btn:hover {
          background: #dc2626; transform: translateY(-2px);
          box-shadow: 0 0 48px rgba(239,68,68,0.6);
        }
        .emergency-chat-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.85);
          font-size: 15px; font-weight: 600;
          padding: 14px 28px; border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.15);
          cursor: pointer; text-decoration: none; white-space: nowrap;
          font-family: 'TT Norms Pro', sans-serif;
          transition: background 0.2s, border-color 0.2s;
          backdrop-filter: blur(8px);
        }
        .emergency-chat-btn:hover {
          background: rgba(255,255,255,0.14);
          border-color: rgba(255,255,255,0.3);
        }
      `}</style>

      {/* Subtle grid overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
        backgroundSize: "48px 48px", pointerEvents: "none",
      }} />

      <div className="emergency-grid">
        {/* Left */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <div className="emergency-pulse-dot" />
            <span style={{ color: "#ef4444", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              24 / 7 Emergency Line — Always Available
            </span>
          </div>

          <h2 style={{
            color: "#fff", fontSize: "clamp(32px, 4vw, 52px)",
            fontWeight: 500, lineHeight: 1.1, margin: "0 0 16px",
            letterSpacing: "-0.04em", fontFamily: "'TT Norms Pro', sans-serif",
          }}>
            HVAC Emergency?<br />
            <span style={{ color: "#ef4444" }}>We'll Be There.</span>
          </h2>

          <p style={{
            color: "rgba(255,255,255,0.65)", fontSize: "clamp(15px, 1.4vw, 17px)",
            lineHeight: 1.6, maxWidth: "36rem", margin: "0 0 32px",
          }}>
            No heat in winter. No AC in summer. System failures don't wait — and neither do we.
            Our certified technicians are dispatched same-day, any hour, 365 days a year.
          </p>

          <div className="emergency-features" style={{ display: "flex", gap: "24px", flexWrap: "wrap", marginBottom: "36px" }}>
            {[["⚡", "Same-Day Dispatch"], ["🛡️", "Licensed & Insured"], ["🔧", "All Makes & Models"], ["💳", "Financing Available"]].map(([icon, label]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "16px" }}>{icon}</span>
                <span style={{ color: "rgba(255,255,255,0.72)", fontSize: "14px", fontWeight: 500 }}>{label}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "center" }}>
            <a href="tel:17085550198" className="emergency-call-btn">
              📞 Call Now — (708) 555-0198
            </a>
            <button
              className="emergency-chat-btn"
              onClick={() => {
                const launcher = document.querySelector(".hvac-chat-launcher");
                if (launcher) { launcher.click(); }
                setTimeout(() => {
                  const trigger = document.querySelector(".hvac-emergency-trigger");
                  if (trigger) trigger.click();
                }, 450);
              }}
            >
              💬 Start Emergency Chat
            </button>
          </div>
        </div>

        {/* Right — Stats */}
        <div style={{
          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "20px", padding: "36px 32px", backdropFilter: "blur(12px)",
          position: "relative", zIndex: 1, minWidth: "220px",
        }}>
          {[["< 2 hrs", "Average Response Time"], ["24 / 7", "Days Per Year"], ["500+", "Emergencies Resolved"], ["4.9 ★", "Emergency Rating"]].map(([val, label], i, arr) => (
            <div key={label} style={{
              paddingBottom: i < arr.length - 1 ? "24px" : 0,
              marginBottom: i < arr.length - 1 ? "24px" : 0,
              borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
            }}>
              <p style={{ color: "#fff", fontSize: "clamp(22px, 2.2vw, 30px)", fontWeight: 500, margin: "0 0 4px", letterSpacing: "-0.03em", fontFamily: "'TT Norms Pro', sans-serif" }}>{val}</p>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", margin: 0 }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Use Cases Section ────────────────────────────────────────────────────────
function UseCasesSection() {
  return (
    <section className="use-cases-section" style={{ background: "#F5F5F5", padding: "64px 24px" }}>
      <style>{`
        @media (max-width: 768px) {
          .use-cases-section { padding: 48px 24px !important; }
          .use-case-card { min-height: 360px !important; padding: 32px !important; }
          .use-case-title { font-size: 36px !important; margin-bottom: 16px !important; }
          .use-case-overlay-content { padding: 32px !important; }
        }
      `}</style>
      <div
        style={{
          maxWidth: "88rem",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "32px",
          alignItems: "flex-start",
        }}
      >
        {/* Left Column */}
        <div
          className="use-case-card"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(245,245,245,0.9), rgba(245,245,245,0.66) 44%, rgba(0,0,0,0.16)), url('${hvacImages.maintenance}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "24px",
            minHeight: "480px",
            overflow: "hidden",
            padding: "48px",
          }}
        >
          <p
            style={{
              color: "rgba(0,0,0,0.6)",
              fontSize: "13px",
              marginBottom: "8px",
              fontFamily: "'TT Norms Pro', sans-serif",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            HVAC Solutions
          </p>
          <h2
            className="use-case-title"
            style={{
              color: "#000",
              fontSize: "clamp(44px, 5vw, 60px)",
              fontWeight: 500,
              lineHeight: 1,
              marginBottom: "24px",
              letterSpacing: "-0.04em",
              fontFamily: "'TT Norms Pro', sans-serif",
            }}
          >
            Residential &amp; Commercial Service
          </h2>
          <p
            style={{
              color: "rgba(0,0,0,0.6)",
              fontSize: "15px",
              lineHeight: 1.6,
              maxWidth: "28rem",
              fontFamily: "'TT Norms Pro', sans-serif",
            }}
          >
            From emergency repairs to complete system installations, our team
            delivers dependable HVAC solutions tailored to every property.
          </p>
        </div>

        {/* Right Column — Video Card */}
        <div
          className="use-case-card"
          style={{
            position: "relative",
            borderRadius: "24px",
            overflow: "hidden",
            minHeight: "480px",
          }}
        >
          <img
            src={hvacImages.service}
            alt="Technician servicing a heating system"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(245,245,245,0.88) 0%, rgba(245,245,245,0.56) 42%, rgba(0,0,0,0.18) 100%)",
            }}
          />

          {/* Overlay Content */}
          <div
            className="use-case-overlay-content"
            style={{
              position: "relative",
              zIndex: 10,
              padding: "48px",
            }}
          >
            <h3
              style={{
                color: "#000",
                fontSize: "clamp(32px, 3.5vw, 48px)",
                fontWeight: 500,
                lineHeight: 1.2,
                marginBottom: "20px",
                letterSpacing: "-0.03em",
                fontFamily: "'TT Norms Pro', sans-serif",
              }}
            >
              Whole-Home Comfort
            </h3>
            <p
              style={{
                color: "rgba(0,0,0,0.7)",
                fontSize: "15px",
                maxWidth: "28rem",
                marginBottom: "32px",
                lineHeight: 1.6,
                fontFamily: "'TT Norms Pro', sans-serif",
              }}
            >
              AC repairs, heating service, and preventive maintenance handled
              by experienced technicians who know how to protect comfort year
              round.
            </p>

            <Link
              to="/services"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                textDecoration: "none",
                color: "#000",
                fontSize: "15px",
                fontWeight: 500,
                fontFamily: "'TT Norms Pro', sans-serif",
              }}
            >
              <span
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "9999px",
                  background: "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(4px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(255,255,255,1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "rgba(255,255,255,0.8)")
                }
              >
                <ArrowRight size={16} color="#000" />
              </span>
              View Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Homepage ─────────────────────────────────────────────────────────────────
function HomePage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#F5F5F5",
        fontFamily: "'TT Norms Pro', sans-serif",
      }}
    >
      <style>{`
        .hero-wrapper { height: min(78vh, 680px); }
        @media (min-width: 769px) and (max-width: 1100px) {
          .hero-wrapper { height: min(68vh, 580px); }
        }
        @media (max-width: 768px) {
          .hero-wrapper { height: auto; }
        }
      `}</style>
      {/* Hero wrapper — full viewport height */}
      <div
        className="hero-wrapper"
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <Navbar />
        <HeroSection />
      </div>

      {/* Below-fold sections */}
      <InfoSection />
      <BackedBySection />
      <EmergencySection />
      <UseCasesSection />
      <Footer />
    </div>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/service-areas" element={<ServiceAreas />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <ChatbotWidget />
    </BrowserRouter>
  );
}
