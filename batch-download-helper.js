const fs = require('fs');
const path = require('path');

// Complete racket data from your Google Sheets
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
  { name: "Prince Phantom 100P", link: "https://www.tennis-warehouse.com/Prince_Phantom_100P/descpageRCPRINCE-PHNP1.html?from=gpmax&gad_source=1&gad_campaignid=17347568867&gbraid=0AAAAADyKN7je-c5OW94ooCiT-rJiPvrgO&gclid=CjwKCAjwt-_FBhBzEiwA7QEqyAVYla2HBXbBITg9_W6at-tfVZea6o-EWlb9RVTM8xrHWY9RNL29MRoCzY4QAvD_BwE" },
  { name: "Wilson Blade 98 16x19 v8", link: "https://amzn.to/3I4BXz4" },
  { name: "Babolat Pure Aero Lite", link: "https://amzn.to/4nn5UcM" },
  { name: "Head Speed Lite 2022", link: "https://amzn.to/4n9ZMF7" },
  { name: "Yonex VCORE 98", link: "https://amzn.to/4mRH7h9" },
  { name: "Prince Textreme Tour 95P", link: "https://www.tennis-warehouse.com/Prince_ATS_Textreme_Tour_95/descpageRCTWABG-ATR95.html?from=gpmax&gad_source=1&gad_campaignid=17347568867&gbraid=0AAAAADyKN7gUY1gJYYSjVzwwhSvcyhLVS&gclid=CjwKCAjwt-_FBhBzEiwA7QEqyNOaNurK5mqp1H3W1iwCl4lkOqFp60BR5961otl9If_PHxsFspHPFRoC1wAQAvD_BwE" },
  { name: "Wilson Clash 100L", link: "https://amzn.to/3I4CgKe" },
  { name: "Babolat Pure Drive Lite", link: "https://amzn.to/4pcnEcs" },
  { name: "HEAD Graphene 360+ Extreme MP Tennis Racquet", link: "https://amzn.to/4p5LIxv" },
  { name: "Yonex EZONE 100L", link: "https://amzn.to/4gvKjwB" },
  { name: "Prince Textreme Tour 100L", link: "https://princetennis.com/tour-100l" },
  { name: "Wilson Ultra 100L v4", link: "https://amzn.to/4gcyuuY" },
  { name: "Babolat Pure Strike 100L", link: "https://amzn.to/45ROKOt" },
  { name: "Head Prestige MP Lite", link: "https://www.tennis-warehouse.com/Head_Prestige_MP_L/descpageRCHEAD-HPRMPL.html?srsltid=AfmBOor0PIJdhDVE4gA3YTj6veWJRSABEU2QckfGf8Dps4-1oW_rLjg_" },
  { name: "Yonex VCORE 100L", link: "https://amzn.to/4gaHgJP" },
  { name: "Prince Phantom 100L", link: "https://princetennis.com/phantom-100l" },
  { name: "Wilson Blade 104 v9", link: "https://amzn.to/3HOohbr" },
  { name: "Babolat Pure Aero 100", link: "https://amzn.to/45V31dm" },
  { name: "Head Speed Pro 2025", link: "https://amzn.to/3V4ngPn" },
  { name: "Yonex EZONE 98L", link: "https://amzn.to/45QgJhu" },
  { name: "Prince Textreme Tour 95L", link: "https://princetennis.com/tour-95l" },
  { name: "Wilson Clash 100UL", link: "https://amzn.to/46aEuQn" },
  { name: "Babolat Pure Drive 100L", link: "https://amzn.to/47qgpXY" },
  { name: "Head Extreme MP Lite 2023", link: "https://www.tennis-warehouse.com/Head_Extreme_MP_Lite_2023/descpageRCHEAD-HEMPL.html" },
  { name: "Yonex VCORE Pro 97", link: "https://amzn.to/4m3ZH4o" },
  { name: "Prince Phantom 93L", link: "https://princetennis.com/phantom-93l" },
  { name: "Wilson Blade 104L v8", link: "https://amzn.to/46dII9X" },
  { name: "Babolat Pure Aero Lite 100", link: "https://amzn.to/480ZD1O" },
  { name: "Head Speed MP Lite 2023", link: "https://amzn.to/4lZRBcL" },
  { name: "Yonex EZONE 100UL", link: "https://amzn.to/42dZWm9" },
  { name: "Prince Textreme Tour 100UL", link: "https://princetennis.com/tour-100ul" },
  { name: "Wilson Ultra 100UL v4", link: "https://amzn.to/41FaSZZ" },
  { name: "Babolat Pure Strike 100UL", link: "https://www.babolat.com/us/pure-strike-100-lite/101484.html" },
  { name: "Head Prestige MP Lite 2023", link: "https://amzn.to/42jSc1X" },
  { name: "Yonex VCORE 98UL", link: "https://amzn.to/3V5kvNU" },
  { name: "Prince Phantom 95L", link: "https://princetennis.com/phantom-95l" },
  { name: "Wilson Clash 100UL v2", link: "https://amzn.to/3I4Cwca" },
  { name: "Babolat Pure Drive Lite 100L", link: "https://amzn.to/462rVI5" },
  { name: "Head Auxetic 2.0 Extreme MP L Tennis Racquet", link: "https://amzn.to/4p78k0N" },
  { name: "Yonex EZONE 98UL", link: "https://amzn.to/480ZMlS" },
  { name: "Prince Textreme Tour 95UL", link: "https://princetennis.com/tour-95ul" },
  { name: "Wilson Ultra 105L v4", link: "https://amzn.to/4gcpuWv" },
  { name: "Babolat Pure Aero 100L", link: "https://amzn.to/3HOoyLv" },
  { name: "Head Speed MP Lite 2022", link: "https://amzn.to/4g7c5yY" },
  { name: "Yonex VCORE 100UL", link: "https://amzn.to/4m7fq2u" },
  { name: "Prince Phantom 100UL v2", link: "https://princetennis.com/phantom-100ul-v2" },
  { name: "Wilson Blade 104UL v8", link: "https://amzn.to/4gvKOGZ" },
  { name: "Babolat Pure Strike 100UL v4", link: "https://amzn.to/46898d3" },
  { name: "Head Prestige MP Lite 2023", link: "https://www.midwestracquetsports.com/head-speed-mp-l-2024-tennis-racquet/p/236024/?device=c&ttm_source=google&ttm_medium=cpc&ttm_campaign=google_shopping_tennis_racquets&gad_source=1&gad_campaignid=14994851203&gbraid=0AAAAAD_rX5XkOkmZa-sF0GhcM-DSbIhX1&gclid=CjwKCAjwt-_FBhBzEiwA7QEqyENvlJ3U87r-HQBawrQ6g_5AcxYNxfFYn_8HfgRRXG0WvK5moJDQlxoCm0kQAvD_BwE" },
  { name: "Yonex EZONE 100UL v2", link: "https://amzn.to/46aEQ9F" },
  { name: "Prince Textreme Tour 100UL v2", link: "https://princetennis.com/tour-100ul-v2" },
  { name: "Wilson Ultra 100UL v5", link: "https://amzn.to/4g95F2l" },
  { name: "Babolat Pure Drive Lite 100UL", link: "https://amzn.to/3K9YGu3" },
  { name: "HEAD Graphene 360+ Extreme MP Tennis Racquets", link: "https://amzn.to/3V1vt75" },
  { name: "Yonex EZONE 98UL v2", link: "https://amzn.to/3I6VfUk" },
  { name: "Prince Textreme Tour 95UL v2", link: "https://princetennis.com/tour-95ul-v2" },
  { name: "Wilson Clash 100UL v3", link: "https://amzn.to/46aETST" },
  { name: "Babolat Pure Aero Lite 98UL", link: "https://amzn.to/3K8O6n3" },
  { name: "Head Speed MP Lite 2023 v2", link: "https://amzn.to/3V6Y2Qr" },
  { name: "Yonex VCORE 100UL GEN 7", link: "https://amzn.to/4m71cid" },
  { name: "Prince Phantom 100UL v3", link: "https://amzn.to/3V6Y2Qr" },
  { name: "Wilson Blade 104UL v9", link: "https://amzn.to/4m7lW9F" },
  { name: "Babolat Pure Strike 100UL v4", link: "https://amzn.to/4m1NsFm" },
  { name: "Head 2023 Gravity MP Tennis Racquet", link: "https://amzn.to/3Ib8p2G" },
  { name: "Yonex EZONE 100UL 2022", link: "https://amzn.to/42l1TNF" },
  { name: "Prince Textreme Tour 100UL v3", link: "https://amzn.to/4no9mDX" },
  { name: "Wilson Ultra 100UL v5", link: "https://amzn.to/3VDxJkY" },
  { name: "Babolat Pure Drive Lite 100UL v2", link: "https://amzn.to/3V4ls96" },
  { name: "Head Extreme Lite MP 2023 v3", link: "https://www.tennis-warehouse.com/Head_Extreme_MP/descpageRCHEAD-HREM24.html" },
  { name: "Yonex EZONE 98UL v3", link: "https://amzn.to/46rfDZK" },
  { name: "Prince Textreme Tour 95UL v3", link: "https://princetennis.com/tour-95ul-v3" },
  { name: "Wilson Clash 100UL v4", link: "https://amzn.to/3I7kUfL" },
  { name: "Babolat Pure Aero Lite 100UL v2", link: "https://amzn.to/42koJoC" },
  { name: "Head Speed MP Lite 2024", link: "https://tennisexpress.com/products/head-speed-mp-l-2024-tennis-racquet-108290?gad_source=1&gad_campaignid=21670339161&gbraid=0AAAAAD_Vdwehuf6BRC4intGf2uA8vuvNN&gclid=CjwKCAjwt-_FBhBzEiwA7QEqyM2g3KuX6nH92ZSwEGZ7s5eZMCJy5D2nbw5LOW6prdYRhAWDZTC87hoCs1kQAvD_BwE" },
  { name: "Yonex VCORE 100UL v7", link: "https://amzn.to/4mZ9zha" },
  { name: "Prince Phantom 100UL v4", link: "https://princetennis.com/phantom-100ul-v4" },
  { name: "Wilson Blade 104UL v9", link: "https://amzn.to/45REF41" },
  { name: "Babolat Pure Strike 100UL v4", link: "https://amzn.to/41Dt2vc" },
  { name: "Head Prestige MP Lite 2023 v3", link: "https://tennisexpress.com/products/head-prestige-mp-l-2023-tennis-racquet-105527?gad_source=1&gad_campaignid=21680680006&gbraid=0AAAAAD_VdwdYbfCgTdqz_LxNPF9xqdTjI&gclid=CjwKCAjwt-_FBhBzEiwA7QEqyM4KTZ1oOPOxeYz63mTD61uNiX-WA_tp299a9SrU5ixAYzhhNT437RoCYpoQAvD_BwE" },
  { name: "Yonex EZONE 100UL v4", link: "https://amzn.to/4pc9dFg" }
];

