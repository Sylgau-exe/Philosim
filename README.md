# PhiloSim — Approach Your Work Like Socrates

AI-powered philosophical apprenticeship simulation. Part of the BizSimHub ecosystem by Panda Projet.

## 🏛️ Overview

PhiloSim presents real workplace dilemmas and pairs you with Socrates as an AI philosophical advisor. Using the Socratic Method, the AI guides you through ethical reasoning, self-examination, and wise decision-making — without ever giving you the answer.

## 🚀 Deploy to Vercel

### 1. Create GitHub Repo
```bash
git init
git add .
git commit -m "PhiloSim V1"
git remote add origin https://github.com/Sylgau-exe/philosim.git
git push -u origin main
```

### 2. Import in Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the `philosim` repo
3. Framework: **Vite**
4. Deploy

### 3. Add Environment Variables
In Vercel → Settings → Environment Variables:

| Variable | Value |
|----------|-------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key |

### 4. Redeploy
After adding env vars, redeploy for them to take effect.

## 📁 Project Structure

```
philosim/
├── api/
│   ├── chat.js          # Anthropic API proxy (server-side)
│   └── health.js        # Health check
├── src/
│   ├── main.jsx         # React entry
│   └── App.jsx          # PhiloSim component
├── index.html           # HTML entry
├── package.json
├── vercel.json
└── vite.config.js
```

## 🎭 Future Mentors (Roadmap)

- Barack Obama — Leadership
- Quentin Tarantino — Creative Direction
- Quincy Jones — Collaboration
- Coco Chanel — Brand & Innovation
- Leonardo da Vinci — Cross-Disciplinary

## License

MIT — Panda Projet / Sylvain Gauthier
