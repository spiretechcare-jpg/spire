import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Navbar() {
  const location = useLocation();
  const { user, cartItemCount } = useAppContext();

  const getLinkClasses = (path) => {
    const isActive = location.pathname === path || (path.startsWith('/products') && location.pathname.startsWith('/products'));
    
    return isActive
      ? "text-cyan-600 dark:text-cyan-400 font-semibold border-b-2 border-cyan-600 dark:border-cyan-400 pb-1"
      : "text-slate-600 dark:text-slate-400 font-medium hover:text-cyan-500 transition-all duration-200";
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <nav className="max-w-[1280px] mx-auto flex justify-between items-center px-6 h-20 font-['Space_Grotesk'] antialiased tracking-tight">
        <Link to="/" className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-slate-50">
          Spire Technologies
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={getLinkClasses('/')}>Home</Link>
          <Link to="/products" className={getLinkClasses('/products')}>Products</Link>
          <Link to="/builder" className={getLinkClasses('/builder')}>Builder</Link>
          <Link to="/services" className={getLinkClasses('/services')}>Services</Link>
          <Link to="/about" className={getLinkClasses('/about')}>About</Link>
          <Link to="/contact" className={getLinkClasses('/contact')}>Contact</Link>
          
        </div>
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative p-2 text-slate-900 dark:text-slate-50 hover:text-cyan-500 transition-transform active:scale-95">
            <ShoppingCart size={24} />
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 bg-cyan-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full transform translate-x-1 -translate-y-1">
                {cartItemCount}
              </span>
            )}
          </Link>
          <Link to="/profile" className="flex items-center gap-2 p-2 text-slate-900 dark:text-slate-50 hover:text-cyan-500 transition-transform active:scale-95">
            {user ? (
              <div className="w-8 h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold text-sm">
                {user.name.charAt(0).toUpperCase()}
              </div>
            ) : (
              <User size={24} />
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
