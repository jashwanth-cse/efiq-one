"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { User, Mail, Building2, ChevronLeft } from "lucide-react";

export default function AccountPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If auth state is loaded and no user, kick to login
    if (user === false) {
      router.replace("/registration/login");
    }
  }, [user, router]);

  // If still loading (user is null) or not authorized
  // Wait, AuthContext sets false when logged out. user = null is checking.
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0c0c0f]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-[#5a78ff] border-t-transparent animate-spin" />
          <p className="text-zinc-400 font-orbitron text-sm uppercase tracking-widest">Checking access...</p>
        </div>
      </div>
    );
  }

  // user.user_metadata comes from Supabase containing full_name, organisation_name
  const { full_name, organisation_name } = user.user_metadata || {};

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 flex flex-col items-center bg-[#0c0c0f] font-manrope text-white selection:bg-[#5a78ff] selection:text-white">
      {/* Background decorations */}
      <div className="absolute top-0 inset-x-0 h-96 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% -20%, rgba(90,120,255,0.15), transparent 70%)" }}
      />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-20"
        style={{ background: "#5a78ff", mixBlendMode: "screen" }}
      />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-10"
        style={{ background: "#82e05a", mixBlendMode: "screen" }}
      />

      <div className="w-full max-w-2xl relative z-10">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-[2rem] overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(24,24,27,0.8) 0%, rgba(15,15,18,0.8) 100%)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(90,120,255,0.3)",
            boxShadow: "0 0 40px rgba(90,120,255,0.1), 0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          {/* Top Line */}
          <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #5a78ff, #82e05a)" }} />
          
          <div className="px-8 py-10 sm:px-12 sm:py-14 flex flex-col items-center text-center">
            
            {/* Avatar section */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
              className="relative w-28 h-28 rounded-full mb-6 flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(90,120,255,0.15), rgba(130,224,90,0.15))",
                border: "2px solid rgba(90,120,255,0.5)",
                boxShadow: "0 0 30px rgba(90,120,255,0.2), inset 0 0 20px rgba(90,120,255,0.1)"
              }}
            >
              <User className="w-12 h-12 text-[#5a78ff]" />
              
              {/* Online Indicator */}
              <div className="absolute bottom-1 right-2 w-5 h-5 rounded-full flex items-center justify-center bg-[#0f0f12]">
                <div className="w-3 h-3 rounded-full bg-[#82e05a]" style={{ boxShadow: "0 0 10px #82e05a" }} />
              </div>
            </motion.div>

            <h1 className="font-orbitron font-bold text-3xl text-white tracking-wide mb-2">
              My Profile
            </h1>
            <p className="text-zinc-400 text-sm mb-10 max-w-sm">
              Manage your personal information and preferences for your EFIQ ONE workspace.
            </p>

            {/* User Details Grid */}
            <div className="w-full grid gap-4">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#5a78ff]/40 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#5a78ff]/10 flex items-center justify-center shrink-0 border border-[#5a78ff]/20 group-hover:bg-[#5a78ff]/20 transition-colors">
                  <User className="w-5 h-5 text-[#5a78ff]" />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="text-xs font-bold tracking-widest text-zinc-500 uppercase mb-0.5">Full Name</p>
                  <p className="font-medium text-white truncate text-lg">{full_name || "N/A"}</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#82e05a]/40 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#82e05a]/10 flex items-center justify-center shrink-0 border border-[#82e05a]/20 group-hover:bg-[#82e05a]/20 transition-colors">
                  <Mail className="w-5 h-5 text-[#82e05a]" />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="text-xs font-bold tracking-widest text-zinc-500 uppercase mb-0.5">Organisation Email</p>
                  <p className="font-medium text-white truncate text-lg">{user.email}</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#a78bfa]/40 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#a78bfa]/10 flex items-center justify-center shrink-0 border border-[#a78bfa]/20 group-hover:bg-[#a78bfa]/20 transition-colors">
                  <Building2 className="w-5 h-5 text-[#a78bfa]" />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="text-xs font-bold tracking-widest text-zinc-500 uppercase mb-0.5">Organisation Name</p>
                  <p className="font-medium text-white truncate text-lg">{organisation_name || "N/A"}</p>
                </div>
              </motion.div>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
