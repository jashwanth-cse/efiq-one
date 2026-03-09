import PricingTable from "./PricingTable";
import FaqSection from "./FaqSection";
import Footer from "@/components/Footer";

export const metadata = {
    title: "Choose Plan",
    description: "Pick your plan for EFiQ ONE ecosystem.",
};

export default function ChoosePlanPage() {
    return (
        <>
            <main className="min-h-screen bg-background pt-32 pb-16 px-4 font-orbitron overflow-x-hidden">
                <div className="max-w-7xl mx-auto flex flex-col items-center">

                    {/* Page Heading matching screenshot */}
                    <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-black tracking-wide text-black text-center mb-16">
                        Pick your plan
                    </h1>

                    <PricingTable />

                    <FaqSection />

                </div>
            </main>
            <Footer />
        </>
    );
}
