import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function ContactSalesPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        {/* Top Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold font-orbitron">
            Talk to Our Sales Team
          </h1>
          <p className="text-gray-600 mt-4 max-w-xl mx-auto font-manrope font-bold">
            We&apos;re here to help you understand how EFIQ One can simplify your operations and support your business growth.
          </p>
          <Link href="#">
            <button className="mt-6 px-8 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition font-orbitron focus:ring-2 focus:ring-gray-300">
              Book a Demo
            </button>
          </Link>
          <p className="text-gray-600 max-w-3xl mx-auto mt-10 font-manrope font-bold">
            Whether you&apos;re exploring attendance tracking, inventory management, or planning a full enterprise rollout, our team will guide you through the best plan, features, and customizations for your needs.
          </p>
        </div>

        {/* Lower Section - Two Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mt-20">
          {/* Left Column - Contact Info */}
          <div>
            <h2 className="text-2xl font-bold mb-8 font-orbitron">
              Prefer talking directly?
            </h2>
            <div className="space-y-6 text-gray-600">
              <div>
                <a href="mailto:sales@efiqone.com" className="text-blue-600 hover:underline font-manrope font-bold">
                  sales@efiqone.com
                </a>
                <p className="text-sm font-bold font-manrope">(for sales related mail)</p>
              </div>
              <div>
                <a href="mailto:support@efiqone.com" className="text-blue-600 hover:underline font-bold font-manrope">
                  support@efiqone.com
                </a>
                <p className="text-sm font-bold font-manrope">(for client support related mail)</p>
              </div>
              <div>
                <p className=" text-gray-900 font-bold font-manrope">Available on</p>
                <p>Mon–Sat, 9 AM – 7 PM IST</p>
              </div>
            </div>
          </div>

          {/* Right Column - Placeholder */}
          <div className="bg-gray-100 rounded-xl h-[420px]" />
        </div>
      </main>
      <Footer />
    </>
  );
}