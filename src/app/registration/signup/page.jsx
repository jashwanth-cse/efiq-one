"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "@/components/Navbar";
import { 
    motion, 
    useSpring, 
    useMotionValue, 
    useTransform, 
    useVelocity 
} from "motion/react";

// --- Animation Components ---

// 1. Scramble Text Effect
const ScrambleText = ({ text }) => {
    const [display, setDisplay] = useState(text);
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    useEffect(() => {
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplay(text.split("").map((letter, index) => {
                if (index < iteration) return text[index];
                return letters[Math.floor(Math.random() * 26)];
            }).join(""));
            
            if (iteration >= text.length) clearInterval(interval);
            iteration += 1 / 3;
        }, 30);
        return () => clearInterval(interval);
    }, [text]);

    return <span>{display}</span>;
};

// 2. Background Ticker
const BackgroundTicker = () => (
    <div className="absolute inset-0 overflow-hidden opacity-[0.03] pointer-events-none z-0 flex items-center">
        <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="text-[15rem] font-black whitespace-nowrap select-none"
        >
            EPIQ ONE • SIGN UP • WORKSPACE • EPIQ ONE • SIGN UP • WORKSPACE •
        </motion.div>
    </div>
);

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
};

const formVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5 },
    },
};

export default function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // --- Interaction Physics ---
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 300 };
    const dx = useSpring(mouseX, springConfig);
    const dy = useSpring(mouseY, springConfig);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative overflow-hidden">
            <Navbar />
            
            <BackgroundTicker />

            <main className="flex-1 flex items-center justify-center p-4 pt-24 pb-12 relative z-10">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="w-full max-w-[420px] bg-white/80 backdrop-blur-xl rounded-[32px] shadow-2xl shadow-gray-200/50 p-8 border border-white"
                >
                    <motion.div variants={itemVariants} className="text-center mb-8">
                        <motion.h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                            <ScrambleText text="Sign up" />
                        </motion.h1>
                        <motion.p className="text-sm text-gray-500 mt-2">Create your Epiq One account</motion.p>
                    </motion.div>

                    <motion.form
                        initial="hidden"
                        animate="visible"
                        variants={formVariants}
                        className="space-y-4"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        {/* Name */}
                        <motion.div variants={itemVariants} className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700 block" htmlFor="name">
                                Name
                            </label>
                            <motion.input
                                whileFocus={{ scale: 1.01, borderColor: "#000" }}
                                id="name"
                                type="text"
                                placeholder="Enter your name"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-brand-green/10 transition-all placeholder:text-gray-400 text-gray-900 bg-gray-50/50"
                            />
                        </motion.div>

                        {/* Organization mail id */}
                        <motion.div variants={itemVariants} className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700 block" htmlFor="email">
                                Organization mail id
                            </label>
                            <motion.input
                                whileFocus={{ scale: 1.01 }}
                                id="email"
                                type="email"
                                placeholder="you@company.com"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-brand-green/10 transition-all placeholder:text-gray-400 text-gray-900 bg-gray-50/50"
                            />
                        </motion.div>

                        {/* Organization Name */}
                        <motion.div variants={itemVariants} className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700 block" htmlFor="orgName">
                                Organization Name
                            </label>
                            <motion.input
                                whileFocus={{ scale: 1.01 }}
                                id="orgName"
                                type="text"
                                placeholder="Acme Corp"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-brand-green/10 transition-all placeholder:text-gray-400 text-gray-900 bg-gray-50/50"
                            />
                        </motion.div>

                        {/* Password */}
                        <motion.div variants={itemVariants} className="space-y-1.5 relative">
                            <label className="text-sm font-semibold text-gray-700 block" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <motion.input
                                    whileFocus={{ scale: 1.01 }}
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a password"
                                    className="w-full px-4 py-3 pr-11 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-brand-green/10 transition-all placeholder:text-gray-400 text-gray-900 bg-gray-50/50"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1 rounded-md"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </motion.div>

                        {/* Re Enter Password */}
                        <motion.div variants={itemVariants} className="space-y-1.5 relative">
                            <label className="text-sm font-semibold text-gray-700 block" htmlFor="confirmPassword">
                                Re Enter Password
                            </label>
                            <div className="relative">
                                <motion.input
                                    whileFocus={{ scale: 1.01 }}
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    className="w-full px-4 py-3 pr-11 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-brand-green/10 transition-all placeholder:text-gray-400 text-gray-900 bg-gray-50/50"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1 rounded-md"
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </motion.div>

                        {/* Terms Checkbox */}
                        <motion.div variants={itemVariants} className="flex items-start pt-3 pb-1">
                            <div className="flex items-center h-5 mt-0.5">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    className="w-4 h-4 border-gray-300 rounded text-brand-green focus:ring-brand-green focus:ring-2 cursor-pointer transition-colors"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="terms" className="text-gray-600 cursor-pointer leading-tight">
                                    By Clicking the box, I agree the{" "}
                                    <Link href="/terms" className="text-gray-900 font-bold hover:underline">
                                        Terms
                                    </Link>{" "}
                                    and{" "}
                                    <Link href="/privacy" className="text-gray-900 font-bold hover:underline">
                                        Privacy Policy
                                    </Link>
                                </label>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="pt-4 space-y-4">
                            {/* Sign Up Button with Magnetic and Drag effect */}
                            <motion.button
                                drag
                                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                dragElastic={0.1}
                                type="submit"
                                className="w-full py-4 px-4 bg-brand-green hover:bg-brand-green/90 text-zinc-900 font-extrabold rounded-full transition-shadow hover:shadow-lg hover:shadow-brand-green/20 focus:ring-2 focus:ring-brand-green focus:ring-offset-2 flex justify-center items-center active:scale-[0.98]"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Sign Up
                            </motion.button>

                            <div className="relative flex items-center justify-center">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative bg-white/80 px-4 text-sm font-medium text-gray-400">
                                    or
                                </div>
                            </div>

                            {/* Log In Button */}
                            <motion.div
                                drag
                                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                dragElastic={0.05}
                            >
                                <Link
                                    href="/registration/login"
                                    className="w-full py-4 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-full transition-all flex justify-center items-center block text-center"
                                >
                                    Log in
                                </Link>
                            </motion.div>
                        </motion.div>
                    </motion.form>
                </motion.div>
            </main>
        </div>
    );
}