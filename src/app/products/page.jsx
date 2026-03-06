import ChooseProduct from "./ChooseProduct";

export const metadata = {
  title: "Products",
  description:
    "Explore EFiQ ONE products — intelligent inventory and attendance tracking solutions designed for the modern enterprise.",
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-brand-blue selection:text-white">
      <ChooseProduct />
    </div>
  );
}
