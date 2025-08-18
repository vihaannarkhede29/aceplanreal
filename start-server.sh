#!/bin/bash

# AcePlan Tennis Equipment Finder - Startup Script
echo "🎾 Starting AcePlan Tennis Equipment Finder..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the tennis-racket-finder directory."
    echo "Current directory: $(pwd)"
    echo "Please navigate to the tennis-racket-finder directory and try again."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the development server
echo "🚀 Starting development server..."
echo "📍 Local: http://localhost:3000"
echo "🌐 Network: http://192.168.68.100:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
