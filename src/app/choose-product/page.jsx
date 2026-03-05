import OptionCard from "@/components/OptionCard";
import { PRODUCTS } from "@/lib/constants";

export const metadata = {
    title: "Choose Product",
    description: "Choose the EFIQ product you want to use",
};

export default function ChooseProductPage() {
    return (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-24 sm:pb-32 text-center">

            {/* Heading — Arial 32px desktop, scaled down on mobile */}
            <h1
                className="font-bold mb-10 sm:mb-16 tracking-tight text-gray-900 leading-snug"
                style={{ fontFamily: "Arial, sans-serif", fontSize: "clamp(22px, 4vw, 32px)" }}
            >
                What would you like to use EFIQ One for?
            </h1>

            {/* Product cards — stack on mobile, side-by-side on sm+ */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-10 sm:gap-16 md:gap-20 mb-16 sm:mb-20">
                {PRODUCTS.map((product) => (
                    <OptionCard
                        key={product.id}
                        icon={product.icon}
                        imageSrc={product.imageSrc}
                        title={product.title}
                        titleSize={product.titleSize}
                        variant={product.variant}
                        href={product.href}
                    />
                ))}
            </div>

            {/* Coming Soon — Orbitron 23px desktop, scaled on mobile */}
            <div className="mt-6 sm:mt-8">
                <h2
                    className="font-accent font-bold tracking-[0.2em] text-slate-800"
                    style={{ fontSize: "clamp(16px, 3vw, 23px)" }}
                >
                    COMING SOON
                </h2>
            </div>
        </section>
    );
}
