import OptionCard from "@/components/OptionCard";
import { PRODUCTS } from "@/lib/constants";

export const metadata = {
  title: "Choose Product",
  description: "Choose the EFIQ product you want to use",
};

export default function ChooseProductPage() {
  return (
    <section className="min-h-[calc(100vh-5rem)] mt-20 flex flex-col items-center justify-center px-4 sm:px-6 py-12 text-center">
      {/* Heading */}
      <h1 className="font-accent font-bold tracking-tight text-gray-900 leading-snug mb-10 sm:mb-16 text-2xl sm:text-3xl md:text-4xl">
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

      {/* Coming Soon */}
      <div className="mt-6 sm:mt-8">
        <h2 className="font-accent font-bold tracking-[0.2em] text-slate-800 text-base sm:text-lg md:text-xl">
          COMING SOON
        </h2>
      </div>
    </section>
  );
}
