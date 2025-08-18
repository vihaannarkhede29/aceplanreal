# Deployment Guide - Tennis Racket Finder 🚀

## Quick Deploy Options

### 1. Vercel (Recommended)
The easiest way to deploy your Next.js app:

1. **Push to GitHub**: Ensure your code is in a GitHub repository
2. **Connect to Vercel**: 
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
3. **Configure Settings**:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. **Deploy**: Click "Deploy" and wait for build completion

**Benefits**: Automatic deployments, global CDN, built-in analytics

### 2. Netlify
Great alternative with similar ease:

1. **Build Locally**: `npm run build`
2. **Upload to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop your `.next` folder
3. **Configure Domain**: Set custom domain if desired

### 3. AWS Amplify
Full-stack deployment option:

1. **Connect Repository**: Link your GitHub repo
2. **Configure Build**: Use default Next.js settings
3. **Deploy**: Automatic deployment on push

## Pre-Deployment Checklist

### 1. Environment Variables
```bash
# Create .env.local file
NEXT_PUBLIC_SITE_URL=https://yoursite.com
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

### 2. Affiliate Links
Replace placeholder URLs in:
- `src/data/rackets.ts`
- `src/data/strings.ts`

### 3. SEO Optimization
- Update `src/app/layout.tsx` with your site details
- Add your logo and favicon
- Update meta descriptions and keywords

### 4. Performance Check
```bash
# Build and analyze
npm run build
npm run analyze  # If bundle analyzer is configured
```

## Production Build

### 1. Local Build Test
```bash
npm run build
npm start
```

### 2. Environment-Specific Builds
```bash
# Production
NODE_ENV=production npm run build

# Staging
NODE_ENV=staging npm run build
```

### 3. Static Export (Optional)
If you need static hosting:

```javascript
// next.config.js
module.exports = {
  output: 'export',
  trailingSlash: true,
}
```

## Domain & SSL

### 1. Custom Domain
- **Vercel**: Add domain in project settings
- **Netlify**: Configure in domain management
- **AWS**: Use Route 53 for DNS management

### 2. SSL Certificate
- **Vercel**: Automatic HTTPS
- **Netlify**: Automatic HTTPS
- **AWS**: Use AWS Certificate Manager

## Monitoring & Analytics

### 1. Google Analytics
```typescript
// Add to _app.tsx or layout.tsx
import Script from 'next/script'

<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
  strategy="afterInteractive"
/>
```

### 2. Performance Monitoring
- **Vercel Analytics**: Built-in performance insights
- **Web Vitals**: Monitor Core Web Vitals
- **Error Tracking**: Set up error monitoring

## Post-Deployment

### 1. Testing Checklist
- [ ] Quiz functionality works
- [ ] Recommendations generate correctly
- [ ] Mobile responsiveness
- [ ] Social sharing works
- [ ] Affiliate links function
- [ ] Loading states display properly

### 2. SEO Verification
- [ ] Meta tags are correct
- [ ] Open Graph images work
- [ ] Sitemap is generated
- [ ] Robots.txt is configured

### 3. Performance Check
- [ ] Lighthouse score > 90
- [ ] Core Web Vitals are good
- [ ] Images are optimized
- [ ] Bundle size is reasonable

## Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

#### Runtime Errors
- Check browser console for errors
- Verify environment variables
- Check API endpoints if using external services

#### Performance Issues
- Optimize images
- Reduce bundle size
- Implement lazy loading
- Use CDN for static assets

## Scaling Considerations

### 1. Traffic Handling
- **Vercel**: Automatic scaling
- **Netlify**: Built-in CDN
- **AWS**: Auto-scaling groups

### 2. Database (Future)
- Consider adding a database for user accounts
- Implement caching for recommendations
- Add analytics tracking

### 3. Content Management
- Add admin panel for content updates
- Implement CMS for product management
- Add user-generated content features

## Security

### 1. Basic Security
- HTTPS enforcement
- Content Security Policy
- XSS protection
- CSRF protection

### 2. Advanced Security
- Rate limiting
- Input validation
- SQL injection prevention
- Regular security audits

## Backup & Recovery

### 1. Code Backup
- GitHub repository
- Regular commits
- Branch protection rules

### 2. Data Backup
- Database backups (if applicable)
- User data protection
- GDPR compliance

---

## Quick Deploy Commands

```bash
# 1. Build locally
npm run build

# 2. Test production build
npm start

# 3. Deploy to Vercel
vercel --prod

# 4. Deploy to Netlify
netlify deploy --prod
```

Your tennis equipment recommendation website is now ready for production deployment! 🎾
