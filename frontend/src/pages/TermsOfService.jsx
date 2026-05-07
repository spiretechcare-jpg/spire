import React from 'react';
import { FileText, Scale, AlertCircle, HelpCircle } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50 dark:bg-black font-['Space_Grotesk']">
      <div className="max-w-[900px] mx-auto px-6">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <FileText size={16} />
            Legal Agreement
          </div>
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">Terms of Service</h1>
          <p className="text-xl text-slate-500 dark:text-slate-400">Please read these terms carefully before using our platform.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-8 md:p-12 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-sm">1</span>
                Acceptance of Terms
              </h2>
              <div className="text-slate-600 dark:text-slate-400 space-y-4 leading-relaxed">
                <p>By accessing or using the Spire Technologies website (the "Site") and services, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to all of these Terms, do not use our Site or Services.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-sm">2</span>
                User Accounts
              </h2>
              <div className="text-slate-600 dark:text-slate-400 space-y-4 leading-relaxed">
                <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>
                <p>You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-sm">3</span>
                Intellectual Property
              </h2>
              <div className="text-slate-600 dark:text-slate-400 space-y-4 leading-relaxed">
                <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Spire Technologies and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Spire Technologies.</p>
              </div>
            </section>

            <section className="p-6 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-200 dark:border-amber-800/30">
              <h2 className="text-xl font-bold text-amber-900 dark:text-amber-400 mb-3 flex items-center gap-2">
                <AlertCircle size={20} />
                Limitation of Liability
              </h2>
              <p className="text-amber-800/80 dark:text-amber-400/80 text-sm leading-relaxed">
                In no event shall Spire Technologies, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-sm">4</span>
                Governing Law
              </h2>
              <div className="text-slate-600 dark:text-slate-400 space-y-4 leading-relaxed">
                <p>These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>
              </div>
            </section>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800/50 p-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
              <HelpCircle size={24} className="text-cyan-500" />
              <p className="text-sm font-medium">Need clarification on these terms?</p>
            </div>
            <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity">
              Download PDF Version
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
