import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      let current = '#home';

      links.forEach((link) => {
        const section = document.querySelector(link.href);

        if (section && window.scrollY >= section.offsetTop - 180) {
          current = link.href;
        }
      });

      setActive(current);
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-50
        w-[min(1100px,95%)]
        rounded-full
        border
        transition-all
        duration-300
        ${
          scrolled
            ? 'bg-panel/90 backdrop-blur-xl border-line shadow-[0_8px_40px_rgba(59,130,246,0.25)]'
            : 'bg-panel/60 backdrop-blur-lg border-line'
        }`}
      >
        <div className="flex items-center justify-between px-7 py-3">

          {/* Logo */}

          <a
            href="#home"
            className="text-xl font-bold tracking-wide"
          >
            <span className="text-bone">Mohamed</span>{' '}
            <span className="text-acid">Ameer</span>
          </a>

          {/* Desktop Menu */}

          <nav className="hidden md:flex items-center gap-2">

            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300

                ${
                  active === link.href
                    ? 'bg-acid text-white shadow-lg'
                    : 'text-muted hover:text-bone hover:bg-white/5'
                }`}
              >
                {link.label}
              </a>
            ))}

          </nav>

          {/* Hire Button */}

          <a
            href="#contact"
            className="hidden md:block bg-acid hover:bg-coral text-white
            px-5 py-2 rounded-full
            font-semibold
            transition-all
            duration-300
            hover:scale-105"
          >
            Hire Me
          </a>

          {/* Mobile Button */}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-bone text-2xl"
          >
            ☰
          </button>

        </div>
      </header>

      {/* Mobile Menu */}

      {mobileOpen && (

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .3 }}
          className="fixed
          top-24
          left-4
          right-4
          z-40
          rounded-3xl
          bg-panel/95
          backdrop-blur-xl
          border
          border-line
          shadow-2xl
          p-5
          md:hidden"
        >

          {links.map((link) => (

            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block
              py-3
              px-4
              rounded-xl
              text-muted
              hover:text-bone
              hover:bg-acid/20
              transition"
            >
              {link.label}
            </a>

          ))}

        </motion.div>

      )}

    </>
  );
}