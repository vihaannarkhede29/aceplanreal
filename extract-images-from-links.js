const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Racket data with links from your Google Sheets
const racketData = [
  { name: "Babolat Pure Aero 2023", link: "https://amzn.to/3JOKGWA" },
  { name: "Wilson Pro Staff RF97 v14", link: "https://www.amazon.com/Wilson-Staff-Performance-Tennis-Racket/dp/B0BV8C4ZWX/ref=sr_1_1_sspa?crid=1NJSSF65P9J4Y&dib=eyJ2IjoiMSJ9.mo5J7qpxR6aG-HHu-H3ec0vfGHgsg_BpHEUA0xzyZueS_xNhztqKd6qjEaj0gCgnn9CEpRBsN3rfrkV0zNQiuvORqQGiP2gtdSUkor8TNXOQvIdDSNsJWBuDYemNcEhOAzFGbNwmcDij8cOiP7tNGHE8CdORi9U5BZd4P6o7RZG4Ourtn70W9IvLrI72CTYvQMt-gpsZMO6ezHLqm7W6BKtuntkSU9mBzvHEYH2VxAPO4-nnUIF1vAgvBXSqSEEOCAcbj5BApsxTd9G-FKoNQXara_hOodpADa7eM6w9kUg.maJ0Up1SQQWzdNzFIT_I_zlXxEwUWIM5Vu5d1J9S-lc&dib_tag=se&keywords=Wilson%2BPro%2BStaff%2BRF97%2Bv13&qid=1757025470&sprefix=babolat%2Bpure%2Baero%2B2023%2Caps%2C200&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1" },
  { name: "Head Radical MP 2021", link: "https://amzn.to/4659MrL" },
  { name: "Yonex EZONE 100", link: "https://amzn.to/46aFhRn" },
  { name: "Prince Textreme Tour 100P", link: "https://princetennis.com/tour-100p" },
  { name: "Wilson Blade 98 v8", link: "https://amzn.to/4g66wAR" },
  { name: "Babolat Pure Strike 16x19", link: "https://amzn.to/46bXq15" },
  { name: "Head Speed MP", link: "https://amzn.to/4mbe2Mw" },
  { name: "Yonex VCORE 100", link: "https://amzn.to/42dZBjn" },
  { name: "Prince Phantom 100X", link: "https://www.tennis-warehouse.com/Prince_Phantom_100X_305g/descpageRCTWABG-PHNX5.html?from=gpmax&gad_source=1&gad_campaignid=17347568867&gbraid=0AAAAADyKN7gUY1gJYYSjVzwwhSvcyhLVS&gclid=CjwKCAjwt-_FBhBzEiwA7QEqyJ9ew8gx3hOZTmJrYkXZqx1QFt1wsxPqUdI3qrAQK678KNTZwNGBbBoCgPoQAvD_BwE" },
  { name: "Wilson Clash 100 v2", link: "https://amzn.to/47wU9f1" },
  { name: "Babolat Pure Drive", link: "https://amzn.to/3K7poU6" },
  { name: "Head Extreme MP 2022", link: "https://amzn.to/45ROu1X" },
  { name: "Yonex VCORE Pro 100", link: "https://amzn.to/4m1a2hi" },
  { name: "Prince Textreme Tour 100T", link: "https://princetennis.com/tour-100t" },
  { name: "Wilson Ultra 100 v4", link: "https://amzn.to/464QUcf" },
  { name: "Babolat Pure Strike 18x20", link: "https://amzn.to/4m1afB6" },
  { name: "Head Prestige MP", link: "https://amzn.to/4mR6dfO" },
  { name: "Yonex EZONE 98", link: "https://amzn.to/4m1MYz2" },
  { name: "Prince Phantom 100P", link: "https://www.tennis-warehouse.com/Prince_Phantom_100P/descpageRCPRINCE-PHNP1.html?from=gpmax&gad_source=1&gad_campaignid=17347568867&gbraid=0AAAAADyKN7je-c5OW94ooCiT-rJiPvrgO&gclid=CjwKCAjwt-_FBhBzEiwA7QEqyAVYla2HBXbBITg9_W6at-tfVZea6o-EWlb9RVTM8xrHWY9RNL29MRoCzY4QAvD_BwE" }
  // Add more rackets as needed
];

// Function to convert racket name to filename
const nameToFilename = (name) => {
  return name.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

// Function to get image URL from Amazon product page
const getAmazonImageUrl = async (url) => {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https:') ? https : http;
    
    protocol.get(url, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        // Look for the main product image in Amazon's HTML
        const imageMatch = data.match(/<img[^>]*id="landingImage"[^>]*src="([^"]+)"/);
        if (imageMatch) {
          resolve(imageMatch[1]);
        } else {
          // Fallback: look for any large product image
          const fallbackMatch = data.match(/<img[^>]*src="([^"]*images-amazon\.com[^"]*)"[^>]*>/);
          if (fallbackMatch) {
            resolve(fallbackMatch[1]);
          } else {
            reject(new Error('No image found'));
          }
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
};

// Function to download image
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
          fs.unlink(filename, () => {});
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

// Main function to process all rackets
const processRackets = async () => {
  const imagesDir = path.join(__dirname, 'public', 'images');
  
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }
  
  console.log('Starting image extraction from product links...');
  console.log(`Processing ${racketData.length} rackets`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const racket of racketData) {
    try {
      const filename = nameToFilename(racket.name);
      const filepath = path.join(imagesDir, `${filename}.jpg`);
      
      console.log(`Processing: ${racket.name}`);
      
      if (racket.link.includes('amazon.com') || racket.link.includes('amzn.to')) {
        // Handle Amazon links
        const imageUrl = await getAmazonImageUrl(racket.link);
        await downloadImage(imageUrl, filepath);
        successCount++;
      } else {
        // For other sites, we'll need to implement specific scrapers
        console.log(`Skipping non-Amazon link: ${racket.link}`);
        errorCount++;
      }
    } catch (error) {
      console.error(`Error processing ${racket.name}:`, error.message);
      errorCount++;
    }
  }
  
  console.log(`\nProcessing complete!`);
  console.log(`Successfully processed: ${successCount} rackets`);
  console.log(`Failed: ${errorCount} rackets`);
};

// Alternative approach: Use web scraping libraries
console.log(`
=== RACKET IMAGE EXTRACTOR ===

This script can extract images from Amazon product pages.

LIMITATIONS:
- Amazon has anti-scraping measures
- Some links may not work due to redirects
- Manufacturer sites need custom scrapers

ALTERNATIVE APPROACHES:

1. MANUAL DOWNLOAD:
   - Visit each Amazon link
   - Right-click on the main product image
   - Save as: racket-name.jpg
   - Place in /public/images/

2. USE AMAZON API:
   - Sign up for Amazon Product Advertising API
   - Get official product images
   - More reliable but requires API setup

3. STOCK PHOTO SOURCES:
   - Use the provided stock photo links
   - Search for each racket model
   - Download high-quality images

4. MANUFACTURER WEBSITES:
   - Visit official brand websites
   - Download product images directly
   - Usually highest quality

RECOMMENDED APPROACH:
Start with the top 10 rackets manually, then use stock photos for the rest.

`);

// Uncomment to run the extraction
// processRackets();
