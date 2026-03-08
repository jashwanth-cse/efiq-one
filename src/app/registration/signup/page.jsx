"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Navbar />

            {/* Main Content Centered vertically and horizontally */}
            <main className="flex-1 flex items-center justify-center p-4 pt-24 pb-12">
                <div className="w-full max-w-[420px] bg-white rounded-[24px] shadow-sm p-8 border border-gray-200/60">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Sign up</h1>
                        <p className="text-sm text-gray-500 mt-2">Create your Epiq One account</p>
                    </div>

                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        {/* Name */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700 block" htmlFor="name">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter your name"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all placeholder:text-gray-400 text-gray-900 bg-gray-50/50"
                            />
                        </div>

                        {/* Organization mail id */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700 block" htmlFor="email">
                                Organization mail id
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="you@company.com"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all placeholder:text-gray-400 text-gray-900 bg-gray-50/50"
                            />
                        </div>

                        {/* Organization Name */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700 block" htmlFor="orgName">
                                Organization Name
                            </label>
                            <input
                                id="orgName"
                                type="text"
                                placeholder="Acme Corp"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all placeholder:text-gray-400 text-gray-900 bg-gray-50/50"
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5 relative">
                            <label className="text-sm font-semibold text-gray-700 block" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a password"
                                    className="w-full px-4 py-3 pr-11 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all placeholder:text-gray-400 text-gray-900 bg-gray-50/50"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1 rounded-md"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Re Enter Password */}
                        <div className="space-y-1.5 relative">
                            <label className="text-sm font-semibold text-gray-700 block" htmlFor="confirmPassword">
                                Re Enter Password
                            </label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    className="w-full px-4 py-3 pr-11 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all placeholder:text-gray-400 text-gray-900 bg-gray-50/50"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1 rounded-md"
                                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Terms Checkbox */}
                        <div className="flex items-start pt-3 pb-1">
                            <div className="flex items-center h-5 mt-0.5">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    className="w-4 h-4 border-gray-300 rounded text-brand-green focus:ring-brand-green focus:ring-2 cursor-pointer transition-colors"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="terms" className="text-gray-600 cursor-pointer leading-tight">
                                    By Clicking the box, I agree the{" "}
                                    <Link href="/terms" className="text-gray-900 font-bold hover:underline">
                                        Terms
                                    </Link>{" "}
                                    and{" "}
                                    <Link href="/privacy" className="text-gray-900 font-bold hover:underline">
                                        Privacy Policy
                                    </Link>
                                </label>
                            </div>
                        </div>

                        <div className="pt-4 space-y-4">
                            <button
                                type="submit"
                                className="w-full py-3.5 px-4 bg-brand-green hover:bg-brand-green/90 text-zinc-900 font-bold rounded-full transition-all focus:ring-2 focus:ring-brand-green focus:ring-offset-2 flex justify-center items-center active:scale-[0.98]"
                            >
                                Sign Up
                            </button>

                            <div className="relative flex items-center justify-center">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative bg-white px-4 text-sm font-medium text-gray-400">
                                    or
                                </div>
                            </div>

                            <Link
                                href="/registration/login"
                                className="w-full py-3.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-full transition-all flex justify-center items-center active:scale-[0.98]"
                            >
                                Log in
                            </Link>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
