# AcePlan Tennis Equipment Finder 🎾

A Next.js 14+ tennis equipment recommendation website with personalized quiz and intelligent product suggestions.

## 🚀 **Quick Start - Guaranteed to Work**

### **Option 1: Use the Startup Script (Recommended)**
```bash
# Navigate to the project directory
cd tennis-racket-finder

# Run the startup script
./start-server.sh
```

### **Option 2: Manual Start**
```bash
# Navigate to the project directory
cd tennis-racket-finder

# Install dependencies (first time only)
npm install

# Start the development server
npm run dev
```

## ⚠️ **IMPORTANT: Always Start from the Right Directory**

**You MUST be in the `tennis-racket-finder` directory to run the server.**

**❌ Wrong (will fail):**
```bash
cd /Users/VR/AcePlan
npm run dev  # This will fail!
```

**✅ Correct (will work):**
```bash
cd /Users/VR/AcePlan/tennis-racket-finder
npm run dev  # This will work!
```

## 🔍 **How to Check You're in the Right Directory**

Look for these files in your current directory:
- ✅ `package.json` (should be visible)
- ✅ `src/` folder (should be visible)
- ✅ `README.md` (this file should be visible)

If you don't see these files, you're in the wrong directory!

## 🌐 **Access Your Website**

Once the server is running, you'll see:
```
🚀 Starting development server...
📍 Local: http://localhost:3000
🌐 Network: http://192.168.68.100:3000
```

**Open your browser and go to:** `http://localhost:3000`

## 🎯 **Features**

### **Core Functionality**
- **Hero Section**: AcePlan branding with "Practice hard. Play harder." tagline
- **Hidden Quiz**: Quiz only appears after clicking "Get My Free Plan"
- **Smart Recommendations**: AI-powered equipment suggestions
- **Modern UI**: Blue and green theme with professional design
- **Responsive Design**: Works on all devices

### **Quiz Questions (10 total)**
1. Skill level (Beginner/Intermediate/Advanced)
2. Years playing tennis
3. Height and build
4. Playing style preferences
5. Arm injury concerns
6. Budget range
7. Primary goals (Power/Control/Comfort/Spin/All-around)
8. Current racket (optional)
9. Current racket feedback (optional)

## 🛠️ **Troubleshooting**

### **Server Won't Start?**
1. **Check directory**: Make sure you're in `tennis-racket-finder`
2. **Check Node.js**: Run `node --version` to verify installation
3. **Check npm**: Run `npm --version` to verify installation
4. **Clear cache**: Run `npm run clean` then `npm install`

### **Port Already in Use?**
If you see "Port 3000 is already in use":
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### **Build Errors?**
```bash
# Clean and rebuild
npm run clean
npm install
npm run build
```

## 📁 **Project Structure**

```
tennis-racket-finder/
├── start-server.sh          # 🚀 Startup script (use this!)
├── package.json             # Dependencies and scripts
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # React components
│   ├── data/                # Product databases
│   ├── lib/                 # Recommendation logic
│   └── types/               # TypeScript definitions
└── README.md                # This file
```

## 🎨 **Customization**

### **Change Branding**
- Edit `src/components/HeroSection.tsx` for hero content
- Edit `src/app/layout.tsx` for page metadata
- Edit `src/app/globals.css` for colors and styling

### **Add Products**
- Edit `src/data/rackets.ts` for new racket models
- Edit `src/data/strings.ts` for new string types

### **Modify Quiz**
- Edit `src/data/quizQuestions.ts` to change questions
- Edit `src/lib/recommendations.ts` for algorithm changes

## 🚀 **Production Deployment**

### **Build for Production**
```bash
npm run build
npm start
```

### **Deploy to Vercel (Recommended)**
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

## 📱 **Mobile Testing**

Test on mobile devices using the network URL:
- **Network URL**: `http://192.168.68.100:3000`
- Make sure your phone is on the same WiFi network

## 🆘 **Still Having Issues?**

1. **Check the startup script output** - it will tell you exactly what's wrong
2. **Verify directory**: Make sure you see `package.json` in your current location
3. **Check Node.js version**: Should be 18+ (`node --version`)
4. **Clear everything and start fresh**:
   ```bash
   cd /Users/VR/AcePlan/tennis-racket-finder
   rm -rf node_modules .next
   npm install
   npm run dev
   ```

## 🎾 **Your AcePlan Website is Ready!**

Once you get the server running, you'll see:
- **Beautiful hero section** with AcePlan branding
- **"Get My Free Plan" button** that reveals the quiz
- **Modern, professional design** with blue/green theme
- **Responsive layout** that works on all devices

**The key is always starting from the `tennis-racket-finder` directory!** 🎯
