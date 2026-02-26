# Allesis.nl — Next.js Rebuild

Moderne herbouw van allesis.nl in Next.js 16, klaar voor Vercel + GitHub deployment.

## 🚀 Lokaal starten

```bash
npm install
npm run dev
```

Ga naar [http://localhost:3000](http://localhost:3000)

## 📁 Structuur

```
app/
  layout.tsx          # Root layout met nav + footer
  page.tsx            # Homepage
  globals.css         # Global styles + animaties
  hosting/page.tsx    # Hosting & domeinen pagina
  vertaling/page.tsx  # Thais-NL vertaling pagina
  dienstverlening/page.tsx
  contact/page.tsx
components/
  Navigation.tsx      # Sticky nav met mobile menu
  Footer.tsx
```

## ☁️ Deployen op Vercel via GitHub

1. Push dit project naar een GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/JOUWUSERNAME/allesis-nextjs.git
   git push -u origin main
   ```

2. Ga naar [vercel.com](https://vercel.com) → **New Project**

3. Koppel je GitHub account en selecteer de repository

4. Vercel detecteert automatisch Next.js — klik **Deploy**

5. Je site draait live op `https://allesis-nextjs.vercel.app` (of eigen naam)

## 🌐 Eigen domein koppelen in Vercel

1. Ga naar je project in Vercel → **Settings → Domains**
2. Voeg `allesis.nl` toe
3. Voeg de DNS-records toe bij je domeinregistrar:
   - **A-record**: `76.76.21.21`
   - Of **CNAME**: `cname.vercel-dns.com`

## ✏️ Aanpassen

- Prijzen en pakketten: `app/hosting/page.tsx`
- Hero tekst: `app/page.tsx`
- Kleuren: zoek naar `#c8a96e` (goud) of `#0a0a0a` (achtergrond) in de bestanden
- Contactgegevens: `components/Footer.tsx` en `app/contact/page.tsx`
