"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

const FIELDS = [
    { id: "name", label: "Name", type: "text", placeholder: "" },
    { id: "orgEmail", label: "Organization Mail Id", type: "email", placeholder: "" },
    { id: "orgName", label: "Organization Name", type: "text", placeholder: "" },
    { id: "street", label: "Door No / Street Name / Floor No.", type: "text", placeholder: "" },
    { id: "city", label: "City", type: "text", placeholder: "" },
    { id: "state", label: "State", type: "text", placeholder: "" },
    { id: "country", label: "Country", type: "text", placeholder: "" },
    { id: "zipCode", label: "Zip Code", type: "text", placeholder: "" },
    { id: "taxId", label: "Tax ID", type: "text", placeholder: "" },
    { id: "mobileNo", label: "Mobile No", type: "tel", placeholder: "" },
];

export default function BillingPage() {
    const router = useRouter();
    const [form, setForm] = useState(
        Object.fromEntries(FIELDS.map((f) => [f.id, ""]))
    );
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (id, value) => {
        setForm((prev) => ({ ...prev, [id]: value }));
        setErrors((prev) => ({ ...prev, [id]: "" }));
    };

    const validate = () => {
        const newErrors = {};
        FIELDS.forEach(({ id, label, type }) => {
            if (!form[id].trim()) {
                newErrors[id] = `${label} is required`;
            } else if (type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form[id])) {
                newErrors[id] = "Enter a valid email address";
            } else if (type === "tel" && !/^[0-9+\-\s]{7,15}$/.test(form[id])) {
                newErrors[id] = "Enter a valid mobile number";
            }
        });
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setSubmitting(true);
        // Simulate async submit — replace with real API call
        await new Promise((r) => setTimeout(r, 800));
        setSubmitting(false);
        router.push("/");
    };

    return (
        <section className="min-h-screen bg-background">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-24 sm:pb-32">

                {/* Page heading */}
                <h1
                    className="font-orbitron font-bold text-gray-900 mb-8"
                    style={{ fontSize: "clamp(22px, 4vw, 32px)" }}
                >
                    Enter your Billing Address
                </h1>

                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                    {FIELDS.map(({ id, label, type }) => (
                        <div key={id} className="flex flex-col gap-1.5">
                            <label
                                htmlFor={id}
                                className="text-gray-700 font-bold"
                                style={{ fontFamily: "Arial, sans-serif", fontSize: "clamp(13px, 1.5vw, 15px)" }}
                            >
                                {label}
                            </label>
                            <input
                                id={id}
                                name={id}
                                type={type}
                                value={form[id]}
                                onChange={(e) => handleChange(id, e.target.value)}
                                autoComplete={id === "orgEmail" ? "email" : "on"}
                                className={`w-full px-4 py-3 rounded-xl border text-gray-900 text-sm bg-gray-50 outline-none transition-all duration-200
                                    focus:ring-2 focus:ring-primary focus:border-primary focus:bg-white
                                    ${errors[id] ? "border-red-400 bg-red-50 focus:ring-red-400" : "border-gray-200 hover:border-gray-300"}`}
                                style={{ fontFamily: "Arial, sans-serif" }}
                            />
                            {errors[id] && (
                                <p className="text-red-500 text-xs mt-0.5" style={{ fontFamily: "Arial, sans-serif" }}>
                                    {errors[id]}
                                </p>
                            )}
                        </div>
                    ))}

                    {/* Submit */}
                    <div className="flex justify-center mt-4">
                        <motion.button
                            data-magnetic
                            data-cursor-focus
                            type="submit"
                            disabled={submitting}
                            whileHover={!submitting ? { scale: 1.05 } : {}}
                            whileTap={!submitting ? { scale: 0.95 } : {}}
                            className="inline-flex items-center gap-2 px-6 py-3 font-orbitron font-bold text-black border-2 border-black bg-brand-green rounded-full hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-300 focus:ring-2 focus:ring-brand-green focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
                            style={{ fontSize: "clamp(13px, 1.5vw, 15px)", minWidth: "160px" }}
                        >
                            {submitting ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-black" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                    Processing…
                                </span>
                            ) : (
                                <>
                                    Proceed
                                    <motion.span
                                        className="inline-block"
                                        initial={{ x: 0 }}
                                        whileHover={{ x: 4 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        →
                                    </motion.span>
                                </>
                            )}
                        </motion.button>
                    </div>
                </form>
            </div>
        </section>
    );
}
