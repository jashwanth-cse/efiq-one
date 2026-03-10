"use client";

import { useState, useRef } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

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
function EfiqLogo({ size = 56 }) {
  return (
    <div className="flex items-center gap-3">
      <svg viewBox="10 0 80 95" style={{ height: size, width: "auto" }} aria-hidden="true">
        <path d="M 10 48 L 10 70 A 25 25 0 0 0 35 95 L 65 95 A 25 25 0 0 0 90 70 L 90 48 L 65 48 L 65 70 L 35 70 L 35 48 Z" fill="#5a78ff" />
        <path d="M 90 48 L 90 25 A 25 25 0 0 0 65 0 L 10 0 L 35 25 L 65 25 L 65 48 Z" fill="#82e05a" />
      </svg>
      <div className="flex flex-col justify-center">
        <span className="font-orbitron font-bold text-[11px] tracking-[0.22em] text-white leading-none mb-0.5">EFIQ</span>
        <span className="font-orbitron font-black text-[26px] text-white leading-none tracking-tight">ONE</span>
      </div>
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

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const tilt = use3DTilt();
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    // Look up stored user
    const stored = localStorage.getItem("efiq_users");
    const users = stored ? JSON.parse(stored) : [];
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) {
      setError("Invalid email or password.");
      return;
    }
    login({ name: found.name, email: found.email, org: found.org });
    router.push("/");
  };

  return (
    <div className="min-h-[100dvh] flex font-manrope overflow-hidden" style={{ background: "#0c0c0f" }}>

      {/* ── LEFT PANEL: Branding 3D ── */}
      <div className="hidden lg:flex lg:w-[52%] relative flex-col items-center justify-center p-12 overflow-hidden">

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

        {/* Floating dots */}
        <GeoDot x="8%" y="15%" size={8} color="rgba(130,224,90,0.6)" delay={0} />
        <GeoDot x="85%" y="22%" size={5} color="rgba(90,120,255,0.8)" delay={1.2} />
        <GeoDot x="12%" y="75%" size={6} color="rgba(90,120,255,0.6)" delay={0.6} />
        <GeoDot x="78%" y="80%" size={9} color="rgba(130,224,90,0.5)" delay={2} />
        <GeoDot x="50%" y="9%" size={4} color="rgba(130,224,90,0.7)" delay={1.8} />

        {/* Corner brackets */}
        {[
          { top: "5%", left: "5%", rotate: "0deg" },
          { top: "5%", right: "5%", rotate: "90deg" },
          { bottom: "5%", left: "5%", rotate: "-90deg" },
          { bottom: "5%", right: "5%", rotate: "180deg" },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{ ...pos }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ transform: `rotate(${pos.rotate})` }}>
              <path d="M 0 20 L 0 0 L 20 0" stroke="#5a78ff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </motion.div>
        ))}

        {/* 3D Logo card */}
        <motion.div
          ref={tilt.ref}
          onMouseMove={tilt.onMove}
          onMouseLeave={tilt.onLeave}
          style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformPerspective: 900 }}
          className="relative z-10 flex flex-col items-center gap-8"
        >
          {/* Glowing logo container */}
          <motion.div
            className="relative p-8 rounded-3xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, rgba(90,120,255,0.12) 0%, rgba(130,224,90,0.08) 100%)",
              border: "1px solid rgba(90,120,255,0.3)",
              boxShadow: "0 0 60px rgba(90,120,255,0.15), 0 0 20px rgba(130,224,90,0.08)",
            }}
            animate={{ boxShadow: ["0 0 40px rgba(90,120,255,0.12)", "0 0 70px rgba(90,120,255,0.25)", "0 0 40px rgba(90,120,255,0.12)"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Top rainbow accent */}
            <div className="absolute top-0 left-8 right-8 h-px" style={{ background: "linear-gradient(90deg, transparent, #5a78ff, #82e05a, transparent)" }} />

            <motion.div
              animate={{ rotateY: [0, 5, 0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformPerspective: 600 }}
            >
              <EfiqLogo size={72} />
            </motion.div>

            <div className="absolute bottom-0 left-8 right-8 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(130,224,90,0.4), transparent)" }} />
          </motion.div>

          {/* Tagline */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 10 }}
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
          <div className="flex gap-4 mt-2">
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
        className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden"
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
          <EfiqLogo size={44} />
        </div>

        <motion.div
          variants={formVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md relative z-10"
        >
          {/* Card */}
          <div
            className="rounded-3xl p-8 sm:p-10"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
            }}
          >
            {/* Top accent */}
            <div className="h-px mb-8 rounded-full" style={{ background: "linear-gradient(90deg, transparent, #5a78ff, #82e05a, transparent)" }} />

            {/* Header */}
            <motion.div variants={itemVariants} className="mb-8">
              <h1 className="font-orbitron font-bold text-3xl text-white tracking-tight mb-1">Log In</h1>
              <p className="text-sm" style={{ color: "#71717a" }}>Welcome back! Please enter your details.</p>
            </motion.div>

            <form className="space-y-5" onSubmit={handleLogin}>
              {/* Email */}
              <motion.div variants={itemVariants} className="space-y-1.5">
                <label className="block text-xs font-bold tracking-widest uppercase" style={{ color: "#a1a1aa" }}>Email</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors" style={{ color: "#52525b" }}>
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={email || ""}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl font-medium text-sm transition-all focus:outline-none"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#e4e4e7" }}
                    onFocus={e => { e.target.style.border = "1px solid rgba(90,120,255,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(90,120,255,0.12)"; }}
                    onBlur={e => { e.target.style.border = "1px solid rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; }}
                  />
                </div>
              </motion.div>

              {/* Password */}
              <motion.div variants={itemVariants} className="space-y-1.5">
                <label className="block text-xs font-bold tracking-widest uppercase" style={{ color: "#a1a1aa" }}>Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none" style={{ color: "#52525b" }}>
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password || ""}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="w-full pl-11 pr-12 py-3.5 rounded-xl font-medium text-sm transition-all focus:outline-none"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#e4e4e7" }}
                    onFocus={e => { e.target.style.border = "1px solid rgba(90,120,255,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(90,120,255,0.12)"; }}
                    onBlur={e => { e.target.style.border = "1px solid rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 inset-y-0 flex items-center transition-colors"
                    style={{ color: "#52525b" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#82e05a"}
                    onMouseLeave={e => e.currentTarget.style.color = "#52525b"}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="flex justify-end pt-1">
                  <Link href="#" className="text-xs font-bold transition-colors" style={{ color: "#5a78ff" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#82e05a"}
                    onMouseLeave={e => e.currentTarget.style.color = "#5a78ff"}
                  >
                    Forgot Password?
                  </Link>
                </div>
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
              <div className="h-px flex-grow" style={{ background: "rgba(255,255,255,0.07)" }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#3f3f46" }}>or</span>
              <div className="h-px flex-grow" style={{ background: "rgba(255,255,255,0.07)" }} />
            </motion.div>

            {/* Sign Up Button */}
            <motion.div variants={itemVariants}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/registration/signup"
                  data-magnetic
                  className="flex justify-center items-center gap-2 w-full py-3.5 font-orbitron font-bold text-sm rounded-full tracking-widest transition-all duration-200"
                  style={{
                    background: "rgba(90,120,255,0.08)",
                    border: "1px solid rgba(90,120,255,0.3)",
                    color: "#5a78ff",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(90,120,255,0.15)";
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(90,120,255,0.2)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(90,120,255,0.08)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  Create Account
                </Link>
              </motion.div>
            </motion.div>

            {/* Bottom accent */}
            <div className="h-px mt-8 rounded-full" style={{ background: "linear-gradient(90deg, transparent, rgba(90,120,255,0.2), transparent)" }} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
