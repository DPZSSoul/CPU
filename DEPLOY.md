# Deploy Your PC Learning Platform

Your app is a static site (Vite + React). Here are the easiest ways to put it online for free.

---

## Option 1: Vercel (Recommended — Easiest)

1. **Create a GitHub account** (if you don't have one): [github.com](https://github.com)

2. **Push your project to GitHub:**
   - Create a new repo at github.com/new
   - In your project folder, run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

3. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com) and sign up (free) with GitHub
   - Click **"Add New Project"** → import your GitHub repo
   - Vercel will detect Vite automatically. Click **Deploy**
   - In ~1–2 minutes you'll get a URL like `https://your-project.vercel.app`

4. Share that URL with your friend.

---

## Option 2: Netlify (No GitHub Required)

1. **Build your project:**
   ```bash
   npm run build
   ```

2. **Deploy:**
   - Go to [netlify.com](https://netlify.com) and sign up (free)
   - Drag and drop the **`dist`** folder onto the Netlify deploy area
   - You'll get a URL like `https://random-name.netlify.app`

3. **Optional:** To get a nicer URL, go to *Domain settings* → *Options* → *Edit site name*.

---

## Option 3: Surge (One Command)

1. **Install Surge** (one-time):
   ```bash
   npm install -g surge
   ```

2. **Build and deploy:**
   ```bash
   npm run build
   surge dist
   ```

3. Follow the prompts (create account if needed). You'll get a URL like `https://your-name.surge.sh`.

---

## Notes

- **AI Chat:** Your friend will need their own free Groq API key from [console.groq.com](https://console.groq.com) to use the AI feature. Progress and settings are stored in the browser (localStorage).
- **HTTPS:** All these hosts provide HTTPS by default.
- **Updates:** After changes, run `npm run build` and redeploy (or push to GitHub if using Vercel/Netlify with Git).
