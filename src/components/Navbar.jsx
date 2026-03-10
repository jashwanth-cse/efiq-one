"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Package, Clock, BookOpen, PlayCircle, Video, Headphones, Users as UsersIcon, LayoutGrid, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { name: "Products", href: "/products" },
  { name: "Resources", href: "#resources" },
  { name: "Enterprise", href: "/enterprise" },
  { name: "Pricing", href: "/pricing" },
  // { name: "Billing", href: "/billing" },
];

const productDropdownItems = [
  {
    title: "Stock Inventory",
    description: "Always know what's in stock, what's running low, and what needs action",
    icon: Package,
    href: "/products/inventory",
  },
  {
    title: "Attendance Tracking",
    description: "Track every check-in, work hour, and leave with complete accuracy and zero manual effort.",
    icon: Clock,
    href: "/products/attendance",
  },
];

const resourcesDropdownData = {
  discover: [
    { title: "Blogs", description: "Insights, tips, and product updates", icon: BookOpen, href: "#blogs" },
    { title: "Demos", description: "See EFIQ ONE in action, live", icon: PlayCircle, href: "#demos" },
    { title: "Tutorial Videos", description: "Step-by-step guides to get started", icon: Video, href: "#tutorials" },
  ],
  support: [
    { title: "Client Support", description: "Help for existing customers", icon: Headphones, href: "/contact-sales" },
    { title: "Sales Support", description: "Talk to our sales team", icon: UsersIcon, href: "/contact-sales" },
    { title: "Other Services", description: "Explore all service options", icon: LayoutGrid, href: "https://efiqsolutions.com/", external: true },
  ],
};

