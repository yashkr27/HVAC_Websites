import { Clock, Mail, Phone, ShieldCheck } from "lucide-react";
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
};

export default function Contact() {
  return (
    <PageShell>
      <PageHero
        title="Get Your Free Estimate"
        subtitle="We're here to help with all your heating and cooling needs."
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
          <form style={pageStyles.card}>
            <h2 style={{ ...pageStyles.h2, marginBottom: "28px" }}>Request Estimate</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
              <input style={inputStyle} type="text" name="name" placeholder="Full Name" aria-label="Full Name" />
              <input style={inputStyle} type="email" name="email" placeholder="Email" aria-label="Email" />
              <input style={inputStyle} type="tel" name="phone" placeholder="Phone" aria-label="Phone" />
              <input style={inputStyle} type="text" name="service" placeholder="Service Needed" aria-label="Service Needed" />
            </div>
            <textarea
              style={{ ...inputStyle, minHeight: "160px", resize: "vertical", marginTop: "16px" }}
              name="message"
              placeholder="Message"
              aria-label="Message"
            />
            <div style={{ marginTop: "24px" }}>
              <ButtonLink href="/contact" compact>
                Request Estimate
              </ButtonLink>
            </div>
          </form>

          <aside style={pageStyles.card}>
            <h2 style={{ fontSize: "26px", margin: "0 0 24px", letterSpacing: "-0.02em" }}>Contact Information</h2>
            {[
              [Phone, "Phone Number", "(708) 555-0198"],
              [Mail, "Email Address", "hello@aaaheatingair.com"],
              [Clock, "Business Hours", "Mon-Fri 8am-6pm, Sat 9am-2pm"],
              [ShieldCheck, "Emergency Service", "Available"],
            ].map(([Icon, label, value]) => (
              <div key={label} style={{ display: "flex", gap: "14px", marginBottom: "22px" }}>
                <Icon size={22} color="#000" style={{ flex: "0 0 auto", marginTop: "2px" }} />
                <div>
                  <p style={{ color: "#000", fontWeight: 600, marginBottom: "4px" }}>{label}</p>
                  <p style={pageStyles.body}>{value}</p>
                </div>
              </div>
            ))}
          </aside>
        </div>
      </section>

      <section className="responsive-section" style={{ padding: "0 24px 96px" }}>
        <div
          style={{
            ...pageStyles.container,
            borderRadius: "16px",
            overflow: "hidden",
            minHeight: "280px",
            backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.78), rgba(0,0,0,0.3)), url('${hvacImages.maintenance}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "48px",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "28px",
            flexWrap: "wrap",
            textAlign: "left",
          }}
        >
          <h2 style={{ color: "#fff", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 500, letterSpacing: "-0.03em", margin: 0 }}>
            Need Immediate Assistance?
          </h2>
          <ButtonLink href="tel:17085550198" compact>
            Call Now
          </ButtonLink>
        </div>
      </section>
    </PageShell>
  );
}
