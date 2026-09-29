# Domain migration backup — 2026-09-29

Domain: samuelnagler.com
Current registrar/management: Shopify-managed domain
Current GitHub Pages primary: www.samuelnagler.com
Repository: samuelnagler/test-1
Backup branch: backup-before-domain-transfer-2026-09-29

## Website DNS state before registrar transfer
A @ -> 185.199.108.153
CNAME www -> samuelnagler.github.io
AAAA @ -> removed

## Email DNS — preserve exactly
MX @ priority 1 -> mx.samuelnagler.com.cust.b.hostedemail.com
TXT @ -> v=spf1 include:_spf.hostedemail.com ~all

## Previously observed CAA records for www
CAA www -> 0 issue letsencrypt.org
CAA www -> 0 issue globalsign.com
CAA www -> 0 issue ssl.com
CAA www -> 0 issue digicert.com
CAA www -> 0 issue pki.goog

## Target GitHub Pages apex configuration after leaving Shopify DNS
A @ -> 185.199.108.153
A @ -> 185.199.109.153
A @ -> 185.199.110.153
A @ -> 185.199.111.153
CNAME www -> samuelnagler.github.io

Optional IPv6 after stable IPv4:
AAAA @ -> 2606:50c0:8000::153
AAAA @ -> 2606:50c0:8001::153
AAAA @ -> 2606:50c0:8002::153
AAAA @ -> 2606:50c0:8003::153

Do not cancel Shopify until:
1. Registrar transfer is complete.
2. DNS is re-created at the new provider.
3. www.samuelnagler.com and samuelnagler.com both resolve correctly.
4. GitHub Pages DNS check is successful.
5. HTTPS certificate is issued and Enforce HTTPS is enabled.
6. Domain email has been tested.
