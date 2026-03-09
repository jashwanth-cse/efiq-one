"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

export default function EnterprisePage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-orbitron">
            {/* 1. Navbar */}
            <Navbar />

            <main className="flex-1 pt-24 pb-12">
                {/* 2. Hero Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* LEFT SIDE */}
                        <div className="space-y-8">
                            <h1 className="text-4xl md:text-5xl lg:text-3xl font-extrabold tracking-tight text-gray-900 leading-tight">
                                We don&apos;t make you fit the system.<br />
                                We shape the system to fit you.
                            </h1>
                            <div className="w-full max-w-[420px] h-[220px] bg-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-500 text-lg font-medium border border-gray-300 border-dashed">
                                Business Image
                            </div>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="flex justify-center lg:justify-end">
                            <div className="w-full max-w-md bg-gray-100 rounded-3xl p-10 shadow-sm border border-gray-200 flex flex-col items-center text-center space-y-6">
                                <h2 className="text-3xl font-bold text-gray-900">Book a 1 : 1 Call</h2>
                                <a
                                    href="#"
                                    className="inline-block w-full py-4 px-6 bg-brand-green hover:bg-brand-green/90 text-zinc-900 font-bold rounded-full transition-all text-center focus:ring-2 focus:ring-brand-green focus:ring-offset-2 active:scale-[0.98] text-lg mt-4"
                                >
                                    Book a Call
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Enterprise Description Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <div className="max-w-[700px] mx-auto space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Every organization is different. Your software should be too.
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed font-manrope">
                            Complex workflows, multi-branch operations, layered teams, and department-wise structures make every enterprise unique. EPIQ One Enterprise adapts to your exact model, ensuring seamless operations across your people, processes, and resources.
                        </p>
                    </div>
                </section>

                {/* 4. Enterprise Offers Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="mb-16">
                        <h2 className="text-sm font-bold tracking-widest text-gray-500 uppercase text-center lg:text-left selection:bg-brand-green selection:text-white">
                            ENTERPRISE OFFERS
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                        {/* LEFT SIDE: List of features */}
                        <div className="space-y-0">
                            {[
                                { name: "Fully Customizable Modules", active: true },
                                { name: "Department-Wise Solutions", active: false },
                                { name: "Multi-Branch + Multi-Location Support", active: false },
                                { name: "AI-Powered Optimization", active: false },
                                { name: "Enterprise-Grade Security & Control", active: false },
                                { name: "Dedicated Engineering & Support Team", active: false },
                            ].map((feature, index) => (
                                <div
                                    key={index}
                                    className="group flex items-center justify-between py-6 border-b border-gray-200 cursor-pointer transition-colors"
                                >
                                    <h3 className={`text-xl md:text-2xl font-semibold transition-colors ${feature.active ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-700'}`}>
                                        {feature.name}
                                    </h3>
                                    {feature.active && (
                                        <ArrowRight className="text-brand-green w-6 h-6" />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* RIGHT SIDE: Feature preview placeholder */}
                        <div className="w-full aspect-video bg-gray-200 rounded-3xl flex items-center justify-center text-gray-500 text-xl font-medium border border-gray-300">
                            Feature Image
                        </div>
                    </div>
                </section>

                {/* 5. Call To Action Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                    <div className="max-w-3xl mx-auto space-y-8">
                        <h2 className="text-4xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                            Your enterprise. Your workflows. Your system.
                        </h2>
                        <p className="text-xs text-gray-600">
                            Get a customized platform built specifically for your workflows, structure, and scale.
                        </p>
                        <div className="pt-6 flex justify-center">
                            <a
                                href="#"
                                className="inline-block py-4 px-8 bg-brand-green hover:bg-brand-green/90 text-zinc-900 font-bold rounded-full transition-all text-lg focus:ring-2 focus:ring-brand-green focus:ring-offset-2 active:scale-[0.98]"
                            >
                                Talk to our Enterprise Expert
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            {/* 6. Footer */}
            <Footer />
        </div>
    );
}
