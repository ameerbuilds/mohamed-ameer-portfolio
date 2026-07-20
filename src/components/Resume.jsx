import { motion } from "framer-motion";
import { FaRegFilePdf } from "react-icons/fa";

export default function Resume() {
  return (
    <section id="resume" className="py-20 max-w-6xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-acid/[0.06] to-coral/[0.05] border border-line rounded-3xl p-12"
      >
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          <div className="max-w-2xl">
            <h3 className="font-display text-4xl font-bold mb-4">
              Want the short version?
            </h3>

            <p className="text-muted text-lg leading-8">
              Grab a copy of my resume — MERN Stack, Power BI,
              certifications, projects, and experience in one page.
            </p>
          </div>

          <a
            href="/Mohamed_Ameer_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="
              shrink-0
              inline-flex
              items-center
              gap-3
              bg-acid
              hover:bg-coral
              text-white
              px-7
              py-4
              rounded-xl
              font-semibold
              text-lg
              transition-all
              duration-300
              hover:scale-105
            "
          >
            <FaRegFilePdf />
            Resume Preview
          </a>
        </div>
      </motion.div>
    </section>
  );
}