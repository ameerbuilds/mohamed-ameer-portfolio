
import { motion } from "framer-motion";
import { skillGroups } from "../data/skills.js";
import SectionHeading from "./SectionHeading.jsx";

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-28 max-w-7xl mx-auto px-6"
    >
      <SectionHeading
        eyebrow="TECHNICAL SKILLS"
        title="My Technical Toolkit"
        subtitle="Hands-on skills across Linux administration, AWS cloud infrastructure, DevOps workflows, and React web development."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {skillGroups.map((group, index) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="
              group rounded-3xl border border-line
              bg-panel/90 backdrop-blur-lg p-7
              transition-all duration-500
              hover:-translate-y-2 hover:border-acid
              hover:shadow-[0_15px_45px_rgba(59,130,246,0.25)]
            "
          >
            <div className="flex items-center gap-4 mb-7">
              <div
                className="
                  w-14 h-14 rounded-2xl bg-acid/10 text-acid
                  flex items-center justify-center text-2xl
                  group-hover:rotate-6 group-hover:scale-110
                  transition-all duration-300
                "
              >
                {group.icon}
              </div>

              <div>
                <h3 className="font-display text-xl font-bold tracking-wide">
                  {group.category}
                </h3>
                <p className="text-muted text-sm">
                  {group.skills.length} skills
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill.name}
                  title={skill.level}
                  className="
                    inline-flex items-center rounded-full
                    border border-line bg-acid/5
                    px-3 py-2 text-sm text-bone
                    transition-colors duration-300
                    hover:border-acid hover:bg-acid/10
                  "
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
