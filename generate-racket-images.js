const fs = require('fs');
const path = require('path');

// Read the rackets data file and extract image URLs
const racketsFile = fs.readFileSync('./src/data/rackets.ts', 'utf8');

// Extract imageUrl values using regex
const imageUrlMatches = racketsFile.match(/imageUrl:\s*'([^']+)'/g);
const imageUrls = new Set();

if (imageUrlMatches) {
  imageUrlMatches.forEach(match => {
    const url = match.match(/'([^']+)'/)[1];
    const filename = path.basename(url);
    imageUrls.add(filename);
  });
}

// Extract racket names and brands for generating images
const racketMatches = racketsFile.match(/name:\s*'([^']+)',[\s\S]*?brand:\s*'([^']+)'/g);
const rackets = [];

if (racketMatches) {
  racketMatches.forEach(match => {
    const nameMatch = match.match(/name:\s*'([^']+)'/);
    const brandMatch = match.match(/brand:\s*'([^']+)'/);
    const imageUrlMatch = match.match(/imageUrl:\s*'([^']+)'/);
    
    if (nameMatch && brandMatch && imageUrlMatch) {
      rackets.push({
        name: nameMatch[1],
        brand: brandMatch[1],
        imageUrl: imageUrlMatch[1]
      });
    }
  });
}

rackets.forEach(racket => {
  if (racket.imageUrl) {
    const filename = path.basename(racket.imageUrl);
    imageUrls.add(filename);
  }
});

// Create SVG template for racket images
const createRacketSVG = (brand, model) => {
  const brandColors = {
    'Babolat': '#FF6B35',
    'Wilson': '#1E40AF', 
    'Head': '#059669',
    'Yonex': '#7C3AED',
    'Dunlop': '#DC2626',
    'Prince': '#EA580C',
    'Tecnifibre': '#0891B2',
    'Volkl': '#BE185D'
  };

  const color = brandColors[brand] || '#6B7280';
  
  return `<svg width="300" height="200" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="racketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color};stop-opacity:0.8" />
      <stop offset="100%" style="stop-color:${color};stop-opacity:0.4" />
    </linearGradient>
  </defs>
  
  <!-- Racket frame -->
  <ellipse cx="150" cy="100" rx="80" ry="120" fill="none" stroke="${color}" stroke-width="3"/>
  
  <!-- Racket strings -->
  <line x1="70" y1="100" x2="230" y2="100" stroke="${color}" stroke-width="1" opacity="0.6"/>
  <line x1="150" y1="20" x2="150" y2="180" stroke="${color}" stroke-width="1" opacity="0.6"/>
  
  <!-- Brand logo area -->
  <rect x="120" y="80" width="60" height="40" fill="url(#racketGradient)" rx="5"/>
  
  <!-- Brand text -->
  <text x="150" y="95" text-anchor="middle" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="white">${brand}</text>
  <text x="150" y="110" text-anchor="middle" font-family="Arial, sans-serif" font-size="6" fill="white">${model}</text>
  
  <!-- Decorative elements -->
  <circle cx="150" cy="100" r="2" fill="${color}"/>
</svg>`;
};

// Generate images for all rackets
console.log('Generating racket images...');
console.log(`Found ${rackets.length} rackets to process`);

rackets.forEach(racket => {
  if (racket.imageUrl) {
    const filename = path.basename(racket.imageUrl);
    const filepath = path.join(__dirname, 'public', 'images', filename);
    
    // Skip if file already exists
    if (fs.existsSync(filepath)) {
      console.log(`Skipping ${filename} - already exists`);
      return;
    }
    
    // Extract brand and model from racket name
    const brand = racket.brand || 'Tennis';
    const model = racket.name.replace(brand, '').trim().substring(0, 10);
    
    const svgContent = createRacketSVG(brand, model);
    
    try {
      fs.writeFileSync(filepath, svgContent);
      console.log(`Created ${filename}`);
    } catch (error) {
      console.error(`Error creating ${filename}:`, error.message);
    }
  }
});

console.log('Racket image generation complete!');
