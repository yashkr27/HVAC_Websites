import { Lock } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import logoWebp from "../assets/logo.webp";
import { pageStyles } from "../components/siteData.js";
import { useAuth } from "../context/AuthContext.jsx";

const inputStyle = {
  width: "100%",
  border: "1.5px solid rgba(0,0,0,0.12)",
  borderRadius: "12px",
  padding: "14px 16px 14px 48px",
  fontSize: "24px", // larger for OTP
  letterSpacing: "0.2em",
  fontFamily: "'TT Norms Pro', sans-serif",
  background: "#fff",
  color: "#000",
  outline: "none",
  transition: "border-color 0.2s",
  textAlign: "center",
};

export default function VerifyOTP() {
  const { verifyOtp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const email = location.state?.email;

  // If accessed directly without an email, redirect to signup
  if (!email) {
    return <Navigate to="/signup" replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!token || token.length < 6) {
      setError("Please enter a valid 6-digit code.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const { error } = await verifyOtp(email, token);
      if (error) {
        setError(error.message || "Invalid verification code. Please try again.");
      } else {
        navigate("/");
      }
    } catch {
      setError("Failed to verify code. Please try again.");
    } finally {
      setLoading(false);
    }
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
      {/* Left — Form Panel */}
      <div
        style={{
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
        className="auth-panel"
      >
        <style>{`
          @media (max-width: 768px) {
            .auth-panel { max-width: 100% !important; padding: 40px 28px !important; }
            .auth-visual { display: none !important; }
          }
        `}</style>

        {/* Logo */}
        <Link to="/" style={{ display: "inline-block", marginBottom: "48px" }}>
          <img
            src={logoWebp}
            alt="AAA Heating & Air"
            style={{ height: "36px", width: "auto", objectFit: "contain" }}
          />
        </Link>

        <p style={{ ...pageStyles.eyebrow, marginBottom: "10px" }}>Verification</p>
        <h1
          style={{
            fontSize: "clamp(28px, 3vw, 36px)",
            fontWeight: 500,
            letterSpacing: "-0.03em",
            color: "#000",
            margin: "0 0 8px",
          }}
        >
          Check your email
        </h1>
        <p style={{ ...pageStyles.body, marginBottom: "36px", lineHeight: 1.6 }}>
          We sent a 6-digit verification code to <strong>{email}</strong>. 
          Please enter it below to confirm your account.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
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
              type="text"
              name="token"
              placeholder="000000"
              maxLength={6}
              value={token}
              onChange={(e) => setToken(e.target.value.replace(/[^0-9]/g, ''))}
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.5)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)")}
            />
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
            {loading ? "Verifying…" : "Verify Account"}
          </button>

          {/* Error message */}
          {error && (
            <p style={{ color: "#c0392b", fontSize: "14px", textAlign: "center", margin: "4px 0 0", background: "rgba(192,57,43,0.07)", borderRadius: "8px", padding: "10px 14px" }}>
              {error}
            </p>
          )}
        </form>

        <p style={{ ...pageStyles.body, textAlign: "center", marginTop: "32px", fontSize: "14px" }}>
          Didn't receive the email? Check your spam folder or{" "}
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
            try again
          </Link>
        </p>

        {/* Back to site */}
        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <Link
            to="/"
            style={{
              fontSize: "13px",
              color: "rgba(0,0,0,0.4)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.4)")}
          >
            ← Back to AAA Heating &amp; Air
          </Link>
        </div>
      </div>

      {/* Right — Visual Panel */}
      <div
        className="auth-visual"
        style={{
          flex: 1,
          backgroundImage:
            "linear-gradient(135deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 100%), url('https://images.pexels.com/photos/5463582/pexels-photo-5463582.jpeg?auto=compress&cs=tinysrgb&w=1400')",
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
            "Security and peace of mind — for your home and your data."
          </p>
        </blockquote>
      </div>
    </div>
  );
}
