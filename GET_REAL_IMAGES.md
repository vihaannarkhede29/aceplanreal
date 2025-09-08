# How to Get Real Racket Images from Your Google Sheets

## 🎯 Quick Solution

Since I can't directly access your Google Sheets, here's the fastest way to get the real racket images:

### Step 1: Access Your Google Sheets
1. Go to: https://docs.google.com/spreadsheets/d/1BDcm92RBg6Wnh63XlN5ktkOWz9tUQ1ZRAjJhouCaUos/edit
2. Look for columns with racket images or image URLs

### Step 2: Extract Image URLs
1. **If images are embedded**: Right-click on each image → "Copy image address"
2. **If there are URL columns**: Copy the URLs directly
3. **If images are in cells**: Right-click → "Save image as" → download to your computer

### Step 3: Download Images
1. **Manual Download**: Save each image with the exact filename from your racket database
2. **Bulk Download**: Use the provided scripts to automate the process

## 🚀 Automated Solution

### Option A: Use the Download Script
1. Open `download-racket-images.js`
2. Add your image URLs to the `racketImageUrls` object:
```javascript
const racketImageUrls = {
  'babolat-pure-aero-2023': 'https://your-image-url-here.jpg',
  'yonex-ezone-100': 'https://your-image-url-here.jpg',
  // ... add all 103 rackets
};
```
3. Run: `node download-racket-images.js`

### Option B: Export from Google Sheets
1. In Google Sheets: File → Download → CSV
2. Save as `racket-data.csv` in your project folder
3. Run: `node extract-image-urls.js` (if you have image URLs in the CSV)

## 📋 Priority Rackets to Start With

Focus on these top 10 rackets first (most likely to be recommended):

1. **babolat-pure-aero-2023** - Most popular racket
2. **yonex-ezone-100** - Great all-around racket  
3. **babolat-pure-drive** - Classic power racket
4. **yonex-vcore-100** - Spin-focused racket
5. **wilson-pro-staff-rf97-v14** - Roger Federer's racket
6. **prince-textreme-tour-100p** - Control racket
7. **wilson-blade-98-v8** - Versatile racket
8. **prince-phantom-100x** - Comfort racket
9. **head-radical-mp-2021** - All-around racket
10. **babolat-pure-strike-16x19** - Precision racket

## 🔧 File Naming Convention

Make sure your downloaded images match these exact filenames:
- `babolat-pure-aero-2023.jpg`
- `yonex-ezone-100.jpg`
- `wilson-pro-staff-rf97-v14.jpg`
- etc.

## 📁 Where to Put Images

Place all images in: `/public/images/`

## ✅ Testing

After adding images:
1. Run: `npm run build`
2. Check that images display correctly
3. Test on mobile devices

## 🆘 If You Can't Find Images

If the Google Sheets doesn't have images, use these alternatives:

### Free Sources:
- **Unsplash**: https://unsplash.com/s/photos/tennis-racket
- **Pixabay**: https://pixabay.com/images/search/tennis-racket/
- **Pexels**: https://www.pexels.com/search/tennis%20racket/

### Paid Sources (Higher Quality):
- **Shutterstock**: https://www.shutterstock.com/search/tennis-racket
- **Getty Images**: https://www.gettyimages.com/photos/tennis-racket

### Manufacturer Websites:
- **Babolat**: https://www.babolat.com/
- **Wilson**: https://www.wilson.com/
- **Head**: https://www.head.com/
- **Yonex**: https://www.yonex.com/
- **Prince**: https://www.princetennis.com/

## 🎨 Image Requirements

- **Size**: 300x200 pixels (or similar aspect ratio)
- **Format**: JPG, PNG, or WebP
- **Quality**: High resolution, clear images
- **Background**: White or transparent preferred
- **File Size**: Under 100KB for web optimization

## 📞 Need Help?

If you're having trouble:
1. Share the image URLs from your Google Sheets
2. I can help you format them for the download script
3. Or provide alternative image sources for specific rackets

The current placeholder images are working perfectly, so you can take your time to get the real images when convenient!
