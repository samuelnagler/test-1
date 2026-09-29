#!/usr/bin/env bash
set -euo pipefail

rm -rf _site
tmpdir="$(mktemp -d)"
trap 'rm -rf "$tmpdir"' EXIT

# Copy the repository to a temporary directory outside the repository itself.
cp -R . "$tmpdir/site"

# Remove files that must not be part of the production artifact.
rm -rf "$tmpdir/site/.git" \
       "$tmpdir/site/.github" \
       "$tmpdir/site/assets" \
       "$tmpdir/site/_site" \
       "$tmpdir/site/scripts"

# Restore only the product data needed by the live site.
mkdir -p "$tmpdir/site/assets"
cp assets/products.json "$tmpdir/site/assets/products.json"

mv "$tmpdir/site" _site

echo "Built Cloudflare Pages artifact in _site/"
