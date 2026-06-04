import { Award, BadgeCheck, CheckCircle, HeartHandshake } from "lucide-react";
import { ButtonLink, CTASection, PageHero, PageShell } from "../components/SiteChrome.jsx";
import { hvacImages, pageStyles } from "../components/siteData.js";

const features = [
  [
    BadgeCheck,
    "Licensed & Insured",
    "Work completed with the credentials, care, and accountability your property deserves. Every technician is background-checked and fully certified.",
  ],
  [
    Award,
    "Experienced Technicians",
    "Practical HVAC expertise across repairs, replacements, maintenance, and indoor air quality — gained through years of real-world service.",
  ],
  [
    HeartHandshake,
    "Customer First Approach",
    "Clear communication, respectful service, and recommendations built around your needs — not upsells.",
  ],
];

const reasons = [
  "Transparent pricing with no hidden fees",
  "Fast response times — same-day for urgent calls",
  "Quality workmanship backed by our service guarantee",
  "Trusted local reputation across Chicagoland",
  "Respectful of your home and schedule",
  "Financing options available for larger installs",
];

const milestones = [
  ["15+", "Years in Business"],
  ["500+", "Happy Customers"],
  ["98%", "Satisfaction Rate"],
  ["24/7", "Emergency Line"],
];

export default function About() {
  return (
    <PageShell>
      <PageHero
        title="About AAA Heating & Air Conditioning"
        subtitle="Committed to comfort, reliability, and long-term customer relationships across the Chicagoland area."
        image={hvacImages.maintenance}
      />

      {/* Our Story — 2-col text */}
      <section className="responsive-section" style={pageStyles.section}>
        <div
          style={{
            ...pageStyles.container,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "48px",
            textAlign: "left",
            alignItems: "start",
          }}
        >
          <div>
            <p style={pageStyles.eyebrow}>Our Story</p>
            <h2 style={pageStyles.h2}>
              Built around dependable comfort and honest service.
            </h2>
          </div>
          <p
            style={{
              ...pageStyles.body,
              fontSize: "clamp(18px, 2vw, 26px)",
              lineHeight: 1.55,
            }}
          >
            AAA Heating &amp; Air Conditioning helps Chicagoland homeowners and
            businesses keep their spaces comfortable through practical guidance,
            careful workmanship, and responsive support. Our team focuses on
            long-term system performance, transparent recommendations, and service
            that feels calm from the first call to the final walkthrough.
          </p>
        </div>
      </section>

      {/* Milestones Strip */}
      <section style={{ background: "#fff", padding: "0 24px 80px" }}>
        <div
          style={{
            ...pageStyles.container,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 20px 56px rgba(0,0,0,0.06)",
          }}
        >
          {milestones.map(([value, label], i) => (
            <div
              key={label}
              style={{
                padding: "40px 28px",
                textAlign: "center",
                background: "#fff",
                borderRight: i < milestones.length - 1 ? "1px solid rgba(0,0,0,0.07)" : "none",
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
              <p style={{ color: "#3F3F46", fontSize: "14px", margin: 0 }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Cards */}
      <section className="responsive-section" style={{ padding: "0 24px 80px" }}>
        <div
          style={{
            ...pageStyles.container,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "16px",
            textAlign: "left",
          }}
        >
          {features.map(([Icon, title, description]) => (
            <article
              key={title}
              style={{
                ...pageStyles.card,
                transition: "transform 0.2s, box-shadow 0.2s",
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
              <Icon size={28} color="#000" style={{ marginBottom: "22px" }} />
              <h3 style={{ fontSize: "22px", fontWeight: 500, margin: "0 0 14px", letterSpacing: "-0.02em" }}>
                {title}
              </h3>
              <p style={pageStyles.body}>{description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="responsive-section" style={{ padding: "0 24px 80px" }}>
        <div
          style={{
            ...pageStyles.container,
            background: "#fff",
            borderRadius: "20px",
            padding: "56px 48px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "48px",
            textAlign: "left",
            alignItems: "center",
          }}
        >
          <div>
            <p style={pageStyles.eyebrow}>Why Homeowners Choose Us</p>
            <h2 style={{ ...pageStyles.h2, marginBottom: "24px" }}>
              Service that respects your time, home, and budget.
            </h2>
            <ButtonLink href="/contact#request-estimate" compact>
              Contact Our Team
            </ButtonLink>
          </div>
          <div>
            {reasons.map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  marginBottom: "18px",
                }}
              >
                <CheckCircle
                  size={18}
                  color="#000"
                  style={{ flexShrink: 0, marginTop: "2px" }}
                />
                <p style={{ color: "#000", fontSize: "16px", margin: 0, lineHeight: 1.5 }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to work with us?"
        subtitle="Reach out for a free estimate or to schedule your next service appointment."
        buttonText="Get Free Estimate"
      />
    </PageShell>
  );
}
