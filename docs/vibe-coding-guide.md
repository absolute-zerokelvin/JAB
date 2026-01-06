# Vibe Coding Guide 🚀

Welcome, young developer! This guide will help you contribute to JAB Interactive using **vibe coding** — coding with AI assistance.

## What is Vibe Coding? 🤖

Vibe coding means working together with an AI coding assistant to write and fix code. You describe what you want, and the AI helps you make it happen!

**Popular AI Coding Tools:**
- Antigravity (Google)
- GitHub Copilot
- Cursor
- Claude (Anthropic)

## Getting Started

### Step 1: Set Up Your Environment

1. Make sure you have a GitHub account
2. Clone the repository:
   ```bash
   git clone https://github.com/absolute-zerokelvin/JAB.git
   cd JAB
   ```
3. Run the startup script:
   ```bash
   ./startup.sh
   ```

### Step 2: Open in Your AI Coding Tool

Open the `JAB` folder in your AI coding tool (like Cursor or use Antigravity in VS Code).

## The Screenshot → Fix → PR Workflow 📸

This is the easiest way to contribute:

### 1. Find Something to Fix
Browse the website at http://localhost:8080 and look for:
- Typos or spelling mistakes
- Broken layouts
- Missing images
- Confusing navigation

### 2. Take a Screenshot
Capture what looks wrong or what you want to improve.

### 3. Ask Your AI Agent
Share the screenshot with your AI and ask something like:

> "I found this issue on the JAB website. Can you help me fix it?"

or

> "This button doesn't look right. Can you help me make it better?"

### 4. Review and Test
- Look at what the AI suggests
- Run `./startup.sh` to test your changes
- Check if it looks good in the browser

### 5. Create a Pull Request
```bash
git checkout -b fix/my-cool-fix
git add .
git commit -m "Fixed the broken button on the quiz page"
git push origin fix/my-cool-fix
```
Then go to GitHub and create a Pull Request!

## Learning While Coding 📚

The best part of vibe coding is learning! Here are some things to try:

### Ask Your AI to Explain Code

> "Can you explain what this JavaScript function does?"

> "What does this CSS class do?"

> "How does navigation.json work?"

### Ask About Concepts

> "What is JSON and why do we use it?"

> "How do HTML, CSS, and JavaScript work together?"

## Common Tasks

### Fixing Text Content
Most text is in JSON files in the `/data/` folder:
- Ask: "I want to fix a typo in section E1. Can you help?"

### Styling Changes
CSS files are in the `/css/` folder:
- Ask: "Can you help me change the color of the quiz buttons?"

### Adding New Content
- Ask: "How do I add a new flashcard to section B2?"

## Tips for Working with AI 💡

1. **Be Specific** — "The Submit button on the quiz page is too small" is better than "something is wrong"

2. **Share Screenshots** — A picture is worth 1000 words!

3. **Ask Follow-up Questions** — If you don't understand, ask again!

4. **Test Everything** — Always run `./startup.sh` and check your changes

5. **Learn from Mistakes** — If something breaks, ask the AI to help you understand why

## Getting Help

- **Ask your AI** — They're really good at explaining things!
- **Create a GitHub Issue** — [Report problems here](https://github.com/absolute-zerokelvin/JAB/issues)
- **Read the Docs** — Check out [architecture.md](architecture.md) if you're curious about how things work

---

**Remember:** Everyone was a beginner once. Don't be afraid to try things and make mistakes — that's how we learn! 🌟
