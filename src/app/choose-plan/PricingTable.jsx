"use client";

import { useState } from "react";
import { motion } from "motion/react";

const plans = [
    {
        id: "startups",
        name: "Startups",
        desc: "Best for Startups",
        price: "10000/-",
        priceSuffix: "per user/month",
        featuresText: "",
    },
    {
        id: "business",
        name: "Business",
        desc: "Best for a mid number of employees",
        price: "25000/-",
        priceSuffix: "per user/month",
        featuresText: "",
    },
    {
        id: "enterprise",
        name: "Enterprise",
        desc: "Use for a Large number of employee",
        price: "",
        priceSuffix: "",
        featuresText: "customization the features based for the enterprise uses",
    }
];

export default function PricingTable() {
    const [isMonthly, setIsMonthly] = useState(false);

    return (
        <section className="w-full max-w-5xl flex flex-col items-end mb-24 px-4 font-orbitron">
            {/* Toggle Container */}
            <div className="flex items-center gap-3 mb-4 mr-0 sm:mr-8">
                <span className={`text-sm font-bold transition-colors ${!isMonthly ? "text-black" : "text-gray-500"}`}>
                    Yearly
                </span>

                <button
                    onClick={() => setIsMonthly(!isMonthly)}
                    className="relative w-12 h-6 rounded-full bg-brand-blue/90 flex items-center p-1 transition-colors hover:bg-brand-blue shadow-sm"
                    aria-label="Toggle billing period"
                >
                    <motion.div
                        className="w-4 h-4 rounded-full bg-white shadow-md"
                        animate={{ x: isMonthly ? 24 : 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                </button>

                <span className={`text-sm font-bold transition-colors ${isMonthly ? "text-black" : "text-gray-500"}`}>
                    Monthly
                </span>
            </div>

            {/* Pricing Table wrapper */}
            <div className="w-full border border-gray-300 rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-3 bg-white shadow-sm">

                {plans.map((plan, index) => (
                    <div
                        key={plan.id}
                        className={`flex flex-col relative
                            ${index !== plans.length - 1 ? "border-b md:border-b-0 md:border-r border-gray-300" : ""}
                        `}
                    >
                        {/* Header Area */}
                        <div className="text-center py-5 border-b border-gray-300">
                            <h2 className="text-xl md:text-2xl font-bold text-black">
                                {plan.name}
                            </h2>
                        </div>

                        <div className="text-center pt-5 px-6">
                            <p className="text-xs font-semibold text-black tracking-wide">
                                {plan.desc}
                            </p>
                        </div>

                        {/* Middle Content Area (Price or Text) */}
                        <div className="flex-grow flex flex-col justify-center items-center text-center min-h-[160px] px-8 py-8">
                            {plan.price ? (
                                <>
                                    <h3 className="text-3xl lg:text-4xl font-black text-black tracking-widest mb-1 shadow-black drop-shadow-sm">
                                        {plan.price}
                                    </h3>
                                    <p className="text-[10px] font-bold text-black">
                                        {plan.priceSuffix}
                                    </p>
                                </>
                            ) : (
                                <p className="text-sm font-bold text-black leading-snug px-2">
                                    {plan.featuresText}
                                </p>
                            )}
                        </div>

                        {/* Button Area */}
                        <div className="flex justify-center mt-auto pb-8 md:pb-10">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-2.5 rounded-full bg-brand-green text-black font-bold text-sm shadow-md transition-colors hover:bg-[#72cc4b]"
                            >
                                Interested
                            </motion.button>
                        </div>

                    </div>
                ))}

            </div>
        </section>
    );
}
