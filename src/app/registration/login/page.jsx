"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 300, damping: 24 },
    },
};

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-zinc-50 px-4 font-manrope relative overflow-hidden pt-20 pb-12">
            {/* Dynamic Animated Background Glows */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                    rotate: [0, 90, 0]
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute top-0 left-[20%] w-[600px] h-[600px] bg-[#90EE90]/20 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"
            />
            <motion.div
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.2, 0.4, 0.2],
                    x: [0, 100, 0],
                    y: [0, 50, 0]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute bottom-0 right-[10%] w-[500px] h-[500px] bg-[#90EE90]/10 blur-[100px] rounded-full pointer-events-none translate-y-1/4 translate-x-1/4"
            />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -12 }}
                className="w-full max-w-lg bg-white/90 backdrop-blur-2xl p-8 sm:p-10 rounded-[28px] shadow-sm hover:shadow-[0_45px_65px_-15px_rgba(0,0,0,0.1)] hover:border-[#90EE90]/40 border border-white/80 transition-all duration-500 relative z-10"
            >
                {/* Header with App Icon */}
                <motion.div variants={itemVariants} className="text-center mb-10">
                    <motion.div
                        whileHover={{ rotate: 180, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        className="w-16 h-16 bg-[#90EE90]/20 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-inner cursor-pointer"
                    >
                        <div className="w-10 h-10 bg-[#90EE90] rounded-xl flex items-center justify-center text-black font-orbitron font-bold text-xl shadow-sm">
                            U
                        </div>
                    </motion.div>

                    <h1 className="text-4xl font-bold text-zinc-900 font-orbitron tracking-tight">
                        Log In
                    </h1>
                    <p className="text-zinc-500 mt-3 font-medium text-sm">
                        Welcome back! Please enter your details.
                    </p>
                </motion.div>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    {/* Mailid Input */}
                    <motion.div variants={itemVariants} className="space-y-2">
                        <label className="block text-sm font-bold text-zinc-700">Mailid</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-[#90EE90] text-zinc-400 transition-colors">
                                <Mail className="h-5 w-5" />
                            </div>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#90EE90] focus:border-[#90EE90] transition-all font-medium text-zinc-900 placeholder:text-zinc-400 group-hover:border-zinc-300"
                            />
                        </div>
                    </motion.div>

                    {/* Password Input */}
                    <motion.div variants={itemVariants} className="space-y-2">
                        <div className="relative group">
                            <label className="block text-sm font-bold text-zinc-700 mb-2">Password</label>
                            <div className="absolute bottom-0 inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-[#90EE90] text-zinc-400 transition-colors mt-[28px]">
                                <Lock className="h-5 w-5" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                className="w-full pl-12 pr-12 py-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#90EE90] focus:border-[#90EE90] transition-all font-medium text-zinc-900 placeholder:text-zinc-400 group-hover:border-zinc-300"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 bottom-0 top-[28px] text-zinc-400 hover:text-zinc-600 focus:outline-none transition-colors"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>

                        {/* Forgot Password Link */}
                        <div className="flex justify-end pt-2">
                            <Link href="#" className="text-sm font-bold text-zinc-500 hover:text-zinc-900 hover:underline transition-all">
                                Forgot Password?
                            </Link>
                        </div>
                    </motion.div>

                    {/* Log In Button - Vibrant Green */}
                    <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-2">
                        <button
                            type="submit"
                            className="w-full py-4 bg-[#90EE90] text-black font-bold text-lg rounded-xl focus:outline-none focus:ring-4 focus:ring-[#90EE90]/40 transition-all font-orbitron tracking-widest shadow-[0_8px_20px_-6px_rgba(144,238,144,0.5)] hover:shadow-[0_12px_25px_-6px_rgba(144,238,144,0.6)] hover:bg-[#85e285]"
                        >
                            Log In
                        </button>
                    </motion.div>
                </form>

                {/* OR Divider */}
                <motion.div variants={itemVariants} className="my-8 flex items-center justify-center gap-4">
                    <div className="h-px bg-zinc-200 flex-grow" />
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">or</span>
                    <div className="h-px bg-zinc-200 flex-grow" />
                </motion.div>

                {/* Sign up Button - Light Grey Bordered */}
                <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                        href="/registration/signup"
                        className="flex justify-center items-center w-full py-4 bg-transparent border-2 border-zinc-200 text-zinc-700 font-bold text-lg rounded-xl hover:bg-zinc-50 hover:border-zinc-300 transition-all font-orbitron tracking-widest hover:shadow-sm"
                    >
                        Sign up
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
