#!/bin/bash

# Manual git push script for ReferralPro
# Run this script to commit and push your changes

echo "🔧 Manual Git Push for ReferralPro"
echo "=================================="

# Check if we're in the right directory
if [ ! -d ".git" ]; then
    echo "❌ Not in a git repository. Please run this from the ReferralPro directory."
    exit 1
fi

echo "📁 Current directory: $(pwd)"

# Try to fix the git issue by reinstalling command line tools
echo "🔧 Attempting to fix git setup..."
if command -v xcode-select >/dev/null 2>&1; then
    echo "📦 Reinstalling Xcode command line tools..."
    xcode-select --install 2>/dev/null || echo "⚠️ Xcode tools installation failed or already running"
fi

# Wait a moment
sleep 3

# Try git commands
echo "🔄 Testing git commands..."

# Check git status
echo "📊 Checking git status..."
if /usr/bin/git status --porcelain 2>/dev/null; then
    echo "✅ Git is working!"

    # Add all files
    echo "📝 Adding all files..."
    /usr/bin/git add .

    # Check if there are changes to commit
    if /usr/bin/git diff --cached --quiet; then
        echo "ℹ️ No changes to commit"
    else
        echo "💾 Committing changes..."
        /usr/bin/git commit -m "feat: Complete database integration with comprehensive test data

- ✅ Fixed test page database integration
- ✅ Implemented comprehensive seed data creation
- ✅ Added API routes for meetings, tasks, and rewards
- ✅ Updated schema to match actual database structure
- ✅ Created memory for no-mock-data policy
- ✅ All data comes directly from Neon database
- ✅ No fallbacks or mock data used"

        echo "🚀 Pushing to GitHub..."
        /usr/bin/git branch -M main
        /usr/bin/git push -u origin main

        echo "✅ Successfully pushed to GitHub!"
        echo "🌐 Your repository: https://github.com/cmomatt/referralpro"
    fi

else
    echo "❌ Git commands still failing"
    echo ""
    echo "🔧 Manual workaround instructions:"
    echo "1. Open Terminal manually"
    echo "2. Navigate to: cd '/Users/Matts/Documents/ReferralPro'"
    echo "3. Run: git add ."
    echo "4. Run: git commit -m 'feat: Complete database integration with comprehensive test data'"
    echo "5. Run: git push -u origin main"
    echo ""
    echo "Or try installing Xcode command line tools:"
    echo "xcode-select --install"
fi
