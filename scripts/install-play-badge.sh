#!/usr/bin/env bash
# Walks you through obtaining the official Google Play badge.
#
# This cannot be automated: Google requires a human to accept the Google Play
# brand guidelines before downloading, and the badge in this repo is currently a
# hand-drawn imitation that breaches those guidelines.
set -euo pipefail

TARGET="public/lifepoem/google-play-badge.svg"
BADGE_URL="https://play.google.com/intl/en_us/badges/"
GUIDELINES_URL="https://play.google.com/intl/en_us/badges/static/images/badges/GooglePlayBadgeGuidelines.pdf"

cd "$(dirname "$0")/.."

say() { printf '\n\033[1m%s\033[0m\n' "$1"; }
pause() { read -r -p "  Press Enter when done… " _; }

say "Install the official Google Play badge"
cat <<TXT
  Current file: $TARGET
  $(if [ -f "$TARGET" ]; then wc -c <"$TARGET" | tr -d ' ' | sed 's/$/ bytes/'; else echo "missing"; fi)

  The website renders this badge at 135x40 (its native proportions) in two
  places: the home hero and the dark download panel. Everything else is already
  built; dropping the correct file in is the last step.
TXT

say "Step 1 — open the badge generator"
echo "  $BADGE_URL"
echo "  Brand guidelines: $GUIDELINES_URL"
pause

say "Step 2 — configure and download"
cat <<'TXT'
  - Language: English
  - Format: SVG (not PNG — the site scales the badge)
  - Do not recolour, outline, rotate or add effects; the guidelines forbid it
  - Accept the brand guidelines when prompted
TXT
pause

say "Step 3 — put it in place"
echo "  Save or move the downloaded file to:"
echo "    $(pwd)/$TARGET"
pause

say "Verifying"
if [ ! -f "$TARGET" ]; then
  echo "  ✗ $TARGET is missing. Re-run this script once the file is saved."
  exit 1
fi

bytes=$(wc -c <"$TARGET" | tr -d ' ')
echo "  size: ${bytes} bytes"

if ! head -c 400 "$TARGET" | grep -qi 'svg'; then
  echo "  ✗ That does not look like an SVG. Re-download choosing the SVG format."
  exit 1
fi

if grep -qi '<text' "$TARGET"; then
  echo "  ✗ The file contains <text> elements, so it still renders with a system"
  echo "    font and will look wrong on other platforms. The official badge has"
  echo "    the wordmark as vector paths. This is the imitation, not the real one."
  exit 1
fi

if [ "$bytes" -lt 3000 ]; then
  echo "  ✗ Only ${bytes} bytes — too small to be the official artwork."
  exit 1
fi

if ! grep -qiE 'viewBox' "$TARGET"; then
  echo "  ! No viewBox found. The badge will not scale cleanly; check the file."
fi

echo "  ✓ Looks like the official badge."
echo
echo "  Now confirm it renders correctly:"
echo "    npm run dev    # then check the hero and the download panel"
echo "    npx playwright test store-links"
