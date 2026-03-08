import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
    ArrowRight,
    Settings,
    Workflow,
    Zap,
    ShieldCheck,
    BarChart,
    Users,
    Layers,
    Clock,
    Sparkles,
    Search
} from "lucide-react";

export default function LandingPage() {
    return (
        <main className="min-h-screen flex flex-col bg-white text-zinc-900 font-manrope">
            <CustomCursor />
            <Navbar />

            <div className="flex-grow pt-24">
                {/* SECTION 1 — HERO */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 text-center flex flex-col items-center">
                    <h1 className="text-5xl md:text-7xl font-orbitron font-bold text-zinc-900 tracking-tight max-w-4xl leading-tight">
                        Your Business. Simplified. Streamlined.
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed">
                        Centralize people, operations, and resources. Automate workflows to drive efficiency and focus on what truly matters for your growth.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-4 bg-brand-green text-black font-bold rounded-full hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-brand-green transition-colors flex items-center gap-2 text-lg">
                            Get a Demo
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </section>

                {/* SECTION 2 — FEATURE ICON AREA */}
                <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                    <div className="bg-zinc-100 rounded-3xl p-8 md:p-12 flex justify-center items-center gap-8 md:gap-16 shadow-inner">
                        <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105">
                            <Settings className="w-10 h-10 md:w-14 md:h-14 text-zinc-700" />
                        </div>
                        <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105">
                            <Workflow className="w-10 h-10 md:w-14 md:h-14 text-zinc-700" />
                        </div>
                    </div>
                </section>

                {/* SECTION 3 — FEATURE GRID */}
                <section className="bg-zinc-50 border-y border-zinc-100 py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                            {[
                                { icon: Zap, label: "Fast Automation" },
                                { icon: ShieldCheck, label: "Secure Operations" },
                                { icon: BarChart, label: "Deep Analytics" },
                                { icon: Users, label: "Team Sync" },
                                { icon: Layers, label: "Unified Resources" },
                                { icon: Clock, label: "Real-time Tracking" },
                                { icon: Settings, label: "Custom Workflows" },
                                { icon: Workflow, label: "Seamless Integration" },
                            ].map((feature, idx) => (
                                <div key={idx} className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-zinc-100 hover:shadow-md transition-shadow group">
                                    <feature.icon className="w-8 h-8 text-zinc-400 group-hover:text-brand-green transition-colors mb-4" />
                                    <span className="font-bold text-zinc-800">{feature.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECTION 4 — PROBLEM STATEMENT */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
                    <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-zinc-900 mb-12 leading-tight">
                        Confusion slows growth.<br />
                        <span className="text-zinc-600 block mt-2">A clear system accelerates it.</span>
                    </h2>
                    <div className="w-full aspect-video md:aspect-[21/9] bg-zinc-100 rounded-3xl flex items-center justify-center border border-zinc-200 shadow-sm relative overflow-hidden group">
                        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]" />
                        <span className="text-zinc-400 font-bold uppercase tracking-widest relative z-10 flex flex-col items-center gap-4">
                            <BarChart className="w-12 h-12 text-zinc-300" />
                            Dashboard Placeholder
                        </span>
                    </div>
                </section>

                {/* SECTION 5 — INFORMATION SECTION */}
                <section className="bg-zinc-50 border-t border-zinc-100 py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="aspect-square bg-zinc-200 rounded-3xl flex items-center justify-center shadow-inner border border-zinc-300 relative overflow-hidden">
                                <span className="text-zinc-500 font-bold uppercase tracking-widest relative z-10">Product UI Placeholder</span>
                            </div>
                            <div className="flex flex-col justify-center">
                                <h3 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-zinc-900 mb-6 leading-tight">
                                    Built for teams who value clarity and control.
                                </h3>
                                <p className="text-lg md:text-xl text-zinc-600 leading-relaxed mb-4">
                                    Take full command of your business operations with tools designed for visibility, accountability, and immediate action.
                                </p>
                                <p className="text-lg md:text-xl text-zinc-600 leading-relaxed">
                                    Reduce the noise, empower your team, and focus on delivering excellent results at pace.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 6 — AI SECTION */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center flex flex-col items-center">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-orbitron font-bold text-zinc-900 mb-16 max-w-4xl leading-tight">
                        Human potential, multiplied by intelligent automation.
                    </h2>
                    <div className="w-32 h-32 md:w-48 md:h-48 bg-zinc-900 rounded-full shadow-2xl flex items-center justify-center relative">
                        <Sparkles className="w-12 h-12 md:w-20 md:h-20 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 w-16 h-16 md:w-20 md:h-20 bg-white rounded-full shadow-lg border-4 border-zinc-50 flex items-center justify-center">
                            <Search className="w-6 h-6 md:w-8 md:h-8 text-zinc-900" />
                        </div>
                    </div>
                </section>

                {/* SECTION 7 — PRODUCT DEMO */}
                <section className="bg-zinc-950 py-24 md:py-32 border-t border-zinc-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
                        <div className="w-full aspect-video md:aspect-[16/10] bg-zinc-900 rounded-3xl flex items-center justify-center border border-zinc-800 shadow-2xl relative overflow-hidden">
                            {/* Ambient Glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-zinc-800/50 blur-[100px] rounded-full pointer-events-none" />
                            <span className="text-zinc-600 font-bold uppercase tracking-widest relative z-10 flex flex-col items-center gap-4">
                                Dark Dashboard UI Placeholder
                            </span>
                        </div>
                    </div>
                </section>

                {/* SECTION 8 — FINAL CTA */}
                <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center flex flex-col items-center">
                    <h2 className="text-4xl md:text-6xl font-orbitron font-bold text-zinc-900 mb-8 leading-tight">
                        More output. Same team.<br />
                        <span className="text-zinc-500 block mt-2">Zero extra effort.</span>
                    </h2>
                    <button className="px-10 py-5 bg-zinc-900 text-white font-bold rounded-full hover:bg-zinc-800 focus:outline-none focus:ring-4 focus:ring-zinc-200 transition-all shadow-xl hover:shadow-2xl flex items-center gap-3 text-xl mt-8">
                        Get Started
                        <ArrowRight className="w-6 h-6" />
                    </button>
                </section>
            </div>

            {/* SECTION 9 — FOOTER */}
            <Footer />
        </main>
    );
}