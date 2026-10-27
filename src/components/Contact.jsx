
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaWhatsapp,
  FaGithub,
  FaLinkedin,
  FaPaperPlane,
} from "react-icons/fa";
import { profile } from "../data/profile";
import SectionHeading from "./SectionHeading";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const update = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));

    setStatus("");
  };

  async function sendEmail(e) {
    e.preventDefault();

    if (loading) return;

    setStatus("");

    const next = {};

    if (!form.name.trim()) {
      next.name = "Please enter your name.";
    }

    if (!EMAIL_RE.test(form.email.trim())) {
      next.email = "Please enter a valid email.";
    }

    if (!form.subject.trim()) {
      next.subject = "Please enter a subject.";
    }

    if (form.message.trim().length < 10) {
      next.message =
        "Message should contain at least 10 characters.";
    }

    setErrors(next);

    if (Object.keys(next).length > 0) return;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error(
        "EmailJS configuration missing. Check your .env file."
      );
      setStatus("config-error");
      return;
    }

    setLoading(true);

    try {
      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name.trim(),
          from_email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
          reply_to: form.email.trim(),
        },
        {
          publicKey: PUBLIC_KEY,
        }
      );

      console.log("EmailJS response:", response.status);

      setStatus("success");

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setErrors({});
    } catch (err) {
      console.error("EmailJS sending failed:", err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  function openWhatsApp() {
    const rawNumber = String(profile.whatsapp || "").trim();

    // Use a real WhatsApp number in src/data/profile.js.
    const phoneNumber = rawNumber.replace(/\D/g, "");

    if (!phoneNumber) {
      console.error(
        "WhatsApp number is missing. Check src/data/profile.js."
      );
      setStatus("whatsapp-error");
      return;
    }

    const text = [
      "Hello Mohamed,",
      "",
      "I am contacting you through your portfolio.",
      "",
      `Name: ${form.name.trim() || "Not provided"}`,
      `Email: ${form.email.trim() || "Not provided"}`,
      `Subject: ${form.subject.trim() || "Not provided"}`,
      "",
      "Message:",
      form.message.trim() || "Hello!",
    ].join("\n");

    const url =
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section
      id="contact"
      className="py-28 max-w-7xl mx-auto px-6"
    >
      <SectionHeading
        eyebrow="CONTACT"
        title="Let's Work Together"
        subtitle="Interested in working together? Feel free to send me a message."
      />

      <div className="grid lg:grid-cols-2 gap-10">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* EMAIL */}
          <div className="bg-panel/90 backdrop-blur-xl border border-line rounded-3xl p-6 hover:border-acid transition">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-acid/10 flex items-center justify-center text-acid text-2xl">
                <FaEnvelope />
              </div>

              <div>
                <p className="text-sm text-muted">Email</p>
                <a
                  href={`mailto:${profile.email}`}
                  className="font-semibold hover:text-acid transition break-all"
                >
                  {profile.email}
                </a>
              </div>
            </div>
          </div>

          {/* WHATSAPP */}
          <div className="bg-panel/90 backdrop-blur-xl border border-line rounded-3xl p-6 hover:border-green-400 transition">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-400 text-2xl">
                <FaWhatsapp />
              </div>

              <div>
                <p className="text-sm text-muted">WhatsApp</p>
                <a
                  href={
                    profile.whatsapp
                      ? `https://wa.me/${String(
                          profile.whatsapp
                        ).replace(/\D/g, "")}`
                      : "#contact"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (!profile.whatsapp) {
                      e.preventDefault();
                      setStatus("whatsapp-error");
                    }
                  }}
                  className="font-semibold hover:text-green-400 transition"
                >
                  {profile.phone || "Chat on WhatsApp"}
                </a>
              </div>
            </div>
          </div>

          {/* GITHUB */}
          <div className="bg-panel/90 backdrop-blur-xl border border-line rounded-3xl p-6 hover:border-blue-500 transition">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 text-2xl">
                <FaGithub />
              </div>

              <div>
                <p className="text-sm text-muted">GitHub</p>
                <a
                  href={profile.github || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold hover:text-blue-400 transition"
                >
                  Visit GitHub
                </a>
              </div>
            </div>
          </div>

          {/* LINKEDIN */}
          <div className="bg-panel/90 backdrop-blur-xl border border-line rounded-3xl p-6 hover:border-blue-400 transition">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-blue-400/10 flex items-center justify-center text-blue-400 text-2xl">
                <FaLinkedin />
              </div>

              <div>
                <p className="text-sm text-muted">LinkedIn</p>
                <a
                  href={profile.linkedin || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold hover:text-blue-400 transition"
                >
                  View Profile
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE: CONTACT FORM */}
        <motion.form
          onSubmit={sendEmail}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-panel/90 backdrop-blur-xl border border-line rounded-3xl p-8 space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <Field
              label="Your Name"
              name="name"
              placeholder="John Doe"
              autoComplete="name"
              value={form.name}
              onChange={update("name")}
              error={errors.name}
            />

            <Field
              label="Email Address"
              name="email"
              type="email"
              placeholder="john@example.com"
              autoComplete="email"
              value={form.email}
              onChange={update("email")}
              error={errors.email}
            />
          </div>

          <Field
            label="Subject"
            name="subject"
            placeholder="Job Opportunity"
            value={form.subject}
            onChange={update("subject")}
            error={errors.subject}
          />

          <FieldTextarea
            label="Message"
            name="message"
            placeholder="Write your message..."
            rows={6}
            value={form.message}
            onChange={update("message")}
            error={errors.message}
          />

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-acid text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <FaPaperPlane />
              {loading ? "Sending..." : "Send Email"}
            </button>

            <button
              type="button"
              onClick={openWhatsApp}
              className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              <FaWhatsapp />
              WhatsApp
            </button>
          </div>

          {status === "success" && (
            <div
              role="status"
              className="bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl p-4 mt-4"
            >
              <p className="font-semibold">
                Your message has been sent successfully!
              </p>
              <p>
                Thank you for contacting me. I'll get back to you soon.
              </p>
            </div>
          )}

          {status === "error" && (
            <div
              role="alert"
              className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-4 mt-4"
            >
              <p className="font-semibold">
                Failed to send message.
              </p>
              <p>
                Please check your EmailJS configuration and try again.
              </p>
            </div>
          )}

          {status === "config-error" && (
            <div
              role="alert"
              className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-4 mt-4"
            >
              EmailJS configuration is missing. Check the three
              VITE_EMAILJS variables in your .env file and restart
              your development server.
            </div>
          )}

          {status === "whatsapp-error" && (
            <div
              role="alert"
              className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-4 mt-4"
            >
              WhatsApp number is missing. Add your number to
              profile.whatsapp in src/data/profile.js.
            </div>
          )}
        </motion.form>
      </div>
    </section>
  );
}

function Field({ label, error, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={props.name}
        className="text-sm font-medium text-muted"
      >
        {label}
      </label>

      <input
        {...props}
        id={props.name}
        required
        className="w-full bg-panel border border-line rounded-xl px-4 py-3 outline-none focus:border-acid transition"
      />

      {error && (
        <span className="text-red-400 text-xs" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

function FieldTextarea({ label, error, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={props.name}
        className="text-sm font-medium text-muted"
      >
        {label}
      </label>

      <textarea
        {...props}
        id={props.name}
        required
        className="w-full bg-panel border border-line rounded-xl px-4 py-3 outline-none resize-none focus:border-acid transition"
      />

      {error && (
        <span className="text-red-400 text-xs" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
