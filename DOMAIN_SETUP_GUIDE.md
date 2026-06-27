# Domain Setup Guide - Connecting Namecheap to Vercel

**Last Updated:** 2025-11-04
**Purpose:** Connect your Namecheap domain to Vercel deployment

---

## 🌐 **Connect Namecheap Domain to Vercel**

### **Part 1: Add Domain in Vercel**

1. **Go to Vercel Dashboard:**
   - Navigate to: https://vercel.com/dashboard
   - Click on your `hare-krishna-website` project

2. **Go to Settings:**
   - Click **"Settings"** tab
   - Click **"Domains"** in the left sidebar

3. **Add Your Domain:**
   - Enter your domain name (e.g., `harekrishnaavadi.org` or `www.harekrishnaavadi.org`)
   - Click **"Add"**

4. **Vercel will show you DNS records to configure**
   - You'll see something like this:
   ```
   For root domain (example.com):
   Type: A
   Name: @
   Value: 76.76.21.21

   For www subdomain (www.example.com):
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

**Keep this tab open** - you'll need these values!

---

### **Part 2: Configure DNS in Namecheap**

1. **Login to Namecheap:**
   - Go to: https://www.namecheap.com
   - Login to your account

2. **Go to Domain List:**
   - Click **"Domain List"** in the left sidebar
   - Find your domain and click **"Manage"**

3. **Access Advanced DNS:**
   - Click the **"Advanced DNS"** tab

4. **Delete Existing Records (if any):**
   - Look for any existing **A Records** with Host `@`
   - Look for any existing **CNAME Records** with Host `www`
   - Click the trash icon to delete them

5. **Add New DNS Records:**

   **For Root Domain (example.com):**
   - Click **"Add New Record"**
   - **Type:** A Record
   - **Host:** @
   - **Value:** 76.76.21.21
   - **TTL:** Automatic (or 300)
   - Click **Save** ✅

   **For WWW Subdomain (www.example.com):**
   - Click **"Add New Record"**
   - **Type:** CNAME Record
   - **Host:** www
   - **Value:** cname.vercel-dns.com
   - **TTL:** Automatic (or 300)
   - Click **Save** ✅

6. **Your DNS Records should look like this:**
   ```
   Type    | Host | Value                  | TTL
   --------|------|------------------------|----------
   A       | @    | 76.76.21.21           | Automatic
   CNAME   | www  | cname.vercel-dns.com  | Automatic
   ```

---

### **Part 3: Wait for DNS Propagation**

1. **DNS propagation takes time:**
   - Usually: 15 minutes to 2 hours
   - Sometimes: Up to 48 hours (rare)

2. **Check DNS propagation status:**
   - Go to: https://www.whatsmydns.net
   - Enter your domain name
   - Select **"A"** record type
   - Click **"Search"**
   - You should see `76.76.21.21` appearing globally

3. **Check in Vercel:**
   - Go back to Vercel → Settings → Domains
   - Your domain status should change from "Pending" to "Active" ✅

---

### **Part 4: Verify It Works**

Once DNS has propagated (you'll see checkmarks in Vercel):

1. **Open your domain in browser:**
   - Try: `https://yourdomain.com`
   - Try: `https://www.yourdomain.com`

2. **Both should show your website!** 🎉

3. **Vercel automatically provides:**
   - ✅ Free SSL certificate (HTTPS)
   - ✅ Auto-renewal every 90 days
   - ✅ Redirects www to non-www (or vice versa)

---

## 🔍 **Troubleshooting**

### **"Domain Not Working After 2 Hours"**

1. **Check Namecheap DNS Settings:**
   - Make sure you're in **"Advanced DNS"** tab (not "Basic DNS")
   - Verify the A record shows: `76.76.21.21`
   - Verify the CNAME shows: `cname.vercel-dns.com`

2. **Check Namecheap Nameservers:**
   - In Namecheap domain management
   - Look for **"Nameservers"** section
   - Should be set to: **"Namecheap BasicDNS"** or **"Custom DNS"**
   - If it's pointing to another service (like Cloudflare), you'll need to update DNS there instead

3. **Check Vercel:**
   - Go to Vercel → Settings → Domains
   - Look for error messages
   - Click **"Refresh"** to retry verification

### **"SSL Certificate Not Working"**

- Vercel takes 5-10 minutes to provision SSL after DNS is verified
- Be patient, it will appear automatically
- You'll see a green lock icon in your browser when ready

### **"DNS Records Look Correct But Still Not Working"**

1. **Flush your DNS cache:**

   **Windows:**
   ```bash
   ipconfig /flushdns
   ```

   **Mac:**
   ```bash
   sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
   ```

   **Linux:**
   ```bash
   sudo systemd-resolve --flush-caches
   ```

2. **Try a different browser or incognito mode**

3. **Check DNS from different location:**
   - Use mobile data instead of WiFi
   - Use a VPN to check from different region

### **"Error: Invalid Configuration" in Vercel**

