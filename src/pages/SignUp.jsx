import { CheckCircle, Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logoWebp from "../assets/logo.webp";
import { pageStyles } from "../components/siteData.js";

const inputStyle = {
  width: "100%",
  border: "1.5px solid rgba(0,0,0,0.12)",
  borderRadius: "12px",
  padding: "14px 16px 14px 48px",
  fontSize: "16px",
  fontFamily: "'TT Norms Pro', sans-serif",
  background: "#fff",
  color: "#000",
  outline: "none",
  transition: "border-color 0.2s",
};

function InputField({ icon: Icon, type = "text", name, placeholder, value, onChange }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <Icon
        size={17}
        color={focused ? "#000" : "rgba(0,0,0,0.38)"}
        style={{
          position: "absolute",
          left: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          transition: "color 0.2s",
          pointerEvents: "none",
        }}
      />
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        aria-label={placeholder}
        value={value}
        onChange={onChange}
        style={{
          ...inputStyle,
          borderColor: focused ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.12)",
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
}

function PasswordField({ name, placeholder, value, onChange }) {
  const [show, setShow] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <Lock
        size={17}
        color="rgba(0,0,0,0.38)"
        style={{
          position: "absolute",
          left: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
        }}
      />
      <input
        type={show ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        aria-label={placeholder}
        value={value}
        onChange={onChange}
        style={{ ...inputStyle, paddingRight: "48px" }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.5)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)")}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        aria-label={show ? "Hide password" : "Show password"}
        style={{
          position: "absolute",
          right: "14px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "rgba(0,0,0,0.4)",
          padding: "4px",
          display: "flex",
        }}
      >
        {show ? <EyeOff size={17} /> : <Eye size={17} />}
      </button>
    </div>
  );
}

const perks = [
  "Track your HVAC service history",
  "Schedule appointments online",
  "View your maintenance plan",
  "Get priority service access",
];

export default function SignUp() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function handleChange(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1500);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F5F5F5",
        display: "flex",
        fontFamily: "'TT Norms Pro', sans-serif",
      }}
    >
      {/* Left — Visual Panel */}
      <div
        className="auth-visual"
        style={{
          flex: 1,
          backgroundImage:
            "linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.25) 100%), url('https://images.pexels.com/photos/34938442/pexels-photo-34938442.jpeg?auto=compress&cs=tinysrgb&w=1400')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "56px",
        }}
      >
        <style>{`
          @media (max-width: 768px) {
            .auth-visual { display: none !important; }
            .auth-panel { max-width: 100% !important; padding: 40px 28px !important; }
          }
        `}</style>
        <p
          style={{
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
            marginBottom: "24px",
          }}
        >
          Customer Portal
        </p>
        <h2
          style={{
            color: "#fff",
            fontSize: "clamp(28px, 3vw, 40px)",
            fontWeight: 500,
            lineHeight: 1.25,
            letterSpacing: "-0.03em",
            marginBottom: "36px",
            fontFamily: "'TT Norms Pro', sans-serif",
          }}
        >
          Manage your HVAC services in one place.
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {perks.map((perk) => (
            <div key={perk} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <CheckCircle size={18} color="rgba(255,255,255,0.8)" style={{ flexShrink: 0 }} />
              <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "15px" }}>{perk}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right — Form Panel */}
      <div
        className="auth-panel"
        style={{
          flex: "0 0 auto",
          width: "100%",
          maxWidth: "540px",
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "56px 48px",
          overflowY: "auto",
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ display: "inline-block", marginBottom: "40px" }}>
          <img
            src={logoWebp}
            alt="AAA Heating & Air"
            style={{ height: "36px", width: "auto", objectFit: "contain" }}
          />
        </Link>

        {done ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <CheckCircle size={56} color="#000" style={{ marginBottom: "20px" }} />
            <h1
              style={{
                fontSize: "28px",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                color: "#000",
                margin: "0 0 12px",
              }}
            >
              Account Created!
            </h1>
            <p style={{ ...pageStyles.body, marginBottom: "28px" }}>
              Welcome to your AAA Heating &amp; Air customer portal.
            </p>
            <Link
              to="/dashboard"
              style={{
                display: "inline-block",
                background: "#000",
                color: "#fff",
                padding: "13px 32px",
                borderRadius: "12px",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: "15px",
                fontFamily: "'TT Norms Pro', sans-serif",
              }}
            >
              Go to Dashboard →
            </Link>
          </div>
        ) : (
          <>
            <p style={{ ...pageStyles.eyebrow, marginBottom: "10px" }}>Get started</p>
            <h1
              style={{
                fontSize: "clamp(26px, 3vw, 34px)",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                color: "#000",
                margin: "0 0 8px",
              }}
            >
              Create your account
            </h1>
            <p style={{ ...pageStyles.body, marginBottom: "32px" }}>
              Join hundreds of Chicagoland customers managing their HVAC online.
            </p>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "13px" }}
            >
              <InputField icon={User} name="name" placeholder="Full Name" value={form.name} onChange={handleChange("name")} />
              <InputField icon={Mail} type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange("email")} />
              <InputField icon={Phone} type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange("phone")} />
              <PasswordField name="password" placeholder="Password" value={form.password} onChange={handleChange("password")} />
              <PasswordField name="confirm" placeholder="Confirm Password" value={form.confirm} onChange={handleChange("confirm")} />

              <p style={{ fontSize: "12px", color: "rgba(0,0,0,0.45)", lineHeight: 1.55, margin: "2px 0 4px" }}>
                By creating an account you agree to our Terms of Service and Privacy Policy.
              </p>

              <button
                type="submit"
                disabled={loading}
                style={{
                  background: "#000",
                  color: "#fff",
                  border: "none",
                  borderRadius: "12px",
                  padding: "15px",
                  fontSize: "16px",
                  fontWeight: 500,
                  cursor: loading ? "not-allowed" : "pointer",
                  fontFamily: "'TT Norms Pro', sans-serif",
                  transition: "background 0.2s, opacity 0.2s",
                  opacity: loading ? 0.65 : 1,
                  letterSpacing: "-0.01em",
                }}
                onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = "#333"; }}
                onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = "#000"; }}
              >
                {loading ? "Creating Account…" : "Create Account"}
              </button>
            </form>

            <p style={{ ...pageStyles.body, textAlign: "center", marginTop: "28px" }}>
              Already have an account?{" "}
              <Link
                to="/signin"
                style={{
                  color: "#000",
                  fontWeight: 600,
                  textDecoration: "none",
                  borderBottom: "1.5px solid #000",
                  paddingBottom: "1px",
                }}
              >
                Sign In
              </Link>
            </p>
          </>
        )}

        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <Link
            to="/"
            style={{ fontSize: "13px", color: "rgba(0,0,0,0.4)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.4)")}
          >
            ← Back to AAA Heating &amp; Air
          </Link>
        </div>
      </div>
    </div>
  );
}
