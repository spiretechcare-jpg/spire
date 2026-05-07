import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Products() {
  const navigate = useNavigate();
  const { user, addToCart } = useAppContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // States for dynamic filtering
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(100000); // Default high value

  // 1. Automatically extract unique categories from products
  const categories = useMemo(() => {
    const unique = [...new Set(products.map(p => p.category))];
    return unique.filter(Boolean); // Remove empty values
  }, [products]);

  // 2. Fetch products and set initial categories
  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        // Initially select all categories found
        const unique = [...new Set(data.map(p => p.category))];
        setSelectedCategories(unique);
        
        // Find max price for the range slider
        const highest = Math.max(...data.map(p => p.price), 100000);
        setMaxPrice(highest);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // 3. Filter products by both category and price[cite: 4]
  const filteredProducts = products.filter(product => 
    selectedCategories.includes(product.category) && 
    product.price <= maxPrice
  );

  return (
    <div className="pt-32 pb-margin max-w-[1280px] mx-auto px-6">
      <header className="mb-12">
        <h1 className="font-h1 text-[48px] font-bold text-primary-container mb-4">Product Catalog</h1>
        <p className="font-body-lg text-[18px] text-secondary max-w-2xl">Precision hardware and professional-grade components curated for the modern engineer.</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-gutter">
        {/* Sidebar Filter */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="sticky top-28 space-y-8">
            
            {/* Dynamic Category Filter */}
            <div>
              <h3 className="font-h3 text-[20px] font-semibold text-primary-container mb-4">Category</h3>
              <div className="space-y-3">
                {categories.length > 0 ? categories.map(category => (
                  <label key={category} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-outline text-primary-container focus:ring-tertiary-fixed" 
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                    <span className="font-body-md text-on-surface group-hover:text-primary-container transition-colors">{category}</span>
                  </label>
                )) : <p className="text-sm text-secondary italic">No categories found</p>}
              </div>
            </div>

            {/* New Price Range Filter */}
            <div className="pt-6 border-t border-outline-variant">
              <h3 className="font-h3 text-[20px] font-semibold text-primary-container mb-4">Max Price: ₹{maxPrice.toLocaleString()}</h3>
              <input 
                type="range" 
                min="0" 
                max={Math.max(...products.map(p => p.price), 100000)} 
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-secondary mt-2">
                <span>₹0</span>
                <span>₹{Math.max(...products.map(p => p.price), 100000).toLocaleString()}</span>
              </div>
            </div>

          </div>
        </aside>

        {/* Product Grid */}
        <section className="flex-grow">
          {loading ? (
            <div className="text-center py-20 text-secondary text-xl">Loading products...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[24px]">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-surface-container-lowest p-[24px] rounded-lg micro-shadow border-t-2 border-transparent hover:border-tertiary-fixed-dim transition-all duration-300 group flex flex-col">
                  {/* ... Rest of the product card logic remains the same ... */}
                  <Link to={`/products/${product.id}`} className="block">
                    <div className="aspect-square mb-6 bg-surface-container-low overflow-hidden rounded relative">
                      {product.imageUrl && (
                        <img 
                          src={product.imageUrl} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 absolute inset-0"
                        />
                      )}
                    </div>
                  </Link>
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-[10px] uppercase tracking-widest text-on-tertiary-container bg-tertiary-fixed/30 px-2 py-1 rounded">
                      {product.category}
                    </span>
                    <span className="font-bold text-[24px] text-primary-container">₹{product.price}</span>
                  </div>
                  <Link to={`/products/${product.id}`}>
                    <h4 className="font-semibold text-[24px] text-on-surface mb-4 hover:underline">{product.name}</h4>
                  </Link>
                  <div className="mt-auto pt-6 border-t border-surface-container-highest flex items-center justify-between">
                    <span className="font-semibold text-[14px] text-secondary">
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                    <button 
                      onClick={() => !user ? navigate('/login') : addToCart(product)}
                      className="bg-primary-container text-white px-6 py-3 rounded font-semibold text-[14px] uppercase tracking-wider flex items-center gap-2 hover:bg-on-primary-fixed-variant transition-colors active:scale-95 disabled:opacity-50" 
                      disabled={product.stock <= 0}
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}