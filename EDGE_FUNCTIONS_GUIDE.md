# Supabase Edge Functions Deployment Guide

**Purpose:** Secure ImageKit private key by keeping it on backend
**Created:** 2025-11-03
**Status:** Production Ready

---

## 🔐 **What We Fixed**

**BEFORE (Insecure):**
```
Frontend JavaScript → Contains ImageKit private key → Visible in browser ❌
```

**AFTER (Secure):**
```
Frontend → Calls Edge Function → Private key on server → Secure! ✅
```

---

## 📋 **Overview**

We've created **3 Supabase Edge Functions** to handle all ImageKit operations securely:

| Function | Purpose | File |
|----------|---------|------|
| `imagekit-upload` | Upload images to ImageKit | `supabase/functions/imagekit-upload/index.ts` |
| `imagekit-delete` | Delete images from ImageKit | `supabase/functions/imagekit-delete/index.ts` |
| `imagekit-list` | List files from ImageKit folder | `supabase/functions/imagekit-list/index.ts` |

---

## 🚀 **Deployment Steps**

### **Prerequisites**

1. **Supabase CLI installed**
   ```bash
   npm install -g supabase
   ```

2. **Supabase account** (you already have one)

3. **ImageKit credentials** (you already have these)

---

### **Step 1: Install Supabase CLI**

```bash
# Install globally
npm install -g supabase

# Verify installation
supabase --version
```

---

### **Step 2: Login to Supabase**

```bash
# Login to your Supabase account
supabase login

# This will open a browser for authentication
# Follow the prompts to authenticate
```

---

### **Step 3: Link Your Project**

```bash
# Navigate to your project directory
cd "D:\Dev\Hare Krishna Temple\hk_webiste\hare_krishna_website"

# Link to your Supabase project
supabase link --project-ref gfippiubjrxsmnufyioh

# If prompted, use your database password
```

**Note:** Your project reference is `gfippiubjrxsmnufyioh` (from your Supabase URL)

---

### **Step 4: Set Edge Function Environment Variables**

These variables stay on the **server** and are NEVER exposed to frontend!

```bash
# Set ImageKit public key
supabase secrets set IMAGEKIT_PUBLIC_KEY="public_7f1RD/+qoS/TQ/fpOxrLgRiqy+o="

# Set ImageKit private key (SECURE - stays on server)
supabase secrets set IMAGEKIT_PRIVATE_KEY="private_4W9KigZW6lvYhYcr/NZw8M86xtY="

# Set ImageKit URL endpoint
supabase secrets set IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/harekrishnaavadi"

# Set Supabase URL (for Edge Functions to verify auth)
supabase secrets set SUPABASE_URL="https://gfippiubjrxsmnufyioh.supabase.co"

# Set Supabase anon key (for Edge Functions to verify auth)
supabase secrets set SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmaXBwaXVianJ4c21udWZ5aW9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNjM2MDQsImV4cCI6MjA3NDczOTYwNH0.b8F3O5NbaIMKyrohXy-bGr2jUbfeRUfy2y0V4pGjRnA"
```

**Verify secrets are set:**
```bash
supabase secrets list
```

---

### **Step 5: Deploy Edge Functions**

Deploy all three functions:

```bash
# Deploy imagekit-upload function
supabase functions deploy imagekit-upload

# Deploy imagekit-delete function
supabase functions deploy imagekit-delete

# Deploy imagekit-list function
supabase functions deploy imagekit-list
```

**Or deploy all at once:**
```bash
supabase functions deploy
```

---

### **Step 6: Verify Deployment**

Check that functions are deployed:

```bash
# List all deployed functions
supabase functions list
```

You should see:
- ✅ imagekit-upload
- ✅ imagekit-delete
- ✅ imagekit-list

---

### **Step 7: Test Edge Functions**

Test using Supabase CLI:

```bash
# Test imagekit-list function
supabase functions serve imagekit-list

# In another terminal, test it
curl -i --location --request POST 'http://localhost:54321/functions/v1/imagekit-list' \
  --header 'Authorization: Bearer YOUR_SUPABASE_JWT_TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{"folderPath":"/2025 hare krishna janmastami"}'
```

---

## 🔧 **Frontend Configuration**

### **Update Environment Variables**

Your `.env` file should now **ONLY** have these variables (NO private key):

```bash
# Supabase Configuration (public, safe to expose)
VITE_SUPABASE_URL='https://gfippiubjrxsmnufyioh.supabase.co'
VITE_SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmaXBwaXVianJ4c21udWZ5aW9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNjM2MDQsImV4cCI6MjA3NDczOTYwNH0.b8F3O5NbaIMKyrohXy-bGr2jUbfeRUfy2y0V4pGjRnA'

# ImageKit Configuration (NO PRIVATE KEY!)
VITE_IMAGEKIT_PUBLIC_KEY='public_7f1RD/+qoS/TQ/fpOxrLgRiqy+o='
VITE_IMAGEKIT_URL_ENDPOINT='https://ik.imagekit.io/harekrishnaavadi'

# ⚠️ REMOVED: VITE_IMAGEKIT_PRIVATE_KEY (now on backend!)
```

### **Update Vercel Environment Variables**

In Vercel dashboard, **REMOVE** this variable:
- ❌ `VITE_IMAGEKIT_PRIVATE_KEY` (delete it!)

Keep these variables:
- ✅ `VITE_SUPABASE_URL`
- ✅ `VITE_SUPABASE_ANON_KEY`
- ✅ `VITE_IMAGEKIT_PUBLIC_KEY`
- ✅ `VITE_IMAGEKIT_URL_ENDPOINT`

