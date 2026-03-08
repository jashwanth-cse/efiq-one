"use client";

import { motion } from "motion/react";
import { Linkedin, Facebook, Instagram } from "lucide-react";

const socialLinks = [
  { Icon: Linkedin, color: "#0077B5", name: "LinkedIn" },
  { Icon: Facebook, color: "#1877F2", name: "Facebook" },
  { Icon: Instagram, color: "#E4405F", name: "Instagram" },
];

const platformLinks = ["Android", "iOS", "macOS", "Windows"];
const companyLinks = ["Get a Demo", "Support", "Blog", "Contact"];

export default function Footer() {
  return (
    <footer className="relative bg-zinc-900/95 backdrop-blur-md border-t border-white/5 pt-16 pb-8 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-blue/5 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          {/* Column 1: Brand & Socials */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-b from-brand-green to-brand-blue rounded-xl flex items-center justify-center text-white font-orbitron font-bold text-xl shadow-sm">
                U
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-orbitron font-black text-xl tracking-tighter text-white">
                  EFiQ
                </span>
                <span className="font-orbitron text-[10px] tracking-[0.3em] font-bold text-zinc-500">
                  ONE
                </span>
              </div>
            </div>

            <p className="text-zinc-400 text-sm max-w-xs font-manrope font-medium leading-relaxed">
              Intelligent inventory and attendance tracking solutions designed
              for the modern enterprise.
            </p>

            <div
              className="flex gap-3"
              role="list"
              aria-label="Social Media Links"
            >
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href="#"
                  role="listitem"
                  aria-label={`Follow us on ${social.name}`}
                  initial={{
                    color: social.color,
                    backgroundColor: `${social.color}15`,
                    borderColor: `${social.color}50`,
                  }}
                  whileHover={{
                    color: social.color,
                    backgroundColor: `${social.color}15`,
                    borderColor: `${social.color}50`,
                    scale: 1.1,
                    y: -5,
                    boxShadow: `0 10px 20px -5px ${social.color}33`,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="w-10 h-10 rounded-xl border flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand-blue"
                >
                  <social.Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="grid grid-cols-2 gap-8">
            <div className="md:pl-12">
              <h4
                id="footer-platform-heading"
                className="font-orbitron font-bold text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-6"
              >
                Download
              </h4>
              <ul
                className="space-y-4 font-manrope font-bold text-sm text-zinc-400"
                aria-labelledby="footer-platform-heading"
              >
                {platformLinks.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="footer-link hover:text-brand-blue transition-colors focus:text-brand-blue focus:outline-none"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:pl-12">
              <h4
                id="footer-company-heading"
                className="font-orbitron font-bold text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-6"
              >
                Company
              </h4>
              <ul
                className="space-y-4 font-manrope font-bold text-sm text-zinc-400"
                aria-labelledby="footer-company-heading"
              >
                {companyLinks.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="footer-link hover:text-brand-blue transition-colors focus:text-brand-blue focus:outline-none"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="font-manrope font-bold text-[10px] tracking-wider text-zinc-500 uppercase">
            © 2025 EFIQONE. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8 font-manrope font-bold text-[10px] tracking-wider text-zinc-500 uppercase">
            <a href="#" className="hover:text-brand-blue transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-brand-blue transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
