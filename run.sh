#!/bin/bash

# Navigate to the backend directory and install dependencies
echo "Setting up the backend..."
cd backend
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
fi

# Check if TypeScript is compiled or run via ts-node
if [ "$1" == "prod" ]; then
    echo "Building backend for production..."
    npm run build
    echo "Starting the backend in production mode..."
    node dist/app.js &
else
    echo "Starting the backend in development mode using ts-node..."
    npm run dev &
fi

Navigate to the frontend directory and install dependencies
echo "Setting up the frontend..."
cd ../frontend
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

# Start the frontend
echo "Starting the frontend server..."
ng serve &

Wait for background processes to finish
wait
