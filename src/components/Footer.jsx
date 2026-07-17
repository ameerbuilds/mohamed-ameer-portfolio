import {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaArrowUp,
  FaHeart,
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { profile } from "../data/profile";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line bg-panel/70 backdrop-blur-xl">

      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Left */}

          <div>

            <h2 className="font-display text-3xl font-bold mb-4">
              Mohamed <span className="text-gradient">Ameer</span>
            </h2>

            <p
              className="text-muted leading-8 max-w-lg text-justify"
            >
              Aspiring Software Engineer with hands-on experience in
              MERN Stack development, passionate about building modern,
              scalable web applications. Continuously learning Cloud
              Computing and committed to writing clean, efficient,
              maintainable, and user-focused software solutions.
            </p>

            <div className="flex gap-4 mt-8">

              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-acid hover:text-black hover:border-acid hover:scale-110 transition-all duration-300"
              >
                <FaGithub />
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:scale-110 transition-all duration-300"
              >
                <FaLinkedin />
              </a>

              <a
                href={`mailto:${profile.email}`}
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-500 hover:scale-110 transition-all duration-300"
              >
                <HiOutlineMail />
              </a>

              <a
                href={`https://wa.me/${profile.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-green-500 hover:text-white hover:border-green-500 hover:scale-110 transition-all duration-300"
              >
                <FaWhatsapp />
              </a>

            </div>

          </div>

          {/* Right */}

          <div className="grid grid-cols-2 gap-8">

            <div>

              <h3 className="font-semibold text-lg mb-4">
                Quick Links
              </h3>

              <div className="flex flex-col gap-3 text-muted">

                <a href="#home" className="hover:text-acid transition">
                  Home
                </a>

                <a href="#about" className="hover:text-acid transition">
                  About
                </a>

                <a href="#skills" className="hover:text-acid transition">
                  Skills
                </a>

                <a href="#projects" className="hover:text-acid transition">
                  Projects
                </a>

                <a href="#experience" className="hover:text-acid transition">
                  Experience
                </a>

                <a href="#contact" className="hover:text-acid transition">
                  Contact
                </a>

              </div>

            </div>

            <div>

              <h3 className="font-semibold text-lg mb-4">
               Areas of Interest
              </h3>

<div className="flex flex-col gap-3 text-muted">
  <span>🚀 Software Development</span>
  <span>🌐 Full Stack Engineering</span>
  <span>☁️ Cloud Computing</span>
  <span>🤖 Artificial Intelligence</span>
  <span>📊 Data Analytics</span>
</div>

            </div>

          </div>

        </div>

        <div className="mt-12 border-t border-line pt-6 flex flex-col md:flex-row justify-between items-center gap-5">

          <p className="text-sm text-muted flex items-center gap-2">

             © {year} Mohamed Ameer. Designed & Developed by Mohamed Ameer.
</p>
          <a
            href="#home"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-acid text-black font-semibold hover:scale-105 transition-all duration-300"
          >
            <FaArrowUp />
            Back to Top
          </a>

        </div>

      </div>

    </footer>
  );
}