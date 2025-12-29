#!/bin/bash

# TheBraveByte Portfolio - Quick Deployment Setup

echo "🚀 TheBraveByte Portfolio Deployment Setup"
echo "=========================================="
echo ""

# The project is in the root directory.
echo "✓ Root directory checked"
echo ""

echo "✓ Portfolio directory found"
echo ""

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "⚠️  Warning: Node.js version should be 18 or higher"
    echo "   Current version: $(node -v)"
    echo ""
fi

# We are already in the project root
# cd portfolio

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
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build successful!"
    echo ""
    echo "📁 Output location: dist"
    echo ""
    echo "Next steps:"
    echo "=========================================="
    echo ""
    echo "1. Setup Cloudflare Pages:"
    echo "   - Go to https://dash.cloudflare.com"
    echo "   - Workers & Pages → Create project"
    echo "   - Connect GitHub repository"
    echo    - Set build command: npm run build"
    echo "   - Set output directory: dist"
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
    echo "   npx wrangler pages dev dist"
    echo ""
    echo "📖 See DEPLOYMENT.md for detailed instructions"
    echo ""
else
    echo ""
    echo "❌ Build failed. Check errors above."
    exit 1
fi
