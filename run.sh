#!/bin/bash

echo "Setting up the backend..."
cd backend
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
fi

echo "Starting the backend in development mode using ts-node..."
npm run dev &

echo "Setting up the frontend..."
cd ../frontend
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

echo "Starting the frontend server..."
ng serve &

wait
