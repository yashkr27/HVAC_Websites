import {
  ArrowRight,
  Building2,
  Fan,
  Flame,
  ShieldCheck,
  Thermometer,
  Timer,
  Wind,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";
import { CTASection, PageHero, PageShell } from "../components/SiteChrome.jsx";
import { hvacImages, pageStyles } from "../components/siteData.js";

const services = [
  {
    icon: Fan,
    title: "AC Repair",
    description:
      "Fast diagnostics and dependable repairs for weak airflow, warm air, leaks, and breakdowns.",
    tag: "Cooling",
  },
  {
    icon: Wind,
    title: "AC Installation",
    description:
      "High-efficiency cooling systems sized and installed for quiet, consistent home comfort.",
    tag: "Cooling",
  },
  {
    icon: Flame,
    title: "Furnace Repair",
    description:
      "Responsive heating repair for ignition issues, uneven temperatures, and failing components.",
    tag: "Heating",
  },
  {
    icon: Thermometer,
    title: "Furnace Installation",
    description:
      "Modern furnace replacements designed for reliability, performance, and long-term value.",
    tag: "Heating",
  },
  {
    icon: ShieldCheck,
    title: "Indoor Air Quality",
    description:
      "Filtration, humidity, and ventilation upgrades that help your home feel cleaner and fresher.",
    tag: "Air Quality",
  },
  {
    icon: Wrench,
    title: "Preventive Maintenance",
    description:
      "Seasonal tune-ups that protect equipment, improve efficiency, and reduce surprise repairs.",
    tag: "Maintenance",
  },
  {
    icon: Building2,
    title: "Commercial HVAC",
    description:
      "Repair, replacement, and maintenance services for offices, retail spaces, and local facilities.",
    tag: "Commercial",
  },
  {
    icon: Timer,
    title: "Emergency Service",
    description:
      "Urgent HVAC support when your heating or cooling system cannot wait for regular hours.",
    tag: "Emergency",
  },
];

const stats = [
  ["500+", "Systems Installed"],
  ["24/7", "Emergency Support"],
  ["4.9★", "Average Rating"],
  ["15+", "Years of Service"],
];

export default function Services() {
  return (
    <PageShell>
      <PageHero
        title="Professional HVAC Services"
        subtitle="Reliable heating, cooling, indoor air quality, and maintenance solutions for homes and businesses across Chicagoland."
        image={hvacImages.cooling}
      />

      {/* Stats Strip */}
      <section style={{ background: "#fff", padding: "32px clamp(16px, 4vw, 64px) 0" }}>
        <div
          style={{
            ...pageStyles.container,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 24px 64px rgba(0,0,0,0.07)",
          }}
        >
          {stats.map(([value, label], i) => (
            <div
              key={label}
              style={{
                padding: "36px 28px",
                textAlign: "center",
                borderRight: i < stats.length - 1 ? "1px solid rgba(0,0,0,0.07)" : "none",
                background: "#fff",
              }}
            >
              <p
                style={{
                  fontSize: "clamp(36px, 4vw, 52px)",
                  fontWeight: 500,
                  color: "#000",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  margin: "0 0 8px",
                  fontFamily: "'TT Norms Pro', sans-serif",
                }}
              >
                {value}
              </p>
              <p style={{ color: "#3F3F46", fontSize: "14px", fontWeight: 600, margin: 0 }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Intro */}
      <section className="responsive-section" style={{ ...pageStyles.section, paddingTop: "48px" }}>
        <div
          style={{
            ...pageStyles.container,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "48px",
            alignItems: "start",
            marginBottom: "64px",
          }}
        >
          <div>
            <p style={pageStyles.eyebrow}>What We Do</p>
            <h2 style={pageStyles.h2}>Everything your HVAC system needs, handled expertly.</h2>
          </div>
          <p style={{ ...pageStyles.body, fontSize: "clamp(17px, 1.6vw, 22px)", lineHeight: 1.6 }}>
            From a broken AC on the hottest day of the year to a furnace that won't start in January —
            our team responds fast, diagnoses accurately, and fixes it right the first time.
          </p>
        </div>

        {/* Service Cards */}
        <div
          style={{
            ...pageStyles.container,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "20px",
            textAlign: "left",
          }}
        >
          {services.map(({ icon: Icon, title, description, tag }) => (
            <article
              key={title}
              style={{
                ...pageStyles.card,
                minHeight: "220px",
                color: "#111111",
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
                minWidth: 0,
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 24px 56px rgba(0,0,0,0.09)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 18px 48px rgba(0,0,0,0.05)";
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "14px",
                  marginBottom: "20px",
                  minWidth: 0,
                }}
              >
                <Icon size={28} color="#000" style={{ flexShrink: 0 }} />
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "#27272A",
                    background: "rgba(0,0,0,0.08)",
                    padding: "4px 10px",
                    borderRadius: "9999px",
                    maxWidth: "calc(100% - 42px)",
                    overflowWrap: "anywhere",
                    textAlign: "right",
                    lineHeight: 1.2,
                  }}
                >
                  {tag}
                </span>
              </div>
              <h2 style={{ color: "#09090B", fontSize: "22px", fontWeight: 700, lineHeight: 1.2, margin: "0 0 12px", letterSpacing: "-0.02em" }}>
                {title}
              </h2>
              <p style={{ ...pageStyles.body, color: "#27272A", flex: 1 }}>{description}</p>
              <Link
                to="/contact#request-estimate"
                aria-label={`Request ${title}`}
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "9999px",
                  background: "#000",
                  color: "#fff",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "24px",
                  transition: "background 0.2s",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#000")}
              >
                <ArrowRight size={17} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <CTASection
        title="Need service today?"
        subtitle="Schedule your appointment with our certified technicians. Same-day availability for urgent needs."
        buttonText="Get Free Estimate"
      />
    </PageShell>
  );
}
