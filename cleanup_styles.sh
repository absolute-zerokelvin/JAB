#!/bin/bash

# Directory containing JSON files
DATA_DIR="/Users/anant/JAB/JAB/data"

echo "Starting global content sanitization..."

# 1. Remove hardcoded background classes (including variations with spaces)
# Using -E for extended regex
# - handles bg-white, bg-blue-50, etc.
# - handles any number of spaces before/after
sed -i '' -E 's/bg-(white|blue-50|gray-50|slate-50|blue-100|slate-100|gray-100|amber-50|orange-50|emerald-50|teal-50|cyan-50|sky-50|indigo-50|violet-50|purple-50|fuchsia-50|pink-50|rose-50|yellow-50)//g' $DATA_DIR/*.json

# 2. Remove hardcoded text color classes that we want to unify
sed -i '' -E 's/text-(gray-700|gray-600|gray-800|blue-900|blue-800|blue-700|amber-900|orange-900|emerald-900|teal-900|cyan-900|sky-900|indigo-900|violet-900|purple-900|fuchsia-900|pink-900|rose-900|yellow-900)//g' $DATA_DIR/*.json

# 3. Clean up the 'dark:' overrides we might have added manually or that exist in data
# We want these containers to use semantic classes instead, but for now, stripping hardcoded ones 
# is the safest way to ensure readability (as they will inherit page text color).
sed -i '' -E 's/dark:bg-(gray-800|blue-900|slate-800|gray-900)//g' $DATA_DIR/*.json
sed -i '' -E 's/dark:text-(gray-200|gray-100|blue-100|blue-200|white)//g' $DATA_DIR/*.json

# 4. Collapse multiple spaces created by deletions
sed -i '' -E 's/ +/ /g' $DATA_DIR/*.json

# 5. Fix leading/trailing spaces in class attributes
sed -i '' -E "s/class=' /class='/g" $DATA_DIR/*.json
sed -i '' -E 's/class=" /class="/g' $DATA_DIR/*.json
sed -i '' -E "s/ '/'/g" $DATA_DIR/*.json
sed -i '' -E 's/ "/"/g' $DATA_DIR/*.json

# 6. Specific mapping: Replace patterns which represent "cards" or "callouts" with our new semantic classes
# If it has border and rounded, it's a card
# This is tricky with sed but we'll try the most common one found in L1/L2
sed -i '' 's/p-4 rounded-lg border/content-card/g' $DATA_DIR/*.json
sed -i '' 's/p-6 rounded-lg shadow-md border-l-4 border-blue-500/callout-blue/g' $DATA_DIR/*.json
sed -i '' 's/border-l-4 border-blue-500 p-4 rounded-r-lg/callout-blue/g' $DATA_DIR/*.json

echo "Sanitization complete."
