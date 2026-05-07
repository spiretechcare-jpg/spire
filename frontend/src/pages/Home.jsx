import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="pt-20">
      {/* Hero Section[cite: 11, 12] */}
      <section className="relative h-[819px] flex items-center overflow-hidden bg-primary-container">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover opacity-40" 
            alt="High-end modern computer workstation"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJWAyl9enH5Ey9sNsancv1Tq4SkLbrHPP7Ua9_D0E9RdCVVQ777TltuNsQuqyugT3zBR1pWD3lpW1Gj4LSoZNifQZ-bNT4bDqqj6-cmUn7Bv3PEP17rbK_wgNgXetYfYwAdCaCZbhyoABh8OOKRTf3xxqjIQc5Erd57dk_gBUJbTkQg5zS6fCuhFnXXSH_zVQjz6lCzJzYs2BxZbHzLaqk9KgOeVTUJFLKWvQOKjCTWDPyYa0oQvZG8A9vasId4nu9_rh562DTFUA"
          />
        </div>
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 w-full text-left">
          <div className="max-w-2xl">
            <h1 className="font-h1 text-[48px] font-bold text-white mb-6 leading-[1.2]">
              Engineered for <br /><span className="text-tertiary-fixed-dim">Technical Excellence</span>
            </h1>
            <p className="font-body-lg text-[18px] text-white/80 mb-10 leading-relaxed">
              Spire Technologies delivers high-performance computing hardware and enterprise-grade technical services designed for precision and reliability.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="px-8 py-4 bg-tertiary-fixed-dim text-primary-container font-semibold rounded-lg hover:brightness-110 transition-all shadow-lg inline-block">
                Shop New Arrivals
              </Link>
              <Link to="/services" className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all backdrop-blur-sm inline-block">
                Book a Service
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Solutions Section */}
      <section className="bg-primary-container py-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-tertiary-fixed-dim font-label-sm text-label-sm uppercase tracking-widest block mb-4">Core Competencies</span>
            <h2 className="font-h2 text-[36px] font-bold text-white">Specialized Solutions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-tertiary-fixed-dim mx-auto mb-6">
                <span className="material-symbols-outlined text-3xl">hub</span>
              </div>
              <h3 className="font-h3 text-xl text-white mb-4">Enterprise Networking</h3>
              <p className="text-white/70 font-body-md">Architecting robust, scalable network infrastructures for modern business demands.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-tertiary-fixed-dim mx-auto mb-6">
                <span className="material-symbols-outlined text-3xl">computer</span>
              </div>
              <h3 className="font-h3 text-xl text-white mb-4">Custom Workstations</h3>
              <p className="text-white/70 font-body-md">Tailored hardware configurations optimized for CAD, rendering, and AI development.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-tertiary-fixed-dim mx-auto mb-6">
                <span className="material-symbols-outlined text-3xl">settings_backup_restore</span>
              </div>
              <h3 className="font-h3 text-xl text-white mb-4">Data Recovery</h3>
              <p className="text-white/70 font-body-md">Advanced laboratory services to recover critical data from failed storage arrays.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Spire (Icon Grid) */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 bg-white rounded-xl border border-outline-variant shadow-sm text-center">
              <span className="material-symbols-outlined text-4xl text-tertiary-fixed-variant mb-4">support_agent</span>
              <h4 className="font-bold text-lg mb-2 text-on-surface">24/7 Support</h4>
              <p className="text-on-surface-variant text-sm">Round-the-clock assistance for your mission-critical systems.</p>
            </div>
            <div className="p-8 bg-white rounded-xl border border-outline-variant shadow-sm text-center">
              <span className="material-symbols-outlined text-4xl text-tertiary-fixed-variant mb-4">verified</span>
              <h4 className="font-bold text-lg mb-2 text-on-surface">Certified Engineers</h4>
              <p className="text-on-surface-variant text-sm">Every technician is manufacturer-trained and certified.</p>
            </div>
            <div className="p-8 bg-white rounded-xl border border-outline-variant shadow-sm text-center">
              <span className="material-symbols-outlined text-4xl text-tertiary-fixed-variant mb-4">inventory_2</span>
              <h4 className="font-bold text-lg mb-2 text-on-surface">Genuine Parts</h4>
              <p className="text-on-surface-variant text-sm">We only use original equipment manufacturer components.</p>
            </div>
            <div className="p-8 bg-white rounded-xl border border-outline-variant shadow-sm text-center">
              <span className="material-symbols-outlined text-4xl text-tertiary-fixed-variant mb-4">bolt</span>
              <h4 className="font-bold text-lg mb-2 text-on-surface">Fast Turnaround</h4>
              <p className="text-on-surface-variant text-sm">Industry-leading repair and deployment timelines.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Excellence Section[cite: 11, 12] */}
      <section className="bg-surface-container-low py-24 border-y border-outline-variant">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-tertiary-fixed-dim/20 rounded-full blur-3xl"></div>
              <img 
                className="relative z-10 rounded-2xl shadow-xl grayscale-[50%]" 
                alt="Focused technician in lab"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-sLE3emkXwknZf_22FRurxx5sPsJVV0mMYNF9nfGqCdhsiotaaH-wj3g7HB7IkHKcVqCj41gZ7ZsO1MyDC7J0oh_3DBaq5rX8fnYjTI4k-Qi-VcnP511MQmJGCSwFgP8YR4M4tcVZFF96dSQRq9N8OYng4cjh8ZYyCHesz1UU1WuVSybYwIc-JgRaF2wHXyjyEyYn7HO0hRktX9jTBehu2LpcvI_OOU5vDbs0ooGkIYYtJiHFgP1YgG0yVgJTg6Qr6EwbaDdVkkA"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary-container p-6 rounded-lg text-white z-20 shadow-lg text-left">
                <p className="font-h2 text-[36px] font-bold mb-1">15+</p>
                <p className="font-label-sm text-xs opacity-70">Years of Technical Mastery</p>
              </div>
            </div>
            <div className="text-left">
              <span className="text-tertiary-fixed-variant font-semibold text-[14px] uppercase tracking-widest block mb-4">Engineering First</span>
              <h2 className="font-h2 text-[36px] font-semibold text-on-surface mb-6 leading-tight">
                Why the World Trusts <br />Spire Technologies
              </h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-tertiary-fixed-variant shadow-sm shrink-0">
                    <span className="material-symbols-outlined">memory</span>
                  </div>
                  <div>
                    <h4 className="font-h3 text-lg font-semibold mb-2">Certified Technicians</h4>
                    <p className="text-on-surface-variant font-body-md">Our team holds elite certifications from Apple, Microsoft, and Cisco, ensuring every repair meets manufacturer specifications.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-tertiary-fixed-variant shadow-sm shrink-0">
                    <span className="material-symbols-outlined">speed</span>
                  </div>
                  <div>
                    <h4 className="font-h3 text-lg font-semibold mb-2">Rapid Deployment</h4>
                    <p className="text-on-surface-variant font-body-md">We prioritize efficiency. 90% of hardware sales and basic repairs are fulfilled within 24 hours.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-tertiary-fixed-variant shadow-sm shrink-0">
                    <span className="material-symbols-outlined">security</span>
                  </div>
                  <div>
                    <h4 className="font-h3 text-lg font-semibold mb-2">Enterprise Grade Security</h4>
                    <p className="text-on-surface-variant font-body-md">Your data integrity is our priority. We employ military-grade encryption and wiping protocols for all devices.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Reviews Section */}
      <section className="py-24 max-w-[1280px] mx-auto px-6 text-left">
        <div className="text-center mb-16">
          <h2 className="font-h2 text-[36px] font-bold text-on-surface mb-4">Trusted by the Community</h2>
          <p className="text-on-surface-variant font-body-lg max-w-2xl mx-auto">See why local businesses and tech enthusiasts rely on our technical precision for their hardware needs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Review Card 1 */}
          <div className="bg-white p-8 rounded-xl border border-outline-variant shadow-sm flex flex-col">
            <div className="flex text-yellow-500 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
            </div>
            <p className="italic text-on-surface font-body-md mb-8">"Spire rescued my design firm after a major server failure. Their technician was onsite within an hour. Truly elite service."</p>
            <div className="mt-auto flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-container overflow-hidden">
                <img alt="Marcus Chen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeIfF4UE_EtenfQHbN-2E0zT--XgfrGjnnMEj-x91h9F7jJvtuZLHalmEznai64j0v5Y_Rora3kWpP1aBY50cW8gFd7ZjaBAgUbwqJagPwwSoNTnqHEWa3HzMZRJrcCo23fTBTHhROZGqHaGbFOAKImfA9mIn2V6CJs6AWuXu6f0jV0RcpAi0FMmgwCFJPvjuEsGRnDojq8TGVpWcyZtHBCIxAgD0BmknXh2k2AxPZ8IgqOPMv782VB6LDKFjHR88V1KmeaArtOxw" />
              </div>
              <div><p className="font-bold text-sm">Marcus Chen</p><p className="text-xs text-on-surface-variant">CTO, Vertex Creative</p></div>
            </div>
          </div>
          {/* Review Card 2 */}
          <div className="bg-white p-8 rounded-xl border border-outline-variant shadow-sm flex flex-col">
            <div className="flex text-yellow-500 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
            </div>
            <p className="italic text-on-surface font-body-md mb-8">"I've bought three custom builds from Spire. Their attention to cable management and component synergy is unmatched."</p>
            <div className="mt-auto flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-container overflow-hidden">
                <img alt="Sarah Jenkins" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDg5xu4pXdZbjMkYlnpt99kPyFserWAwCVXSp2mAc-lQvpQqJ3Puh5A6veWwQa7U0ERMZ2wNssVsGKeCjBcfb61571tJVbsVShRIPGe0oJQR80rEoBGNjht4gRVbXtRiFHAUKLhzLZxrzKC8YIPjdzH_atxCCdROE3ZxCa9BcxMRS_pwX0U6CrteBm5RqQ1OhkQ-my34czqo-zSTCR86Xtul5jEoNON2VdIUK6vHNKOeqnqcjfpn4RQIJuCTBa_y352gOkna_Dvhv8" />
              </div>
              <div><p className="font-bold text-sm">Sarah Jenkins</p><p className="text-xs text-on-surface-variant">Senior Dev, CloudScale</p></div>
            </div>
          </div>
          {/* Review Card 3 */}
          <div className="bg-white p-8 rounded-xl border border-outline-variant shadow-sm flex flex-col border-t-4 border-t-tertiary-fixed-dim">
            <div className="flex text-yellow-500 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
            </div>
            <p className="italic text-on-surface font-body-md mb-8">"Their service booking system is flawless. I dropped off my laptop and was notified of completion exactly when promised."</p>
            <div className="mt-auto flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-container overflow-hidden">
                <img alt="Robert Aris" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIaM_AEwCGxwILU06KavG5evyh0uUEqnYB0DqMv2d2-3gkIXmgKKNDpbqGNSAeRG3FaH7qS2KFIoKgBZMTiPWWkmIZyUQtay9drFob2KwSg7wc0MWcOcEWBQf9fJ1QwoFGnBISSpx9D7cxZ81lXHxXGyJnbXCo8sBZm92DWJAhKb3b1VOqFIIctyr8VPeMOH842Soo2jbxW3G0sfgsnX4XPb9CRs63PJjJWnIkZ57qp-YXyTTIoa8OIq9_212pkT61Aykbuw47RAc" />
              </div>
              <div><p className="font-bold text-sm">Robert Aris</p><p className="text-xs text-on-surface-variant">Independent Architect</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section[cite: 11, 12] */}
      <section className="py-24 bg-primary-container text-white overflow-hidden relative">
        <div className="max-w-[1280px] mx-auto px-6 text-center relative z-10">
          <h2 className="font-h1 text-[36px] font-bold mb-6">Ready to elevate your technical infrastructure?</h2>
          <p className="font-body-lg text-[18px] text-white/70 max-w-xl mx-auto mb-10">Whether you're looking for high-performance hardware or expert repair services, Spire Technologies is your partner in precision.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/products" className="px-10 py-4 bg-tertiary-fixed-dim text-primary-container font-bold rounded-lg shadow-xl hover:scale-105 transition-transform inline-block">
              Get Started Today
            </Link>
            <Link to="/contact" className="px-10 py-4 border-2 border-white/20 hover:bg-white/10 font-bold rounded-lg transition-colors inline-block">
              Contact Support
            </Link>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -ml-48 -mb-48"></div>
      </section>
    </div>
  );
}