import React from 'react';
import { Truck, RotateCcw, Package, CreditCard, Clock, CheckCircle } from 'lucide-react';

export default function ShippingReturns() {
  const steps = [
    { icon: <Package size={24} />, title: "Order Confirmed", desc: "We verify your technical specifications." },
    { icon: <Clock size={24} />, title: "Processing", desc: "Hardware is quality-checked and packed." },
    { icon: <Truck size={24} />, title: "Shipping", desc: "Dispatched via white-glove logistics." },
    { icon: <CheckCircle size={24} />, title: "Delivery", desc: "Installed and verified at your location." }
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white dark:bg-black font-['Space_Grotesk']">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-slate-900 overflow-hidden flex items-center mb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900 opacity-50"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="max-w-[1280px] mx-auto px-6 relative z-10 w-full">
          <h1 className="text-6xl font-bold text-white mb-6">Logistics & Support</h1>
          <p className="text-xl text-slate-300 max-w-2xl">Precision shipping for mission-critical hardware. Our delivery process is as advanced as our products.</p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Shipping Info */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-4">
                <Truck className="text-cyan-500" size={32} />
                Shipping Policy
              </h2>
              <div className="space-y-6">
                <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-slate-900 dark:text-white">
                    <CreditCard size={18} className="text-cyan-500" />
                    Delivery Rates
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">Standard delivery is ₹45.00 for all orders. Express technical delivery is available for enterprise clients.</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-slate-900 dark:text-white">
                    <Clock size={18} className="text-cyan-500" />
                    Timeframes
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">Orders are processed within 24 hours. Typical delivery takes 3-5 business days across major cities in India.</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-4">
                <RotateCcw className="text-purple-500" size={32} />
                Returns & Refunds
              </h2>
              <div className="prose dark:prose-invert text-slate-600 dark:text-slate-400 space-y-4">
                <p>We offer a 15-day return policy for hardware that remains in its original packaging with seals intact.</p>
                <p><strong>Note:</strong> Customized workstations and open-box components are subject to a 15% restocking fee due to the precision calibration required for our systems.</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Original receipt or order confirmation required.</li>
                  <li>Refunds are processed to the original payment method within 7-10 days.</li>
                  <li>Technical support must verify the hardware state upon return.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Delivery Process Visualization */}
          <div className="bg-slate-900 text-white p-10 rounded-[40px] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full -mr-48 -mt-48 transition-transform group-hover:scale-110 duration-1000"></div>
            <h2 className="text-2xl font-bold mb-10 relative z-10">Our Delivery Workflow</h2>
            <div className="space-y-12 relative z-10">
              {steps.map((step, idx) => (
                <div key={idx} className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-cyan-400 flex-shrink-0 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-500">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                    <p className="text-slate-400 text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 pt-10 border-t border-white/10 relative z-10">
              <p className="text-center italic text-slate-400 font-medium">"White-Glove logistics for high-precision hardware."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
