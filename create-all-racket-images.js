const fs = require('fs');
const path = require('path');

// Read the rackets data file
const racketsFile = fs.readFileSync('./src/data/rackets.ts', 'utf8');

// Extract all imageUrl values
const imageUrlMatches = racketsFile.match(/imageUrl:\s*'([^']+)'/g);
const imageUrls = [];

if (imageUrlMatches) {
  imageUrlMatches.forEach(match => {
    const url = match.match(/'([^']+)'/)[1];
    const filename = path.basename(url);
    imageUrls.push(filename);
  });
}

console.log(`Found ${imageUrls.length} racket images to create`);

// Brand colors mapping
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

// Create SVG template for racket images
const createRacketSVG = (filename) => {
  // Extract brand from filename
  let brand = 'Tennis';
  let model = filename.replace('.svg', '');
  
  // Determine brand from filename
  if (filename.includes('babolat')) brand = 'Babolat';
  else if (filename.includes('wilson')) brand = 'Wilson';
  else if (filename.includes('head')) brand = 'Head';
  else if (filename.includes('yonex')) brand = 'Yonex';
  else if (filename.includes('dunlop')) brand = 'Dunlop';
  else if (filename.includes('prince')) brand = 'Prince';
  else if (filename.includes('tecnifibre')) brand = 'Tecnifibre';
  else if (filename.includes('volkl')) brand = 'Volkl';
  
  const color = brandColors[brand] || '#6B7280';
  
  // Clean up model name
  model = model.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return `<svg width="300" height="200" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="racketGradient-${filename.replace('.svg', '')}" x1="0%" y1="0%" x2="100%" y2="100%">
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
  <rect x="120" y="80" width="60" height="40" fill="url(#racketGradient-${filename.replace('.svg', '')})" rx="5"/>
  
  <!-- Brand text -->
  <text x="150" y="95" text-anchor="middle" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="white">${brand}</text>
  <text x="150" y="110" text-anchor="middle" font-family="Arial, sans-serif" font-size="6" fill="white">${model.substring(0, 12)}</text>
  
  <!-- Decorative elements -->
  <circle cx="150" cy="100" r="2" fill="${color}"/>
</svg>`;
};

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Generate all missing images
let created = 0;
let skipped = 0;

imageUrls.forEach(filename => {
  const filepath = path.join(imagesDir, filename);
  
  // Skip if file already exists
  if (fs.existsSync(filepath)) {
    console.log(`Skipping ${filename} - already exists`);
    skipped++;
    return;
  }
  
  const svgContent = createRacketSVG(filename);
  
  try {
    fs.writeFileSync(filepath, svgContent);
    console.log(`Created ${filename}`);
    created++;
  } catch (error) {
    console.error(`Error creating ${filename}:`, error.message);
  }
});

console.log(`\nImage generation complete!`);
console.log(`Created: ${created} images`);
console.log(`Skipped: ${skipped} images`);
console.log(`Total: ${imageUrls.length} images`);
