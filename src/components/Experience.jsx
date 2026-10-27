
import { motion } from "framer-motion";
import { FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { experience } from "../data/experience.js";
import SectionHeading from "./SectionHeading.jsx";

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-28 max-w-7xl mx-auto px-6"
    >
      <SectionHeading
        eyebrow="MY JOURNEY"
        title="Experience That Shaped Me"
        subtitle="My experience in computer education taught me how to explain technical concepts, guide learners, and approach problems with patience and clarity."
      />

      <div className="space-y-8">
        {experience.map((exp, index) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
            }}
            className="group bg-panel/90 backdrop-blur-xl border border-line rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:border-acid hover:shadow-[0_20px_60px_rgba(59,130,246,0.25)]"
          >
            {/* Role, company, and duration */}
            <div className="flex justify-between items-start flex-wrap gap-4 mb-6">
              <div className="flex gap-4 items-center">
                <div className="w-14 h-14 rounded-2xl bg-acid/10 text-acid flex items-center justify-center text-xl group-hover:rotate-6 group-hover:scale-110 transition-all">
                  <FaBriefcase />
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold">
                    {exp.role}
                  </h3>

                  <p className="text-acid font-semibold">
                    {exp.company}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 text-blue-300 text-sm">
                <FaCalendarAlt />
                {exp.year}
              </div>
            </div>

            {/* Responsibilities */}
            <div className="space-y-3 mb-6">
              {exp.points.map((point) => (
                <div
                  key={point}
                  className="flex gap-3 items-start"
                >
                  <span className="text-acid mt-1">
                    ✔
                  </span>

                  <p className="text-muted leading-7">
                    {point}
                  </p>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2">
              {exp.skills?.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-2 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 text-blue-300 text-sm font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Experience certificate */}
            {exp.certificate && (
              <div className="mt-6 border-t border-line pt-5">
                <a
                  href={exp.certificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View experience certificate for ${exp.company}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-acid/40 bg-acid/10 px-4 py-3 text-base font-semibold text-acid transition hover:border-acid hover:bg-acid/20"
                >
                  <span aria-hidden="true">📄</span>
                  View Experience Certificate
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
