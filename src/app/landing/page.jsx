"use client";

import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { motion } from "motion/react";
import Link from "next/link";
import {
    ArrowRight,
    Settings,
    Workflow,
    Zap,
    ShieldCheck,
    BarChart,
    Users,
    Layers,
    Clock,
    Sparkles,
    Search,
    CalendarDays
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useMotionValue, useSpring, useTransform } from "motion/react";

/* ── 3-D smooth tilt hook using Framer Motion ── */
function useSmooth3DTilt(amount = 15, springConfig = { damping: 20, stiffness: 150 }) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, springConfig);
    const mouseYSpring = useSpring(y, springConfig);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [amount, -amount]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-amount, amount]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return { ref, rotateX, rotateY, handleMouseMove, handleMouseLeave };
}

/* ── Floating Geo Dots ── */
function FloatDot({ x, y, size, color, delay }) {
    return (
        <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{ left: x, top: y, width: size, height: size, background: color }}
            animate={{ y: [0, -20, 0], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay }}
        />
    );
}

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
            style={{ perspective: 1200 }}
        >

            <div className="flex flex-col lg:flex-row w-full gap-12 lg:gap-16 items-stretch">
                {/* Left Side — Image Placeholder */}
                <div className="w-full lg:w-1/2 order-2 lg:order-1 flex flex-col perspective-1000">
                    <motion.div 
                        className="relative w-full flex-grow min-h-[300px] lg:min-h-0 bg-zinc-50 border border-zinc-200 shadow-xl shadow-zinc-200/50 rounded-2xl overflow-hidden preserve-3d"
                        whileHover={{ scale: 1.05, rotateY: -10, rotateX: 5 }}
                        transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        {/* decorative corner blur */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-green/20 blur-2xl rounded-full"></div>
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-brand-blue/10 blur-2xl rounded-full"></div>
                        
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, z: -50, scale: 0.9 }}
                            animate={{ opacity: 1, z: 50, scale: 1 }}
                            transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 25 }}
                            className="absolute inset-0 flex items-center justify-center p-8 text-center"
                            style={{ transform: "translateZ(80px)" }}
                        >
                            <span className="text-zinc-600 font-bold md:text-lg bg-white/80 backdrop-blur-md px-6 py-3 rounded-xl shadow-lg border border-zinc-100/50">
                                {features[activeIndex].imageDesc}
                            </span>
                        </motion.div>
                    </motion.div>
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
                                <motion.div
                                    key={feature.id}
                                    initial={{ opacity: 0, rotateX: -60, y: 30 }}
                                    whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, delay: index * 0.15, type: "spring", bounce: 0.2 }}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    className={`
                                        cursor-pointer transition-all duration-300 py-3 px-4 rounded-xl border border-transparent
                                        ${isActive ? 'bg-zinc-50 border-zinc-200 shadow-sm text-zinc-900' : 'text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50/50'}
                                    `}
                                    style={{ transformOrigin: "top center" }}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${isActive ? 'bg-brand-green' : 'bg-zinc-300'}`}></div>
                                        <h3 className={`font-bold md:text-lg ${isActive ? 'translate-x-1' : ''} transition-transform duration-300`}>
                                            {feature.title}
                                        </h3>
                                    </div>
                                </motion.div>
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
    const heroTilt = useSmooth3DTilt(18);
    const productTilt = useSmooth3DTilt(12);

    return (
        <main className="min-h-screen flex flex-col bg-white text-zinc-900 font-manrope relative overflow-hidden">
            {/* Animated Light Background Elements */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
                <motion.div 
                    className="absolute rounded-full opacity-40 blur-[100px]"
                    style={{ background: "#82e05a", width: "40vw", height: "40vw", top: "-10%", left: "-10%" }}
                    animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                    className="absolute rounded-full opacity-30 blur-[100px]"
                    style={{ background: "#5a78ff", width: "35vw", height: "35vw", top: "20%", right: "-10%" }}
                    animate={{ scale: [1, 1.3, 1], x: [0, -40, 0], y: [0, -20, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                    className="absolute rounded-full opacity-20 blur-[80px]"
                    style={{ background: "#82e05a", width: "25vw", height: "25vw", bottom: "-5%", left: "30%" }}
                    animate={{ scale: [1, 1.1, 1], x: [0, 20, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Light Geometric Grid */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.05]">
                    <defs>
                        <pattern id="lightGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#000" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#lightGrid)" />
                </svg>

                {/* Floating Dots */}
                <FloatDot x="15%" y="25%" size={8} color="rgba(130,224,90,0.6)" delay={0} />
                <FloatDot x="80%" y="30%" size={6} color="rgba(90,120,255,0.5)" delay={1.5} />
                <FloatDot x="25%" y="75%" size={12} color="rgba(90,120,255,0.4)" delay={0.7} />
                <FloatDot x="75%" y="65%" size={9} color="rgba(130,224,90,0.7)" delay={2.2} />
                <FloatDot x="50%" y="15%" size={5} color="rgba(130,224,90,0.8)" delay={1.1} />
            </div>

            <CustomCursor />
            <Navbar />

            <div className="flex-grow pt-24 relative z-10">
                {/* SECTION 1 — HERO */}
                <motion.section
                    ref={heroTilt.ref}
                    onMouseMove={heroTilt.handleMouseMove}
                    onMouseLeave={heroTilt.handleMouseLeave}
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    style={{ perspective: 1200 }}
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 lg:pt-32 lg:pb-12 text-center flex flex-col items-center"
                >
                    <motion.div
                        style={{ rotateX: heroTilt.rotateX, rotateY: heroTilt.rotateY, transformStyle: "preserve-3d" }}
                        className="flex flex-col items-center justify-center w-full relative"
                    >
                        {/* 3D Floating Accents behind Hero Text */}
                        <motion.div style={{ transform: "translateZ(-80px)" }} className="absolute inset-0 flex justify-center items-center pointer-events-none z-[-1]">
                            <motion.div
                                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                className="w-[500px] h-[500px] rounded-full border border-zinc-200/50 opacity-50"
                            />
                            <motion.div
                                animate={{ rotate: -360, scale: [1, 1.2, 1] }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="absolute w-[600px] h-[600px] rounded-full border border-dashed border-zinc-200/30 opacity-40"
                            />
                        </motion.div>

                        <motion.h1 
                            variants={itemVariants} 
                            style={{ transform: "translateZ(80px)" }} 
                            className="text-4xl md:text-5xl lg:text-[52px] xl:text-6xl font-orbitron font-bold text-black tracking-tight w-full leading-tight drop-shadow-sm whitespace-nowrap"
                        >
                        Your Business. Simplified. Streamlined.
                    </motion.h1>
                        <motion.p 
                            variants={itemVariants} 
                            style={{ transform: "translateZ(60px)" }}
                            className="mt-5 text-base md:text-lg font-bold text-black max-w-3xl mx-auto leading-relaxed"
                        >
                            Centralize people, operations, and resources — all in one powerful platform.
                        </motion.p>
                        <motion.div 
                            variants={buttonVariants} 
                            style={{ transform: "translateZ(100px)" }}
                            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
                        >
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
                    </motion.div>
                </motion.section>

                {/* SECTION 2 — PRODUCT SCREENSHOT PLACEHOLDER */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full max-w-[70rem] mx-auto px-6 sm:px-10 lg:px-12 pt-8 pb-16 md:pt-12 md:pb-24"
                    style={{ perspective: 1500 }}
                    ref={productTilt.ref}
                    onMouseMove={productTilt.handleMouseMove}
                    onMouseLeave={productTilt.handleMouseLeave}
                >
                    <motion.div
                        className="w-full aspect-video md:aspect-[16/9] bg-zinc-50 border border-zinc-200/50 flex flex-col justify-center items-center rounded-2xl relative preserve-3d shadow-2xl glassmorphism"
                        style={{ rotateX: productTilt.rotateX, rotateY: productTilt.rotateY, transformStyle: "preserve-3d" }}
                    >
                        {/* Elevated Inner elements */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-brand-green/5 to-brand-blue/5 rounded-2xl" />
                        
                        <motion.span 
                            style={{ transform: "translateZ(50px)" }}
                            className="text-zinc-500 font-bold md:text-xl lg:text-2xl text-center px-4 bg-white/60 backdrop-blur-md py-3 rounded-lg border border-white/50 shadow-sm"
                        >
                            [ Your Product Screenshot Here ]
                        </motion.span>
                        <motion.p style={{ transform: "translateZ(30px)" }} className="text-zinc-400 mt-4 text-sm text-center">
                            High-end 3D product view placeholder.
                        </motion.p>
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
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-orbitron font-bold text-zinc-900 mb-12 md:mb-16 md:max-w-5xl leading-snug">
                        Human potential, <span className='whitespace-nowrap'>multiplied by</span><br /> intelligent automation.
                    </h2>

                    <div className="relative flex flex-col items-center justify-center mt-4 mb-4" style={{ perspective: 1000 }}>
                        {/* Custom Animated 3D Magnifying Glass */}
                        <motion.div 
                            className="relative w-32 h-32 md:w-44 md:h-44"
                            animate={{ y: [0, -15, 0], rotateX: [0, 10, 0], rotateY: [0, -10, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            style={{ transformStyle: "preserve-3d" }}
                        >

                            {/* The Handle */}
                            <motion.div 
                                style={{ transform: "translateZ(-20px)" }}
                                className="absolute top-[82%] left-[82%] origin-top-left rotate-45 flex flex-row items-center gap-1.5 md:gap-2 z-0"
                            >
                                <div className="h-4 w-10 md:h-6 md:w-14 bg-[#77E369] rounded-sm shadow-xl" />
                                <div className="h-4 w-5 md:h-6 md:w-7 bg-[#77E369] rounded-sm shadow-xl" />
                            </motion.div>

                            {/* The Lens / Ring */}
                            <motion.div 
                                style={{ transform: "translateZ(40px)" }}
                                className="absolute inset-0 border-[12px] md:border-[20px] border-black rounded-full bg-white/90 backdrop-blur-sm z-10 flex items-center justify-center shadow-2xl"
                            >
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
                            </motion.div>
                        </motion.div>

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

            {/* SECTION 9 — FOOTER */}
            <Footer />
        </main>
    );
}