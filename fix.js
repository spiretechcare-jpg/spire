const fs = require('fs');
const path = require('path');

const files = [
  'frontend/src/pages/ProductDetail.jsx',
  'frontend/src/pages/Admin.jsx',
  'frontend/src/pages/Products.jsx',
  'frontend/src/pages/Home.jsx',
  'frontend/src/pages/Services.jsx',
  'frontend/src/pages/About.jsx',
  'frontend/src/pages/Contact.jsx',
  'frontend/src/components/Navbar.jsx',
  'frontend/src/components/Footer.jsx',
  'backend/server.js'
];

files.forEach(relativePath => {
  const absolutePath = path.join(__dirname, relativePath);
  if (fs.existsSync(absolutePath)) {
    let content = fs.readFileSync(absolutePath, 'utf8');
    const originalContent = content;
    // Replace \` with `
    content = content.replace(/\\`/g, '`');
    // Replace \$ with $
    content = content.replace(/\\\$/g, '$');
    
    if (content !== originalContent) {
      fs.writeFileSync(absolutePath, content, 'utf8');
      console.log(`Fixed ${relativePath}`);
    }
  } else {
    console.log(`File not found: ${relativePath}`);
  }
});
