"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "1. Is attendance tracking unlimited for all plans?",
    answer:
      "Yes. You can record unlimited check-ins and check-outs across all plans.",
  },
  {
    question: "2. Can employees use mobile and web to mark attendance?",
    answer:
      "Yes. Both mobile and desktop access are included in all paid plans.",
  },
  {
    question: "3. Does the pricing change based on the number of employees?",
    answer:
      "Plans are billed per user, so you only pay for the employees you add.",
  },
  {
    question: "4. Are leave management and shift scheduling included?",
    answer:
      "They are included in mid and higher-tier plans; basic attendance is part of all plans.",
  },
  {
    question: "5. Can I export attendance data for payroll?",
    answer:
      "Yes. You can export to Excel/PDF, and advanced plans offer automated insights for payroll.",
  },
];

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-zinc-200 py-4">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-manrope font-semibold text-sm text-zinc-800 pr-4">
          {faq.question}
        </span>

        <span className="mt-1 text-brand-blue flex-shrink-0">
          {isOpen ? (
            <Minus className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden pl-7"
          >
            <p className="pt-2 text-sm text-zinc-500 font-manrope leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqSection() {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (index) => {
    setOpenItem((prev) => (prev === index ? null : index));
  };

  return (
    <section className="w-full max-w-2xl mx-auto px-4 pb-24">
      <h2 className="font-orbitron font-bold text-3xl text-center mb-8">FAQ</h2>

      <div className="w-full">
        {faqs.map((faq, index) => (
          <FaqItem
            key={index}
            faq={faq}
            isOpen={openItem === index}
            onToggle={() => toggleItem(index)}
          />
        ))}
      </div>
    </section>
  );
}
