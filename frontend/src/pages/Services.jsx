import React, { useState } from 'react';

/**
 * Services Component
 * 
 * Features specialized engineering services and an inquiry form 
 * that redirects to WhatsApp for service requests
 */
export default function Services() {
  const [openFaq, setOpenFaq] = useState(0);

  // State to manage form inputs[cite: 1]
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    serviceType: 'Custom PC Build',
    description: ''
  });

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Handle input changes[cite: 1]
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission to WhatsApp[cite: 1]
  const handleSubmit = (e) => {
    e.preventDefault();

    const phoneNumber = "918883195777"; // International format for WhatsApp[cite: 1]
    const message = `*New Service Inquiry*%0A%0A` +
      `*Full Name:* ${formData.fullName}%0A` +
      `*Email:* ${formData.email}%0A` +
      `*Service Type:* ${formData.serviceType}%0A` +
      `*Description:* ${formData.description}`;

    // Opens WhatsApp in a new tab with pre-filled details[cite: 1]
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="bg-surface-bright text-on-surface font-['Inter']">
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-24 bg-primary-container overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-6 grid md:grid-cols-2 gap-12 items-center text-left">
            <div className="z-10">
              <span className="inline-block py-1 px-3 mb-4 bg-tertiary-fixed text-on-tertiary-fixed text-label-sm font-label-sm rounded uppercase tracking-widest">
                Expert Precision
              </span>
              <h1 className="font-h1 text-h1 text-white mb-6">Technical Excellence & Reliability</h1>
              <p className="font-body-lg text-body-lg text-on-primary-container mb-8 max-w-lg">
                From hardware restoration to high-performance custom architecture, Spire Technologies provides enterprise-grade solutions for your personal and professional systems
              </p>
              <div className="flex gap-4">
                <a href="#specialized-services" className="px-8 py-3 bg-tertiary-fixed text-primary-container font-bold rounded-lg hover:opacity-90 transition-all shadow-lg inline-block">
                  View Services
                </a>
                <a href="/contact" className="px-8 py-3 border border-outline text-white font-bold rounded-lg hover:bg-white/10 transition-all inline-block">
                  Support Center
                </a>
              </div>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl">
              <img 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmOA8yAgHugZSRPGspDcXlssBhBAIIG2_7jrSrQ0GpkN27u-nso86EbfO5wilf2id6jl7Pp9dq8AeEb0rjBWbD4L_57rHQ1GBLdJp9nK7syGklrcFP4EOyRRWRypS3COZp6-53ZnU7GW4pUDGDTxpzsljid81zA5-r-kLMSRU_3x5Y73mLEgb_08STDqR_3EIURsXC71cl-VoxmHcGinXSE38szcIbyWLt1y9k3PBvFLEy344PSHZr4UzPPv2I6RwPp9ziB-XnSPU" 
                alt="High-end technical engineering" 
              />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="specialized-services" className="py-24 max-w-[1280px] mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="font-h2 text-h2 text-primary mb-4">Specialized Engineering Services</h2>
            <p className="font-body-md text-body-md text-secondary max-w-2xl mx-auto">
              Our technicians utilize advanced diagnostic tools and genuine components to ensure your hardware operates at peak efficiency
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-gutter text-left">
            {/* Service 1: Virus Removal */}
            <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant hover:border-t-2 hover:border-t-[#acedff] hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 flex items-center justify-center bg-tertiary-container text-tertiary-fixed rounded-lg mb-6">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
              </div>
              <h3 className="font-h3 text-h3 mb-3">Virus Removal</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6 h-24">
                Deep system scrubbing, malware extraction, and security hardening to protect your data integrity
              </p>
              <a href="#service-form" className="w-full py-3 bg-primary text-white font-bold rounded hover:bg-slate-800 transition-colors inline-block text-center">Book Now</a>
            </div>

            {/* Service 2: Hardware Upgrades */}
            <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant hover:border-t-2 hover:border-t-[#acedff] hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 flex items-center justify-center bg-tertiary-container text-tertiary-fixed rounded-lg mb-6">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>memory</span>
              </div>
              <h3 className="font-h3 text-h3 mb-3">Hardware Upgrades</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6 h-24">
                Enhance performance with NVMe SSDs, high-frequency RAM, and next-gen GPU integrations
              </p>
              <a href="#service-form" className="w-full py-3 border border-outline text-primary font-bold rounded hover:bg-surface-container transition-colors inline-block text-center">Get a Quote</a>
            </div>

            {/* Service 3: Screen Repairs */}
            <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant hover:border-t-2 hover:border-t-[#acedff] hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 flex items-center justify-center bg-tertiary-container text-tertiary-fixed rounded-lg mb-6">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>monitor</span>
              </div>
              <h3 className="font-h3 text-h3 mb-3">Screen Repairs</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6 h-24">
                Precision replacement for laptop and monitor panels using original manufacturer grade components
              </p>
              <a href="#service-form" className="w-full py-3 bg-primary text-white font-bold rounded hover:bg-slate-800 transition-colors inline-block text-center">Book Now</a>
            </div>

            {/* Service 4: Custom PC Builds */}
            <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant hover:border-t-2 hover:border-t-[#acedff] hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 flex items-center justify-center bg-tertiary-container text-tertiary-fixed rounded-lg mb-6">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>developer_board</span>
              </div>
              <h3 className="font-h3 text-h3 mb-3">Custom PC Builds</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6 h-24">
                Bespoke system architecture tailored for high-performance gaming or intensive workstations
              </p>
              <a href="#service-form" className="w-full py-3 border border-outline text-primary font-bold rounded hover:bg-surface-container transition-colors inline-block text-center">Get a Quote</a>
            </div>
          </div>
        </section>

        {/* Asymmetric Info/Form Section */}
        <section className="bg-surface-container py-24">
          <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-12 gap-12 text-left">
            <div className="lg:col-span-5">
              <h2 className="font-h2 text-h2 text-primary mb-6">Technical Consultation</h2>
              <p className="font-body-lg text-body-lg text-secondary mb-8">
                Not sure what you need? Our engineers are available for specialized consultations to diagnose complex system failures or plan your next infrastructure upgrade
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-tertiary-fixed-dim mt-1">check_circle</span>
                  <div>
                    <h4 className="font-bold text-primary">Certified Technicians</h4>
                    <p className="text-sm text-secondary">A+ and vendor-specific certifications across all hardware tiers</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-tertiary-fixed-dim mt-1">check_circle</span>
                  <div>
                    <h4 className="font-bold text-primary">48-Hour Turnaround</h4>
                    <p className="text-sm text-secondary">Expedited logistics for standard hardware and screen repairs</p>
                  </div>
                </div>
              </div>
              <div className="mt-12 p-8 bg-white rounded-xl shadow-sm border border-outline-variant">
                <div className="flex items-center gap-4 mb-4">
                  <span className="material-symbols-outlined text-tertiary-fixed-dim">verified</span>
                  <span className="text-label-sm font-label-sm uppercase tracking-widest text-secondary">Authorized Partner</span>
                </div>
                <p className="font-body-md italic text-on-surface-variant">
                  "Spire Technologies transformed our rendering farm's uptime with their specialized maintenance protocols. Highly recommended for enterprise hardware support"
                </p>
              </div>
            </div>

            <div id="service-form" className="lg:col-span-7 bg-white p-10 rounded-2xl shadow-xl border border-outline-variant">
              <h3 className="font-h3 text-h3 mb-8">Service Inquiry Form</h3>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                <div className="col-span-1">
                  <label className="block text-label-sm font-label-sm mb-2 text-secondary">Full Name</label>
                  <input 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-surface-bright border border-outline-variant rounded-lg p-3 focus:ring-2 focus:ring-tertiary-fixed-dim outline-none transition-all" 
                    placeholder="John Doe" 
                    type="text" 
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-label-sm font-label-sm mb-2 text-secondary">Email Address</label>
                  <input 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-surface-bright border border-outline-variant rounded-lg p-3 focus:ring-2 focus:ring-tertiary-fixed-dim outline-none transition-all" 
                    placeholder="john@company.com" 
                    type="email" 
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-label-sm font-label-sm mb-2 text-secondary">Service Type</label>
                  <select 
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    className="w-full bg-surface-bright border border-outline-variant rounded-lg p-3 focus:ring-2 focus:ring-tertiary-fixed-dim outline-none transition-all"
                  >
                    <option>Custom PC Build</option>
                    <option>Hardware Repair</option>
                    <option>Software / Security Optimization</option>
                    <option>Screen Replacement</option>
                    <option>Other Inquiry</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-label-sm font-label-sm mb-2 text-secondary">Description of Issue</label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-surface-bright border border-outline-variant rounded-lg p-3 focus:ring-2 focus:ring-tertiary-fixed-dim outline-none transition-all" 
                    placeholder="Please provide technical details..." 
                    rows="4"
                  ></textarea>
                </div>
                <div className="col-span-2">
                  <button className="w-full py-4 bg-primary text-white font-bold rounded-lg shadow-lg hover:scale-[1.02] active:scale-95 transition-all" type="submit">
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 max-w-[1000px] mx-auto px-6 text-left">
          <h2 className="font-h2 text-h2 text-primary mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "How long does a typical hardware repair take?",
                a: "Most standard repairs like screen replacements or RAM upgrades are completed within 48 to 72 hours, depending on component availability. For custom builds or enterprise server maintenance, timelines are discussed during the initial consultation"
              },
              {
                q: "Do you offer warranties on your service work?",
                a: "Yes, all hardware services come with a standard 90-day warranty on labor and manufacturer-specific warranties on any installed components. Custom PC builds include a 1-year service support plan"
              },
              {
                q: "Can you build a PC for specific engineering software?",
                a: "Absolutely. We specialize in tailoring hardware configurations for resource-intensive applications such as CAD, 3D rendering engines, and machine learning environments to ensure zero bottlenecks"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl border border-outline-variant overflow-hidden">
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-6 cursor-pointer hover:bg-surface-container transition-colors text-left"
                >
                  <span className="font-h3 text-[18px] text-primary">{item.q}</span>
                  <span className={`material-symbols-outlined transition-transform ${openFaq === index ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 text-on-surface-variant font-body-md animate-in fade-in slide-in-from-top-1">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}