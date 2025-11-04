# Deployment Guide - Hare Krishna Temple Avadi Website

This guide will help you deploy your website to a hosting platform and configure your custom domain.

**Last Updated:** 2025-11-03

---

## 📋 **Pre-Deployment Checklist**

Before deploying, ensure:
- ✅ Your code is committed to GitHub
- ✅ `.env` file is in `.gitignore` (already configured)
- ✅ You have your Supabase credentials
- ✅ You have your ImageKit credentials
- ✅ Your domain is purchased and accessible

---

## 🚀 **Recommended Hosting Platform: Vercel**

**Why Vercel?**
- ✅ Free hosting for personal projects
- ✅ Excellent Vite integration
- ✅ Automatic deployments from GitHub
- ✅ Easy domain configuration
- ✅ Free SSL certificate
- ✅ CDN included
- ✅ Serverless functions support (for future features)

**Alternative Options:**
- Netlify (similar to Vercel)
- GitHub Pages (free but more manual)
- Railway (good for full-stack apps)
- Render (good alternative)

---

## 📝 **Step-by-Step Deployment Instructions**

### **Step 1: Push Your Code to GitHub**

If you haven't already pushed your latest changes:

```bash
git status
git add .
git commit -m "Prepare for deployment - added security features and legal pages"
git push origin main
```

### **Step 2: Sign Up for Vercel**

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. **Choose "Continue with GitHub"** (easiest option)
4. Authorize Vercel to access your GitHub account

### **Step 3: Import Your Project**

1. On Vercel dashboard, click **"Add New" → "Project"**
2. Find your repository: `hare_krishna_website`
3. Click **"Import"**

### **Step 4: Deploy Supabase Edge Functions (CRITICAL SECURITY STEP)**

**⚠️ IMPORTANT:** This step is **MANDATORY** for security! We've moved ImageKit operations to backend Edge Functions to protect your private key.

**What are Edge Functions?**
- Backend functions that run on Supabase servers (NOT in browser)
- Keep your ImageKit private key secure on the server
- Industry-standard security approach

**Deployment Steps:**

1. **Install Supabase CLI:**
   ```bash
   npm install -g supabase
   ```

2. **Login to Supabase:**
   ```bash
   supabase login
   # Follow the browser authentication prompts
   ```

3. **Link your project:**
   ```bash
   cd "D:\Dev\Hare Krishna Temple\hk_webiste\hare_krishna_website"
   supabase link --project-ref gfippiubjrxsmnufyioh
   ```

4. **Set Edge Function secrets (these stay on server!):**
   ```bash
   # ImageKit credentials (SECURE - stays on backend)
   supabase secrets set IMAGEKIT_PUBLIC_KEY="<your_imagekit_public_key>"
   supabase secrets set IMAGEKIT_PRIVATE_KEY="<your_imagekit_private_key>"
   supabase secrets set IMAGEKIT_URL_ENDPOINT="<your_imagekit_url_endpoint>"

   # Supabase credentials (for auth verification)
   supabase secrets set SUPABASE_URL="<your_supabase_url>"
   supabase secrets set SUPABASE_ANON_KEY="<your_supabase_anon_key>"
   ```

5. **Deploy the Edge Functions:**
   ```bash
   # Deploy all three functions
   supabase functions deploy imagekit-upload
   supabase functions deploy imagekit-delete
   supabase functions deploy imagekit-list
   ```

6. **Verify deployment:**
   ```bash
   supabase functions list
   # Should show: imagekit-upload, imagekit-delete, imagekit-list
   ```

**📚 Need detailed help?** See [EDGE_FUNCTIONS_GUIDE.md](./EDGE_FUNCTIONS_GUIDE.md) for complete instructions and troubleshooting.

---

### **Step 5: Configure Your Project in Vercel**

Vercel will auto-detect it's a Vite project. Configure as follows:

**Framework Preset:** Vite (should be auto-detected)

**Build Settings:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

**Root Directory:** `./` (leave as default)

### **Step 6: Add Environment Variables in Vercel**

This is **CRITICAL** - your app won't work without these!

**⚠️ IMPORTANT:** Your actual credentials are in your local `.env` file. **NEVER commit credentials to git!**

In the Vercel project configuration page, find **"Environment Variables"** section and add these 5 variables with **YOUR ACTUAL VALUES** from your `.env` file:

```
VITE_SUPABASE_URL = <your_supabase_url>
VITE_SUPABASE_ANON_KEY = <your_supabase_anon_key>
VITE_IMAGEKIT_PUBLIC_KEY = <your_imagekit_public_key>
VITE_IMAGEKIT_PRIVATE_KEY = <your_imagekit_private_key>
VITE_IMAGEKIT_URL_ENDPOINT = <your_imagekit_url_endpoint>
```

