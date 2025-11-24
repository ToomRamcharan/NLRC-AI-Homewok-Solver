# 🚀 Quick Start Guide - Deploy to GitHub & Vercel

## Step 1: Install Git (5 minutes)

1. Download Git from: https://git-scm.com/download/win
2. Run the installer (use default settings)
3. Restart your computer
4. Open PowerShell and verify:
   ```bash
   git --version
   ```

## Step 2: Create GitHub Account (2 minutes)

1. Go to https://github.com
2. Click "Sign up"
3. Follow the registration process

## Step 3: Push to GitHub (10 minutes)

### Option A: GitHub Desktop (Easiest - Recommended)

1. Download: https://desktop.github.com/
2. Install and sign in
3. Click "File" → "Add local repository"
4. Browse to: `C:\Users\ck528\OneDrive\Pictures\NLRC AI Home work solver`
5. Click "Create repository"
6. Click "Publish repository"
7. Name it: `nlrc-homework-solver`
8. Click "Publish repository"
9. ✅ Done! Your code is on GitHub

### Option B: Command Line

Open PowerShell in your project folder:

```bash
# Navigate to project
cd "C:\Users\ck528\OneDrive\Pictures\NLRC AI Home work solver"

# Initialize Git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: NLRC Homework Solver"

# Go to github.com and create a new repository named: nlrc-homework-solver
# Then run:
git remote add origin https://github.com/YOUR_USERNAME/nlrc-homework-solver.git
git branch -M main
git push -u origin main
```

## Step 4: Deploy to Vercel (5 minutes)

1. Go to https://vercel.com
2. Click "Sign Up" → "Continue with GitHub"
3. Authorize Vercel
4. Click "Add New" → "Project"
5. Find your repository: `nlrc-homework-solver`
6. Click "Import"
7. **IMPORTANT**: Add Environment Variable
   - Click "Environment Variables"
   - Name: `GEMINI_API_KEY`
   - Value: `AIzaSyADEZrW0uR0tYrn9ImMnhKy2G3e0vsDPoU`
   - Click "Add"
8. Click "Deploy"
9. Wait 1-2 minutes
10. ✅ Your site is live!

## Step 5: Update for Production (Optional - For Maximum Security)

To use the serverless function (keeps API key 100% secure):

1. In your project, rename files:
   ```bash
   # Backup current script
   mv script.js script.local.js
   
   # Use production version
   mv script.production.js script.js
   ```

2. Push changes to GitHub:
   ```bash
   git add .
   git commit -m "Use serverless function for production"
   git push
   ```

3. Vercel will automatically redeploy

## 🎉 You're Done!

Your homework solver is now live at: `https://your-project.vercel.app`

## ⚡ Quick Checklist

- [ ] Git installed
- [ ] GitHub account created
- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Environment variable added (`GEMINI_API_KEY`)
- [ ] Site deployed successfully
- [ ] Tested the live site

## 🔍 Verify Everything Works

1. Visit your Vercel URL
2. Try asking a question
3. Check if you get a response
4. Test the chat feature
5. Upload an image and test

## 🆘 Troubleshooting

### Git not recognized
- Restart computer after installing Git
- Or close and reopen PowerShell

### Can't find repository on Vercel
- Make sure you authorized Vercel to access your GitHub
- Refresh the page
- Check if repository is public

### API not working on Vercel
- Verify environment variable name is exactly: `GEMINI_API_KEY`
- Check the value is correct
- Redeploy the project

### Still having issues?
- Check Vercel deployment logs
- Open browser console (F12) for errors
- See DEPLOYMENT_GUIDE.md for detailed help

## 📝 What Files Are Safe to Commit?

✅ **Safe to commit:**
- index.html
- style.css
- script.js (or script.production.js)
- config.example.js
- README.md
- .gitignore
- vercel.json
- api/generate.js

❌ **NEVER commit:**
- config.js (contains your API key!)
- .env
- .vercel/

The `.gitignore` file automatically prevents these from being committed.

## 🔐 Security Reminder

Your API key is:
- ✅ Protected locally (in config.js, which is gitignored)
- ✅ Protected on GitHub (not committed)
- ✅ Protected on Vercel (stored as environment variable)
- ✅ Hidden from users (server-side only with serverless function)

## 📚 Next Steps

1. Customize the design
2. Add more features
3. Share with friends
4. Add a custom domain (in Vercel settings)

---

**Total Time: ~25 minutes** ⏱️

Need more help? Check DEPLOYMENT_GUIDE.md for detailed instructions!
