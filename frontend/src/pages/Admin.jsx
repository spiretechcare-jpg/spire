import { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus, X } from 'lucide-react';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [promoCodes, setPromoCodes] = useState([]);
  const [pcParts, setPcParts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingPromo, setEditingPromo] = useState(null);
  const [editingPcPart, setEditingPcPart] = useState(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const [isPcPartModalOpen, setIsPcPartModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '', description: '', price: 0, category: '', stock: 0, imageUrl: '', brand: ''
  });
  const [promoData, setPromoData] = useState({
    code: '', discount_type: 'percentage', discount_value: 0, is_active: 1
  });
  const [pcPartData, setPcPartData] = useState({
    name: '', category: '', price: 0, imageUrl: '', socket: '', ramType: ''
  });

  const fetchProducts = () => {
    setLoading(true);
    fetch('http://localhost:3001/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const fetchOrders = () => {
    setLoading(true);
    fetch('http://localhost:3001/api/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const fetchPromoCodes = () => {
    setLoading(true);
    fetch('http://localhost:3001/api/promo-codes')
      .then(res => res.json())
      .then(data => {
        setPromoCodes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const fetchPcParts = () => {
    setLoading(true);
    fetch('http://localhost:3001/api/pc-parts')
      .then(res => res.json())
      .then(data => {
        setPcParts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === 'products') fetchProducts();
      if (activeTab === 'orders') fetchOrders();
      if (activeTab === 'promo-codes') fetchPromoCodes();
      if (activeTab === 'pc-parts') fetchPcParts();
    }
  }, [isAuthenticated, activeTab]);

  const handleUpdateShipping = (orderId, status) => {
    fetch(`http://localhost:3001/api/orders/${orderId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ shipping_status: status })
    })
    .then(res => res.json())
    .then(() => fetchOrders())
    .catch(err => console.error(err));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (adminId === import.meta.env.VITE_ADMIN_ID && adminPassword === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid Admin ID or Password');
    }
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData({ name: '', description: '', price: 0, category: '', stock: 0, imageUrl: '', brand: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleOpenPromoModal = (promo = null) => {
    if (promo) {
      setEditingPromo(promo);
      setPromoData(promo);
    } else {
      setEditingPromo(null);
      setPromoData({ code: '', discount_type: 'percentage', discount_value: 0, is_active: 1 });
    }
    setIsPromoModalOpen(true);
  };

  const handleClosePromoModal = () => {
    setIsPromoModalOpen(false);
    setEditingPromo(null);
  };

  const handleOpenPcPartModal = (part = null) => {
    if (part) {
      setEditingPcPart(part);
      setPcPartData(part);
    } else {
      setEditingPcPart(null);
      setPcPartData({ name: '', category: '', price: 0, imageUrl: '', socket: '', ramType: '' });
    }
    setIsPcPartModalOpen(true);
  };

  const handleClosePcPartModal = () => {
    setIsPcPartModalOpen(false);
    setEditingPcPart(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    }));
  };

  const handlePromoChange = (e) => {
    const { name, value } = e.target;
    setPromoData(prev => ({
      ...prev,
      [name]: name === 'discount_value' || name === 'is_active' ? Number(value) : value
    }));
  };

  const handlePcPartChange = (e) => {
    const { name, value } = e.target;
    setPcPartData(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = editingProduct 
      ? `http://localhost:3001/api/products/${editingProduct.id}`
      : 'http://localhost:3001/api/products';
    const method = editingProduct ? 'PUT' : 'POST';
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(() => {
      fetchProducts();
      handleCloseModal();
    })
    .catch(err => console.error(err));
  };

  const handlePromoSubmit = (e) => {
    e.preventDefault();
    const url = editingPromo 
      ? `http://localhost:3001/api/promo-codes/${editingPromo.id}`
      : 'http://localhost:3001/api/promo-codes';
    const method = editingPromo ? 'PUT' : 'POST';
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(promoData)
    })
    .then(() => {
      fetchPromoCodes();
      handleClosePromoModal();
    })
    .catch(err => console.error(err));
  };

  const handlePcPartSubmit = (e) => {
    e.preventDefault();
    const url = editingPcPart 
      ? `http://localhost:3001/api/pc-parts/${editingPcPart.id}`
      : 'http://localhost:3001/api/pc-parts';
    const method = editingPcPart ? 'PUT' : 'POST';
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pcPartData)
    })
    .then(() => {
      fetchPcParts();
      handleClosePcPartModal();
    })
    .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this product?")) {
      fetch(`http://localhost:3001/api/products/${id}`, { method: 'DELETE' })
        .then(() => fetchProducts());
    }
  };

  const handleDeletePromo = (id) => {
    if (window.confirm("Delete this promo code?")) {
      fetch(`http://localhost:3001/api/promo-codes/${id}`, { method: 'DELETE' })
        .then(() => fetchPromoCodes());
    }
  };

  const handleDeletePcPart = (id) => {
    if (window.confirm("Delete this PC part?")) {
      fetch(`http://localhost:3001/api/pc-parts/${id}`, { method: 'DELETE' })
        .then(() => fetchPcParts());
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-32 pb-margin max-w-[1280px] mx-auto px-6 flex items-center justify-center min-h-[calc(100vh-80px-200px)]">
        <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant max-w-md w-full font-['Space_Grotesk']">
          <h2 className="font-h2 text-h2 text-primary mb-6 text-center">Admin Access</h2>
          {loginError && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm font-semibold border border-red-100">{loginError}</div>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Admin ID</label>
              <input type="text" value={adminId} onChange={(e) => setAdminId(e.target.value)} className="w-full border rounded p-2 focus:ring-2 focus:ring-cyan-500 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Password</label>
              <input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} className="w-full border rounded p-2 focus:ring-2 focus:ring-cyan-500 outline-none" required />
            </div>
            <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded font-bold hover:bg-slate-800 mt-4 transition-colors">
              Login to Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-margin max-w-[1280px] mx-auto px-6 font-['Space_Grotesk']">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <div className="flex gap-2">
          {activeTab === 'products' && (
            <button onClick={() => handleOpenModal()} className="bg-cyan-600 text-white px-4 py-2 rounded flex items-center gap-2 font-semibold hover:bg-cyan-700 shadow-sm">
              <Plus size={18} /> Add Product
            </button>
          )}
          {activeTab === 'promo-codes' && (
            <button onClick={() => handleOpenPromoModal()} className="bg-cyan-600 text-white px-4 py-2 rounded flex items-center gap-2 font-semibold hover:bg-cyan-700 shadow-sm">
              <Plus size={18} /> Add Promo Code
            </button>
          )}
          {activeTab === 'pc-parts' && (
            <button onClick={() => handleOpenPcPartModal()} className="bg-cyan-600 text-white px-4 py-2 rounded flex items-center gap-2 font-semibold hover:bg-cyan-700 shadow-sm">
              <Plus size={18} /> Add PC Part
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-4 mb-6 border-b border-slate-200 overflow-x-auto">
        {['products', 'orders', 'promo-codes', 'pc-parts'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)} 
            className={`pb-2 px-4 font-bold whitespace-nowrap capitalize ${activeTab === tab ? 'text-cyan-600 border-b-2 border-cyan-600' : 'text-slate-500 hover:text-slate-900'}`}
          >
            {tab.replace('-', ' ')}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {activeTab === 'products' && (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 font-semibold text-sm">ID</th>
                <th className="p-4 font-semibold text-sm">Name</th>
                <th className="p-4 font-semibold text-sm">Category</th>
                <th className="p-4 font-semibold text-sm">Price</th>
                <th className="p-4 font-semibold text-sm">Stock</th>
                <th className="p-4 font-semibold text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" className="text-center p-8">Loading...</td></tr>
              ) : products.map(product => (
                <tr key={product.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-sm">{product.id}</td>
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4 text-sm">{product.category}</td>
                  <td className="p-4 text-sm">${product.price}</td>
                  <td className="p-4 text-sm">{product.stock}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleOpenModal(product)} className="text-cyan-600 hover:text-cyan-800 p-2 mr-2"><Pencil size={18} /></button>
                    <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-700 p-2"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'orders' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 font-semibold text-sm">Order ID</th>
                  <th className="p-4 font-semibold text-sm">Customer</th>
                  <th className="p-4 font-semibold text-sm">Contact & Phone</th>
                  <th className="p-4 font-semibold text-sm">Shipping Address</th>
                  <th className="p-4 font-semibold text-sm text-right">Total</th>
                  <th className="p-4 font-semibold text-sm text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="6" className="text-center p-8 text-slate-500">Loading order database...</td></tr>
                ) : orders.length === 0 ? (
                  <tr><td colSpan="6" className="text-center p-12 text-slate-500 italic font-medium">No orders found in the system.</td></tr>
                ) : orders.map(order => (
                  <tr key={order.id} className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 text-sm font-bold text-slate-400">#{order.id}</td>
                    <td className="p-4">
                      <p className="font-bold text-sm text-slate-900">{order.user_name}</p>
                      <p className="text-[11px] text-slate-500 font-medium">{order.user_email}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-cyan-600">call</span>
                        <p className="text-sm font-bold text-slate-700">{order.user_phone || 'Not Provided'}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-start gap-2 max-w-[300px]">
                        <span className="material-symbols-outlined text-[16px] text-slate-400 mt-0.5">location_on</span>
                        <p className="text-xs text-slate-600 leading-relaxed italic" title={order.user_address}>
                          {order.user_address || 'No address specified'}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 text-sm font-black text-right text-cyan-700">₹{order.total_amount.toLocaleString('en-IN')}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end">
                        <select 
                          className={`text-[10px] font-black uppercase tracking-wider border-2 rounded-full px-3 py-1 outline-none transition-all cursor-pointer ${
                            order.shipping_status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-200' :
                            order.shipping_status === 'Cancelled' ? 'bg-red-50 text-red-700 border-red-200' :
                            order.shipping_status === 'Shipped' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                            'bg-orange-50 text-orange-700 border-orange-200'
                          }`}
                          value={order.shipping_status}
                          onChange={(e) => handleUpdateShipping(order.id, e.target.value)}
                        >
                          {['Processing', 'Shipped', 'In Transit', 'Delivered', 'Cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'promo-codes' && (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 font-semibold text-sm">Code</th>
                <th className="p-4 font-semibold text-sm">Discount</th>
                <th className="p-4 font-semibold text-sm">Status</th>
                <th className="p-4 font-semibold text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" className="text-center p-8">Loading...</td></tr>
              ) : promoCodes.map(promo => (
                <tr key={promo.id} className="border-b border-slate-100">
                  <td className="p-4 font-bold text-cyan-600">{promo.code}</td>
                  <td className="p-4 text-sm">{promo.discount_value}{promo.discount_type === 'percentage' ? '%' : ' Fixed'}</td>
                  <td className="p-4 text-xs font-bold uppercase text-green-600">{promo.is_active ? 'Active' : 'Inactive'}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleOpenPromoModal(promo)} className="text-cyan-600 p-2"><Pencil size={18} /></button>
                    <button onClick={() => handleDeletePromo(promo.id)} className="text-red-500 p-2"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'pc-parts' && (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 font-semibold text-sm">Name</th>
                <th className="p-4 font-semibold text-sm">Category</th>
                <th className="p-4 font-semibold text-sm">Price</th>
                <th className="p-4 font-semibold text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" className="text-center p-8">Loading...</td></tr>
              ) : pcParts.map(part => (
                <tr key={part.id} className="border-b border-slate-100">
                  <td className="p-4 font-medium text-sm">{part.name}</td>
                  <td className="p-4 text-xs uppercase">{part.category}</td>
                  <td className="p-4 text-sm font-bold">₹{part.price.toLocaleString('en-IN')}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleOpenPcPartModal(part)} className="text-cyan-600 p-2"><Pencil size={18} /></button>
                    <button onClick={() => handleDeletePcPart(part.id)} className="text-red-500 p-2"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modals */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-bold">{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
              <button onClick={handleCloseModal} className="p-1 hover:bg-slate-200 rounded-full transition-colors"><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input required placeholder="Name" name="name" value={formData.name} onChange={handleChange} className="border rounded-lg p-3 text-sm focus:ring-2 focus:ring-cyan-500 outline-none" />
                <input required placeholder="Brand" name="brand" value={formData.brand} onChange={handleChange} className="border rounded-lg p-3 text-sm focus:ring-2 focus:ring-cyan-500 outline-none" />
              </div>
              <textarea required placeholder="Description" name="description" value={formData.description} onChange={handleChange} className="w-full border rounded-lg p-3 text-sm h-24 focus:ring-2 focus:ring-cyan-500 outline-none"></textarea>
              <div className="grid grid-cols-3 gap-4">
                <input required type="number" placeholder="Price" name="price" value={formData.price} onChange={handleChange} className="border rounded-lg p-3 text-sm focus:ring-2 focus:ring-cyan-500 outline-none" />
                <input required type="number" placeholder="Stock" name="stock" value={formData.stock} onChange={handleChange} className="border rounded-lg p-3 text-sm focus:ring-2 focus:ring-cyan-500 outline-none" />
                <input required placeholder="Category" name="category" value={formData.category} onChange={handleChange} className="border rounded-lg p-3 text-sm focus:ring-2 focus:ring-cyan-500 outline-none" />
              </div>
              <input required placeholder="Image URL" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-cyan-500 outline-none" />
              <button type="submit" className="w-full bg-cyan-600 text-white py-3 rounded-lg font-bold hover:bg-cyan-700 transition-all shadow-md">
                {editingProduct ? 'Save Changes' : 'Create Product'}
              </button>
            </form>
          </div>
        </div>
      )}

      {isPromoModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-bold">{editingPromo ? 'Edit Code' : 'Add Code'}</h2>
              <button onClick={handleClosePromoModal} className="p-1 hover:bg-slate-200 rounded-full transition-colors"><X size={24} /></button>
            </div>
            <form onSubmit={handlePromoSubmit} className="p-6 space-y-4">
              <input required placeholder="CODE" name="code" value={promoData.code} onChange={handlePromoChange} className="w-full border rounded-lg p-3 text-sm font-bold uppercase focus:ring-2 focus:ring-cyan-500 outline-none" />
              <div className="grid grid-cols-2 gap-4">
                <select name="discount_type" value={promoData.discount_type} onChange={handlePromoChange} className="border rounded-lg p-3 text-sm">
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
                <input required type="number" placeholder="Value" name="discount_value" value={promoData.discount_value} onChange={handlePromoChange} className="border rounded-lg p-3 text-sm focus:ring-2 focus:ring-cyan-500 outline-none" />
              </div>
              <button type="submit" className="w-full bg-cyan-600 text-white py-3 rounded-lg font-bold hover:bg-cyan-700 transition-all shadow-md">
                {editingPromo ? 'Save Changes' : 'Create Code'}
              </button>
            </form>
          </div>
        </div>
      )}

      {isPcPartModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-bold">{editingPcPart ? 'Edit PC Part' : 'Add PC Part'}</h2>
              <button onClick={handleClosePcPartModal} className="p-1 hover:bg-slate-200 rounded-full transition-colors"><X size={24} /></button>
            </div>
            <form onSubmit={handlePcPartSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input required placeholder="Part Name" name="name" value={pcPartData.name} onChange={handlePcPartChange} className="border rounded-lg p-3 text-sm focus:ring-2 focus:ring-cyan-500 outline-none" />
                <select required name="category" value={pcPartData.category} onChange={handlePcPartChange} className="border rounded-lg p-3 text-sm">
                  <option value="">Category</option>
                  {['cpu', 'gpu', 'motherboard', 'ram', 'ssd', 'psu', 'cabinet', 'cooler', 'monitor', 'keyboard', 'mouse'].map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input required type="number" placeholder="Price (₹)" name="price" value={pcPartData.price} onChange={handlePcPartChange} className="border rounded-lg p-3 text-sm focus:ring-2 focus:ring-cyan-500 outline-none" />
                <input required placeholder="Image URL" name="imageUrl" value={pcPartData.imageUrl} onChange={handlePcPartChange} className="border rounded-lg p-3 text-sm focus:ring-2 focus:ring-cyan-500 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4 border-t pt-4">
                <input placeholder="Socket (LGA1700, AM5, etc.)" name="socket" value={pcPartData.socket} onChange={handlePcPartChange} className="border rounded-lg p-3 text-sm focus:ring-2 focus:ring-cyan-500 outline-none" />
                <input placeholder="RAM Type (DDR4, DDR5)" name="ramType" value={pcPartData.ramType} onChange={handlePcPartChange} className="border rounded-lg p-3 text-sm focus:ring-2 focus:ring-cyan-500 outline-none" />
              </div>
              <button type="submit" className="w-full bg-cyan-600 text-white py-3 rounded-lg font-bold hover:bg-cyan-700 transition-all shadow-md">
                {editingPcPart ? 'Save Changes' : 'Create Part'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
