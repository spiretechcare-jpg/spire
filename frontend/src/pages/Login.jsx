import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, ArrowRight, Terminal } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAppContext();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      if (res.ok) {
        login(data);
        navigate('/profile');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };
  return (
    <main className="flex-grow flex items-center justify-center p-6 relative overflow-hidden bg-background min-h-[calc(100vh-80px-200px)] pt-32 pb-margin technical-grid">
      {/* Background Accents */}
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-tertiary-fixed/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-primary-container/5 blur-[100px] rounded-full"></div>
      
      {/* Login Card */}
      <div className="w-full max-w-[480px] bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden relative z-10 flex flex-col">
        {/* Card Header */}
        <div className="p-10 pb-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-container rounded-lg mb-6 shadow-md">
            <span className="material-symbols-outlined text-white text-3xl">precision_manufacturing</span>
          </div>
          <h1 className="font-h1 text-h2 text-primary mb-2">Spire Technologies</h1>
          <p className="font-body-md text-on-surface-variant">Sign in to your technical control center.</p>
        </div>
        
        {/* Card Body: Form */}
        <div className="px-10 pb-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="bg-error-container text-on-error-container p-3 rounded text-sm font-semibold">{error}</div>}
            {/* Email Field */}
            <div className="space-y-2">
              <label className="font-label-sm text-label-sm text-on-surface-variant block" htmlFor="email">EMAIL ADDRESS</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
                  <Mail size={20} />
                </div>
                <input className="w-full bg-surface-container-low border border-outline-variant focus:border-on-tertiary-container focus:ring-1 focus:ring-on-tertiary-container rounded-lg py-3 pl-11 pr-4 text-on-surface transition-all placeholder:text-outline outline-none" id="email" name="email" placeholder="name@company.com" required type="email" value={formData.email} onChange={handleChange} />
              </div>
            </div>
            
            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-label-sm text-label-sm text-on-surface-variant block" htmlFor="password">PASSWORD</label>
                <button 
                  type="button"
                  onClick={() => alert("Please contact Spire Support at spiretechcare@gmail.com for password recovery.")}
                  className="font-label-sm text-label-sm text-on-tertiary-container hover:underline transition-all"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
                  <Lock size={20} />
                </div>
                <input className="w-full bg-surface-container-low border border-outline-variant focus:border-on-tertiary-container focus:ring-1 focus:ring-on-tertiary-container rounded-lg py-3 pl-11 pr-4 text-on-surface transition-all placeholder:text-outline outline-none" id="password" name="password" placeholder="••••••••" required type="password" value={formData.password} onChange={handleChange} />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-outline hover:text-on-surface transition-colors">
                  <Eye size={20} />
                </div>
              </div>
            </div>
            
            {/* Remember Me */}
            <div className="flex items-center">
              <input className="h-4 w-4 rounded border-outline-variant text-on-tertiary-container focus:ring-on-tertiary-container" id="remember" name="remember" type="checkbox" />
              <label className="ml-2 font-body-md text-label-sm text-on-surface-variant" htmlFor="remember">Remember this workstation</label>
            </div>
            
            {/* Action Button */}
            <button className="w-full bg-primary-container text-white font-h2 text-[18px] py-4 rounded-lg shadow-md hover:bg-on-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-2" type="submit">
              Sign In
              <ArrowRight size={20} />
            </button>
          </form>
          
          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/50"></div>
            </div>
            <div className="relative flex justify-center text-label-sm">
              <span className="bg-surface-container-lowest px-4 text-outline font-label-sm">OR CONTINUE WITH</span>
            </div>
          </div>
          
          {/* Secondary Actions */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => alert("Social login via Google is being integrated. Please use email/password for now.")}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors font-label-sm text-on-surface shadow-sm"
            >
              <img alt="Google Logo" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuyooYKkuA-y7bSDc7bLnl92fn9A-Qc1HdyyGtUcdKGi7Vr_Tr8mhvzCOrQyT7ffq7CArauX940RO00MrEMUfcNP7ADUdstj583iS8XnY3t4oHzWjOGfBogW6lOiUsdljxvwhl3FNqX9HDJvtKJtxwGrXbO1pG3GpTnBjBYK6gbJGFzCw9VLL2AxfIPfhIAc743JqfcIgBbjQYGVzUcx0BwpLxfecEEKy197na1oeE3f7qR85G62uU3Uckq7WHlD-jtrI4LvbTytM" />
              Google
            </button>
            <button 
              onClick={() => alert("Enterprise SSO is available for corporate clients. Please contact your IT administrator.")}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors font-label-sm text-on-surface shadow-sm"
            >
              <Terminal size={20} className="text-black fill-current" />
              SSO
            </button>
          </div>
        </div>
        
        {/* Card Footer */}
        <div className="p-6 bg-surface-container text-center border-t border-outline-variant/30">
          <p className="font-body-md text-on-surface-variant text-sm">
            New to the platform?{' '}
            <Link className="text-on-tertiary-container font-bold hover:underline" to="/signup">Create an account</Link>
          </p>
        </div>
      </div>
      
      {/* Decorative Tech Element (Visual Anchor) */}
      <div className="hidden xl:block absolute bottom-12 right-12 opacity-20 pointer-events-none">
        <div className="flex flex-col items-end">
          <span className="font-h1 text-[120px] leading-none text-on-primary-container/10 select-none">PRECISION</span>
          <span className="font-h1 text-[120px] leading-none text-on-primary-container/10 select-none -mt-8">TECH</span>
        </div>
      </div>
    </main>
  );
}
