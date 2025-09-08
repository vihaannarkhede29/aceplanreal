#!/bin/bash
# AcePlan Enhanced Tennis Blog Generator Setup Script
# ==================================================

echo "AcePlan Enhanced Tennis Blog Generator Setup"
echo "==========================================="
echo "Website: https://aceplan.me"
echo "Database: https://docs.google.com/spreadsheets/d/1BDcm92RBg6Wnh63XlN5ktkOWz9tUQ1ZRAjJhouCaUos/edit?gid=0#gid=0"
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
chmod +x enhanced-blog-generator.py
chmod +x advanced-scheduler.py
chmod +x setup-enhanced-blog-generator.sh
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

# Test Google Sheets connection
echo "Testing Google Sheets connection..."
python3 -c "
import requests
try:
    response = requests.get('https://docs.google.com/spreadsheets/d/1BDcm92RBg6Wnh63XlN5ktkOWz9tUQ1ZRAjJhouCaUos/export?format=csv&gid=0')
    if response.status_code == 200:
        print('✓ Google Sheets connection successful')
    else:
        print('⚠ Warning: Google Sheets connection failed')
except Exception as e:
    print(f'⚠ Warning: Google Sheets connection error: {e}')
"

# Create sample blog post
echo "Generating sample blog post..."
python3 enhanced-blog-generator.py << EOF
1
EOF

if [ $? -eq 0 ]; then
    echo "✓ Sample blog post generated successfully"
    echo "Check the 'generated_posts' directory for the output"
else
    echo "⚠ Warning: Could not generate sample post"
fi

# Create cron setup
echo "Setting up cron job scripts..."
python3 advanced-scheduler.py --setup-cron

if [ $? -eq 0 ]; then
    echo "✓ Cron job scripts created successfully"
else
    echo "⚠ Warning: Could not create cron scripts"
fi

echo ""
echo "Setup completed successfully!"
echo "============================="
echo ""
echo "Next steps:"
echo "1. Run 'python3 enhanced-blog-generator.py' to generate blog posts"
echo "2. Run 'python3 advanced-scheduler.py' for advanced scheduling"
echo "3. Check 'cron-setup.txt' for cron job configuration"
echo ""
echo "Scheduling:"
echo "- Weekdays: 9am, 5pm"
echo "- Weekends: 9am, 12pm, 3pm, 7pm"
echo ""
echo "Content themes:"
echo "- Top 10 racket lists (spin, control, power, beginner)"
echo "- UTR improvement guides"
echo "- Individual racket reviews with affiliate links"
echo "- Tennis technique guides"
echo "- Player success stories"
echo ""
echo "To start the scheduler:"
echo "python3 advanced-scheduler.py --start"
echo ""
echo "Website: https://aceplan.me"
echo "Database: https://docs.google.com/spreadsheets/d/1BDcm92RBg6Wnh63XlN5ktkOWz9tUQ1ZRAjJhouCaUos/edit?gid=0#gid=0"
