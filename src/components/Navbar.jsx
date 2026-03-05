"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";

const DROPDOWN_ITEMS = [
    { label: "My Account", color: "#000000" },
    { label: "Billing", color: "#000000" },
    { label: "Sign out", color: "#e7191f" },
];

const NAV_BG = "#d9d9d9";

export default function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    /* Close menus on outside click */
    useEffect(() => {
        function onOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
                setMobileMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", onOutside);
        return () => document.removeEventListener("mousedown", onOutside);
    }, []);

    /* Lock body scroll when mobile menu is open */
    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileMenuOpen]);

    const toggleDropdown = () => {
        setDropdownOpen(p => !p);
        if (!dropdownOpen) setMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(p => !p);
        if (!mobileMenuOpen) setDropdownOpen(false);
    };

    return (
        <header className="w-full px-4 sm:px-6 py-4 sm:py-6 relative z-40">
            {/* ── Desktop & Mobile Header ── */}
            <nav className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 items-center relative" ref={dropdownRef}>

                {/* Col 1 — Logo */}
                <div className="flex items-center">
                    <Link
                        href="/"
                        className="flex items-center gap-2 group"
                        onClick={() => { setMobileMenuOpen(false); setDropdownOpen(false); }}
                    >
                        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-tr from-primary to-green-400 rounded-lg flex items-center justify-center shadow-md shrink-0">
                            <span className="text-white font-bold text-lg sm:text-xl select-none">U</span>
                        </div>
                        <div className="flex flex-col -space-y-1">
                            <span className="text-[10px] sm:text-xs font-bold tracking-tighter uppercase text-gray-900">Efiq</span>
                            <span className="text-base sm:text-lg font-black tracking-tighter uppercase text-gray-900">One</span>
                        </div>
                    </Link>
                </div>

                {/* Col 2 — Center nav (desktop only) */}
                <div className="hidden md:flex justify-center">
                    <div
                        className="flex items-center gap-8 px-12 py-3 rounded-xl shadow-sm"
                        style={{ backgroundColor: NAV_BG }}
                    >
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="font-accent font-semibold text-gray-800 hover:text-primary transition-colors duration-200 whitespace-nowrap"
                                style={{ fontSize: "11px" }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Col 3 — Right actions */}
                <div className="flex items-center justify-end gap-1.5 sm:gap-3">

                    {/* Profile dropdown trigger */}
                    <div className="relative">
                        <button
                            aria-label="Profile menu"
                            aria-expanded={dropdownOpen}
                            onClick={toggleDropdown}
                            className="flex items-center justify-center p-1.5 hover:bg-gray-100 rounded-full transition-colors duration-200"
                        >
                            <span
                                className="material-symbols-outlined transition-transform duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                                style={{
                                    fontSize: "26px",
                                    color: "#c0c0c0",
                                    transform: dropdownOpen ? "scale(1.15) translateY(1px)" : "scale(1)",
                                }}
                            >
                                account_circle
                            </span>
                        </button>
                    </div>

                    {/* Contact Sales — hidden on mobile */}
                    <button
                        className="hidden md:block font-accent font-bold text-gray-800 hover:brightness-95 transition-all duration-200 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl whitespace-nowrap"
                        style={{ backgroundColor: NAV_BG, fontSize: "11px" }}
                    >
                        Contact Sales
                    </button>

                    {/* Hamburger — mobile only */}
                    <button
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        className="md:hidden flex items-center justify-center p-2 rounded-xl transition-colors duration-200 ml-1"
                        style={{ backgroundColor: NAV_BG }}
                        onClick={toggleMobileMenu}
                    >
                        <span
                            className="material-symbols-outlined text-gray-700 transition-transform duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                            style={{
                                fontSize: "22px",
                                transform: mobileMenuOpen ? "scale(1.1) rotate(90deg)" : "scale(1) rotate(0deg)"
                            }}
                        >
                            {mobileMenuOpen ? "close" : "menu"}
                        </span>
                    </button>

                    {/*  ── OVERLAYS (Both Profile & Mobile Menu dropdowns share this space) ──  */}

                    {/* 1) Profile Dropdown */}
                    {dropdownOpen && (
                        <div
                            className="dropdown-animate absolute right-0 top-[calc(100%+0.5rem)] flex flex-col gap-1 p-2 rounded-xl shadow-lg z-50 min-w-[160px]"
                            style={{ backgroundColor: NAV_BG }}
                        >
                            {DROPDOWN_ITEMS.map((item) => (
                                <button
                                    key={item.label}
                                    className="w-full text-left px-4 py-2 rounded-xl hover:brightness-95 active:brightness-90 transition-all duration-150 font-medium"
                                    style={{
                                        fontFamily: "Arial, sans-serif",
                                        fontSize: "13px",
                                        color: item.color,
                                        backgroundColor: NAV_BG,
                                    }}
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* 2) Mobile Menu Overlay */}
                    {mobileMenuOpen && (
                        <div
                            className="dropdown-animate absolute right-0 top-[calc(100%+0.5rem)] md:hidden w-[220px] rounded-2xl shadow-lg overflow-hidden z-50"
                            style={{ backgroundColor: NAV_BG }}
                        >
                            <div className="flex flex-col p-3 gap-1">
                                {NAV_LINKS.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        className="font-accent font-semibold text-gray-800 hover:text-primary px-4 py-3 rounded-xl hover:bg-gray-200 active:bg-gray-300 transition-all duration-150"
                                        style={{ fontSize: "14px" }}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <div className="mt-1 pt-2 border-t border-gray-300">
                                    <button
                                        className="w-full font-accent font-bold text-gray-800 px-4 py-3 rounded-xl hover:bg-gray-200 active:bg-gray-300 transition-all duration-150 text-left"
                                        style={{ fontSize: "14px" }}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Contact Sales
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </nav>
        </header>
    );
}