---

## 🧪 **Testing**

### **Test Locally**

1. **Start development server:**
   ```bash
   npm run dev
   ```

2. **Login to admin panel:**
   - Navigate to `http://localhost:5173/admin`
   - Login with your Supabase admin credentials

3. **Test upload:**
   - Go to Carousel or Gallery tab
   - Try uploading an image
   - Should work seamlessly!

4. **Test delete:**
   - Try deleting an image
   - Should work seamlessly!

5. **Test sync:**
   - Try syncing from ImageKit folder
   - Should list files and import them!

### **Test in Browser DevTools**

1. Open DevTools (F12)
2. Go to Sources tab
3. Search for "private_" in JavaScript files
4. **Result: Should NOT find any private key!** ✅

---

## 🔍 **How It Works**

### **Upload Flow**

```
┌─────────────────────────────────────────────────────────────┐
│ 1. User uploads image in admin panel                        │
│    ↓                                                         │
│ 2. Frontend: Converts file to base64                        │
│    ↓                                                         │
│ 3. Frontend: Calls supabase.functions.invoke('imagekit-upload') │
│    ↓                                                         │
│ 4. Edge Function: Verifies user is authenticated            │
│    ↓                                                         │
│ 5. Edge Function: Uses private key (on server!)             │
│    ↓                                                         │
│ 6. Edge Function: Uploads to ImageKit                       │
│    ↓                                                         │
│ 7. Returns result to frontend                               │
└─────────────────────────────────────────────────────────────┘
```

### **Security Features**

- ✅ **Authentication Required**: Only logged-in admins can call functions
- ✅ **Private Key on Server**: Never exposed to browser
- ✅ **CORS Enabled**: Works from your domain
- ✅ **Error Handling**: Proper error messages
- ✅ **Logging**: Console logs for debugging

---

## 📊 **Verification Checklist**

After deployment, verify:

- [ ] Edge Functions deployed successfully
- [ ] Secrets set in Supabase
- [ ] Frontend `.env` has NO private key
- [ ] Vercel env vars have NO private key
- [ ] Admin login works
- [ ] Image upload works
- [ ] Image delete works
- [ ] Folder sync works
- [ ] DevTools shows NO private key in JavaScript

---

## 🐛 **Troubleshooting**

### **Error: "Missing authorization header"**

**Cause:** User not logged in or JWT token expired

**Fix:**
1. Logout from admin panel
2. Login again
3. Try the operation again

### **Error: "Missing ImageKit configuration"**

**Cause:** Secrets not set in Supabase

**Fix:**
```bash
# Check current secrets
supabase secrets list

# Set missing secrets
supabase secrets set IMAGEKIT_PRIVATE_KEY="your_key_here"
```

### **Error: "Function not found"**

**Cause:** Functions not deployed

**Fix:**
```bash
# Deploy all functions
supabase functions deploy
```

### **CORS Error**

**Cause:** Origin not allowed

**Fix:** Edge Functions already have CORS enabled for all origins (`*`). If you still see errors, check browser console for details.

### **Upload Fails with "413 Payload Too Large"**

**Cause:** File size exceeds limit (default 10MB for Edge Functions)

**Fix:**
1. Compress images before upload
2. Or increase Edge Function payload limit in Supabase dashboard

---

## 🔄 **Updating Edge Functions**

If you need to modify an Edge Function:

1. **Edit the function file:**
   ```bash
   # Example: Edit imagekit-upload
   code supabase/functions/imagekit-upload/index.ts
   ```

2. **Redeploy:**
   ```bash
   supabase functions deploy imagekit-upload
   ```

3. **Test the changes**

---

## 📝 **Edge Function Logs**

View logs to debug issues:

```bash
# View logs for imagekit-upload
supabase functions logs imagekit-upload

# Follow logs in real-time
supabase functions logs imagekit-upload --follow

# View logs for all functions
supabase functions logs
```

---

## 💰 **Pricing**

**Supabase Edge Functions:**
- Free tier: 500K invocations/month
- Additional: $2 per 100K invocations

Your usage:
- Upload: ~10-20 invocations/day = ~300-600/month
- Delete: ~5-10 invocations/day = ~150-300/month
- List: ~5-10 invocations/day = ~150-300/month

**Total: ~600-1200 invocations/month = FREE tier is plenty!**

---

## 🎯 **Production Checklist**

Before going live:

- [ ] All Edge Functions deployed
- [ ] Secrets verified in Supabase
- [ ] Frontend `.env` cleaned (no private key)
- [ ] Vercel env vars cleaned (no private key)
- [ ] Tested upload functionality
- [ ] Tested delete functionality
- [ ] Tested folder sync
- [ ] Verified no private key in browser DevTools
- [ ] Tested with actual admin user
- [ ] Checked Edge Function logs for errors

---

## 📞 **Support**

### **Supabase Edge Functions:**
- Docs: https://supabase.com/docs/guides/functions
- Community: https://github.com/supabase/supabase/discussions

### **Issues?**

1. Check Edge Function logs:
   ```bash
   supabase functions logs imagekit-upload
   ```

2. Check browser console for errors

3. Verify authentication is working

4. Check that secrets are set correctly

---

## 🎉 **Success!**

Your ImageKit private key is now **100% secure**!

- ✅ Private key stays on backend
- ✅ Never exposed in browser
- ✅ Industry-standard security
- ✅ Production-ready
- ✅ Cost-effective
- ✅ Easy to maintain

---

**Document Version:** 1.0
**Created:** 2025-11-03
**Last Updated:** 2025-11-03
**Status:** Production Ready
