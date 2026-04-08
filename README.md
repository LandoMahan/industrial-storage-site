# Industrial Storage Rentals — Website & Branding

## Project Overview

Professional industrial warehouse rental website for 50,000 sq ft facility in Grove City, Ohio. Built with modern web standards, responsive design, and comprehensive branding package.

**Live Site**: https://consultancy-thomas-barcelona-endorsed.trycloudflare.com

---

## Features

### 🎯 Hero Section
- Full-screen image background with overlay
- Professional headline with gold accents
- Clear call-to-action buttons
- Key facility stats (50,000 sq ft, 18' ceiling, 24/7 security, pricing)

### 💼 Why Choose Us
- 6-feature card layout with icons
- Hover animations and visual effects
- Focus on security, infrastructure, pricing, flexibility, storage specialization, location

### 📦 Space Selection
- 6-tier space options (4,000 - 50,000 sq ft)
- Clear pricing display ($1.20/sqft)
- Featured "Full Facility" option
- Responsive grid layout

### 📋 Specifications
- Detailed facility specs (dimensions, loading, security, environment)
- 4-column card layout
- Professional categorization

### ❓ FAQ Section
- 6 professional FAQs
- Business-focused questions
- Clear, concise answers
- 2-column layout

### 📞 Contact Section
- Dual-column layout
- Contact information display
- Professional inquiry form
- Email integration

### 🎨 Professional Design
- Premium blue (#0099cc) and gold (#ffdb58) color scheme
- Consistent typography hierarchy
- Card-based component system
- Smooth animations and hover effects
- Full responsive design (mobile, tablet, desktop)

---

## Branding Package

### Color System
- **Primary**: #0099cc (professional blue)
- **Accent**: #ffdb58 (gold highlights)
- **Dark**: #1a1a1a (text and strong contrast)
- **Light**: #f8f9fa (backgrounds)

### Typography
- Headlines: System sans-serif, 900 weight, tight letter-spacing
- Body: System sans-serif, 400 weight, 1.6 line-height
- Consistent hierarchy across all sections

### Voice & Tone
- Professional, direct, confident
- Focus on business benefits
- Clear, jargon-free communication
- Trustworthy and transparent

### Key Brand Messages
1. Professional Warehouse Space
2. Month-to-Month Flexibility
3. Enterprise-Grade Security
4. Transparent Pricing
5. Built for Serious Operations

---

## Project Structure

```
industrial-storage-site/
├── index.html              # Main website
├── styles.css              # All styling
├── script.js               # Form handling + interactions
├── server.js               # Node.js/Express backend
├── package.json            # Dependencies
├── uploads/                # Facility photos
│   └── photo-1.jpg        # Hero image
├── BRANDING.md             # Brand identity guide
├── BRAND-ASSETS.md         # Color codes, specs, guidelines
├── README.md               # This file
└── inquiries.db            # SQLite database (created on run)
```

---

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express
- **Database**: SQLite3
- **Email**: Nodemailer
- **Deployment**: Cloudflare Tunnel
- **Hosting**: Localhost with quick tunnel

---

## Setup & Deployment

### Local Development
```bash
cd industrial-storage-site
npm install
npm start
```
Server runs on `http://localhost:3000`

### Deploy with Cloudflare Tunnel
```bash
cd ~/.cloudflared
cloudflared tunnel --url http://localhost:3000
```
Site becomes accessible via public Cloudflare URL.

### Environment Variables
Create `.env` file:
```
EMAIL_USER=johnmahanassistant@gmail.com
EMAIL_PASS=mldb znst krgz lqox
PORT=3000
```

---

## Form Submissions

### How It Works
1. User fills inquiry form
2. Form data sent to `/api/inquiry` endpoint
3. Data stored in SQLite database
4. Confirmation email sent (if configured)
5. Success message displayed to user

### Data Collected
- Name
- Email
- Company
- Phone
- Space needed (sq ft)
- Additional details

---

## Facility Information

**Location**: 2882 Lewis Centre Way, Grove City, OH 43123
**Phone**: (610) 297-0112
**Email**: hello@getroofleadpro.com

**Specifications**:
- Total: 50,000 sq ft
- Ceiling: 18 feet
- Elevator: 12,000 lbs capacity
- Security: 24/7 CCTV, controlled access
- Pricing: $1.20/sqft/month
- Terms: Month-to-month (no long-term contracts)

---

## Performance & Optimization

✅ Fast loading (optimized images)
✅ Mobile responsive (tested on 480px+)
✅ SEO optimized (meta tags, semantic HTML)
✅ Accessibility ready (proper contrast, semantic markup)
✅ Form validation (required fields, email validation)
✅ Database persistence (SQLite)

---

## Future Enhancements

⏳ High-resolution facility photo gallery
⏳ Virtual facility tour (360° view)
⏳ Online booking system
⏳ Admin dashboard (view inquiries)
⏳ Email automation workflows
⏳ Analytics integration
⏳ Blog/resources section
⏳ Social media integration
⏳ Customer testimonials
⏳ Pricing calculator

---

## Maintenance

### Regular Tasks
- Monitor form submissions
- Update facility photos as needed
- Check email integration
- Review site analytics
- Test mobile responsiveness

### Database
- Backups: Store in safe location
- Cleanup: Archive old inquiries periodically
- Monitoring: Check for form errors

---

## Support & Contact

For technical issues or questions about the website:
- **Phone**: (610) 297-0112
- **Email**: hello@getroofleadpro.com

---

## License & Ownership

This website and branding package is proprietary to Industrial Storage Rentals. All rights reserved.

---

## Branding Files

- **BRANDING.md** — Full brand identity guide
- **BRAND-ASSETS.md** — Color codes, typography, component specs

---

**Last Updated**: April 8, 2026
**Status**: ✅ Live and Production Ready
