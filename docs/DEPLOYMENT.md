# Deploying spezartech.com

The site is a static Next.js export published to **GitHub Pages**, with DNS on **Cloudflare**.

```
push to main ──▶ GitHub Actions (.github/workflows/deploy.yml)
                   npm ci → npm run build → checks → upload ./out → deploy to Pages
                                                                         │
visitor ──https──▶ Cloudflare (DNS + proxy, SSL "Full (strict)") ──https──▶ GitHub Pages
```

- **Pull requests into `main`** are built but not deployed, so a broken build is caught before merge.
- **Every push to `main`** (or a manual "Run workflow") builds and publishes the live site in ~2 minutes.

---

## 1. One-time GitHub setup

Repo: `riyasdeen02/spezar_new_site_2026`

1. **Plan check.** GitHub Pages on a **private** repo needs GitHub Pro / Team. On a free account, either
   upgrade or make the repo public (Settings → General → Danger Zone → Change visibility).
2. **Free the domain from the old site.** In the *old* site's repo: Settings → Pages → Custom domain →
   **Remove**. A domain can only be attached to one Pages site at a time.
3. **Enable Pages for this repo.** Settings → Pages → Build and deployment → Source: **GitHub Actions**.
4. **Run the first deploy.** Actions tab → "Deploy to GitHub Pages" → **Run workflow** (or push to `main`).
   Wait for the green tick.
5. **Set the custom domain.** Settings → Pages → Custom domain: `spezartech.com` → **Save**.
   (`public/CNAME` already contains `spezartech.com`, and the workflow fails if it goes missing.)
6. **(Recommended) Verify the domain** so no other GitHub account can claim it:
   your profile → Settings → Pages → Add a domain → add the TXT record GitHub shows in Cloudflare DNS.

## 2. Cloudflare DNS

Cloudflare dashboard → spezartech.com → **DNS → Records**. You want exactly these (delete any other
`A`/`AAAA`/`CNAME` records for `@` and `www` left over from older hosting):

| Type  | Name | Content                  | Proxy        |
|-------|------|--------------------------|--------------|
| A     | @    | 185.199.108.153          | see step 3   |
| A     | @    | 185.199.109.153          | see step 3   |
| A     | @    | 185.199.110.153          | see step 3   |
| A     | @    | 185.199.111.153          | see step 3   |
| AAAA  | @    | 2606:50c0:8000::153      | see step 3   |
| AAAA  | @    | 2606:50c0:8001::153      | see step 3   |
| AAAA  | @    | 2606:50c0:8002::153      | see step 3   |
| AAAA  | @    | 2606:50c0:8003::153      | see step 3   |
| CNAME | www  | riyasdeen02.github.io    | see step 3   |

These are GitHub's published Pages addresses. With `www` pointing at `riyasdeen02.github.io`, GitHub
redirects `www.spezartech.com` → `spezartech.com` automatically.

If the old site already used these records and lived under the same GitHub account, nothing changes here.

## 3. SSL certificate (do this once, in order)

GitHub issues a free Let's Encrypt certificate for spezartech.com, but it can only do that while it can
see the domain directly, i.e. while Cloudflare is **not** proxying.

1. In Cloudflare DNS, set every record above to **DNS only** (grey cloud).
2. In GitHub → Settings → Pages, wait until the DNS check shows **"DNS check successful"** and the
   certificate is issued (can take from a few minutes up to 24 hours; re-save the custom domain if it stalls).
3. Tick **Enforce HTTPS** in GitHub → Settings → Pages.
4. Switch the records back to **Proxied** (orange cloud).
5. Cloudflare → **SSL/TLS → Overview** → set the encryption mode to **Full (strict)**.
   - Never use **Flexible**: Cloudflare would talk to GitHub over plain HTTP while GitHub redirects to
     HTTPS, which causes an infinite redirect loop.
   - "Full (strict)" works because GitHub now holds a valid certificate for spezartech.com.

GitHub renews the certificate automatically. If renewal ever fails while proxied, repeat steps 1–4.

## 4. HTTPS-only redirect

HTTP is redirected to HTTPS at three layers:

1. **Cloudflare (edge, primary).** SSL/TLS → **Edge Certificates**:
   - **Always Use HTTPS** → On (301 redirect for every `http://` request).
   - **Automatic HTTPS Rewrites** → On (upgrades any stray `http://` asset links).
   - **Minimum TLS Version** → TLS 1.2.
   - **HSTS** → enable only once everything above has worked for a few days:
     max-age 6 months (15552000), include subdomains **only if** every subdomain serves HTTPS,
     preload **off** until you're sure (preload is hard to undo).
2. **GitHub Pages.** **Enforce HTTPS** ticked (section 3, step 3).
3. **In the page itself (fallback).** `app/layout.jsx` contains a tiny inline script that moves a plain
   `http://` visit to `https://` before the page renders. It is skipped on localhost.

## 5. After switching

- Cloudflare → **Caching → Configuration → Purge Everything**, so visitors stop getting the old site.
- Check:
  - `http://spezartech.com` → redirects to `https://spezartech.com/`
  - `https://www.spezartech.com` → redirects to `https://spezartech.com/`
  - `https://spezartech.com/contact/` loads
  - The padlock shows a valid certificate.

## Troubleshooting

| Symptom | Fix |
|---|---|
| "Too many redirects" | Cloudflare SSL mode is Flexible → set **Full (strict)**. |
| GitHub says domain "already taken" | Remove it from the old repo's Pages settings first (section 1, step 2). |
| "Enforce HTTPS" greyed out | Certificate not issued yet; records must be **DNS only** until it is (section 3). |
| 404 after deploy | Pages Source must be **GitHub Actions**; check the latest Actions run succeeded. |
| Old site still showing | Purge Cloudflare cache; hard-refresh the browser. |
| Workflow fails at "Check export" | `public/CNAME` is missing or doesn't contain `spezartech.com`. |
