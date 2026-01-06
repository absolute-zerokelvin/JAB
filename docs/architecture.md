# JAB Interactive Manual - Architecture

This document contains technical details about the JAB Interactive Manual project structure and architecture.

## Technical Stack

- **Pure JavaScript** — No heavy frameworks, fast loading times
- **HTML5/CSS3** — Modern web standards for responsive design
- **JSON Data Storage** — Structured content for easy maintenance
- **Node.js Build System** — For development and production builds

## Project Structure

```
JAB/
├── data/                    # JSON content files
│   ├── navigation.json      # Site navigation structure
│   ├── A1.json - M3.json    # Section content files
│   ├── timeline_junior.json # Junior timeline data
│   └── timeline_senior.json # Senior timeline data
├── js/                      # Core JavaScript files
│   ├── main.js              # Main site functionality
│   ├── storyView.js         # Story page rendering
│   ├── tabView.js           # Tab-based content views
│   └── cache-bust.js        # Cache management
├── css/                     # Stylesheets
│   ├── main.css             # Main styles
│   ├── story.css            # Story page styles
│   ├── tabView.css          # Tab component styles
│   ├── flashcard.css        # Flashcard feature styles
│   └── word-clouds.css      # Word cloud visualizations
├── templates/               # HTML templates
├── images/                  # Static images
├── apps/                    # Additional applications
├── tests/                   # End-to-end tests
├── dist/                    # Production build output
├── startup.sh               # Developer setup script
└── build.js                 # Build system
```

## Content Organization

The JAB Interactive Manual uses two approaches for content:

### 1. Data-Driven Pages (Sections A-M)

Content is stored as structured JSON files in `/data/`:
- Each section has a dedicated JSON file (e.g., `E1.json`, `F1.json`)
- `navigation.json` defines the site structure and links all sections
- Content is dynamically rendered through `story.html` or `tabTemplate.html`

**Example JSON structure:**
```json
{
  "id": "E1",
  "title": "The Life of Bhagawän Mahävir",
  "name": "E.1",
  "url": "./story.html?section=E1",
  "dataFile": "E1.json"
}
```

### 2. Static HTML Pages

Some content uses standalone HTML pages:
- Timeline views
- Special formatting needs
- Unique layouts

## Navigation System

The `navigation.json` file defines:
- **Sections A-M** — Main content areas
- **Subsections** — Individual topics within each section
- **Additional Pages** — Timelines and special content

Each page references its data file and URL pattern.

## Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `./startup.sh` | Full automated setup and start |
| `npm run dev` | Watch and rebuild on changes (no server) |
| `npm run dev:preview` | Watch, rebuild, and serve with hot-reload |
| `npm run build` | Production build with minification |
| `npm run preview` | Build and preview production |
| `npm test` | Run end-to-end tests |
| `npm run clean` | Remove dist directory |

### Development Workflow

1. Run `./startup.sh` or `npm run dev:preview`
2. Edit files in `data/`, `js/`, `css/`, or HTML files
3. Changes auto-rebuild and refresh
4. Test your changes locally
5. Submit a pull request

### Hot Reload

The `dev:preview` script watches for changes to:
- `.js` files — JavaScript logic
- `.html` files — Templates and pages
- `.css` files — Styling
- `.json` files — Content data

## Testing

End-to-end tests use [Playwright](https://playwright.dev/).

### Running Tests

```bash
# Run all tests
npm test

# View test report
npm run test:report

# Run tests with UI mode
npm run test:ui
```

### Test Coverage

Tests verify:
- Basic page loading
- Desktop and mobile navigation
- Menu expand/collapse features
- Quiz and flashcard interactivity

### CI/CD

Tests run automatically on:
- Push to `main`/`master` branch
- Pull requests

## Deployment

The site deploys to GitHub Pages.

```bash
# Manual deployment
npm run deploy
```

### GitHub Actions Workflows

1. **Deploy** (`.github/workflows/deploy.yml`) — Builds and deploys on main branch push
2. **Test** (`.github/workflows/test.yml`) — Runs tests on PRs and feature branches

## Troubleshooting

### Port Already in Use

```bash
# Find and kill the process
lsof -i :8080
kill -9 <PID>

# Or use a different port
npx http-server dist -p 3001 -c-1 -o
```

### Permission Denied for startup.sh

```bash
chmod +x startup.sh
./startup.sh
```

### Node Version Issues

```bash
# Using nvm
nvm install 18
nvm use 18

# Verify
node --version  # Should show v18.x.x+
```

### npm install Failures

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## Build System

See [BUILD.md](../BUILD.md) for detailed build system documentation including:
- Cache busting strategies
- File hashing
- Minification settings
- Build manifests
