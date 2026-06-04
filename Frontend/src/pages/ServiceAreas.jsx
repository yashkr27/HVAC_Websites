import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { CTASection, PageHero, PageShell } from "../components/SiteChrome.jsx";
import { hvacImages, pageStyles } from "../components/siteData.js";

const cities = [
  {
    name: "Homer Glen",
    tags: ["AC Repair", "Heating", "Maintenance"],
    description: "Full-service HVAC for Homer Glen homes and local businesses — from seasonal tune-ups to emergency repairs.",
  },
  {
    name: "Orland Park",
    tags: ["AC Installation", "Furnace Repair", "Air Quality"],
    description: "Trusted HVAC service across Orland Park, including new system installs and indoor air quality solutions.",
  },
  {
    name: "Oak Brook",
    tags: ["Commercial HVAC", "Maintenance", "Emergency"],
    description: "Commercial and residential HVAC coverage for Oak Brook properties, with fast response times.",
  },
  {
    name: "Downers Grove",
    tags: ["Cooling", "Heating", "Preventive Care"],
    description: "Year-round comfort solutions for Downers Grove residents — AC, furnace, and maintenance all covered.",
  },
  {
    name: "Naperville",
    tags: ["AC Repair", "Furnace Install", "Air Quality"],
    description: "Premium HVAC service in Naperville with experienced technicians and a commitment to quality work.",
  },
  {
    name: "Tinley Park",
    tags: ["Emergency Service", "Heating", "Cooling"],
    description: "24/7 emergency HVAC support for Tinley Park homeowners when your comfort can't wait.",
  },
  {
    name: "Joliet",
    tags: ["Residential", "Commercial", "Maintenance"],
    description: "Reliable heating and cooling services for Joliet homes and commercial facilities.",
  },
  {
    name: "Lemont",
    tags: ["AC Install", "Furnace Repair", "Duct Work"],
    description: "Expert HVAC installations and repairs for Lemont's residential and light-commercial properties.",
  },
];

export default function ServiceAreas() {
  return (
    <PageShell>
      <PageHero
        title="Areas We Serve"
        subtitle="Proudly serving homeowners and businesses throughout the Chicagoland region with fast, reliable HVAC service."
        image={hvacImages.heating}
      />

      {/* Coverage Intro */}
      <section className="responsive-section" style={pageStyles.section}>
        <div
          style={{
            ...pageStyles.container,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "48px",
            alignItems: "start",
            marginBottom: "64px",
          }}
        >
          <div>
            <p style={pageStyles.eyebrow}>Our Coverage</p>
            <h2 style={pageStyles.h2}>
              Chicagoland's trusted local HVAC team.
            </h2>
          </div>
          <div>
            <p style={{ ...pageStyles.body, fontSize: "17px", lineHeight: 1.65, marginBottom: "20px" }}>
              We cover suburbs across the southwest and western Chicagoland area. If you don't see your
              city listed, contact us — we may still be able to help.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {["Fast Response", "Licensed & Insured", "Same-Day Available"].map((badge) => (
                <span
                  key={badge}
                  style={{
                    background: "#000",
                    color: "#fff",
                    fontSize: "13px",
                    fontWeight: 500,
                    padding: "6px 14px",
                    borderRadius: "9999px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* City Cards */}
        <div
          style={{
            ...pageStyles.container,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "16px",
            textAlign: "left",
          }}
        >
          {cities.map(({ name, tags, description }) => (
            <article
              key={name}
              style={{
                ...pageStyles.card,
                display: "flex",
                flexDirection: "column",
                gap: "14px",
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
              <MapPin size={22} color="#000" />
              <h2 style={{ fontSize: "24px", lineHeight: 1.2, margin: 0, letterSpacing: "-0.02em" }}>
                {name}
              </h2>
              <p style={{ ...pageStyles.body, margin: 0 }}>{description}</p>

              {/* Service tags */}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#27272A",
                      background: "rgba(0,0,0,0.06)",
                      padding: "4px 10px",
                      borderRadius: "9999px",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                to="/contact#request-estimate"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#000",
                  fontSize: "14px",
                  fontWeight: 500,
                  textDecoration: "none",
                  marginTop: "4px",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Schedule in {name} <ArrowRight size={14} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <CTASection
        title="Don't see your location?"
        subtitle="We service many more Chicagoland communities. Get in touch and we'll confirm coverage for your area."
        buttonText="Contact Us"
      />
    </PageShell>
  );
}
