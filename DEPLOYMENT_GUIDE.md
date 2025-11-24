# 🚀 Deployment Guide - GitHub & Vercel

## Complete Step-by-Step Guide to Deploy Your Homework Solver

---

## ⚠️ CRITICAL: API Key Security for Deployment

**IMPORTANT**: When deploying to GitHub and Vercel, you MUST handle the API key securely. Here's how:

### The Problem:
- Your `config.js` contains the API key and is in `.gitignore`
- This means it won't be pushed to GitHub (good for security!)
- But Vercel needs the API key to work (problem!)

### The Solution:
Use **Vercel Environment Variables** to store your API key securely.

---

## 📋 Prerequisites

### 1. Install Git
Download and install Git from: https://git-scm.com/download/win

After installation:
1. Open PowerShell or Command Prompt
2. Configure Git:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 2. Create GitHub Account
- Go to https://github.com
- Sign up for a free account

### 3. Create Vercel Account
- Go to https://vercel.com
- Sign up using your GitHub account (recommended)

---

## 🔧 Step 1: Prepare Your Project

### A. Create a config template file

Create `config.example.js` (this will be committed to GitHub as a template):

```javascript
// API Configuration Template
// Copy this file to config.js and add your actual API key
const CONFIG = {
    GEMINI_API_KEY: 'YOUR_API_KEY_HERE',
    API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'
};
```

### B. Verify .gitignore

Make sure your `.gitignore` includes:
```
config.js
.env
.env.local
node_modules/
.vercel
```

---

## 📤 Step 2: Push to GitHub

### Option A: Using GitHub Desktop (Easier)
1. Download GitHub Desktop: https://desktop.github.com/
2. Install and sign in with your GitHub account
3. Click "Add" → "Add Existing Repository"
4. Select your project folder
5. Click "Publish repository"
6. Uncheck "Keep this code private" if you want it public
7. Click "Publish Repository"

### Option B: Using Command Line
Open PowerShell in your project folder and run:

```bash
# Initialize Git repository
git init

# Add all files (config.js will be ignored automatically)
git add .

# Create first commit
git commit -m "Initial commit: NLRC Homework Solver"

# Create a new repository on GitHub (do this first on github.com)
# Then link it:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## 🌐 Step 3: Deploy to Vercel

### Method 1: Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Click "Add New" → "Project"

2. **Import GitHub Repository**
   - Click "Import" next to your repository
   - Vercel will detect it's a static site

3. **Configure Project**
   - Framework Preset: **Other** (or leave as detected)
   - Root Directory: `./` (leave as default)
   - Build Command: Leave empty (static site)
   - Output Directory: `./` (leave as default)

4. **Add Environment Variable** ⚠️ CRITICAL STEP
   - Click "Environment Variables"
   - Add variable:
     - Name: `GEMINI_API_KEY`
     - Value: `AIzaSyADEZrW0uR0tYrn9ImMnhKy2G3e0vsDPoU`
   - Click "Add"

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your site will be live at: `your-project.vercel.app`

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts
# When asked about environment variables, add GEMINI_API_KEY
```

---

## 🔐 Step 4: Update Code for Production

You need to modify your code to use environment variables in production.

### Update `config.js` for local development:

```javascript
// API Configuration
// For local development only - DO NOT COMMIT THIS FILE
const CONFIG = {
    GEMINI_API_KEY: 'AIzaSyADEZrW0uR0tYrn9ImMnhKy2G3e0vsDPoU',
    API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'
};
```

### Create `config.production.js` (for Vercel):

```javascript
// Production Configuration
// This file can be safely committed
const CONFIG = {
    // In production, we'll inject the API key via Vercel environment variables
    GEMINI_API_KEY: window.VERCEL_ENV_GEMINI_API_KEY || 'PLACEHOLDER',
    API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'
};
```

---

## 🎯 Alternative: Serverless Function Approach (Most Secure)

For maximum security, use Vercel Serverless Functions to hide your API key completely.

### Create `api/generate.js`:

```javascript
// Vercel Serverless Function
export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { contents } = req.body;

        const response = await fetch(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-goog-api-key': process.env.GEMINI_API_KEY
                },
                body: JSON.stringify({ contents })
            }
        );

        const data = await response.json();
        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
```

### Update `script.js` to use the serverless function:

```javascript
// Change API_URL based on environment
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === ''
    ? 'http://localhost:3000/api/generate'  // Local development
    : '/api/generate';  // Production (Vercel)
```

---

## 📝 Quick Deployment Checklist

- [ ] Install Git
- [ ] Create GitHub account
- [ ] Create Vercel account
- [ ] Verify `.gitignore` includes `config.js`
- [ ] Create `config.example.js` template
- [ ] Push code to GitHub (config.js will NOT be included)
- [ ] Import project to Vercel
- [ ] Add `GEMINI_API_KEY` environment variable in Vercel
- [ ] Deploy and test

---

## 🔍 Verify Deployment

After deployment:

1. **Check GitHub Repository**
   - Verify `config.js` is NOT in the repository
   - Verify `config.example.js` IS in the repository
   - Check `.gitignore` is working

2. **Check Vercel Deployment**
   - Visit your deployed URL
   - Open browser console (F12)
   - Test a question
   - Verify API calls work

3. **Security Check**
   - View page source on deployed site
   - Search for your API key
   - It should NOT appear anywhere

---

## 🆘 Troubleshooting

### "Git is not recognized"
- Restart your computer after installing Git
- Or add Git to PATH manually

### "API key not working on Vercel"
- Check environment variable name matches exactly
- Redeploy after adding environment variables
- Check Vercel deployment logs

### "CORS errors"
- Use the serverless function approach
- Or ensure API calls are from the same domain

### "Config.js not found on Vercel"
- This is expected! Use environment variables instead
- Or use the serverless function approach

---

## 🎉 Success!

Once deployed, your app will be live at:
- **Vercel URL**: `https://your-project.vercel.app`
- **Custom Domain**: You can add your own domain in Vercel settings

Your API key will be:
- ✅ Secure (not in GitHub)
- ✅ Working (via Vercel environment variables)
- ✅ Hidden from users (server-side only)

---

## 📚 Additional Resources

- Git Documentation: https://git-scm.com/doc
- GitHub Guides: https://guides.github.com
- Vercel Documentation: https://vercel.com/docs
- Environment Variables: https://vercel.com/docs/concepts/projects/environment-variables

---

**Need Help?** Check the troubleshooting section or refer to the official documentation.
