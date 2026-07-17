import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skillGroups } from "../data/skills.js";
import SectionHeading from "./SectionHeading.jsx";

function SkillBar({ name, level }) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.4,
  });

  return (
    <div ref={ref} className="mb-5 last:mb-0">
      <div className="flex items-center justify-between mb-2">
        <span className="text-bone font-medium">
          {name}
        </span>

        <span className="px-2 py-1 rounded-full bg-acid/10 text-acid text-xs font-semibold">
          {level}%
        </span>
      </div>

      <div className="w-full h-2 rounded-full bg-line overflow-hidden">

        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-acid via-blue-400 to-coral shadow-lg"
          initial={{ width: 0 }}
          animate={{
            width: inView ? `${level}%` : 0,
          }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
        />

      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-28 max-w-7xl mx-auto px-6"
    >
      <SectionHeading
        eyebrow="TECHNICAL SKILLS"
        title="Technologies & Tools"
        subtitle="A combination of modern technologies, frameworks, databases, cloud platforms, and development tools used to build scalable software solutions."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {skillGroups.map((group, index) => (

          <motion.div
            key={group.category}
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.08,
            }}
            className="
            group
            rounded-3xl
            border
            border-line
            bg-panel/90
            backdrop-blur-lg
            p-7
            transition-all
            duration-500
            hover:-translate-y-3
            hover:border-acid
            hover:shadow-[0_15px_45px_rgba(59,130,246,0.25)]
            "
          >

            <div className="flex items-center gap-4 mb-7">

              <div
                className="
                w-14
                h-14
                rounded-2xl
                bg-acid/10
                text-acid
                flex
                items-center
                justify-center
                text-2xl
                group-hover:rotate-6
                group-hover:scale-110
                transition-all
                duration-300
                "
              >
                {group.icon}
              </div>

              <div>

                <h3 className="font-display text-xl font-bold tracking-wide">
                  {group.category}
                </h3>

                <p className="text-muted text-sm">
                  {group.skills.length} Skills
                </p>

              </div>

            </div>

            {group.skills.map((skill) => (

              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
              />

            ))}

          </motion.div>

        ))}

      </div>
    </section>
  );
}