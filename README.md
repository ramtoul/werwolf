
# Werwölfe von Düsterwald – WebApp

Dieses Projekt ist bereit für Deployment auf **Vercel (Frontend)** und **Railway (Backend)**.

## Setup

### 🖥️ Lokale Ausführung

```bash
cd server
npm install
node index.js

# Neues Terminal
cd ../client
npm install
npm start
```

### 🌍 Deployment

- Vercel: Wähle `client/` als Root-Verzeichnis
- Railway: Wähle `server/` als Root-Verzeichnis

In `client/src/App.js`:
```js
const socket = io("https://DEIN-BACKEND-NAME.up.railway.app");
```
