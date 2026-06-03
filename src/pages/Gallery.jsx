import { PageShell } from "../components/SiteChrome.jsx";
import { pageStyles } from "../components/siteData.js";

const galleryImages = [
  {
    src: "https://images.pexels.com/photos/6471913/pexels-photo-6471913.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "HVAC technician inspecting outdoor AC unit",
    category: "Residential",
    label: "AC System Inspection",
    tall: true,
  },
  {
    src: "https://images.pexels.com/photos/5463580/pexels-photo-5463580.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Technician performing furnace maintenance",
    category: "Maintenance",
    label: "Furnace Tune-Up",
    tall: false,
  },
  {
    src: "https://images.pexels.com/photos/5463582/pexels-photo-5463582.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Indoor air quality system installation",
    category: "Air Quality",
    label: "Air Quality System Install",
    tall: false,
  },
  {
    src: "https://images.pexels.com/photos/34938442/pexels-photo-34938442.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Commercial HVAC rooftop unit installation",
    category: "Commercial",
    label: "Rooftop Unit Install",
    tall: true,
  },
  {
    src: "https://images.pexels.com/photos/34938439/pexels-photo-34938439.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Heating system repair in progress",
    category: "Heating",
    label: "Heating System Repair",
    tall: false,
  },
  {
    src: "https://images.pexels.com/photos/8961098/pexels-photo-8961098.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Ductwork installation",
    category: "Residential",
    label: "Ductwork Installation",
    tall: false,
  },
  {
    src: "https://images.pexels.com/photos/257636/pexels-photo-257636.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Modern smart thermostat",
    category: "Smart Home",
    label: "Smart Thermostat Setup",
    tall: false,
  },
  {
    src: "https://images.pexels.com/photos/8961365/pexels-photo-8961365.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Residential AC installation completed",
    category: "Residential",
    label: "New AC Installation",
    tall: true,
  },
  {
    src: "https://images.pexels.com/photos/6195122/pexels-photo-6195122.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Technician checking refrigerant levels",
    category: "Cooling",
    label: "Refrigerant Check",
    tall: false,
  },
];

const categories = ["All", "Residential", "Commercial", "Maintenance", "Heating", "Cooling", "Air Quality", "Smart Home"];

import { useState } from "react";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const filtered =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <PageShell>
      {/* Page Hero */}
      <div style={{ padding: "120px 24px 64px", background: "#F5F5F5" }}>
        <div style={{ ...pageStyles.container, textAlign: "left" }}>
          <p style={pageStyles.eyebrow}>Our Work</p>
          <h1
            style={{
              ...pageStyles.h2,
              fontSize: "clamp(44px, 5vw, 64px)",
              letterSpacing: "-0.04em",
              marginBottom: "20px",
            }}
          >
            Project Gallery
          </h1>
          <p style={{ ...pageStyles.body, fontSize: "18px", maxWidth: "42rem" }}>
            A look at HVAC installations, repairs, and upgrades we've completed for homeowners
            and businesses across Chicagoland.
          </p>
        </div>
      </div>

      {/* Filter Pills */}
      <section style={{ padding: "0 24px 48px", background: "#F5F5F5" }}>
        <div style={{ ...pageStyles.container }}>
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  background: activeCategory === cat ? "#000" : "transparent",
                  color: activeCategory === cat ? "#fff" : "rgba(0,0,0,0.55)",
                  border: activeCategory === cat ? "1.5px solid #000" : "1.5px solid rgba(0,0,0,0.18)",
                  borderRadius: "9999px",
                  padding: "8px 20px",
                  fontSize: "13px",
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "'TT Norms Pro', sans-serif",
                  transition: "all 0.18s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  if (activeCategory !== cat) {
                    e.currentTarget.style.borderColor = "#000";
                    e.currentTarget.style.color = "#000";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeCategory !== cat) {
                    e.currentTarget.style.borderColor = "rgba(0,0,0,0.18)";
                    e.currentTarget.style.color = "rgba(0,0,0,0.55)";
                  }
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section style={{ padding: "0 24px 96px", background: "#F5F5F5" }}>
        <div
          style={{
            ...pageStyles.container,
            columns: "3 320px",
            columnGap: "16px",
          }}
        >
          <style>{`
            .gallery-item {
              break-inside: avoid;
              margin-bottom: 16px;
              display: block;
              position: relative;
              border-radius: 16px;
              overflow: hidden;
              cursor: default;
            }
            .gallery-item img {
              width: 100%;
              height: auto;
              display: block;
              transition: transform 0.4s ease;
            }
            .gallery-item:hover img {
              transform: scale(1.04);
            }
            .gallery-overlay {
              position: absolute;
              inset: 0;
              background: linear-gradient(0deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0) 55%);
              opacity: 0;
              transition: opacity 0.3s ease;
              display: flex;
              flex-direction: column;
              justify-content: flex-end;
              padding: 24px;
            }
            .gallery-item:hover .gallery-overlay {
              opacity: 1;
            }
            @media (max-width: 640px) {
              .gallery-masonry { columns: 1 !important; }
            }
          `}</style>

          {filtered.map((img, i) => (
            <div
              key={`${img.label}-${i}`}
              className="gallery-item"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={img.src}
                alt={img.alt}
                style={{
                  borderRadius: "16px",
                  aspectRatio: img.tall ? "3/4" : "4/3",
                  objectFit: "cover",
                  width: "100%",
                }}
              />
              <div className="gallery-overlay">
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.65)",
                    marginBottom: "6px",
                  }}
                >
                  {img.category}
                </span>
                <p
                  style={{
                    color: "#fff",
                    fontSize: "17px",
                    fontWeight: 500,
                    margin: 0,
                    letterSpacing: "-0.01em",
                    fontFamily: "'TT Norms Pro', sans-serif",
                  }}
                >
                  {img.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 24px 96px", background: "#F5F5F5" }}>
        <div
          style={{
            ...pageStyles.container,
            background: "#000",
            borderRadius: "20px",
            padding: "56px 48px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "28px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2
              style={{
                color: "#fff",
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                margin: "0 0 12px",
              }}
            >
              Ready to schedule your project?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "16px", margin: 0 }}>
              Contact our team for a free estimate on any HVAC service.
            </p>
          </div>
          <a
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              background: "#fff",
              color: "#000",
              fontSize: "15px",
              fontWeight: 500,
              paddingLeft: "28px",
              paddingRight: "8px",
              paddingTop: "8px",
              paddingBottom: "8px",
              borderRadius: "9999px",
              textDecoration: "none",
              fontFamily: "'TT Norms Pro', sans-serif",
              transition: "opacity 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Get Free Estimate
            <span
              style={{
                background: "#000",
                borderRadius: "9999px",
                padding: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </a>
        </div>
      </section>
    </PageShell>
  );
}
