# NLRC AI Homework Solver

🎓 An intelligent homework solver powered by Google's Gemini AI, supporting multiple subjects and languages.

## ✨ Features

- **Multi-Subject Support**: Math, Science, English, Social Studies, Coding, and more
- **Image Upload**: Upload images of homework problems
- **Multiple Languages**: English, Telugu, Hindi, Tamil, Kannada, Malayalam, Marathi
- **AI Chat Assistant**: Interactive chatbot for follow-up questions
- **Step-by-Step Solutions**: Detailed explanations with verification
- **LaTeX Math Rendering**: Beautiful mathematical notation
- **Premium UI**: Modern, responsive design with glassmorphism effects

## 🚀 Live Demo

Visit the live application: [Your Vercel URL here]

## 🛠️ Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **AI Model**: Google Gemini 2.0 Flash
- **Deployment**: Vercel
- **Libraries**: 
  - Marked.js (Markdown rendering)
  - KaTeX (Math rendering)

## 📦 Installation

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

2. Create `config.js` from template:
```bash
cp config.example.js config.js
```

3. Add your Gemini API key to `config.js`:
```javascript
const CONFIG = {
    GEMINI_API_KEY: 'YOUR_API_KEY_HERE',
    API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'
};
```

4. Open `index.html` in your browser or use a local server:
```bash
# Python
python -m http.server 8000

# Node.js (if you have http-server installed)
npx http-server
```

## 🌐 Deployment

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed deployment instructions for:
- GitHub
- Vercel
- Environment variable configuration

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/YOUR_REPO_NAME)

**Important**: After deployment, add your `GEMINI_API_KEY` as an environment variable in Vercel dashboard.

## 🔐 Security

- API keys are stored in `config.js` (local) or environment variables (production)
- `config.js` is in `.gitignore` and never committed to version control
- Production uses Vercel serverless functions to keep API keys server-side
- See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for security best practices

## 📖 Usage

1. **Enter Your Question**: Type or paste your homework question
2. **Upload Image** (Optional): Click the camera icon to upload an image
3. **Select Options**: Choose subject, level, and language
4. **Get Solution**: Click the arrow button to get a detailed solution
5. **Use Chat**: Click the chat icon for follow-up questions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Google Gemini AI for powering the intelligence
- Vercel for hosting
- The open-source community

## 📞 Support

If you encounter any issues:
1. Check the [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
2. Open an issue on GitHub
3. Contact: [Your contact information]

## ⚠️ Important Notes

- Never commit `config.js` to version control
- Always use environment variables in production
- Get your Gemini API key from: https://makersuite.google.com/app/apikey
- Free tier has usage limits - monitor your usage

---

Made with ❤️ for students everywhere