**Where to find your credentials:**
- Open your local `.env` file (NOT committed to git)
- Copy each value from there to Vercel
- See `.env.example` for the variable names if needed

**Important Notes:**
- Add each variable separately in Vercel
- Select "Production", "Preview", and "Development" for all variables
- **NEVER** commit your `.env` file to git (it's already in `.gitignore`)
- **WARNING:** ImageKit private key is exposed in the browser. This is acceptable for read operations but consider moving to backend for uploads in production.

### **Step 6: Deploy**

1. Click **"Deploy"**
2. Wait 2-3 minutes for the build to complete
3. Vercel will show you the deployment status
4. Once complete, you'll get a URL like: `https://your-project-name.vercel.app`

### **Step 7: Test Your Deployment**

Visit your Vercel URL and test:
- ✅ Home page loads
- ✅ Navigation works (About, Programs, Events, Gallery, Contact)
- ✅ Gallery images load from ImageKit
- ✅ Carousel images display
- ✅ Admin login works (`/admin`)
- ✅ Privacy Policy loads (`/privacy`)
- ✅ Terms of Service loads (`/terms`)
- ✅ Cookie consent banner appears

---

## 🌐 **Configure Your Custom Domain**

### **Option A: Domain on Namecheap, GoDaddy, or Similar**

#### **In Vercel:**

1. Go to your project dashboard
2. Click **"Settings"** → **"Domains"**
3. Enter your domain (e.g., `harekrishnaavadi.org`)
4. Click **"Add"**

Vercel will show you DNS configuration instructions.

#### **In Your Domain Provider:**

**For Root Domain (example.com):**

Add these DNS records:

```
Type: A
Name: @
Value: 76.76.21.21
TTL: Auto or 3600
```

**For www subdomain:**

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: Auto or 3600
```

**OR if you want to use a subdomain (temple.example.com):**

```
Type: CNAME
Name: temple
Value: cname.vercel-dns.com
TTL: Auto or 3600
```

#### **DNS Propagation:**
- DNS changes take 15 minutes to 48 hours to propagate globally
- Usually takes 1-2 hours
- Check status at: [whatsmydns.net](https://www.whatsmydns.net)

### **Option B: Domain on Cloudflare**

If your domain is managed by Cloudflare:

1. In Vercel, add your domain
2. In Cloudflare DNS:
   - Add CNAME record pointing to your Vercel project
   - Set proxy status to "Proxied" (orange cloud)
3. Cloudflare will handle SSL automatically

---

## 🔒 **SSL Certificate (HTTPS)**

Vercel automatically provides free SSL certificates from Let's Encrypt:
- ✅ Automatically enabled
- ✅ Auto-renews every 90 days
- ✅ No configuration needed
- ✅ Your site will be `https://` by default

---

## 🔄 **Automatic Deployments**

Vercel is now connected to your GitHub repository. Every time you push changes:

```bash
git add .
git commit -m "Update website content"
git push origin main
```

Vercel will automatically:
1. Detect the push
2. Build your project
3. Deploy the new version
4. Update your live site in ~2-3 minutes

---

## 🎯 **Post-Deployment Tasks**

### **1. Update Supabase Allowed URLs**

Go to your Supabase dashboard:
1. Project Settings → API → Configuration
2. Add your production URL to "Site URL"
3. Add your production URL to "Redirect URLs":
   - `https://yourdomain.com`
   - `https://yourdomain.com/admin`

### **2. Configure ImageKit CORS**

If you have CORS issues:
1. Go to ImageKit Dashboard
2. Settings → CORS
3. Add your production domain: `https://yourdomain.com`

### **3. Update Privacy Policy and Terms**

Update contact information in:
- `src/components/PrivacyPolicy.tsx`
- `src/components/TermsOfService.tsx`

Add your official contact email and address.

### **4. Test Admin Login**

1. Go to `https://yourdomain.com/admin`
2. Login with your Supabase admin credentials
3. Test image management features

### **5. Google Search Console**

Submit your sitemap to Google:
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add your domain
3. Verify ownership (Vercel makes this easy)
4. Submit sitemap: `https://yourdomain.com/sitemap.xml`

(Note: You'll need to create a sitemap - see improvements.md #13)

---

## 🐛 **Troubleshooting**

### **Build Fails**

Check Vercel build logs for errors:
- Missing dependencies: Run `npm install` locally
- TypeScript errors: Run `npm run build` locally to test
- Environment variables: Ensure all 5 variables are set

### **Gallery/Carousel Images Don't Load**

- Check environment variables are set correctly
- Verify ImageKit API keys are valid
- Check browser console for CORS errors
- Ensure Supabase gallery_images table has data

### **Admin Login Doesn't Work**

- Check Supabase URL in Vercel environment variables
- Verify Supabase admin user exists
- Check Supabase allowed URLs include your domain
- Test authentication in Supabase dashboard

### **Domain Not Working**

- Wait 1-2 hours for DNS propagation
- Check DNS configuration at [whatsmydns.net](https://www.whatsmydns.net)
- Verify DNS records match Vercel instructions
- Check domain registrar's control panel

### **"Cannot GET /privacy" or 404 on Routes**

Add `vercel.json` configuration file to handle client-side routing.

---

## 📊 **Monitoring Your Site**

### **Vercel Analytics** (Free)
- Enable in Vercel dashboard
- Track page views, performance, errors
- Real user monitoring (RUM)

### **Suggested Tools:**
- **Google Analytics 4** - User behavior tracking
- **Sentry** - Error tracking
- **Uptime Robot** - Uptime monitoring (free)

---

## 🔐 **Security Checklist**

After deployment:

- ✅ HTTPS enabled (automatic with Vercel)
- ✅ Environment variables not in source code
- ✅ `.env` in `.gitignore`
- ✅ Cookie consent banner active
- ✅ Privacy Policy accessible
- ✅ Terms of Service accessible
- ✅ Admin session timeout working (2 hours)
- ✅ Admin logout properly signs out

**Future Improvements:**
- Move ImageKit private key to backend Edge Function
- Implement rate limiting for admin login
- Add CSRF protection for forms

---

## 💰 **Cost Breakdown**

### **Current Setup:**
- ✅ **Vercel Hosting:** FREE
- ✅ **Supabase:** FREE (500MB database, 1GB file storage, 50MB egress)
- ✅ **ImageKit:** FREE (20GB bandwidth/month)
- ✅ **SSL Certificate:** FREE (included with Vercel)
- ✅ **CDN:** FREE (included with Vercel)

**Only Costs:**
- Domain: ~$10-15/year (depending on TLD)

### **When You'll Need to Upgrade:**
- Supabase: If you exceed 500MB database or 1GB storage
- ImageKit: If you exceed 20GB bandwidth/month
- Vercel: Stays free unless you need team features

---

## 📞 **Support Resources**

### **Vercel:**
- Documentation: [vercel.com/docs](https://vercel.com/docs)
- Community: [vercel.com/community](https://vercel.com/community)
- Support: Email support@vercel.com

### **Domain Issues:**
- Check with your domain registrar (Namecheap, GoDaddy, etc.)
- DNS propagation checker: [whatsmydns.net](https://www.whatsmydns.net)

### **Supabase:**
- Docs: [supabase.com/docs](https://supabase.com/docs)
- Community: [github.com/supabase/supabase/discussions](https://github.com/supabase/supabase/discussions)

### **ImageKit:**
- Docs: [docs.imagekit.io](https://docs.imagekit.io)
- Support: support@imagekit.io

---

## 🚀 **Quick Deployment Commands**

```bash
# Test build locally before deploying
npm run build
npm run preview

# Check for any errors
npm run lint

# Commit and push to trigger auto-deployment
git add .
git commit -m "Your commit message"
git push origin main

# Check deployment status on Vercel dashboard
```

---

## 📝 **Deployment Checklist**

Print this and check off as you go:

- [ ] Code pushed to GitHub
- [ ] Signed up for Vercel with GitHub
- [ ] Imported project to Vercel
- [ ] Added all 5 environment variables
- [ ] First deployment successful
- [ ] Tested all pages and features
- [ ] Added custom domain in Vercel
- [ ] Updated DNS records at domain registrar
- [ ] Waited for DNS propagation (1-2 hours)
- [ ] Verified HTTPS is working
- [ ] Updated Supabase allowed URLs
- [ ] Configured ImageKit CORS (if needed)
- [ ] Tested admin login on production
- [ ] Submitted to Google Search Console
- [ ] Enabled Vercel Analytics
- [ ] Set up uptime monitoring

---

**Need Help?**

If you run into issues during deployment, check the troubleshooting section above or create an issue in your GitHub repository with:
- Error message from Vercel build logs
- Screenshots of the issue
- Steps you've already tried

---

**Document Version:** 1.0
**Created:** 2025-11-03
**For Project:** Hare Krishna Temple Avadi Website
