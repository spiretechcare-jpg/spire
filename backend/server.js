const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Ensure the data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// Database setup
const dbPath = path.join(dataDir, 'database.sqlite');
const db = new Database(dbPath, { verbose: console.log });

// Initialize database table
const initDb = () => {
    db.prepare(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            price REAL NOT NULL,
            category TEXT,
            stock INTEGER DEFAULT 0,
            imageUrl TEXT,
            brand TEXT
        )
    `).run();

    db.prepare(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    `).run();

    db.prepare(`
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            user_name TEXT NOT NULL,
            user_email TEXT NOT NULL,
            user_phone TEXT,
            user_address TEXT,
            products TEXT NOT NULL,
            total_amount REAL NOT NULL,
            shipping_status TEXT DEFAULT 'Processing',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `).run();

    db.prepare(`
        CREATE TABLE IF NOT EXISTS promo_codes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            code TEXT UNIQUE NOT NULL,
            discount_type TEXT NOT NULL, -- 'fixed' or 'percentage'
            discount_value REAL NOT NULL,
            is_active INTEGER DEFAULT 1
        )
    `).run();
    db.prepare(`
        CREATE TABLE IF NOT EXISTS pc_parts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            price REAL NOT NULL,
            imageUrl TEXT,
            socket TEXT, -- For CPU and Motherboard compatibility
            ramType TEXT -- For Motherboard and RAM compatibility
        )
    `).run();

    // Add new columns if they don't exist
    try {
        db.prepare("ALTER TABLE users ADD COLUMN phone TEXT").run();
    } catch (e) {}
    try {
        db.prepare("ALTER TABLE users ADD COLUMN address TEXT").run();
    } catch (e) {}
    try {
        db.prepare("ALTER TABLE users ADD COLUMN profile_image TEXT").run();
    } catch (e) {}
    try {
        db.prepare("ALTER TABLE orders ADD COLUMN user_phone TEXT").run();
    } catch (e) {}
    try {
        db.prepare("ALTER TABLE orders ADD COLUMN user_address TEXT").run();
    } catch (e) {}

    // Insert mock data if empty
    const count = db.prepare('SELECT COUNT(*) as count FROM products').get().count;
    if (count === 0) {
        const insert = db.prepare(`
            INSERT INTO products (name, description, price, category, stock, imageUrl, brand)
            VALUES (@name, @description, @price, @category, @stock, @imageUrl, @brand)
        `);
        const initialProducts = [
            {
                name: 'Spire ZenBook Ultra',
                description: 'High Performance Laptop',
                price: 1899,
                category: 'Laptops',
                stock: 15,
                imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8eRvHWbrUGsMQLY3WNEpLofOLtGVqSUIe87SFMDa9qaiBpTgRkqcsKfJYM9vClOLs0IE6j-T4Wcr7JIUi3EsqwAKts048NWtATitQl4UXOHsPgc6HQaP8NYJKCAh_ArhS5h_VmBDonDYdaa24SKB7uAs28daGYiD9u6xLE4n4T5PvG9mbewmMOM-v1CiNh3_niZSyTYnaqUthz4saQ-cAVSbwaNEcd6PtM5GLqNSq3athAsloaS-MJgNd18qR0CNWaWTVHYMKBVg',
                brand: 'Spire Pro'
            },
            {
                name: 'Titan X8 Workstation',
                description: 'Pro Workstation',
                price: 3450,
                category: 'Desktops',
                stock: 2,
                imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5ydlOEZz0lRZOncvFT1foyuAMKir15dWiR3Bq6FYptNEnp5MMoFQQFOkujTeyxv-C2Wq6f5sdj7H5ddKvDCGs4utEuxPen-i6mn61vYNTXABTK1TfBAMLyoj82gUMhAN9qyrttc-vZw-ghH_t-MKoXybc-xTrqO4C89Gsn1qyNeq_ku-I434FR5hshyd48dSxkBVDh7xE3j6MioZOhs0BaIEfANzDp9GobIgSVGIZyLX6VASLPovywNNKZUGcRyiMlKU5IeGXZ_M',
                brand: 'Titan Series'
            },
            {
                name: 'Vertex G-Force RTX 90',
                description: 'GPU Component',
                price: 899,
                category: 'Components',
                stock: 8,
                imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDinVL-cea5V9Q_jX5m739VirPSUB44isi9Y0b7_hUp0p0iFnoyEzaDI5_IMrTruKbmIE9j0PyNm6qP3nzzfBbFZODnEgB-ocGluTtLNtpNzDH3__gTxAj8ETiURy-zlkKqy5IJuf5sAhHp4o0xLkxAi6nhn0kuCIPwelFXJhEYNrgxmP71JELARHFwfYqJgP6p0Fi6o-tYQCzKnZ9lpXbpy_rlY0m0uKnp7U9yThkCIyN9c9TJs3U2YGZtBmOt48tHX6TlWW1B64',
                brand: 'Vertex Components'
            },
            {
                name: 'Vision 34" Curve Pro',
                description: 'Ultrawide Monitor',
                price: 1299,
                category: 'Accessories',
                stock: 20,
                imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0uhx0DkBoyMTRO1cLoQ4A_0qOuBav3z_J1kh-hvQWFjR5LSyI3pPy-JQsjcQfP8G5dcJh-SFJWbyiUClInREvTI_AjpXs_hYKfiahoZyb-88P2bRqXfwEHQ2n1rPv4Jv1ORolIs6QRZxve0JZJeYpp7GAX_bmEWuX60CMIMFzBMko4OJagEqZMNe894ly22lJKt8fC0Bg5N84Fl6UUFrsI1Qfsg2qfuLaQBh0QpTVQYm4rHjBbnqyR1W7kIMR7HxuAwP3EelD1rw',
                brand: 'Spire Pro'
            },
            {
                name: 'Tactile Pro Key Matrix',
                description: 'Mechanical Keyboard',
                price: 199,
                category: 'Accessories',
                stock: 50,
                imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDALS6vLpHc9LwusVxVhrdC-CA9WXB57Sp-pWq4FcNoBIW_UroyUZakzD3xZEDJOiBsTM1iyBGgl-nc_QnwYWU3FAZzwydL2yAY0ivjD3vUAnbN10NNXXOA8R7TvqjhTlUMwrUVZyqCXGuZxiE8SXFBBWiwK9FErYfeQuIMxeHuRVFxEwA5ilkcxYOq9P-1dUdv6dDZwtKkQZ4GK9gciSLpiuJlvtVbIilBO0eK2Za4-DLjp-iPt3xCSOLxubuWekC2K_7dQLw9H50',
                brand: 'Spire Pro'
            },
            {
                name: 'Spire Velocity 2TB SSD',
                description: 'External SSD',
                price: 249,
                category: 'Storage',
                stock: 35,
                imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOZl2QfCGevE7rXz7J2FhU7Rzc3HurLvrHcPP6Q5ATObl7QuVGRXLYb574vEOzSCJH3xrTKMCi3gyLyKDwfcUxsnJ6Gxk9JM_rZxP7IdBCSh-uRuFB9YKoutJx2tNu7zNEsKQNOBcodaxWxQNn6Ic8Fnu4jwCj6M5lYprmR8oJ5U_iv9l2qXZHc4z1n5wCcODRrkDovRxVWXWVB1kmv0q6EZE7iEDDwsCjDgBePlVDnGFZ0gxJ2uH2Tffk7ZSiYNyRX1FEssFi9MA',
                brand: 'Spire Pro'
            }
        ];
        
        initialProducts.forEach(product => insert.run(product));
    }
    // Insert mock PC parts if empty
    const pcPartsCount = db.prepare('SELECT COUNT(*) as count FROM pc_parts').get().count;
    if (pcPartsCount === 0) {
        const insertPart = db.prepare(`
            INSERT INTO pc_parts (name, category, price, imageUrl, socket, ramType)
            VALUES (@name, @category, @price, @imageUrl, @socket, @ramType)
        `);
        const initialParts = [
            // CPUs
            { name: 'Intel Core i9-14900K', category: 'cpu', price: 58900, imageUrl: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=200', socket: 'LGA1700', ramType: null },
            { name: 'AMD Ryzen 9 7950X', category: 'cpu', price: 54900, imageUrl: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=200', socket: 'AM5', ramType: null },
            { name: 'Intel Core i7-13700K', category: 'cpu', price: 39900, imageUrl: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=200', socket: 'LGA1700', ramType: null },
            // Motherboards
            { name: 'ASUS ROG Maximus Z790', category: 'motherboard', price: 62900, imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200', socket: 'LGA1700', ramType: 'DDR5' },
            { name: 'MSI MAG B650 Tomahawk', category: 'motherboard', price: 21900, imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200', socket: 'AM5', ramType: 'DDR5' },
            { name: 'Gigabyte Z790 AORUS ELITE', category: 'motherboard', price: 25900, imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200', socket: 'LGA1700', ramType: 'DDR4' },
            // RAM
            { name: 'Corsair Vengeance 32GB DDR5-6000', category: 'ram', price: 12900, imageUrl: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=200', socket: null, ramType: 'DDR5' },
            { name: 'G.Skill Trident Z5 32GB DDR5', category: 'ram', price: 14900, imageUrl: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=200', socket: null, ramType: 'DDR5' },
            { name: 'Kingston Fury 16GB DDR4-3200', category: 'ram', price: 5900, imageUrl: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=200', socket: null, ramType: 'DDR4' },
            // GPUs
            { name: 'NVIDIA RTX 4090 24GB', category: 'gpu', price: 159900, imageUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=200', socket: null, ramType: null },
            { name: 'NVIDIA RTX 4080 Super', category: 'gpu', price: 99900, imageUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=200', socket: null, ramType: null },
            { name: 'AMD Radeon RX 7900 XTX', category: 'gpu', price: 94900, imageUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=200', socket: null, ramType: null },
            // Storage
            { name: 'Samsung 990 Pro 2TB NVMe', category: 'ssd', price: 17900, imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=200', socket: null, ramType: null },
            { name: 'WD Black SN850X 1TB', category: 'ssd', price: 8900, imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=200', socket: null, ramType: null },
            // PSUs
            { name: 'Corsair RM1000x 80+ Gold', category: 'psu', price: 18900, imageUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200', socket: null, ramType: null },
            { name: 'EVGA SuperNOVA 850G', category: 'psu', price: 14900, imageUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200', socket: null, ramType: null },
            // Cases
            { name: 'Lian Li O11 Dynamic EVO', category: 'cabinet', price: 16900, imageUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200', socket: null, ramType: null },
            { name: 'NZXT H9 Elite Black', category: 'cabinet', price: 23900, imageUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200', socket: null, ramType: null }
        ];
        initialParts.forEach(part => insertPart.run(part));
    }
};

initDb();

// Routes
// Get all products
app.get('/api/products', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM products');
        const products = stmt.all();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single product
app.get('/api/products/:id', (req, res) => {
    try {
        const { id } = req.params;
        const stmt = db.prepare('SELECT * FROM products WHERE id = ?');
        const product = stmt.get(id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a product
app.post('/api/products', (req, res) => {
    try {
        const { name, description, price, category, stock, imageUrl, brand } = req.body;
        const stmt = db.prepare(`
            INSERT INTO products (name, description, price, category, stock, imageUrl, brand)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `);
        const info = stmt.run(name, description, price, category, stock, imageUrl, brand);
        
        const newProduct = db.prepare('SELECT * FROM products WHERE id = ?').get(info.lastInsertRowid);
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a product
app.put('/api/products/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, stock, imageUrl, brand } = req.body;
        
        const stmt = db.prepare(`
            UPDATE products 
            SET name = ?, description = ?, price = ?, category = ?, stock = ?, imageUrl = ?, brand = ?
            WHERE id = ?
        `);
        const result = stmt.run(name, description, price, category, stock, imageUrl, brand, id);
        
        if (result.changes > 0) {
            const updatedProduct = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
            res.json(updatedProduct);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a product
app.delete('/api/products/:id', (req, res) => {
    try {
        const { id } = req.params;
        const stmt = db.prepare('DELETE FROM products WHERE id = ?');
        const result = stmt.run(id);
        
        if (result.changes > 0) {
            res.json({ message: 'Product deleted successfully', id });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Register a new user
app.post('/api/register', (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Simple plain-text password for prototype
        const stmt = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
        const info = stmt.run(name, email, password);
        
        const newUser = db.prepare('SELECT id, name, email FROM users WHERE id = ?').get(info.lastInsertRowid);
        res.status(201).json(newUser);
    } catch (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
            res.status(400).json({ error: 'Email already exists' });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
});

// Login a user
app.post('/api/login', (req, res) => {
    try {
        const { email, password } = req.body;
        
        const stmt = db.prepare('SELECT id, name, email, phone, address, profile_image FROM users WHERE email = ? AND password = ?');
        const user = stmt.get(email, password);
        
        if (user) {
            res.json(user);
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update user profile
app.put('/api/users/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { phone, address, profile_image } = req.body;
        
        const stmt = db.prepare(`
            UPDATE users 
            SET phone = ?, address = ?, profile_image = ?
            WHERE id = ?
        `);
        const result = stmt.run(phone, address, profile_image, id);
        
        if (result.changes > 0) {
            const updatedUser = db.prepare('SELECT id, name, email, phone, address, profile_image FROM users WHERE id = ?').get(id);
            res.json(updatedUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create an order
app.post('/api/orders', (req, res) => {
    try {
        const { user_id, user_name, user_email, user_phone, user_address, products, total_amount } = req.body;
        const stmt = db.prepare(`
            INSERT INTO orders (user_id, user_name, user_email, user_phone, user_address, products, total_amount)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `);
        const info = stmt.run(user_id, user_name, user_email, user_phone, user_address, JSON.stringify(products), total_amount);
        const newOrder = db.prepare('SELECT * FROM orders WHERE id = ?').get(info.lastInsertRowid);
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all orders (Admin)
app.get('/api/orders', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM orders ORDER BY created_at DESC');
        const orders = stmt.all();
        res.json(orders.map(order => ({ ...order, products: JSON.parse(order.products) })));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get user orders
app.get('/api/orders/user/:userId', (req, res) => {
    try {
        const { userId } = req.params;
        const stmt = db.prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC');
        const orders = stmt.all(userId);
        res.json(orders.map(order => ({ ...order, products: JSON.parse(order.products) })));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update order shipping status (Admin)
app.put('/api/orders/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { shipping_status } = req.body;
        const stmt = db.prepare('UPDATE orders SET shipping_status = ? WHERE id = ?');
        const result = stmt.run(shipping_status, id);
        
        if (result.changes > 0) {
            const updatedOrder = db.prepare('SELECT * FROM orders WHERE id = ?').get(id);
            res.json({ ...updatedOrder, products: JSON.parse(updatedOrder.products) });
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Promo Code Endpoints
app.get('/api/promo-codes', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM promo_codes');
        res.json(stmt.all());
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/promo-codes', (req, res) => {
    try {
        const { code, discount_type, discount_value } = req.body;
        const stmt = db.prepare('INSERT INTO promo_codes (code, discount_type, discount_value) VALUES (?, ?, ?)');
        const info = stmt.run(code, discount_type, discount_value);
        const newCode = db.prepare('SELECT * FROM promo_codes WHERE id = ?').get(info.lastInsertRowid);
        res.status(201).json(newCode);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/promo-codes/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { code, discount_type, discount_value, is_active } = req.body;
        const stmt = db.prepare('UPDATE promo_codes SET code = ?, discount_type = ?, discount_value = ?, is_active = ? WHERE id = ?');
        stmt.run(code, discount_type, discount_value, is_active, id);
        res.json(db.prepare('SELECT * FROM promo_codes WHERE id = ?').get(id));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/promo-codes/:id', (req, res) => {
    try {
        const { id } = req.params;
        db.prepare('DELETE FROM promo_codes WHERE id = ?').run(id);
        res.json({ message: 'Promo code deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// PC Parts Endpoints
app.get('/api/pc-parts', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM pc_parts');
        res.json(stmt.all());
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/pc-parts', (req, res) => {
    try {
        const { name, category, price, imageUrl, socket, ramType } = req.body;
        const stmt = db.prepare('INSERT INTO pc_parts (name, category, price, imageUrl, socket, ramType) VALUES (?, ?, ?, ?, ?, ?)');
        const info = stmt.run(name, category, price, imageUrl, socket, ramType);
        res.status(201).json({ id: info.lastInsertRowid, ...req.body });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/pc-parts/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, price, imageUrl, socket, ramType } = req.body;
        const stmt = db.prepare('UPDATE pc_parts SET name = ?, category = ?, price = ?, imageUrl = ?, socket = ?, ramType = ? WHERE id = ?');
        stmt.run(name, category, price, imageUrl, socket, ramType, id);
        res.json({ id, ...req.body });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/pc-parts/:id', (req, res) => {
    try {
        const { id } = req.params;
        db.prepare('DELETE FROM pc_parts WHERE id = ?').run(id);
        res.json({ message: 'PC part deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/promo-codes/validate/:code', (req, res) => {
    try {
        const { code } = req.params;
        const stmt = db.prepare('SELECT * FROM promo_codes WHERE code = ? AND is_active = 1');
        const promo = stmt.get(code);
        if (promo) {
            res.json(promo);
        } else {
            res.status(404).json({ error: 'Invalid or expired promo code' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
