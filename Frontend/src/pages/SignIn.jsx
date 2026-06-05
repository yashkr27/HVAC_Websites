import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PageShell } from "../components/SiteChrome.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { pageStyles } from "../components/siteData.js";

const inputStyle = {
  boxSizing: "border-box",
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

function InputField({ icon: Icon, type, name, placeholder, value, onChange }) {
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

export default function SignIn() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error.message || "Failed to sign in. Please check your credentials.");
      } else {
        navigate("/");
      }
    } catch {
      setError("Failed to sign in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell>
      <style>{`
        @media (max-width: 768px) {
          .auth-visual { display: none !important; }
          .auth-form-panel { max-width: 100% !important; padding: 40px 28px !important; }
        }
      `}</style>

      {/* Auth page body — split layout under the navbar */}
      <div
        style={{
          display: "flex",
          minHeight: "calc(100vh - 80px)",
          background: "#F5F5F5",
          paddingTop: "80px",
          fontFamily: "'TT Norms Pro', sans-serif",
        }}
      >
        {/* Left — Form Panel */}
        <div
          className="auth-form-panel"
          style={{
            boxSizing: "border-box",
            flex: "0 0 auto",
            width: "100%",
            maxWidth: "520px",
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "56px 48px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <p style={{ ...pageStyles.eyebrow, marginBottom: "10px" }}>Welcome back</p>
          <h1
            style={{
              fontSize: "clamp(28px, 3vw, 36px)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              color: "#000",
              margin: "0 0 8px",
            }}
          >
            Sign in to your account
          </h1>
          <p style={{ ...pageStyles.body, marginBottom: "36px" }}>
            Access your appointments, service history, and maintenance plans.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <InputField
              icon={Mail}
              type="email"
              name="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password with toggle */}
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
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                aria-label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  ...inputStyle,
                  paddingRight: "48px",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.5)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
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
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>

            {/* Forgot password */}
            <div style={{ textAlign: "right", marginTop: "-4px" }}>
              <Link
                to="/forgot-password"
                style={{
                  fontSize: "13px",
                  color: "#3F3F46",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#3F3F46")}
              >
                Forgot password?
              </Link>
            </div>

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
                marginTop: "4px",
                letterSpacing: "-0.01em",
              }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = "#333"; }}
              onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = "#000"; }}
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>

            {/* Error message */}
            {error && (
              <p style={{ color: "#c0392b", fontSize: "14px", textAlign: "center", margin: "4px 0 0", background: "rgba(192,57,43,0.07)", borderRadius: "8px", padding: "10px 14px" }}>
                {error}
              </p>
            )}
          </form>

          <p style={{ ...pageStyles.body, textAlign: "center", marginTop: "32px" }}>
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{
                color: "#000",
                fontWeight: 600,
                textDecoration: "none",
                borderBottom: "1.5px solid #000",
                paddingBottom: "1px",
              }}
            >
              Create one
            </Link>
          </p>
        </div>

        {/* Right — Visual Panel */}
        <div
          className="auth-visual"
          style={{
            flex: 1,
            backgroundImage:
              "linear-gradient(135deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 100%), url('https://images.pexels.com/photos/6471913/pexels-photo-6471913.jpeg?auto=compress&cs=tinysrgb&w=1400')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "56px",
            position: "relative",
          }}
        >
          <blockquote style={{ margin: 0 }}>
            <p
              style={{
                color: "#fff",
                fontSize: "clamp(22px, 2.5vw, 32px)",
                fontWeight: 500,
                lineHeight: 1.35,
                letterSpacing: "-0.02em",
                fontFamily: "'TT Norms Pro', sans-serif",
                marginBottom: "20px",
              }}
            >
              "From the first call to the final walkthrough — the team made everything easy."
            </p>
            <footer style={{ color: "rgba(255,255,255,0.65)", fontSize: "14px" }}>
              — Amanda R., Homer Glen, IL
            </footer>
          </blockquote>
        </div>
      </div>
    </PageShell>
  );
}
