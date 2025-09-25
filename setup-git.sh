#!/bin/bash

# Fix for macOS git issue - try to reinstall command line tools
echo "🔧 Fixing git setup..."

# Try to fix xcrun issue
if command -v xcode-select >/dev/null 2>&1; then
    echo "📦 Installing Xcode command line tools..."
    xcode-select --install
    sleep 5
fi

# Wait a bit for installation
sleep 10

# Try git commands
echo "🔄 Testing git..."
if command -v git >/dev/null 2>&1; then
    echo "✅ Git is available"

    # Initialize repository if not already done
    if [ ! -d ".git" ]; then
        echo "📁 Initializing git repository..."
        git init
    fi

    # Add remote origin
    echo "🔗 Adding remote origin..."
    git remote add origin https://github.com/cmomatt/referralpro.git

    # Add all files
    echo "📝 Adding files..."
    git add .

    # Create initial commit
    echo "💾 Creating initial commit..."
    git commit -m "Initial commit: ReferralPro with Next.js, TypeScript, Neon DB"

    # Push to GitHub
    echo "🚀 Pushing to GitHub..."
    git branch -M main
    git push -u origin main

    echo "✅ Successfully pushed to GitHub!"
    echo "🌐 Your repository: https://github.com/cmomatt/referralpro"

else
    echo "❌ Git is not available. Please install Xcode command line tools:"
    echo "   xcode-select --install"
    echo ""
    echo "Or install Git manually from: https://git-scm.com/download/mac"
fi
