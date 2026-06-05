import { MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import logoWebp from "../assets/logo.webp";
import "./ChatbotWidget.css";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const CHAT_ENDPOINT = `${SUPABASE_URL}/functions/v1/chat`;

// ─── Emergency Diagnostic Flow ────────────────────────────────────────────────
// Price ranges for common HVAC diagnoses (low–high estimate)
const EMERGENCY_DIAGNOSES = {
  ac: {
    no_air: [
      { issue: "Failed blower motor", range: "$350–$600", confidence: "High" },
      { issue: "Tripped circuit breaker / blown fuse", range: "$0–$80 (if fuse only)", confidence: "Medium" },
      { issue: "Failed capacitor", range: "$150–$300", confidence: "High" },
    ],
    hot_air: [
      { issue: "Low refrigerant / refrigerant leak", range: "$200–$500", confidence: "High" },
      { issue: "Dirty or blocked condenser coil", range: "$100–$250 (cleaning)", confidence: "Medium" },
      { issue: "Compressor failure", range: "$800–$2,400", confidence: "Medium" },
    ],
    warm_air: [
      { issue: "Low refrigerant", range: "$200–$500", confidence: "High" },
      { issue: "Clogged air filter", range: "$20–$60 (filter replacement)", confidence: "Medium" },
      { issue: "Thermostat misconfigured", range: "$0–$150", confidence: "Low" },
    ],
  },
  heating: {
    no_air: [
      { issue: "Failed inducer motor or blower", range: "$400–$700", confidence: "High" },
      { issue: "Tripped high-limit switch", range: "$50–$150 (reset/replacement)", confidence: "Medium" },
      { issue: "Clogged filter causing shutdown", range: "$20–$60", confidence: "Medium" },
    ],
    cold_air: [
      { issue: "Faulty igniter or flame sensor", range: "$100–$300", confidence: "High" },
      { issue: "Gas valve failure", range: "$300–$600", confidence: "High" },
      { issue: "Cracked heat exchanger", range: "$500–$1,500+", confidence: "Medium" },
    ],
    warm_air: [
      { issue: "Thermostat calibration off", range: "$0–$150", confidence: "Medium" },
      { issue: "Clogged heat exchanger or filter", range: "$50–$200", confidence: "Medium" },
      { issue: "Low gas pressure", range: "$100–$250", confidence: "Medium" },
    ],
  },
};

// Wizard steps definition
const WIZARD_STEPS = {
  SERVICE: "service",
  AIR_BLOWING: "air_blowing",
  AIR_TEMP: "air_temp",
  DIAGNOSIS: "diagnosis",
  CONFIRM: "confirm",
  DONE: "done",
};

function getAirTempQuestion(service) {
  if (service === "ac") return { question: "Is the air blowing hot or just warm (not cold enough)?", options: ["Hot air — feels like heat", "Warm but not cooling well"] };
  return { question: "What temperature is the air coming out?", options: ["Cold air — no heat at all", "Lukewarm — not warm enough"] };
}

function getDiagnoses(service, airBlowing, airTemp) {
  const data = EMERGENCY_DIAGNOSES[service];
  if (!data) return [];
  if (!airBlowing) return data.no_air;
  if (service === "ac") return airTemp === 0 ? data.hot_air : data.warm_air;
  return airTemp === 0 ? data.cold_air : data.warm_air;
}

// ─── Quick Actions ─────────────────────────────────────────────────────────────
const quickActions = [
  "Schedule Service",
  "Get Free Estimate",
  "Emergency Repair",
  "AC Repair",
  "Heating Repair",
  "Maintenance",
  "Financing",
  "Contact Us",
];

const SERVICE_OPTIONS = [
  "AC Repair", "AC Installation", "Heating Repair", "Heating Installation",
  "Maintenance", "Emergency Service", "Indoor Air Quality", "Other",
];

const authPaths = new Set(["/signin", "/signup"]);
const hiddenPathPattern = /\/(checkout|payment|payments)(\/|$)/i;

// ─── Emergency Wizard UI ───────────────────────────────────────────────────────
function EmergencyWizard({ onClose, onSubmitLead }) {
  const [step, setStep] = useState(WIZARD_STEPS.SERVICE);
  const [service, setService] = useState(null); // "ac" | "heating"
  const [airBlowing, setAirBlowing] = useState(null); // true | false
  const [airTemp, setAirTemp] = useState(null); // 0 = hot/cold, 1 = warm
  const [diagnoses, setDiagnoses] = useState([]);
  const [confirmed, setConfirmed] = useState(false);

  function handleService(s) {
    setService(s);
    setStep(WIZARD_STEPS.AIR_BLOWING);
  }

  function handleAirBlowing(blowing) {
    setAirBlowing(blowing);
    if (!blowing) {
      const d = getDiagnoses(service, false, null);
      setDiagnoses(d);
      setStep(WIZARD_STEPS.DIAGNOSIS);
    } else {
      setStep(WIZARD_STEPS.AIR_TEMP);
    }
  }

  function handleAirTemp(tempIdx) {
    setAirTemp(tempIdx);
    const d = getDiagnoses(service, true, tempIdx);
    setDiagnoses(d);
    setStep(WIZARD_STEPS.DIAGNOSIS);
  }

  function handleConfirm() {
    setConfirmed(true);
    setStep(WIZARD_STEPS.CONFIRM);
  }

  const btnStyle = {
    width: "100%", padding: "11px 16px", borderRadius: "10px",
    border: "1.5px solid rgba(0,0,0,0.12)", background: "#fff",
    fontSize: "14px", fontWeight: 600, cursor: "pointer", textAlign: "left",
    fontFamily: "'TT Norms Pro', sans-serif", color: "#000",
    transition: "border-color 0.15s, background 0.15s",
    display: "flex", alignItems: "center", gap: "8px",
  };

  return (
    <div style={{
      background: "linear-gradient(135deg, #0a0a0a, #1a0505)",
      borderRadius: "16px", padding: "20px", margin: "8px 0",
      border: "1px solid rgba(239,68,68,0.25)",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{
            width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444",
            boxShadow: "0 0 6px #ef4444", display: "inline-block", flexShrink: 0,
          }} />
          <strong style={{ color: "#fff", fontSize: "13px", letterSpacing: "0.02em" }}>🚨 Emergency Diagnosis</strong>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.5)", padding: "2px", lineHeight: 1 }}>✕</button>
      </div>

      {/* STEP: Service */}
      {step === WIZARD_STEPS.SERVICE && (
        <div>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px", marginBottom: "12px", lineHeight: 1.5 }}>
            Which system is having the emergency?
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[["🧊", "Air Conditioning (AC)", "ac"], ["🔥", "Heating / Furnace", "heating"]].map(([icon, label, val]) => (
              <button key={val} onClick={() => handleService(val)} style={{
                ...btnStyle, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                color: "#fff",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
              >
                <span style={{ fontSize: "18px" }}>{icon}</span> {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP: Air Blowing? */}
      {step === WIZARD_STEPS.AIR_BLOWING && (
        <div>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px", marginBottom: "12px", lineHeight: 1.5 }}>
            Is air blowing out of your vents at all?
          </p>
          <div style={{ display: "flex", gap: "8px" }}>
            {[["Yes — air is blowing", true], ["No — nothing coming out", false]].map(([label, val]) => (
              <button key={String(val)} onClick={() => handleAirBlowing(val)} style={{
                flex: 1, padding: "10px 12px", borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.06)",
                color: "#fff", fontSize: "13px", fontWeight: 600, cursor: "pointer",
                fontFamily: "'TT Norms Pro', sans-serif",
                transition: "background 0.15s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
              >{label}</button>
            ))}
          </div>
        </div>
      )}

      {/* STEP: Air Temp */}
      {step === WIZARD_STEPS.AIR_TEMP && (() => {
        const { question, options } = getAirTempQuestion(service);
        return (
          <div>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px", marginBottom: "12px", lineHeight: 1.5 }}>{question}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {options.map((opt, idx) => (
                <button key={opt} onClick={() => handleAirTemp(idx)} style={{
                  ...btnStyle, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
                >{opt}</button>
              ))}
            </div>
          </div>
        );
      })()}

      {/* STEP: Diagnosis */}
      {step === WIZARD_STEPS.DIAGNOSIS && (
        <div>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "13px", marginBottom: "12px", lineHeight: 1.5 }}>
            Based on your answers, here are the most likely issues:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
            {diagnoses.map((d, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.05)", borderRadius: "10px",
                padding: "12px 14px", border: "1px solid rgba(255,255,255,0.08)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                  <p style={{ color: "#fff", fontSize: "13px", fontWeight: 600, margin: 0 }}>{d.issue}</p>
                  <span style={{
                    fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "9999px",
                    background: d.confidence === "High" ? "rgba(239,68,68,0.2)" : "rgba(255,255,255,0.1)",
                    color: d.confidence === "High" ? "#fca5a5" : "rgba(255,255,255,0.6)",
                    whiteSpace: "nowrap", flexShrink: 0,
                  }}>{d.confidence} likelihood</span>
                </div>
                <p style={{ color: "#ef4444", fontSize: "13px", fontWeight: 700, margin: "6px 0 0" }}>
                  Est. cost: {d.range}
                </p>
              </div>
            ))}
          </div>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "11px", marginBottom: "14px", lineHeight: 1.5 }}>
            * Estimates are approximate. Final pricing confirmed after on-site diagnosis.
          </p>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px", marginBottom: "10px", fontWeight: 600 }}>
            Would you like us to dispatch a technician now?
          </p>
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={handleConfirm} style={{
              flex: 1, padding: "11px", borderRadius: "10px", border: "none",
              background: "#ef4444", color: "#fff", fontSize: "13px", fontWeight: 700,
              cursor: "pointer", fontFamily: "'TT Norms Pro', sans-serif",
              transition: "background 0.15s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#dc2626"}
              onMouseLeave={e => e.currentTarget.style.background = "#ef4444"}
            >Yes — Dispatch Tech 🚀</button>
            <button onClick={onClose} style={{
              flex: 1, padding: "11px", borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.7)", fontSize: "13px", fontWeight: 600,
              cursor: "pointer", fontFamily: "'TT Norms Pro', sans-serif",
            }}>Not right now</button>
          </div>
        </div>
      )}

      {/* STEP: Confirmed */}
      {step === WIZARD_STEPS.CONFIRM && (
        <div>
          <p style={{ color: "#4ade80", fontSize: "15px", fontWeight: 700, marginBottom: "8px" }}>
            ✅ Dispatch request received!
          </p>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", lineHeight: 1.6, marginBottom: "16px" }}>
            We'll call you within <strong style={{ color: "#fff" }}>15–30 minutes</strong> to confirm your technician's arrival window. For immediate assistance, call us directly:
          </p>
          <a href="tel:17085550198" style={{
            display: "block", textAlign: "center", padding: "12px",
            background: "#ef4444", color: "#fff", borderRadius: "10px",
            fontWeight: 700, fontSize: "15px", textDecoration: "none",
            fontFamily: "'TT Norms Pro', sans-serif",
            boxShadow: "0 0 20px rgba(239,68,68,0.3)",
          }}>
            📞 (708) 555-0198
          </a>
          <button onClick={() => onSubmitLead(service)} style={{
            width: "100%", marginTop: "10px", padding: "10px", borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.7)", fontSize: "13px", fontWeight: 600,
            cursor: "pointer", fontFamily: "'TT Norms Pro', sans-serif",
          }}>Share my contact details instead →</button>
        </div>
      )}
    </div>
  );
}

// ─── Main Widget ───────────────────────────────────────────────────────────────
export default function ChatbotWidget() {
  const { pathname } = useLocation();
  const isAuthPage = authPaths.has(pathname);
  const shouldHide = hiddenPathPattern.test(pathname);
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipSeenRef = useRef(
    sessionStorage.getItem("aaa-hvac-chat-tooltip-seen") === "true"
  );
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [showEmergencyWizard, setShowEmergencyWizard] = useState(false);
  const [leadData, setLeadData] = useState({ name: "", phone: "", email: "", service: "" });
  const [leadSubmitting, setLeadSubmitting] = useState(false);

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, showLeadForm, showEmergencyWizard, scrollToBottom]);

  // Detect emergency keywords in user input
  function isEmergencyMessage(text) {
    const keywords = ["emergency", "urgent", "emergency repair", "no heat", "no ac", "no air", "broke", "broken", "not working", "stopped working", "won't turn on", "wont turn on", "help"];
    return keywords.some(k => text.toLowerCase().includes(k));
  }

  async function sendMessage(text) {
    const trimmed = (text || "").trim();
    if (!trimmed || isLoading) return;

    // Intercept emergency keywords — show wizard instead
    if (trimmed.toLowerCase() === "emergency repair" || isEmergencyMessage(trimmed)) {
      const userMsg = { id: `user-${Date.now()}`, text: trimmed, sender: "user" };
      const botMsg = {
        id: `bot-${Date.now()}`,
        text: "🚨 I'll help you diagnose this right away. Let me ask you a few quick questions to identify the issue and give you a price estimate.",
        sender: "bot",
        source: "emergency",
      };
      setMessages(prev => [...prev, userMsg, botMsg]);
      setDraft("");
      setTimeout(() => setShowEmergencyWizard(true), 300);
      return;
    }

    const userMsg = { id: `user-${Date.now()}`, text: trimmed, sender: "user" };
    setMessages(prev => [...prev, userMsg]);
    setDraft("");
    setIsLoading(true);

    try {
      const response = await fetch(CHAT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      const botMsg = { id: `bot-${Date.now()}`, text: data.reply, sender: "bot", source: data.source, category: data.category };
      setMessages(prev => [...prev, botMsg]);
      setHistory(prev => [...prev, { role: "user", content: trimmed }, { role: "assistant", content: data.reply }]);
      if (data.lead_capture) setShowLeadForm(true);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages(prev => [...prev, {
        id: `error-${Date.now()}`,
        text: "Sorry, something went wrong. Please try again or call our office for immediate help.",
        sender: "bot", source: "error",
      }]);
    } finally {
      setIsLoading(false);
    }
  }

  async function submitLeadForm(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (leadSubmitting) return;
    if (!leadData.name || (!leadData.phone && !leadData.email)) return;

    setLeadSubmitting(true);
    try {
      const response = await fetch(CHAT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: `Lead submission: ${leadData.name}`, lead_data: leadData }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { id: `lead-${Date.now()}`, text: data.reply, sender: "bot", source: data.source }]);
      setShowLeadForm(false);
      setShowEmergencyWizard(false);
      setLeadData({ name: "", phone: "", email: "", service: "" });
    } catch {
      setMessages(prev => [...prev, {
        id: `lead-error-${Date.now()}`,
        text: "We couldn't submit your details right now. Please call our office directly.",
        sender: "bot", source: "error",
      }]);
    } finally {
      setLeadSubmitting(false);
    }
  }

  function handleEmergencyWizardSubmitLead(service) {
    setShowEmergencyWizard(false);
    setLeadData(d => ({ ...d, service: service === "ac" ? "AC Repair" : "Heating Repair" }));
    setShowLeadForm(true);
  }

  useEffect(() => {
    if (isAuthPage) { setIsOpen(false); setShowTooltip(false); }
  }, [isAuthPage]);

  useEffect(() => {
    if (shouldHide || isAuthPage || isOpen || tooltipSeenRef.current) return undefined;
    const showTimer = window.setTimeout(() => {
      setShowTooltip(true);
      tooltipSeenRef.current = true;
      sessionStorage.setItem("aaa-hvac-chat-tooltip-seen", "true");
    }, 5000);
    const hideTimer = window.setTimeout(() => setShowTooltip(false), 13000);
    return () => { window.clearTimeout(showTimer); window.clearTimeout(hideTimer); };
  }, [isAuthPage, isOpen, shouldHide]);

  if (shouldHide) return null;

  return (
    <aside className="hvac-chatbot" aria-label="AAA HVAC Assistant">
      <div className={`hvac-chat-tooltip ${showTooltip ? "is-visible" : ""}`} role="status">
        Need help choosing the right HVAC service?
      </div>

      <section className={`hvac-chat-window ${isOpen ? "is-open" : ""}`} aria-hidden={!isOpen} inert={!isOpen}>
        <header className="hvac-chat-header">
          <div className="hvac-chat-brand">
            <span className="hvac-chat-logo"><img src={logoWebp} alt="" /></span>
            <span>
              <strong>AAA HVAC Assistant</strong>
              <span className="hvac-chat-status"><span aria-hidden="true" /> Online</span>
            </span>
          </div>
          <button className="hvac-chat-close" type="button" aria-label="Close assistant" onClick={() => setIsOpen(false)}>
            <X size={18} />
          </button>
        </header>

        <div className="hvac-chat-messages" ref={messagesContainerRef}>
          <div className="hvac-chat-welcome">
            <p className="hvac-chat-greeting">
              <span aria-hidden="true">👋</span> Hi there!
              <br />How can we help today?
            </p>
            <div className="hvac-chat-actions" aria-label="Common HVAC topics">
              {quickActions.map((action) => (
                <button
                  key={action}
                  type="button"
                  className={`hvac-chat-action${action === "Emergency Repair" ? " hvac-emergency-trigger" : ""}`}
                  style={action === "Emergency Repair" ? {
                    background: "linear-gradient(135deg, #7f1d1d, #ef4444)",
                    color: "#fff", border: "none", fontWeight: 700,
                  } : {}}
                  onClick={() => sendMessage(action)}
                  disabled={isLoading}
                >
                  {action === "Emergency Repair" ? "🚨 " : ""}{action}
                </button>
              ))}
            </div>
          </div>

          {messages.map((message) => (
            <div key={message.id} className={`hvac-chat-message-row ${message.sender === "user" ? "is-user" : "is-bot"}`}>
              <div>
                <p className={`hvac-chat-bubble ${message.sender === "user" ? "hvac-chat-bubble-user" : "hvac-chat-bubble-bot"}`}>
                  {message.text}
                </p>
                {message.sender === "bot" && message.source && message.source !== "error" && (
                  <span className="hvac-chat-source-tag">
                    {message.source === "static_faq" ? "FAQ" : message.source === "lead_captured" ? "✓ Saved" : message.source === "emergency" ? "🚨 Emergency" : "AI"}
                  </span>
                )}
              </div>
            </div>
          ))}

          {/* Emergency Wizard */}
          {showEmergencyWizard && (
            <div className="hvac-chat-message-row is-bot">
              <EmergencyWizard
                onClose={() => setShowEmergencyWizard(false)}
                onSubmitLead={handleEmergencyWizardSubmitLead}
              />
            </div>
          )}

          {/* Lead capture form */}
          {showLeadForm && (
            <div className="hvac-chat-message-row is-bot">
              <form className="hvac-chat-lead-form" onSubmit={submitLeadForm}>
                <p className="hvac-chat-lead-title">Share your details so we can reach you:</p>
                <input className="hvac-chat-lead-input" type="text" placeholder="Your name *" value={leadData.name}
                  onChange={(e) => setLeadData(d => ({ ...d, name: e.target.value }))} required />
                <input className="hvac-chat-lead-input" type="tel" placeholder="Phone number" value={leadData.phone}
                  onChange={(e) => setLeadData(d => ({ ...d, phone: e.target.value }))} />
                <input className="hvac-chat-lead-input" type="email" placeholder="Email address" value={leadData.email}
                  onChange={(e) => setLeadData(d => ({ ...d, email: e.target.value }))} />
                <select className="hvac-chat-lead-select" value={leadData.service}
                  onChange={(e) => setLeadData(d => ({ ...d, service: e.target.value }))}>
                  <option value="">Select service (optional)</option>
                  {SERVICE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <div className="hvac-chat-lead-actions">
                  <button className="hvac-chat-lead-submit" type="submit"
                    disabled={leadSubmitting || !leadData.name || (!leadData.phone && !leadData.email)}>
                    {leadSubmitting ? "Submitting..." : "Submit"}
                  </button>
                  <button className="hvac-chat-lead-cancel" type="button" onClick={() => setShowLeadForm(false)}>Skip</button>
                </div>
              </form>
            </div>
          )}

          {/* Typing indicator */}
          {isLoading && (
            <div className="hvac-chat-message-row is-bot">
              <div className="hvac-chat-typing">
                <span className="hvac-chat-typing-dot" />
                <span className="hvac-chat-typing-dot" />
                <span className="hvac-chat-typing-dot" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="hvac-chat-input-area">
          <form className="hvac-chat-input-shell" onSubmit={(e) => { e.preventDefault(); sendMessage(draft); }}>
            <input type="text" value={draft} onChange={(e) => setDraft(e.target.value)}
              placeholder="Type your message..." aria-label="Type your message" disabled={isLoading} />
            <button className="hvac-chat-send" type="submit" aria-label="Send message" disabled={!draft.trim() || isLoading}>
              <Send size={17} />
            </button>
          </form>
        </div>
      </section>

      <button
        className="hvac-chat-launcher"
        type="button"
        aria-label={isOpen ? "Close AAA HVAC Assistant" : "Open AAA HVAC Assistant"}
        aria-expanded={isOpen}
        onClick={() => { setIsOpen(c => !c); setShowTooltip(false); }}
      >
        {isOpen ? <X size={26} /> : <MessageCircle size={27} />}
      </button>
    </aside>
  );
}
