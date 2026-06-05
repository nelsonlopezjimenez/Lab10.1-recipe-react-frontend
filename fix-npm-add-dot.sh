#!/bin/bash

echo "🔧 Fixing npm add . mistake..."
echo ""

# Check if self-dependency exists
if grep -q "file:\." package.json 2>/dev/null; then
    echo "❌ Found circular self-dependency in package.json"
    echo ""
    
    # Show what will be removed
    echo "Offending line(s):"
    grep "file:\." package.json
    echo ""
    
    # Get package name
    PKG_NAME=$(jq -r '.name' package.json 2>/dev/null)
    
    if [ -n "$PKG_NAME" ]; then
        echo "Removing: \"$PKG_NAME\": \"file:.\""
        npm remove "$PKG_NAME" 2>/dev/null
        
        if [ $? -eq 0 ]; then
            echo "✅ Removed self-dependency"
        else
            echo "⚠️  npm remove failed, editing manually..."
            
            # Create backup
            cp package.json package.json.backup
            
            # Remove file: references (jq approach)
            jq 'del(.dependencies[] | select(. == "file:."))' package.json > package.json.tmp
            mv package.json.tmp package.json
            
            echo "✅ Manually removed file:. references"
        fi
    fi
else
    echo "✅ No circular self-dependency found"
fi

echo ""
echo "🧹 Cleaning up..."

# Remove node_modules and lock file
rm -rf node_modules
rm -f package-lock.json

# Clear cache
npm cache clean --force > /dev/null 2>&1

echo "✅ Cleaned node_modules and cache"

echo ""
echo "📦 Reinstalling dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Fixed! App is now properly configured."
    echo ""
    echo "Next time, use: git add . (not npm add .)"
else
    echo ""
    echo "❌ Installation failed"
    exit 1
fi