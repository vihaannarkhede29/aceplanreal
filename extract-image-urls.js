const fs = require('fs');
const path = require('path');

// Script to help extract and format image URLs from Google Sheets data
// This will help you prepare the image URLs for download

console.log(`
=== RACKET IMAGE URL EXTRACTOR ===

This script helps you extract image URLs from your Google Sheets data.

STEPS TO GET REAL RACKET IMAGES:

1. OPEN YOUR GOOGLE SHEETS:
   https://docs.google.com/spreadsheets/d/1BDcm92RBg6Wnh63XlN5ktkOWz9tUQ1ZRAjJhouCaUos/edit

2. LOOK FOR IMAGE COLUMNS:
   - Find columns with racket images
   - Copy the image URLs or download links
   - Note the racket names that correspond to each image

3. FORMAT THE URLs:
   Use this format for each racket:
   'racket-filename': 'https://actual-image-url.com/image.jpg',

4. UPDATE THE download-racket-images.js FILE:
   - Replace the empty racketImageUrls object
   - Add all 103 racket image URLs
   - Run: node download-racket-images.js

EXAMPLE FORMAT:
const racketImageUrls = {
  'babolat-pure-aero-2023': 'https://example.com/babolat-pure-aero-2023.jpg',
  'yonex-ezone-100': 'https://example.com/yonex-ezone-100.jpg',
  'wilson-pro-staff-rf97-v14': 'https://example.com/wilson-pro-staff-rf97-v14.jpg',
  // ... add all 103 rackets
};

ALTERNATIVE APPROACH:
If the Google Sheets has image URLs embedded, you can:

1. Export the sheet as CSV
2. Use this script to parse the CSV and extract image URLs
3. Automatically format them for download

`);

// Function to parse CSV and extract image URLs (if you export from Google Sheets)
const parseCSVForImages = (csvContent) => {
  const lines = csvContent.split('\n');
  const headers = lines[0].split(',');
  
  // Find the column index for image URLs
  const imageColumnIndex = headers.findIndex(header => 
    header.toLowerCase().includes('image') || 
    header.toLowerCase().includes('url') ||
    header.toLowerCase().includes('photo')
  );
  
  if (imageColumnIndex === -1) {
    console.log('No image column found in CSV');
    return {};
  }
  
  const racketImageUrls = {};
  
  for (let i = 1; i < lines.length; i++) {
    const columns = lines[i].split(',');
    if (columns.length > imageColumnIndex) {
      const racketName = columns[0]?.toLowerCase().replace(/\s+/g, '-');
      const imageUrl = columns[imageColumnIndex]?.trim();
      
      if (racketName && imageUrl && imageUrl.startsWith('http')) {
        racketImageUrls[racketName] = imageUrl;
      }
    }
  }
  
  return racketImageUrls;
};

// Function to generate the download script with extracted URLs
const generateDownloadScript = (racketImageUrls) => {
  const scriptContent = `const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const racketImageUrls = ${JSON.stringify(racketImageUrls, null, 2)};

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https:') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filename);
        response.pipe(fileStream);
        
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(\`Downloaded: \${path.basename(filename)}\`);
          resolve();
        });
        
        fileStream.on('error', (err) => {
          fs.unlink(filename, () => {});
          reject(err);
        });
      } else {
        reject(new Error(\`Failed to download \${url}: \${response.statusCode}\`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
};

const downloadAllImages = async () => {
  const imagesDir = path.join(__dirname, 'public', 'images');
  
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }
  
  console.log('Starting image downloads...');
  console.log(\`Found \${Object.keys(racketImageUrls).length} images to download\`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const [racketName, imageUrl] of Object.entries(racketImageUrls)) {
    try {
      const filename = path.join(imagesDir, \`\${racketName}.jpg\`);
      await downloadImage(imageUrl, filename);
      successCount++;
    } catch (error) {
      console.error(\`Error downloading \${racketName}:\`, error.message);
      errorCount++;
    }
  }
  
  console.log(\`\\nDownload complete!\`);
  console.log(\`Successfully downloaded: \${successCount} images\`);
  console.log(\`Failed downloads: \${errorCount} images\`);
};

downloadAllImages();`;

  fs.writeFileSync('download-racket-images-auto.js', scriptContent);
  console.log('Generated download-racket-images-auto.js with extracted URLs');
};

console.log(`
QUICK START GUIDE:

1. Go to your Google Sheets
2. Look for image URLs in the data
3. Copy the URLs and racket names
4. Update the download-racket-images.js file
5. Run: node download-racket-images.js

The images will be downloaded to /public/images/ and replace the SVG placeholders.
`);
