import { ArrowRight } from "lucide-react";
import { CTASection, PageHero, PageShell } from "../components/SiteChrome.jsx";
import { hvacImages, pageStyles } from "../components/siteData.js";

const services = [
  ["AC Repair", "Fast diagnostics and dependable repairs for weak airflow, warm air, leaks, and breakdowns."],
  ["AC Installation", "High-efficiency cooling systems sized and installed for quiet, consistent home comfort."],
  ["Furnace Repair", "Responsive heating repair for ignition issues, uneven temperatures, and failing components."],
  ["Furnace Installation", "Modern furnace replacements designed for reliability, performance, and long-term value."],
  ["Indoor Air Quality", "Filtration, humidity, and ventilation upgrades that help your home feel cleaner and fresher."],
  ["Preventive Maintenance", "Seasonal tune-ups that protect equipment, improve efficiency, and reduce surprise repairs."],
  ["Commercial HVAC", "Repair, replacement, and maintenance services for offices, retail spaces, and local facilities."],
  ["Emergency Service", "Urgent HVAC support when your heating or cooling system cannot wait for regular hours."],
];

export default function Services() {
  return (
    <PageShell>
      <PageHero
        title="Professional HVAC Services"
        subtitle="Reliable heating, cooling, indoor air quality, and maintenance solutions."
        image={hvacImages.cooling}
      />

      <section className="responsive-section" style={pageStyles.section}>
        <div style={pageStyles.container}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "16px",
              textAlign: "left",
            }}
          >
            {services.map(([title, description]) => (
              <article key={title} style={{ ...pageStyles.card, minHeight: "220px", display: "flex", flexDirection: "column" }}>
                <h2 style={{ fontSize: "24px", lineHeight: 1.2, margin: 0, letterSpacing: "-0.02em" }}>{title}</h2>
                <p style={{ ...pageStyles.body, marginTop: "14px", flex: 1 }}>{description}</p>
                <a
                  href="/contact"
                  aria-label={`Request ${title}`}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "9999px",
                    background: "#000",
                    color: "#fff",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "24px",
                  }}
                >
                  <ArrowRight size={18} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Need service today?"
        subtitle="Schedule your appointment with our certified technicians."
        buttonText="Get Free Estimate"
      />
    </PageShell>
  );
}
