import { ArrowRight, Mail, Phone } from "lucide-react";
import { hvacImages, pageStyles } from "./siteData.js";

export function LogoIcon({ className = "", style }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 256 256"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M 128.005 191.173 C 128.448 156.208 156.93 128 192 128 L 192 64 L 128 64 C 128 99.346 99.346 128 64 128 L 64 192 L 128 192 Z M 192 256 L 64 256 C 28.654 256 0 227.346 0 192 L 0 64 L 64 64 L 64 0 L 192 0 C 227.346 0 256 28.654 256 64 L 256 192 L 192 192 Z" />
    </svg>
  );
}

export function ButtonLink({ href = "/contact", children, compact = false }) {
  return (
    <a
      href={href}
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
    </a>
  );
}

export function Navbar() {
  const links = [
    ["Services", "/services"],
    ["About", "/about"],
    ["Service Areas", "/service-areas"],
    ["Reviews", "/reviews"],
    ["Contact", "/contact"],
  ];

  return (
    <nav
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        padding: "20px 24px",
      }}
    >
      <style>{`
        @media (max-width: 840px) {
          .site-nav-links {
            display: none !important;
          }
          .site-nav-cta {
            padding-left: 18px !important;
            padding-right: 18px !important;
          }
        }
      `}</style>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "88rem",
          margin: "0 auto",
          gap: "18px",
        }}
      >
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            minWidth: "max-content",
          }}
        >
          <LogoIcon style={{ width: "28px", height: "28px", color: "#000" }} />
          <span
            style={{
              fontSize: "18px",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "#000",
              fontFamily: "'TT Norms Pro', sans-serif",
            }}
          >
            AAA Heating &amp; Air
          </span>
        </a>

        <div
          className="site-nav-links"
          style={{
            display: "flex",
            gap: "32px",
            alignItems: "center",
          }}
        >
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              style={{
                fontSize: "15px",
                fontWeight: 500,
                color: "#555",
                textDecoration: "none",
                transition: "color 0.2s",
                fontFamily: "'TT Norms Pro', sans-serif",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
            >
              {label}
            </a>
          ))}
        </div>

        <a
          className="site-nav-cta"
          href="/contact"
          style={{
            background: "#000",
            color: "#fff",
            fontSize: "15px",
            fontWeight: 500,
            padding: "10px 28px",
            borderRadius: "9999px",
            border: "none",
            cursor: "pointer",
            transition: "background 0.2s",
            fontFamily: "'TT Norms Pro', sans-serif",
            whiteSpace: "nowrap",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#000")}
        >
          Get Free Estimate
        </a>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer style={{ background: "#0B0B0B", color: "#fff", padding: "56px 24px" }}>
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
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
            <LogoIcon style={{ width: "28px", height: "28px", color: "#fff" }} />
            <strong style={{ fontSize: "18px", fontWeight: 600 }}>AAA Heating &amp; Air</strong>
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
            ["Contact", "/contact"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              style={{
                display: "block",
                color: "rgba(255,255,255,0.68)",
                textDecoration: "none",
                marginBottom: "10px",
              }}
            >
              {label}
            </a>
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
    </footer>
  );
}

export function PageHero({ title, subtitle, image = hvacImages.service }) {
  return (
    <div
      style={{
        minHeight: "520px",
        padding: "96px 24px 24px",
        display: "flex",
        alignItems: "stretch",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          borderRadius: "16px",
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
            padding: "48px",
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
              color: "rgba(0,0,0,0.7)",
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
        * {
          box-sizing: border-box;
        }
        @media (max-width: 720px) {
          .page-hero-content {
            padding: 32px 24px !important;
          }
          .responsive-section {
            padding: 64px 20px !important;
          }
          .contact-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export function CTASection({ title, subtitle, buttonText, href = "/contact" }) {
  return (
    <section className="responsive-section" style={{ padding: "0 24px 96px" }}>
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
