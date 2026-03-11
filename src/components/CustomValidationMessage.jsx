"use client";

import { motion, AnimatePresence } from "motion/react";
import { AlertCircle } from "lucide-react";

export default function CustomValidationMessage({ message, isVisible }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute z-50 left-0 -top-12 w-full pointer-events-none"
        >
          <div 
            className="bg-[#0c0c0f] border-2 border-[#82e05a] rounded-xl px-4 py-2 flex items-center gap-2 shadow-[0_10px_30px_rgba(130,224,90,0.2)]"
            style={{ 
              transformStyle: "preserve-3d",
              transform: "translateZ(30px)"
            }}
          >
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#82e05a]/20 flex items-center justify-center">
              <AlertCircle className="w-3.5 h-3.5 text-[#82e05a]" />
            </div>
            <p className="text-[11px] font-orbitron font-bold text-white tracking-wider uppercase leading-none">
              {message}
            </p>
            
            {/* Arrow */}
            <div 
              className="absolute -bottom-2 left-8 w-4 h-4 bg-[#0c0c0f] border-r-2 border-b-2 border-[#82e05a] rotate-45"
              style={{ transformStyle: "preserve-3d" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
