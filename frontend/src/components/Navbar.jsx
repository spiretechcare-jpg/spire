import { useState } from 'react'; // Add useState
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react'; // Add Menu and X
import { useAppContext } from '../context/AppContext';

export default function Navbar() {
  const location = useLocation();
  const { user, cartItemCount } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  const getLinkClasses = (path) => {
    const isActive = location.pathname === path || (path.startsWith('/products') && location.pathname.startsWith('/products'));
    return isActive
      ? "text-cyan-600 dark:text-cyan-400 font-semibold border-b-2 border-cyan-600 md:border-b-2 pb-1"
      : "text-slate-600 dark:text-slate-400 font-medium hover:text-cyan-500 transition-all duration-200";
  };

  const navLinks = [
    { name: 'Products', path: '/products' },
    { name: 'Builder', path: '/builder' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <nav className="max-w-[1280px] mx-auto flex justify-between items-center px-6 h-20 font-['Space_Grotesk']">
        
    <Link to="/" className="flex items-center gap-2 group">
  <img 
    src="/logo.png" 
    alt="SPIRE Logo" 
    className="w-10 h-10 object-cover rounded-lg border border-slate-200 dark:border-slate-800 group-hover:scale-105 transition-transform"
  />
  <span className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-slate-50">
    SPIRE TECHNOLOGIES
  </span>
</Link>

        {/* Desktop Links (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className={getLinkClasses(link.path)}>
              {link.name}
            </Link>
          ))}
        </div>

        {/* Icons & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative p-2 text-slate-900 dark:text-slate-50">
            <ShoppingCart size={24} />
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 bg-cyan-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartItemCount}
              </span>
            )}
          </Link>
          
          <Link to="/profile" className="hidden md:block p-2 text-slate-900 dark:text-slate-50">
            <User size={24} />
          </Link>

          {/* Mobile Menu Button (Shown only on Mobile) */}
          <button 
            className="md:hidden p-2 text-slate-900 dark:text-slate-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-6 py-8 flex flex-col gap-6 animate-in slide-in-from-top">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className="text-lg font-medium text-slate-900 dark:text-slate-50"
              onClick={() => setIsMenuOpen(false)} // Close menu when link is clicked
            >
              {link.name}
            </Link>
          ))}
          <Link to="/profile" className="text-lg font-medium text-cyan-600" onClick={() => setIsMenuOpen(false)}>
            My Profile
          </Link>
        </div>
      )}
    </header>
  );
}
