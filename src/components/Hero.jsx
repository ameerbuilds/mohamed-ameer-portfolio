import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";
import { useTypewriter } from "../hooks/useTypewriter.js";
import { profile } from "../data/profile.js";
import Terminal from "./Terminal.jsx";

export default function Hero() {
  const role = useTypewriter(profile.roles);

  const techStack = [
    "React",
    "Node.js",
    "MongoDB",
    "Python",
    "Power BI",
    "Git",
    "AWS",
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-36 pb-16"
    >
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >

          <p className="text-acid font-semibold mb-3">
            👋 Hello, I'm
          </p>

          <h1 className="text-[clamp(50px,7vw,78px)] font-extrabold leading-tight mb-2">
            Mohamed{" "}
            <span className="text-gradient">
              Ameer
            </span>
          </h1>

          <div className="text-xl md:text-2xl font-semibold text-muted h-10 mb-6">
            {role}
          </div>

          <p className="text-muted leading-8 text-lg max-w-xl">
            {profile.tagline}
          </p>

          {/* Buttons */}

          <div className="flex flex-wrap gap-4 mt-10">

            {/* Resume - Opens in New Tab */}
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-acid text-white px-6 py-3 rounded-xl font-semibold hover:bg-coral transition"
            >
              <HiDownload />
              Resume
            </a>

            {/* Projects */}
            <a
              href="#projects"
              className="border border-line px-6 py-3 rounded-xl hover:bg-panel transition"
            >
              Projects
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${profile.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-line px-6 py-3 rounded-xl hover:bg-panel transition"
            >
              WhatsApp
            </a>

          </div>

          {/* Tech Stack */}

          <div className="flex flex-wrap gap-3 mt-10">

            {techStack.map((tech) => (

              <span
                key={tech}
                className="bg-panel border border-line px-4 py-2 rounded-full text-sm hover:border-acid transition"
              >
                {tech}
              </span>

            ))}

          </div>

          {/* Social */}

          <div className="flex gap-5 mt-10 text-2xl">

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-acid transition"
            >
              <FaGithub />
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-acid transition"
            >
              <FaLinkedin />
            </a>

            <a
              href={`mailto:${profile.email}`}
              className="hover:text-acid transition"
            >
              <FaEnvelope />
            </a>

            <a
              href={`https://wa.me/${profile.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-acid transition"
            >
              <FaWhatsapp />
            </a>

          </div>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Terminal />
        </motion.div>

      </div>
    </section>
  );
}