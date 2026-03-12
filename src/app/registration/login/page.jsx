"use client";

import { useState, useRef, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { signIn } from "../../../../lib/auth";

/* ── Animation variants ── */
const formVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 18, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 280, damping: 22 },
  },
};

/* ── 3-D tilt card hook ── */
function use3DTilt() {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 180, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 180, damping: 22 });

  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return { ref, rotateX, rotateY, onMove, onLeave };
}

/* ── EFIQ One Logo SVG ── */
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

/* ── Floating geometric decoration ── */
function GeoDot({ x, y, size, color, delay }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: color }}
      animate={{ y: [0, -18, 0], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

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

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSuccessLoading, setIsSuccessLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
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

  const { ref: tiltRef, rotateX: tiltRotateX, rotateY: tiltRotateY, onMove: tiltOnMove, onLeave: tiltOnLeave } = use3DTilt();
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setValidationErrors({});

    // Manual Validation
    if (!email.trim() || !password) {
      setError("All fields are required");
      const errs = {};
      if (!email.trim()) errs.email = true;
      if (!password) errs.password = true;
      setValidationErrors(errs);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format");
      setValidationErrors({ email: true });
      return;
    }
    
    const { data, error: signInError } = await signIn({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      return;
    }
    
    // Trigger cinematic success loading screen
    setIsSuccessLoading(true);
    setTimeout(() => {
      router.push("/");
    }, 2500);
  };

  return (
    <div className="min-h-[100dvh] flex font-manrope overflow-hidden text-zinc-900" style={{ background: "#0c0c0f" }}>
      
      {/* Loading Overlay */}
      <SuccessOverlay 
        show={isSuccessLoading} 
        title="Welcome Back to EFIQ One" 
        subtitle="Authenticating and preparing your intelligent workspace" 
      />

      {/* ── LEFT PANEL: Branding 3D ── */}
      <div 
        ref={tiltRef}
        className="hidden lg:flex lg:w-[52%] relative flex-col items-center justify-center p-12 overflow-hidden" 
        style={{ perspective: 1200 }}
      >
        {/* Background gradient blobs */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{ width: 500, height: 500, top: "-10%", left: "-10%", background: "radial-gradient(circle, rgba(90,120,255,0.18) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{ width: 400, height: 400, bottom: "-5%", right: "-5%", background: "radial-gradient(circle, rgba(130,224,90,0.12) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, -60, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />

        {/* Animated grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#82e05a" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* 3D Container responsive to mouse */}
        <motion.div
          className="relative z-10 flex flex-col items-center w-full max-w-lg mt-[-8%]"
          style={{ rotateX: tiltRotateX, rotateY: tiltRotateY, transformStyle: "preserve-3d" }}
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo with 3D Z-translation */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
            style={{ translateZ: 50 }}
          >
            <EfiqLogo size={64} isTyping={isTyping} />
          </motion.div>

          {/* Floating Geo Dots */}
          <GeoDot x="10%" y="20%" size={8} color="#5a78ff" delay={0} />
          <GeoDot x="85%" y="15%" size={12} color="#82e05a" delay={0.8} />
          <GeoDot x="80%" y="80%" size={6} color="#5a78ff" delay={1.2} />
          <GeoDot x="15%" y="75%" size={10} color="#82e05a" delay={0.4} />

          {/* Orbiting rings adding depth */}
          <OrbitRing radius={170} duration={20} dotColor="#5a78ff" dotSize={4} />
          <OrbitRing radius={240} duration={28} dotColor="#82e05a" dotSize={6} reverse />
          <OrbitRing radius={310} duration={35} dotColor="#ffffff" dotSize={3} />

          <motion.div
            className="text-center mt-6"
            style={{ translateZ: 30 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <h2 className="font-orbitron font-bold text-2xl text-white mb-2 tracking-wide">
              Welcome Back
            </h2>
            <p className="font-manrope text-sm" style={{ color: "#71717a" }}>
              Your business. Simplified. Streamlined.
            </p>
          </motion.div>

          {/* Animated stat pills */}
          <div className="flex gap-4 mt-8" style={{ translateZ: 40 }}>
            {[
              { label: "Attendance", color: "#5a78ff" },
              { label: "Inventory", color: "#82e05a" },
            ].map((pill, i) => (
              <motion.div
                key={pill.label}
                className="px-4 py-1.5 rounded-full font-orbitron font-bold text-xs"
                style={{ background: `${pill.color}18`, border: `1px solid ${pill.color}40`, color: pill.color }}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
              >
                {pill.label}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom "version" watermark */}
        <p className="absolute bottom-6 font-orbitron text-[10px] tracking-widest" style={{ color: "rgba(255,255,255,0.15)" }}>
          EFIQ ONE — v2.0
        </p>
      </div>

      {/* ── RIGHT PANEL: Login Form ── */}
      <div
        className="flex-1 flex flex-col items-center justify-center px-6 py-12 pt-24 lg:pt-32 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #111116 0%, #0c0c0f 100%)" }}
      >
        {/* Subtle grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.025] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid2" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#5a78ff" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid2)" />
        </svg>

        {/* Glow blob */}
        <motion.div
          className="absolute pointer-events-none rounded-full"
          style={{ width: 320, height: 320, top: "20%", right: "-5%", background: "radial-gradient(circle, rgba(90,120,255,0.1) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Mobile logo (visible only on small screens) */}
        <div className="lg:hidden mb-8">
          <EfiqLogo size={44} isTyping={isTyping} />
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
              className="rounded-[2.5rem] p-8 sm:p-10 bg-white relative z-10"
              style={{
                border: "2px solid #82e05a",
                boxShadow: "inset 0 2px 0 0 rgba(255,255,255,1), 0 10px 20px rgba(0,0,0,0.05)",
                transformStyle: "preserve-3d",
              }}
            >
            {/* Top accent */}
            <div className="h-px mb-8 rounded-full" style={{ background: "linear-gradient(90deg, transparent, #5a78ff, #82e05a, transparent)" }} />

            {/* Header */}
            <motion.div variants={itemVariants} className="mb-8">
              <h1 className="font-orbitron font-bold text-3xl text-zinc-900 tracking-tight mb-1">Log In</h1>
              <p className="text-sm" style={{ color: "#52525b" }}>Welcome back! Please enter your details.</p>
            </motion.div>

            <form className="space-y-5" onSubmit={handleLogin} noValidate>
              {/* Email */}
              <motion.div variants={itemVariants} className="space-y-1.5" style={{ transformStyle: "preserve-3d" }}>
                <label className="block text-xs font-bold tracking-widest uppercase" style={{ color: "#52525b" }}>Email</label>
                <motion.div 
                  className="relative group rounded-xl"
                  animate={isTyping ? { z: 20, scale: 1.03, boxShadow: "0 15px 35px rgba(90,120,255,0.15)" } : { z: 0, scale: 1, boxShadow: "none" }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors z-10" style={{ color: "#71717a" }}>
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={email || ""}
                    onChange={handleTyping(setEmail, 'email')}
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl font-medium text-sm transition-all focus:outline-none relative z-0"
                    style={{ background: "#f4f4f5", border: validationErrors.email ? "1px solid #ef4444" : "1px solid #e4e4e7", color: "#18181b" }}
                    onFocus={e => { e.target.style.border = validationErrors.email ? "1px solid #ef4444" : "1px solid rgba(90,120,255,0.5)"; e.target.style.background = "#ffffff"; }}
                    onBlur={e => { e.target.style.border = validationErrors.email ? "1px solid #ef4444" : "1px solid #e4e4e7"; e.target.style.background = "#f4f4f5"; }}
                  />
                </motion.div>
              </motion.div>

              {/* Password */}
              <motion.div variants={itemVariants} className="space-y-1.5" style={{ transformStyle: "preserve-3d" }}>
                <label className="block text-xs font-bold tracking-widest uppercase" style={{ color: "#52525b" }}>Password</label>
                <motion.div 
                  className="relative rounded-xl"
                  animate={isTyping ? { z: 20, scale: 1.03, boxShadow: "0 15px 35px rgba(90,120,255,0.15)" } : { z: 0, scale: 1, boxShadow: "none" }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10" style={{ color: "#71717a" }}>
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password || ""}
                    onChange={handleTyping(setPassword, 'password')}
                    required
                    className="w-full pl-11 pr-12 py-3.5 rounded-xl font-medium text-sm transition-all focus:outline-none relative z-0"
                    style={{ background: "#f4f4f5", border: validationErrors.password ? "1px solid #ef4444" : "1px solid #e4e4e7", color: "#18181b" }}
                    onFocus={e => { e.target.style.border = validationErrors.password ? "1px solid #ef4444" : "1px solid rgba(90,120,255,0.5)"; e.target.style.background = "#ffffff"; }}
                    onBlur={e => { e.target.style.border = validationErrors.password ? "1px solid #ef4444" : "1px solid #e4e4e7"; e.target.style.background = "#f4f4f5"; }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 inset-y-0 flex items-center transition-colors z-10"
                    style={{ color: "#52525b" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#82e05a"}
                    onMouseLeave={e => e.currentTarget.style.color = "#52525b"}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </motion.div>
               {/* <div className="flex justify-end pt-1">
                <Link href="#" className="text-xs font-bold transition-colors" style={{ color: "#5a78ff" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#82e05a"}
                    onMouseLeave={e => e.currentTarget.style.color = "#5a78ff"}
                  >
                    Forgot Password?
                  </Link>
                </div> */}
              </motion.div>

              {/* Error */}
              {error && (
                <p className="text-xs font-bold text-center" style={{ color: "#f87171" }}>{error}</p>
              )}

              {/* Log In Button — same style as home demo button */}
              <motion.div variants={itemVariants} className="pt-2">
                <motion.button
                  type="submit"
                  data-magnetic
                  data-cursor-focus
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full inline-flex items-center justify-center gap-2 py-4 font-orbitron font-bold text-black border-2 border-black bg-brand-green rounded-full hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-300 focus:ring-2 focus:ring-brand-green focus:ring-offset-2 text-base tracking-widest"
                  style={{ boxShadow: "0 0 20px rgba(130,224,90,0.3)" }}
                >
                  Log In
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
            </form>

            {/* Divider */}
            <motion.div variants={itemVariants} className="my-6 flex items-center gap-4">
              <div className="h-px flex-grow" style={{ background: "rgba(0,0,0,0.1)" }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#a1a1aa" }}>or</span>
              <div className="h-px flex-grow" style={{ background: "rgba(0,0,0,0.1)" }} />
            </motion.div>

            {/* Sign Up Button */}
            <motion.div variants={itemVariants}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/registration/signup"
                  data-magnetic
                  className="flex justify-center items-center gap-2 w-full py-3.5 font-orbitron font-bold text-sm rounded-full tracking-widest transition-all duration-200"
                  style={{
                    background: "#0c0c0f",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "white"
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#18181b"; e.currentTarget.style.boxShadow = "0 0 16px rgba(0,0,0,0.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#0c0c0f"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  Create Account
                </Link>
              </motion.div>
            </motion.div>

            <div className="h-px mt-8 rounded-full" style={{ background: "linear-gradient(90deg, transparent, rgba(90,120,255,0.2), transparent)" }} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
