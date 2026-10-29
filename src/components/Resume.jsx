
import { motion } from "framer-motion";
import { FaRegFilePdf, FaDownload, FaExternalLinkAlt } from "react-icons/fa";

export default function Resume() {
  const resumePath = "/Mohamed_Ameer_Resume.pdf";

  return (
    <section id="resume" className="py-20 max-w-6xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-acid/[0.06] to-coral/[0.05] border border-line rounded-3xl p-6 md:p-12"
      >
        {/* Resume introduction and buttons */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          <div className="max-w-2xl">
            <h3 className="font-display text-4xl font-bold mb-4">
              Want the short version?
            </h3>

            <p className="text-muted text-lg leading-8">
              Explore my resume to learn about my skills, certifications,
              projects, education, and experience.
            </p>

            <div className="flex flex-wrap gap-4 mt-6">
              {/* Open PDF in a new tab */}
              

              {/* Download PDF */}
              <a
                href={resumePath}
                download="Mohamed_Ameer_Resume.pdf"
                className="inline-flex items-center gap-3 bg-acid hover:bg-coral text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                <FaDownload />
                Download My Resume
              </a>
            </div>
          </div>
        </div>

        {/* Embedded resume preview */}
        <div className="mt-10 border border-line rounded-2xl overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-panel">
            <div className="flex items-center gap-3">
              <FaRegFilePdf className="text-acid text-xl" />
              <h4 className="font-semibold text-lg">
                Resume Preview
              </h4>
            </div>

            <a
              href={resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-acid hover:underline text-sm font-medium"
            >
              <FaExternalLinkAlt />
              Open Full PDF
            </a>
          </div>

          <iframe
            src={`${resumePath}#toolbar=1&view=FitH`}
            title="Mohamed Ameer Resume Preview"
            className="block w-full bg-white"
            style={{ height: "750px", border: 0 }}
          />

          <p className="text-muted text-sm text-center p-4">
            If the preview does not appear, use Open Full PDF to view your resume.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
