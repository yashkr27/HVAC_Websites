import { Award, BadgeCheck, HeartHandshake } from "lucide-react";
import { ButtonLink, PageHero, PageShell } from "../components/SiteChrome.jsx";
import { hvacImages, pageStyles } from "../components/siteData.js";

const features = [
  [BadgeCheck, "Licensed & Insured", "Work completed with the credentials, care, and accountability your property deserves."],
  [Award, "Experienced Technicians", "Practical HVAC expertise across repairs, replacements, maintenance, and indoor air quality."],
  [HeartHandshake, "Customer First Approach", "Clear communication, respectful service, and recommendations built around your needs."],
];

export default function About() {
  return (
    <PageShell>
      <PageHero
        title="About AAA Heating & Air Conditioning"
        subtitle="Committed to comfort, reliability, and long-term customer relationships."
        image={hvacImages.maintenance}
      />

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
            <h2 style={pageStyles.h2}>Built around dependable comfort and honest service.</h2>
          </div>
          <p style={{ ...pageStyles.body, fontSize: "clamp(18px, 2vw, 28px)", lineHeight: 1.5 }}>
            AAA Heating &amp; Air Conditioning helps Chicagoland homeowners and businesses keep their spaces comfortable through
            practical guidance, careful workmanship, and responsive support. Our team focuses on long-term system performance,
            transparent recommendations, and service that feels calm from the first call to the final walkthrough.
          </p>
        </div>
      </section>

      <section className="responsive-section" style={{ padding: "0 24px 96px" }}>
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
            <article key={title} style={pageStyles.card}>
              <Icon size={28} color="#000" style={{ marginBottom: "22px" }} />
              <h3 style={{ fontSize: "23px", fontWeight: 500, margin: "0 0 12px", letterSpacing: "-0.02em" }}>{title}</h3>
              <p style={pageStyles.body}>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="responsive-section" style={{ padding: "0 24px 96px" }}>
        <div
          style={{
            ...pageStyles.container,
            background: "#fff",
            borderRadius: "16px",
            padding: "48px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "36px",
            textAlign: "left",
            alignItems: "center",
          }}
        >
          <div>
            <p style={pageStyles.eyebrow}>Why Homeowners Choose Us</p>
            <h2 style={pageStyles.h2}>Service that respects your time, home, and budget.</h2>
          </div>
          <div>
            {["Transparent pricing", "Fast response times", "Quality workmanship", "Trusted local reputation"].map((item) => (
              <p key={item} style={{ color: "#000", fontSize: "18px", margin: "0 0 18px", display: "flex", gap: "12px" }}>
                <span aria-hidden="true">-</span>
                {item}
              </p>
            ))}
            <ButtonLink href="/contact" compact>
              Contact Our Team
            </ButtonLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
