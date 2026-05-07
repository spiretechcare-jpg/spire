import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { User, History, Cpu, HeadphonesIcon, LogOut, ShoppingBag, PenTool, Save, Rocket, CloudUpload, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Profile() {
  const { user, logout, updateUser } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    phone: user?.phone || '',
    address: user?.address || '',
    profile_image: user?.profile_image || ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [activeSection, setActiveSection] = useState('personal'); // 'personal', 'orders', 'builds', 'support'

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3001/api/orders/user/${user.id}`)
        .then(res => res.json())
        .then(data => setOrders(data))
        .catch(err => console.error(err));
      
      setEditData({
        phone: user.phone || '',
        address: user.address || '',
        profile_image: user.profile_image || ''
      });
    }
  }, [user]);

  // Dynamic Summary Calculations
  const activeOrders = orders.filter(o => o.shipping_status !== 'Delivered' && o.shipping_status !== 'Cancelled').length;
  const totalHardware = orders.reduce((sum, o) => sum + (Array.isArray(o.products) ? o.products.length : 0), 0);
  const totalSpent = orders.reduce((sum, o) => sum + (o.total_amount || 0), 0);
  const supportCredit = totalSpent * 0.05; // 5% of total spent as reward credit

  const avatarOptions = [
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150&h=150",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150&h=150",
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=150&h=150",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150"
  ];

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`http://localhost:3001/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData)
      });
      const data = await res.json();
      if (res.ok) {
        updateUser(data);
        setIsEditing(false);
      } else {
        alert(data.error || "Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while saving");
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return (
    <main className="flex-grow pt-32 pb-24 w-full max-w-[1280px] mx-auto px-6">
      <div className="flex flex-col md:flex-row gap-gutter">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-surface-container-lowest border border-outline-variant p-base rounded-lg micro-shadow space-y-2">
            <button 
              onClick={() => setActiveSection('personal')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeSection === 'personal' ? 'bg-secondary-container text-on-secondary-fixed font-medium' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
            >
              <User size={20} />
              <span className="font-label-sm text-label-sm">Personal Info</span>
            </button>
            <button 
              onClick={() => setActiveSection('orders')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeSection === 'orders' ? 'bg-secondary-container text-on-secondary-fixed font-medium' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
            >
              <History size={20} />
              <span className="font-label-sm text-label-sm">Order History</span>
            </button>
            <button 
              onClick={() => setActiveSection('builds')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeSection === 'builds' ? 'bg-secondary-container text-on-secondary-fixed font-medium' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
            >
              <Cpu size={20} />
              <span className="font-label-sm text-label-sm">Saved Builds</span>
            </button>
            <button 
              onClick={() => setActiveSection('support')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeSection === 'support' ? 'bg-secondary-container text-on-secondary-fixed font-medium' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
            >
              <HeadphonesIcon size={20} />
              <span className="font-label-sm text-label-sm">Support Tickets</span>
            </button>
            <hr className="border-outline-variant my-4" />
            <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 text-error hover:bg-error-container/20 rounded-lg transition-all duration-200 group">
              <LogOut size={20} />
              <span className="font-label-sm text-label-sm">Sign Out</span>
            </button>
          </div>
          
          {/* Loyalty Status Widget */}
          <div className="mt-8 p-6 bg-primary-container text-on-primary rounded-xl micro-shadow overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-on-tertiary-container/10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-widest text-on-primary-container mb-2 block font-bold">Pro Member</span>
              <p className="font-h3 text-h3 mb-4">Silver Tier</p>
              <div className="w-full bg-on-primary-container/20 h-1.5 rounded-full overflow-hidden mb-2">
                <div className="bg-on-tertiary-container h-full w-3/4"></div>
              </div>
              <p className="text-xs text-on-primary-container">250 pts until Gold Status</p>
            </div>
          </div>
        </aside>
        
        {/* Main Content Area */}
        <div className="flex-grow space-y-gutter">
          {activeSection === 'personal' && (
            <>
              {/* Profile Header Bento */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
                <div className="lg:col-span-2 bg-surface-container-lowest p-8 border border-outline-variant rounded-xl micro-shadow flex items-start gap-8">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-on-secondary-container flex-shrink-0">
                    <img 
                      alt="User avatar" 
                      className="w-full h-full object-cover" 
                      src={editData.profile_image || "https://lh3.googleusercontent.com/aida-public/AB6AXuCMPGhHAQpc2cXGVd7kQ-uviwS-J2cGGqDu8GilJ4_CbCRP4PbqlquvGTYNB2rRla7dTF2WNVSl6DYEqxSNi25T0mwC27Bos_lnWqiXhiNB-vUFLMiM4f7kWnQtcF9mwfB5Lpb7ZoPllQm5uq3fxzgSXWCijR98w47ghTUkLqiTIZ-P5cyIic12mF-BB_XHbxrNzFYKIgR-6SnAo7fOQyGE3SZAP5rs1f6JYDDOVQ-UgSDajbduUg-VaaoGy_YfkAjDh5cIxDmcAPM"} 
                    />
                  </div>
                  <div className="flex-grow">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">Full Name</label>
                          <p className="font-h2 text-h2 text-primary">{user.name}</p>
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">Email</label>
                          <p className="text-on-surface-variant font-body-lg">{user.email}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">Phone Number</label>
                            <input 
                              type="text" 
                              value={editData.phone} 
                              onChange={(e) => setEditData({...editData, phone: e.target.value})}
                              className="w-full border rounded p-2 focus:ring-2 focus:ring-on-tertiary-container outline-none text-sm"
                              placeholder="+91 8883195777"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase text-on-surface-variant mb-3">Choose Avatar</label>
                            <div className="flex flex-wrap gap-3">
                              {avatarOptions.map((avatar, index) => (
                                <button
                                  key={index}
                                  type="button"
                                  onClick={() => setEditData({...editData, profile_image: avatar})}
                                  className={`relative w-12 h-12 rounded-full overflow-hidden border-2 transition-all ${editData.profile_image === avatar ? 'border-primary scale-110 shadow-lg' : 'border-outline-variant hover:border-secondary'}`}
                                >
                                  <img src={avatar} alt={`Avatar ${index + 1}`} className="w-full h-full object-cover" />
                                  {editData.profile_image === avatar && (
                                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                      <CheckCircle2 size={16} className="text-primary bg-white rounded-full" />
                                    </div>
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">Shipping Address</label>
                          <textarea 
                            value={editData.address} 
                            onChange={(e) => setEditData({...editData, address: e.target.value})}
                            className="w-full border rounded p-2 focus:ring-2 focus:ring-on-tertiary-container outline-none text-sm h-20"
                            placeholder="123 Spire Tech Street, Silicon Valley, CA"
                          />
                        </div>
                        <div className="flex gap-4">
                          <button 
                            onClick={handleSave}
                            disabled={isSaving}
                            className="bg-primary text-white px-6 py-2 rounded font-label-sm text-label-sm hover:opacity-90 transition-opacity flex items-center gap-2"
                          >
                            <Save size={16} />
                            {isSaving ? 'Saving...' : 'Save Changes'}
                          </button>
                          <button 
                            onClick={() => setIsEditing(false)}
                            className="border border-outline text-on-surface-variant px-6 py-2 rounded font-label-sm text-label-sm hover:bg-surface-container-high transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-3 mb-1">
                          <h1 className="font-h2 text-h2 text-primary">{user.name}</h1>
                          <span className="bg-secondary-container text-on-secondary-fixed text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">Member</span>
                        </div>
                        <p className="text-on-surface-variant font-body-lg mb-4">{user.email}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div>
                            <p className="text-[10px] uppercase font-bold text-secondary tracking-widest mb-1">Phone</p>
                            <p className="text-sm font-medium">{user.phone || 'Not provided'}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold text-secondary tracking-widest mb-1">Address</p>
                            <p className="text-sm font-medium whitespace-pre-wrap">{user.address || 'Not provided'}</p>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <button 
                            onClick={() => setIsEditing(true)}
                            className="bg-on-tertiary-container text-white px-6 py-2 rounded font-label-sm text-label-sm hover:opacity-90 transition-opacity active:scale-95 duration-150 flex items-center gap-2"
                          >
                            <PenTool size={16} />
                            Edit Profile
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="bg-surface-container-lowest p-8 border border-outline-variant rounded-xl micro-shadow flex flex-col justify-between">
                  <div>
                    <p className="text-label-sm font-label-sm text-on-surface-variant uppercase mb-2">Account Summary</p>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant">Active Shipments</span>
                        <span className="font-bold">{activeOrders}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant">Registered Hardware</span>
                        <span className="font-bold">{totalHardware} units</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant">Reward Credit</span>
                        <span className="text-on-tertiary-container font-bold">₹{supportCredit.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setActiveSection('orders')} className="text-on-tertiary-container font-bold text-sm underline hover:text-on-tertiary-fixed transition-colors text-left">View Orders History →</button>
                </div>
              </div>
              
              {/* Bento Quick Actions */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
                <div onClick={() => setActiveSection('builds')} className="p-6 bg-surface-container-lowest border border-outline-variant rounded-xl micro-shadow flex flex-col items-center text-center group cursor-pointer hover:border-on-tertiary-container transition-colors">
                  <Rocket className="text-4xl mb-3 text-on-surface-variant group-hover:text-on-tertiary-container transition-colors" size={36} />
                  <p className="font-bold text-sm">Quick Build</p>
                </div>
                <div className="p-6 bg-surface-container-lowest border border-outline-variant rounded-xl micro-shadow flex flex-col items-center text-center group cursor-pointer hover:border-on-tertiary-container transition-colors">
                  <CloudUpload className="text-4xl mb-3 text-on-surface-variant group-hover:text-on-tertiary-container transition-colors" size={36} />
                  <p className="font-bold text-sm">Sync Assets</p>
                </div>
                <div className="p-6 bg-surface-container-lowest border border-outline-variant rounded-xl micro-shadow flex flex-col items-center text-center group cursor-pointer hover:border-on-tertiary-container transition-colors">
                  <ShieldCheck className="text-4xl mb-3 text-on-surface-variant group-hover:text-on-tertiary-container transition-colors" size={36} />
                  <p className="font-bold text-sm">Certifications</p>
                </div>
                <div className="p-6 bg-surface-container-lowest border border-outline-variant rounded-xl micro-shadow flex flex-col items-center text-center group cursor-pointer hover:border-on-tertiary-container transition-colors">
                  <FileText className="text-4xl mb-3 text-on-surface-variant group-hover:text-on-tertiary-container transition-colors" size={36} />
                  <p className="font-bold text-sm">Export Tax Info</p>
                </div>
              </div>
            </>
          )}

          {activeSection === 'orders' && (
            <div className="grid grid-cols-1 gap-gutter">
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl micro-shadow overflow-hidden">
                <div className="px-8 py-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
                  <h3 className="font-h3 text-h3">Order History</h3>
                  <p className="text-sm text-secondary">{orders.length} Total Orders</p>
                </div>
                <div className="p-0 overflow-x-auto">
                  {orders.length === 0 ? (
                    <div className="py-16 text-center text-on-surface-variant flex flex-col items-center">
                      <History size={48} className="mb-4 opacity-50" />
                      <p className="text-lg font-medium">No orders found.</p>
                      <Link to="/products" className="mt-4 text-on-tertiary-container font-bold underline">Start Shopping</Link>
                    </div>
                  ) : (
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-surface-container-lowest border-b border-outline-variant">
                          <th className="p-6 font-bold text-xs uppercase tracking-widest text-secondary">Order ID</th>
                          <th className="p-6 font-bold text-xs uppercase tracking-widest text-secondary">Date</th>
                          <th className="p-6 font-bold text-xs uppercase tracking-widest text-secondary">Total</th>
                          <th className="p-6 font-bold text-xs uppercase tracking-widest text-secondary">Items</th>
                          <th className="p-6 font-bold text-xs uppercase tracking-widest text-secondary text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map(order => (
                          <tr key={order.id} className="border-b border-surface-container-highest hover:bg-surface-bright transition-colors">
                            <td className="p-6 font-bold text-primary text-sm">#{order.id}</td>
                            <td className="p-6 text-sm">{new Date(order.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                            <td className="p-6 text-sm font-bold">₹{order.total_amount.toFixed(2)}</td>
                            <td className="p-6 text-sm">{order.products.length} Items</td>
                            <td className="p-6 text-right">
                              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                                order.shipping_status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                                order.shipping_status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                'bg-blue-100 text-blue-700'
                              }`}>
                                {order.shipping_status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'builds' && (
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl micro-shadow p-12 text-center">
              <div className="w-20 h-20 bg-surface-container-high rounded-full flex items-center justify-center mx-auto mb-6">
                <Cpu size={40} className="text-secondary opacity-50" />
              </div>
              <h2 className="text-2xl font-bold mb-2">No Saved Builds Yet</h2>
              <p className="text-on-surface-variant mb-8 max-w-md mx-auto">Configure your dream workstation or server setup and save it here for quick access later.</p>
              <Link to="/products" className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">Browse Hardware</Link>
            </div>
          )}

          {activeSection === 'support' && (
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl micro-shadow p-12 text-center">
              <div className="w-20 h-20 bg-surface-container-high rounded-full flex items-center justify-center mx-auto mb-6">
                <HeadphonesIcon size={40} className="text-secondary opacity-50" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Technical Support</h2>
              <p className="text-on-surface-variant mb-8 max-w-md mx-auto">Need help with your hardware? Our engineers are available 24/7 for Pro members.</p>
              <Link to="/contact" className="bg-on-tertiary-container text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">Contact Engineer</Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
