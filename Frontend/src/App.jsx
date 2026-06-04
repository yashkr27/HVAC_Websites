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
import VerifyOTP from "./pages/VerifyOTP.jsx";
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
      style={{
        marginTop: "96px",
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
      <div
        style={{
          position: "relative",
          width: "100%",
          borderRadius: "20px",
          overflow: "hidden",
          height: "calc(100vh - 24px)",
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
            to="/contact"
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
      style={{
        background: "#F5F5F5",
        padding: "96px 24px",
      }}
    >
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
            }
            .card-1-lg { grid-column: span 2; }
            @media (max-width: 1024px) {
              .card-1-lg { grid-column: span 1 !important; }
            }
          `}</style>

          {/* Card 1 — spans 2 cols on lg */}
          <div
            className="card-1-lg"
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
    <section style={{ background: "#F5F5F5", padding: "64px 24px" }}>
      <style>{`
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

// ─── Use Cases Section ────────────────────────────────────────────────────────
function UseCasesSection() {
  return (
    <section style={{ background: "#F5F5F5", padding: "96px 24px" }}>
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
        <div style={{ paddingRight: "0", paddingTop: "8px" }}>
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
          style={{
            position: "relative",
            borderRadius: "24px",
            overflow: "hidden",
            minHeight: "720px",
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
      {/* Hero wrapper — full viewport height */}
      <div
        style={{
          height: "100vh",
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
        <Route path="/verify-otp" element={<VerifyOTP />} />
      </Routes>
    </BrowserRouter>
  );
}