- Make sure you entered the domain correctly (no https://, no trailing slash)
- Examples:
  - ✅ `harekrishnaavadi.org`
  - ✅ `www.harekrishnaavadi.org`
  - ❌ `https://harekrishnaavadi.org`
  - ❌ `harekrishnaavadi.org/`

---

## 📋 **Quick Checklist**

- [ ] Added domain in Vercel (Settings → Domains)
- [ ] Got DNS values from Vercel
- [ ] Logged into Namecheap
- [ ] Went to Advanced DNS tab
- [ ] Added A record: @ → 76.76.21.21
- [ ] Added CNAME record: www → cname.vercel-dns.com
- [ ] Saved all records
- [ ] Waited 15-60 minutes for DNS propagation
- [ ] Checked whatsmydns.net
- [ ] Verified domain shows "Active" in Vercel
- [ ] Tested https://yourdomain.com in browser
- [ ] SSL certificate working (green lock icon)

---

## 🔧 **Post-Deployment: Update Supabase Settings**

After your domain is working, update Supabase to allow authentication from your custom domain:

1. **Go to Supabase Dashboard:**
   - https://supabase.com/dashboard/project/gfippiubjrxsmnufyioh

2. **Go to Authentication Settings:**
   - Click **"Authentication"** in left sidebar
   - Click **"URL Configuration"**

3. **Add Site URL:**
   - Add: `https://yourdomain.com`

4. **Add Redirect URLs:**
   - Add: `https://yourdomain.com/**`
   - Add: `https://yourdomain.com/admin`

5. **Click Save**

This ensures admin login works on your custom domain!

---

## 📊 **Common Namecheap Issues**

### **Issue 1: Parking Page Shows Instead of Your Site**

**Solution:**
1. Go to Namecheap domain management
2. Look for "Redirect Domain" or "URL Redirect" section
3. **Disable** or **Remove** any redirects
4. Set to "No redirect"

### **Issue 2: Nameservers Point to Different Service**

**Symptoms:** You see "Custom DNS" or third-party nameservers

**Solution:**
1. In Namecheap domain management
2. Find **"Nameservers"** section
3. Select **"Namecheap BasicDNS"**
4. Click **Save**
5. Now you can use Advanced DNS tab for Vercel records

### **Issue 3: Domain is Locked**

**Symptoms:** Cannot modify DNS records

**Solution:**
1. Go to domain management
2. Look for "Domain Lock" or "Registrar Lock"
3. **Unlock** the domain (you can lock it again after DNS setup)

---

## 🎯 **Expected Timeline**

| Step | Time Required |
|------|---------------|
| Add domain in Vercel | 1 minute |
| Configure DNS in Namecheap | 5 minutes |
| DNS propagation starts | Immediate |
| DNS propagation completes | 15 min - 2 hours |
| Vercel verifies domain | 5 minutes after DNS propagates |
| SSL certificate provisioned | 5-10 minutes after verification |
| **Total Time** | **30 minutes - 3 hours** |

---

## 🌍 **Testing DNS Propagation**

### **Method 1: whatsmydns.net**
1. Go to: https://www.whatsmydns.net
2. Enter your domain
3. Select "A" record type
4. Should show `76.76.21.21` worldwide

### **Method 2: Command Line**

**Windows (CMD or PowerShell):**
```bash
nslookup yourdomain.com
```

**Mac/Linux (Terminal):**
```bash
dig yourdomain.com
```

**Expected output:**
```
yourdomain.com.    300    IN    A    76.76.21.21
```

### **Method 3: Online Tools**
- https://dnschecker.org
- https://mxtoolbox.com/SuperTool.aspx

---

## 📞 **Need Help?**

### **Vercel Support:**
- Docs: https://vercel.com/docs/concepts/projects/domains
- Community: https://github.com/vercel/vercel/discussions

### **Namecheap Support:**
- Knowledge Base: https://www.namecheap.com/support/knowledgebase/
- Live Chat: Available 24/7
- Support Ticket: https://www.namecheap.com/support/

### **DNS Help:**
- Cloudflare DNS Learning Center: https://www.cloudflare.com/learning/dns/what-is-dns/
- DNS Propagation Checker: https://www.whatsmydns.net

---

## 🎉 **Success Indicators**

You'll know everything is working when:

- ✅ Vercel domain shows **"Active"** status
- ✅ Your domain opens in browser (without errors)
- ✅ Green lock icon appears (HTTPS/SSL working)
- ✅ Both `yourdomain.com` and `www.yourdomain.com` work
- ✅ Admin login works at `yourdomain.com/admin`
- ✅ Gallery images load properly
- ✅ All navigation works

---

## 🔐 **Security Notes**

After domain is live:

1. **Enable Vercel Protection (Optional):**
   - Go to Vercel → Settings → Protection
   - Enable DDoS protection
   - Enable password protection for preview deployments

2. **Update Environment Variables:**
   - All environment variables are already set
   - No additional configuration needed

3. **Test Admin Panel:**
   - Go to `https://yourdomain.com/admin`
   - Login with Supabase credentials
   - Test image upload (uses Edge Functions - secure!)
   - Test image delete
   - Test folder sync

---

**Document Version:** 1.0
**Created:** 2025-11-04
**For:** Hare Krishna Temple Avadi Website
**Status:** Production Ready
