import { motion } from 'framer-motion';

export default function Resume() {
  const handleDownload = (e) => {
    e.preventDefault();
    alert('Add your resume PDF to /public and link it here (e.g. href="/resume.pdf" download).');
  };

  return (
    <section id="resume" className="py-16 max-w-6xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-acid/[0.06] to-coral/[0.05] border border-line rounded-3xl p-12 flex items-center justify-between gap-8 flex-wrap"
      >
        <div>
          <h3 className="font-display font-semibold text-2xl mb-2">Want the short version?</h3>
          <p className="text-muted text-sm max-w-md">
            Grab a copy of my resume — MERN stack, Power BI, and everything above in one page.
          </p>
        </div>
        <a
          href="#"
          onClick={handleDownload}
          className="bg-acid text-ink px-6 py-3 rounded-xl text-sm font-semibold hover:-translate-y-0.5 transition"
        >
          Download Resume ↓
        </a>
      </motion.div>
    </section>
  );
}
