"use client";

import React, { useRef, useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
    motion, 
    useScroll, 
    useTransform, 
    useSpring, 
    useVelocity,
    useAnimationFrame
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

// --- Custom Animation Hooks/Components ---

// 1. Text Scramble Effect
const ScrambleText = ({ text }) => {
    const [displayDescription, setDisplayDescription] = useState(text);
    const chars = "!<>-_\\/[]{}—=+*^?#________";

    const scramble = () => {
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayDescription(prev => 
                prev.split("").map((_, index) => {
                    if (index < iteration) return text[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join("")
            );
            if (iteration >= text.length) clearInterval(interval);
            iteration += 1 / 3;
        }, 30);
    };

    return (
        <motion.span onViewportEnter={scramble} className="inline-block">
            {displayDescription}
        </motion.span>
    );
};

export default function EnterprisePage() {
    const featureRef = useRef(null);
    const { scrollYProgress } = useScroll();
    
    // 2. Velocity & Spring for "Liquid" scroll feel
    const scrollVelocity = useVelocity(scrollYProgress);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
    const skew = useTransform(smoothVelocity, [-1, 1], [-5, 5]);

    // 3. Parallax for Feature Image
    const { scrollYProgress: featureScroll } = useScroll({
        target: featureRef,
        offset: ["start end", "end start"]
    });
    const yParallax = useTransform(featureScroll, [0, 1], [-50, 50]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-orbitron overflow-x-hidden">
            <Navbar />

            <main className="flex-1 pt-24 pb-12">
                {/* 2. Hero Section */}
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
                                We don&apos;t make you fit the system.<br />
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

                        {/* RIGHT SIDE */}
                        <motion.div
                            variants={itemVariants}
                            className="flex justify-center lg:justify-end"
                        >
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ type: "spring", stiffness: 100 }}
                                className="w-full max-w-md bg-gray-100 rounded-3xl p-10 shadow-sm border border-gray-200 flex flex-col items-center text-center space-y-6"
                            >
                                <motion.h2 className="text-3xl font-bold text-gray-900">Book a 1 : 1 Call</motion.h2>
                                <motion.a
                                    href="#"
                                    className="inline-block w-full py-4 px-6 bg-brand-green hover:bg-brand-green/90 text-zinc-900 font-bold rounded-full transition-all text-center focus:ring-2 focus:ring-brand-green focus:ring-offset-2 text-lg mt-4"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Book a Call
                                </motion.a>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.section>

                {/* 3. Enterprise Description Section */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
                >
                    <div className="max-w-[700px] mx-auto space-y-6">
                        <motion.h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Every organization is different. Your software should be too.
                        </motion.h2>
                        <motion.p className="text-lg text-gray-600 leading-relaxed font-manrope">
                            Complex workflows, multi-branch operations, layered teams, and department-wise structures make every enterprise unique. EPIQ One Enterprise adapts to your exact model, ensuring seamless operations across your people, processes, and resources.
                        </motion.p>
                    </div>
                </motion.section>

                {/* 4. Enterprise Offers Section */}
                <section ref={featureRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
                    <div className="mb-16">
                        <h2 className="text-sm font-bold tracking-widest text-gray-500 uppercase text-center lg:text-left selection:bg-brand-green selection:text-white">
                            <ScrambleText text="ENTERPRISE OFFERS" />
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                        {/* LEFT SIDE: List of features */}
                        <div className="space-y-0">
                            {[
                                { name: "Fully Customizable Modules", active: true },
                                { name: "Department-Wise Solutions", active: false },
                                { name: "Multi-Branch + Multi-Location Support", active: false },
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
                                    <h3 className={`text-xl md:text-2xl font-semibold transition-colors ${feature.active ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-700'}`}>
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

                        {/* RIGHT SIDE: Feature preview with Parallax */}
                        <motion.div 
                            style={{ y: yParallax }}
                            className="w-full aspect-video bg-gray-200 rounded-3xl flex items-center justify-center text-gray-500 text-xl font-medium border border-gray-300 sticky top-32"
                        >
                            Feature Image
                        </motion.div>
                    </div>
                </section>

                {/* 5. Call To Action Section with Velocity Ticker */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center relative overflow-hidden">
                    {/* Background Ticker */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                        <motion.div 
                            style={{ skewX: skew }}
                            animate={{ x: [0, -1000] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="text-[10rem] font-bold whitespace-nowrap"
                        >
                            SCALE • CUSTOM • ENTERPRISE • POWER • SCALE • CUSTOM • ENTERPRISE • POWER •
                        </motion.div>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-8 relative z-10">
                        <motion.h2 
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            className="text-4xl md:text-3xl font-extrabold text-gray-900 tracking-tight"
                        >
                            Your enterprise. Your workflows. Your system.
                        </motion.h2>
                        <p className="text-xs text-gray-600">
                            Get a customized platform built specifically for your workflows, structure, and scale.
                        </p>
                        <div className="pt-6 flex justify-center">
                            <motion.a
                                href="#"
                                className="inline-block py-4 px-8 bg-brand-green hover:bg-brand-green/90 text-zinc-900 font-bold rounded-full transition-all text-lg shadow-lg"
                                whileHover={{ 
                                    scale: 1.1,
                                    rotate: [0, -1, 1, 0],
                                    transition: { duration: 0.2 }
                                }}
                                whileTap={{ scale: 0.9 }}
                            >
                                Talk to our Enterprise Expert
                            </motion.a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}