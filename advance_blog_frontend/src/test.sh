#!/bin/bash

# Create Blog Application Project Structure
# This script creates all the necessary folders and empty files for the blog application

echo "Creating blog application project structure..."

# Create directory structure
mkdir -p app/blog/create
mkdir -p components/atoms
mkdir -p components/molecules
mkdir -p components/organisms
mkdir -p lib

# Create empty lib files
touch lib/types.ts
touch lib/utils.ts

# Create empty atom components
touch components/atoms/Button.tsx
touch components/atoms/TextArea.tsx

# Create empty molecule components
touch components/molecules/TextEditor.tsx
touch components/molecules/ImageUploader.tsx

# Create empty organism components
touch components/organisms/BlogPreview.tsx
touch components/organisms/BlogForm.tsx

# Create empty page components
touch app/blog/create/page.tsx

echo "Blog application project structure created successfully!"
echo "The following files have been created (empty):"
echo "- lib/types.ts"
echo "- lib/utils.ts"
echo "- components/atoms/Button.tsx"
echo "- components/atoms/TextArea.tsx"
echo "- components/molecules/TextEditor.tsx"
echo "- components/molecules/ImageUploader.tsx"
echo "- components/organisms/BlogPreview.tsx"
echo "- components/organisms/BlogForm.tsx"
echo "- app/blog/create/page.tsx"
echo ""
echo "You can now write your code in these files manually."