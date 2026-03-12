"use client";

import React, { useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
  useMotionValue,
} from "motion/react";
import { ArrowRight } from "lucide-react";

// --- Variants ---
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// --- Custom Components ---

const ScrambleText = ({ text, ...props }) => {
  const [displayDescription, setDisplayDescription] = useState(text);
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayDescription((prev) =>
        prev
          .split("")
          .map((_, index) => {
            if (index < iteration) return text[index];
            if (text[index] === " ") return " ";
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join(""),
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += text.length > 20 ? 1 : 1 / 3;
    }, 30);
  };

  return (
    <motion.span {...props} onViewportEnter={scramble} className="inline-block">
      {displayDescription}
    </motion.span>
  );
};

export default function EnterprisePage() {
  const featureRef = useRef(null);
  const cardRef = useRef(null);

  // 1. Scroll-based logic
  const { scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const skew = useTransform(smoothVelocity, [-1, 1], [-5, 5]);

  const { scrollYProgress: featureScroll } = useScroll({
    target: featureRef,
    offset: ["start end", "end start"],
  });
  const yParallax = useTransform(featureScroll, [0, 1], [-50, 50]);

  // 2. 3D Tilt Logic (copied exactly from your product card example)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-orbitron overflow-x-hidden">
      <Navbar />

      <main className="flex-1 pt-24 pb-12">
        {/* Hero Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT SIDE */}
            <motion.div variants={itemVariants} className="space-y-8">
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-3xl font-extrabold tracking-tight text-gray-900 leading-tight"
              >
                We don&apos;t make you fit the system.
                <br />
                <motion.span
                  className="text-brand-green inline-block"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  We shape the system to fit you.
                </motion.span>
              </motion.h1>

              <motion.div
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.1}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="w-full max-w-[420px] h-[220px] bg-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-500 text-lg font-medium border border-gray-300 border-dashed cursor-grab active:cursor-grabbing"
              >
                Business Image
              </motion.div>
            </motion.div>

            {/* RIGHT SIDE: The Animated 3D Card */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center lg:justify-end"
            >
              <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformPerspective: 800 }}
                className="relative w-full max-w-md bg-white border border-black/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-500 flex flex-col h-full"
                whileHover={{ y: -12 }}
              >
                <motion.div
                  className="p-10 flex flex-col items-center text-center space-y-6"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <h2 className="text-3xl font-bold text-gray-900">
                    Book a 1 : 1 Call
                  </h2>

                  <motion.a
                    data-magnetic
                    data-cursor-focus
                    href="/contact-sales"
                    className="inline-flex items-center justify-center gap-2 w-full py-4 px-6 bg-brand-green text-black border-2 border-black font-bold rounded-full transition-all text-lg hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Book a Call
                    <motion.span
                      className="inline-block"
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      →
                    </motion.span>
                  </motion.a>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Remaining sections stay the same... */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
        >
          <div className="max-w-[700px] mx-auto space-y-6">
            <motion.h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Every organization is different.{" "}
              <span className="text-brand-green">
                Your software should be too.
              </span>
            </motion.h2>

            <motion.p className="text-lg text-gray-600 leading-relaxed font-manrope">
              Complex workflows, multi-branch operations, layered teams, and
              department-wise structures make every enterprise unique. EPIQ One
              Enterprise adapts to your exact model, ensuring seamless
              operations across your people, processes, and resources.
            </motion.p>
          </div>
        </motion.section>

        <section
          ref={featureRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative"
        >
          <div className="mb-16">
            <h2 className="text-sm font-bold tracking-widest text-gray-500 uppercase text-center lg:text-left">
              ENTERPRISE OFFERS
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-stretch">
            <div className="space-y-0">
              {[
                { name: "Fully Customizable Modules", active: true },
                { name: "Department-Wise Solutions", active: false },
                {
                  name: "Multi-Branch + Multi-Location Support",
                  active: false,
                },
                { name: "AI-Powered Optimization", active: false },
                { name: "Enterprise-Grade Security & Control", active: false },
                { name: "Dedicated Engineering & Support Team", active: false },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex items-center justify-between py-6 border-b border-gray-200 cursor-pointer transition-colors"
                >
                  <h3
                    className={`text-base md:text-lg font-semibold transition-colors ${feature.active ? "text-gray-900" : "text-gray-400 group-hover:text-gray-700"}`}
                  >
                    {feature.name}
                  </h3>
                  {feature.active && (
                    <motion.div layoutId="arrow-indicator">
                      <ArrowRight className="text-brand-green w-6 h-6" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="w-full bg-gray-200 rounded-3xl flex items-center justify-center text-gray-500 text-xl font-medium border border-gray-300">
              Feature Image
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <motion.div
              style={{ skewX: skew }}
              animate={{ x: [0, -1000] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-[10rem] font-bold whitespace-nowrap"
            >
              SCALE • CUSTOM • ENTERPRISE • POWER • SCALE • CUSTOM • ENTERPRISE
              • POWER •
            </motion.div>
          </div>

          <div className="max-w-3xl mx-auto space-y-8 relative z-10">
            <motion.h2 className="text-4xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
              Your enterprise. Your workflows. Your system.
            </motion.h2>
            <p className="text-xs text-gray-600">
              Get a customized platform built specifically for your workflows,
              structure, and scale.
            </p>
            <div className="pt-6 flex justify-center">
              <motion.a
                data-magnetic
                data-cursor-focus
                href="/contact-sales"
                className="inline-flex items-center gap-2 py-4 px-8 bg-brand-green text-black border-2 border-black font-bold rounded-full transition-all text-lg hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Talk to our Enterprise Expert
                <motion.span
                  className="inline-block"
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  →
                </motion.span>
              </motion.a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
