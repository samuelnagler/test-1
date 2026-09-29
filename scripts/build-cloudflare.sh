#!/usr/bin/env bash
set -euo pipefail

rm -rf _site
mkdir -p _site

# Copy the deployable site using only standard shell tools available in Cloudflare's build image.
cp -R . _site-tmp
rm -rf _site-tmp/.git _site-tmp/.github _site-tmp/assets _site-tmp/_site _site-tmp/_site-tmp _site-tmp/scripts
mv _site-tmp/* _site/ 2>/dev/null || true
mv _site-tmp/.[!.]* _site/ 2>/dev/null || true
mv _site-tmp/..?* _site/ 2>/dev/null || true
rmdir _site-tmp 2>/dev/null || true

mkdir -p _site/assets
cp assets/products.json _site/assets/products.json

echo "Built Cloudflare Pages artifact in _site/"
