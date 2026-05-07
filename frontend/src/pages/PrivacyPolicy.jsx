import React from 'react';
import { Shield, Eye, Lock, Globe } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50 dark:bg-black font-['Space_Grotesk']">
      <div className="max-w-[900px] mx-auto px-6">
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">Privacy Policy</h1>
          <p className="text-xl text-slate-500 dark:text-slate-400">Last updated: May 6, 2024</p>
        </div>

        <div className="grid gap-12">
          {/* Section 1 */}
          <section className="bg-white dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-xl shadow-slate-200/50 dark:shadow-none transition-all hover:border-cyan-500/50 group">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                <Shield size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Introduction</h2>
            </div>
            <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>Welcome to Spire Technologies. We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.</p>
              <p>By using Spire Technologies, you agree to the collection and use of information in accordance with this policy.</p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-white dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-xl shadow-slate-200/50 dark:shadow-none transition-all hover:border-purple-500/50 group">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                <Eye size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Information We Collect</h2>
            </div>
            <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>We collect several types of information for various purposes to provide and improve our service to you:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personal Data:</strong> Name, email address, phone number, and shipping address when you create an account or place an order.</li>
                <li><strong>Usage Data:</strong> Information on how you access and use the Service, including your IP address, browser type, and version.</li>
                <li><strong>Cookies:</strong> We use cookies and similar tracking technologies to track activity on our Service and hold certain information.</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-white dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-xl shadow-slate-200/50 dark:shadow-none transition-all hover:border-emerald-500/50 group">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                <Lock size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Data Security</h2>
            </div>
            <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure.</p>
              <p>We strive to use commercially acceptable means to protect your Personal Data, including AES-256 encryption and regular security audits by independent third parties.</p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="bg-white dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-xl shadow-slate-200/50 dark:shadow-none transition-all hover:border-amber-500/50 group">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                <Globe size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">GDPR & International Rights</h2>
            </div>
            <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>If you are a resident of the European Economic Area (EEA), you have certain data protection rights. Spire Technologies aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.</p>
              <p>You have the right to access, update or delete the information we have on you, the right of rectification, the right to object, and the right of data portability.</p>
            </div>
          </section>
        </div>

        <div className="mt-20 p-12 rounded-3xl bg-gradient-to-br from-cyan-600 to-blue-700 text-white text-center shadow-2xl overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 transition-transform group-hover:scale-110 duration-700"></div>
          <h3 className="text-3xl font-bold mb-4 relative z-10">Have questions about your privacy?</h3>
          <p className="text-cyan-100 mb-8 max-w-lg mx-auto relative z-10 text-lg">Our data protection officer is available to answer any concerns you might have regarding our data practices.</p>
          <a href="mailto:spiretechcare@gmail.com" className="inline-block bg-white text-blue-700 px-10 py-4 rounded-xl font-bold hover:bg-cyan-50 transition-colors shadow-lg relative z-10">Contact Privacy Team</a>
        </div>
      </div>
    </div>
  );
}
