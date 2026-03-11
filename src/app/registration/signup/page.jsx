"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Eye, EyeOff, User, Mail, Building2, Lock } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { signUp } from "../../../../lib/auth";

/* ── 3-D tilt hook ── */
function use3DTilt() {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 160, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 160, damping: 20 });
  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { x.set(0); y.set(0); };
  return { ref, rotateX, rotateY, onMove, onLeave };
}

/* ── EFIQ ONE logo ── */
function EfiqLogo({ size = 56, isTyping = false }) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Pulse effect behind logo when typing */}
      <AnimatePresence>
        {isTyping && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [1.2, 2.5], opacity: [0.6, 0] }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeOut" }}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: size * 1.5,
              height: size * 1.5,
              background: "radial-gradient(circle, rgba(130,224,90,0.6) 0%, rgba(90,120,255,0.2) 70%, transparent 100%)",
              filter: "blur(8px)",
            }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 flex items-center gap-3">
        <motion.svg 
          viewBox="10 0 80 95" 
          style={{ height: size, width: "auto" }} 
          aria-hidden="true"
          animate={isTyping ? { rotateY: [0, 360], scale: [1, 1.1, 1] } : { rotateY: 0, scale: 1 }}
          transition={isTyping ? { duration: 2, repeat: Infinity, ease: "linear" } : { duration: 0.5 }}
        >
          <path d="M 10 48 L 10 70 A 25 25 0 0 0 35 95 L 65 95 A 25 25 0 0 0 90 70 L 90 48 L 65 48 L 65 70 L 35 70 L 35 48 Z" fill="#5a78ff" />
          <path d="M 90 48 L 90 25 A 25 25 0 0 0 65 0 L 10 0 L 35 25 L 65 25 L 65 48 Z" fill="#82e05a" />
        </motion.svg>
        <div className="flex flex-col justify-center">
          <span className="font-orbitron font-bold text-[11px] tracking-[0.22em] text-white leading-none mb-0.5">EFIQ</span>
          <span className="font-orbitron font-black text-[26px] text-white leading-none tracking-tight">ONE</span>
        </div>
      </div>
    </div>
  );
}

/* ── Scramble text ── */
function ScrambleText({ text, trigger }) {
  const [display, setDisplay] = useState(text);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      setDisplay(text.split("").map((ch, idx) => idx < i ? text[idx] : letters[Math.floor(Math.random() * letters.length)]).join(""));
      if (i >= text.length) clearInterval(iv);
      i += 1 / 2;
    }, 28);
    return () => clearInterval(iv);
  }, [text, trigger]);
  return <span>{display}</span>;
}

/* ── Orbiting ring component ── */
function OrbitRing({ radius, duration, dotColor, dotSize = 8, reverse = false, children }) {
  return (
    <div className="absolute" style={{ width: radius * 2, height: radius * 2, top: "50%", left: "50%", marginTop: -radius, marginLeft: -radius }}>
      {/* Ring border */}
      <div className="absolute inset-0 rounded-full" style={{ border: "1px solid rgba(255,255,255,0.05)" }} />
      {/* Orbiting dot */}
      <motion.div
        className="absolute rounded-full"
        style={{ width: dotSize, height: dotSize, background: dotColor, top: -dotSize / 2, left: "50%", marginLeft: -dotSize / 2, boxShadow: `0 0 8px 2px ${dotColor}` }}
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        transformTemplate={({ rotate }) => `rotate(${rotate}) translateX(${radius}px) rotate(calc(-1 * ${rotate}))`}
      />
      {children}
    </div>
  );
}

