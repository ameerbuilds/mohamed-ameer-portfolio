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
        onUpdate: (latest) => setDisplay(Math.round(latest)),
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
      className="group block cursor-pointer rounded-2xl border border-line bg-panel p-6 transition-all duration-300 hover:-translate-y-2 hover:border-acid hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]"
    >
      <div className="mb-3 text-3xl">{icons[label]}</div>

      <div className="font-display text-5xl font-bold text-gradient">
        {display}
      </div>

      <div className="mt-2 text-muted transition group-hover:text-bone">
        {label}
      </div>

      <div className="mt-4 text-xs text-acid opacity-0 transition group-hover:opacity-100">
        Click to View →
      </div>
    </a>
  );
}

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        eyebrow="A LITTLE ABOUT ME"
        title="Curious by Nature. An Engineer at Heart."
      />

      <div className="grid gap-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-5 leading-8 text-muted">
            <p>
              I’m an Information Science and Engineering graduate who enjoys
              figuring out how technology works behind the scenes. Whether
              it’s understanding a Linux system, exploring cloud services, or
              building something for the web, I like learning by getting hands-on
              and working through problems myself.
            </p>

            <p>
              Over time, my interests have grown beyond writing code. I’ve
              become increasingly interested in Linux administration, AWS
              infrastructure, deployment, and the tools that help applications
              run reliably. I’m also continuing to build on my web development
              experience through projects and practical learning.
            </p>

            <p>
              I know there’s always more to learn, and that’s one of the things
              I enjoy about working in technology. Right now, I’m focused on
              strengthening my technical fundamentals, improving my
              troubleshooting skills, and gaining the kind of hands-on
              experience that comes from solving real problems. I’m looking
              forward to starting my career, contributing to a team, and
              growing into a dependable IT professional.
            </p>
          </div>

          <div className="mt-12 space-y-8 border-l-2 border-line pl-6">
            {profile.timeline.map((item) => (
              <div key={item.title} className="relative">
                <span className="absolute -left-[33px] top-1 h-4 w-4 rounded-full bg-acid" />

                <div className="text-sm font-semibold text-acid">
                  {item.year}
                </div>

                <div className="mt-1 text-lg font-semibold">
                  {item.title}
                </div>

                <p className="mt-1 text-muted">{item.detail}</p>
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