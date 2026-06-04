import { MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import logoWebp from "../assets/logo.webp";
import "./ChatbotWidget.css";

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

  function sendLocalMessage() {
    const text = draft.trim();
    if (!text) return;

    setMessages((current) => [
      ...current,
      {
        id: `${Date.now()}-${current.length}`,
        text,
      },
    ]);
    setDraft("");
  }

  useEffect(() => {
    if (isAuthPage) {
      setIsOpen(false);
      setShowTooltip(false);
    }
  }, [isAuthPage]);

  useEffect(() => {
    if (shouldHide || isAuthPage || isOpen || tooltipSeenRef.current) return undefined;

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
      <div className={`hvac-chat-tooltip ${showTooltip ? "is-visible" : ""}`} role="status">
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

        <div className="hvac-chat-messages">
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
                  onClick={() => setDraft(action)}
                >
                  {action}
                </button>
              ))}
            </div>
          </div>

          {messages.map((message) => (
            <div key={message.id} className="hvac-chat-message-row is-user">
              <p className="hvac-chat-bubble hvac-chat-bubble-user">{message.text}</p>
            </div>
          ))}
        </div>

        <div className="hvac-chat-input-area">
          <form
            className="hvac-chat-input-shell"
            onSubmit={(event) => {
              event.preventDefault();
              sendLocalMessage();
            }}
          >
            <input
              type="text"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Type your message..."
              aria-label="Type your message"
            />
            <button
              className="hvac-chat-send"
              type="submit"
              aria-label="Send message"
              disabled={!draft.trim()}
            >
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
