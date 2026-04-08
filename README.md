# Industrial Storage — Grove City, Ohio

Professional website for marketing 50,000 sq ft of short-term industrial storage space.

**Live Site:** (Coming soon)  
**Address:** 2882 Lewis Centre Way, Grove City, OH 43123  
**Pricing:** $1.20 per sq ft per month  
**Elevator Capacity:** 12,000 lbs  
**Ceiling Height:** 18 feet clear

## What's Included

### Frontend
- Fully responsive HTML/CSS website
- Modern industrial design with dark/orange color scheme
- Mobile-optimized layout
- Pricing calculator
- Photo gallery (placeholder)
- Contact inquiry form

### Backend
- Node.js/Express server
- SQLite database for inquiry storage
- Email notifications (Gmail)
- API endpoints for form submission
- Admin inquiry management

### Features
- Real-time pricing calculation ($1.20/sqft)
- Lead capture and storage
- Email notifications to customer and owner
- Comparison table (vs. competitors)
- Specifications section
- Gallery ready for photos
- Health monitoring endpoint

## Quick Start

### Local Development
```bash
npm install
cp .env.example .env
# Edit .env with your email credentials
npm start
```

Visit http://localhost:3000

### Deploy to Production
See `DEPLOYMENT.md` for:
- Railway deployment (recommended)
- Heroku setup
- Netlify/Vercel (static only)
- Custom domain setup

## Directory Structure
```
.
├── index.html           # Main website
├── styles.css           # Styling
├── script.js            # Frontend logic
├── server.js            # Express server
├── package.json         # Dependencies
├── .env.example         # Environment template
├── DEPLOYMENT.md        # Deployment guide
├── README.md            # This file
└── inquiries.db         # SQLite database (created on first run)
```

## Environment Variables

See `.env.example` for required variables:
- `EMAIL_USER` — Gmail address for notifications
- `EMAIL_PASS` — Gmail app password
- `OWNER_EMAIL` — Your email address
- `API_TOKEN` — Secret token for API endpoints
- `PORT` — Server port (default: 3000)

## API Endpoints

### Submit Inquiry
```
POST /api/inquiries
{
  "name": "...",
  "company": "...",
  "email": "...",
  "phone": "...",
  "sqft": "...",
  "duration": "...",
  "details": "..."
}
```

### Get Inquiries (Admin)
```
GET /api/inquiries
Authorization: Bearer YOUR_API_TOKEN
```

### Health Check
```
GET /api/health
```

## Next Steps

1. **Set up email:**
   - Enable 2FA on Gmail
   - Generate app password
   - Add to `.env`

2. **Upload photos:**
   - Replace placeholder images in gallery
   - Update `index.html` with real photo paths

3. **Deploy:**
   - Follow `DEPLOYMENT.md`
   - Configure custom domain
   - Test form submission

4. **Customize:**
   - Update contact info if needed
   - Adjust pricing if needed
   - Add testimonials or case studies
   - Set up admin dashboard (optional)

## Support

For questions or issues, contact:
- Phone: (610) 297-0112
- Email: johnmahan@westpatrick.com

---

Built with ❤️ for short-term contractor storage.
