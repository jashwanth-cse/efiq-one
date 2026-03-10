"use client";

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import Link from 'next/link';
import { motion } from 'motion/react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.3 },
  },
};

export default function ContactSalesPage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        {/* Top Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center"
        >
          <motion.h1 variants={itemVariants} className="text-4xl font-bold font-orbitron">
            Talk to Our Sales Team
          </motion.h1>
          <motion.p variants={itemVariants} className="text-gray-600 mt-4 max-w-xl mx-auto font-manrope font-bold">
            We&apos;re here to help you understand how EFIQ One can simplify your operations and support your business growth.
          </motion.p>
          <motion.div variants={buttonVariants} className="mt-8">
            <motion.button
              data-magnetic
              data-cursor-focus
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 font-orbitron font-bold text-black border-2 border-black bg-brand-green rounded-full hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-300 focus:ring-2 focus:ring-brand-green focus:ring-offset-2 text-base"
            >
              Book a Demo
              <motion.span
                className="inline-block"
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>
          <motion.p variants={itemVariants} className="text-gray-600 max-w-3xl mx-auto mt-10 font-manrope font-bold">
            Whether you&apos;re exploring attendance tracking, inventory management, or planning a full enterprise rollout, our team will guide you through the best plan, features, and customizations for your needs.
          </motion.p>
        </motion.div>

        {/* Lower Section - Two Column Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-20 mt-20"
        >
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-8 font-orbitron">
              Prefer talking directly?
            </motion.h2>
            <div className="space-y-6 text-gray-600">
              <div>
                <a href="mailto:sales@efiqone.com" className="text-blue-600 hover:underline font-manrope font-bold">
                  sales@efiqone.com
                </a>
                <p className="text-sm font-bold font-manrope">(for sales related mail)</p>
              </div>
              <div>
                <a href="mailto:support@efiqone.com" className="text-blue-600 hover:underline font-bold font-manrope">
                  support@efiqone.com
                </a>
                <p className="text-sm font-bold font-manrope">(for client support related mail)</p>
              </div>
              <div>
                <p className=" text-gray-900 font-bold font-manrope">Available on</p>
                <p>Mon–Sat, 9 AM – 7 PM IST</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-gray-100 rounded-xl h-[420px]"
          />
        </motion.div>
      </main>
      <Footer />
    </>
  );
}