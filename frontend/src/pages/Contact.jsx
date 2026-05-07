import React, { useState } from 'react';

export default function Contact() {
  // State to manage form data[cite: 1, 2]
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });

  // Handle input changes[cite: 1, 2]
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission to WhatsApp[cite: 1, 2]
  const handleSubmit = (e) => {
    e.preventDefault();

    const phoneNumber = "918883195777"; // Spire Technologies HQ Contact
    const whatsappMessage = `*New Contact Inquiry*%0A%0A` +
      `*Full Name:* ${formData.fullName}%0A` +
      `*Email:* ${formData.email}%0A` +
      `*Subject:* ${formData.subject}%0A` +
      `*Message:* ${formData.message}`;

    // Opens WhatsApp in a new tab with pre-filled details[cite: 1]
    window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage}`, '_blank');
  };

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen">
      {/* Main Content */}
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Hero Header Section */}
          <section className="mb-16 text-center md:text-left">
            <div className="inline-block px-3 py-1 rounded bg-secondary-container text-on-secondary-container font-label-sm mb-6">
              CONTACT SUPPORT
            </div>
            <h1 className="font-h1 text-h1 text-primary mb-6">Get in Touch</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Whether you're seeking enterprise solutions or technical assistance, Spire Technologies is here to ensure your technical excellence.
            </p>
          </section>

          {/* Main Layout: Bento Grid Style */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            
            {/* Contact Form Section (Left side/Main) */}
            <div className="lg:col-span-7 bg-surface-container-lowest p-8 md:p-12 rounded-xl border border-outline-variant shadow-[0_4px_12px_rgba(19,27,46,0.05)] transition-all duration-200 hover:shadow-[0_12px_24px_rgba(19,27,46,0.08)] hover:border-t-[#0090a9]">
              <h2 className="font-h3 text-h3 mb-8 text-primary">Inquiry Form</h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 text-left">
                    <label className="font-label-sm text-on-surface-variant">FULL NAME</label>
                    <input 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-surface border border-outline-variant focus:border-on-tertiary-container focus:ring-1 focus:ring-on-tertiary-container rounded p-3 text-on-surface placeholder:text-outline outline-none transition-all" 
                      placeholder="John Doe" 
                      type="text"
                    />
                  </div>
                  <div className="space-y-2 text-left">
                    <label className="font-label-sm text-on-surface-variant">EMAIL ADDRESS</label>
                    <input 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-surface border border-outline-variant focus:border-on-tertiary-container focus:ring-1 focus:ring-on-tertiary-container rounded p-3 text-on-surface placeholder:text-outline outline-none transition-all" 
                      placeholder="john@spire-tech.com" 
                      type="email"
                    />
                  </div>
                </div>
                <div className="space-y-2 text-left">
                  <label className="font-label-sm text-on-surface-variant">SUBJECT</label>
                  <input 
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-surface border border-outline-variant focus:border-on-tertiary-container focus:ring-1 focus:ring-on-tertiary-container rounded p-3 text-on-surface placeholder:text-outline outline-none transition-all" 
                    placeholder="Technical Specification Inquiry" 
                    type="text"
                  />
                </div>
                <div className="space-y-2 text-left">
                  <label className="font-label-sm text-on-surface-variant">MESSAGE</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-surface border border-outline-variant focus:border-on-tertiary-container focus:ring-1 focus:ring-on-tertiary-container rounded p-3 text-on-surface placeholder:text-outline outline-none transition-all" 
                    placeholder="Describe your technical requirements..." 
                    rows="6"
                  ></textarea>
                </div>
                <button className="bg-primary text-on-primary px-8 py-4 rounded-lg font-label-sm flex items-center justify-center space-x-2 hover:bg-on-primary-container transition-all w-full md:w-auto" type="submit">
                  <span>SUBMIT REQUEST</span>
                  <span className="material-symbols-outlined text-sm">send</span>
                </button>
              </form>
            </div>

            {/* Sidebar Information (Right side) */}
            <div className="lg:col-span-5 space-y-gutter">
              <div className="bg-primary-container text-white p-8 rounded-xl shadow-[0_4px_12px_rgba(19,27,46,0.05)] transition-all duration-200 hover:shadow-[0_12px_24px_rgba(19,27,46,0.08)] hover:border-t-[#0090a9] text-left">
                <h3 className="font-h3 text-h3 mb-6 text-tertiary-fixed">HQ Contact Detail</h3>
                <ul className="space-y-6">
                  <li className="flex items-start space-x-4">
                    <span className="material-symbols-outlined text-tertiary-fixed mt-1">location_on</span>
                    <div>
                      <p className="font-label-sm text-on-primary-container">OFFICE ADDRESS</p>
                      <p className="font-body-md">28/8 Sivasakthi Complex, opp to KCT Tech Park<br/>Saravanampatti, CBE 641035</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-4">
                    <span className="material-symbols-outlined text-tertiary-fixed mt-1">call</span>
                    <div>
                      <p className="font-label-sm text-on-primary-container">PHONE SYSTEMS</p>
                      <p className="font-body-md">+91 8883195777</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-4">
                    <span className="material-symbols-outlined text-tertiary-fixed mt-1">mail</span>
                    <div>
                      <p className="font-label-sm text-on-primary-container">TECHNICAL INQUIRIES</p>
                      <p className="font-body-md">spiretechcare@gmail.com</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Availability Card */}
              <div className="bg-surface-container-high p-8 rounded-xl border border-outline-variant shadow-[0_4px_12px_rgba(19,27,46,0.05)] transition-all duration-200 hover:shadow-[0_12px_24px_rgba(19,27,46,0.08)] hover:border-t-[#0090a9] text-left">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="flex h-3 w-3 rounded-full bg-green-500"></span>
                  <span className="font-label-sm text-on-surface">TECHNICAL SUPPORT ACTIVE</span>
                </div>
                <h3 className="font-h3 text-h3 mb-4 text-primary">Support Hours</h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-outline-variant pb-2">
                    <span className="text-on-surface-variant">Monday - Friday</span>
                    <span className="font-semibold">10:00 - 21:00 PST</span>
                  </div>
                  <div className="flex justify-between border-b border-outline-variant pb-2">
                    <span className="text-on-surface-variant">Saturday</span>
                    <span className="font-semibold">10:30 - 20:00 PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Sunday</span>
                    <span className="text-error font-semibold">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <section className="mt-gutter overflow-hidden rounded-xl border border-outline-variant shadow-[0_4px_12px_rgba(19,27,46,0.05)] h-[400px] relative group text-left">
            <img 
              className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwruDFoaRkGeFAl5WEOB1TbBpd6a_hiVWjJn8huRBiztYhsgy6pusFVaSSleR6GiyEXbq0zyUzEBdupfYLSdqbCjLSjJWRn4ksXnAl-DjRTGDrLSUtYzAT-nVawD4hNTrkdOM-gEx4MsEoVxFDGy7s_Gi7c_dRAFbIDbny-5eO-L2LN4SmzURzWw_E1w5smwhOhkb6_kENLmcb7usWQFx1NIowm8FFTBu3RH4faGfmToKcf0lDx6rTtysg2DzV2S-QTj89vaQMiQE" 
              alt="Map location"
            />
            <div className="absolute inset-0 bg-primary/20 pointer-events-none"></div>
            <div className="absolute bottom-8 left-8 bg-surface-container-lowest p-6 rounded-lg shadow-xl max-w-sm border-l-4 border-on-tertiary-container">
              <p className="font-label-sm text-on-tertiary-container mb-2">SPIRE TECHNOLOGIES CAMPUS</p>
              <p className="font-body-md text-on-surface mb-4">Visit our research and development facility.</p>
              <a 
                href="https://maps.app.goo.gl/fNCUqnapM34he6cf9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-on-tertiary-container font-semibold hover:underline"
              >
                <span>Get Directions</span>
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}