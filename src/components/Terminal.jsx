import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const COMMANDS = {
  help: 'Available commands: about, skills, projects, contact',
  about: 'MERN stack developer & Power BI enthusiast, learning cloud computing.',
  skills: 'HTML, CSS, JavaScript, React, Node, Express, MongoDB, Git, Power BI, Python.',
  projects: 'Portfolio · E-commerce Website · Online Food Ordering System · Text to Action Converter',
  contact: 'mohamedameer.dev@example.com — or use the contact form below.',
};

const DEMO_SCRIPT = ['help', 'skills', 'projects'];

/**
 * Interactive fake terminal — the site's signature element.
 * Auto-runs a short demo, then lets the visitor type real commands.
 */
export default function Terminal() {
  const [lines, setLines] = useState([]);
  const [liveText, setLiveText] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [demoDone, setDemoDone] = useState(false);
  const bodyRef = useRef(null);
  const stepRef = useRef(0);

  useEffect(() => {
    const timeout = setTimeout(runDemo, 800);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines, liveText]);

  function runDemo() {
    if (stepRef.current >= DEMO_SCRIPT.length) {
      setDemoDone(true);
      return;
    }
    const cmd = DEMO_SCRIPT[stepRef.current];
    let i = 0;
    const typing = setInterval(() => {
      i++;
      setLiveText(cmd.slice(0, i));
      if (i === cmd.length) {
        clearInterval(typing);
        setTimeout(() => {
          setLines((prev) => [...prev, { cmd, output: COMMANDS[cmd] }]);
          setLiveText('');
          stepRef.current += 1;
          setTimeout(runDemo, 450);
        }, 300);
      }
    }, 85);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const val = inputValue.trim();
    if (!val) return;
    const output = COMMANDS[val.toLowerCase()] || `command not found: ${val} — try "help"`;
    setLines((prev) => [...prev, { cmd: val, output }]);
    setInputValue('');
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-panel border border-line rounded-2xl overflow-hidden shadow-2xl"
    >
      <div className="flex items-center gap-2 px-4 py-3 bg-ink/60 border-b border-line">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="mx-auto font-mono text-[11px] text-faint">ameer@portfolio ~ zsh</span>
      </div>

      <div ref={bodyRef} className="p-5 font-mono text-[13.5px] min-h-[260px] max-h-[320px] overflow-y-auto">
        <div className="flex gap-2 mb-2 flex-wrap">
          <span className="text-acid flex-shrink-0">$</span>
          <span>whoami</span>
        </div>
        <div className="text-muted mb-4">
          Mohamed Ameer — <span className="text-coral">Full Stack Developer</span> based in India.
        </div>

        {lines.map((l, i) => (
          <div key={i}>
            <div className="flex gap-2 mb-2 flex-wrap">
              <span className="text-acid flex-shrink-0">$</span>
              <span>{l.cmd}</span>
            </div>
            <div className="text-muted mb-4 whitespace-pre-wrap">{l.output}</div>
          </div>
        ))}

        <form onSubmit={handleSubmit} className="flex gap-2 items-center">
          <span className="text-acid flex-shrink-0">$</span>
          {liveText && !demoDone ? (
            <span>{liveText}</span>
          ) : (
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="bg-transparent outline-none flex-1 min-w-[80px] text-bone"
              autoComplete="off"
              placeholder={demoDone ? 'try "skills" or "projects"' : ''}
            />
          )}
        </form>
      </div>
    </motion.div>
  );
}
