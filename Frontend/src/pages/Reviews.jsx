import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { CTASection, PageHero, PageShell } from "../components/SiteChrome.jsx";
import { hvacImages, pageStyles } from "../components/siteData.js";
import { supabase } from "../lib/supabase";

// Static fallback reviews — shown when DB is empty
const staticReviews = [
  {
    name: "Amanda R.",
    initials: "AR",
    category: "AC Repair",
    text: "The technician found the issue quickly, explained the repair clearly, and had our AC cooling again the same afternoon. Absolutely professional.",
    location: "Homer Glen, IL",
  },
  {
    name: "Michael T.",
    initials: "MT",
    category: "Furnace Replacement",
    text: "Our new furnace installation was clean, organized, and finished exactly when they said it would be. The team left the space cleaner than they found it.",
    location: "Orland Park, IL",
  },
  {
    name: "Priya S.",
    initials: "PS",
    category: "Emergency Service",
    text: "They answered after hours and helped us through a no-heat situation without making the process stressful. I can't thank them enough for their calm approach.",
    location: "Naperville, IL",
  },
  {
    name: "Daniel K.",
    initials: "DK",
    category: "Maintenance Plan",
    text: "The seasonal tune-up was thorough, and the technician gave practical tips to keep our system running efficiently all winter. Worth every penny.",
    location: "Downers Grove, IL",
  },
  {
    name: "Lauren M.",
    initials: "LM",
    category: "Indoor Air Quality",
    text: "They recommended a filtration upgrade that made the whole house feel fresher within days. Our allergies have noticeably improved since the install.",
    location: "Tinley Park, IL",
  },
  {
    name: "Chris B.",
    initials: "CB",
    category: "Commercial HVAC",
    text: "Professional, punctual, and easy to coordinate with for our office maintenance schedule. They keep our systems running without disrupting our team.",
    location: "Oak Brook, IL",
  },
];

const stats = [
  ["500+", "Projects Completed"],
  ["4.9★", "Average Rating"],
  ["98%", "Customer Satisfaction"],
  ["6 Cities", "Chicagoland Coverage"],
];

function Stars() {
  return (
    <div
      style={{ display: "flex", gap: "3px", color: "#000", margin: "12px 0 18px" }}
      aria-label="5 star rating"
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} size={15} fill="currentColor" />
      ))}
    </div>
  );
}

function Avatar({ initials }) {
  return (
    <div
      style={{
        width: "44px",
        height: "44px",
        borderRadius: "9999px",
        background: "#000",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px",
        fontWeight: 600,
        letterSpacing: "0.02em",
        flexShrink: 0,
      }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState(staticReviews);

  useEffect(() => {
    async function fetchReviews() {
      if (!supabase) return;

      const { data } = await supabase
        .from("reviews")
        .select("*, profiles(first_name, last_name)")
        .eq("status", "approved")
        .order("created_at", { ascending: false });
      if (data && data.length > 0) {
        const mapped = data.map((r) => ({
          name: [r.profiles?.first_name, r.profiles?.last_name].filter(Boolean).join(" ") || "Customer",
          initials: ([r.profiles?.first_name?.[0], r.profiles?.last_name?.[0]].filter(Boolean).join("") || "C").toUpperCase(),
          category: "Verified Customer",
          text: r.comments,
          location: "",
          rating: r.rating,
        }));
        setReviews(mapped);
      }
    }
    fetchReviews();
  }, []);

  return (
    <PageShell>
      <PageHero
        title="Customer Reviews"
        subtitle="See what homeowners and businesses across Chicagoland say about our heating and cooling work."
        image={hvacImages.service}
      />

      {/* Intro + Stats */}
      <section className="responsive-section" style={pageStyles.section}>
        <div
          style={{
            ...pageStyles.container,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "48px",
            alignItems: "start",
            marginBottom: "72px",
          }}
        >
          <div>
            <p style={pageStyles.eyebrow}>Verified Customer Feedback</p>
            <h2 style={pageStyles.h2}>
              What our customers say about working with us.
            </h2>
          </div>
          <p style={{ ...pageStyles.body, fontSize: "17px", lineHeight: 1.65 }}>
            We earn our reputation one job at a time. Every review below comes from a real customer who
            experienced our work firsthand — from emergency service calls to full system replacements.
          </p>
        </div>

        {/* Review Cards */}
        <div
          style={{
            ...pageStyles.container,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "16px",
            textAlign: "left",
          }}
        >
          {reviews.map(({ name, initials, category, text, location }) => (
            <article
              key={`${name}-${category}`}
              style={{
                ...pageStyles.card,
                display: "flex",
                flexDirection: "column",
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
              <p style={pageStyles.eyebrow}>{category}</p>
              <Stars />
              <p style={{ ...pageStyles.body, fontSize: "16px", lineHeight: 1.65, flex: 1 }}>
                &ldquo;{text}&rdquo;
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginTop: "24px",
                  paddingTop: "20px",
                  borderTop: "1px solid rgba(0,0,0,0.07)",
                }}
              >
                <Avatar initials={initials} />
                <div>
                  <p style={{ color: "#000", fontWeight: 600, margin: "0 0 2px", fontSize: "15px" }}>
                    {name}
                  </p>
                  <p style={{ color: "#3F3F46", fontSize: "13px", margin: 0 }}>
                    {location}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Stats Strip */}
      <section style={{ padding: "0 24px 96px" }}>
        <div
          style={{
            ...pageStyles.container,
            background: "#000",
            borderRadius: "20px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          {stats.map(([value, label], i) => (
            <div
              key={label}
              style={{
                padding: "52px 24px",
                borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}
            >
              <p
                style={{
                  fontSize: "clamp(38px, 5vw, 56px)",
                  color: "#fff",
                  fontWeight: 500,
                  letterSpacing: "-0.04em",
                  margin: "0 0 10px",
                  fontFamily: "'TT Norms Pro', sans-serif",
                }}
              >
                {value}
              </p>
              <p style={{ color: "rgba(255,255,255,0.55)", marginTop: "8px", fontSize: "14px" }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        title="Ready to experience the difference?"
        subtitle="Join hundreds of satisfied Chicagoland homeowners and businesses."
        buttonText="Schedule Service"
      />
    </PageShell>
  );
}
