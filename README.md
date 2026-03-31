# Yatra Go

React + Vite project configured for GitHub Pages deployment at:

`https://yatrago.github.io/Yatra-Go/`

## Local development

```bash
npm install
npm run dev
```

## Firebase setup

1. Copy `.env.example` to `.env`
2. Add your Firebase web app credentials as `VITE_FIREBASE_*` values
3. Set `VITE_ADMIN_EMAIL` to the single admin email
4. Restart the Vite dev server

The app is already wired for Firebase Auth, Firestore, and Storage through `src/firebase/config.js`.

## Production build

```bash
npm run build
```

## Deploy to GitHub Pages (manual)

```bash
npm run deploy
```

This publishes the `dist/` folder to the `gh-pages` branch.

## Deploy via GitHub Actions (recommended)

The workflow at `.github/workflows/deploy.yml` deploys automatically on push to `main` or `master`.

In GitHub repo settings:
1. Open `Settings -> Pages`
2. Set `Source` to `GitHub Actions`

## Notes about blank/black screen issues

- App uses `HashRouter` for GitHub Pages compatibility.
- `vite.config.js` uses `base: '/yatrago/'` for repo subpath assets.
- `public/404.html` redirects unknown paths to hash routes.
- Public asset links use `import.meta.env.BASE_URL` where needed.
