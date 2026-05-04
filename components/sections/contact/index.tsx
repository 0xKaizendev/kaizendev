"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { sendEmail } from "@/actions/send-email";

export default function Contact() {
  const { ref } = useSectionInView("contact");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const { error } = await sendEmail(formData);
    setSubmitting(false);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success("Email sent successfully!");
    e.currentTarget.reset();
  };

  return (
    <section id="contact" ref={ref} className="kz-section">
      <div className="kz-page">
        <p className="kz-eyebrow">Get in touch</p>
        <h2 className="kz-h2">Let&apos;s <em>build</em> something.</h2>
        <p className="kz-section-lede">
          Open to freelance &amp; full-time. Reply usually within a day.
        </p>
        <div className="kz-contact">
          <div className="kz-contact-info">
            <p>
              The fastest way is direct email — but the form below works too. I read everything.
            </p>
            <div className="kz-contact-cards">
              <a className="kz-contact-card" href="mailto:rozales@kaizendev.me">
                <span className="kz-contact-card-icon">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-10 5L2 7" />
                  </svg>
                </span>
                <span className="kz-contact-card-body">
                  <span className="kz-contact-card-label">Email</span>
                  <span className="kz-contact-card-value">rozales@kaizendev.me</span>
                </span>
              </a>
              <a
                className="kz-contact-card"
                href="https://t.me/kaizendev"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="kz-contact-card-icon">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </span>
                <span className="kz-contact-card-body">
                  <span className="kz-contact-card-label">Telegram</span>
                  <span className="kz-contact-card-value">@kaizendev</span>
                </span>
              </a>
              <span className="kz-contact-card">
                <span className="kz-contact-card-icon">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <span className="kz-contact-card-body">
                  <span className="kz-contact-card-label">Based in</span>
                  <span className="kz-contact-card-value">Lomé · Togo (UTC+0)</span>
                </span>
              </span>
            </div>
          </div>
          <form className="kz-form" onSubmit={onSubmit}>
            <div className="kz-form-row">
              <div className="kz-field">
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  name="senderName"
                  className="kz-input"
                  placeholder="Yuki Tanaka"
                  maxLength={200}
                />
              </div>
              <div className="kz-field">
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  name="senderEmail"
                  className="kz-input"
                  type="email"
                  required
                  maxLength={500}
                  placeholder="you@team.com"
                />
              </div>
            </div>
            <div className="kz-field">
              <label htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                name="subject"
                className="kz-input"
                placeholder="Smart contract audit, full-stack build, etc."
                maxLength={300}
              />
            </div>
            <div className="kz-field">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                className="kz-textarea"
                placeholder="Tell me about it 👋"
                required
                maxLength={5000}
              />
            </div>
            <button
              className="kz-btn kz-btn-primary"
              type="submit"
              style={{ justifySelf: "start" }}
              disabled={submitting}
            >
              {submitting ? "Sending..." : "Send message"} <span className="arrow">→</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
