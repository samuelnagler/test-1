# Cloudflare production setup

Architecture:
- Source/backup: GitHub
- Hosting: Cloudflare Pages
- DNS/TLS: Cloudflare
- Build command: bash scripts/build-cloudflare.sh
- Build output directory: _site
- Production branch: main

The build excludes the heavy original archive under assets/ and deploys optimized assets-web/ plus assets/products.json.
Keep existing mail MX/TXT records unchanged when moving DNS.
