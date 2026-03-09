"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Clock,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Package,
} from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";

/* ── Feature list ── */
const features = [
  {
    id: "checkin",
    label: "Real-Time Check-In / Check-Out",
  },
  {
    id: "workhours",
    label: "Automatic Work Hour Calculation",
  },
  {
    id: "leave",
    label: "Leave & Permission Management",
  },
  {
    id: "insights",
    label: "Attendance Insights",
  },
  {
    id: "reports",
    label: "Exportable Reports",
  },
];

/* ── FAQ data ── */
const faqs = [
  {
    q: "Can my employees use mobile to mark attendance?",
    a: "Yes – both mobile and web access are supported.",
  },
  {
    q: "Is attendance unlimited?",
    a: "Yes, all check-ins and logs are stored without limits.",
  },
  {
    q: "Can I export data for payroll?",
    a: "Absolutely – one-click Excel and PDF export.",
  },
];

/* ── Screenshot placeholder component ── */
function ScreenshotPlaceholder({ featureId }) {
  const labels = {
    checkin: "Real-Time Check-In / Check-Out",
    workhours: "Automatic Work Hour Calculation",
    leave: "Leave & Permission Management",
    insights: "Attendance Insights",
    reports: "Exportable Reports",
  };

  return (
    <motion.div
      key={featureId}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="w-full h-full min-h-[340px] rounded-2xl bg-gradient-to-br from-zinc-200 to-zinc-300 flex items-center justify-center"
    >
      <span className="text-zinc-600 font-orbitron text-sm font-semibold tracking-wide">
        {featureId ? labels[featureId] : "Our Product Screenshot"}
      </span>
    </motion.div>
  );
}

/* ── FAQ Item ── */
function FaqItem({ faq, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
      className="border-b border-zinc-200 last:border-0"
    >
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <span className="font-orbitron font-semibold text-sm text-zinc-900 group-hover:text-brand-blue transition-colors duration-300">
          {index + 1}. {faq.q}
        </span>
        <span className="mt-0.5 text-brand-blue shrink-0">
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.p
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden text-zinc-500 text-sm font-manrope pb-5 leading-relaxed"
          >
            {faq.a}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Main Page ── */
export default function AttendancePage() {
  const [activeFeature, setActiveFeature] = useState(null);

  return (
    <div className="min-h-screen bg-white selection:bg-brand-blue selection:text-white">
      {/* ── HERO ── */}
      <section className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Back breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-10 w-fit"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm font-manrope font-medium text-zinc-500 hover:text-brand-blue transition-colors duration-300"
          >
            <ArrowLeft size={15} />
            Back to Products
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-brand-blue/10 border border-brand-blue/30 rounded-full"
        >
          <Clock size={15} className="text-brand-blue" />
          <span className="text-xs font-orbitron font-bold text-brand-blue tracking-widest uppercase">
            Attendance
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight font-orbitron mb-6 max-w-3xl mx-auto leading-tight"
        >
          Smart Attendance Tracking{" "}
          <span className="text-brand-blue">for Modern Teams</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-zinc-500 text-base font-manrope max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Accurate, automated, and effortless. Manage your workforce with
          complete clarity in one powerful platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href="/products/attendance/pricing"
            className="inline-flex flex-col items-center gap-0.5 px-10 py-4 font-orbitron font-bold text-black border-2 border-black bg-brand-green rounded-full hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all duration-300 focus:ring-2 focus:ring-brand-green focus:ring-offset-2"
          >
            <span className="text-[10px] font-manrope font-medium tracking-widest opacity-70">
              See the
            </span>
            <span className="text-lg leading-none">Pricing</span>
          </Link>
        </motion.div>
      </section>

      {/* ── HERO SCREENSHOT ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="w-full min-h-[380px] rounded-3xl bg-gradient-to-br from-zinc-200 to-zinc-300 flex items-center justify-center shadow-lg"
        >
          <span className="text-zinc-600 font-orbitron text-sm font-semibold tracking-wide">
            Our Product Screenshot
          </span>
        </motion.div>
      </section>

      {/* ── FEATURES INTRO ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl sm:text-4xl font-bold tracking-tight font-orbitron mb-6"
        >
          Everything you need to track attendance without the manual work.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-zinc-500 text-base font-manrope max-w-2xl mx-auto leading-relaxed"
        >
          EFIQ One Attendance replaces outdated registers, spreadsheets, and
          scattered tracking methods with a clean, intelligent system built for
          daily operations.
        </motion.p>
      </section>

      {/* ── 60/40 INTERACTIVE SECTION ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Left – 60% screenshot */}
          <div className="w-full lg:w-[60%] flex-shrink-0">
            <AnimatePresence mode="wait">
              <ScreenshotPlaceholder featureId={activeFeature} />
            </AnimatePresence>
          </div>

          {/* Right – 40% feature list */}
          <div className="w-full lg:w-[40%]">
            <motion.h3
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-xl sm:text-2xl font-bold font-orbitron mb-8 leading-snug"
            >
              Built for accurate, effortless attendance.
            </motion.h3>

            <ul className="space-y-3">
              {features.map((feature, i) => (
                <motion.li
                  key={feature.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                  onMouseEnter={() => setActiveFeature(feature.id)}
                  onMouseLeave={() => setActiveFeature(null)}
                  className="group"
                >
                  <div
                    className={`px-4 py-3 rounded-xl transition-all duration-300 ${activeFeature === feature.id
                        ? "bg-brand-blue/10 border border-brand-blue/40"
                        : "border border-transparent hover:bg-zinc-50"
                      }`}
                  >
                    <p
                      className={`font-manrope text-sm transition-colors duration-300 ${activeFeature === feature.id
                          ? "font-bold text-zinc-900"
                          : "font-medium text-zinc-400 group-hover:text-zinc-700"
                        }`}
                    >
                      {feature.label}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-28">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl sm:text-4xl font-bold tracking-tight font-orbitron mb-10"
        >
          Make attendance simple, smart,{" "}
          <span className="block">and stress-free.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            href="/products/attendance/pricing"
            className="inline-flex flex-col items-center gap-0.5 px-10 py-4 font-orbitron font-bold text-black border-2 border-black bg-brand-green rounded-full hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all duration-300 focus:ring-2 focus:ring-brand-green focus:ring-offset-2"
          >
            <span className="text-[10px] font-manrope font-medium tracking-widest opacity-70">
              See the
            </span>
            <span className="text-lg leading-none">Pricing</span>
          </Link>
        </motion.div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold font-orbitron text-center mb-10"
        >
          FAQ
        </motion.h2>
        <div>
          {faqs.map((faq, i) => (
            <FaqItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </section>

      {/* ── OTHER APPS ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold font-orbitron mb-12"
        >
          Expand Your Workflow with{" "}
          <span className="block">Other EFiQ One Apps</span>
        </motion.h2>

        <div className="flex flex-col sm:flex-row justify-center items-start gap-8">
          {/* Stock Inventory card — links to inventory page */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center gap-3"
          >
            <Link
              href="/products/inventory"
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-green to-brand-blue flex items-center justify-center shadow-lg hover:opacity-80 transition-opacity duration-300"
              aria-label="Go to Stock Inventory"
            >
              <Package className="w-8 h-8 text-white" />
            </Link>
            <span className="text-sm font-manrope font-medium text-zinc-700">
              Stock Inventory
            </span>
          </motion.div>

          {/* Coming soon placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center justify-center self-center"
          >
            <span className="text-zinc-400 font-manrope text-sm italic">
              Coming Soon
            </span>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
