"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

function isTyping() {
  return false;
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center p-6 font-manrope bg-[#0c0c0f] text-white overflow-hidden relative" style={{ background: "linear-gradient(160deg, #111116 0%, #0c0c0f 100%)" }}>
      {/* Background radial glows */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{ width: 500, height: 500, top: "-10%", left: "-15%", background: "radial-gradient(circle, rgba(90,120,255,0.16) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.12, 1], rotate: [0, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25, duration: 0.6 }}
        className="relative z-10 w-full max-w-md p-8 md:p-10 rounded-[2.5rem] bg-white"
        style={{ 
          border: "2px solid #82e05a", 
          boxShadow: "inset 0 2px 0 0 rgba(255,255,255,1), 0 20px 40px rgba(0,0,0,0.15)" 
        }}
      >
        <div className="flex justify-center mb-6">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
            className="w-16 h-16 rounded-full flex items-center justify-center bg-brand-green/10 text-brand-green border-[1px] border-brand-green/30"
          >
            <Mail className="w-8 h-8 text-[#82e05a]" />
          </motion.div>
        </div>
        
        <h1 className="text-2xl font-orbitron font-bold text-center text-zinc-900 mb-3 tracking-tight">Check Your Email</h1>
        <p className="text-center text-sm mb-8 leading-relaxed" style={{ color: "#52525b" }}>
          We&apos;ve sent a secure verification link to your email address. Please click the link to activate your account and securely access your EFIQ ONE workspace.
        </p>

        <div className="flex flex-col gap-4">
          <Link 
            href="/registration/login" 
            className="w-full inline-flex items-center justify-center py-4 font-orbitron font-bold text-black border-2 border-black bg-brand-green rounded-full hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-300 tracking-widest text-sm"
            style={{ boxShadow: "0 0 20px rgba(130,224,90,0.2)" }}
          >
            Go to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
