# JAB Manual Interactive - Build System

This project now includes an automated build system with cache busting and GitHub Pages deployment.

## 🚀 Quick Start

### Development
```bash
# Install dependencies
npm install

# Development build (no minification)
npm run dev

# Preview the built site locally
npm run preview
```

### Production Build
```bash
# Production build (minified, cache-busted)
npm run build

# Clean build directory
npm run clean
```

## 📦 Build Process

The build system automatically:

1. **Cache Busting**: Adds unique hashes to CSS/JS files
2. **Asset Processing**: Copies images, data, and templates
3. **Minification**: Compresses CSS and JS in production mode
4. **HTML Processing**: Updates asset references with hashed names
5. **Manifest Generation**: Creates a build manifest with file mappings

### File Structure
```
dist/                    # Production build output
├── css/
│   ├── main.[hash].css
│   └── story.[hash].css
├── js/
│   ├── cache-bust.[hash].js
│   ├── main.[hash].js
│   └── storyView.[hash].js
├── data/               # Story data files
├── images/            # Static images
├── templates/         # HTML templates
├── index.html         # Updated with hashed references
├── story.html         # Updated with hashed references
└── manifest.json      # Build information

```

## 🔄 Automated Deployment

### GitHub Actions

The project includes two workflows:

1. **Deploy** (`.github/workflows/deploy.yml`)
   - Triggers on push to `main`/`master` branch
   - Builds and deploys to GitHub Pages
   - Automatic cache busting ensures fresh content

2. **Test** (`.github/workflows/test.yml`)
   - Triggers on feature branches and PRs
   - Runs development build to catch errors

### Manual Deployment

```bash
# Deploy to GitHub Pages (requires gh-pages package)
npm run deploy
```

## 🛠️ Cache Busting

The build system uses multiple cache busting strategies:

1. **File Hashing**: Each file gets a unique hash based on content
2. **Build Timestamps**: Automatic timestamp generation
3. **Version Numbers**: Semantic versioning from package.json

### Cache Bust Configuration

The `cache-bust.js` file is automatically updated during build with:
- Current version number
- Build timestamp
- File hashes

## 📁 Development vs Production

### Development Mode (`npm run dev`)
- No file minification
- Original file names (no hashing)
- Faster build times
- Easier debugging

### Production Mode (`npm run build`)
- Full minification
- File hashing for cache busting
- Optimized for deployment
- Build manifest generation

## 🔧 Customization

### Updating Version
Update the version in `package.json`:
```json
{
  "version": "1.1.0"
}
```

### Build Configuration
Modify `build.js` to:
- Add new asset types
- Change minification settings
- Customize cache busting strategy
- Add additional build steps

## 📊 Build Output

After building, check the manifest:
```bash
cat dist/manifest.json
```

Example output:
```json
{
  "version": "1.0.0",
  "buildTime": "20250611142530",
  "timestamp": "2025-06-11T14:25:30.123Z",
  "files": {
    "css": {
      "main.css": "main.a1b2c3d4.css",
      "story.css": "story.e5f6g7h8.css"
    },
    "js": {
      "cache-bust.js": "cache-bust.i9j0k1l2.js",
      "main.js": "main.m3n4o5p6.js",
      "storyView.js": "storyView.q7r8s9t0.js"
    }
  }
}
```

## 🚨 Troubleshooting

### Build Fails
1. Check Node.js version (requires 18+)
2. Clear node_modules: `rm -rf node_modules && npm install`
3. Clean build: `npm run clean && npm run build`

### Cache Issues
1. Hard refresh browser (Ctrl+F5 or Cmd+Shift+R)
2. Check build manifest for correct file hashes
3. Verify GitHub Pages is serving from `/dist` folder

### GitHub Pages Setup
1. Go to repository Settings → Pages
2. Set Source to "GitHub Actions"
3. Ensure workflows have proper permissions
