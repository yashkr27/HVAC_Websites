import { Star } from "lucide-react";
import { CTASection, PageHero, PageShell } from "../components/SiteChrome.jsx";
import { hvacImages, pageStyles } from "../components/siteData.js";

const reviews = [
  ["Amanda R.", "AC Repair", "The technician found the issue quickly, explained the repair clearly, and had our AC cooling again the same afternoon."],
  ["Michael T.", "Furnace Replacement", "Our new furnace installation was clean, organized, and finished exactly when they said it would be."],
  ["Priya S.", "Emergency Service", "They answered after hours and helped us through a no-heat situation without making the process stressful."],
  ["Daniel K.", "Maintenance Plan", "The seasonal tune-up was thorough, and the technician gave practical tips to keep our system running efficiently."],
  ["Lauren M.", "Indoor Air Quality", "They recommended a filtration upgrade that made the whole house feel fresher within days."],
  ["Chris B.", "Commercial HVAC", "Professional, punctual, and easy to coordinate with for our office maintenance schedule."],
];

const stats = [
  ["500+", "Projects Completed"],
  ["4.9", "Average Rating"],
  ["98%", "Customer Satisfaction"],
];

function Stars() {
  return (
    <div style={{ display: "flex", gap: "4px", color: "#000", margin: "10px 0 18px" }} aria-label="5 star rating">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} size={16} fill="currentColor" />
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <PageShell>
      <PageHero
        title="Customer Reviews"
        subtitle="See what homeowners and businesses say about our work."
        image={hvacImages.service}
      />

      <section className="responsive-section" style={pageStyles.section}>
        <div
          style={{
            ...pageStyles.container,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "16px",
            textAlign: "left",
          }}
        >
          {reviews.map(([name, category, text]) => (
            <article key={`${name}-${category}`} style={pageStyles.card}>
              <p style={pageStyles.eyebrow}>{category}</p>
              <h2 style={{ fontSize: "23px", margin: 0, letterSpacing: "-0.02em" }}>{name}</h2>
              <Stars />
              <p style={pageStyles.body}>{text}</p>
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
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          {stats.map(([value, label]) => (
            <div key={label} style={{ padding: "42px 24px", borderRight: "1px solid rgba(0,0,0,0.08)" }}>
              <p style={{ fontSize: "clamp(38px, 5vw, 56px)", color: "#000", fontWeight: 500, letterSpacing: "-0.04em" }}>
                {value}
              </p>
              <p style={{ color: "rgba(0,0,0,0.64)", marginTop: "8px" }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection title="Ready to experience the difference?" buttonText="Schedule Service" />
    </PageShell>
  );
}
