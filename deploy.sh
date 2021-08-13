#!/usr/bin/env bash
# fail if any commands fails
set -e
# debug log
# set -x

echo "Installing Node_modules..."
yarn install

echo "Compiling typescript files..."
yarn run dist

echo "Installing heroku CLI..."
brew tap heroku/brew && brew install heroku

echo "Adding heroku CLI remote url..."
heroku git:remote -a eit-pos-api

echo "Adding heroku git config..."
git config remote.heroku.push +HEAD:refs/heads/master
git config user.name "Bitrise Deployment"
git config user.name "br.dep@brise.com"

echo "making build folder available for git..."
mv dist build

echo "adding build folder to git..."
git add .
git commit -m "release for version $VERSION_NO"

echo "Create auth file to push heroku..."
echo "machine git.heroku.com login rizan.emeraldit@gmail.com password $HEROKU_API_KEY" > ~/.netrc

echo "pushing changes to heroku..."
git push heroku