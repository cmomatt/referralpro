#!/bin/bash

# Kill any existing processes on ports 3000-3002
echo "🔄 Cleaning up existing processes..."
lsof -ti:3000,3001,3002 | xargs kill -9 2>/dev/null || echo "No processes found to kill"

# Wait a moment for ports to be released
sleep 1

# Start the development server on port 3001
echo "🚀 Starting ReferralPro on http://localhost:3001"
PORT=3001 npm run dev
