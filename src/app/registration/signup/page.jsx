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
            EFIQ ONE • SIGN UP • WORKSPACE • EFIQ ONE • SIGN UP • WORKSPACE •
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
                    className="w-full max-w-[420px] bg-white/80 backdrop-blur-xl rounded-[32px] shadow-2xl shadow-gray-200/50 p-6 border border-white"
                >
                    <motion.div variants={itemVariants} className="text-center mb-6">
                        <motion.h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                            <ScrambleText text="Sign up" />
                        </motion.h1>
                        <motion.p className="text-sm text-gray-500 mt-2">Create your Efiq One account</motion.p>
                    </motion.div>

                    <motion.form
                        initial="hidden"
                        animate="visible"
                        variants={formVariants}
                        className="space-y-3"
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
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-brand-green/10 transition-all placeholder:text-gray-400 text-gray-900 bg-gray-50/50"
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
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-brand-green/10 transition-all placeholder:text-gray-400 text-gray-900 bg-gray-50/50"
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
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-brand-green/10 transition-all placeholder:text-gray-400 text-gray-900 bg-gray-50/50"
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
                                    className="w-full px-4 py-2.5 pr-11 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-brand-green/10 transition-all placeholder:text-gray-400 text-gray-900 bg-gray-50/50"
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
                                    className="w-full px-4 py-2.5 pr-11 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-brand-green/10 transition-all placeholder:text-gray-400 text-gray-900 bg-gray-50/50"
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

                        <motion.div variants={itemVariants} className="pt-2 space-y-4">
                            {/* Google Sign Up Button */}
                            <motion.button
                                drag
                                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                dragElastic={0.1}
                                type="button"
                                className="w-full py-3 px-4 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-full border border-gray-300 transition-all flex justify-center items-center active:scale-[0.98] shadow-sm"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {/* Handle Google sign up */}}
                            >
                                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                Sign up with Google
                            </motion.button>

                            {/* Sign Up Button with Magnetic and Drag effect */}
                            <motion.button
                                drag
                                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                dragElastic={0.1}
                                type="submit"
                                className="w-full py-3 px-4 bg-brand-green hover:bg-brand-green/90 text-zinc-900 font-extrabold rounded-full transition-shadow hover:shadow-lg hover:shadow-brand-green/20 focus:ring-2 focus:ring-brand-green focus:ring-offset-2 flex justify-center items-center active:scale-[0.98]"
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
                                    className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-full transition-all flex justify-center items-center block text-center"
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