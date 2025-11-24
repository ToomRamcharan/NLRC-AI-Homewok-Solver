# 🔧 Vercel Deployment - Framework Detection Fix

## Problem
Vercel is auto-detecting your project as an Express.js app because of `server.js` and `package.json` files.

## Solution
I've updated the configuration to ensure Vercel deploys it as a **static site with serverless functions**.

---

## ✅ Files Updated

### 1. **vercel.json** (Updated)
- Set `framework: null` to disable auto-detection
- Configured as static site
- Added serverless function support for `/api` routes
- Added security headers

### 2. **.vercelignore** (New)
- Ignores `server.js` (local development only)
- Ignores `package.json` (prevents Express detection)
- Ignores local config files

---

## 🚀 How to Deploy Correctly

### Option 1: Via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - https://vercel.com/dashboard

2. **Import Your GitHub Repository**
   - Click "Add New" → "Project"
   - Select your repository

3. **Configure Build Settings** ⚠️ IMPORTANT
   - **Framework Preset**: Select "Other" or leave blank
   - **Build Command**: Leave EMPTY
   - **Output Directory**: Leave as `./` or EMPTY
   - **Install Command**: Leave EMPTY
   - **Root Directory**: `./`

4. **Add Environment Variable**
   - Name: `GEMINI_API_KEY`
   - Value: `AIzaSyADEZrW0uR0tYrn9ImMnhKy2G3e0vsDPoU`

5. **Deploy**
   - Click "Deploy"
   - Vercel will now treat it as a static site

### Option 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy with explicit configuration
vercel --prod

# When prompted:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? nlrc-homework-solver
# - Directory? ./
# - Override settings? No
```

---

## 🔍 Verify Correct Deployment

After deployment, check:

1. **Deployment Type**
   - Go to your project in Vercel dashboard
   - Check "Settings" → "General"
   - Framework should show: "Other" or blank
   - NOT "Express.js"

2. **Build Logs**
   - Should NOT show npm install or Express-related commands
   - Should show: "Deploying static files"

3. **Test the Site**
   - Visit your Vercel URL
   - Test a question
   - Check if API calls work

---

## 📁 What Gets Deployed

### ✅ Deployed Files:
- `index.html`
- `style.css`
- `script.js` (or `script.production.js`)
- `config.example.js`
- `api/generate.js` (serverless function)
- `vercel.json`

### ❌ NOT Deployed (Ignored):
- `server.js` (local development only)
- `package.json` (prevents Express detection)
- `config.js` (contains API key)
- `.env` (local environment)
- Documentation files (optional)

---

## 🎯 Project Structure on Vercel

```
Deployed Site:
├── index.html              (Static file)
├── style.css               (Static file)
├── script.js               (Static file)
├── config.example.js       (Static file)
└── api/
    └── generate.js         (Serverless function)

Environment Variables:
└── GEMINI_API_KEY          (Set in Vercel dashboard)
```

---

## 🔧 If Vercel Still Detects Express

### Method 1: Override in Dashboard
1. Go to Project Settings
2. Click "General"
3. Scroll to "Framework Preset"
4. Select "Other"
5. Save and redeploy

### Method 2: Remove server.js from Repository
```bash
# Temporarily remove from Git (keep locally)
git rm --cached server.js package.json
git commit -m "Remove Express files from deployment"
git push

# Keep files locally but not in Git
# They're already in .gitignore
```

### Method 3: Use Different Branch for Deployment
```bash
# Create deployment branch without Express files
git checkout -b deploy
git rm server.js package.json
git commit -m "Deployment branch without Express"
git push origin deploy

# In Vercel, set deployment branch to 'deploy'
```

---

## 🆘 Troubleshooting

### Issue: "Build failed - npm install error"
**Cause:** Vercel is trying to run npm install (Express detection)

**Solution:**
1. Check vercel.json has `"framework": null`
2. Check .vercelignore includes server.js and package.json
3. Override framework preset to "Other" in dashboard

### Issue: "API routes not working"
**Cause:** Serverless functions not configured

**Solution:**
1. Verify `api/generate.js` exists
2. Check vercel.json has functions configuration
3. Ensure GEMINI_API_KEY environment variable is set

### Issue: "Static files not loading"
**Cause:** Incorrect routing configuration

**Solution:**
1. Check vercel.json routes configuration
2. Ensure outputDirectory is "."
3. Clear Vercel cache and redeploy

---

## ✨ Expected Deployment Output

When correctly configured, you should see:

```
Vercel CLI Output:
✓ Deploying static files
✓ Building serverless functions
✓ Deployment ready

Build Logs:
- No npm install
- No Express-related commands
- Static file deployment
- Serverless function compilation
```

---

## 📊 Comparison

### ❌ Wrong (Express Detection):
```
Framework: Express.js
Build: npm install → npm start
Output: Server running on port 3000
Result: Won't work (needs server)
```

### ✅ Correct (Static Site):
```
Framework: Other/None
Build: None (static files)
Output: Static files + Serverless functions
Result: Works perfectly!
```

---

## 🎉 Success Checklist

After deployment, verify:
- [ ] Framework shows "Other" or blank (NOT Express)
- [ ] No npm install in build logs
- [ ] Site loads at Vercel URL
- [ ] Can submit questions and get responses
- [ ] Chat feature works
- [ ] Image upload works
- [ ] No console errors

---

## 📝 Quick Fix Commands

If you need to redeploy:

```bash
# Push updated configuration
git add vercel.json .vercelignore
git commit -m "Fix Vercel framework detection"
git push

# Vercel will auto-redeploy
```

Or manually redeploy in Vercel dashboard:
1. Go to Deployments
2. Click "..." on latest deployment
3. Click "Redeploy"

---

## 🔐 Security Note

With this configuration:
- ✅ API key stays in Vercel environment variables
- ✅ Serverless function keeps it server-side
- ✅ No Express server needed
- ✅ Static files served directly by Vercel CDN
- ✅ Fast and secure!

---

**Your site should now deploy correctly as a static site with serverless functions!** 🚀

If you still have issues, check the Vercel deployment logs for specific errors.
