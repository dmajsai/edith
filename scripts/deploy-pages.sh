#!/bin/sh

set -eu

ROOT=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
WORKTREE=$(mktemp -d)
BRANCH=gh-pages-deploy-temp-$(date +%s)

if git -C "$ROOT" config --get remote.origin.url >/dev/null 2>&1; then
  REMOTE=origin
elif git -C "$ROOT" config --get remote.pages.url >/dev/null 2>&1; then
  REMOTE=pages
else
  echo "No git remote configured for deployment." >&2
  exit 1
fi

git -C "$ROOT" worktree prune >/dev/null 2>&1 || true

npm --prefix "$ROOT" run build

cleanup() {
  git -C "$ROOT" worktree remove --force "$WORKTREE" >/dev/null 2>&1 || true
  git -C "$ROOT" branch -D "$BRANCH" >/dev/null 2>&1 || true
  rm -rf "$WORKTREE"
}

trap cleanup EXIT INT TERM

git -C "$ROOT" ls-remote "$REMOTE" HEAD >/dev/null
git -C "$ROOT" worktree add --force -B "$BRANCH" "$WORKTREE" HEAD >/dev/null

find "$WORKTREE" -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
cp -R "$ROOT/out/." "$WORKTREE/"
touch "$WORKTREE/.nojekyll"
find "$WORKTREE" -name .DS_Store -delete

git -C "$WORKTREE" add --all
if git -C "$WORKTREE" diff --cached --quiet; then
  echo "No GitHub Pages changes to deploy."
  exit 0
fi

git -C "$WORKTREE" \
  -c user.name="GitHub Pages Deploy" \
  -c user.email="deploy@local" \
  commit -m "Deploy GitHub Pages" >/dev/null
git -C "$WORKTREE" push --force "$REMOTE" HEAD:gh-pages >/dev/null

echo "GitHub Pages deployment completed."
