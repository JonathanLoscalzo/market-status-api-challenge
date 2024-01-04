#!/bin/bash
# This script sets up the environment for a Nest.js application and starts it using pm2.

# Change directory to the home directory of the user 'ubuntu'
cd /home/ubuntu

# Download and install nvm (Node Version Manager) using the provided script
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Load nvm into the current shell session
. ~/.nvm/nvm.sh

# Install the latest LTS (Long Term Support) version of Node.js
nvm install --lts

# Print the Node.js version to the console
node -e "console.log('Running Node.js ' + process.version)"

# Create an alias for the default Node.js version using LTS
nvm alias default lts/*

# Install pm2 globally using npm
npm install -g pm2

# Change directory to the application's backend folder
cd /home/ubuntu/backend

# Install project dependencies
npm i

# Set the NODE_ENV environment variable to 'production' and run migrations
NODE_ENV=production npm run typeorm:run-migrations

# Start the application using pm2 with the production environment
pm2 start ecosystem.config.js --env production