function UserDropdown({ logout }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.96 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-full right-0 mt-4 z-50 w-[200px]"
    >
      {/* Caret arrow */}
      <div className="flex justify-end pr-6 mb-[-1px]">
        <div
          className="w-3 h-3 rotate-45 relative z-10"
          style={{
            background: "#18181b",
            borderLeft: "1px solid rgba(90,120,255,0.4)",
            borderTop: "1px solid rgba(90,120,255,0.4)",
          }}
        />
      </div>

      {/* Panel */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #18181b 0%, #0f0f12 100%)",
          border: "1px solid rgba(90,120,255,0.35)",
          boxShadow: "0 0 40px rgba(90,120,255,0.15), 0 20px 60px rgba(0,0,0,0.6)",
        }}
      >
        {/* Top accent line */}
        <div
          className="h-px w-full"
          style={{
            background: "linear-gradient(90deg, transparent, #5a78ff, #82e05a, transparent)",
          }}
        />

        <div className="flex flex-col py-3 px-3 gap-1">
          {/* My Account */}
          <Link href="/account">
            <div
              className="group flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200"
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(90,120,255,0.10)";
                e.currentTarget.style.boxShadow = "inset 0 0 0 1px rgba(90,120,255,0.2)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <User className="w-4 h-4 text-zinc-400 group-hover:text-brand-blue transition-colors" />
              <span className="font-orbitron font-bold text-sm text-zinc-300 group-hover:text-white transition-colors">
                My Account
              </span>
            </div>
          </Link>

          {/* Billing */}
          <Link href="/billing">
            <div
              className="group flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200"
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(90,120,255,0.10)";
                e.currentTarget.style.boxShadow = "inset 0 0 0 1px rgba(90,120,255,0.2)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <svg className="w-4 h-4 text-zinc-400 group-hover:text-brand-blue transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span className="font-orbitron font-bold text-sm text-zinc-300 group-hover:text-white transition-colors">
                Billing
              </span>
            </div>
          </Link>

          <div className="h-px w-full my-1" style={{ background: "rgba(255,255,255,0.05)" }} />

          {/* Sign Out */}
          <button onClick={logout} className="w-full text-left">
            <div
              className="group flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200"
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(239,68,68,0.10)"; // red tint
                e.currentTarget.style.boxShadow = "inset 0 0 0 1px rgba(239,68,68,0.2)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <svg className="w-4 h-4 text-zinc-400 group-hover:text-red-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="font-orbitron font-bold text-sm text-zinc-300 group-hover:text-red-400 transition-colors">
                Sign out
              </span>
            </div>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ProductsDropdown() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.96 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 z-50"
      style={{ minWidth: 520 }}
    >
      {/* Caret arrow */}
      <div className="flex justify-center mb-[-1px]">
        <div
          className="w-3 h-3 rotate-45 relative z-10"
          style={{
            background: "#18181b",
            borderLeft: "1px solid rgba(90,120,255,0.4)",
            borderTop: "1px solid rgba(90,120,255,0.4)",
          }}
        />
      </div>

      {/* Panel */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #18181b 0%, #0f0f12 100%)",
          border: "1px solid rgba(90,120,255,0.35)",
          boxShadow: "0 0 40px rgba(90,120,255,0.15), 0 20px 60px rgba(0,0,0,0.6)",
        }}
      >
        {/* Top accent line */}
        <div
          className="h-px w-full"
          style={{
            background: "linear-gradient(90deg, transparent, #5a78ff, #82e05a, transparent)",
          }}
        />

        <div className="flex">
          {/* Left: product list */}
          <div className="flex-1 py-5 px-5 flex flex-col gap-1">
            {productDropdownItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 + 0.05, duration: 0.25, ease: "easeOut" }}
                >
                  <Link href={item.href}>
                    <div
                      className="group flex items-start gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all duration-200"
                      style={{ position: "relative" }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = "rgba(90,120,255,0.10)";
                        e.currentTarget.style.boxShadow = "inset 0 0 0 1px rgba(90,120,255,0.2)";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      {/* Icon */}
                      <div
                        className="mt-0.5 p-2 rounded-lg shrink-0 transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: "rgba(90,120,255,0.15)",
                          border: "1px solid rgba(90,120,255,0.25)",
                          color: "#5a78ff",
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = "#5a78ff";
                          e.currentTarget.style.color = "#fff";
                          e.currentTarget.style.boxShadow = "0 0 12px rgba(90,120,255,0.5)";
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = "rgba(90,120,255,0.15)";
                          e.currentTarget.style.color = "#5a78ff";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      {/* Text */}
                      <div>
                        <p
                          className="font-orbitron font-bold text-sm leading-tight transition-colors duration-200"
                          style={{ color: "#e4e4e7" }}
                        >
                          {item.title}
                        </p>
                        <p
                          className="text-xs leading-snug mt-1 font-manrope"
                          style={{ color: "#71717a" }}
                        >
                          {item.description}
                        </p>
                      </div>
                      {/* Arrow on hover */}
                      <motion.span
                        className="ml-auto self-center text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ color: "#5a78ff" }}
                      >
                        →
                      </motion.span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Vertical divider */}
          <div
            className="w-px my-4 shrink-0"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(90,120,255,0.3), transparent)" }}
          />

          {/* Right: Coming Soon */}
          <motion.div
            className="flex flex-col items-center justify-center px-10 py-6 gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.18, duration: 0.3 }}
          >
            {/* Pulsing ring */}
            <div className="relative flex items-center justify-center">
              <motion.div
                className="absolute rounded-full"
                style={{ width: 52, height: 52, border: "1.5px solid #82e05a", opacity: 0.4 }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "rgba(130,224,90,0.12)", border: "1px solid rgba(130,224,90,0.35)" }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#82e05a" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </motion.div>
              </div>
            </div>
            <span
              className="font-orbitron font-bold text-sm whitespace-nowrap"
              style={{ color: "#82e05a", letterSpacing: "0.08em" }}
            >
              Coming Soon
            </span>
            <span
              className="text-xs font-manrope text-center"
              style={{ color: "#52525b", maxWidth: 96, lineHeight: 1.4 }}
            >
              More products launching
            </span>
          </motion.div>
        </div>

        {/* Bottom accent */}
        <div
          className="h-px w-full"
          style={{ background: "linear-gradient(90deg, transparent, rgba(90,120,255,0.2), transparent)" }}
        />
      </div>
    </motion.div>
  );
}

