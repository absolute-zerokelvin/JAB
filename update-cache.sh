#!/bin/bash

# JAB Manual Cache Busting Update Script
# This script updates the cache busting version to ensure new content is not cached

# Get current date and time for build timestamp
BUILD_TIME=$(date +"%Y%m%d%H%M")

# Current version (you can manually increment this)
VERSION="1.0.3"

echo "Updating cache busting configuration..."
echo "Build Time: $BUILD_TIME"
echo "Version: $VERSION"

# Update the cache-bust.js file with new timestamp and version
sed -i '' "s/this\.buildTime = '[0-9]*'/this.buildTime = '$BUILD_TIME'/g" js/cache-bust.js
sed -i '' "s/this\.version = '[0-9.]*'/this.version = '$VERSION'/g" js/cache-bust.js

echo "Cache busting updated successfully!"
echo "Files will now be served with version $VERSION and build time $BUILD_TIME"

# Optional: If you want to auto-increment version number
# CURRENT_VERSION=$(grep -o "this\.version = '[0-9.]*'" js/cache-bust.js | grep -o "[0-9.]*")
# NEW_VERSION=$(echo $CURRENT_VERSION | awk -F. '{$NF = $NF + 1;} 1' | sed 's/ /./g')
# sed -i '' "s/this\.version = '[0-9.]*'/this.version = '$NEW_VERSION'/g" js/cache-bust.js
