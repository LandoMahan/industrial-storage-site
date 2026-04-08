# Industrial Storage Website — Deployment Guide

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create .env file:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your email credentials and API token.

3. **Start server:**
   ```bash
   npm start
   ```
   Navigate to http://localhost:3000

## Gmail Email Setup

1. Enable 2-factor authentication on Gmail
2. Generate an app password: https://myaccount.google.com/apppasswords
3. Copy the app password and add to `.env` as `EMAIL_PASS`

## Deployment Options

### Option 1: Railway (Recommended)

1. Push code to GitHub
2. Connect GitHub to Railway
3. Set environment variables in Railway dashboard
4. Deploy

Production URL will be provided by Railway.

### Option 2: Heroku

1. Install Heroku CLI
2. `heroku create industrial-storage`
3. `heroku config:set EMAIL_USER=your-email@gmail.com`
4. `heroku config:set EMAIL_PASS=your-app-password`
5. `git push heroku main`

### Option 3: Static Hosting (Netlify/Vercel)

Without backend, deploy just the HTML/CSS/JS:
- Form won't submit automatically
- You'll need a form service like Formspree, Basin, or Typeform

## Features

✅ **Responsive website** — Mobile, tablet, desktop  
✅ **Pricing calculator** — Real-time cost calculation  
✅ **Contact form** — Collects inquiries in SQLite  
✅ **Email notifications** — Owner + customer confirmations  
✅ **API endpoints** — Fetch and manage inquiries  
✅ **Health check** — Monitor uptime  

## API Endpoints

### Submit Inquiry
```bash
POST /api/inquiries
Content-Type: application/json

{
  "name": "John Doe",
  "company": "Doe Construction",
  "email": "john@example.com",
  "phone": "614-555-1234",
  "sqft": "10000",
  "duration": "3months",
  "details": "Equipment storage for renovation project"
}
```

Response:
```json
{
  "success": true,
  "id": "uuid-here",
  "estimatedMonthly": "12000.00"
}
```

### Get All Inquiries (Admin)
```bash
GET /api/inquiries
Authorization: Bearer YOUR_API_TOKEN
```

### Update Inquiry Status
```bash
PATCH /api/inquiries/:id
Authorization: Bearer YOUR_API_TOKEN
Content-Type: application/json

{
  "status": "contacted"
}
```

## Database

SQLite database is stored in `inquiries.db`. 

Inquiry fields:
- `id` — UUID
- `name`, `company`, `email`, `phone` — Contact info
- `sqft` — Square footage needed
- `duration` — Lease duration
- `details` — Custom details
- `created_at` — Timestamp
- `status` — 'new', 'contacted', 'quoted', 'leased', etc.

## Custom Domain

1. Register domain (GoDaddy, Namecheap, etc.)
2. Point DNS to your hosting provider
3. Update `DASHBOARD_URL` in .env to use custom domain

## Monitoring

- Check logs via `npm start` locally or hosting provider dashboard
- Health check: GET `/api/health`
- Database queries can be run with `sqlite3 inquiries.db`

## Troubleshooting

**Form not submitting:**
- Check browser console for errors
- Verify EMAIL_USER and EMAIL_PASS in .env
- Check CORS settings if running on different domains

**Emails not sending:**
- Verify Gmail app password (not your regular password)
- Check OWNER_EMAIL is valid
- Review email logs in hosting provider

**Inquiry not saved:**
- Check database permissions
- Verify SQLite is installed
- Review server logs

## Next Steps

1. Set up custom domain (optional)
2. Add photos to gallery placeholders
3. Create admin dashboard to view inquiries
4. Add SMS notifications
5. Integrate with CRM or booking system
