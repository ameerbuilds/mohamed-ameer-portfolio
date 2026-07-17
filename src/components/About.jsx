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
  const inView = useInView(ref, { once: true, amount: 0.6 });

  const [display, setDisplay] = useState(0);

  const mv = useMotionValue(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(mv, value, {
        duration: 1.2,
        onUpdate: (latest) => {
          setDisplay(Math.round(latest));
        },
      });

      return () => controls.stop();
    }
  }, [inView, value, mv]);

  const sectionMap = {
    Projects: "#projects",
    Internships: "#experience",
    Certifications: "#certifications",
    Technologies: "#skills",
  };

  const icons = {
    Projects: "🚀",
    Internships: "💼",
    Certifications: "📜",
    Technologies: "💻",
  };

  return (
    <a
      href={sectionMap[label]}
      ref={ref}
      className="group bg-panel border border-line rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-acid hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] block cursor-pointer"
    >
      <div className="text-3xl mb-3">{icons[label]}</div>

      <div className="font-display font-bold text-5xl text-gradient">
        {display}
      </div>

      <div className="mt-2 text-muted group-hover:text-bone transition">
        {label}
      </div>

      <div className="mt-4 text-xs text-acid opacity-0 group-hover:opacity-100 transition">
        Click to View →
      </div>
    </a>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="py-28 max-w-6xl mx-auto px-6"
    >
      <SectionHeading
        eyebrow="ABOUT ME"
        title="Engineer by Training. Developer by Passion."
      />

      <div className="grid lg:grid-cols-2 gap-16">

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-5 text-muted leading-8">

            <p>
              I am an Information Science and Engineering graduate with a
              strong passion for software development and problem-solving.
            </p>

            <p>
              I have hands-on experience building full-stack web applications
              using the MERN Stack and creating interactive dashboards with
              Power BI.
            </p>

            <p>
              I am continuously improving my knowledge in Cloud Computing,
              React, Node.js, and modern software engineering practices to
              become a well-rounded Software Engineer.
            </p>

          </div>

          <div className="mt-12 border-l-2 border-line pl-6 space-y-8">

            {profile.timeline.map((item) => (

              <div key={item.title} className="relative">

                <span className="absolute -left-[33px] top-1 w-4 h-4 rounded-full bg-acid"></span>

                <div className="text-acid text-sm font-semibold">
                  {item.year}
                </div>

                <div className="text-lg font-semibold mt-1">
                  {item.title}
                </div>

                <p className="text-muted mt-1">
                  {item.detail}
                </p>

              </div>

            ))}

          </div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-6"
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