function ResourcesDropdown() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.96 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 z-50"
      style={{ minWidth: 560 }}
    >
      {/* Caret */}
      <div className="flex justify-center mb-[-1px]">
        <div
          className="w-3 h-3 rotate-45 relative z-10"
          style={{
            background: "#18181b",
            borderLeft: "1px solid rgba(90,120,255,0.4)",
            borderTop: "1px solid rgba(90,120,255,0.4)",
          }}
        />
      </div>

      {/* Panel */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #18181b 0%, #0f0f12 100%)",
          border: "1px solid rgba(90,120,255,0.35)",
          boxShadow: "0 0 40px rgba(90,120,255,0.15), 0 20px 60px rgba(0,0,0,0.6)",
        }}
      >
        {/* Top accent line */}
        <div
          className="h-px w-full"
          style={{ background: "linear-gradient(90deg, transparent, #5a78ff, #82e05a, transparent)" }}
        />

        <div className="flex py-5 px-5 gap-4">
          {/* Discover column */}
          <div className="flex-1 flex flex-col gap-0.5">
            <p
              className="font-orbitron font-bold text-xs mb-2 px-3"
              style={{ color: "#5a78ff", letterSpacing: "0.12em" }}
            >
              DISCOVER
            </p>
            {resourcesDropdownData.discover.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.04, duration: 0.22, ease: "easeOut" }}
                >
                  <Link href={item.href}>
                    <div
                      className="group flex items-start gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200"
                      onMouseEnter={e => {
                        e.currentTarget.style.background = "rgba(90,120,255,0.10)";
                        e.currentTarget.style.boxShadow = "inset 0 0 0 1px rgba(90,120,255,0.2)";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <div
                        className="mt-0.5 p-1.5 rounded-lg shrink-0 transition-all duration-300 group-hover:scale-110"
                        style={{ background: "rgba(90,120,255,0.15)", border: "1px solid rgba(90,120,255,0.25)", color: "#5a78ff" }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = "#5a78ff";
                          e.currentTarget.style.color = "#fff";
                          e.currentTarget.style.boxShadow = "0 0 12px rgba(90,120,255,0.5)";
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = "rgba(90,120,255,0.15)";
                          e.currentTarget.style.color = "#5a78ff";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-orbitron font-bold text-xs leading-tight" style={{ color: "#e4e4e7" }}>
                          {item.title}
                        </p>
                        <p className="text-xs leading-snug mt-0.5 font-manrope" style={{ color: "#71717a" }}>
                          {item.description}
                        </p>
                      </div>
                      <span className="ml-auto self-center text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: "#5a78ff" }}>→</span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Vertical divider */}
          <div
            className="w-px shrink-0 my-1"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(90,120,255,0.3), transparent)" }}
          />

          {/* Support column */}
          <div className="flex-1 flex flex-col gap-0.5">
            <p
              className="font-orbitron font-bold text-xs mb-2 px-3"
              style={{ color: "#82e05a", letterSpacing: "0.12em" }}
            >
              SUPPORT
            </p>
            {resourcesDropdownData.support.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.04, duration: 0.22, ease: "easeOut" }}
                >
                  <Link href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noopener noreferrer" : undefined}>
                    <div
                      className="group flex items-start gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200"
                      onMouseEnter={e => {
                        e.currentTarget.style.background = "rgba(130,224,90,0.08)";
                        e.currentTarget.style.boxShadow = "inset 0 0 0 1px rgba(130,224,90,0.18)";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <div
                        className="mt-0.5 p-1.5 rounded-lg shrink-0 transition-all duration-300 group-hover:scale-110"
                        style={{ background: "rgba(130,224,90,0.12)", border: "1px solid rgba(130,224,90,0.25)", color: "#82e05a" }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = "#82e05a";
                          e.currentTarget.style.color = "#000";
                          e.currentTarget.style.boxShadow = "0 0 12px rgba(130,224,90,0.45)";
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = "rgba(130,224,90,0.12)";
                          e.currentTarget.style.color = "#82e05a";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-orbitron font-bold text-xs leading-tight" style={{ color: "#e4e4e7" }}>
                          {item.title}
                        </p>
                        <p className="text-xs leading-snug mt-0.5 font-manrope" style={{ color: "#71717a" }}>
                          {item.description}
                        </p>
                      </div>
                      <span className="ml-auto self-center text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: "#82e05a" }}>→</span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom accent */}
        <div
          className="h-px w-full"
          style={{ background: "linear-gradient(90deg, transparent, rgba(90,120,255,0.2), transparent)" }}
        />
      </div>
    </motion.div>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsHovered, setIsProductsHovered] = useState(false);
  const [isResourcesHovered, setIsResourcesHovered] = useState(false);
  const [isUserHovered, setIsUserHovered] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

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
              if (item.name === "Products") {
                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setIsProductsHovered(true)}
                    onMouseLeave={() => setIsProductsHovered(false)}
                  >
                    <motion.div whileHover={{ y: -2 }}>
                      <Link
                        href={item.href}
                        className={`px-4 py-2 text-sm font-orbitron font-bold transition-colors focus:outline-none flex items-center gap-1 ${isActive
                          ? "text-brand-green"
                          : "text-zinc-400 hover:text-brand-green"
                          }`}
                      >
                        {item.name}
                        <svg
                          className={`w-3 h-3 transition-transform duration-200 ${isProductsHovered ? "rotate-180" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </Link>
                    </motion.div>
                    <AnimatePresence>
                      {isProductsHovered && <ProductsDropdown />}
                    </AnimatePresence>
                  </div>
                );
              }
              if (item.name === "Resources") {
                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setIsResourcesHovered(true)}
                    onMouseLeave={() => setIsResourcesHovered(false)}
                  >
                    <motion.div whileHover={{ y: -2 }}>
                      <Link
                        href={item.href}
                        className={`px-4 py-2 text-sm font-orbitron font-bold transition-colors focus:outline-none flex items-center gap-1 ${isActive
                          ? "text-brand-green"
                          : "text-zinc-400 hover:text-brand-green"
                          }`}
                      >
                        {item.name}
                        <svg
                          className={`w-3 h-3 transition-transform duration-200 ${isResourcesHovered ? "rotate-180" : ""}`}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </Link>
                    </motion.div>
                    <AnimatePresence>
                      {isResourcesHovered && <ResourcesDropdown />}
                    </AnimatePresence>
                  </div>
                );
              }
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
            {user ? (
              <div
                className="relative"
                onMouseEnter={() => setIsUserHovered(true)}
                onMouseLeave={() => setIsUserHovered(false)}
              >
                <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center cursor-pointer hover:border-brand-green transition-colors">
                  <User className="w-5 h-5 text-zinc-400" />
                </div>
                <AnimatePresence>
                  {isUserHovered && <UserDropdown logout={logout} />}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div
                data-magnetic
                whileHover={{ scale: 1.05 }}
              >
                <Link href="/registration/login">
                  <button className="px-6 py-2 text-sm font-bold font-manrope border-2 border-brand-green text-brand-green rounded-full hover:bg-brand-green hover:text-black transition-all active:scale-95 focus:ring-2 focus:ring-brand-green focus:ring-offset-2 focus:ring-offset-zinc-900">
                    Sign in
                  </button>
                </Link>
              </motion.div>
            )}
            <motion.div
              data-magnetic
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 15px -3px rgba(130, 224, 90, 0.4)",
              }}
            >
              <Link href="/contact-sales">
                <button className="px-6 py-2.5 text-sm font-bold font-manrope bg-brand-green text-black rounded-full transition-all active:scale-95 focus:ring-2 focus:ring-brand-green focus:ring-offset-2 focus:ring-offset-zinc-900">
                  Contact Sales
                </button>
              </Link>
            </motion.div>
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
                {user ? (
                  <>
                    <Link href="/account" onClick={() => setIsMenuOpen(false)}>
                      <button className="w-full py-3 text-center font-bold font-manrope bg-white/5 hover:bg-white/10 text-white rounded-xl">
                        My Account
                      </button>
                    </Link>
                    <Link href="/billing" onClick={() => setIsMenuOpen(false)}>
                      <button className="w-full py-3 text-center font-bold font-manrope bg-white/5 hover:bg-white/10 text-white rounded-xl">
                        Billing
                      </button>
                    </Link>
                    <button onClick={() => { logout(); setIsMenuOpen(false); }} className="w-full py-3 text-center font-bold font-manrope bg-white/5 hover:bg-white/10 text-red-400 rounded-xl">
                      Sign out
                    </button>
                  </>
                ) : (
                  <Link href="/registration/login" onClick={() => setIsMenuOpen(false)}>
                    <button className="w-full py-3 text-center font-bold font-manrope border-2 border-brand-green text-brand-green rounded-xl focus:ring-2 focus:ring-brand-green">
                      Sign in
                    </button>
                  </Link>
                )}
                <Link href="/contact-sales" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full py-3 text-center font-bold font-manrope bg-brand-green text-black rounded-xl focus:ring-2 focus:ring-brand-green">
                    Contact Sales
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
