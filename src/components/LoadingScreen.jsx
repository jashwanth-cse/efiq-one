"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Disable scrolling when loading
        document.body.style.overflow = "hidden";

        // Set a timeout to dismiss the loader (2.2 seconds allows the animation sequence to finish beautifully)
        const timeout = setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = "auto";
        }, 2200);

        return () => {
            clearTimeout(timeout);
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="loader"
                    // Fade and float away when exiting
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-900 pointer-events-none"
                >
                    {/* Animated Logo Container with Perspective */}
                    <div className="flex flex-col items-center gap-6" style={{ perspective: "1000px" }}>

                        {/* The SVG Mark wrapping with explicit 3D transform style logic */}
                        <div className="h-24 w-auto flex justify-center items-center drop-shadow-2xl relative" style={{ transformStyle: "preserve-3d" }}>
                            <svg viewBox="10 0 80 95" className="h-full w-auto overflow-visible" aria-hidden="true">
                                {/* Green Top Shape flipping in via 3D rotation */}
                                <motion.path
                                    initial={{ rotateX: 180, opacity: 0, z: -100 }}
                                    animate={{ rotateX: 0, opacity: 1, z: 0 }}
                                    transition={{
                                        duration: 1.2,
                                        ease: [0.34, 1.56, 0.64, 1], // bouncy standard spring equivalent
                                        delay: 0.2
                                    }}
                                    d="M 90 48 L 90 25 A 25 25 0 0 0 65 0 L 10 0 L 35 25 L 65 25 L 65 48 Z"
                                    fill="#82e05a"
                                    className="drop-shadow-lg"
                                    style={{ transformOrigin: "center center" }}
                                />

                                {/* Blue Bottom "U" Shape flipping in from opposite direction */}
                                <motion.path
                                    initial={{ rotateX: -180, opacity: 0, z: 100 }}
                                    animate={{ rotateX: 0, opacity: 1, z: 0 }}
                                    transition={{
                                        duration: 1.2,
                                        ease: [0.34, 1.56, 0.64, 1],
                                        delay: 0.4
                                    }}
                                    d="M 10 48 L 10 70 A 25 25 0 0 0 35 95 L 65 95 A 25 25 0 0 0 90 70 L 90 48 L 65 48 L 65 70 L 35 70 L 35 48 Z"
                                    fill="#5a78ff"
                                    className="drop-shadow-lg"
                                    style={{ transformOrigin: "center center" }}
                                />
                            </svg>
                        </div>

                        {/* Typography with 3D Tilts */}
                        <div className="flex flex-col justify-center items-center h-16 overflow-visible" style={{ transformStyle: "preserve-3d" }}>
                            <motion.span
                                initial={{ opacity: 0, rotateX: 90, scale: 0.8 }}
                                animate={{ opacity: 1, rotateX: 0, scale: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
                                className="font-orbitron font-bold text-[18px] tracking-[0.2em] text-white leading-none mb-1 ml-1 block"
                                style={{ transformOrigin: "bottom center" }}
                            >
                                EFIQ
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0, rotateX: -90, scale: 0.8 }}
                                animate={{ opacity: 1, rotateX: 0, scale: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
                                className="font-orbitron font-black text-[38px] text-zinc-300 leading-none tracking-tight block"
                                style={{ transformOrigin: "top center" }}
                            >
                                ONE
                            </motion.span>
                        </div>

                    </div>

                    {/* subtle loading progress bar at the very bottom */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="h-full w-full bg-brand-blue"
                        />
                    </div>

                </motion.div>
            )}
        </AnimatePresence>
    );
}
