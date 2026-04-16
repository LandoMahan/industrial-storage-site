# Custom Domain Setup for 2882 Storage Website

**Date:** April 16, 2026  
**Target Domain:** `2882storage.com`  
**Cost:** ~$12/year  
**Setup Time:** 15 minutes

---

## Step 1: Purchase the Domain

### Recommended: Namecheap (Cheapest & Easiest)

1. Go to: https://www.namecheap.com
2. Search for: `2882storage.com`
3. Add to cart (~$8.88/year)
4. Optional: Auto-renew (check the box)
5. Continue to checkout
6. Pay with your Apple Card (5122 3064 1660 3275)
7. Complete purchase

**Alternative providers:**
- GoDaddy: https://www.godaddy.com ($11.99/year)
- Google Domains: https://domains.google ($12/year)

---

## Step 2: Configure Railway to Use Your Domain

Once you own the domain:

### 2a. In Railway Dashboard

1. Go to: https://railway.app/project-placeholder
2. Click on your project
3. Go to: Settings → Custom Domains
4. Click: "Add Custom Domain"
5. Enter: `2882storage.com`
6. Click: Add

Railway will show you:
```
Name Server 1: ns1.railway.app
Name Server 2: ns2.railway.app
Name Server 3: ns3.railway.app
```

Copy these values (you'll need them next).

### 2b. In Namecheap (or Your Domain Registrar)

1. Go to: https://www.namecheap.com/dashboard
2. Find your domain: `2882storage.com`
3. Click: "Manage"
4. Go to: Nameservers
5. Change from "Namecheap Nameservers" to "Custom DNS"
6. Enter the 3 Railway nameservers:
   - `ns1.railway.app`
   - `ns2.railway.app`
   - `ns3.railway.app`
7. Save changes

**Wait:** DNS propagation takes 5-30 minutes (usually 10 min)

### 2c. Verify in Railway

1. Go back to Railway: Settings → Custom Domains
2. Your domain should show: "Active" (green checkmark)
3. Railway auto-generates HTTPS certificate (no action needed)
4. Your site is now live at: `https://2882storage.com`

---

## Step 3: Update Your .env File

Update the `DASHBOARD_URL` in `.env`:

```bash
# Before:
DASHBOARD_URL=http://localhost:3000

# After:
DASHBOARD_URL=https://2882storage.com
```

Then commit and push:

```bash
cd /Users/Landomahan/.openclaw/workspace/projects/2882-First-Website-Draft
git add .env
git commit -m "Update dashboard URL to custom domain"
git push origin main
```

---

## Testing

Once DNS propagates (10-30 min):

1. Visit: `https://2882storage.com` in your browser
2. You should see your website
3. Try submitting the form
4. Check your email for the submission

---

## Troubleshooting

### Domain shows "Pending" in Railway?
- DNS hasn't propagated yet
- Wait 10-15 minutes and refresh
- Or check: https://mxtoolbox.com/mxlookup.aspx?domain=2882storage.com

### Getting a certificate error?
- Clear browser cache
- Wait 5 more minutes for HTTPS cert to generate
- Try incognito/private browsing

### Form still works but showing old domain?
- Clear browser cache (Cmd+Shift+R on Mac)
- The backend will automatically use HTTPS now

---

## What Happens After

Once your domain is live:

✅ **Form submissions** → Still auto-forward to your email  
✅ **Emails** → Still go to johnmahanassistant@gmail.com → johnmahan@westpatrick.com  
✅ **Database** → All inquiries still stored on Railway  
✅ **SSL/HTTPS** → Automatic, Railway handles it  
✅ **Uptime** → Still 24/7 managed hosting  

---

## Optional: Email Address on Your Domain

In the future, you could set up:
- `hello@2882storage.com` (instead of johnmahanassistant@gmail.com)

This would require:
1. Email hosting (G Suite, Zoho, etc.) - ~$5-10/month
2. MX records pointing to email provider
3. Reply comes from your domain (more professional)

But for now, the current setup (forwarding through Gmail) works fine.

---

## Timeline

| Step | Time | What to Do |
|------|------|-----------|
| Now | 5 min | Buy `2882storage.com` on Namecheap |
| +5 min | 5 min | Configure Railway custom domain |
| +10 min | 5 min | Add nameservers in Namecheap |
| +15 min | ⏳ | Wait for DNS propagation (10-30 min) |
| +45 min | 1 min | Verify domain is live |

**Total time: ~45 minutes (mostly waiting for DNS)**

---

## Your Action Items

1. ☐ Purchase `2882storage.com` on Namecheap (~$8.88)
2. ☐ Add custom domain in Railway dashboard
3. ☐ Update nameservers in Namecheap to Railway's
4. ☐ Wait for DNS propagation
5. ☐ Test form at `https://2882storage.com`
6. ☐ Update `.env` DASHBOARD_URL (optional, but recommended)

---

**Questions?**

If stuck during domain purchase or setup, let me know and I can walk you through it step-by-step.

Once domain is active, your website looks 100% more professional and you can share the link confidently with contractors. 🚀

