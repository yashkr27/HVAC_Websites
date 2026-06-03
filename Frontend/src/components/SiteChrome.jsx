import { ArrowRight, Mail, Phone, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoWebp from "../assets/logo.webp";
import { useAuth } from "../context/AuthContext.jsx";
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

// ─── User Dropdown ─────────────────────────────────────────────────────────────
function UserDropdown({ session, signOut }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleSignOut() {
    setOpen(false);
    await signOut();
    navigate("/");
  }

  const email = session?.user?.email ?? "";
  const truncatedEmail = email.length > 22 ? email.slice(0, 22) + "…" : email;

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Icon Button */}
      <button
        id="user-menu-btn"
        onClick={() => setOpen((o) => !o)}
        aria-label="User menu"
        aria-expanded={open}
        style={{
          width: "38px",
          height: "38px",
          borderRadius: "9999px",
          background: open ? "#222" : "#111",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.2s",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => { if (!open) e.currentTarget.style.background = "#222"; }}
        onMouseLeave={(e) => { if (!open) e.currentTarget.style.background = "#111"; }}
      >
        <User size={18} color="#fff" />
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 10px)",
            right: 0,
            minWidth: "220px",
            background: "#1a1a1a",
            borderRadius: "14px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
            overflow: "hidden",
            zIndex: 100,
            fontFamily: "'TT Norms Pro', sans-serif",
          }}
        >
          {/* Signed in as */}
          <div style={{ padding: "18px 20px 14px" }}>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px", fontWeight: 600, margin: "0 0 6px", letterSpacing: "0.02em" }}>
              Signed in as:
            </p>
            <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "14px", margin: 0, letterSpacing: "-0.01em" }}>
              {truncatedEmail}
            </p>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />

          {/* MY ACCOUNT */}
          <Link
            to="/"
            onClick={() => setOpen(false)}
            style={{
              display: "block",
              padding: "14px 20px",
              color: "#fff",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            My Account
          </Link>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />

          {/* Sign out */}
          <button
            onClick={handleSignOut}
            style={{
              display: "block",
              width: "100%",
              padding: "14px 20px",
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.65)",
              textAlign: "left",
              fontSize: "14px",
              cursor: "pointer",
              fontFamily: "'TT Norms Pro', sans-serif",
              transition: "background 0.15s, color 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "rgba(255,255,255,0.65)";
            }}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const location = useLocation();
  const { session, signOut } = useAuth();
  const links = [
    ["Services", "/services"],
    ["About", "/about"],
    ["Service Areas", "/service-areas"],
    ["Reviews", "/reviews"],
    ["Gallery", "/gallery"],
    ["Contact Us", "/contact"],
  ];

  return (
    <nav
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        padding: "18px 40px",
      }}
    >
      <style>{`
        @media (max-width: 840px) {
          .site-nav-links { display: none !important; }
          .site-nav-cta { padding-left: 18px !important; padding-right: 18px !important; }
          .site-navbar-inner { grid-template-columns: 1fr auto !important; }
        }
        .site-nav-link-item {
          font-size: 15px;
          font-weight: 500;
          color: #555;
          text-decoration: none;
          transition: color 0.2s;
          font-family: 'TT Norms Pro', sans-serif;
          white-space: nowrap;
          position: relative;
          padding-bottom: 2px;
        }
        .site-nav-link-item:hover { color: #000; }
        .site-nav-link-item.active {
          color: #000;
        }
        .site-nav-link-item.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 1.5px;
          background: #000;
          border-radius: 2px;
        }
      `}</style>
      <div
        className="site-navbar-inner"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          maxWidth: "88rem",
          margin: "0 auto",
          gap: "18px",
        }}
      >
        {/* Left: Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            justifySelf: "start",
            paddingLeft: "12px",
          }}
        >
          <img
            src={logoWebp}
            alt="AAA Heating &amp; Air logo"
            style={{
              height: "40px",
              width: "auto",
              objectFit: "contain",
            }}
          />
        </Link>

        {/* Center: Nav Links */}
        <div
          className="site-nav-links"
          style={{
            display: "flex",
            gap: "32px",
            alignItems: "center",
          }}
        >
          {links.map(([label, href]) => (
            <Link
              key={href}
              to={href}
              className={`site-nav-link-item${location.pathname === href ? " active" : ""}`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right: Auth controls */}
        <div style={{ justifySelf: "end", display: "flex", alignItems: "center", gap: "12px" }}>
          {session ? (
            /* Logged in — show user icon + dropdown */
            <>
              <div
                style={{
                  width: "1px",
                  height: "22px",
                  background: "rgba(0,0,0,0.18)",
                  flexShrink: 0,
                }}
              />
              <UserDropdown session={session} signOut={signOut} />
            </>
          ) : (
            /* Logged out — show Sign In + CTA */
            <>
              <Link
                to="/signin"
                className="site-nav-link-item"
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#555",
                  textDecoration: "none",
                  fontFamily: "'TT Norms Pro', sans-serif",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
              >
                Sign In
              </Link>
              <Link
                className="site-nav-cta"
                to="/contact"
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
                  display: "inline-block",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#000")}
              >
                Get Free Estimate
              </Link>
            </>
          )}
        </div>
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
            <img
              src={logoWebp}
              alt="AAA Heating &amp; Air logo"
              style={{
                height: "36px",
                width: "auto",
                objectFit: "contain",
                filter: "brightness(0) invert(1)",
              }}
            />
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
        * { box-sizing: border-box; }
        @media (max-width: 720px) {
          .page-hero-content { padding: 32px 24px !important; }
          .responsive-section { padding: 64px 20px !important; }
          .contact-layout { grid-template-columns: 1fr !important; }
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