// Function to convert racket name to filename
const nameToFilename = (name) => {
  return name.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

// Generate download instructions
const generateDownloadInstructions = () => {
  console.log('=== RACKET IMAGE DOWNLOAD INSTRUCTIONS ===\n');
  
  console.log('PRIORITY RACKETS (Top 10 - Start Here):\n');
  
  const priorityRackets = [
    "Babolat Pure Aero 2023",
    "Yonex EZONE 100", 
    "Babolat Pure Drive",
    "Yonex VCORE 100",
    "Wilson Pro Staff RF97 v14",
    "Prince Textreme Tour 100P",
    "Wilson Blade 98 v8",
    "Prince Phantom 100X",
    "Head Radical MP 2021",
    "Babolat Pure Strike 16x19"
  ];
  
  priorityRackets.forEach((racketName, index) => {
    const racket = racketData.find(r => r.name === racketName);
    if (racket) {
      const filename = nameToFilename(racketName);
      console.log(`${index + 1}. ${racketName}`);
      console.log(`   Link: ${racket.link}`);
      console.log(`   Save as: ${filename}.jpg`);
      console.log(`   Place in: /public/images/\n`);
    }
  });
  
  console.log('ALL RACKETS (Complete List):\n');
  
  racketData.forEach((racket, index) => {
    const filename = nameToFilename(racket.name);
    console.log(`${index + 1}. ${racket.name}`);
    console.log(`   Link: ${racket.link}`);
    console.log(`   Save as: ${filename}.jpg\n`);
  });
  
  console.log('=== DOWNLOAD STEPS ===');
  console.log('1. Click each Amazon/manufacturer link');
  console.log('2. Find the main product image');
  console.log('3. Right-click → "Save image as..."');
  console.log('4. Save with the exact filename shown');
  console.log('5. Place in /public/images/ folder');
  console.log('6. Run: npm run build');
  console.log('7. Test the website');
  
  console.log('\n=== ALTERNATIVE: USE STOCK PHOTOS ===');
  console.log('If Amazon images don\'t work well:');
  console.log('- Unsplash: https://unsplash.com/s/photos/tennis-racket');
  console.log('- Pixabay: https://pixabay.com/images/search/tennis-racket/');
  console.log('- Pexels: https://www.pexels.com/search/tennis%20racket/');
};

// Generate HTML file with clickable links
const generateHTMLDownloadPage = () => {
  let html = `
<!DOCTYPE html>
<html>
<head>
    <title>Racket Image Download Helper</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .racket { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
        .priority { background-color: #e8f5e8; border-color: #4caf50; }
        .filename { background-color: #f0f0f0; padding: 5px; border-radius: 4px; font-family: monospace; }
        a { color: #0066cc; text-decoration: none; }
        a:hover { text-decoration: underline; }
        .instructions { background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; }
    </style>
</head>
<body>
    <h1>🎾 Racket Image Download Helper</h1>
    
    <div class="instructions">
        <h3>📋 Instructions:</h3>
        <ol>
            <li>Click each link below to open the product page</li>
            <li>Find the main product image (usually the first large image)</li>
            <li>Right-click on the image → "Save image as..."</li>
            <li>Save with the exact filename shown in the green box</li>
            <li>Place the image in your <code>/public/images/</code> folder</li>
            <li>Run <code>npm run build</code> to test</li>
        </ol>
    </div>
    
    <h2>🔥 Priority Rackets (Start Here)</h2>
  `;
  
  const priorityRackets = [
    "Babolat Pure Aero 2023", "Yonex EZONE 100", "Babolat Pure Drive", 
    "Yonex VCORE 100", "Wilson Pro Staff RF97 v14", "Prince Textreme Tour 100P",
    "Wilson Blade 98 v8", "Prince Phantom 100X", "Head Radical MP 2021", 
    "Babolat Pure Strike 16x19"
  ];
  
  priorityRackets.forEach((racketName, index) => {
    const racket = racketData.find(r => r.name === racketName);
    if (racket) {
      const filename = nameToFilename(racketName);
      html += `
        <div class="racket priority">
            <h3>${index + 1}. ${racketName}</h3>
            <p><strong>Link:</strong> <a href="${racket.link}" target="_blank">${racket.link}</a></p>
            <p><strong>Save as:</strong> <span class="filename">${filename}.jpg</span></p>
        </div>
      `;
    }
  });
  
  html += `
    <h2>📋 All Rackets (Complete List)</h2>
  `;
  
  racketData.forEach((racket, index) => {
    const filename = nameToFilename(racket.name);
    const isPriority = priorityRackets.includes(racket.name);
    const className = isPriority ? 'racket priority' : 'racket';
    
    html += `
        <div class="${className}">
            <h3>${index + 1}. ${racket.name}</h3>
            <p><strong>Link:</strong> <a href="${racket.link}" target="_blank">${racket.link}</a></p>
            <p><strong>Save as:</strong> <span class="filename">${filename}.jpg</span></p>
        </div>
    `;
  });
  
  html += `
    <div class="instructions">
        <h3>🆘 Alternative Sources:</h3>
        <ul>
            <li><a href="https://unsplash.com/s/photos/tennis-racket" target="_blank">Unsplash - Free Tennis Racket Photos</a></li>
            <li><a href="https://pixabay.com/images/search/tennis-racket/" target="_blank">Pixabay - Free Tennis Racket Images</a></li>
            <li><a href="https://www.pexels.com/search/tennis%20racket/" target="_blank">Pexels - Free Tennis Racket Photos</a></li>
        </ul>
    </div>
</body>
</html>
  `;
  
  fs.writeFileSync('racket-download-helper.html', html);
  console.log('\n✅ Generated racket-download-helper.html');
  console.log('Open this file in your browser for easy clicking!');
};

// Run the generators
generateDownloadInstructions();
generateHTMLDownloadPage();
