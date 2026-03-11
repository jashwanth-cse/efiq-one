"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { useState } from "react";

function InteractiveFeatureList() {
    const [activeIndex, setActiveIndex] = useState(0);

    const features = [
        {
            id: 0,
            title: "Centralized workspace for daily operations",
            imageDesc: "Workspace Dashboard Screenshot",
        },
        {
            id: 1,
            title: "Real-time visibility across your workforce and resources",
            imageDesc: "Real-time Tracking Map",
        },
        {
            id: 2,
            title: "Unified dashboards for instant insights",
            imageDesc: "Analytics Dashboard Screenshot",
        },
        {
            id: 3,
            title: "Designed to scale with your business",
            imageDesc: "Scalability Settings Screenshot",
        },
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-32 pb-12 lg:pb-16 flex flex-col items-center"
        >

            <div className="flex flex-col lg:flex-row w-full gap-12 lg:gap-16 items-stretch">
                {/* Left Side — Image Placeholder */}
                <div className="w-full lg:w-1/2 order-2 lg:order-1 flex flex-col">
                    <div className="relative w-full flex-grow min-h-[300px] lg:min-h-0 bg-zinc-300 shadow-sm overflow-hidden">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <span className="text-zinc-600 font-bold md:text-lg text-center px-4">
                                {features[activeIndex].imageDesc}
                            </span>
                        </motion.div>
                    </div>
                </div>

                {/* Right Side — Text Content */}
                <div className="w-full lg:w-1/2 flex flex-col order-1 lg:order-2">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-zinc-900 mb-10 leading-tight">
                        Built for teams who want clarity and control.
                    </h2>

                    <div className="flex flex-col space-y-6">
                        {features.map((feature, index) => {
                            const isActive = index === activeIndex;
                            return (
                                <div
                                    key={feature.id}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    className={`
                                        cursor-pointer transition-all duration-300 py-2 border-l-4 pl-4
                                        ${isActive ? 'border-brand-green text-zinc-900 border-opacity-100' : 'border-transparent text-zinc-400 hover:text-zinc-600'}
                                    `}
                                >
                                    <h3 className={`font-bold md:text-lg ${isActive ? 'translate-x-2' : ''} transition-transform duration-300`}>
                                        {feature.title}
                                    </h3>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </motion.section>
    );
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
        scale: 1.05,
        transition: { duration: 0.3 },
    },
};

export default function LandingPage() {
    return (
        <main className="min-h-screen flex flex-col bg-white text-zinc-900 font-manrope">

            <div className="flex-grow pt-24">
                {/* SECTION 1 — HERO */}
                <motion.section
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 lg:pt-32 lg:pb-12 text-center flex flex-col items-center"
                >
                    <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-[52px] xl:text-6xl font-orbitron font-bold text-black tracking-tight w-full leading-tight">
                        Your Business. Simplified. Streamlined.
                    </motion.h1>
                    <motion.p variants={itemVariants} className="mt-5 text-base md:text-lg font-bold text-black max-w-3xl mx-auto leading-relaxed">
                        Centralize people, operations, and resources — all in one powerful platform.
                    </motion.p>
                    <motion.div variants={buttonVariants} className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.button
                            data-magnetic
                            data-cursor-focus
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 px-8 py-4 font-orbitron font-bold text-black border-2 border-black bg-brand-green rounded-full hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-300 focus:ring-2 focus:ring-brand-green focus:ring-offset-2 text-lg"
                        >
                            Get a DEMO
                            <motion.span
                                className="inline-block"
                                initial={{ x: 0 }}
                                whileHover={{ x: 4 }}
                                transition={{ duration: 0.2 }}
                            >
                                →
                            </motion.span>
                        </motion.button>
                    </motion.div>
                </motion.section>

                {/* SECTION 2 — PRODUCT SCREENSHOT PLACEHOLDER */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full max-w-[70rem] mx-auto px-6 sm:px-10 lg:px-12 pt-8 pb-16 md:pt-12 md:pb-24"
                >
                    <motion.div
                        className="w-full aspect-video md:aspect-[16/9] bg-gradient-to-b from-zinc-300 to-zinc-100 flex items-center justify-center relative overflow-hidden shadow-2xl rounded-xl border border-zinc-200"
                        whileHover={{
                            scale: 1.02,
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <span className="text-zinc-800 font-bold md:text-xl lg:text-2xl z-10 text-center px-4">
                            Our Product Screenshot with interaction
                        </span>
                    </motion.div>
                </motion.section>

                {/* SECTION 2.5 — TRUSTED BY */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16"
                >
                    <div className="relative group cursor-pointer transition-colors duration-500 hover:bg-zinc-200 py-12 rounded-xl">
                        {/* The Grid of Icons */}
                        <div className="flex flex-col items-center justify-center space-y-10 relative z-0 transition-opacity duration-500 group-hover:opacity-20 text-zinc-500">
                            {/* Top Row */}
                            <div className="flex justify-center gap-8 sm:gap-16 md:gap-24 w-full flex-wrap sm:flex-nowrap">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={`top-${i}`} className="flex flex-col items-center justify-center">
                                        <CalendarDays className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
                                    </div>
                                ))}
                            </div>

                            {/* Center Text */}
                            <div className="text-center z-10 transition-opacity duration-300 group-hover:opacity-0 h-6 flex items-center">
                                <h3 className="text-sm md:text-base font-bold text-black tracking-wide font-manrope">Trusted by</h3>
                            </div>

                            {/* Bottom Row (Staggered) */}
                            <div className="flex justify-center gap-8 sm:gap-16 md:gap-24 w-full px-4 sm:px-12 flex-wrap sm:flex-nowrap">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={`bottom-${i}`} className="flex flex-col items-center justify-center mt-0 sm:-mt-4">
                                        <CalendarDays className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Hover Overlay Text */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none">
                            <h3 className="text-lg md:text-xl font-bold text-black tracking-wide font-manrope">Meet our Clients</h3>
                        </div>
                    </div>
                </motion.section>

                {/* SECTION 6 — AI SECTION */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 md:pt-12 md:pb-16 text-center flex flex-col items-center border-t border-zinc-100"
                >
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-orbitron font-bold text-zinc-900 mb-12 md:mb-16 md:max-w-5xl leading-snug break-words">
                        Human potential, <span className='sm:whitespace-nowrap'>multiplied by</span><br className="hidden sm:block" /> intelligent automation.
                    </h2>

                    <div className="relative flex flex-col items-center justify-center mt-4 mb-4">
                        {/* Custom Magnifying Glass */}
                        <div className="relative w-32 h-32 md:w-44 md:h-44">

                            {/* The Handle */}
                            <div className="absolute top-[82%] left-[82%] origin-top-left rotate-45 flex flex-row items-center gap-1.5 md:gap-2 z-0">
                                <div className="h-4 w-10 md:h-6 md:w-14 bg-[#77E369] rounded-sm shadow-sm" />
                                <div className="h-4 w-5 md:h-6 md:w-7 bg-[#77E369] rounded-sm shadow-sm" />
                            </div>

                            {/* The Lens / Ring */}
                            <div className="absolute inset-0 border-[12px] md:border-[20px] border-black rounded-full bg-white z-10 flex items-center justify-center shadow-lg">
                                {/* SVG Sparkles */}
                                <svg viewBox="0 0 100 100" className="w-16 h-16 md:w-24 md:h-24 absolute translate-x-0 -translate-y-1">
                                    <defs>
                                        <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#38bdf8" />
                                            <stop offset="100%" stopColor="#86efac" />
                                        </linearGradient>
                                    </defs>
                                    <path d="M50 20 Q50 50 20 50 Q50 50 50 80 Q50 50 80 50 Q50 50 50 20 Z" fill="url(#starGradient)" />
                                    <path d="M75 30 Q75 40 65 40 Q75 40 75 50 Q75 40 85 40 Q75 40 75 30 Z" fill="url(#starGradient)" />
                                    <path d="M70 70 Q70 77 63 77 Q70 77 70 84 Q70 77 77 77 Q70 77 70 70 Z" fill="url(#starGradient)" />
                                </svg>
                            </div>
                        </div>

                        {/* Text */}
                        <h3 className="text-3xl md:text-5xl font-orbitron font-bold text-black mt-16 md:mt-24 tracking-widest relative z-20 uppercase">
                            EFIQ AI
                        </h3>
                    </div>
                </motion.section>

                {/* SECTION 7 — DASHBOARD IMAGE SPACE */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-t border-zinc-100"
                >
                    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                        {/* Left Side — Logo */}
                        <div className="lg:col-span-3 flex flex-col items-center justify-center w-full">
                            <div className="relative w-24 h-24 md:w-32 md:h-32">
                                {/* The Handle (scaled down) */}
                                <div className="absolute top-[82%] left-[82%] origin-top-left rotate-45 flex flex-row items-center gap-1 md:gap-1.5 z-0">
                                    <div className="h-3 w-8 md:h-4 md:w-10 bg-[#77E369] rounded-sm shadow-sm" />
                                    <div className="h-3 w-4 md:h-4 md:w-5 bg-[#77E369] rounded-sm shadow-sm" />
                                </div>

                                {/* The Lens / Ring */}
                                <div className="absolute inset-0 border-[8px] md:border-[12px] border-black rounded-full bg-white z-10 flex items-center justify-center shadow-lg">
                                    {/* SVG Sparkles */}
                                    <svg viewBox="0 0 100 100" className="w-12 h-12 md:w-16 md:h-16 absolute translate-x-0 -translate-y-1">
                                        <defs>
                                            <linearGradient id="starGradientSmall" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#38bdf8" />
                                                <stop offset="100%" stopColor="#86efac" />
                                            </linearGradient>
                                        </defs>
                                        <path d="M50 20 Q50 50 20 50 Q50 50 50 80 Q50 50 80 50 Q50 50 50 20 Z" fill="url(#starGradientSmall)" />
                                        <path d="M75 30 Q75 40 65 40 Q75 40 75 50 Q75 40 85 40 Q75 40 75 30 Z" fill="url(#starGradientSmall)" />
                                        <path d="M70 70 Q70 77 63 77 Q70 77 70 84 Q70 77 77 77 Q70 77 70 70 Z" fill="url(#starGradientSmall)" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Right Side — Clean Picture Space */}
                        <div className="lg:col-span-9 w-full flex items-center justify-center">
                            <div className="w-full aspect-[4/3] lg:aspect-[16/9] bg-zinc-100 rounded-xl md:rounded-3xl flex items-center justify-center shadow-inner relative overflow-hidden transition-colors duration-300 hover:bg-zinc-50 border border-zinc-200">
                                <span className="text-zinc-500 font-bold uppercase tracking-wider text-sm md:text-base relative z-10 flex flex-col items-center gap-2">
                                    Space for Picture
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* SECTION 8 — FINAL CTA */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center flex flex-col items-center"
                >
                    <h2 className="text-4xl md:text-6xl font-orbitron font-bold text-zinc-900 mb-8 leading-tight">
                        More output. Same team.<br />
                        <span className="text-zinc-500 block mt-2">Zero extra effort.</span>
                    </h2>

                    <div className="mt-8 flex justify-center">
                        <Link href="/products">
                            <motion.button
                                data-magnetic
                                data-cursor-focus
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-2 px-8 py-4 font-orbitron font-bold text-black border-2 border-black bg-brand-green rounded-full hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-300 focus:ring-2 focus:ring-brand-green focus:ring-offset-2 text-lg uppercase"
                            >
                                Get Started
                            </motion.button>
                        </Link>
                    </div>
                </motion.section>
            </div>
        </main>
    );
}