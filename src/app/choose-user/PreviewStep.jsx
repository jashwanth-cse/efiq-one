"use client";

import { useState } from "react";
import { motion } from "motion/react";

export default function PreviewStep({ users, setUsers, onBack }) {
    const [agreed, setAgreed] = useState(false);

    const handleIncrement = () => setUsers((prev) => (prev || 0) + 1);
    const handleDecrement = () => setUsers((prev) => Math.max(1, (prev || 0) - 1));

    // Scaling the amounts based on 60 users = 15500 / 1999 / 17500
    const numericUsers = users || 0;
    const baseAmount = Math.round(numericUsers * (15500 / 60));
    const gstAmount = Math.round(numericUsers * (1999 / 60));
    const totalAmount = Math.round(numericUsers * (17500 / 60));

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center w-full max-w-md pt-8"
        >
            <h1 className="text-2xl sm:text-3xl font-bold text-black uppercase tracking-wider mb-12 text-center">
                PREVIEW
            </h1>

            {/* Calculations Grid */}
            <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-6 items-center w-full mb-10 text-sm sm:text-base text-black font-['Arial'] font-normal tracking-wide">

                {/* Total Users Row */}
                <div className="text-right">Total Users</div>
                <div className="relative w-fit">
                    <input
                        type="text"
                        inputMode="numeric"
                        min="1"
                        value={users}
                        onChange={(e) => {
                            let val = e.target.value.replace(/\D/g, "");
                            val = val.replace(/^0+/, "");
                            setUsers(val === "" ? "" : parseInt(val, 10));
                        }}
                        className="w-24 sm:w-28 px-3 py-1.5 border border-gray-400 rounded-lg text-center font-bold text-gray-700 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green font-orbitron"
                    />
                    {/* Custom Up/Down Arrows */}
                    <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex flex-col text-gray-500">
                        <button onClick={handleIncrement} type="button" className="p-1 hover:text-black transition-colors focus:outline-none">
                            <svg width="8" height="5" viewBox="0 0 10 6" fill="none" className="mb-[-1px]">
                                <path d="M1 5L5 1L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button onClick={handleDecrement} type="button" className="p-1 hover:text-black transition-colors focus:outline-none">
                            <svg width="8" height="5" viewBox="0 0 10 6" fill="none" className="mt-[-1px]">
                                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Amounts Rows */}
                <div className="text-right">Total Amount per Month</div>
                <div>{baseAmount}/- (Excl of taxes)</div>

                <div className="text-right">GST</div>
                <div>{gstAmount}/-</div>

                <div className="text-right">Total Amount per Month</div>
                <div>{totalAmount}/-</div>

            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-3 mb-8 cursor-pointer" onClick={() => setAgreed(!agreed)}>
                <div className={`w-5 h-5 border border-gray-500 rounded flex items-center justify-center transition-colors ${agreed ? 'bg-black border-black' : 'bg-transparent'}`}>
                    {agreed && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    )}
                </div>
                <span className="font-['Arial'] font-bold text-black select-none text-sm sm:text-base tracking-wide">
                    I agree to proceed with this subscription
                </span>
            </div>

            {/* Proceed Button */}
            <motion.button
                disabled={!agreed}
                whileHover={agreed ? { scale: 1.05 } : {}}
                whileTap={agreed ? { scale: 0.95 } : {}}
                className="mt-2 px-10 py-3 rounded-xl bg-brand-green text-black font-bold text-sm sm:text-base border border-black shadow-sm disabled:opacity-50 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-300 disabled:cursor-not-allowed disabled:hover:shadow-sm disabled:hover:border-black disabled:active:translate-x-0 disabled:active:translate-y-0"
            >
                Proceed
            </motion.button>

            {/* Back Link */}
            <button
                onClick={onBack}
                className="mt-6 text-xs text-gray-500 hover:text-black underline transition-colors"
            >
                Back to User Selection
            </button>
        </motion.div>
    );
}
