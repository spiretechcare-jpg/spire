import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-background text-on-background min-h-screen">
      {/* Header/Nav would typically be a separate component, 
          but content starts from Main below */}
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-32 bg-surface-container-lowest overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-16 relative z-10 text-left">
            <div>
              <span className="font-label-sm text-label-sm text-on-tertiary-container bg-tertiary-fixed px-3 py-1 rounded-full mb-6 inline-block uppercase tracking-widest">
                Our Mission
              </span>
              <h1 className="font-h1 text-h1 text-on-surface mb-6">Pioneering Technical Precision</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                We bridge the gap between complex engineering challenges and seamless technological solutions,
                ensuring every infrastructure we touch operates with absolute reliability.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square bg-slate-200 rounded-xl overflow-hidden shadow-2xl">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcuCsxDPg0_aIJC97j0uK_lLBxagV7drXJ-D1k5LA3KmZWpb5wB1OHLxCSlaRgy4DK3mSpc-D41gFWx9Ivw1ac_EMuqsQ8Ot0o5utDs9Kb0JSpK1aWgAuKvOS1HhHagzzUtNMy2NRp3UX44JURkx4FaCkeTKzkOrjhg1Pvh48StR_M8yxrz60Li_Rcj4qdYGcb4S9ZpcwqxGlRPDqOlTAtBMD05KL13jV3PoSvOntRPRllBro3umpZ764h-Cu4TU9iqBoIl2uTPt4"
                  alt="Technical engineering laboratory"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-on-tertiary-container text-white p-8 rounded shadow-xl hidden md:block">
                <div className="text-4xl font-h2 mb-1">15+</div>
                <div className="font-label-sm text-label-sm uppercase opacity-80">Years of Innovation</div>
              </div>
            </div>
          </div>
        </section>

        {/* History Section */}
        <section className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-16 items-start text-left">
              <div className="md:w-1/3 sticky top-24">
                <h2 className="font-h2 text-h2 text-on-surface mb-4">A Legacy of Excellence</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Founded in 2009, Spire Technologies started as a niche hardware consultancy and evolved into a global leader in enterprise technical solutions.
                </p>
              </div>
              <div className="md:w-2/3 space-y-12">
                {/* 2009 */}
                <div className="flex gap-8 group">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border-2 border-on-tertiary-container flex items-center justify-center text-on-tertiary-container font-bold shrink-0">2009</div>
                    <div className="w-px grow bg-outline-variant mt-4"></div>
                  </div>
                  <div className="pb-12">
                    <h3 className="font-h3 text-h3 mb-2">Foundation</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">Established in the heart of the tech corridor with a focus on high-reliability server maintenance for regional data centers.</p>
                  </div>
                </div>
                {/* 2015 */}
                <div className="flex gap-8 group">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border-2 border-on-tertiary-container flex items-center justify-center text-on-tertiary-container font-bold shrink-0">2015</div>
                    <div className="w-px grow bg-outline-variant mt-4"></div>
                  </div>
                  <div className="pb-12">
                    <h3 className="font-h3 text-h3 mb-2">Global Expansion</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">Scaled operations to three continents, introducing our proprietary engineering-first diagnostic framework to the enterprise market.</p>
                  </div>
                </div>
                {/* 2024 */}
                <div className="flex gap-8 group">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border-2 border-on-tertiary-container flex items-center justify-center text-on-tertiary-container font-bold shrink-0">2024</div>
                  </div>
                  <div>
                    <h3 className="font-h3 text-h3 mb-2">Technical Leadership</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">Now serving over 500 Fortune 1000 clients with a team of 1,200+ certified specialists across specialized technical domains.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise Section - Bento Grid */}
        <section className="py-24 bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-h2 text-h2 text-on-surface mb-4">Our Expertise</h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">Superior technical capability is at the core of every service we deliver, backed by industry-standard certifications.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px] text-left">
              {/* Engineering Card */}
              <div className="md:col-span-8 bg-surface-container-lowest p-10 rounded-xl flex flex-col justify-between border border-outline-variant hover:border-on-tertiary-container transition-all group overflow-hidden relative">
                <div className="relative z-10">
                  <span className="material-symbols-outlined text-4xl text-on-tertiary-container mb-6">engineering</span>
                  <h3 className="font-h2 text-h2 mb-4">Engineering-First Approach</h3>
                  <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">We don't just repair; we re-engineer. Our methodologies are rooted in structural integrity and long-term hardware sustainability.</p>
                </div>
                <div className="absolute right-0 bottom-0 opacity-10 group-hover:scale-110 transition-transform duration-500">
                  <span className="material-symbols-outlined text-[300px]" style={{ fontVariationSettings: "'FILL' 1" }}>architecture</span>
                </div>
              </div>
              {/* Technicians Card */}
              <div className="md:col-span-4 bg-primary text-on-primary p-10 rounded-xl flex flex-col justify-center border border-primary">
                <h3 className="font-h2 text-h2 mb-6">100% Certified Technicians</h3>
                <p className="font-body-md text-body-md opacity-80 mb-8">Every team member holds Tier-1 certifications from leading hardware manufacturers and engineering bodies.</p>
                <div className="flex flex-wrap gap-3">
                  {['ISO 9001', 'CompTIA A+', 'Cisco CCNA'].map((cert) => (
                    <span key={cert} className="bg-white/10 px-3 py-1 rounded text-xs font-label-sm uppercase tracking-wider">{cert}</span>
                  ))}
                </div>
              </div>
              {/* Precision Card */}
              <div className="md:col-span-4 bg-surface-container-highest p-8 rounded-xl border border-outline-variant hover:shadow-lg transition-all">
                <span className="material-symbols-outlined text-3xl text-primary mb-4">precision_manufacturing</span>
                <h4 className="font-h3 text-h3 mb-2">Micro-Precision</h4>
                <p className="font-body-md text-body-md text-on-surface-variant">Diagnostics performed at the component level to identify failures before they become critical.</p>
              </div>
              {/* Reliability Card */}
              <div className="md:col-span-4 bg-tertiary-fixed p-8 rounded-xl border border-outline-variant hover:shadow-lg transition-all">
                <span className="material-symbols-outlined text-3xl text-on-tertiary-fixed-variant mb-4">verified_user</span>
                <h4 className="font-h3 text-h3 mb-2 text-on-tertiary-fixed">99.9% Reliability</h4>
                <p className="font-body-md text-body-md text-on-tertiary-fixed-variant">Our service history maintains a near-perfect uptime record for enterprise infrastructure.</p>
              </div>
              {/* Support Card */}
              <div className="md:col-span-4 bg-surface-container-lowest p-8 rounded-xl border border-outline-variant hover:shadow-lg transition-all">
                <span className="material-symbols-outlined text-3xl text-primary mb-4">support_agent</span>
                <h4 className="font-h3 text-h3 mb-2">Expert Consultation</h4>
                <p className="font-body-md text-body-md text-on-surface-variant">Direct access to lead engineers for complex troubleshooting and architectural planning.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-6 text-left">
            <div className="mb-16">
              <h2 className="font-h2 text-h2 text-on-surface mb-4">Meet the Leadership</h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">Visionaries with decades of experience in high-performance computing and enterprise systems management.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Leader Template */}
              {[
                {
                  name: "Marcus Thorne",
                  role: "Chief Executive Officer",
                  desc: "Former Lead Architect at Apex Systems with 20 years in hardware innovation.",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHvjJlmd-IL1UehGlkPRIwUMYgs2N8EykO4ZQJ98pCFhczOYCX44XMcFPJoxlLmdXTg-A8mAyZeGX1LDZMsCnOkiB8Pf461iOFC4zCclcS2_kNd_6sn6RT9aOkGwjVYCBEWI4RWD5PS9RC6RbdsJtTjIUit2Oq55NcH0JG4dzGhs5vroj4tlEdpvUABpH6oRg81puQagEilpjHZmTcm7_ikUAzniwxJa6EYUVwN5x39wBXIQIGvxZZYvj-ysRezvNzfYQ0riK6dTU"
                },
                {
                  name: "Dr. Elena Chen",
                  role: "Chief Technical Officer",
                  desc: "PhD in Quantum Computing Infrastructure; pioneer in resilient network systems.",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBvUvXP0M_Zf3_69OYztF_OR9g8Qn5j5Qrx6TNlvVWUwWsy4hwEk1SyCpBsoAaIOa5Wpmb-78que0Ned6PkUVvLkAQlBQJ9V7B3WWgpCAl_wPtwOqB2Ghp1iBHRmQMvbyTPpoUukbt92E0jiIRVvY5IAAfxbb-4ZZkYtk8xWDtHkJhH9Hvhns3HS4ca8n3jW6XWXFap3aK0N9t1VYmtjetEYNLuGwQ4CBmIO3TJwXHqVZWXdUxFz2dI9G7HX5QjohAWHd0_2zjHrWw"
                },
                {
                  name: "Robert Vance",
                  role: "VP of Operations",
                  desc: "Operations specialist focused on global logistics and field engineering efficiency.",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBK4WErVIRSrMfSyIcYxCaAKp-uzv1QX8QKxMeXgUQNVwmS2CFjfkhNlaHE4r0z8d-eVzjRY0h81Pq1utQuKBEhaz7H9g2i9vIHahnK7OgDz-6VQKq8ddMzKGqelhX7xH9QTnBNrRtSvA-f73fhGJ9xlKk3FBrwj-91Z90f87Y-iuqtc8e4qI5RbcNkIHJZ996UP8r_VRmxA9pt1Lnwguzoav_JDDrKjbpZFxTMx5EF5Kh0C21azobZGeY9oY-pbtK4ChPt9rZEYGU"
                },
                {
                  name: "Sarah Jenkins",
                  role: "Head of Service Quality",
                  desc: "Ensuring every technical intervention meets our 10-point precision standard.",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCX-zNHJiX92at4a2h8tAY3koqrCpvSnSjPWc-nqQlQEsM5xFkkEJBiTtcHe9Fk6GGxfCqO519UwKdfk169au5O2y012K5lSslVsJeMY7rjHialSujXBR7lcrR16d1C5tMnDAs9aqKy4V_HVJht4rnI-8E7m38mNPTcwy56Qsc-QzCJsvbtkXNIhPjQefUD-MXy2Cx57l_mPXdUUupJebcqNu4o_DUXsW0a8JrLXpratBwNengXAyi4tcK9M_wSpgaYNl6k6IwM-qc"
                }
              ].map((leader) => (
                <div key={leader.name} className="group">
                  <div className="aspect-[3/4] bg-slate-100 rounded-lg overflow-hidden mb-4 relative">
                    <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" src={leader.img} alt={leader.name} />
                  </div>
                  <h4 className="font-h3 text-h3 mb-1">{leader.name}</h4>
                  <p className="font-label-sm text-label-sm text-on-tertiary-container uppercase tracking-wider mb-2">{leader.role}</p>
                  <p className="font-body-md text-body-md text-on-surface-variant">{leader.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 bg-primary text-on-primary text-center">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-h2 text-h2 mb-6">Experience Technical Excellence</h2>
            <p className="font-body-lg text-body-lg opacity-80 mb-10 max-w-2xl mx-auto">
              Partner with a team that values precision as much as you value performance. Let's engineer your future today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact" className="px-8 py-4 bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm rounded uppercase tracking-widest hover:opacity-90 transition-all inline-block">
                Get in Touch
              </Link>
              <button 
                onClick={() => alert("Technical Brochure is being generated. Please check back soon!")}
                className="px-8 py-4 border border-white/30 text-white font-label-sm text-label-sm rounded uppercase tracking-widest hover:bg-white/10 transition-all"
              >
                Download Brochure
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;