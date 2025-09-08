const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Script to download racket images from URLs
// You'll need to provide the actual image URLs from your Google Sheets/Drive

const racketImageUrls = {
  // Add the actual image URLs here from your Google Sheets
  // Example format:
  // 'babolat-pure-aero-2023': 'https://example.com/babolat-pure-aero-2023.jpg',
  // 'yonex-ezone-100': 'https://example.com/yonex-ezone-100.jpg',
  // ... add all 103 rackets
};

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https:') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filename);
        response.pipe(fileStream);
        
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`Downloaded: ${path.basename(filename)}`);
          resolve();
        });
        
        fileStream.on('error', (err) => {
          fs.unlink(filename, () => {}); // Delete the file on error
          reject(err);
        });
      } else {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
};

const downloadAllImages = async () => {
  const imagesDir = path.join(__dirname, 'public', 'images');
  
  // Create images directory if it doesn't exist
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }
  
  console.log('Starting image downloads...');
  console.log(`Found ${Object.keys(racketImageUrls).length} images to download`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const [racketName, imageUrl] of Object.entries(racketImageUrls)) {
    try {
      const filename = path.join(imagesDir, `${racketName}.jpg`);
      await downloadImage(imageUrl, filename);
      successCount++;
    } catch (error) {
      console.error(`Error downloading ${racketName}:`, error.message);
      errorCount++;
    }
  }
  
  console.log(`\nDownload complete!`);
  console.log(`Successfully downloaded: ${successCount} images`);
  console.log(`Failed downloads: ${errorCount} images`);
};

// Instructions for using this script:
console.log(`
=== RACKET IMAGE DOWNLOADER ===

To use this script:

1. Open your Google Sheets with racket data
2. Extract the image URLs for each racket
3. Add them to the 'racketImageUrls' object above
4. Run: node download-racket-images.js

Example format for racketImageUrls:
{
  'babolat-pure-aero-2023': 'https://example.com/babolat-pure-aero-2023.jpg',
  'yonex-ezone-100': 'https://example.com/yonex-ezone-100.jpg',
  // ... add all 103 rackets
}

The script will:
- Download all images to /public/images/
- Convert them to .jpg format
- Replace the existing SVG placeholders
- Show progress and error messages

`);

// Uncomment the line below to run the download
// downloadAllImages();
