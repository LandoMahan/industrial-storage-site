# 2882 Storage Website - Deployment to Railway

**Status:** Ready to deploy  
**Date:** April 15, 2026  
**Target:** Railway (https://railway.app)

---

## What's Configured

✅ **Email Setup**
- Sender: `johnmahanassistant@gmail.com` (configured with app password)
- Recipient: `johnmahan@westpatrick.com` (receives all form submissions)
- Forwarding: All inquiries auto-forward to work email

✅ **Database**
- SQLite (local development)
- Auto-migrates to PostgreSQL on Railway (no code changes needed)

✅ **Environment Variables**
- `.env` file configured with production values
- `API_TOKEN` set for security

✅ **GitHub**
- Remote: `https://github.com/LandoMahan/industrial-storage-site.git`
- Ready to push

✅ **Railway**
- Project already connected
- Remote: `https://railway.app/project-placeholder`

---

## Deploy Now (3 Steps)

### Step 1: Commit Changes (1 minute)

```bash
cd /Users/Landomahan/.openclaw/workspace/projects/2882-First-Website-Draft

git add .env
git commit -m "Configure production email and environment variables

- Email sender: johnmahanassistant@gmail.com
- Email recipient: johnmahan@westpatrick.com
- API token configured
- Dashboard URL set for production"
```

### Step 2: Push to GitHub (1 minute)

```bash
git push origin main
```

You should see:
```
To github.com:LandoMahan/industrial-storage-site.git
   [hash] main -> main
```

### Step 3: Deploy to Railway (1 minute)

Railway auto-deploys when you push to GitHub. You can monitor progress here:
https://railway.app/project-placeholder

It will:
1. Pull latest code from GitHub
2. Install dependencies (`npm install`)
3. Run the app (`npm start`)
4. Assign a public URL (something like `industrial-storage-site-production.up.railway.app`)

---

## Testing After Deploy

Once Railway finishes deploying (watch the dashboard):

1. **Visit the live site** - Click the URL from Railway dashboard
2. **Test the form:**
   - Fill out a sample inquiry
   - Submit
   - Check your work email (`johnmahan@westpatrick.com`) for the forwarded submission
3. **Verify it works:**
   - Customer gets confirmation email
   - You receive the submission forwarded to your work email
   - Database saves the record

---

## Important Notes

### Email Forwarding Setup

The form will send to `johnmahanassistant@gmail.com`. This email should be configured to **forward to `johnmahan@westpatrick.com`**.

Verify in Gmail:
1. Go to https://mail.google.com/mail/u/0/#settings/fwdandpop
2. Check "Forward all incoming mail to:" is set to `johnmahan@westpatrick.com`
3. If not set, the forwarding might fail

### Custom Domain (Optional)

Once deployed, you can add a custom domain:
1. Buy domain (e.g., `2882storage.com`)
2. In Railway: Project → Settings → Custom Domains
3. Point DNS to Railway
4. Certificate auto-generated (https://)

---

## What Happens After Deploy

### When Someone Submits the Form:

1. **Form data** → Saved to Railway's PostgreSQL database
2. **Customer email** → Automatic confirmation email sent from `johnmahanassistant@gmail.com`
3. **Your notification** → Email sent to `johnmahanassistant@gmail.com` with all inquiry details
4. **Forwarding** → Email forwarded to `johnmahan@westpatrick.com`

### Monitoring Inquiries:

**Option A: Via Email**
- New inquiries arrive in your work email
- Auto-forwarded from `johnmahanassistant@gmail.com`

**Option B: Via API (Advanced)**
- View inquiries at: `/api/inquiries`
- Requires API token for auth

---

## If Something Goes Wrong

### Form not submitting?
- Check browser console (F12 → Console tab)
- Check Railway logs (Railway dashboard → Logs)
- Verify API endpoint is correct (`/api/inquiry`)

### Emails not arriving?
- Verify `johnmahanassistant@gmail.com` forwarding is ON
- Check Gmail spam folder
- Review Railway logs for SMTP errors

### Database not saving?
- Check Railway PostgreSQL is running
- Verify DATABASE_URL env var is set (Railway handles this automatically)
- Review logs for SQL errors

---

## Next Steps (After Successful Deploy)

1. ✅ Verify form submissions work
2. ⏳ Add real photos to the gallery
3. ⏳ Set up custom domain (optional)
4. ⏳ Create admin dashboard to view/manage inquiries
5. ⏳ Add Google Analytics tracking
6. ⏳ Set up SMS alerts for new inquiries (optional)

---

## Support

If deployment fails:
1. Check Railway logs (Project → Logs tab)
2. Verify `.env` variables are set in Railway dashboard
3. Ensure GitHub push was successful
4. Check for typos in email configuration

---

**Ready to deploy? Run the 3 steps above and watch the magic happen! 🚀**
