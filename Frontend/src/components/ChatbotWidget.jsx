import { MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import logoWebp from "../assets/logo.webp";
import "./ChatbotWidget.css";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const CHAT_ENDPOINT = `${SUPABASE_URL}/functions/v1/chat`;

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
  "AC Repair",
  "AC Installation",
  "Heating Repair",
  "Heating Installation",
  "Maintenance",
  "Emergency Service",
  "Indoor Air Quality",
  "Other",
];

const authPaths = new Set(["/signin", "/signup"]);
const hiddenPathPattern = /\/(checkout|payment|payments)(\/|$)/i;

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
  const [leadData, setLeadData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
  });
  const [leadSubmitting, setLeadSubmitting] = useState(false);

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, showLeadForm, scrollToBottom]);

  // Send message to the edge function
  async function sendMessage(text) {
    const trimmed = (text || "").trim();
    if (!trimmed || isLoading) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      text: trimmed,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMsg]);
    setDraft("");
    setIsLoading(true);

    try {
      const response = await fetch(CHAT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      const botMsg = {
        id: `bot-${Date.now()}`,
        text: data.reply,
        sender: "bot",
        source: data.source,
        category: data.category,
      };
      setMessages((prev) => [...prev, botMsg]);

      // Update conversation history for Gemini context
      setHistory((prev) => [
        ...prev,
        { role: "user", content: trimmed },
        { role: "assistant", content: data.reply },
      ]);

      // Show lead form if flagged
      if (data.lead_capture) {
        setShowLeadForm(true);
      }
    } catch (err) {
      console.error("Chat error:", err);
      const errorMsg = {
        id: `error-${Date.now()}`,
        text: "Sorry, something went wrong. Please try again or call our office for immediate help.",
        sender: "bot",
        source: "error",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }

  // Submit lead capture form
  async function submitLeadForm(e) {
    e.preventDefault();
    if (leadSubmitting) return;
    if (!leadData.name || (!leadData.phone && !leadData.email)) return;

    setLeadSubmitting(true);

    try {
      const response = await fetch(CHAT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Lead submission: ${leadData.name}`,
          lead_data: leadData,
        }),
      });

      const data = await response.json();

      const confirmMsg = {
        id: `lead-${Date.now()}`,
        text: data.reply,
        sender: "bot",
        source: data.source,
      };
      setMessages((prev) => [...prev, confirmMsg]);
      setShowLeadForm(false);
      setLeadData({ name: "", phone: "", email: "", service: "" });
    } catch (err) {
      console.error("Lead submission error:", err);
      const errorMsg = {
        id: `lead-error-${Date.now()}`,
        text: "We couldn't submit your details right now. Please call our office directly.",
        sender: "bot",
        source: "error",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLeadSubmitting(false);
    }
  }

  useEffect(() => {
    if (isAuthPage) {
      setIsOpen(false);
      setShowTooltip(false);
    }
  }, [isAuthPage]);

  useEffect(() => {
    if (shouldHide || isAuthPage || isOpen || tooltipSeenRef.current)
      return undefined;

    const showTimer = window.setTimeout(() => {
      setShowTooltip(true);
      tooltipSeenRef.current = true;
      sessionStorage.setItem("aaa-hvac-chat-tooltip-seen", "true");
    }, 5000);

    const hideTimer = window.setTimeout(() => {
      setShowTooltip(false);
    }, 13000);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, [isAuthPage, isOpen, shouldHide]);

  if (shouldHide) return null;

  return (
    <aside className="hvac-chatbot" aria-label="AAA HVAC Assistant">
      <div
        className={`hvac-chat-tooltip ${showTooltip ? "is-visible" : ""}`}
        role="status"
      >
        Need help choosing the right HVAC service?
      </div>

      <section
        className={`hvac-chat-window ${isOpen ? "is-open" : ""}`}
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <header className="hvac-chat-header">
          <div className="hvac-chat-brand">
            <span className="hvac-chat-logo">
              <img src={logoWebp} alt="" />
            </span>
            <span>
              <strong>AAA HVAC Assistant</strong>
              <span className="hvac-chat-status">
                <span aria-hidden="true" />
                Online
              </span>
            </span>
          </div>
          <button
            className="hvac-chat-close"
            type="button"
            aria-label="Close assistant"
            onClick={() => setIsOpen(false)}
          >
            <X size={18} />
          </button>
        </header>

        <div className="hvac-chat-messages" ref={messagesContainerRef}>
          <div className="hvac-chat-welcome">
            <p className="hvac-chat-greeting">
              <span aria-hidden="true">👋</span> Hi there!
              <br />
              How can we help today?
            </p>
            <div className="hvac-chat-actions" aria-label="Common HVAC topics">
              {quickActions.map((action) => (
                <button
                  key={action}
                  type="button"
                  className="hvac-chat-action"
                  onClick={() => sendMessage(action)}
                  disabled={isLoading}
                >
                  {action}
                </button>
              ))}
            </div>
          </div>

          {messages.map((message) => (
            <div
              key={message.id}
              className={`hvac-chat-message-row ${
                message.sender === "user" ? "is-user" : "is-bot"
              }`}
            >
              <div>
                <p
                  className={`hvac-chat-bubble ${
                    message.sender === "user"
                      ? "hvac-chat-bubble-user"
                      : "hvac-chat-bubble-bot"
                  }`}
                >
                  {message.text}
                </p>
                {message.sender === "bot" && message.source && message.source !== "error" && (
                  <span className="hvac-chat-source-tag">
                    {message.source === "static_faq" ? "FAQ" : message.source === "lead_captured" ? "✓ Saved" : "AI"}
                  </span>
                )}
              </div>
            </div>
          ))}

          {/* Lead capture form */}
          {showLeadForm && (
            <div className="hvac-chat-message-row is-bot">
              <form className="hvac-chat-lead-form" onSubmit={submitLeadForm}>
                <p className="hvac-chat-lead-title">Share your details:</p>
                <input
                  className="hvac-chat-lead-input"
                  type="text"
                  placeholder="Your name *"
                  value={leadData.name}
                  onChange={(e) =>
                    setLeadData((d) => ({ ...d, name: e.target.value }))
                  }
                  required
                />
                <input
                  className="hvac-chat-lead-input"
                  type="tel"
                  placeholder="Phone number"
                  value={leadData.phone}
                  onChange={(e) =>
                    setLeadData((d) => ({ ...d, phone: e.target.value }))
                  }
                />
                <input
                  className="hvac-chat-lead-input"
                  type="email"
                  placeholder="Email address"
                  value={leadData.email}
                  onChange={(e) =>
                    setLeadData((d) => ({ ...d, email: e.target.value }))
                  }
                />
                <select
                  className="hvac-chat-lead-select"
                  value={leadData.service}
                  onChange={(e) =>
                    setLeadData((d) => ({ ...d, service: e.target.value }))
                  }
                >
                  <option value="">Select service (optional)</option>
                  {SERVICE_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <div className="hvac-chat-lead-actions">
                  <button
                    className="hvac-chat-lead-submit"
                    type="submit"
                    disabled={
                      leadSubmitting ||
                      !leadData.name ||
                      (!leadData.phone && !leadData.email)
                    }
                  >
                    {leadSubmitting ? "Submitting..." : "Submit"}
                  </button>
                  <button
                    className="hvac-chat-lead-cancel"
                    type="button"
                    onClick={() => setShowLeadForm(false)}
                  >
                    Skip
                  </button>
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
          <form
            className="hvac-chat-input-shell"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage(draft);
            }}
          >
            <input
              type="text"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Type your message..."
              aria-label="Type your message"
              disabled={isLoading}
            />
            <button
              className="hvac-chat-send"
              type="submit"
              aria-label="Send message"
              disabled={!draft.trim() || isLoading}
            >
              <Send size={17} />
            </button>
          </form>
        </div>
      </section>

      <button
        className="hvac-chat-launcher"
        type="button"
        aria-label={
          isOpen ? "Close AAA HVAC Assistant" : "Open AAA HVAC Assistant"
        }
        aria-expanded={isOpen}
        onClick={() => {
          setIsOpen((current) => !current);
          setShowTooltip(false);
        }}
      >
        {isOpen ? <X size={26} /> : <MessageCircle size={27} />}
      </button>
    </aside>
  );
}
