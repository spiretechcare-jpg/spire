import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-black w-full border-t border-slate-800 text-slate-100 font-['Space_Grotesk'] text-sm tracking-wide">
      <div className="max-w-[1280px] mx-auto py-16 px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-4">
          <span className="text-xl font-bold text-cyan-400 uppercase tracking-widest">Spire Technologies</span>
          <p className="text-slate-400 max-w-sm text-center md:text-left">© 2024 Spire Technologies. Built for Technical Precision.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <Link to="/privacy" className="text-slate-400 hover:text-white hover:underline transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="text-slate-400 hover:text-white hover:underline transition-colors">Terms of Service</Link>
          <Link to="/shipping-returns" className="text-slate-400 hover:text-white hover:underline transition-colors">Shipping & Returns</Link>
        </div>
      </div>
    </footer>
  );
}
