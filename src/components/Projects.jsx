import { motion } from "framer-motion";
import { projects } from "../data/projects";
import SectionHeading from "./SectionHeading";

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-28 max-w-7xl mx-auto px-6"
    >
      <SectionHeading
        eyebrow="PROJECTS"
        title="Featured Projects"
        subtitle="Projects that demonstrate my software development, problem-solving, and full-stack engineering skills."
      />

      <div className="grid lg:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
            }}
            className="
              group
              bg-panel/90
              backdrop-blur-xl
              border
              border-line
              rounded-3xl
              overflow-hidden
              transition-all
              duration-500
              hover:-translate-y-3
              hover:border-acid
              hover:shadow-[0_20px_60px_rgba(59,130,246,0.30)]
            "
          >
            <div
              className="
                h-56
                flex
                items-center
                justify-center
                text-7xl
                bg-gradient-to-br
                from-blue-900/30
                via-slate-900/40
                to-black/30
                backdrop-blur-xl
                border-b
                border-white/10
                group-hover:scale-105
                transition-all
                duration-500
              "
            >
              {project.icon}
            </div>

            <div className="p-7">
              <h2 className="font-display text-2xl font-bold mb-4">
                {project.name}
              </h2>

              <p className="text-muted leading-7 mb-6">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="
                      px-3
                      py-2
                      rounded-full
                      bg-white/5
                      backdrop-blur-lg
                      border
                      border-white/10
                      text-blue-300
                      text-xs
                      font-semibold
                      transition
                      group-hover:border-acid
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}