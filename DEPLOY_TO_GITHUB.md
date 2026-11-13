# Publish MEIY with GitHub Pages

This directory contains a complete static website. **No build step, npm account, or server is required.** All images and transformation videos are local assets. The home page is `index.html`. Each product page lives in `products/`.

## Option A — GitHub Desktop

1. Install GitHub Desktop and sign in to your GitHub account.
2. Choose **File → Add local repository…** and select this extracted folder. If it is not a Git repository, choose **Create a repository** using this folder.
3. Commit all website files and choose **Publish repository**. Use a suitable repository name such as `meiy-2032`. Choose **Public** if you want its source publicly visible.
4. On GitHub, go to the repository’s **Settings → Pages**. Under **Build and deployment**, select **GitHub Actions**.
5. Open the **Actions** tab and watch the “Publish MEIY to GitHub Pages” workflow. If it has not yet run, select it and choose **Run workflow**. The live Pages URL appears in **Settings → Pages** when deployment completes.

The included `.github/workflows/pages.yml` deploys again whenever you push to `main`.

## Option B — Git command line

Create an empty GitHub repository named `meiy-2032`, then run these commands **inside the extracted website folder**:

```bash
git init
git branch -M main
git add .
git commit -m "Publish MEIY design-fiction storefront and concept reviews"
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/meiy-2032.git
git push -u origin main
```

Replace `YOUR_GITHUB_USERNAME` with your account name. Authenticate using your existing GitHub login/credential manager. Then, under **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source. Do not post a GitHub access token into chat.

The usual project-site address will resemble `https://YOUR_GITHUB_USERNAME.github.io/meiy-2032/` when the deployment succeeds.

## About ratings and reviews

- The first three reviews per product are **imagined perspectives from 2032**. They are narrative material, not reviews by real customers.
- The displayed scenario average is calculated from these three sample perspectives.
- The visitor submission form works in the browser: it stores one private reflection per product using `localStorage`. It is **not published to other visitors** and does not alter the scenario score.
- Because GitHub Pages is static hosting, genuine public reviews shared across visitors would require a database and a moderation-backed service (such as Supabase, Firebase, or a comments provider).

## Security and maintenance

Do not put API keys, passwords, private analytics, or customer data into this repository. The store’s checkout is a **concept interaction**, not a real payment system. Media, prices and product designs are speculative. The workflow deploys only files contained in the repository.
