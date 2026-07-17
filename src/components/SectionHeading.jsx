import { motion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
      className="mb-14"
    >
      <div className="font-mono text-xs text-coral tracking-[2px] uppercase flex items-center gap-2.5 mb-4">
        <span className="w-6 h-px bg-coral" />
        {eyebrow}
      </div>
      <h2 className="font-display font-semibold text-[clamp(28px,4vw,42px)] tracking-tight mb-3">{title}</h2>
      {subtitle && <p className="text-muted max-w-lg text-[15px]">{subtitle}</p>}
    </motion.div>
  );
}
