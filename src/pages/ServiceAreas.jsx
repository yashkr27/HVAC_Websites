import { MapPin } from "lucide-react";
import { ButtonLink, CTASection, PageHero, PageShell } from "../components/SiteChrome.jsx";
import { hvacImages, pageStyles } from "../components/siteData.js";

const cities = [
  "Homer Glen",
  "Orland Park",
  "Oak Brook",
  "Downers Grove",
  "Naperville",
  "Tinley Park",
  "Joliet",
  "Lemont",
];

export default function ServiceAreas() {
  return (
    <PageShell>
      <PageHero
        title="Areas We Serve"
        subtitle="Proudly serving homeowners and businesses across Chicagoland."
        image={hvacImages.heating}
      />

      <section className="responsive-section" style={pageStyles.section}>
        <div
          style={{
            ...pageStyles.container,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "16px",
            textAlign: "left",
          }}
        >
          {cities.map((city) => (
            <article key={city} style={pageStyles.card}>
              <MapPin size={24} color="#000" style={{ marginBottom: "22px" }} />
              <h2 style={{ fontSize: "24px", lineHeight: 1.2, margin: "0 0 12px", letterSpacing: "-0.02em" }}>{city}</h2>
              <p style={{ ...pageStyles.body, marginBottom: "24px" }}>
                Heating, cooling, maintenance, and indoor air quality services for {city} homes and local businesses.
              </p>
              <ButtonLink href="/contact" compact>
                Learn More
              </ButtonLink>
            </article>
          ))}
        </div>
      </section>

      <CTASection title="Don't see your location?" buttonText="Contact Us" />
    </PageShell>
  );
}
