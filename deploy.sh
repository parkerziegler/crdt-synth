#!/usr/bin/env sh

# Abort on errors.
set -e

# Build.
yarn build

# Navigate into the build output directory.
cd dist

# If we later deploy to a custom domain, echo that domain into CNAME.
# echo 'www.example.com' > CNAME

# Configure the commit to be authored by github-actions.
git config user.name 'github-actions[bot]'
git config user.email 'github-actions[bot]@users.noreply.github.com'

git init
git checkout -b main
git add -A
git commit -m 'deploy'

# Deploy to gh-pages.
git push -f git@github.com:parkerziegler/crdt-synth.git main:gh-pages

cd -