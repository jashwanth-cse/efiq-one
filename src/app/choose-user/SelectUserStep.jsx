"use client";

import { motion } from "motion/react";

export default function SelectUserStep({ users, setUsers, onNext }) {
    const handleIncrement = () => setUsers((prev) => (prev || 0) + 1);
    const handleDecrement = () => setUsers((prev) => Math.max(1, (prev || 0) - 1));

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center gap-12 w-full max-w-md mt-10"
        >
            {/* Input Row */}
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-12 w-full">
                <label htmlFor="user-count" className="text-xl sm:text-2xl font-bold text-black text-center sm:text-left whitespace-nowrap">
                    Enter the number of users
                </label>

                <div className="relative">
                    <input
                        id="user-count"
                        type="text"
                        inputMode="numeric"
                        min="1"
                        value={users}
                        onChange={(e) => {
                            let val = e.target.value.replace(/\D/g, "");
                            val = val.replace(/^0+/, "");
                            setUsers(val === "" ? "" : parseInt(val, 10));
                        }}
                        className="w-28 sm:w-36 px-4 py-2 border border-gray-300 rounded-xl text-center text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green bg-gray-50/50"
                    />
                    {/* Custom Up/Down Arrows as requested by design */}
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col text-gray-500">
                        <button onClick={handleIncrement} type="button" className="p-1 hover:text-black transition-colors focus:outline-none" aria-label="Increase users">
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-[-2px]">
                                <path d="M1 5L5 1L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button onClick={handleDecrement} type="button" className="p-1 hover:text-black transition-colors focus:outline-none" aria-label="Decrease users">
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-[-2px]">
                                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <motion.button
                onClick={onNext}
                disabled={!users}
                whileHover={users ? { scale: 1.05 } : {}}
                whileTap={users ? { scale: 0.95 } : {}}
                className="mt-6 px-12 py-3 rounded-xl bg-brand-green text-black font-bold text-sm sm:text-base border border-black shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-sm disabled:active:translate-x-0 disabled:active:translate-y-0 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-300"
            >
                Submit
            </motion.button>
        </motion.div>
    );
}
