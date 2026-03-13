"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";

const plans = [
  {
    id: "startups",
    label: "Startups",
    subtitle: "Best for Startups",
    price: { monthly: "nnnn", yearly: "mmmm" },
    description: null,
    cta: "Interested",
  },
  {
    id: "business",
    label: "Business",
    subtitle: "Best for a mid number of employee",
    price: { monthly: "nnnn", yearly: "mmmm" },
    description: null,
    cta: "Interested",
  },
  {
    id: "enterprise",
    label: "Enterprise",
    subtitle: "Best for a Large number of employee",
    price: null,
    description: "customization the features based for the enterprise uses",
    cta: "Interested",
  },
];

const faqs = [
  {
    q: "1. Is there a limit to the number of stock items I can add?",
    a: "No. All plans allow unlimited items unless otherwise specified.",
  },
  {
    q: "2. Can I upgrade my plan as my inventory grows?",
    a: "Yes. You can upgrade instantly when you need more features or advanced insights.",
  },
  {
    q: "3. Do I have to pay extra for low-stock alerts?",
    a: "Low-stock alerts are available in mid and top-tier plans; they are included at no extra cost.",
  },
  {
    q: "4. Can multiple team members manage inventory at the same time?",
    a: "Yes. Based on your plan, you can add multiple admins or restrict access using role permissions.",
  },
  {
    q: "5. Are future inventory features included in my current plan?",
    a: "Essential features remain, but advanced AI-driven tools may be add-ons depending on your plan.",
  },
];

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-zinc-200 py-4">
      <button
        className="w-full flex items-start justify-between gap-4 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="font-manrope font-semibold text-sm text-zinc-800 pr-4">
          {faq.q}
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
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden pl-7"
          >
            <p className="pt-2 text-sm text-zinc-500 font-manrope leading-relaxed">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function InventoryPricingPage() {
  const [billing, setBilling] = useState("monthly");
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col">
      <main className="flex-1 pt-24 pb-0">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center font-orbitron font-bold text-4xl sm:text-5xl mb-10"
        >
          Stock Inventory
        </motion.h1>

        {/* Toggle */}
        <div className="flex items-center justify-end max-w-3xl mx-auto px-4 mb-4 gap-3">
          <span className="text-sm font-manrope text-zinc-500">Yearly</span>
          <button
            onClick={() =>
              setBilling((b) => (b === "monthly" ? "yearly" : "monthly"))
            }
            className={`relative w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-blue ${
              billing === "monthly" ? "bg-brand-blue" : "bg-zinc-300"
            }`}
            role="switch"
            aria-checked={billing === "monthly"}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${
                billing === "monthly" ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
          <span className="text-sm font-manrope text-zinc-500">Monthly</span>
        </div>

        {/* Pricing table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mx-auto px-4 mb-16"
        >
          <div className="border border-zinc-600 rounded-lg overflow-hidden grid grid-cols-3">
            {/* Header row */}
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="border-b border-zinc-600 px-6 py-4 text-center font-orbitron font-bold text-sm border-r border-r-zinc-600 last:border-r-0"
              >
                {plan.label}
              </div>
            ))}
            {/* Subtitle row */}
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="border-b border-zinc-600 px-6 py-3 text-center text-xs text-zinc-500 font-manrope border-r border-r-zinc-600 last:border-r-0"
              >
                {plan.subtitle}
              </div>
            ))}
            {/* Price / description row */}
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="px-6 py-8 flex flex-col items-center justify-between gap-8 border-r border-r-zinc-600 last:border-r-0 min-h-[260px]"
              >
                <div className="flex-1 flex items-center justify-center">
                  {plan.price ? (
                    <div className="text-center">
                      <span className="font-orbitron font-black text-3xl">
                        {billing === "monthly"
                          ? plan.price.monthly
                          : plan.price.yearly}
                        /-
                      </span>
                      <p className="text-xs text-zinc-400 font-manrope mt-1">
                        per user/month
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm font-manrope font-semibold text-center text-zinc-700 leading-snug">
                      {plan.description}
                    </p>
                  )}
                </div>
                <Link
                  href={
                    plan.id === "enterprise" ? "/enterprise" : "/contact-sales"
                  }
                  className="px-6 py-2 bg-brand-green text-black font-orbitron font-bold text-sm rounded-full border-2 border-black hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all duration-200"
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <section className="max-w-2xl mx-auto px-4 pb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-orbitron font-bold text-3xl text-center mb-8"
          >
            FAQ
          </motion.h2>
          {faqs.map((faq, i) => (
            <FaqItem
              key={i}
              faq={faq}
              isOpen={openFaq === i}
              onToggle={() => setOpenFaq(openFaq === i ? null : i)}
            />
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
