#!/bin/bash

echo "📸 Downloading Hero Images..."

# Create images directory
mkdir -p public/images

# Download hero images from Unsplash
echo "⬇️  Downloading hero-1.jpg (Innovation)..."
curl -L -o public/images/hero-1.jpg "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"

echo "⬇️  Downloading hero-2.jpg (Collaboration)..."
curl -L -o public/images/hero-2.jpg "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"

echo "⬇️  Downloading hero-3.jpg (Startup)..."
curl -L -o public/images/hero-3.jpg "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"

echo "⬇️  Downloading hero-default.jpg (Default)..."
curl -L -o public/images/hero-default.jpg "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"

echo "✅ All hero images downloaded successfully!"
echo "📁 Images saved to: public/images/"
