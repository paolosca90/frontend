# AI Cash Revolution - Matrix Web Deployment Guide 🚀

## 🎯 Quick Deployment Commands

### **Development Server**
```bash
# Navigate to web directory
cd web

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev

# Access Matrix interface at: http://localhost:3000
```

### **Production Build**
```bash
# Build for production
npm run build

# Start production server
npm start

# Or export static files
npm run export
```

## 🌐 Deployment Platforms

### **1. Vercel (Recommended for Matrix Web App)**
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Production deployment
vercel --prod
```

**Environment Variables on Vercel:**
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
NEXT_PUBLIC_WS_URL=wss://your-backend-url.com
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NODE_ENV=production
```

### **2. Netlify**
```bash
# Build command: npm run build && npm run export
# Publish directory: out
# Environment variables: Same as above
```

### **3. Railway (Full-Stack)**
```bash
# railway.json already configured
# Push to GitHub and connect Railway
# Automatic deployments on push
```

### **4. Docker Deployment**
```bash
# Build Matrix container
docker build -t ai-cash-revolution-web .

# Run container
docker run -p 3000:3000 ai-cash-revolution-web

# With environment variables
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=https://api.yoursite.com \
  ai-cash-revolution-web
```

## 🔧 Environment Setup

### **Required Environment Variables**
```env
# Core API (REQUIRED)
NEXT_PUBLIC_API_URL=http://localhost:3000

# WebSocket for real-time data (REQUIRED)
NEXT_PUBLIC_WS_URL=ws://localhost:3000

# Google OAuth (OPTIONAL)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

### **Backend Connection**
Make sure your backend server is running and accessible:
- Local development: `http://localhost:3000`
- Production: Your deployed backend URL

### **API Endpoints Expected**
The web app expects these backend endpoints:
- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/auth/me`
- `POST /api/signals/generate`
- `GET /api/trading/instruments`
- `POST /api/trading/orders`

## 📱 Mobile PWA Setup

The Matrix app is configured as a Progressive Web App:

```json
// manifest.json (automatically generated)
{
  "name": "AI Cash Revolution - Matrix Trading",
  "short_name": "Matrix Trading",
  "theme_color": "#00ff88",
  "background_color": "#000000",
  "display": "standalone",
  "orientation": "portrait"
}
```

## 🚨 Production Checklist

### **Before Deployment:**
- [ ] Backend API is deployed and accessible
- [ ] Environment variables are configured
- [ ] Google OAuth credentials are set up (if using)
- [ ] Database is migrated and seeded
- [ ] SSL certificates are configured

### **Performance Optimization:**
- [ ] Matrix rain animation is optimized for production
- [ ] Bundle size is optimized (< 2MB initial)
- [ ] Images are optimized and compressed
- [ ] PWA features are enabled

### **Security:**
- [ ] API URLs use HTTPS in production
- [ ] CSP headers are configured
- [ ] Authentication tokens are secured
- [ ] Rate limiting is enabled

## 🔗 Integration with Backend

The web app integrates with the backend server located at:
`C:\Users\USER\Desktop\new project\aicash-revolution\server\`

### **Start Backend First:**
```bash
# In server directory
cd ../server
npm install
npm run dev
```

### **Then Start Web App:**
```bash
# In web directory
cd web
npm install
npm run dev
```

## 🎨 Matrix Customization

### **Theme Customization:**
```css
/* In globals.css */
:root {
  --matrix-green: #00ff88;    /* Change primary color */
  --matrix-black: #000000;    /* Change background */
}
```

### **Animation Settings:**
```env
# In .env.local
NEXT_PUBLIC_MATRIX_INTENSITY=high     # low, medium, high
NEXT_PUBLIC_ENABLE_SOUND_EFFECTS=true
NEXT_PUBLIC_ENABLE_MATRIX_RAIN=true
```

## 🚀 Advanced Deployment

### **Load Balancer Setup (Nginx)**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### **CDN Configuration**
For optimal Matrix rain performance, serve static assets via CDN:
- Images: `/public/images/`
- Fonts: `/public/fonts/`
- Icons: `/public/icons/`

## 📊 Monitoring & Analytics

### **Performance Monitoring:**
```javascript
// In layout.tsx - add analytics
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### **Error Tracking:**
```javascript
// Add error boundary for Matrix components
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
```

## 🔧 Troubleshooting

### **Common Issues:**

**1. Matrix Rain Performance Issues**
```javascript
// Reduce animation density
<MatrixRain density={0.3} speed={0.5} />
```

**2. API Connection Errors**
```bash
# Check backend is running
curl http://localhost:3000/api/health

# Check environment variables
echo $NEXT_PUBLIC_API_URL
```

**3. Build Errors**
```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build
```

**4. TypeScript Errors**
```bash
# Type check
npm run type-check

# Fix common issues
npm install @types/node @types/react @types/react-dom
```

## 📞 Support

- **GitHub Issues**: Report Matrix bugs and features
- **Documentation**: Full API documentation
- **Discord**: Join the Matrix trading community
- **Email**: support@aicash-revolution.com

---

**🕶️ "Welcome to the real world, Neo." - Deploy your Matrix trading interface and revolutionize finance!**