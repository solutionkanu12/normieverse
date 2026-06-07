# 🌆 NormieVerse — The On-Chain City

> **Normies Hackathon 2026 Submission**  
> A living pixel-art city where 10,000 on-chain Normies walk the streets of Ethereum.

🔗 **Live:** [normieverse.xyz](https://normieverse.xyz)  
🎨 **Collection:** [normies.art](https://normies.art)  
🏆 **Hackathon:** [hackathon.normies.art](https://hackathon.normies.art)

---

## What is NormieVerse?

NormieVerse is an interactive pixel-art city built entirely on top of the Normies on-chain API. Every character walking through the city is a real Normie NFT — pulled live from the Ethereum blockchain. No static images, no fake data — everything you see is 100% on-chain.

Walk through a living cyberpunk world, click any Normie to reveal their identity, generate AI-powered lore from their actual traits, view their canvas history, and share their wanted poster on X.

---

## Features

- 🏙️ **Living City** — 56 real Normies walking through a pixel-art cyberpunk cityscape
- 🔍 **Spawn Any Normie** — search any token ID (0–9999) to bring them into the city
- 👛 **Wallet Lookup** — paste any ETH address to load all Normies from that wallet
- 🧬 **Identity Panel** — full on-chain traits, level, action points, canvas status
- 📖 **AI Lore** — Claude AI generates a unique cyberpunk biography from each Normie's actual traits
- ⛓️ **Chain Data** — canvas history, version timeline, OpenSea + Etherscan links
- 📤 **Wanted Poster** — shareable card for any Normie, one-click post to X
- 🌐 **No wallet required** — anyone can explore, holders and non-holders alike

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | Vanilla HTML5 + Canvas API |
| Animation | RequestAnimationFrame game loop |
| Data | [Normies API](https://api.normies.art) |
| AI Lore | Anthropic Claude (via Netlify Functions) |
| Hosting | Netlify |
| Domain | normieverse.xyz |

---

## Normies API Endpoints Used

- `GET /normie/{id}/image.png` — character images
- `GET /normie/{id}/metadata` — traits, level, action points
- `GET /normie/{id}/canvas/info` — canvas customization data
- `GET /history/normie/{id}/versions` — version history
- `GET /holders/{address}` — wallet lookup

---

## Running Locally

```bash
# Clone the repo
git clone https://github.com/solutionkanu12/normieverse
cd normieverse

# Install Netlify CLI
npm install -g netlify-cli

# Add your Anthropic API key to .env
echo "ANTHROPIC_API_KEY=your_key_here" > .env

# Run locally
netlify dev
```

Then open `http://localhost:8888`

---

## Deploying to Netlify

1. Push this repo to GitHub
2. Connect repo to Netlify
3. Add environment variable: `ANTHROPIC_API_KEY = your_key`
4. Deploy — Netlify handles the rest

---

## Project Structure

```
normieverse/
├── index.html              # Full frontend — city, panels, search
├── netlify.toml            # Netlify config
├── netlify/
│   └── functions/
│       └── lore.js         # Serverless function — Anthropic API proxy
├── privacy-policy.html     # Privacy policy
└── README.md
```

---

## Credits

- **Normies** — [normies.art](https://normies.art) — 10,000 on-chain generative faces on Ethereum
- **Anthropic Claude** — AI lore generation
- **Built by** — [@solutionkanu12](https://github.com/solutionkanu12) for the Normies Hackathon 2026

---

*NormieVerse — because 10,000 faces deserve a world to live in.*
