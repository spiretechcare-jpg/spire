import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Shield, Cloud } from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirm_password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, email: formData.email, password: formData.password })
      });
      
      const data = await res.json();
      if (res.ok) {
        navigate('/login');
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };
  return (
    <main className="flex-grow flex items-center justify-center py-20 px-6 pt-32 min-h-[calc(100vh-80px)]">
      <div className="w-full max-w-[1100px] grid grid-cols-1 md:grid-cols-2 bg-surface-container-lowest rounded-xl overflow-hidden micro-shadow border border-outline-variant/30">
        
        {/* Left Side: Visual/Branding */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-primary-container relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-12">
              <span className="material-symbols-outlined text-tertiary-fixed text-4xl">terminal</span>
              <span className="font-h2 text-h3 text-surface-container-lowest tracking-tighter">Spire Technologies</span>
            </div>
            <h1 className="font-h1 text-h2 text-surface-container-lowest mb-6">Technical Precision Guaranteed.</h1>
            <p className="font-body-lg text-on-primary-container max-w-md">Join the ecosystem of elite hardware solutions and enterprise-grade networking. Access your technical dashboard and manage your infrastructure with unmatched clarity.</p>
          </div>
          <div className="relative z-10 grid grid-cols-2 gap-4 mt-8">
            <div className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
              <span className="material-symbols-outlined text-tertiary-fixed mb-2">verified_user</span>
              <p className="font-label-sm text-surface-container-lowest">Enterprise Security</p>
            </div>
            <div className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
              <span className="material-symbols-outlined text-tertiary-fixed mb-2">speed</span>
              <p className="font-label-sm text-surface-container-lowest">Instant Deployment</p>
            </div>
          </div>
          
          {/* Abstract Decorative Image */}
          <div className="absolute inset-0 z-0 opacity-20">
            <img className="w-full h-full object-cover" alt="Circuit board" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAc-aH63CEgMKnnLpEfP6q4gUvVlctz0ev28IqgyPdtnNGl1esdVl1H9Nz5dyVT0bkMx0vdfpfiuN6oqPs47MPeM7eXjEciwSpCRJr0Ekz0oQHoVViqVndZlgvYeDV-k3C_QPqkr9Xww1HumgPoOgvzHRX1zx3qjEpj0OH347D8khOoZUVr1lKHmutqWbm64B9j7uGL6GSUUxuadPSO0SHCw8zdDhuoFnNRrMT8tj3Xr1nSSFaRy1o8Rl88cd5o8wDPLC_-xmmRneQ" />
          </div>
        </div>
        
        {/* Right Side: Form */}
        <div className="p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <h2 className="font-h2 text-h2 text-primary mb-2">Create Account</h2>
            <p className="font-body-md text-on-surface-variant">Start your journey with Spire Technologies today.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="bg-error-container text-on-error-container p-3 rounded text-sm font-semibold">{error}</div>}
            <div className="grid grid-cols-1 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="font-label-sm text-on-surface-variant uppercase tracking-widest text-[10px]" htmlFor="full_name">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={16} />
                  <input className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded focus:ring-1 focus:ring-on-tertiary-container focus:border-on-tertiary-container transition-all outline-none text-on-surface font-body-md" id="full_name" name="name" placeholder="John Doe" type="text" value={formData.name} onChange={handleChange} required />
                </div>
              </div>
              
              {/* Email */}
              <div className="space-y-2">
                <label className="font-label-sm text-on-surface-variant uppercase tracking-widest text-[10px]" htmlFor="email">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={16} />
                  <input className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded focus:ring-1 focus:ring-on-tertiary-container focus:border-on-tertiary-container transition-all outline-none text-on-surface font-body-md" id="email" name="email" placeholder="name@company.com" type="email" value={formData.email} onChange={handleChange} required />
                </div>
              </div>
              
              {/* Passwords Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-label-sm text-on-surface-variant uppercase tracking-widest text-[10px]" htmlFor="password">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={16} />
                    <input className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded focus:ring-1 focus:ring-on-tertiary-container focus:border-on-tertiary-container transition-all outline-none text-on-surface font-body-md" id="password" name="password" placeholder="••••••••" type="password" value={formData.password} onChange={handleChange} required minLength="6" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-label-sm text-on-surface-variant uppercase tracking-widest text-[10px]" htmlFor="confirm_password">Confirm Password</label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={16} />
                    <input className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded focus:ring-1 focus:ring-on-tertiary-container focus:border-on-tertiary-container transition-all outline-none text-on-surface font-body-md" id="confirm_password" name="confirm_password" placeholder="••••••••" type="password" value={formData.confirm_password} onChange={handleChange} required minLength="6" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Terms & Conditions */}
            <div className="flex items-start gap-3 py-2">
              <div className="flex items-center h-5">
                <input className="h-4 w-4 rounded border-outline-variant text-on-tertiary-container focus:ring-on-tertiary-container" id="terms" name="terms" type="checkbox" required />
              </div>
              <label className="font-body-md text-sm text-on-surface-variant" htmlFor="terms">
                I accept the <Link className="text-on-tertiary-container font-semibold hover:underline" to="/terms">Terms of Service</Link> and <Link className="text-on-tertiary-container font-semibold hover:underline" to="/privacy">Privacy Policy</Link>.
              </label>
            </div>
            
            {/* CTA Buttons */}
            <div className="space-y-4 pt-2">
              <button className="w-full py-4 bg-on-tertiary-container text-surface-container-lowest font-h3 text-body-md rounded-lg hover:brightness-110 active:scale-[0.98] transition-all shadow-md" type="submit">
                Create Account
              </button>
              
              <div className="relative flex items-center justify-center">
                <div className="flex-grow border-t border-outline-variant"></div>
                <span className="flex-shrink-0 px-4 font-label-sm text-label-sm text-on-surface-variant bg-background relative z-10">OR CONTINUE WITH</span>
                <div className="flex-grow border-t border-outline-variant"></div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => alert("Social registration via Google is being integrated. Please use the form for now.")}
                  className="flex items-center justify-center gap-2 py-3 border border-outline-variant rounded hover:bg-surface-container-high transition-colors font-body-md text-sm" 
                  type="button"
                >
                  <img alt="Google Logo" className="w-4 h-4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC98xzNMPipFH6llfiuAPU4ce785-6GubFF9Z_1VKuRtwBRcH0JMP_1InatFisIlTstv4YDdnHCQYWHkWBY_xQePmi4Jp0Qw58A68ncD6eRIpBjgGK8bNH_qvjs545Kr__wzLwQ1aqxYXcPN4-DRgJHGdUpFa9EeOAHUCynqoOeYDZ0nwN8gDqnqfc5I-7iQB5UD-0wEqQttXj_Ksqp5Iln2cnLtnFe8gwkVz9y8XMFj6nKmWFkxBDsd8iXmIa7gTsTmZAvwStNb_o" />
                  Google
                </button>
                <button 
                  onClick={() => alert("Enterprise SSO registration is available for corporate clients. Please contact your IT administrator.")}
                  className="flex items-center justify-center gap-2 py-3 border border-outline-variant rounded hover:bg-surface-container-high transition-colors font-body-md text-sm" 
                  type="button"
                >
                  <Cloud size={16} />
                  SSO
                </button>
              </div>
            </div>
          </form>
          
          <div className="mt-10 text-center">
            <p className="font-body-md text-on-surface-variant">
              Already have an account?{' '}
              <Link className="text-on-tertiary-container font-bold hover:underline ml-1 transition-all" to="/login">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
