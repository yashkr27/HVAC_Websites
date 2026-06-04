import { User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoWebp from "../assets/logo.webp";
import { useAuth } from "../context/AuthContext.jsx";

const navLinks = [
  ["Services", "/services"],
  ["About", "/about"],
  ["Service Areas", "/service-areas"],
  ["Reviews", "/reviews"],
  ["Gallery", "/gallery"],
  ["Contact Us", "/contact"],
];

function UserDropdown({ session, signOut }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

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
          <div style={{ padding: "18px 20px 14px" }}>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", fontWeight: 600, margin: "0 0 6px", letterSpacing: "0.02em" }}>
              Signed in as:
            </p>
            <p style={{ color: "#fff", fontSize: "14px", margin: 0, letterSpacing: "-0.01em" }}>
              {truncatedEmail}
            </p>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />

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

          <button
            onClick={handleSignOut}
            style={{
              display: "block",
              width: "100%",
              padding: "14px 20px",
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.75)",
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
              e.currentTarget.style.color = "rgba(255,255,255,0.75)";
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

  return (
    <nav
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        padding: "18px clamp(18px, 4vw, 56px)",
      }}
    >
      <style>{`
        @media (max-width: 1040px) {
          .site-nav-links { gap: 14px !important; }
          .site-nav-link-item { font-size: 14px !important; }
          .site-nav-cta { padding-left: 18px !important; padding-right: 18px !important; }
          .site-brand-name { max-width: 230px !important; }
        }
        @media (max-width: 980px) {
          .site-nav-links { display: none !important; }
          .site-navbar-inner { grid-template-columns: 1fr auto !important; }
          .site-nav-cta { padding-left: 18px !important; padding-right: 18px !important; }
        }
        @media (max-width: 560px) {
          .site-brand-name { font-size: 14px !important; max-width: 150px !important; }
          .site-nav-signin { display: none !important; }
          .site-nav-cta { font-size: 13px !important; padding: 9px 16px !important; }
        }
        .site-nav-link-item {
          font-size: 15px;
          font-weight: 600;
          color: #27272A;
          text-decoration: none;
          transition: color 0.2s;
          font-family: 'TT Norms Pro', sans-serif;
          white-space: nowrap;
          position: relative;
          padding-bottom: 2px;
        }
        .site-nav-link-item:hover { color: #000; }
        .site-nav-link-item.active { color: #000; }
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
          gridTemplateColumns: "minmax(292px, max-content) minmax(0, 1fr) auto",
          alignItems: "center",
          width: "100%",
          maxWidth: "min(100rem, calc(100vw - 36px))",
          margin: "0 auto",
          columnGap: "24px",
          borderRadius: "9999px",
          background: "rgba(255,255,255,0.82)",
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 18px 48px rgba(0,0,0,0.08)",
          backdropFilter: "blur(14px)",
          padding: "10px 12px",
        }}
      >
        <Link
          to="/"
          aria-label="AAA Heating & Air Conditioning home"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
            justifySelf: "start",
            minWidth: 0,
          }}
        >
          <img
            src={logoWebp}
            alt="AAA Heating & Air Conditioning logo"
            style={{
              height: "42px",
              width: "auto",
              objectFit: "contain",
              flexShrink: 0,
            }}
          />
          <span style={{ display: "flex", flexDirection: "column", minWidth: 0, lineHeight: 1.1 }}>
            <span
              className="site-brand-name"
              style={{
                color: "#09090B",
                fontSize: "16px",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              AAA Heating & Air Conditioning
            </span>
          </span>
        </Link>

        <div
          className="site-nav-links"
          style={{
            display: "flex",
            gap: "28px",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 0,
          }}
        >
          {navLinks.map(([label, href]) => (
            <Link
              key={href}
              to={href}
              className={`site-nav-link-item${location.pathname === href ? " active" : ""}`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div style={{ justifySelf: "end", display: "flex", alignItems: "center", gap: "12px" }}>
          {session ? (
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
            <>
              <Link
                to="/signin"
                className="site-nav-link-item site-nav-signin"
                style={{
                  fontSize: "14px",
                  color: "#27272A",
                }}
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
                  fontWeight: 700,
                  padding: "10px 24px",
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
