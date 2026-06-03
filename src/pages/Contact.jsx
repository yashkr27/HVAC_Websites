import { CheckCircle, Clock, Mail, Phone, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { ButtonLink, PageHero, PageShell } from "../components/SiteChrome.jsx";
import { hvacImages, pageStyles } from "../components/siteData.js";

const inputStyle = {
  width: "100%",
  border: "1px solid rgba(0,0,0,0.12)",
  borderRadius: "12px",
  padding: "14px 16px",
  fontSize: "16px",
  fontFamily: "'TT Norms Pro', sans-serif",
  background: "#F8F8F8",
  color: "#000",
  outline: "none",
  transition: "border-color 0.2s",
};

function FormInput({ type = "text", name, placeholder, label, style = {} }) {
  return (
    <input
      style={{ ...inputStyle, ...style }}
      type={type}
      name={name}
      placeholder={placeholder}
      aria-label={label || placeholder}
      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.4)")}
      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)")}
    />
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div
        style={{
          ...pageStyles.card,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "400px",
          textAlign: "center",
          gap: "20px",
        }}
      >
        <CheckCircle size={52} color="#000" />
        <h2 style={{ fontSize: "28px", fontWeight: 500, letterSpacing: "-0.02em", margin: 0 }}>
          Request Received!
        </h2>
        <p style={{ ...pageStyles.body, maxWidth: "28rem" }}>
          Thank you for reaching out. A member of our team will contact you within one business day
          to confirm your appointment.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          style={{
            background: "none",
            border: "1px solid rgba(0,0,0,0.2)",
            borderRadius: "9999px",
            padding: "10px 24px",
            cursor: "pointer",
            fontSize: "14px",
            fontFamily: "'TT Norms Pro', sans-serif",
            marginTop: "8px",
            transition: "border-color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#000")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.2)")}
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      style={pageStyles.card}
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <h2 style={{ ...pageStyles.h2, marginBottom: "28px" }}>Request Estimate</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "14px",
          marginBottom: "14px",
        }}
      >
        <FormInput name="name" placeholder="Full Name" />
        <FormInput type="email" name="email" placeholder="Email Address" />
        <FormInput type="tel" name="phone" placeholder="Phone Number" />
        <FormInput name="service" placeholder="Service Needed" />
      </div>
      <select
        name="urgency"
        aria-label="Urgency Level"
        style={{ ...inputStyle, marginBottom: "14px", cursor: "pointer" }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.4)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)")}
      >
        <option value="">Urgency Level</option>
        <option value="emergency">Emergency — ASAP</option>
        <option value="today">Today if Possible</option>
        <option value="scheduled">Scheduled Appointment</option>
        <option value="estimate">Just Getting an Estimate</option>
      </select>
      <textarea
        style={{ ...inputStyle, minHeight: "140px", resize: "vertical" }}
        name="message"
        placeholder="Additional details (optional)"
        aria-label="Message"
        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.4)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)")}
      />
      <div style={{ marginTop: "24px" }}>
        <button
          type="submit"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            background: "#000",
            color: "#fff",
            fontSize: "15px",
            fontWeight: 500,
            paddingLeft: "28px",
            paddingRight: "8px",
            paddingTop: "8px",
            paddingBottom: "8px",
            borderRadius: "9999px",
            border: "none",
            cursor: "pointer",
            transition: "background 0.2s",
            fontFamily: "'TT Norms Pro', sans-serif",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#000")}
        >
          Submit Request
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
            <CheckCircle size={16} color="#000" />
          </span>
        </button>
      </div>
    </form>
  );
}

export default function Contact() {
  return (
    <PageShell>
      <PageHero
        title="Get Your Free Estimate"
        subtitle="We're here to help with all your heating and cooling needs. Reach out and we'll be in touch within one business day."
        image={hvacImages.hero}
      />

      <section className="responsive-section" style={pageStyles.section}>
        <div
          className="contact-layout"
          style={{
            ...pageStyles.container,
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.35fr) minmax(280px, 0.65fr)",
            gap: "16px",
            textAlign: "left",
            alignItems: "start",
          }}
        >
          <ContactForm />

          <aside style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={pageStyles.card}>
              <h2 style={{ fontSize: "24px", margin: "0 0 24px", letterSpacing: "-0.02em" }}>
                Contact Information
              </h2>
              {[
                [Phone, "Phone Number", "(708) 555-0198", "tel:17085550198"],
                [Mail, "Email Address", "hello@aaaheatingair.com", "mailto:hello@aaaheatingair.com"],
                [Clock, "Business Hours", "Mon–Fri 8am–6pm · Sat 9am–2pm", null],
                [ShieldCheck, "Emergency Service", "Available 24/7", null],
              ].map(([Icon, label, value, href]) => (
                <div key={label} style={{ display: "flex", gap: "14px", marginBottom: "22px" }}>
                  <Icon size={20} color="#000" style={{ flex: "0 0 auto", marginTop: "2px" }} />
                  <div>
                    <p style={{ color: "#000", fontWeight: 600, marginBottom: "4px", fontSize: "14px" }}>
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        style={{ ...pageStyles.body, textDecoration: "none", color: "rgba(0,0,0,0.68)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.68)")}
                      >
                        {value}
                      </a>
                    ) : (
                      <p style={{ ...pageStyles.body, margin: 0 }}>{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick assurance card */}
            <div
              style={{
                ...pageStyles.card,
                background: "#000",
                color: "#fff",
              }}
            >
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: "12px",
                }}
              >
                Our Promise
              </p>
              <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: 1.45, margin: "0 0 16px" }}>
                We respond to every inquiry within one business day.
              </p>
              <p style={{ color: "rgba(255,255,255,0.62)", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>
                No automated replies. A real member of our team will review your request and reach out directly.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Emergency Banner */}
      <section style={{ padding: "0 24px 96px" }}>
        <div
          style={{
            ...pageStyles.container,
            borderRadius: "20px",
            overflow: "hidden",
            minHeight: "260px",
            backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.82), rgba(0,0,0,0.34)), url('${hvacImages.maintenance}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "48px 56px",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "28px",
            flexWrap: "wrap",
            textAlign: "left",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)",
                marginBottom: "10px",
              }}
            >
              24 / 7 Emergency Line
            </p>
            <h2
              style={{
                color: "#fff",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                margin: 0,
              }}
            >
              Need immediate assistance?
            </h2>
          </div>
          <ButtonLink href="tel:17085550198" compact>
            Call Now
          </ButtonLink>
        </div>
      </section>
    </PageShell>
  );
}