/* ── Floating geo decoration ── */
function FloatDot({ x, y, size, color, delay }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: color }}
      animate={{ y: [0, -14, 0], opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 3.5 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

/* ── Input field ── */
function DarkInput({ id, label, type = "text", placeholder, icon: Icon, suffix }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-bold tracking-widest uppercase" style={{ color: "#a1a1aa" }}>{label}</label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none" style={{ color: "#52525b" }}>
          <Icon className="w-4 h-4" />
        </div>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className="w-full pl-10 py-3 rounded-xl text-sm font-medium transition-all focus:outline-none"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#e4e4e7", paddingRight: suffix ? "3rem" : "1rem" }}
          onFocus={e => { e.target.style.border = "1px solid rgba(90,120,255,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(90,120,255,0.1)"; }}
          onBlur={e => { e.target.style.border = "1px solid rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; }}
        />
        {suffix}
      </div>
    </div>
  );
}

const formVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};
const itemVariants = {
  hidden: { y: 16, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 260, damping: 22 } },
};

/* ── Success Loading Overlay ── */
function SuccessOverlay({ show, title, subtitle }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0c0c0f] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Animated Background */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{ width: 600, height: 600, background: "radial-gradient(circle, rgba(130,224,90,0.15) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.5, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{ width: 500, height: 500, background: "radial-gradient(circle, rgba(90,120,255,0.15) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            initial={{ scale: 0.5, rotateY: 90, opacity: 0 }}
            animate={{ scale: 1, rotateY: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            className="relative z-10 flex flex-col items-center"
            style={{ perspective: 1000 }}
          >
            <EfiqLogo size={96} isTyping={true} />
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-12 text-center"
            >
              <h2 className="text-3xl font-orbitron font-bold text-white tracking-widest mb-3">
                <ScrambleText text={title} trigger={show} />
              </h2>
              <p className="text-gray-400 font-manrope text-sm tracking-wide">
                {subtitle}
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  ...
                </motion.span>
              </p>
            </motion.div>
          </motion.div>
          
          {/* Progress Line */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-brand-green"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function SignUpPage() {
  const [showPwd, setShowPwd] = useState(false);
  const [showCPwd, setShowCPwd] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [pwd, setPwd] = useState("");
  const [cpwd, setCpwd] = useState("");
  const [error, setError] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSuccessLoading, setIsSuccessLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const typingTimeoutRef = useRef(null);
  
  const handleTyping = (setter, field) => (e) => {
    setter(e.target.value);
    
    // Clear validation error when typing
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }

    setIsTyping(true);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 1000);
  };

  const tilt = use3DTilt();
  const { login } = useAuth();
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setValidationErrors({});

    // Manual Validation
    if (!name.trim() || !email.trim() || !org.trim() || !pwd || !cpwd) {
      setError("All fields are required");
      const errs = {};
      if (!name.trim()) errs.name = true;
      if (!email.trim()) errs.email = true;
      if (!org.trim()) errs.org = true;
      if (!pwd) errs.pwd = true;
      if (!cpwd) errs.cpwd = true;
      setValidationErrors(errs);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format");
      setValidationErrors({ email: true });
      return;
    }

    if (pwd !== cpwd) { 
      setError("Passwords do not match."); 
      setValidationErrors(prev => ({ ...prev, cpwd: true, pwd: true }));
      return; 
    }

    if (pwd.length < 6) { 
      setError("Password must be at least 6 characters."); 
      setValidationErrors(prev => ({ ...prev, pwd: true }));
      return; 
    }

    // Password Complexity Regex
    const hasLowercase = /[a-z]/.test(pwd);
    const hasUppercase = /[A-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?./`~]/.test(pwd);

    if (!hasLowercase || !hasUppercase || !hasNumber || !hasSpecial) {
      setError("Password must contain lowercase, uppercase, number and special character.");
      setValidationErrors(prev => ({ ...prev, pwd: true }));
      return;
    }
    
    const { data, error: signUpError } = await signUp({
      email,
      password: pwd,
      fullName: name,
      organisationName: org,
    });

    if (signUpError) {
      setError(signUpError.message);
      return;
    }
    
    // Trigger cinematic success loading screen
    setIsSuccessLoading(true);
    setTimeout(() => {
      router.push("/auth/verify");
    }, 2800);
  };

  return (
    <div className="min-h-[100dvh] flex font-manrope overflow-hidden text-zinc-900" style={{ background: "#0c0c0f" }}>

      {/* Loading Overlay */}
      <SuccessOverlay 
        show={isSuccessLoading} 
        title="Welcome to EFIQ One" 
        subtitle="Creating your enterprise profile and setting up modules" 
      />

      {/* ══ LEFT PANEL — 3D Branding ══ */}
      <div className="hidden lg:flex lg:w-[46%] relative flex-col items-center justify-center p-10 overflow-hidden">

        {/* Background radial glows */}
        <motion.div className="absolute rounded-full pointer-events-none"
          style={{ width: 500, height: 500, top: "-10%", left: "-15%", background: "radial-gradient(circle, rgba(90,120,255,0.16) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.12, 1], rotate: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div className="absolute rounded-full pointer-events-none"
          style={{ width: 380, height: 380, bottom: "0%", right: "-8%", background: "radial-gradient(circle, rgba(130,224,90,0.10) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.18, 1], rotate: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />

        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none">
          <defs>
            <pattern id="sg" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#82e05a" strokeWidth="0.7" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sg)" />
        </svg>

        {/* Corner brackets */}
        {[
          { top: "5%", left: "5%" }, { top: "5%", right: "5%", flip: true },
          { bottom: "5%", left: "5%", rot: -90 }, { bottom: "5%", right: "5%", rot: 180 },
        ].map((pos, i) => (
          <motion.div key={i} className="absolute pointer-events-none" style={{ top: pos.top, left: pos.left, right: pos.right, bottom: pos.bottom }}
            animate={{ opacity: [0.25, 0.65, 0.25] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ transform: `rotate(${pos.rot || (pos.flip ? 90 : 0)}deg)` }}>
              <path d="M 0 18 L 0 0 L 18 0" stroke="#5a78ff" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </motion.div>
        ))}

        {/* Floating dots */}
        <FloatDot x="10%" y="18%" size={7} color="rgba(130,224,90,0.7)" delay={0} />
        <FloatDot x="82%" y="14%" size={5} color="rgba(90,120,255,0.9)" delay={1.1} />
        <FloatDot x="7%"  y="70%" size={6} color="rgba(90,120,255,0.6)" delay={0.7} />
        <FloatDot x="80%" y="76%" size={8} color="rgba(130,224,90,0.5)" delay={1.8} />
        <FloatDot x="48%" y="8%"  size={4} color="rgba(130,224,90,0.8)" delay={2.2} />

        {/* 3D tilt container */}
        <motion.div
          ref={tilt.ref}
          onMouseMove={tilt.onMove}
          onMouseLeave={tilt.onLeave}
          style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformPerspective: 900 }}
          className="relative z-10 flex flex-col items-center gap-10"
        >
          {/* Orbit system */}
          <div className="relative flex items-center justify-center" style={{ width: 260, height: 260 }}>
            {/* Outer ring */}
            <OrbitRing radius={118} duration={18} dotColor="#5a78ff" dotSize={10} />
            {/* Middle ring */}
            <OrbitRing radius={85} duration={12} dotColor="#82e05a" dotSize={8} reverse />
            {/* Inner ring */}
            <OrbitRing radius={55} duration={8} dotColor="rgba(90,120,255,0.6)" dotSize={6} />

            {/* Center logo card */}
            <motion.div
              className="absolute flex items-center justify-center rounded-2xl z-10"
              style={{
                width: 88, height: 88,
                background: "linear-gradient(135deg, rgba(90,120,255,0.18) 0%, rgba(130,224,90,0.10) 100%)",
                border: "1px solid rgba(90,120,255,0.35)",
                boxShadow: "0 0 40px rgba(90,120,255,0.2)",
                top: "50%", left: "50%", marginTop: -44, marginLeft: -44,
              }}
              animate={{
                boxShadow: [
                  "0 0 30px rgba(90,120,255,0.15)",
                  "0 0 55px rgba(90,120,255,0.35)",
                  "0 0 30px rgba(90,120,255,0.15)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg viewBox="10 0 80 95" style={{ height: 42, width: "auto" }}>
                <path d="M 10 48 L 10 70 A 25 25 0 0 0 35 95 L 65 95 A 25 25 0 0 0 90 70 L 90 48 L 65 48 L 65 70 L 35 70 L 35 48 Z" fill="#5a78ff" />
                <path d="M 90 48 L 90 25 A 25 25 0 0 0 65 0 L 10 0 L 35 25 L 65 25 L 65 48 Z" fill="#82e05a" />
              </svg>
            </motion.div>
          </div>

          {/* Text */}
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <EfiqLogo size={44} isTyping={isTyping} />
            </div>
            <motion.h2
              className="font-orbitron font-bold text-xl text-white tracking-wide"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <ScrambleText text="JOIN EFIQ ONE" trigger={1} />
            </motion.h2>
            <p className="font-manrope text-sm" style={{ color: "#71717a" }}>
              Centralize people, operations &amp; resources.
            </p>
          </div>

          {/* Feature pills */}
          <div className="flex flex-col gap-2 w-full max-w-[230px]">
            {[
              { icon: "◈", label: "Attendance Tracking", color: "#5a78ff" },
              { icon: "◉", label: "Stock Inventory", color: "#82e05a" },
              { icon: "◆", label: "Enterprise Ready", color: "#a78bfa" },
            ].map((f, i) => (
              <motion.div
                key={f.label}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
                style={{ background: `${f.color}12`, border: `1px solid ${f.color}28` }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                whileHover={{ x: 4 }}
              >
                <span className="text-base" style={{ color: f.color }}>{f.icon}</span>
                <span className="font-orbitron font-bold text-xs" style={{ color: f.color }}>{f.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <p className="absolute bottom-5 font-orbitron text-[10px] tracking-widest" style={{ color: "rgba(255,255,255,0.12)" }}>
          EFIQ ONE — v2.0
        </p>
      </div>

      {/* ══ RIGHT PANEL — Form ══ */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 pt-24 lg:pt-32 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #111116 0%, #0c0c0f 100%)" }}
      >
        {/* Subtle grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.022] pointer-events-none">
          <defs>
            <pattern id="sg2" width="44" height="44" patternUnits="userSpaceOnUse">
              <path d="M 44 0 L 0 0 0 44" fill="none" stroke="#5a78ff" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sg2)" />
        </svg>

        {/* Glow blob */}
        <motion.div className="absolute pointer-events-none rounded-full"
          style={{ width: 300, height: 300, bottom: "10%", left: "-5%", background: "radial-gradient(circle, rgba(130,224,90,0.08) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Mobile logo */}
        <div className="lg:hidden mb-6">
          <EfiqLogo size={40} isTyping={isTyping} />
        </div>

        <motion.div
          variants={formVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md relative z-10"
          style={{ perspective: 1200 }}
        >
          {/* 3D Card Container responding to typing */}
          <motion.div
            animate={isTyping ? { rotateX: 4, rotateY: -2, scale: 0.98 } : { rotateX: 0, rotateY: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Deepest 3D Shadow/Base layer */}
            <div 
              className="absolute inset-0 rounded-[2.5rem] bg-zinc-300 translate-y-4 -translate-x-1 -z-20"
              style={{ boxShadow: "0 30px 60px rgba(0,0,0,0.3)" }}
            />
            {/* Mid 3D layer */}
            <div 
              className="absolute inset-0 rounded-[2.5rem] bg-zinc-200 translate-y-2 -translate-x-0.5 -z-10"
            />
            
            {/* Main Card Surface */}
            <div
              className="rounded-[2.5rem] p-7 sm:p-9 bg-white relative z-10"
              style={{
                border: "2px solid #82e05a",
                boxShadow: "inset 0 2px 0 0 rgba(255,255,255,1), 0 10px 20px rgba(0,0,0,0.05)",
                transformStyle: "preserve-3d",
              }}
            >
            {/* Top accent line */}
            <div className="h-px mb-7 rounded-full" style={{ background: "linear-gradient(90deg, transparent, #5a78ff, #82e05a, transparent)" }} />

            {/* Header */}
            <motion.div variants={itemVariants} className="mb-6">
              <h1 className="font-orbitron font-bold text-2xl sm:text-3xl text-zinc-900 tracking-tight mb-1">
                Create Account
              </h1>
              <p className="text-sm" style={{ color: "#52525b" }}>Start your EFIQ ONE journey today.</p>
            </motion.div>

            <form className="space-y-4" onSubmit={handleSignUp} noValidate>
              {/* Name */}
              <motion.div variants={itemVariants} className="space-y-1.5" style={{ transformStyle: "preserve-3d" }}>
                <label className="block text-xs font-bold tracking-widest uppercase" style={{ color: "#52525b" }}>Full Name</label>
                <motion.div 
                  className="relative group rounded-xl"
                  animate={isTyping ? { z: 20, scale: 1.03, boxShadow: "0 15px 35px rgba(90,120,255,0.15)" } : { z: 0, scale: 1, boxShadow: "none" }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10" style={{ color: "#71717a" }}><User className="w-4 h-4" /></div>
                  <input id="name" type="text" placeholder="Jane Doe" value={name || ""} onChange={handleTyping(setName, 'name')} required
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-medium transition-all focus:outline-none relative z-0"
                    style={{ background: "#f4f4f5", border: validationErrors.name ? "1px solid #ef4444" : "1px solid #e4e4e7", color: "#18181b" }}
                    onFocus={e => { e.target.style.border = validationErrors.name ? "1px solid #ef4444" : "1px solid rgba(90,120,255,0.5)"; e.target.style.background = "#ffffff"; }}
                    onBlur={e => { e.target.style.border = validationErrors.name ? "1px solid #ef4444" : "1px solid #e4e4e7"; e.target.style.background = "#f4f4f5"; }}
                  />
                </motion.div>
              </motion.div>

              {/* Email */}
              <motion.div variants={itemVariants} className="space-y-1.5" style={{ transformStyle: "preserve-3d" }}>
                <label className="block text-xs font-bold tracking-widest uppercase" style={{ color: "#52525b" }}>Organisation Email</label>
                <motion.div 
                  className="relative group rounded-xl"
                  animate={isTyping ? { z: 20, scale: 1.03, boxShadow: "0 15px 35px rgba(90,120,255,0.15)" } : { z: 0, scale: 1, boxShadow: "none" }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10" style={{ color: "#71717a" }}><Mail className="w-4 h-4" /></div>
                  <input id="email" type="email" placeholder="you@company.com" value={email || ""} onChange={handleTyping(setEmail, 'email')} required
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-medium transition-all focus:outline-none relative z-0"
                    style={{ background: "#f4f4f5", border: validationErrors.email ? "1px solid #ef4444" : "1px solid #e4e4e7", color: "#18181b" }}
                    onFocus={e => { e.target.style.border = validationErrors.email ? "1px solid #ef4444" : "1px solid rgba(90,120,255,0.5)"; e.target.style.background = "#ffffff"; }}
                    onBlur={e => { e.target.style.border = validationErrors.email ? "1px solid #ef4444" : "1px solid #e4e4e7"; e.target.style.background = "#f4f4f5"; }}
                  />
                </motion.div>
              </motion.div>

              {/* Org Name */}
              <motion.div variants={itemVariants} className="space-y-1.5" style={{ transformStyle: "preserve-3d" }}>
                <label className="block text-xs font-bold tracking-widest uppercase" style={{ color: "#52525b" }}>Organisation Name</label>
                <motion.div 
                  className="relative group rounded-xl"
                  animate={isTyping ? { z: 20, scale: 1.03, boxShadow: "0 15px 35px rgba(90,120,255,0.15)" } : { z: 0, scale: 1, boxShadow: "none" }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10" style={{ color: "#71717a" }}><Building2 className="w-4 h-4" /></div>
                  <input id="org" type="text" placeholder="Acme Corp" value={org || ""} onChange={handleTyping(setOrg, 'org')} required
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-medium transition-all focus:outline-none relative z-0"
                    style={{ background: "#f4f4f5", border: validationErrors.org ? "1px solid #ef4444" : "1px solid #e4e4e7", color: "#18181b" }}
                    onFocus={e => { e.target.style.border = validationErrors.org ? "1px solid #ef4444" : "1px solid rgba(90,120,255,0.5)"; e.target.style.background = "#ffffff"; }}
                    onBlur={e => { e.target.style.border = validationErrors.org ? "1px solid #ef4444" : "1px solid #e4e4e7"; e.target.style.background = "#f4f4f5"; }}
                  />
                </motion.div>
              </motion.div>

              {/* Password */}
              <motion.div variants={itemVariants} className="space-y-1.5" style={{ transformStyle: "preserve-3d" }}>
                <label htmlFor="pwd" className="block text-xs font-bold tracking-widest uppercase" style={{ color: "#52525b" }}>Password</label>
                <motion.div 
                  className="relative rounded-xl"
                  animate={isTyping ? { z: 20, scale: 1.03, boxShadow: "0 15px 35px rgba(90,120,255,0.15)" } : { z: 0, scale: 1, boxShadow: "none" }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10" style={{ color: "#71717a" }}>
                    <Lock className="w-4 h-4" />
                  </div>
                  <input id="pwd" type={showPwd ? "text" : "password"} placeholder="Create a password"
                    value={pwd || ""} onChange={handleTyping(setPwd, 'pwd')} required
                    className="w-full pl-10 pr-11 py-3 rounded-xl text-sm font-medium transition-all focus:outline-none relative z-0"
                    style={{ background: "#f4f4f5", border: validationErrors.pwd ? "1px solid #ef4444" : "1px solid #e4e4e7", color: "#18181b" }}
                    onFocus={e => { e.target.style.border = validationErrors.pwd ? "1px solid #ef4444" : "1px solid rgba(90,120,255,0.5)"; e.target.style.background = "#ffffff"; }}
                    onBlur={e => { e.target.style.border = validationErrors.pwd ? "1px solid #ef4444" : "1px solid #e4e4e7"; e.target.style.background = "#f4f4f5"; }}
                  />
                  <button type="button" onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3.5 inset-y-0 flex items-center transition-colors z-10"
                    style={{ color: "#71717a" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#82e05a"}
                    onMouseLeave={e => e.currentTarget.style.color = "#71717a"}
                  >
                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </motion.div>
              </motion.div>

              {/* Re-enter Password */}
              <motion.div variants={itemVariants} className="space-y-1.5" style={{ transformStyle: "preserve-3d" }}>
                <label htmlFor="cpwd" className="block text-xs font-bold tracking-widest uppercase" style={{ color: "#52525b" }}>Confirm Password</label>
                <motion.div 
                  className="relative rounded-xl"
                  animate={isTyping ? { z: 20, scale: 1.03, boxShadow: "0 15px 35px rgba(90,120,255,0.15)" } : { z: 0, scale: 1, boxShadow: "none" }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10" style={{ color: "#71717a" }}>
                    <Lock className="w-4 h-4" />
                  </div>
                  <input id="cpwd" type={showCPwd ? "text" : "password"} placeholder="Confirm your password"
                    value={cpwd || ""} onChange={handleTyping(setCpwd, 'cpwd')} required
                    className="w-full pl-10 pr-11 py-3 rounded-xl text-sm font-medium transition-all focus:outline-none relative z-0"
                    style={{ background: "#f4f4f5", border: validationErrors.cpwd ? "1px solid #ef4444" : "1px solid #e4e4e7", color: "#18181b" }}
                    onFocus={e => { e.target.style.border = validationErrors.cpwd ? "1px solid #ef4444" : "1px solid rgba(90,120,255,0.5)"; e.target.style.background = "#ffffff"; }}
                    onBlur={e => { e.target.style.border = validationErrors.cpwd ? "1px solid #ef4444" : "1px solid #e4e4e7"; e.target.style.background = "#f4f4f5"; }}
                  />
                  <button type="button" onClick={() => setShowCPwd(!showCPwd)}
                    className="absolute right-3.5 inset-y-0 flex items-center transition-colors z-10"
                    style={{ color: "#71717a" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#82e05a"}
                    onMouseLeave={e => e.currentTarget.style.color = "#71717a"}
                  >
                    {showCPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </motion.div>
              </motion.div>

              {/* Terms */}
              <motion.div variants={itemVariants} className="flex items-start gap-3 pt-1">
                <div className="mt-0.5 relative flex-shrink-0">
                  <input 
                    id="terms" 
                    type="checkbox" 
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="w-4 h-4 rounded cursor-pointer" 
                    style={{ accentColor: "#82e05a" }} 
                  />
                </div>
                <label htmlFor="terms" className="text-xs cursor-pointer leading-relaxed" style={{ color: "#52525b" }}>
                  By signing up I agree to the{" "}
                  <Link href="/terms" style={{ color: "#82e05a" }} className="font-bold hover:underline">Terms</Link>
                  {" "}and{" "}
                  <Link href="/privacy" style={{ color: "#82e05a" }} className="font-bold hover:underline">Privacy Policy</Link>
                </label>
              </motion.div>

              {/* Error */}
              {error && (
                <p className="text-xs font-bold text-center" style={{ color: "#f87171" }}>{error}</p>
              )}

              {/* ── Sign Up Button — matches home page demo button ── */}
              <motion.div variants={itemVariants} className="pt-2">
                <motion.button
                  type="submit"
                  data-magnetic
                  data-cursor-focus
                  disabled={!acceptedTerms}
                  whileHover={acceptedTerms ? { scale: 1.03 } : {}}
                  whileTap={acceptedTerms ? { scale: 0.97 } : {}}
                  className={`w-full inline-flex items-center justify-center gap-2 py-4 font-orbitron font-bold text-black border-2 border-black rounded-full transition-all duration-300 focus:ring-2 focus:ring-brand-green focus:ring-offset-2 text-base tracking-widest ${
                    !acceptedTerms ? 'opacity-40 cursor-not-allowed bg-zinc-400 grayscale' : 'bg-brand-green hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'
                  }`}
                  style={{ 
                    boxShadow: acceptedTerms ? "0 0 20px rgba(130,224,90,0.3)" : "none", 
                    transformStyle: "preserve-3d" 
                  }}
                >
                  Sign Up
                  <motion.span
                    className="inline-block"
                    initial={{ x: 0 }}
                    animate={acceptedTerms ? { x: [0, 4, 0] } : {}}
                    transition={{ repeat: acceptedTerms ? Infinity : 0, duration: 1.5, delay: 1 }}
                  >
                    →
                  </motion.span>
                </motion.button>
              </motion.div>

           

              {/* Already have account */}
              <motion.div variants={itemVariants} className="text-center pt-1">
                <Link href="/registration/login"
                  className="text-xs font-bold transition-colors"
                  style={{ color: "#52525b" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#5a78ff"}
                  onMouseLeave={e => e.currentTarget.style.color = "#52525b"}
                >
                  Already have an account?{" "}
                  <span style={{ color: "#5a78ff" }}>Log In →</span>
                </Link>
              </motion.div>
            </form>

            {/* Bottom accent */}
            <div className="h-px mt-6 rounded-full" style={{ background: "linear-gradient(90deg, transparent, rgba(130,224,90,0.2), transparent)" }} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}