
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#resume', label: 'Resume' },
  { href: '#experience', label: 'Experience' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let previousScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 20);

      if (currentScrollY < 10) {
        setVisible(true);
      } else if (currentScrollY < previousScrollY) {
        setVisible(true);
      } else if (currentScrollY > previousScrollY) {
        setVisible(false);
        setMobileOpen(false);
      }

      previousScrollY = currentScrollY;

      let current = '#home';

      links.forEach((link) => {
        const section = document.querySelector(link.href);

        if (section && currentScrollY >= section.offsetTop - 180) {
          current = link.href;
        }
      });

      setActive(current);
    };

    window.addEventListener('scroll', onScroll, {
      passive: true,
    });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-4 left-1/2 z-50
        w-[calc(100%-2rem)] max-w-7xl
        rounded-3xl border
        transition-all duration-300 ease-in-out
        ${
          visible
            ? '-translate-x-1/2 translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-x-1/2 -translate-y-[150%] opacity-0 pointer-events-none'
        }
        ${
          scrolled
            ? 'bg-panel/95 backdrop-blur-xl border-line shadow-[0_8px_40px_rgba(59,130,246,0.20)]'
            : 'bg-panel/80 backdrop-blur-lg border-line'
        }`}
      >
        <div className="flex items-center justify-between gap-4 px-5 py-3 lg:px-6">

          {/* Logo */}
          <a
            href="#home"
            onClick={() => setMobileOpen(false)}
            className="shrink-0 whitespace-nowrap text-lg lg:text-xl font-bold tracking-tight"
          >
            <span className="text-bone">Mohamed</span>{' '}
            <span className="text-acid">Ameer</span>
          </a>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex flex-1 items-center justify-center gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative whitespace-nowrap px-3 py-3 rounded-full text-sm font-medium transition-all duration-300
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
            className="hidden lg:block shrink-0 whitespace-nowrap
            bg-acid hover:bg-coral text-white
            px-5 py-3 rounded-full text-sm font-semibold
            transition-all duration-300 hover:scale-105"
          >
            Hire Me
          </a>

          {/* Mobile / Tablet Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="lg:hidden shrink-0 text-bone text-2xl px-2"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {/* Mobile and Tablet Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed top-24 left-4 right-4 z-40
          rounded-3xl bg-panel/95 backdrop-blur-xl
          border border-line shadow-2xl p-4 lg:hidden"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block py-3 px-4 rounded-xl transition
              ${
                active === link.href
                  ? 'text-acid bg-acid/10'
                  : 'text-muted hover:text-bone hover:bg-acid/20'
              }`}
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="block mt-3 py-3 px-4 rounded-xl text-center
            bg-acid text-white font-semibold"
          >
            Hire Me
          </a>
        </motion.div>
      )}
    </>
  );
}
