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

  const update = (field) => (e) =>
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));

  async function sendEmail(e) {
    e.preventDefault();

    const next = {};

    if (!form.name.trim())
      next.name = "Please enter your name.";

    if (!EMAIL_RE.test(form.email))
      next.email = "Please enter a valid email.";

    if (!form.subject.trim())
      next.subject = "Please enter a subject.";

    if (form.message.trim().length < 10)
      next.message = "Message should contain at least 10 characters.";

    setErrors(next);

    if (Object.keys(next).length) return;

    setLoading(true);

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        PUBLIC_KEY
      );

      setStatus("success");

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setErrors({});
    } catch (err) {
      console.error(err);
      setStatus("error");
    }

    setLoading(false);
  }

 function openWhatsApp() {
  const text = `👋 Hello Mohamed,

You have received a new message from your portfolio website.

━━━━━━━━━━━━━━━━━━━━━━

👤 Name: ${form.name}

📧 Email: ${form.email}

📝 Subject: ${form.subject}

💬 Message:

${form.message}

━━━━━━━━━━━━━━━━━━━━━━

Please reply to this message or contact the sender via email.
`;

  window.open(
    `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(text)}`,
    "_blank"
  );
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

          <div className="bg-panel/90 backdrop-blur-xl border border-line rounded-3xl p-6 hover:border-acid transition">

            <div className="flex items-center gap-5">

              <div className="w-14 h-14 rounded-2xl bg-acid/10 flex items-center justify-center text-acid text-2xl">
                <FaEnvelope />
              </div>

              <div>

                <p className="text-sm text-muted">
                  Email
                </p>

                <a
                  href={`mailto:${profile.email}`}
                  className="font-semibold hover:text-acid transition"
                >
                  {profile.email}
                </a>

              </div>

            </div>

          </div>

          <div className="bg-panel/90 backdrop-blur-xl border border-line rounded-3xl p-6 hover:border-green-400 transition">

            <div className="flex items-center gap-5">

              <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-400 text-2xl">
                <FaWhatsapp />
              </div>

              <div>

                <p className="text-sm text-muted">
                  WhatsApp
                </p>

                <a
                  href={`https://wa.me/${profile.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold hover:text-green-400 transition"
                >
                  {profile.phone}
                </a>

              </div>

            </div>

          </div>

          <div className="bg-panel/90 backdrop-blur-xl border border-line rounded-3xl p-6 hover:border-blue-500 transition">

            <div className="flex items-center gap-5">

              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 text-2xl">
                <FaGithub />
              </div>

              <div>

                <p className="text-sm text-muted">
                  GitHub
                </p>

                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold hover:text-blue-400 transition"
                >
                 Visit GitHub                </a>

              </div>

            </div>

          </div>

          <div className="bg-panel/90 backdrop-blur-xl border border-line rounded-3xl p-6 hover:border-blue-400 transition">

            <div className="flex items-center gap-5">

              <div className="w-14 h-14 rounded-2xl bg-blue-400/10 flex items-center justify-center text-blue-400 text-2xl">
                <FaLinkedin />
              </div>

              <div>

                <p className="text-sm text-muted">
                  LinkedIn
                </p>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold hover:text-blue-400 transition"
                >
                  View Profile
                </a>

              </div>

            </div>

          </div>

        </motion.div>

        {/* RIGHT SIDE */}

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
              placeholder="John Doe"
              value={form.name}
              onChange={update("name")}
              error={errors.name}
            />

            <Field
              label="Email Address"
              type="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={update("email")}
              error={errors.email}
            />

          </div>

          <Field
            label="Subject"
            placeholder="Job Opportunity"
            value={form.subject}
            onChange={update("subject")}
            error={errors.subject}
          />

          <FieldTextarea
            label="Message"
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
              className="flex items-center gap-2 bg-acid text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition disabled:opacity-60"
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

            <div className="bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl p-4 mt-4">

              ✅ Your message has been sent successfully!
Thank you for contacting me. I'll get back to you soon.

            </div>

          )}

          {status === "error" && (

            <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-4 mt-4">

              ❌ Failed to send message.
              Please try again.

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
      <label className="text-sm font-medium text-muted">
        {label}
      </label>

      <input
        {...props}
        className="w-full bg-panel border border-line rounded-xl px-4 py-3 outline-none focus:border-acid transition"
      />

      {error && (
        <span className="text-red-400 text-xs">
          {error}
        </span>
      )}
    </div>
  );
}

function FieldTextarea({ label, error, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-muted">
        {label}
      </label>

      <textarea
        {...props}
        className="w-full bg-panel border border-line rounded-xl px-4 py-3 outline-none resize-none focus:border-acid transition"
      />

      {error && (
        <span className="text-red-400 text-xs">
          {error}
        </span>
      )}
    </div>
  );
}