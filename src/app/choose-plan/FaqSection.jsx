"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        question: "1. Is attendance tracking unlimited for all plans?",
        answer: "Yes. You can record unlimited check-ins and check-outs across all plans.",
    },
    {
        question: "2. Can employees use mobile and web to mark attendance?",
        answer: "Yes. Both mobile and desktop access are included in all paid plans.",
    },
    {
        question: "3. Does the pricing change based on the number of employees?",
        answer: "Plans are billed per user, so you only pay for the employees you add.",
    },
    {
        question: "4. Are leave management and shift scheduling included?",
        answer: "They are included in mid and higher-tier plans; basic attendance is part of all plans.",
    },
    {
        question: "5. Can I export attendance data for payroll?",
        answer: "Yes. You can export to Excel/PDF, and advanced plans offer automated insights for payroll.",
    },
];

function FaqItem({ faq, isOpen, onToggle }) {
    return (
        <div className="flex flex-col mb-4 bg-white rounded-lg p-2 transition-colors">
            <button
                type="button"
                onClick={onToggle}
                className="flex items-start md:items-center text-left gap-4"
                aria-expanded={isOpen}
            >
                {/* Plus/Minus Icon */}
                <div className="text-blue-500 mt-0.5 md:mt-0 flex-shrink-0">
                    {isOpen ? <Minus size={20} strokeWidth={2.5} /> : <Plus size={20} strokeWidth={2.5} />}
                </div>

                {/* Question Text */}
                <span className="text-[13px] md:text-sm font-bold text-black flex-1 pr-4 leading-snug">
                    {faq.question}
                </span>
            </button>

            {/* Answer content with auto-layout sliding animation */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pt-2 pl-[36px] text-xs md:text-[13px] font-semibold text-black leading-relaxed">
                            {faq.answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function FaqSection() {

    const [openItems, setOpenItems] = useState([]);

    const toggleItem = (index) => {
        setOpenItems((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        );
    };

    return (
        <section className="w-full max-w-4xl flex flex-col items-center mt-12 mb-32 px-4 font-orbitron">
            {/* FAQ Header */}
            <h2 className="text-2xl md:text-3xl font-black text-black tracking-widest mb-16 text-center uppercase">
                FAQ
            </h2>

            {/* FAQ List */}
            <div className="w-full flex flex-col gap-2">
                {faqs.map((faq, index) => (
                    <FaqItem
                        key={index}
                        faq={faq}
                        isOpen={openItems.includes(index)}
                        onToggle={() => toggleItem(index)}
                    />
                ))}
            </div>
        </section>
    );
}
