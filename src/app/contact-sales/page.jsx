"use client";

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
          <motion.div variants={buttonVariants}>
            <Link href="#">
              <motion.button
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                className="mt-6 px-8 py-3 rounded-lg bg-brand-green hover:bg-blue-500 transition font-orbitron focus:ring-2 focus:ring-gray-300"
              >
                Book a Demo
              </motion.button>
            </Link>
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