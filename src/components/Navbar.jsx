"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Products", href: "/products" },
  { name: "Resources", href: "#resources" },
  { name: "Enterprise", href: "#enterprise" },
  { name: "Pricing", href: "/pricing" },
  // { name: "Billing", href: "/billing" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-900/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Link
              href="/"
              className="flex items-center gap-3"
              aria-label="EFiQ ONE Home"
            >
              <svg viewBox="10 0 80 95" className="h-10 w-auto shrink-0 drop-shadow-md" aria-hidden="true">
                <path d="M 10 48 L 10 70 A 25 25 0 0 0 35 95 L 65 95 A 25 25 0 0 0 90 70 L 90 48 L 65 48 L 65 70 L 35 70 L 35 48 Z" fill="#5a78ff" />
                <path d="M 90 48 L 90 25 A 25 25 0 0 0 65 0 L 10 0 L 35 25 L 65 25 L 65 48 Z" fill="#82e05a" />
              </svg>
              <div className="flex flex-col justify-center">
                <span className="font-orbitron font-bold text-[13px] tracking-[0.2em] text-white leading-none mb-0.5" style={{ marginLeft: '1px' }}>
                  EFIQ
                </span>
                <span className="font-orbitron font-black text-[28px] text-white leading-none tracking-tight">
                  ONE
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center bg-white/5 px-6 py-2 rounded-full border border-white/10 shadow-sm"
            aria-label="Main Navigation"
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <motion.div key={item.name} whileHover={{ y: -2 }}>
                  <Link
                    href={item.href}
                    className={`px-4 py-2 text-sm font-orbitron font-bold transition-colors focus:outline-none ${isActive
                      ? "text-brand-green"
                      : "text-zinc-400 hover:text-brand-green"
                      }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <motion.button
              data-magnetic
              whileHover={{ scale: 1.05 }}
              className="px-6 py-2 text-sm font-bold font-manrope border-2 border-brand-green text-brand-green rounded-full hover:bg-brand-green hover:text-black transition-all active:scale-95 focus:ring-2 focus:ring-brand-green focus:ring-offset-2 focus:ring-offset-zinc-900"
            >
              Sign in
            </motion.button>
            <motion.button
              data-magnetic
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 15px -3px rgba(130, 224, 90, 0.4)",
              }}
              className="px-6 py-2.5 text-sm font-bold font-manrope bg-brand-green text-black rounded-full transition-all active:scale-95 focus:ring-2 focus:ring-brand-green focus:ring-offset-2 focus:ring-offset-zinc-900"
            >
              Contact Sales
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-zinc-400 hover:text-brand-blue focus:outline-none focus:text-brand-blue"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-900 border-b border-white/5 overflow-hidden"
            role="navigation"
            aria-label="Mobile Navigation"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-4 text-base font-orbitron font-bold transition-colors ${isActive
                      ? "text-brand-green"
                      : "text-zinc-400 hover:text-brand-green focus:text-brand-green"
                      }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="pt-4 flex flex-col gap-3">
                <button className="w-full py-3 text-center font-bold font-manrope border-2 border-brand-green text-brand-green rounded-xl focus:ring-2 focus:ring-brand-green">
                  Sign in
                </button>
                <button className="w-full py-3 text-center font-bold font-manrope bg-brand-green text-black rounded-xl focus:ring-2 focus:ring-brand-green">
                  Contact Sales
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
