#!/bin/bash

echo "Starting setup..."

# Create a virtual environment (if not already exists)
if [ ! -d ".env" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv .env
fi

# Activate the virtual environment
source .env/bin/activate

# Upgrade pip
echo "Upgrading pip..."
pip install --upgrade pip

# Install dependencies from requirements.txt
echo "Installing requirements..."
pip install -r requirements.txt


# Start the Flask app using Gunicorn
echo "Launching app with Gunicorn..."
gunicorn -w 2 -b 0.0.0.0:5000 app:app
