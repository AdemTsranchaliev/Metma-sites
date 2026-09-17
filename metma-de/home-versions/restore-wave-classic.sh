#!/usr/bin/env bash
# Restore the wave/scribble homepage (version before editorial redesign).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$(cd "$(dirname "$0")/wave-classic" && pwd)"

mkdir -p "$ROOT/src/components/home"

cp "$SRC/page.tsx" "$ROOT/src/app/page.tsx"
cp "$SRC/globals.css" "$ROOT/src/app/globals.css"
cp "$SRC/Header.tsx" "$ROOT/src/components/Header.tsx"
cp "$SRC/Footer.tsx" "$ROOT/src/components/Footer.tsx"
cp "$SRC/components/"*.tsx "$ROOT/src/components/home/"

rm -f "$ROOT/src/components/home/HomeCountdownStrip.tsx"
rm -f "$ROOT/src/components/home/HomeStory.tsx"

echo "Restored wave-classic homepage into live src/."
