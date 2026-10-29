
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  animate,
} from "framer-motion";
import { profile } from "../data/profile.js";
import SectionHeading from "./SectionHeading.jsx";

function StatCounter({ value, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [display, setDisplay] = useState(0);
  const mv = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;

    const controls = animate(mv, Number(value) || 0, {
      duration: 1.2,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, value, mv]);

  const sectionMap = {
    Projects: "#projects",
    Internships: "#experience",
    Certifications: "#certifications",
    Skills: "#skills",
    Technologies: "#skills",
  };

  const icons = {
    Projects: "🚀",
    Internships: "💼",
    Certifications: "📜",
    Skills: "💻",
    Technologies: "💻",
  };

  return (
    <motion.a
      ref={ref}
      href={sectionMap[label] || "#skills"}
      aria-label={`View ${label}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group flex h-[300px] min-w-0 flex-col items-start rounded-2xl border border-line bg-panel p-5 transition-colors duration-300 hover:border-acid hover:shadow-[0_0_24px_rgba(59,130,246,0.18)]"
    >
      <div className="mb-3 text-2xl" aria-hidden="true">
        {icons[label] || "💻"}
      </div>

      <div className="font-display text-4xl font-bold text-gradient">
        {display}
      </div>

      <div className="mt-2 text-sm font-medium text-muted transition group-hover:text-bone">
        {label}
      </div>

      <div className="mt-auto pt-3 text-xs text-acid opacity-0 transition group-hover:opacity-100">
        Click to view →
      </div>
    </motion.a>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-6xl px-6 py-20 md:py-24"
    >
      <SectionHeading
        eyebrow="A LITTLE ABOUT ME"
        title="Curious by Nature. An Engineer at Heart."
      />

      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
        {/* About text and animated journey timeline */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="space-y-5"
        >
          <p className="text-muted leading-8">
            I'm an Information Science and Engineering graduate
            interested in Linux system administration, AWS cloud
            infrastructure, and DevOps engineering. I enjoy
            understanding how systems work, troubleshooting
            technical issues, and learning tools used to manage
            reliable infrastructure.
          </p>

          <p className="text-muted leading-8">
            Through hands-on projects, I have practiced Linux
            administration, server monitoring, service recovery,
            cloud deployment, and CI/CD workflows. I'm continuing
            to strengthen my practical skills and prepare for
            opportunities where I can contribute and learn from
            experienced engineers.
          </p>

          {/* My Journey */}
          <div className="relative border-l-2 border-line pl-6 pt-2">
            {/* Animated vertical line */}
            <motion.div
              className="absolute left-[-2px] top-0 w-[2px] origin-top bg-gradient-to-b from-blue-400 via-blue-500 to-cyan-400"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
              }}
              style={{ height: "100%" }}
            />

            <h3 className="mb-6 font-display text-lg font-bold text-bone">
              My Journey
            </h3>

            <div className="space-y-7">
              {profile.timeline.map((item, index) => (
                <motion.div
                  key={`${item.year}-${item.title}`}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.12,
                  }}
                  className="relative"
                >
                  {/* Glowing milestone dot */}
                  <motion.span
                    className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-blue-400 bg-[#10182B]"
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.12,
                    }}
                    style={{
                      boxShadow:
                        "0 0 12px rgba(59,130,246,0.65)",
                    }}
                  />

                  <div className="mb-1 text-sm font-semibold text-blue-400">
                    {item.year}
                  </div>

                  <h4 className="font-semibold text-bone transition-colors duration-300 hover:text-blue-400">
                    {item.title}
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-muted">
                    {item.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Statistics cards: width and height preserved */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 items-stretch gap-3 self-start sm:gap-4"
        >
          {profile.stats.map((item) => (
            <StatCounter
              key={item.label}
              value={item.value}
              label={item.label}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
