import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowLeft, Lock, Verified, Truck } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Cart() {
  const { user, cart, removeFromCart, updateCartQuantity, clearCart } = useAppContext();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = cart.length > 0 ? 45.00 : 0;
  
  // Calculate discount
  let calculatedDiscount = 0;
  if (appliedPromo) {
    if (appliedPromo.discount_type === 'percentage') {
      calculatedDiscount = subtotal * (appliedPromo.discount_value / 100);
    } else {
      calculatedDiscount = appliedPromo.discount_value;
    }
  }

  const tax = (subtotal - calculatedDiscount) * 0.18;
  const total = subtotal + shipping + tax - calculatedDiscount;

  const handleApplyPromo = async () => {
    setPromoError('');
    if (!promoCode.trim()) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/promo-codes/validate/${promoCode}`);
      const data = await res.json();
      if (res.ok) {
        setAppliedPromo(data);
        setPromoError('');
      } else {
        setPromoError(data.error || 'Invalid promo code');
        setAppliedPromo(null);
      }
    } catch (err) {
      console.error(err);
      setPromoError('Failed to validate promo code');
    }
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    
    // Check if user has address and phone
    if (!user.phone || !user.address) {
      alert("Please complete your profile with phone number and address before placing an order.");
      return;
    }

    setIsPlacingOrder(true);
    try {
      const orderData = {
        user_id: user.id,
        user_name: user.name,
        user_email: user.email,
        user_phone: user.phone,
        user_address: user.address,
        products: cart,
        total_amount: total
      };

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      const data = await res.json();

      if (res.ok) {
        // Build WhatsApp Message
        let message = `*New Order Placed (ID: #${data.id})*\n\n`;
        message += `*Customer*: ${user.name}\n`;
        message += `*Phone*: ${user.phone}\n`;
        message += `*Email*: ${user.email}\n`;
        message += `*Address*: ${user.address}\n\n`;
        message += `*Items*:\n`;
        cart.forEach(item => {
          message += `- ${item.quantity}x ${item.name} (₹${item.price})\n`;
        });
        message += `\n*Subtotal*: ₹${subtotal.toFixed(2)}\n`;
        if (calculatedDiscount > 0) {
          message += `*Discount*: -₹${calculatedDiscount.toFixed(2)} (${appliedPromo.code})\n`;
        }
        message += `*Shipping*: ₹${shipping.toFixed(2)}\n*Tax*: ₹${tax.toFixed(2)}\n*Total*: ₹${total.toFixed(2)}\n`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/8883195777?text=${encodedMessage}`;
        
        clearCart();
        window.open(whatsappUrl, '_blank');
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <main className="pt-32 pb-24 max-w-[1280px] mx-auto px-6">
      <div className="flex flex-col gap-4 mb-12">
        <h1 className="font-h1 text-h1 text-primary">Your Cart</h1>
        <p className="font-body-lg text-on-surface-variant max-w-2xl">Review your selected high-performance hardware and enterprise solutions before proceeding to secure checkout.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Product List */}
        <div className="lg:col-span-8 space-y-6">
          {cart.length === 0 ? (
            <div className="bg-surface-container-lowest border border-outline-variant p-12 flex flex-col items-center justify-center text-center shadow-[0_4px_12px_rgba(0,0,0,0.05)] rounded-xl">
              <span className="material-symbols-outlined text-6xl text-outline mb-4">shopping_cart</span>
              <h2 className="font-h2 text-[24px] text-primary mb-2">Your cart is empty</h2>
              <p className="text-on-surface-variant font-body-md max-w-md">Looks like you haven't added any high-performance hardware to your cart yet.</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="bg-surface-container-lowest border border-outline-variant p-6 flex flex-col md:flex-row gap-6 items-center shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all hover:border-on-tertiary-container group rounded-xl">
                <div className="w-full md:w-32 h-32 bg-surface-container rounded-lg overflow-hidden flex-shrink-0">
                  {item.imageUrl ? (
                    <img alt={item.name} className="w-full h-full object-cover" src={item.imageUrl} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-surface-container-high text-outline">No Img</div>
                  )}
                </div>
                <div className="flex-grow space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-h3 text-h3 text-primary">{item.name}</h3>
                    <button onClick={() => removeFromCart(item.id)} className="text-outline hover:text-error transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <p className="text-label-sm font-label-sm text-on-tertiary-container uppercase tracking-wider">{item.category}</p>
                  <p className="font-body-md text-on-surface-variant line-clamp-1">{item.description}</p>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center border border-outline rounded px-2 py-1">
                      <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="text-sm"><Minus size={16} /></button>
                      <span className="px-4 font-bold">{item.quantity}</span>
                      <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="text-sm"><Plus size={16} /></button>
                    </div>
                    <span className="text-label-sm font-label-sm text-secondary uppercase">In Stock</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 w-full md:w-auto">
                  <p className="font-h3 text-h3 text-primary">₹{(item.price * item.quantity).toFixed(2)}</p>
                  {item.quantity > 1 && <p className="text-sm text-on-surface-variant">₹{item.price.toFixed(2)} each</p>}
                </div>
              </div>
            ))
          )}
          
          {/* Empty State/Continue Shopping */}
          <div className="pt-8">
            <Link to="/products" className="flex items-center gap-2 text-on-tertiary-container font-bold hover:gap-4 transition-all duration-300 w-fit">
              <ArrowLeft size={20} />
              Continue Shopping
            </Link>
          </div>
        </div>
        
        {/* Sidebar Summary */}
        <div className="lg:col-span-4">
          <div className="bg-surface-container-low border border-outline-variant p-8 sticky top-32 space-y-8 rounded-xl">
            <h2 className="font-h2 text-h3 text-primary border-b border-outline-variant pb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between font-body-md">
                <span className="text-on-surface-variant">Subtotal</span>
                <span className="text-primary font-semibold">₹{subtotal.toFixed(2)}</span>
              </div>
              {calculatedDiscount > 0 && (
                <div className="flex justify-between font-body-md text-green-600 font-bold">
                  <span>Discount ({appliedPromo.code})</span>
                  <span>-₹{calculatedDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-body-md">
                <span className="text-on-surface-variant">Estimated Shipping</span>
                <span className="text-primary font-semibold">₹{shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-body-md">
                <span className="text-on-surface-variant">Tax (18%)</span>
                <span className="text-primary font-semibold">₹{tax.toFixed(2)}</span>
              </div>
            </div>
            <div className="pt-6 border-t border-outline-variant">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-label-sm font-label-sm text-secondary uppercase tracking-widest mb-1">Total Amount</p>
                  <p className="font-h1 text-h2 text-primary">₹{total.toFixed(2)}</p>
                </div>
              </div>
            </div>
            
            {/* Promo Code */}
            <div className="space-y-3">
              <label className="text-label-sm font-label-sm text-on-surface uppercase">Promo Code</label>
              <div className="flex gap-2">
                <input 
                  className={`flex-grow bg-surface-container-lowest border ${promoError ? 'border-error' : 'border-outline'} focus:border-on-tertiary-container focus:ring-0 px-4 py-3 text-sm rounded-l`} 
                  placeholder="SPIRE2024" 
                  type="text" 
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button 
                  onClick={handleApplyPromo}
                  className="bg-primary text-on-primary px-6 py-3 font-bold hover:bg-slate-800 transition-colors uppercase text-xs tracking-widest rounded-r"
                >
                  Apply
                </button>
              </div>
              {promoError && <p className="text-xs text-error font-medium">{promoError}</p>}
              {appliedPromo && <p className="text-xs text-green-600 font-medium">Code applied: {appliedPromo.discount_type === 'percentage' ? `${appliedPromo.discount_value}% OFF` : `₹${appliedPromo.discount_value} OFF`}</p>}
            </div>
            <button 
              onClick={handleCheckout}
              disabled={cart.length === 0 || isPlacingOrder}
              className="w-full bg-[#25D366] text-white py-5 font-bold flex items-center justify-center gap-3 hover:bg-[#128C7E] shadow-lg shadow-[#25D366]/20 transition-all group active:scale-[0.98] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPlacingOrder ? 'Processing...' : 'Place Order via WhatsApp'}
              {!isPlacingOrder && <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">send</span>}
            </button>
            <div className="flex flex-col gap-4 pt-4">
              <div className="flex items-center gap-3 text-on-surface-variant text-sm">
                <Verified size={20} className="text-on-tertiary-container" />
                <span>Secure SSL Encryption</span>
              </div>
              <div className="flex items-center gap-3 text-on-surface-variant text-sm">
                <Truck size={20} className="text-on-tertiary-container" />
                <span>White-Glove Technical Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
