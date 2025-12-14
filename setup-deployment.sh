#!/bin/bash

# TheBraveByte Portfolio - Quick Deployment Setup

echo "🚀 TheBraveByte Portfolio Deployment Setup"
echo "=========================================="
echo ""

# Check if we're in the right directory
if [ ! -d "portfolio" ]; then
    echo "❌ Error: portfolio directory not found"
    echo "Please run this script from the thebravebyte root directory"
    exit 1
fi

echo "✓ Portfolio directory found"
echo ""

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "⚠️  Warning: Node.js version should be 18 or higher"
    echo "   Current version: $(node -v)"
    echo ""
fi

# Navigate to portfolio
cd portfolio

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✓ Dependencies installed"
    echo ""
else
    echo "✓ Dependencies already installed"
    echo ""
fi

# Build for production
echo "🔨 Building portfolio for production..."
npm run generate

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build successful!"
    echo ""
    echo "📁 Output location: portfolio/.output/public"
    echo ""
    echo "Next steps:"
    echo "=========================================="
    echo ""
    echo "1. Setup Cloudflare Pages:"
    echo "   - Go to https://dash.cloudflare.com"
    echo "   - Workers & Pages → Create project"
    echo "   - Connect GitHub repository"
    echo "   - Set build command: npm run generate"
    echo "   - Set output directory: .output/public"
    echo "   - Set root directory: portfolio"
    echo ""
    echo "2. Add GitHub Secrets:"
    echo "   - CLOUDFLARE_API_TOKEN"
    echo "   - CLOUDFLARE_ACCOUNT_ID"
    echo ""
    echo "3. Push to GitHub:"
    echo "   git add ."
    echo "   git commit -m \"Deploy portfolio to Cloudflare Pages\""
    echo "   git push origin main"
    echo ""
    echo "4. Preview locally (optional):"
    echo "   npx serve portfolio/.output/public"
    echo ""
    echo "📖 See DEPLOYMENT.md for detailed instructions"
    echo ""
else
    echo ""
    echo "❌ Build failed. Check errors above."
    exit 1
fi
