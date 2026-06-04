import { ArrowRight, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import logoWebp from "../assets/logo.webp";
import { Navbar } from "./Navbar.jsx";
import { hvacImages, pageStyles } from "./siteData.js";

export function ButtonLink({ href = "/contact", children, compact = false }) {
  return (
    <Link
      to={href}
      className="site-pill-button"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "12px",
        background: "#000",
        color: "#fff",
        fontSize: compact ? "15px" : "clamp(15px, 1.2vw, 18px)",
        fontWeight: 500,
        paddingLeft: compact ? "28px" : "32px",
        paddingRight: "8px",
        paddingTop: "8px",
        paddingBottom: "8px",
        borderRadius: "9999px",
        border: "none",
        cursor: "pointer",
        transition: "background 0.2s",
        fontFamily: "'TT Norms Pro', sans-serif",
        textDecoration: "none",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "#000")}
    >
      {children}
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
        <ArrowRight size={compact ? 16 : 20} color="#000" />
      </span>
    </Link>
  );
}



export function Footer() {
  return (
    <footer style={{ background: "#0B0B0B", color: "#fff", padding: "56px clamp(20px, 4vw, 64px)" }}>
      <div
        style={{
          ...pageStyles.container,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "32px",
          alignItems: "start",
          textAlign: "left",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
            <img
              src={logoWebp}
              alt="AAA Heating & Air Conditioning logo"
              style={{
                height: "38px",
                width: "auto",
                objectFit: "contain",
                background: "#fff",
                borderRadius: "10px",
                padding: "4px",
              }}
            />
            <div style={{ lineHeight: 1.12 }}>
              <p style={{ color: "#fff", fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>
                AAA Heating & Air Conditioning
              </p>
              <p style={{ color: "rgba(255,255,255,0.66)", fontSize: "12px", marginTop: "4px" }}>
                Chicagoland HVAC Experts
              </p>
            </div>
          </div>
          <p style={{ color: "rgba(255,255,255,0.68)", lineHeight: 1.6, maxWidth: "320px" }}>
            Premium HVAC repair, installation, and maintenance for homes and businesses across Chicagoland.
          </p>
        </div>
        <div>
          <p style={{ fontWeight: 600, marginBottom: "16px" }}>Company</p>
          {[
            ["Services", "/services"],
            ["About", "/about"],
            ["Service Areas", "/service-areas"],
            ["Reviews", "/reviews"],
            ["Gallery", "/gallery"],
            ["Contact Us", "/contact"],
          ].map(([label, href]) => (
            <Link
              key={href}
              to={href}
              style={{
                display: "block",
                color: "rgba(255,255,255,0.68)",
                textDecoration: "none",
                marginBottom: "10px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.68)")}
            >
              {label}
            </Link>
          ))}
        </div>
        <div>
          <p style={{ fontWeight: 600, marginBottom: "16px" }}>Get In Touch</p>
          <p style={{ display: "flex", alignItems: "center", gap: "10px", color: "rgba(255,255,255,0.72)" }}>
            <Phone size={16} /> (708) 555-0198
          </p>
          <p style={{ display: "flex", alignItems: "center", gap: "10px", color: "rgba(255,255,255,0.72)", marginTop: "10px" }}>
            <Mail size={16} /> hello@aaaheatingair.com
          </p>
        </div>
      </div>
      <div
        style={{
          ...pageStyles.container,
          borderTop: "1px solid rgba(255,255,255,0.08)",
          marginTop: "48px",
          paddingTop: "24px",
          color: "rgba(255,255,255,0.4)",
          fontSize: "13px",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <span>© {new Date().getFullYear()} AAA Heating &amp; Air Conditioning. All rights reserved.</span>
        <span>Chicagoland's Trusted HVAC Experts</span>
      </div>
    </footer>
  );
}

export function PageHero({ title, subtitle, image = hvacImages.service }) {
  return (
    <div
      style={{
        minHeight: "520px",
        padding: "112px clamp(16px, 3vw, 40px) 24px",
        display: "flex",
        alignItems: "stretch",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          borderRadius: "22px",
          overflow: "hidden",
          minHeight: "440px",
        }}
      >
        <img
          src={image}
          alt=""
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
              "linear-gradient(90deg, rgba(245,245,245,0.94) 0%, rgba(245,245,245,0.74) 45%, rgba(245,245,245,0.18) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: "440px",
            padding: "clamp(32px, 5vw, 72px)",
            textAlign: "left",
          }}
          className="page-hero-content"
        >
          <h1
            style={{
              color: "#000",
              fontSize: "clamp(42px, 5vw, 60px)",
              fontWeight: 500,
              lineHeight: 1.08,
              maxWidth: "44rem",
              margin: "0 0 18px",
              letterSpacing: "-0.04em",
              fontFamily: "'TT Norms Pro', sans-serif",
            }}
          >
            {title}
          </h1>
          <p
            style={{
              color: "#27272A",
              fontSize: "clamp(16px, 1.6vw, 20px)",
              maxWidth: "38rem",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

export function PageShell({ children }) {
  return (
    <div style={pageStyles.shell}>
      <style>{`
        * { box-sizing: border-box; }
        @media (max-width: 720px) {
          .page-hero-content { padding: 32px 24px !important; }
          .responsive-section { padding: 64px 20px !important; }
          .contact-layout { grid-template-columns: 1fr !important; }
        }
        p, li, span { text-rendering: optimizeLegibility; }
      `}</style>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export function CTASection({ title, subtitle, buttonText, href = "/contact" }) {
  return (
    <section className="responsive-section" style={{ padding: "0 clamp(20px, 4vw, 64px) 96px" }}>
      <div
        style={{
          ...pageStyles.container,
          background: "#000",
          color: "#fff",
          borderRadius: "16px",
          padding: "48px",
          display: "flex",
          justifyContent: "space-between",
          gap: "28px",
          alignItems: "center",
          flexWrap: "wrap",
          textAlign: "left",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "clamp(30px, 4vw, 44px)",
              fontWeight: 500,
              lineHeight: 1.1,
              margin: "0 0 12px",
              letterSpacing: "-0.03em",
              color: "#fff",
            }}
          >
            {title}
          </h2>
          {subtitle ? (
            <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "17px", lineHeight: 1.6, margin: 0 }}>
              {subtitle}
            </p>
          ) : null}
        </div>
        <ButtonLink href={href} compact>
          {buttonText}
        </ButtonLink>
      </div>
    </section>
  );
}
