# Quick Deployment Checklist

## 🚀 Deploy in 15 Minutes

### **Step 1: Push to GitHub** (2 min)
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### **Step 2: Vercel Setup** (5 min)
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" → "Continue with GitHub"
3. Click "Add New" → "Project"
4. Select `hare_krishna_website` repository
5. Click "Import"

### **Step 3: Configure Environment** (3 min)
**⚠️ Use YOUR actual credentials from your local `.env` file!**

Add these 5 environment variables in Vercel with your actual values:

```
VITE_SUPABASE_URL = <your_value_from_.env>
VITE_SUPABASE_ANON_KEY = <your_value_from_.env>
VITE_IMAGEKIT_PUBLIC_KEY = <your_value_from_.env>
VITE_IMAGEKIT_PRIVATE_KEY = <your_value_from_.env>
VITE_IMAGEKIT_URL_ENDPOINT = <your_value_from_.env>
```

**Copy values from your local `.env` file - NEVER commit credentials to git!**

### **Step 4: Deploy** (2 min)
1. Click "Deploy"
2. Wait for build to complete
3. Visit your Vercel URL to test

### **Step 5: Add Your Domain** (3 min + DNS wait time)
1. In Vercel: Settings → Domains
2. Add your domain: `yourdomain.com`
3. Copy the DNS instructions

**In Your Domain Provider (Namecheap, GoDaddy, etc.):**
- Add A record: `@ → 76.76.21.21`
- Add CNAME record: `www → cname.vercel-dns.com`

Wait 1-2 hours for DNS propagation, then visit your domain!

---

## ✅ Post-Deployment
- [ ] Test all pages work
- [ ] Test admin login at `/admin`
- [ ] Verify gallery images load
- [ ] Check cookie consent banner appears
- [ ] Update Supabase allowed URLs with your domain

---

## 🆘 Issues?
See detailed guide: `DEPLOYMENT_GUIDE.md`
