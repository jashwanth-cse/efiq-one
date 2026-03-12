"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Package, Clock } from "lucide-react";

const products = [
  {
    id: "stock-inventory",
    title: "Stock Inventory",
    description:
      "Always know what's in stock, what's running low, and what needs action. Real-time tracking for modern businesses.",
    icon: Package,
    href: "/products/inventory",
  },
  {
    id: "attendance-tracking",
    title: "Attendance Tracking",
    description:
      "Track every check-in, work hour, and leave with complete accuracy and zero manual effort. Automated workforce management.",
    icon: Clock,
    href: "/products/attendance",
  },
];

function HoverCard({ product }) {
  const ref = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const Icon = product.icon;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        },
      }}
      className="relative group bg-white border border-black/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-brand-blue/30 transition-shadow duration-500 flex flex-col h-full"
      whileHover={{ y: -12 }}
    >
      <motion.div
        className="p-10 flex flex-col flex-grow"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            whileHover={{ rotate: 12, scale: 1.1 }}
            className="p-3 bg-zinc-100 rounded-2xl text-zinc-900 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-500"
          >
            <Icon className="w-8 h-8" />
          </motion.div>
          <h3 className="text-2xl font-bold tracking-tight group-hover:text-brand-blue transition-colors duration-500 font-orbitron">
            {product.title}
          </h3>
        </div>

        <p className="text-zinc-500 text-base leading-relaxed mb-10 flex-grow group-hover:text-zinc-700 transition-colors duration-500 font-display">
          {product.description}
        </p>

        <div className="flex justify-start">
          <motion.a
            data-magnetic
            data-cursor-focus
            href={product.href}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 font-orbitron font-bold text-black border-2 border-black bg-brand-green rounded-full hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-300 focus:ring-2 focus:ring-brand-green focus:ring-offset-2"
            aria-label={`Explore more about ${product.title}`}
          >
            Explore More
            <motion.span
              className="inline-block"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              →
            </motion.span>
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ChooseProduct() {
  return (
    <section className="min-h-[calc(100vh-5rem)] mt-20 flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 font-orbitron"
        >
          Products
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="h-1.5 bg-brand-blue mx-auto rounded-full"
        />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-6 text-zinc-500 text-base font-display max-w-xl mx-auto"
        >
          Choose the solution that fits your business. Hover to preview what&apos;s
          coming.
        </motion.p>
      </div>

      {/* Product Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {products.map((product) => (
          <HoverCard key={product.id} product={product} />
        ))}
      </motion.div>
    </section>
  );
}
