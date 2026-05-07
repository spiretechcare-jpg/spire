import { useState, useEffect } from 'react';
import { Cpu, Gpu, HardDrive, Zap, Box, Monitor, Keyboard, Mouse, Wind, ShieldCheck, Rocket, Headset, Truck, ArrowRight, Save } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Builder() {
  const { user } = useAppContext();
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedParts, setSelectedParts] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [formData, setFormData] = useState({ name: user?.name || '', phone: user?.phone || '' });

  const categories = [
    { id: 'cpu', label: 'Processing Unit', icon: <Cpu size={20} /> },
    { id: 'gpu', label: 'Graphics Matrix', icon: <Gpu size={20} /> },
    { id: 'motherboard', label: 'Neural Board', icon: <Box size={20} /> },
    { id: 'ram', label: 'Memory Array', icon: <Zap size={20} /> },
    { id: 'ssd', label: 'Storage Vault', icon: <HardDrive size={20} /> },
    { id: 'cooler', label: 'Thermal Sync', icon: <Wind size={20} /> },
    { id: 'psu', label: 'Energy Core', icon: <Zap size={20} /> },
    { id: 'cabinet', label: 'Chassis', icon: <Box size={20} /> },
    { id: 'monitor', label: 'Visual Interface', icon: <Monitor size={20} /> },
    { id: 'keyboard', label: 'Input Deck', icon: <Keyboard size={20} /> },
    { id: 'mouse', label: 'Optical Link', icon: <Mouse size={20} /> }
  ];

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/pc-parts`)
      .then(res => res.json())
      .then(data => {
        setParts(data);
        setLoading(false);
      })
      .catch(err => console.error('Failed to fetch parts:', err));
  }, []);

  useEffect(() => {
    const total = Object.values(selectedParts).reduce((sum, part) => sum + part.price, 0);
    setTotalPrice(total);
  }, [selectedParts]);

  const handlePartSelect = (category, partId) => {
    if (!partId) {
      const newSelected = { ...selectedParts };
      delete newSelected[category];
      
      // Cascading delete for compatibility
      if (category === 'cpu') delete newSelected.motherboard;
      if (category === 'motherboard') delete newSelected.ram;
      
      setSelectedParts(newSelected);
      return;
    }

    const part = parts.find(p => p.id === parseInt(partId));
    setSelectedParts(prev => ({ ...prev, [category]: part }));
  };

  const getFilteredParts = (category) => {
    let filtered = parts.filter(p => p.category === category);

    // CPU -> Motherboard Compatibility (Socket)
    if (category === 'motherboard' && selectedParts.cpu) {
      filtered = filtered.filter(mb => mb.socket === selectedParts.cpu.socket);
    }

    // Motherboard -> CPU Compatibility (Socket)
    if (category === 'cpu' && selectedParts.motherboard) {
      filtered = filtered.filter(cpu => cpu.socket === selectedParts.motherboard.socket);
    }

    // Motherboard -> RAM Compatibility (RAM Type)
    if (category === 'ram' && selectedParts.motherboard) {
      filtered = filtered.filter(ram => ram.ramType === selectedParts.motherboard.ramType);
    }

    return filtered;
  };

  const handleOrder = async () => {
    if (!formData.name || !formData.phone) {
      alert("Please provide your name and phone number.");
      return;
    }

    if (Object.keys(selectedParts).length < 5) {
      alert("Please select at least core components (CPU, GPU, MB, RAM, PSU).");
      return;
    }

    const orderData = {
      user_id: user?.id || 0,
      user_name: formData.name,
      user_email: user?.email || 'guest@spire.tech',
      user_phone: formData.phone,
      user_address: user?.address || 'Pickup from Store',
      products: Object.entries(selectedParts).map(([cat, part]) => ({
        id: part.id,
        name: `${cat.toUpperCase()}: ${part.name}`,
        price: part.price,
        quantity: 1
      })),
      total_amount: totalPrice
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (res.ok) {
        // WhatsApp redirection
        let msg = `*New Custom PC Build Order*%0A%0A`;
        msg += `*Name:* ${formData.name}%0A`;
        msg += `*Phone:* ${formData.phone}%0A%0A`;
        msg += `*COMPONENTS:*%0A`;
        Object.entries(selectedParts).forEach(([cat, part]) => {
          msg += `• ${cat.toUpperCase()}: ${part.name} (₹${part.price.toLocaleString('en-IN')})%0A`;
        });
        msg += `%0A*TOTAL ESTIMATE: ₹${totalPrice.toLocaleString('en-IN')}*`;
        
        window.open(`https://wa.me/918883195777?text=${msg}`, '_blank');
        alert("Order recorded and WhatsApp link generated!");
      }
    } catch (err) {
      alert("Error submitting order.");
    }
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 technical-grid relative overflow-hidden">
      {/* Visual Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-container/10 blur-[120px] rounded-full -mr-64 -mt-64"></div>
      
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 bg-primary-container text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded mb-4 shadow-sm">
            Neural Configurator v2.1
          </span>
          <h1 className="font-h1 text-h1 text-primary mb-4 tracking-tighter uppercase">Custom <span className="text-on-surface">Configurator</span></h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Engineer your ultimate battle station with real-time hardware compatibility validation and component telemetry.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Configurator */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 shadow-sm">
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-primary font-bold">User Identification</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="FULL NAME"
                    className="w-full bg-surface-container-low border border-outline-variant p-4 rounded-lg focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-primary font-bold">Comm Link</label>
                  <input 
                    type="text" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="PHONE NUMBER"
                    className="w-full bg-surface-container-low border border-outline-variant p-4 rounded-lg focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                {categories.map((cat) => (
                  <div key={cat.id} className="space-y-2">
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      {cat.icon}
                      <label className="text-[10px] uppercase tracking-widest font-bold">{cat.label}</label>
                    </div>
                    <select 
                      onChange={(e) => handlePartSelect(cat.id, e.target.value)}
                      value={selectedParts[cat.id]?.id || ''}
                      className="w-full bg-surface-container border border-outline-variant p-3 rounded-lg text-sm focus:border-primary outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Select {cat.label}</option>
                      {getFilteredParts(cat.id).map(part => (
                        <option key={part.id} value={part.id}>
                          {part.name} - ₹{part.price.toLocaleString('en-IN')}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Preview / Component Telemetry */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8">
              <h3 className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold text-center mb-8">Live Component Telemetry</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {categories.map(cat => {
                  const part = selectedParts[cat.id];
                  if (!part) return null;
                  return (
                    <div key={cat.id} className="bg-surface-container-low p-4 rounded-lg border border-outline-variant text-center group hover:border-primary transition-all">
                      <img src={part.imageUrl} alt={part.name} className="w-full h-20 object-contain mb-3 rounded" />
                      <div className="text-[8px] text-on-surface-variant uppercase font-bold mb-1">{cat.id}</div>
                      <div className="text-[10px] font-bold truncate mb-1">{part.name}</div>
                      <div className="text-primary font-bold text-xs">₹{part.price.toLocaleString('en-IN')}</div>
                    </div>
                  );
                })}
                {Object.keys(selectedParts).length === 0 && (
                  <div className="col-span-full py-12 text-center text-on-surface-variant italic font-body-md">
                    Waiting for component selection...
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar / Totals */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-primary-container text-white rounded-xl p-8 shadow-lg border border-primary/20 sticky top-32">
              <div className="mb-8">
                <span className="text-[10px] tracking-[0.3em] text-on-primary-container uppercase font-bold block mb-2">Build Valuation</span>
                <div className="text-5xl font-h1 font-black">₹{totalPrice.toLocaleString('en-IN')}</div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm opacity-80 border-b border-white/10 pb-2">
                  <span>Components</span>
                  <span>{Object.keys(selectedParts).length} / 11</span>
                </div>
                <div className="flex justify-between text-sm opacity-80 border-b border-white/10 pb-2">
                  <span>Engineering Fee</span>
                  <span className="text-tertiary-fixed">FREE</span>
                </div>
                <div className="flex justify-between text-sm opacity-80">
                  <span>Build Status</span>
                  <span className="text-tertiary-fixed flex items-center gap-1">
                    <span className="w-2 h-2 bg-tertiary-fixed rounded-full animate-pulse"></span>
                    READY_FOR_FORGE
                  </span>
                </div>
              </div>

              <button 
                onClick={handleOrder}
                className="w-full py-5 bg-white text-primary-container font-h2 font-black rounded-lg shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                ORDER_SYSTEM
                <ArrowRight size={20} />
              </button>
            </div>

            {/* Service Highlights */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant flex items-center gap-3">
                <ShieldCheck size={20} className="text-primary" />
                <span className="text-[9px] font-bold uppercase tracking-tight">3-Year Shield</span>
              </div>
              <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant flex items-center gap-3">
                <Rocket size={20} className="text-primary" />
                <span className="text-[9px] font-bold uppercase tracking-tight">Rapid Forge</span>
              </div>
              <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant flex items-center gap-3">
                <Headset size={20} className="text-primary" />
                <span className="text-[9px] font-bold uppercase tracking-tight">Neural Support</span>
              </div>
              <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant flex items-center gap-3">
                <Truck size={20} className="text-primary" />
                <span className="text-[9px] font-bold uppercase tracking-tight">Secure Transit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
