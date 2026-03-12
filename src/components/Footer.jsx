"use client";

import { motion } from "motion/react";
import { Linkedin, Facebook, Instagram } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  { Icon: Linkedin, color: "#0077B5", name: "LinkedIn", href: "https://www.linkedin.com/company/efiq-solutions/" },
  { Icon: Facebook, color: "#1877F2", name: "Facebook", href: "https://www.facebook.com/efiqsolutions" },
  { Icon: Instagram, color: "#E4405F", name: "Instagram", href: "https://www.instagram.com/efiqsolutions/" },
];

const platformLinks = [
  { label: "Android", href: "https://play.google.com/store" },
  { label: "iOS", href: "https://apps.apple.com" },
  { label: "macOS", href: "https://apps.apple.com/mac" },
  { label: "Windows", href: "https://www.microsoft.com/en-us/store/apps" },
];

const companyLinks = [
  { label: "Get a Demo", href: "/contact-sales" },
  { label: "Support", href: "/contact-sales" },
  { label: "Blog", href: "https://efiqsolutions.com/" },
  { label: "Contact", href: "/contact-sales" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-zinc-900/95 backdrop-blur-md border-t border-white/5 pt-16 pb-8 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-blue/5 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          {/* Column 1: Brand & Socials */}
          <div className="flex flex-col gap-6">
            <Link href="/" aria-label="EFIQ ONE Home" className="flex items-center gap-2 w-fit">
              <svg viewBox="10 0 80 95" className="h-10 w-auto shrink-0" aria-hidden="true">
                <path d="M 10 48 L 10 70 A 25 25 0 0 0 35 95 L 65 95 A 25 25 0 0 0 90 70 L 90 48 L 65 48 L 65 70 L 35 70 L 35 48 Z" fill="#5a78ff" />
                <path d="M 90 48 L 90 25 A 25 25 0 0 0 65 0 L 10 0 L 35 25 L 65 25 L 65 48 Z" fill="#82e05a" />
              </svg>
              <div className="flex flex-col leading-none">
                <span className="font-orbitron font-bold text-[13px] tracking-[0.2em] text-white leading-none mb-0.5">EFIQ</span>
                <span className="font-orbitron font-black text-[22px] text-white leading-none tracking-tight">ONE</span>
              </div>
            </Link>

            <p className="text-zinc-400 text-sm max-w-xs font-manrope font-medium leading-relaxed">
              Intelligent inventory and attendance tracking solutions designed
              for the modern enterprise.
            </p>

            <div
              className="flex gap-3"
              role="list"
              aria-label="Social Media Links"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
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
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-link hover:text-brand-blue transition-colors focus:text-brand-blue focus:outline-none"
                    >
                      {item.label}
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
                  <li key={item.label}>
                    {item.href.startsWith("http") ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link hover:text-brand-blue transition-colors focus:text-brand-blue focus:outline-none"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="footer-link hover:text-brand-blue transition-colors focus:text-brand-blue focus:outline-none"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="font-manrope font-bold text-[10px] tracking-wider text-zinc-500 uppercase">
            © {currentYear} EFIQONE. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8 font-manrope font-bold text-[10px] tracking-wider text-zinc-500 uppercase">
            <Link href="/contact-sales" className="hover:text-brand-blue transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact-sales" className="hover:text-brand-blue transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
