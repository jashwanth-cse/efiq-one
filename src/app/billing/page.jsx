"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "@/context/AuthContext";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const FIELDS = [
    { id: "name", label: "Contact Name", type: "text", placeholder: "e.g., John Doe", fullWidth: false },
    { id: "orgEmail", label: "Organization Email", type: "email", placeholder: "billing@company.com", fullWidth: false },
    { id: "orgName", label: "Organization Name", type: "text", placeholder: "Your Company Ltd.", fullWidth: true },
    { id: "street", label: "Street Address", type: "text", placeholder: "Suite 100, 123 Business St", fullWidth: true },
    { id: "city", label: "City", type: "text", placeholder: "New York", fullWidth: false },
    { id: "state", label: "State / Province", type: "text", placeholder: "NY", fullWidth: false },
    { id: "country", label: "Country", type: "text", placeholder: "United States", fullWidth: false },
    { id: "zipCode", label: "Zip / Postal Code", type: "text", placeholder: "10001", fullWidth: false },
    { id: "mobileNo", label: "Mobile No", type: "tel", placeholder: "+1 (555) 000-0000", fullWidth: false },
    { id: "taxId", label: "Tax ID (Optional)", type: "text", placeholder: "XX-XXXXXXX", fullWidth: false },
];

export default function BillingPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [form, setForm] = useState(
        Object.fromEntries(FIELDS.map((f) => [f.id, ""]))
    );
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [activeField, setActiveField] = useState(null);

    useEffect(() => {
        if (user === false) {
            router.replace("/registration/login");
        }
    }, [user, router]);

    // Show spinner while checking auth
    if (!user) {
        return (
            <div className="min-h-[100dvh] flex items-center justify-center bg-[#0c0c0f]">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-8 h-8 rounded-full border-2 border-[#5a78ff] border-t-transparent animate-spin" />
                  <p className="text-zinc-400 font-orbitron text-sm uppercase tracking-widest">Checking access...</p>
                </div>
            </div>
        );
    }

    const handleChange = (id, value) => {
        setForm((prev) => ({ ...prev, [id]: value }));
        if (errors[id]) {
            setErrors((prev) => ({ ...prev, [id]: "" }));
        }
    };

    const validate = () => {
        const newErrors = {};
        FIELDS.forEach(({ id, label, type }) => {
            if (id === "taxId") return; // optional
            if (!form[id].trim()) {
                newErrors[id] = `${label} is required`;
            } else if (type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form[id])) {
                newErrors[id] = "Enter a valid email address";
            }
        });
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            
            // Auto scroll to first error
            const firstErrorId = Object.keys(validationErrors)[0];
            const element = document.getElementById(firstErrorId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                element.focus();
            }
            return;
        }
        setSubmitting(true);
        // Simulate async submit — replace with real DB call
        await new Promise((r) => setTimeout(r, 1200));
        setSubmitting(false);
        router.push("/account");
    };

    return (
        <section className="min-h-[100dvh] bg-[#0c0c0f] text-white font-manrope selection:bg-[#5a78ff] selection:text-white pb-24 overflow-hidden relative">
            
            {/* Background elements */}
            <div className="absolute top-0 inset-x-0 h-96 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% -20%, rgba(90,120,255,0.1), transparent 70%)" }} />
            <motion.div 
                className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20 blur-[100px]"
                style={{ background: "#5a78ff", mixBlendMode: "screen" }}
                animate={{ x: [-50, 50, -50], y: [0, 50, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
                className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-10 blur-[100px]"
                style={{ background: "#82e05a", mixBlendMode: "screen" }}
                animate={{ x: [50, -50, 50], y: [0, -50, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="max-w-4xl mx-auto px-6 pt-28 sm:pt-36 relative z-10">
                
                {/* Back Link */}
                <div className="mb-8">
                  <Link href="/account" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-white transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                    Back to Profile
                  </Link>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-[2.5rem] overflow-hidden relative"
                    style={{
                        background: "linear-gradient(135deg, rgba(24,24,27,0.7) 0%, rgba(15,15,18,0.7) 100%)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        boxShadow: "0 0 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
                    }}
                >
                    {/* Top gradient border */}
                    <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #5a78ff, #82e05a)" }} />
                    
                    <div className="p-8 sm:p-12 md:p-16">
                        <div className="max-w-2xl text-center mx-auto mb-12">
                            <motion.div 
                                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 relative"
                                style={{ background: "rgba(90,120,255,0.1)", border: "1px solid rgba(90,120,255,0.2)" }}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2, type: "spring" }}
                            >
                                <svg className="w-8 h-8 text-[#5a78ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                                {/* Outer glow */}
                                <div className="absolute inset-0 rounded-2xl animate-pulse" style={{ boxShadow: "0 0 20px rgba(90,120,255,0.4)" }} />
                            </motion.div>
                            
                            <h1 className="font-orbitron font-bold text-3xl md:text-4xl text-white mb-4 tracking-tight">
                                Billing Address
                            </h1>
                            <p className="text-zinc-400 leading-relaxed font-manrope">
                                Please provide your official billing details. These will be used for your invoices and tax calculation on the EFIQ ONE platform.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} noValidate className="space-y-8">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                                {FIELDS.map(({ id, label, type, placeholder, fullWidth }, index) => {
                                    const isError = !!errors[id];
                                    const isActive = activeField === id;
                                    
                                    return (
                                        <motion.div 
                                            key={id} 
                                            className={`flex flex-col relative ${fullWidth ? 'md:col-span-2' : 'col-span-1'}`}
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 + (index * 0.05), duration: 0.5 }}
                                        >
                                            <div className="flex justify-between items-center mb-1.5 px-1">
                                                <label htmlFor={id} className="text-xs font-bold tracking-widest uppercase text-zinc-400">
                                                    {label} {id !== "taxId" && <span className="text-[#82e05a]">*</span>}
                                                </label>
                                            </div>
                                            
                                            <div 
                                                className="relative group rounded-xl transition-all duration-300"
                                                style={{ 
                                                    padding: '1px', 
                                                    background: isError ? "linear-gradient(135deg, #ef4444, #b91c1c)" 
                                                                : isActive ? "linear-gradient(135deg, #5a78ff, #82e05a)" 
                                                                : "rgba(255,255,255,0.1)",
                                                    boxShadow: isActive ? "0 10px 30px -10px rgba(90,120,255,0.4)" : "none",
                                                }}
                                            >
                                                <input
                                                    id={id}
                                                    type={type}
                                                    value={form[id]}
                                                    placeholder={placeholder}
                                                    onChange={(e) => handleChange(id, e.target.value)}
                                                    onFocus={() => setActiveField(id)}
                                                    onBlur={() => setActiveField(null)}
                                                    className="w-full px-5 py-4 rounded-[11px] font-medium text-[15px] transition-colors focus:outline-none"
                                                    style={{ 
                                                        background: isActive ? "#18181b" : "#0f0f12", 
                                                        color: "#ffffff"
                                                    }}
                                                />
                                            </div>
                                            
                                            {/* Error Message */}
                                            <AnimatePresence>
                                                {isError && (
                                                    <motion.div 
                                                        initial={{ opacity: 0, height: 0, y: -5 }}
                                                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                                                        exit={{ opacity: 0, height: 0, y: -5 }}
                                                        className="text-[#ef4444] text-xs font-bold tracking-wide mt-2 px-1 flex items-center gap-1.5"
                                                    >
                                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                        </svg>
                                                        {errors[id]}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Global Error Banner (Optional, if validation errors exist) */}
                            <AnimatePresence>
                                {Object.keys(errors).length > 0 && (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="p-4 rounded-xl flex items-start gap-4"
                                        style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
                                    >
                                        <div className="w-8 h-8 rounded-full bg-[#ef4444]/20 flex items-center justify-center shrink-0">
                                            <span className="text-[#ef4444] font-orbitron font-bold text-lg">!</span>
                                        </div>
                                        <div>
                                            <h4 className="text-[#ef4444] font-orbitron font-bold text-sm mb-1">Incomplete Form</h4>
                                            <p className="text-zinc-300 text-xs leading-relaxed font-manrope">Please review the highlighted fields above and correct the errors before saving your billing address.</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Divider */}
                            <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)" }} />

                            {/* Submit Section */}
                            <motion.div 
                                className="flex flex-col items-center pt-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                            >
                                <motion.button
                                    type="submit"
                                    disabled={submitting}
                                    whileHover={!submitting ? { scale: 1.03 } : {}}
                                    whileTap={!submitting ? { scale: 0.97 } : {}}
                                    className="relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 font-orbitron font-bold text-black bg-[#82e05a] rounded-full transition-all focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed text-sm tracking-widest"
                                    style={{ 
                                        boxShadow: submitting ? "none" : "0 0 30px rgba(130,224,90,0.3), inset 0 2px 0 rgba(255,255,255,0.5)",
                                    }}
                                >
                                    {submitting ? (
                                        <span className="flex items-center gap-3">
                                            <svg className="animate-spin h-5 w-5 text-black" viewBox="0 0 24 24" fill="none">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                            </svg>
                                            SAVING DETAILS...
                                        </span>
                                    ) : (
                                        <>
                                            SAVE BILLING DETAILS
                                            <motion.span
                                                className="inline-block"
                                                initial={{ x: 0 }}
                                                whileHover={{ x: 5 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                →
                                            </motion.span>
                                        </>
                                    )}
                                </motion.button>
                                
                                <p className="text-center font-manrope text-xs text-zinc-500 mt-6 max-w-sm">
                                    Your data is encrypted and stored securely. We never share your billing details with third parties.
                                </p>
                            </motion.div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
