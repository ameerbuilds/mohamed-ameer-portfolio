import { motion } from "framer-motion";
import { FaAward, FaExternalLinkAlt } from "react-icons/fa";
import { certifications } from "../data/certifications.js";
import SectionHeading from "./SectionHeading.jsx";

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="py-28 max-w-7xl mx-auto px-6"
    >
      <SectionHeading
        eyebrow="CERTIFICATIONS"
        title="Professional Certifications"
        subtitle="Certifications that demonstrate my continuous learning and technical expertise."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">

        {certifications.map((cert, index) => (

          <motion.div
            key={cert.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.08,
            }}
            className="
              group
              bg-panel/90
              backdrop-blur-xl
              border
              border-line
              rounded-3xl
              p-7
              transition-all
              duration-500
              hover:-translate-y-3
              hover:border-acid
              hover:shadow-[0_20px_60px_rgba(59,130,246,0.25)]
            "
          >

            <div className="flex justify-between items-center mb-6">

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
                "
              >
                <FaAward />
              </div>

              <span
                className="
                  px-3
                  py-1
                  rounded-full
                  bg-acid/10
                  text-acid
                  text-xs
                  font-semibold
                "
              >
                #{index + 1}
              </span>

            </div>

            <h3 className="font-display text-xl font-bold mb-3">
              {cert.name}
            </h3>

            <p className="text-acid font-semibold mb-3">
              {cert.issuer}
            </p>

            <p className="text-muted leading-7 mb-6">
              {cert.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">

              {cert.skills.map((skill) => (

                <span
                  key={skill}
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
                  "
                >
                  {skill}
                </span>

              ))}

            </div>

            <a
              href={cert.link}
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex
                items-center
                gap-2
                text-acid
                font-semibold
                hover:gap-3
                transition-all
              "
            >
              View Certificate
              <FaExternalLinkAlt />
            </a>

          </motion.div>

        ))}

      </div>

    </section>
  );
}