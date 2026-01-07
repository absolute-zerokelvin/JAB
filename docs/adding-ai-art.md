# How to Add AI Art to JAB Interactive 🎨

A step-by-step guide for young contributors on adding AI-generated images to story sections.

---

## What You'll Be Doing

You'll be adding AI-generated artwork for JAB stories! Each story section (like G1, G2, G3...) can have an **"AI Art"** tab that shows beautiful AI-generated images that illustrate the story.

**Example:** See section G1 on [jabinteractive.org](https://jabinteractive.org/story.html?section=G1) - click the "AI Art" tab to see the slideshow!

---

## Prerequisites ✅

| # | What You Need | Where to Get It |
|---|--------------|-----------------|
| 1 | GitHub Account | [github.com/signup](https://github.com/signup) |
| 2 | Basic Git Knowledge | [w3schools.com/git](https://w3schools.com/git) |
| 3 | AI Coding Tool | Antigravity, Cursor, etc. |
| 4 | AI Image Generator | Gemini Nano Banana, or ask your parent! |

---

## Step 1: Generate Your Images 🖼️

1. Go to [jabinteractive.org](https://jabinteractive.org/story.html?section=G2) and pick a section (e.g., G2)
2. Click the **"Graphics"** tab to see the story scenes
3. For each scene card, use an AI image generator to create artwork:
   - Copy the scene title and description
   - Give it to your AI image tool (like Gemini Nano Banana)
   - Add context like: *"This is a Jain story"*

> ⚠️ **Important:** Make sure Jain symbols, monks, and gods are shown correctly! AI sometimes gets confused with Hindu/Buddhist imagery. You may need to try a few times!

4. Save your images as `.png` files named: `scene1.png`, `scene2.png`, `scene3.png`, etc.

---

## Step 2: Clone the Repository 💻

Open Terminal and run these commands:

```bash
git clone https://github.com/absolute-zerokelvin/JAB.git
cd JAB
```

---

## Step 3: Open in Antigravity Code Editor 🤖

**Antigravity** is an AI-powered code editor - it has a built-in AI assistant that can help you write code!

1. Open **Antigravity** on your computer
2. Open the `JAB` folder you just cloned
3. You'll see a chat panel where you can talk to the AI

---

## Step 4: Upload Images and Ask the AI to Add Them ✨

In the **Antigravity chat panel**, upload all your AI-generated images and type this prompt:

> "Please add these pictures as AI Art for section G2. Look at how G1.json has `imageryData` section and copy that pattern. Put the images in `data/images/G2/` folder with names like scene1.png, scene2.png, etc."

### What the AI Will Do:
1. **Create the image folder:** `data/images/G2/`
2. **Copy your images** into that folder
3. **Update the JSON file** (`data/G2.json`) to add an `imageryData` section

---

## Step 5: Test Your Changes 🧪

Run the startup script:
```bash
./startup.sh
```

Then open your browser to `http://localhost:8080/story.html?section=G2` and click the **"AI Art"** tab to see your images!

---

## Step 6: Submit Your Work (Pull Request) 🎁

Choose one of these options:

### Option A: Ask Antigravity to Do It For You (Easiest!) 🤖

In the Antigravity chat panel, just type:

> "Please create a pull request for my AI Art changes for section G2"

The AI will handle all the git commands for you!

---

### Option B: Do It Yourself 💪

If you want to learn git, run these commands in Terminal:

```bash
git checkout -b feature/g2-ai-art
git add .
git commit -m "Added AI Art images for section G2"
git push origin feature/g2-ai-art
```

Then go to GitHub and click **"Create Pull Request"**!

---

## Reference: How It Works Behind the Scenes 📁

### Folder Structure
```
JAB/
├── data/
│   ├── G1.json          ← JSON file with story data
│   ├── G2.json          ← You'll edit this one!
│   └── images/
│       ├── G1/          ← G1 images folder
│       │   ├── scene1.png
│       │   ├── scene2.png
│       │   └── ...
│       └── G2/          ← You'll create this folder!
│           ├── scene1.png
│           ├── scene2.png
│           └── ...
```

### What Gets Added to the JSON File

The AI will add an `imageryData` section like this:

```json
"imageryData": [
    {
        "title": "Scene Title Here",
        "description": "Description of what's happening in the scene.",
        "imageSrc": "./data/images/G2/scene1.png"
    },
    {
        "title": "Another Scene",
        "description": "What this scene shows.",
        "imageSrc": "./data/images/G2/scene2.png"
    }
]
```

---

## Tips for Success 💡

1. **Look at G1 first!** Check `data/G1.json` and `data/images/G1/` to see how it's set up
2. **Match scene count** - Create images for each scene in the "Graphics" tab
3. **Be patient with AI images** - You may need to regenerate to get Jain imagery right
4. **Test before submitting** - Always run `./startup.sh` and check your work!

---

## Need Help? 🙋

- **Ask your AI coding tool** to explain anything you don't understand
- **Check the Discord** for help from other contributors
- **See existing PRs** on GitHub for examples

---

*Made with ❤️ for young JAB contributors*
