"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/**
 * ProductCard — reusable card for displaying an EFiQ product.
 *
 * Props:
 *   title           {string}    — Product name
 *   description     {string}    — Short description
 *   buttonText      {string}    — CTA button label (default: "Explore More")
 *   imageUrl        {string}    — Primary product image path
 *   comingSoonImage {string}    — Image shown on hover overlay
 *   link            {string}    — Button/card href target
 *   icon            {ReactNode} — Icon shown in the card header
 */
export default function ProductCard({
  title,
  description,
  buttonText = "Explore More",
  imageUrl,
  comingSoonImage,
  link = "#",
  icon,
}) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (comingSoonImage) {
      setClicked((prev) => !prev);
    }
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        },
      }}
      className="relative group bg-white border border-black/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-brand-green/30 transition-all duration-500 flex flex-col h-full"
      whileHover={{ y: -12 }}
      onClick={handleClick}
    >
      {/* Coming Soon overlay on hover */}
      {comingSoonImage && (
        <div
          className={`absolute inset-0 z-10 flex items-center justify-center rounded-3xl transition-opacity duration-300 ease-in-out bg-black/70 ${
            clicked ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
          aria-hidden="true"
        >
          <Image
            src={comingSoonImage}
            alt="Coming Soon"
            fill
            className="object-cover rounded-3xl opacity-80"
          />
          <span className="relative z-10 font-orbitron font-black text-brand-green text-2xl tracking-widest drop-shadow-lg">
            COMING SOON
          </span>
        </div>
      )}

      {/* Product image */}
      {imageUrl && (
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      {/* Content */}
      <motion.div
        className="p-10 flex flex-col flex-grow"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="flex items-center gap-4 mb-6">
          {icon && (
            <motion.div
              whileHover={{ rotate: 12, scale: 1.1 }}
              className="p-3 bg-zinc-100 rounded-2xl text-zinc-900 group-hover:bg-brand-green group-hover:text-black transition-colors duration-500"
            >
              {icon}
            </motion.div>
          )}
          <h3 className="text-2xl font-bold tracking-tight group-hover:text-brand-green transition-colors duration-500">
            {title}
          </h3>
        </div>

        <p className="text-zinc-500 text-lg leading-relaxed mb-10 flex-grow group-hover:text-zinc-700 transition-colors duration-500">
          {description}
        </p>

        <div className="flex justify-start">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={link}
              className="group/btn relative inline-flex items-center justify-center px-6 py-3 font-orbitron font-bold text-black border-2 border-black transition-all duration-300 bg-brand-green rounded-full overflow-hidden hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2"
              aria-label={`${buttonText} — ${title}`}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="relative z-10 flex items-center gap-2">
                {buttonText}
                <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
              </span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
