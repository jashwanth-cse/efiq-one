"use client";

import { useState } from "react";
import { motion } from "motion/react";


export default function OrgSetupPage() {
    const [orgName, setOrgName] = useState("");

    // Regex to only allow alphanumeric characters and hyphens for a valid URL slug
    const handleOrgNameChange = (e) => {
        const val = e.target.value.replace(/[^a-z0-9-]/gi, "").toLowerCase();
        setOrgName(val);
    };

    const displayUrl = `${orgName || "efiqsolutions"}.efiqone.com`;

    return (
        <>
            <main className="min-h-screen pt-32 pb-16 px-4 bg-background overflow-x-hidden font-orbitron flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-3xl flex flex-col items-center mt-12 sm:mt-24"
                >
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black uppercase tracking-wider mb-14 text-center">
                        ENTER A NAME FOR YOUR EFIQ ONE ORGANIZATION URL
                    </h1>

                    <div className="flex flex-col items-start w-full max-w-lg mb-16">

                        {/* Input Row */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full mb-4">
                            <input
                                type="text"
                                value={orgName}
                                onChange={handleOrgNameChange}
                                placeholder="efiqsolutions"
                                className="w-full sm:w-[280px] px-6 py-3 border border-gray-400 rounded-xl text-lg sm:text-xl font-bold text-gray-700 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green placeholder:text-gray-400 font-['Arial'] tracking-wide"
                            />
                            <span className="text-xl sm:text-2xl font-bold text-black font-['Arial']">
                                .efiqone.com
                            </span>
                        </div>

                        {/* URL Preview */}
                        <p className="text-black font-['Arial'] font-normal text-sm sm:text-base ml-2">
                            Your url is <span className="text-blue-400">{displayUrl}</span>
                        </p>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        disabled={!orgName}
                        whileHover={orgName ? { scale: 1.05 } : {}}
                        whileTap={orgName ? { scale: 0.95 } : {}}
                        className="px-14 py-3 rounded-xl bg-brand-green text-black font-bold text-base sm:text-lg border border-black shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-sm disabled:active:translate-x-0 disabled:active:translate-y-0 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-300"
                    >
                        Submit
                    </motion.button>
                </motion.div>
            </main>
            
        </>
    );
}
