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
              className="flex items-center gap-2"
              aria-label="EFiQ ONE Home"
            >
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
                    className={`px-4 py-2 text-sm font-orbitron font-bold transition-colors focus:outline-none ${
                      isActive
                        ? "text-brand-blue"
                        : "text-zinc-400 hover:text-brand-blue"
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
                    className={`block px-3 py-4 text-base font-orbitron font-bold transition-colors ${
                      isActive
                        ? "text-brand-blue"
                        : "text-zinc-400 hover:text-brand-blue focus:text-brand-blue"
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
