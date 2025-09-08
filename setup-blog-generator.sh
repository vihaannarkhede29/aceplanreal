#!/bin/bash
# AcePlan Tennis Blog Generator Setup Script
# ==========================================

echo "AcePlan Tennis Blog Generator Setup"
echo "==================================="
echo "Website: https://aceplan.me"
echo ""

# Check if Python 3 is installed
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is required but not installed."
    echo "Please install Python 3 and try again."
    exit 1
fi

echo "✓ Python 3 found: $(python3 --version)"

# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    echo "Error: pip3 is required but not installed."
    echo "Please install pip3 and try again."
    exit 1
fi

echo "✓ pip3 found: $(pip3 --version)"

# Create virtual environment (optional but recommended)
read -p "Create virtual environment? (y/n): " create_venv
if [[ $create_venv == "y" || $create_venv == "Y" ]]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
    source venv/bin/activate
    echo "✓ Virtual environment created and activated"
fi

# Install requirements
echo "Installing Python dependencies..."
pip3 install -r requirements.txt

if [ $? -eq 0 ]; then
    echo "✓ Dependencies installed successfully"
else
    echo "✗ Error installing dependencies"
    exit 1
fi

# Create necessary directories
echo "Creating directories..."
mkdir -p generated_posts
mkdir -p logs
echo "✓ Directories created"

# Make scripts executable
echo "Making scripts executable..."
chmod +x gpt4all-blog-generator.py
chmod +x automated-blog-scheduler.py
chmod +x setup-blog-generator.sh
echo "✓ Scripts made executable"

# Test GPT4All installation
echo "Testing GPT4All installation..."
python3 -c "from gpt4all import GPT4All; print('✓ GPT4All imported successfully')" 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✓ GPT4All is working correctly"
else
    echo "⚠ Warning: GPT4All may not be working correctly"
    echo "The script will fall back to template-based generation"
fi

# Create sample blog post
echo "Generating sample blog post..."
python3 gpt4all-blog-generator.py << EOF
1
EOF

if [ $? -eq 0 ]; then
    echo "✓ Sample blog post generated successfully"
    echo "Check the 'generated_posts' directory for the output"
else
    echo "⚠ Warning: Could not generate sample post"
fi

echo ""
echo "Setup completed successfully!"
echo "============================="
echo ""
echo "Next steps:"
echo "1. Run 'python3 gpt4all-blog-generator.py' to generate blog posts"
echo "2. Run 'python3 automated-blog-scheduler.py' for automation options"
echo "3. Check 'README_BLOG_GENERATOR.md' for detailed usage instructions"
echo ""
echo "For daily automation, run:"
echo "python3 automated-blog-scheduler.py --setup-cron"
echo ""
echo "Website: https://aceplan.me"
echo "Racket Database: 100+ tennis rackets with detailed specifications"
