"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../../lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import { motion } from "motion/react";

export default function AuthCallbackPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState(null);

  useEffect(() => {
    // The supabase-js client automatically handles the hash/query parameters in the URL 
    // and establishes the session. We just need to wait for it and get the session.
    const handleAuthCallback = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        setError(sessionError.message);
        return;
      }

      if (session?.user) {
        // Sync the user with our local AuthContext if needed
        const { user } = session;
        const metadata = user.user_metadata || {};
        
        // Update the app's auth state
        login({
          name: metadata.full_name || user.email,
          email: user.email,
          org: metadata.organisation_name || "Enterprise",
        });

        // Redirect to dashboard (home)
        router.push("/");
      } else {
        // Wait a short moment for auth state to sync via event listener, just in case
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
          if (newSession?.user) {
            const metadata = newSession.user.user_metadata || {};
            login({
              name: metadata.full_name || newSession.user.email,
              email: newSession.user.email,
              org: metadata.organisation_name || "Enterprise",
            });
            router.push("/");
          } else if (event === "SIGNED_OUT") {
            setError("Authentication failed or expired. Please try again.");
          }
        });
        
        // Timeout just in case it's completely invalid
        setTimeout(() => {
          subscription?.unsubscribe();
          if (!error) {
             // Redirect gracefully to login if no session can be obtained
             router.push("/registration/login");
          }
        }, 5000);
      }
    };

    handleAuthCallback();
  }, [router, login, error]);

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center p-6 font-manrope bg-[#0c0c0f] text-white overflow-hidden relative" style={{ background: "linear-gradient(160deg, #111116 0%, #0c0c0f 100%)" }}>
        <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{ width: 400, height: 400, background: "radial-gradient(circle, rgba(90,120,255,0.15) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="relative z-10 text-center flex flex-col items-center">
        {error ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-8 bg-white rounded-3xl" style={{ border: "2px solid #ef4444" }}>
            <h2 className="text-xl font-orbitron font-bold text-red-500 mb-2">Authentication Error</h2>
            <p className="text-zinc-600 mb-6">{error}</p>
            <button onClick={() => router.push('/registration/login')} className="font-orbitron font-bold text-white bg-black px-6 py-3 rounded-full text-sm">Return to Login</button>
          </motion.div>
        ) : (
          <>
            <motion.div
              className="w-16 h-16 rounded-full mb-8 relative border-[2px] border-[#5a78ff]"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
            >
              <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-[#82e05a]" style={{ boxShadow: "0 0 10px #82e05a" }} />
            </motion.div>
            <h1 className="text-2xl font-orbitron font-bold mb-2 tracking-wider">Authenticating</h1>
            <p className="text-gray-400 font-manrope text-sm tracking-wide">Please wait while we log you in...</p>
          </>
        )}
      </div>
    </div>
  );
}
