import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const COMMANDS = {
  help: `Available commands:

  whoami     About Mohamed Ameer
  skills     Technical skill profile
  linux      Linux administration skills
  aws        AWS cloud skills
  devops     DevOps tools and workflows
  projects   Featured projects
  contact    Contact information
  clear      Clear the terminal`,

  whoami: `Mohamed Ameer
Information Science & Engineering Graduate

Focus:
Linux Administration | AWS Cloud | DevOps | Web Development`,

  skills: `TECHNICAL SKILLS

Linux        Linux CLI, permissions, systemctl, logs
Cloud        EC2, S3, IAM, VPC, security groups
DevOps       Git, GitHub, CI/CD, Docker, Jenkins
Web          HTML, CSS, JavaScript, React, Vite

Tip: type linux, aws, or devops for more details.`,

  linux: `LINUX & SYSTEM ADMINISTRATION

> RHEL / Linux fundamentals
> CLI and file management
> Users, groups and permissions
> DNF / YUM / APT
> Services and process management
> Networking and troubleshooting
> Filesystems, mounts and logs
> Firewalld and SELinux
> Apache and Nginx

Additional exposure: RHEL migration and Red Hat Satellite.`,

  aws: `AWS CLOUD

> Amazon EC2
> Amazon S3
> AWS IAM
> VPC, subnets and route tables
> Security groups and Network ACLs
> Load balancing
> Auto Scaling
> Application deployment

Explore my Projects section for practical work.`,

  devops: `DEVOPS & DEPLOYMENT

> Git and GitHub collaboration
> Git branching and version control
> GitHub Actions and CI/CD
> Docker and Docker Compose
> Jenkins build and deployment jobs
> Vercel deployment
> AWS deployment
> Monitoring and log troubleshooting

Note: Experience varies by tool; see my projects for context.`,

  projects: `FEATURED PROJECTS

01. Developer Portfolio
    React, Tailwind CSS, Framer Motion

02. E-Commerce Website
    MongoDB, Express, React, Node.js

03. Online Food Ordering System
    C programming, data structures, file handling

Scroll to the Projects section for more details.`,

  contact: `CONTACT

Email:   mohamedameer1296@gmail.com
GitHub:  github.com/ameerbuilds
LinkedIn: linkedin.com/in/mohamed-ameer2025

Use the Contact section to send a message.`,
};

const BOOT_LINES = [
  { text: "AMEER SYSTEMS CONSOLE v1.0", type: "accent" },
  { text: "Initializing portfolio interface...", type: "muted" },
  { text: "Loading technical profile ........ OK", type: "success" },
  { text: "Loading career focus .............. OK", type: "success" },
  { text: 'Session ready. Type "help" to explore.', type: "accent" },
];

export default function Terminal() {
  const [lines, setLines] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [bootIndex, setBootIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    const timers = [];

    BOOT_LINES.forEach((line, index) => {
      const timer = setTimeout(() => {
        setLines((previous) => [
          ...previous,
          { cmd: "", output: line.text, type: line.type },
        ]);

        setBootIndex(index + 1);

        if (index === BOOT_LINES.length - 1) {
          setReady(true);
        }
      }, 500 + index * 650);

      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  function handleSubmit(event) {
    event.preventDefault();

    const command = inputValue.trim();
    if (!command || !ready) return;

    const normalized = command.toLowerCase();

    setHistory((previous) => [...previous, command]);
    setHistoryIndex(-1);
    setInputValue("");

    if (normalized === "clear") {
      setLines([]);
      return;
    }

    const output =
      COMMANDS[normalized] ||
      `Command not found: ${command}\nType "help" to see available commands.`;

    setLines((previous) => [
      ...previous,
      {
        cmd: command,
        output,
        type: COMMANDS[normalized] ? "output" : "error",
      },
    ]);
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowUp" && history.length > 0) {
      event.preventDefault();

      const nextIndex =
        historyIndex === -1
          ? history.length - 1
          : Math.max(0, historyIndex - 1);

      setHistoryIndex(nextIndex);
      setInputValue(history[nextIndex]);
    }

    if (event.key === "ArrowDown" && historyIndex !== -1) {
      event.preventDefault();

      const nextIndex = historyIndex + 1;

      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInputValue("");
      } else {
        setHistoryIndex(nextIndex);
        setInputValue(history[nextIndex]);
      }
    }
  }

  function outputColor(type) {
    if (type === "accent") return "text-acid";
    if (type === "success") return "text-emerald-400";
    if (type === "error") return "text-coral";
    if (type === "muted") return "text-muted";
    return "text-bone";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="group overflow-hidden rounded-2xl border border-line bg-panel shadow-2xl transition-all duration-500 hover:border-acid/50 hover:shadow-[0_0_45px_rgba(59,130,246,0.12)]"
    >
      {/* Terminal title bar */}
      <div className="flex items-center gap-2 border-b border-line bg-ink/70 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />

        <div className="mx-auto flex items-center gap-2 font-mono text-[11px] text-muted">
          <span className="text-acid">●</span>
          ameer@portfolio: ~
        </div>

        <span className="font-mono text-[10px] text-faint">TTY 01</span>
      </div>

      {/* Terminal content */}
      <div
        ref={bodyRef}
        className="min-h-[340px] max-h-[430px] overflow-y-auto p-5 font-mono text-xs leading-6 sm:text-[13px]"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Identity header */}
        <div className="mb-5 border-b border-line/70 pb-4">
          <div className="text-acid">┌─ AMEER / SYSTEM PROFILE</div>
          <div className="text-muted">
            │ Linux · AWS · DevOps · Web
          </div>
          <div className="text-acid">└─ Interactive portfolio console</div>
        </div>

        {/* Animated boot sequence and command output */}
        {lines.map((line, index) => (
          <motion.div
            key={`${index}-${line.output}`}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.22 }}
            className="mb-4"
          >
            {line.cmd && (
              <div className="mb-1 flex gap-2">
                <span className="shrink-0 text-acid">ameer $</span>
                <span className="break-all text-bone">{line.cmd}</span>
              </div>
            )}

            <pre
              className={`whitespace-pre-wrap break-words font-mono ${outputColor(
                line.type
              )}`}
            >
              {line.output}
            </pre>
          </motion.div>
        ))}

        {/* Input prompt */}
        <form onSubmit={handleSubmit} className="flex items-start gap-2">
          <span className="shrink-0 text-acid">ameer $</span>

          <input
            ref={inputRef}
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={handleKeyDown}
            disabled={!ready}
            aria-label="Enter a terminal command"
            className="min-w-0 flex-1 bg-transparent text-bone outline-none placeholder:text-faint disabled:opacity-50"
            autoComplete="off"
            spellCheck="false"
            placeholder={
              ready ? 'type "help" to explore...' : "initializing..."
            }
          />

          {ready && (
            <motion.span
              animate={{ opacity: [1, 0.25, 1] }}
              transition={{ duration: 1.1, repeat: Infinity }}
              className="text-acid"
            >
              ▌
            </motion.span>
          )}
        </form>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-line/70 pt-3 text-[10px] text-faint">
          <span>{ready ? "SESSION ACTIVE" : "BOOTING SYSTEM..."}</span>
          <span>{String(bootIndex).padStart(2, "0")}/05 CHECKS</span>
          <span>INTERACTIVE DEMO</span>
        </div>
      </div>
    </motion.div>
  );
}