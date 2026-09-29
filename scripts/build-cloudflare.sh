#!/usr/bin/env bash
set -euo pipefail
rm -rf _site
mkdir -p _site/assets
rsync -a --exclude='.git*' --exclude='.github' --exclude='assets/' --exclude='_site' --exclude='scripts/' ./ _site/
cp assets/products.json _site/assets/products.json
echo "Built Cloudflare Pages artifact in _site/"
