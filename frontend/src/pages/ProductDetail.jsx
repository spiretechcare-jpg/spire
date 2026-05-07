import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ShoppingCart, Shield, Truck, RotateCcw } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, addToCart } = useAppContext();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="pt-32 pb-margin text-center text-xl">Loading product details...</div>;
  }

  if (!product) {
    return <div className="pt-32 pb-margin text-center text-xl text-red-500">Product not found.</div>;
  }

  return (
    <div className="pt-32 pb-margin max-w-[1280px] mx-auto px-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 font-label-sm text-sm text-secondary mb-8">
        <Link to="/" className="hover:text-primary-container transition-colors">Home</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <Link to="/products" className="hover:text-primary-container transition-colors">Catalog</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-primary-container font-semibold">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="bg-surface-container-lowest rounded-xl p-8 micro-shadow border border-outline-variant flex items-center justify-center min-h-[500px]">
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} className="max-w-full max-h-[500px] object-contain drop-shadow-2xl" />
            ) : (
              <div className="text-secondary">No image available</div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-2">
            <span className="font-semibold text-[12px] uppercase tracking-widest text-on-tertiary-container bg-tertiary-fixed/30 px-3 py-1 rounded-full">{product.brand}</span>
          </div>
          <h1 className="font-h1 text-[48px] font-bold text-primary-container mb-4">{product.name}</h1>
          <p className="font-body-lg text-[18px] text-secondary mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="text-[36px] font-bold text-primary-container mb-8">
            ₹{product.price}
          </div>

          {/* Configuration / Options could go here */}

          <div className="mt-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-[14px] text-on-surface">Availability:</span>
              <span className={`font-semibold text-[14px] ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {product.stock > 0 ? `In Stock (${product.stock} units)` : "Out of Stock"}
              </span>
            </div>

            <button 
              className="w-full bg-primary text-white py-4 rounded-lg font-semibold text-[16px] uppercase tracking-wider flex items-center justify-center gap-3 hover:bg-primary-container shadow-xl transition-all active:scale-95 disabled:opacity-50"
              disabled={product.stock <= 0}
              onClick={() => {
                if (!user) {
                  navigate('/login');
                } else {
                  addToCart(product);
                  navigate('/cart');
                }
              }}
            >
              <ShoppingCart size={20} />
              Add to Configuration
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-surface-container-highest">
            <div className="flex flex-col items-center text-center gap-2">
              <Shield className="text-tertiary-container" size={24} />
              <span className="font-semibold text-[12px] uppercase text-secondary">3-Year Warranty</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Truck className="text-tertiary-container" size={24} />
              <span className="font-semibold text-[12px] uppercase text-secondary">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <RotateCcw className="text-tertiary-container" size={24} />
              <span className="font-semibold text-[12px] uppercase text-secondary">30-Day Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
