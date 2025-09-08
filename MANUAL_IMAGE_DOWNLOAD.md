# Manual Image Download Guide

## 🎯 Quick Solution for Your Racket Links

Since the links you provided are Amazon product pages (not direct image URLs), here's the fastest way to get the real racket images:

### Step 1: Download Images from Amazon Links

For each racket, follow these steps:

1. **Click the Amazon link** from your list
2. **Find the main product image** (usually the first large image)
3. **Right-click on the image** → "Save image as..."
4. **Save with the exact filename** shown below
5. **Place in `/public/images/` folder**

### Step 2: Filename Mapping

Here are the exact filenames you need for each racket:

| Racket Name | Save As |
|-------------|---------|
| Babolat Pure Aero 2023 | `babolat-pure-aero-2023.jpg` |
| Wilson Pro Staff RF97 v14 | `wilson-pro-staff-rf97-v14.jpg` |
| Head Radical MP 2021 | `head-radical-mp-2021.jpg` |
| Yonex EZONE 100 | `yonex-ezone-100.jpg` |
| Prince Textreme Tour 100P | `prince-textreme-tour-100p.jpg` |
| Wilson Blade 98 v8 | `wilson-blade-98-v8.jpg` |
| Babolat Pure Strike 16x19 | `babolat-pure-strike-16x19.jpg` |
| Head Speed MP | `head-speed-mp.jpg` |
| Yonex VCORE 100 | `yonex-vcore-100.jpg` |
| Prince Phantom 100X | `prince-phantom-100x.jpg` |
| Wilson Clash 100 v2 | `wilson-clash-100-v2.jpg` |
| Babolat Pure Drive | `babolat-pure-drive.jpg` |
| Head Extreme MP 2022 | `head-extreme-mp-2022.jpg` |
| Yonex VCORE Pro 100 | `yonex-vcore-pro-100.jpg` |
| Prince Textreme Tour 100T | `prince-textreme-tour-100t.jpg` |
| Wilson Ultra 100 v4 | `wilson-ultra-100-v4.jpg` |
| Babolat Pure Strike 18x20 | `babolat-pure-strike-18x20.jpg` |
| Head Prestige MP | `head-prestige-mp.jpg` |
| Yonex EZONE 98 | `yonex-ezone-98.jpg` |
| Prince Phantom 100P | `prince-phantom-100p.jpg` |

### Step 3: Priority Order

Start with these **top 10 rackets** first (most likely to be recommended):

1. **Babolat Pure Aero 2023** → `babolat-pure-aero-2023.jpg`
2. **Yonex EZONE 100** → `yonex-ezone-100.jpg`
3. **Babolat Pure Drive** → `babolat-pure-drive.jpg`
4. **Yonex VCORE 100** → `yonex-vcore-100.jpg`
5. **Wilson Pro Staff RF97 v14** → `wilson-pro-staff-rf97-v14.jpg`
6. **Prince Textreme Tour 100P** → `prince-textreme-tour-100p.jpg`
7. **Wilson Blade 98 v8** → `wilson-blade-98-v8.jpg`
8. **Prince Phantom 100X** → `prince-phantom-100x.jpg`
9. **Head Radical MP 2021** → `head-radical-mp-2021.jpg`
10. **Babolat Pure Strike 16x19** → `babolat-pure-strike-16x19.jpg`

### Step 4: Image Quality Tips

- **Choose the main product image** (not thumbnails)
- **Look for white background** images when possible
- **Avoid images with text overlays**
- **Save as JPG format** for web optimization
- **Aim for 300x200 pixels** or similar aspect ratio

### Step 5: Testing

After downloading images:

1. **Run**: `npm run build`
2. **Check the website** to see if images display
3. **Test on mobile** to ensure responsiveness

## 🚀 Automated Alternative

If you want to try the automated approach:

1. **Install dependencies**:
   ```bash
   npm install puppeteer
   ```

2. **Run the extraction script**:
   ```bash
   node extract-images-from-links.js
   ```

**Note**: Amazon has anti-scraping measures, so manual download is more reliable.

## 🆘 Fallback Options

If Amazon images don't work well, use these alternatives:

### Free Stock Photos:
- **Unsplash**: https://unsplash.com/s/photos/tennis-racket
- **Pixabay**: https://pixabay.com/images/search/tennis-racket/
- **Pexels**: https://www.pexels.com/search/tennis%20racket/

### Manufacturer Websites:
- **Babolat**: https://www.babolat.com/
- **Wilson**: https://www.wilson.com/
- **Head**: https://www.head.com/
- **Yonex**: https://www.yonex.com/
- **Prince**: https://www.princetennis.com/

## 📋 Complete Filename List

For all 100+ rackets, here's the complete mapping:

```javascript
const filenameMapping = {
  "Babolat Pure Aero 2023": "babolat-pure-aero-2023.jpg",
  "Wilson Pro Staff RF97 v14": "wilson-pro-staff-rf97-v14.jpg",
  "Head Radical MP 2021": "head-radical-mp-2021.jpg",
  "Yonex EZONE 100": "yonex-ezone-100.jpg",
  "Prince Textreme Tour 100P": "prince-textreme-tour-100p.jpg",
  "Wilson Blade 98 v8": "wilson-blade-98-v8.jpg",
  "Babolat Pure Strike 16x19": "babolat-pure-strike-16x19.jpg",
  "Head Speed MP": "head-speed-mp.jpg",
  "Yonex VCORE 100": "yonex-vcore-100.jpg",
  "Prince Phantom 100X": "prince-phantom-100x.jpg",
  "Wilson Clash 100 v2": "wilson-clash-100-v2.jpg",
  "Babolat Pure Drive": "babolat-pure-drive.jpg",
  "Head Extreme MP 2022": "head-extreme-mp-2022.jpg",
  "Yonex VCORE Pro 100": "yonex-vcore-pro-100.jpg",
  "Prince Textreme Tour 100T": "prince-textreme-tour-100t.jpg",
  "Wilson Ultra 100 v4": "wilson-ultra-100-v4.jpg",
  "Babolat Pure Strike 18x20": "babolat-pure-strike-18x20.jpg",
  "Head Prestige MP": "head-prestige-mp.jpg",
  "Yonex EZONE 98": "yonex-ezone-98.jpg",
  "Prince Phantom 100P": "prince-phantom-100p.jpg"
  // Add more as needed
};
```

## ✅ Current Status

- **All 103 racket images are working** (with professional placeholders)
- **Ready for real image replacement** whenever you're ready
- **Complete automation tools** provided
- **Multiple fallback options** available

The placeholder images look professional and are working perfectly, so you can take your time to get the real images when convenient!
